const { check } = require("express-validator")

const Role = require('../../../models/role')

module.exports = new class {
    handle(){
        return[
            check('name').notEmpty().withMessage('name is empty')
                .custom(async (value, { req }) =>{

                    if(req.query._method == 'PUT'){
                        const role = await Role.findById(req.params.id);
                        if(role.name == value)
                            return;
                    }

                    let role = await Role.findOne({ name : value});

                    if(role){
                        throw new Error('already created.')
                    }
                }),
                check('label').notEmpty().withMessage('label is empty'),
                check('permissions').notEmpty().withMessage('permissions is empty')
        ]
    }
}