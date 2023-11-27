const autoBind = require('auto-bind');

const moment = require('moment');


module.exports = class {

    constructor(req,res){
        autoBind(this);
        this.req = req;
        this.res = res;
    }

    object(){
        return{
            auth : this.auth(),
            convertTime : this.convertTime,
            req : this.req,
            // errors : this.req.flash('errors')
        }

    }

    auth(){
        return{
            check : this.req.isAuthenticated(),
            user  : this.req.user,
        }
    }

    convertTime(time){
        return moment(time)
    }


}