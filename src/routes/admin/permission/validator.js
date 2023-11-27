const { check } = require("express-validator")

const Permission = require('../../../models/permission')

module.exports = new class{
    handle(){
        return[
            check('name')
            .notEmpty()
                .isLength({ min: 3 })
                .withMessage('too short')
                .custom(async (value, { req }) => {
                    if(req.query._mehtod == 'PUT'){
                        let permission = await Permission.findById(req.parems.id);
                        if(permission.name == value) return;
                    }

                    let permission = await Permission.find({ name : value});
                    if(permission){
                        return req.flash('errors' , 'این دسته بندی قبلا ایجاد شده است')
                    }
                }),
            check('label').notEmpty().withMessage('label is empty'),
        ]
    }
}