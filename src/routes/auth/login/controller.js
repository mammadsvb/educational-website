const passport = require('passport');
const Controller = require('../../main/controller');


module.exports = new class extends Controller{

    showPage(req,res){
        res.render('pages/auth/login',{massages : req.flash('errors') , recaptcha : this.recaptcha.render()})
    }
    

    validator(req,res,next){

        this.RecaptchaVaildation(req,res)
            .then(result => this.validation(req,res,next));

    }

    loginUser(req,res,next){

        passport.authenticate('local.login',(err,user) =>{
            if(!user) return res.redirect('/auth/login');

            req.login(user,(err)=>{
                if(err) console.error(err);

                if(req.body.remember)
                    user.setRememberToken(res);
            
                return res.redirect('/')
            })

        })(req,res,next)

    }

        
    google(req,res,next){
        passport.authenticate('google',{scope :['email','profile']})(req,res,next)    
    }

    googleCB(req,res,next){
        passport.authenticate('google',{
            successRedirect : '/',
            failureRedirect : '/auth/login'
        })(req,res,next)    
    }
}