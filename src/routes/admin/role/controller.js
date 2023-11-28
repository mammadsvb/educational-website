const Controller = require('../../main/controller');

//dbs
const Permission = require('../../../models/permission')
const Role = require('../../../models/role')

module.exports = new class extends Controller{

    async showPage(req,res){

        const roles = await Role.find({}).populate('permissions');

        res.render('pages/admin/role/role',{roles})
    }

    async showCreatePage(req,res){
        const permissions = await Permission.find({})
        res.render('pages/admin/role/createRole',{massages : req.flash('errors'),success : req.flash('success'),permissions})
    }

    validator(req,res,next){
        this.validation(req,res,next)
    }

    async createRole(req,res){
        const {name,label,permissions} = req.body;

        const newRole = new Role({
            name,
            label,
            permissions
        })

        await newRole.save();

        req.flash('success','role added');
        this.back(req,res)
    }

    async destroy(req,res){
        const role = await Role.findByIdAndDelete(req.params.id);

        if(!role)
            return res.json('not Found');

        res.redirect('/admin/role');
    }

    async showEditPage(req,res){

        const role = await Role.findById(req.params.id);
        const permissions = await Permission.find({});


        res.render('pages/admin/role/editRole',{massages:req.flash('errors') , role , permissions});
    }

    async update(req,res){

        const role = await Role.findByIdAndUpdate(req.params.id,{$set:{...req.body}})
        if(!role)
            return res.json('not found');

        res.redirect('/admin/role');
    }

}