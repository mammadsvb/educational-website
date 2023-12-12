const Controller = require('../../main/controller');

const Forum = require('../../../models/forum');
const ForumQue = require('../../../models/forumQue');
const ForumAns = require('../../../models/forumAns');

module.exports = new class extends Controller{

    async showPage(req,res){
        try{
            const page = req.query.page || 1;
            const forums = await Forum.paginate({},{page,limit:2,sort:{updatedAt:1},populate:{path:'questions'}});

            res.render('pages/home/forum/forums',{forums})

        }catch(err){
            console.error(err);
        }
    }

    async showQuePage(req,res){
        
        try{

            const page =req.query.page || 1;

            const ques = await ForumQue.paginate({forum:req.params.id},{page,limit:2,sort:{updatedAt:-1}})

            // return res.json(ques)

            res.render('pages/home/forum/forumQue',{massages:req.flash('errors'),ques})

        }catch(err){
            console.error(err);
        }
    }

    async createQue(req,res){

        try{
            const Que = new ForumQue({
                user:req.user.id,
                ...req.body
            });

            await Que.save();

            this.back(req,res);

        }catch(err){
            console.error(err);
        }

    }


    async showAnsPage(req,res){

        try{
            const page = req.query.page || 1;
            const que = await ForumQue.findById(req.params.id);
            if(!que)
                throw new Error('question not Found');

            const forumAns = await ForumAns.paginate({question:req.params.id},{page , limit:2 , sort:{updatedAt:1},populate:{path:'user',select:'username'}},)
            // return res.json(forumAns)
            res.render('pages/home/forum/forumAns',{massages:req.flash('errors'),que,forumAns})

        }catch(err){
            console.error(err);
        }

    }

    async createAns(req,res){

        try{
            const que = await ForumQue.findById(req.params.id);
            
            const newAns = new ForumAns({
                user:req.user.id,
                ...req.body
            });

            await newAns.save();

            await que.inc('countAns');

            this.back(req,res);

        }catch(err){
            console.error(err);
        }


    }


}