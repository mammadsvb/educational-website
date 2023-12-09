const Controller = require('../../main/controller');

const Article = require('../../../models/article');
const Category = require('../../../models/category');

const multer = require('multer');
const {mkdirp} = require('mkdirp');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

module.exports = new class extends Controller{

    async showPage(req,res){
        try{
            const articles = await Article.find({});

            res.render('pages/admin/article/article',{articles})
        }catch(err){
            console.err(err)
        }
    }

    async showCreatePage(req,res){
        try{
            const categoreis = await Category.find({})
        
            res.render('pages/admin/article/createArticle',{massages:req.flash('errors'),success : req.flash('success'),categoreis});
        }catch(err){
            console.error(err);
        }
        
    }

    validator(req,res,next){
        this.validation(req,res,next);
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



    async creteArticle(req,res){
          try{
                const images =this.resizeImage(req.file);
                
                const {title,content,tags,categoreis} = req.body;

                const newArticle = new Article({
                    user:req.user._id,
                    title,
                    content,
                    tags,
                    images,
                    categoreis
                })

                await newArticle.save();

                req.flash('success','article added')

                this.back(req,res);

          }catch(err){
            console.error(err);
          }  
    }

    getDirImage(dir){
        return dir.substr(8);
    }

    resizeImage(image){
        let imagePath = path.parse(image.path);
        let imageUrl = {};
        imageUrl['original'] =  this.getDirImage(`${image.destination}/${image.originalname}`);

        let resize = size =>{
            const imageName = `${imagePath.name}-${size}${imagePath.ext}`;
            imageUrl[size] = this.getDirImage(`${image.destination}/${imageName}`);

            sharp(image.path)
                .resize(size)
                .toFile(`${image.destination}/${imageName}`);
  
        };

        [480,360].map(resize);

        return imageUrl;

    }

    async destroy(req,res){
       try{
            const deleteArticle = await Article.findByIdAndDelete(req.params.id);
            if(!deleteArticle)
                throw new Error('article not found')

            Object.values((deleteArticle.images)).forEach(image=>fs.unlinkSync(`./public/${image}`,err=>req.flash('errors',err)));

            return res.redirect('/admin/article');
       }catch(err){
            console.error(err)
       }
    }

    async showEditPage(req,res){
        try{
            const article = await Article.findById(req.params.id);
            const categoreis = await Category.find();

            res.render('pages/admin/article/editArticle',{massages:req.flash('errors'),article,categoreis})
        }catch(err){
            console.error(err)
        }
    }

    async update(req,res){
        try{
            if(req.file){
                req.body.images = this.resizeImage(req.file)
            }
    
            const updateArticle = await Article.findByIdAndUpdate(req.params.id,{$set:{...req.body}});
    
            if(req.file)
                Object.values((updateArticle.images)).forEach(image => fs.unlinkSync(`./public/${image}`,err => req.flash('errors',err)));
    
    
            return res.redirect('/admin/article');

        }catch(err){
            console.error(err)
        }
    }

}