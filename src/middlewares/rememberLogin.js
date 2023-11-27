const Middleware = require('./middleware');
const User = require('../models/User');

module.exports = new class extends Middleware{


    handle(req,res,next){

        if(!req.isAuthenticated()){
            const rememberToken = req.signedCookies.remember_token;
            
            if(rememberToken)
            return this.userFind(rememberToken,req,next);
        }
        next();
    }

    userFind(rememberToken,req,next){

        User.findOne({rememberToken})
            .then(user =>{
                if(user){
                    req.login(user , err =>{
                        if(err) console.error(err);

                        next();
                    })
                }else{

                    next();
                }

            })


    }


}