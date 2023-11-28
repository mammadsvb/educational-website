const Controller = require('../../main/controller');

//dbs
const Permission = require('../../../models/permission')

module.exports = new class extends Controller{

    async showCreatePage(req,res){
        const permissions = await Permission.find({})
        res.render('pages/admin/role/createRole',{massages : req.flash('error'),success : req.flash('success'),permissions})
    }

}