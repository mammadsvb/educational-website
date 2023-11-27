const { check } = require("express-validator")


module.exports = new class{

    handle(){
        return[
            check('number').notEmpty().withMessage("number is empty!"),
            check('title').isLength({min:1}).withMessage("title is too short!"),
            check('type').notEmpty().withMessage("type is empty!"),
            check('course').notEmpty().withMessage("course is empty!"),
            check('content').isLength({min:1}).withMessage("content is too short!"),
            check('videoUrl').notEmpty().withMessage("video URL is empty!"),
            check('time').custom(async(value) =>{
                    const time = value.split(':')
                    if(time.length === 2 || time.length === 3 ){
                        for(let i of time){
                            if(!this.is_numeric(i))
                                throw new Error('time can not have character.')
                        }
                    }else{
                        throw new Error('00:00:00')
                    }
            }),
        ]
    }

    is_numeric(str){
        return /^\d+$/.test(str);
    }

}