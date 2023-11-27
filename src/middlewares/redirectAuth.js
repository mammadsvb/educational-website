const Middleware = require('./middleware');

module.exports = new class extends Middleware{

    handle(req,res,next){


        if(req.isAuthenticated()){

             return res.redirect('/')
        }
    

        next();
    }

}