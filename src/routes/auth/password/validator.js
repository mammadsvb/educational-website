const { check } = require("express-validator")

class RecoveryPass {
    handle(){
        return[
            check('email')
                .isEmail().withMessage('email is invalid'),
        ]
    }

}

class ChangePass{

    handle(){
        return[
            check('email')
                .isEmail().withMessage('email is invalid'),
            
            check('password')
                .isLength({min:6}).withMessage("password can't be less than 6 character."),
        ]
    }

}

module.exports ={
    recoveryPassValidator : new RecoveryPass(),
    changePassValidator   : new ChangePass(),
}