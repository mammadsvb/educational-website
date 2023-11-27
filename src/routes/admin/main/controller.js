const Controller = require('../../main/controller');

module.exports = new class extends Controller{

    showPage(req,res){

        res.render('pages/admin/admin')
    }


}