const ConnectRoles = require('connect-roles');

const Permission = require('../models/permission');
const permission = require('../models/permission');
 
const user = new ConnectRoles({
  failureHandler: function (req, res, action) {

    const accept = req.headers.accept || '';
    res.status(403);
    if (accept.indexOf('html')) {
      res.render('pages/admin/admin', {action});
    } else {
      res.send('Access Denied - You don\'t have permission to: ' + action);
    }
  }
});

async function permissions(){
    return await Permission.find({}).populate('roles');
}

permissions()
    .then(permissions=>{
        permissions.forEach(permission=>{
            const roles = permission.roles.map(role => role._id)
            
            user.use(permission.name,req=> req.user.hasRole(roles) ? true : false)
        })
    })


module.exports = user;