const Controller = require('../../main/controller');
const User = require('../../../models/User')
const PassReset = require('../../../models/passReset');

const uniqueString = require('unique-string');

class PasswordRecovery extends Controller{

    showPage(req,res){

        res.render('pages/auth/resetPass',{massages: req.flash('errors') , success : req.flash('success') , recaptcha  : this.recaptcha.render()})
    
    }

    validator(req,res,next){
        this.RecaptchaVaildation(req,res)
            .then(result => this.validation(req,res,next));
    }

    async restLinkProcess(req,res,next){

        try{

            const user = await User.findOne({email : req.body.email})

            if(!user){
                req.flash('errors',"user not found");
                return res.redirect('/auth/password/reset')
            }

            const setResetPass = new PassReset({
                email : req.body.email,
                token : uniqueString(),
            });

            await setResetPass.save()
            
            req.flash('success',"email send");
            res.redirect('/auth/password/reset');

        }catch(err){
            console.log(err)
        }

    }

}


class ChangePassword extends Controller{

    showPage(req,res){
        req.flash('token',req.params.token);
        res.render('pages/auth/passRecovery',{massages : req.flash('errors') , success : req.flash('success') , recaptcha : this.recaptcha.render()})
    }

    
    validator(req,res,next){
        this.RecaptchaVaildation(req,res)
            .then(result => this.validation(req,res,next));
    }

    async resetPassword(req,res,next){

        try{
            const resetPassword = await PassReset.findOne({$and : [{email : req.body.email},{token : req.flash('token')}]})

            if(!resetPassword){
                req.flash('errors','invalid information');
                return this.back(req,res);
            }

            if(resetPassword.used){
                req.flash('errors','token used');
                return this.back(req,res);
            }

            const user = await User.findOne({email:req.body.email});
            if(!user){
                req.flash('errors','user not found');
                return this.back(req,res);
            }         
            user.set({ password : user.hashPass(req.body.password)})  
  
            await user.save();

            await resetPassword.updateOne({used : true});

            res.redirect('/auth/login')

        }catch(err){
            console.error(err);
        }

    }

}


module.exports = {
    recoveryPassController : new PasswordRecovery(),
    changePassController   : new ChangePassword(),
}