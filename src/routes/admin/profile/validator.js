const { check } = require("express-validator")

module.exports = new class{
    handle(){
        return[
            check('username').notEmpty().withMessage('username is empty'),
        ]
    }
}