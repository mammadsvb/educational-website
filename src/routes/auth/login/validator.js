const {check} = require('express-validator');

module.exports = new class {
    handle(){
        return[
            check('email').isEmail().withMessage("email is invalid."),
            check('password').isLength({min:6}).withMessage("password can't be less than 6 character."),

        ]
    }
}