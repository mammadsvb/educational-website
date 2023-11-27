const Middleware = require('./middleware');

module.exports = new class extends Middleware {

    handle(req,res,next){

        if(req.isAuthenticated() && req.user.admin)
            next();
        
        else
            res.redirect('/')
    }

}