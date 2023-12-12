const { check } = require("express-validator")


module.exports = new class {
    handle(){
        return[
            check('name').notEmpty().withMessage('name is Empty'),
            check('body').isLength({min:4}).withMessage('more than 4 char.')
        ]

    }
}