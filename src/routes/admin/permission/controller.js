const Controller = require('../../main/controller');

const Permission = require('../../../models/permission');

module.exports = new class extends Controller{

    async showPage(req,res){
        const permissions = await Permission.find();
        res.render('pages/admin/permission/permission',{permissions})
    }

    showCreatePage(req,res){

        res.render('pages/admin/permission/createPermission',{massages:req.flash('errors'),success:req.flash('success')});
    }

    validator(req,res,next){
        this.validation(req,res,next);
    }

    async createPermission(req,res){

        const {name,label} = req.body;
        
        const permission = new Permission({
            name,
            label,
        });

        await permission.save();

        req.flash('success','permission added.');
        
        return this.back(req,res);
    }

    async destroy(req,res){
        const permission = await Permission.findByIdAndDelete(req.params.id);

        res.redirect('/admin/permission');
    }

    async showEditPage(req,res){
        const permission = await Permission.findById(req.params.id);
        res.render('pages/admin/permission/editPermission',{massages:req.flash('errors'),permission})
    }

    async update(req,res){
        const permission = await Permission.findByIdAndUpdate(req.params.id,{$set:{...req.body}});
        if(!permission)
            return res.json('not found');

        return res.redirect('/admin/permission');
    }



}