const Controller = require('../../main/controller');

const Forum = require('../../../models/forum');

module.exports = new class extends Controller{

    async showPage(req,res){
        try{
            const forums = await Forum.find({});

            res.render('pages/admin/forum/forum',{massages:req.flash('errors'),success:req.flash('success'),forums});

        }catch(err){
            console.log(err)
        }
    }

    showCreatePage(req,res){

        res.render('pages/admin/forum/createForum',{massages:req.flash('errors'),success:req.flash('success')});
    }

    validator(req,res,next){
        this.validation(req,res,next);
    }

    async createForum(req,res){
        try{
            const forum = new Forum({
                user:req.user.id,
                ...req.body
            });

            await forum.save();

            req.flash('success','forum added');

            this.back(req,res);

        }catch(err){
            console.error(err)
        }
    }

    async destroy(req,res){

        try{
            const deleForum = await Forum.findByIdAndDelete(req.params.id)
            if(!deleForum)
                throw new Error('forum not found');
           
            this.back(req,res);

        }catch(err){
            console.error(err);
        }
    }

    async showUpdatePage(req,res){

        try{
            const forum = await Forum.findById(req.params.id)

            res.render('pages/admin/forum/editForum',{massages: req.flash('errors'),forum});

        }catch(err){
            console.error(err)
        }

    }

    async update(req,res){

        try{
            const forum = await Forum.findByIdAndUpdate(req.params.id,{$set:{...req.body}});
            if(!forum)
                throw new Error('fourm not found');

            res.redirect('/admin/forum');

        }catch(err){
            console.error(err);
        }

    }

}