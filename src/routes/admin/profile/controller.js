const Controller = require('../../main/controller');

const User = require('../../../models/User')

const bcrypt = require('bcrypt');


module.exports = new class extends Controller{

    async showPage(req,res){
        const user  = await User.findById(req.user._id).populate([{path:'courses'},{path:'articles'},{path:'comments'}]);

        res.render('pages/admin/profile',{massages:req.flash('errors'),success:req.flash('success'),user})
    }

    async update(req,res){
        if(req.body.email)
            req.body.email = req.user.email;

         
        const user = await User.findById(req.params.id);

        const result = bcrypt.compareSync(req.body.password,user.password);
       
        if(result){

            user.set({...req.body})
            req.flash('success','successfully changed.');
            await user.save();
        
        }else{
            req.flash('errors','password is wrong');
        }


        return this.back(req,res);
    }
}