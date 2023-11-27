const Middleware = require('./middleware');

module.exports = new class extends Middleware{
    
    handle(req,res,next){

        if(req.file){
            req.body.image = req.file.originalname
        }else{
            req.body.image = undefined;
        }

        next();

    }
}