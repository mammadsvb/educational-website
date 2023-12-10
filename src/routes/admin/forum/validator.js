const { check } = require("express-validator");

module.exports = new class{

    handle(){
        return[
            check('name').isLength({min:4}).withMessage('more than 4 char'),
            check('label').notEmpty().withMessage('label is empty'),
        ]
    }
}