const passport = require('passport');
const Controller = require('../../main/controller');



module.exports = new class extends Controller{

    showPage(req,res){
        res.render('pages/auth/register',{massages : req.flash('errors') , recaptcha : this.recaptcha.render()})
    }

    validator(req,res,next){
        this.RecaptchaVaildation(req,res)
            .then(result => this.validation(req,res,next))
    }

    registerUser(req,res,next){
        
        passport.authenticate('local.register',{
            failureRedirect : '/auth/register',
            successRedirect : '/',
            failureFlash : true,
        })(req,res,next);
    }




}