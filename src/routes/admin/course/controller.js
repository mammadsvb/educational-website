const Controller = require('../../main/controller');

const Course = require('../../../models/course')
const Category = require('../../../models/category');

const fs = require('fs');
const multer = require('multer');
const {mkdirp}= require('mkdirp');
const sharp = require('sharp');
const path = require('path');
const Episode = require('../../../models/episode');

module.exports = new class extends Controller{

    async showPage(req,res){

    //     const perPage = 5;
    //     const page = Number(req.query.page) || 1;
    
    //     Course.find({}).skip(perPage*(page-1)).limit(perPage).then((courses)=>{

    //         Course.countDocuments().then((count)=>{
                
    //             res.render('pages/admin/course/course',{courses , page , pages : Math.ceil(count/perPage)});
    //         }).catch(err => console.error(err));
    
    // }).catch(err => console.error(err));


        const courses = await Course.find({});
        res.render('pages/admin/course/course',{courses});
    }


    async showCreatePage(req,res){
        const categoreis = await Category.find({});
        res.render('pages/admin/course/createCourse',{massages : req.flash('errors'),success : req.flash('success'),categoreis})
    }

    
    validator(req,res,next){

        this.validation(req,res,next)
    }

    getDir(){
        let year = new Date().getFullYear();
        let month = new Date().getMonth();

        return `./public/uploads/images/${year}/${month}`;
    }

    upload(){
        
        const storageImage = multer.diskStorage({
            destination:(req,file,cb)=>{
                
                const dir = this.getDir();

                mkdirp(dir).then((made)=>{
                    cb(null,dir)
                })
            },
            filename : (req,file,cb)=>{
                let filePath = this.getDir() +'/'+file.originalname;

                if(!fs.existsSync(filePath)){
                    cb(null,file.originalname)
                }else{
                    file.originalname =Date.now()+ '-' + file.originalname;
                    cb(null,file.originalname); 
                }
                
            }
        });

        const uploadImage = multer({
            storage : storageImage,
            limits :{
                fileSize:1024 * 1024 * 3,
            } 
        })

        return uploadImage;

    }


    async createCourse(req,res,next){

        try{
            const image = this.resizeImage(req.file)

            const {title,type,content,price,tags,categoreis} = req.body;

            const newCourse = new Course({
                user : req.user._id,
                title,
                type,
                content,
                image,
                price,
                tags,
                categoreis
            });

            await newCourse.save();

            req.flash('success','course added');
            res.redirect('/admin/course/create');

        }catch(err){
            console.error(err);
        }
    }




    getDirImage(dir){
        return dir.substr(8);
    }




    async destroy(req,res,next){

        const course = await Course.findByIdAndDelete(req.params.id).populate('episodes');
        if(!course)
            return res.json("course not found.");

        course.episodes.forEach(async (episode) => await Episode.findByIdAndDelete(episode._id)  )

        Object.values((course.image)).forEach(image => fs.unlinkSync(`./public/${image}`,err => err));

        return res.redirect('/admin/course');
    }





    async showEditPage(req,res){
        const course = await Course.findById(req.params.id);
        const categoreis = await Category.find();

        res.render('pages/admin/course/editCourse' , {massages : '' , course,categoreis});
    }



    async update(req,res,next){
        if(req.file){
            req.body.image = this.resizeImage(req.file)
        }

        let course = await Course.findByIdAndUpdate(req.params.id,{$set : {...req.body}});
        
        if(req.file)
            Object.values((course.image)).forEach(image => fs.unlinkSync(`./public/${image}`,err => err));
        
        return res.redirect('/admin/course');
    }



    resizeImage(image){

        let imagePath = path.parse(image.path);

        let imageUrl = {};
        imageUrl['original'] = this.getDirImage(`${image.destination}/${image.originalname}`);

        let resize = size =>{
            const imageName = `${imagePath.name}-${size}${imagePath.ext}`;
            imageUrl[size] = this.getDirImage(`${image.destination}/${imageName}`);

            sharp(image.path)
                .resize(size)
                .toFile(`${image.destination}/${imageName}`);

          
        }

        [480,360].map(resize);
            
        return imageUrl;
    }


}