const MiddleWare = require('./middleware');

const Permission = require('../models/permission');

module.exports = new class extends MiddleWare{

     check(perm){
        return async(req,res,next)=>{
            const permission  = await Permission.findOne({name:perm}).populate('roles');
    

            const roles = permission.roles.map(role => role._id);
    
            return req.user.hasRole(roles) ? next() : res.redirect('/admin')
            

        }
    }

}