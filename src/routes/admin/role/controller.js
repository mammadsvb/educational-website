const Controller = require('../../main/controller');

//dbs
const Permission = require('../../../models/permission')
const Role = require('../../../models/role')

module.exports = new class extends Controller{

    async showPage(req,res){

        const roles = await Role.find({}).populate('permissions');

        // res.json(roles);
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

}