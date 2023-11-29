const {check} = require('express-validator');

module.exports = new class {
    handle(){
        return[
            check('username').isLength({min:4}).withMessage("username can't be less than 4 character."),
            check('email').isEmail().withMessage("email is invalid."),
            check('password').isLength({min:6}).withMessage("password can't be less than 6 character."),

        ]
    }
}