const Controller = require('../main/controller');
//dbs
const Course = require('../../models/course');
const Episode = require('../../models/episode');
const Article = require('../../models/article');
const Comment = require('../../models/comment');
const Category = require('../../models/category');

//modules
const bcrypt = require('bcrypt');
const path = require('path');



module.exports = new class extends Controller{

    async showPage(req,res){
        const courses = await Course.find({}).sort({'createdAt':1}).limit(3);
        const articles = await Article.find({}).sort({'createdAt':1}).limit(3);
        res.render('pages/home/home',{courses,articles});
    }

    logout(req,res){
        req.logOut((err)=>{

            res.clearCookie('remember_token');
            res.redirect('/auth/login');
    
        });

    }


    async showCoursePage(req,res){



            const course = await Course.findOneAndUpdate({slug:req.params.slug},{$inc:{viewCount:1}}).populate([{
            path:'user',
            select : 'username'
        },{
            path:'episodes'
        },{
            path: 'comments',
            match : {
                        check : true,
                        parent : null
                    },
            populate:[{
                path:'user',
                select : 'username'
            },{
                path : 'comments',
                match :{ check : true},
                populate:{
                    path:'user',
                    select : 'username'
                }
            }]
        }
    
    
    ]);

    const categoreis = await Category.find({parent:null}).populate('childs');
       
       
        // return res.json(categoreis)
        const accessUser = this.accessUser(req,course);

        res.render('pages/home/course/coursePage',{course,accessUser,categoreis});

    }

    accessUser(req,course){


        let access = false;

        if(req.isAuthenticated()){
            if(course.type == 'vip')
                access = req.user.isVip()

            else if(course.type == 'cash')
                access = req.user.payCash()

            else
                access = true;
        }

        return access;

    }


    async download(req,res){
        
        const episode = await Episode.findById(req.params.id)
        
        if(! this.checkSecretUrl(req,res,episode))  
            return res.json('bilakh')

        episode.inc('downloadCount')
        const filePath = path.resolve(`public/${episode.videoUrl}`);
        
        
        res.download(filePath)

    }

    checkSecretUrl(req,res,episode){
        const time = new Date().getTime();
        if(req.query.t < time){
            return res.json('time up')
        }
        const secret = `kjasd@AS78!xck5q%w${episode._id}${req.query.t}`;

        return bcrypt.compareSync(secret,req.query.secret);
    }


    async showArticlePage(req,res){
        const article = await Article.findOneAndUpdate({slug:req.params.slug},{$inc:{viewCount:1}}).populate([{
            path:'user',
            select :'username'
        },{
            path:'comments',
            match :{check :true,
                    parent:null
                   },
            populate:[{
                path:'user',
                select : 'username'
            },{
                path:'comments',
                match:{check:true},
                populate:{
                    path:'user',
                    select:'username'
                }
            }]
        }
    
    ]);

        if(!article)
            return res.json('lolo');

        // return res.json(article)
        const categoreis = await Category.find({parent:null}).populate('childs')

        res.render('pages/home/article/articlePage',{article,categoreis});
    }


    async showCourses(req,res){
        const page = req.query.page || 1;
        let query ={};

        if(req.query.search)
            query.title = new RegExp(req.query.search,'g');

        if(req.query.type && req.query.type != 'all'){
            query.type = req.query.type;
        }
        
        if(req.query.category && req.query.category != 'all'){
            let category = await Category.findOne({slug : req.query.category});
            if(category){
                query.categoreis = category._id
            }
        }


        const courses = await Course.paginate({...query},{page,limit:9,sort:{createdAt:Number(req.query.old) || -1}});
        const categoreis = await Category.find();


        res.render('pages/home/course/courses',{courses,categoreis});
    }

    async showArticles(req,res){
        const page = req.query.page || 1;
        let query ={};

        if(req.query.search)
            query.title = new RegExp(req.query.search,'g');

        if(req.query.category && req.query.category != 'all'){
            let category = await Category.findOne({slug : req.query.category});
            if(category){
                query.categoreis = category._id
            }
        }

        const articles = await Article.paginate({...query},{page,limit:9,sort:{createdAt:Number(req.query.old) || -1}});
        const categoreis = await Category.find();

        res.render('pages/home/article/articles',{articles,categoreis});
    }


}