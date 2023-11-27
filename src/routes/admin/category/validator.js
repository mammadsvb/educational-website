const { check } = require("express-validator");

const Category = require('../../../models/category');

module.exports = new class{

    handle(){
        return[
            check('name').isLength({min:3}).withMessage('name is too short.')
                .custom(async(value,{req})=>{
                    if(req.query._method == 'PUT'){
                        let category = await Category.findById(req.params.id);
                        
                        if(category.name == value)  return;
                    }
                    
                    let category = await Category.findOne({name:value});
                    if(category)
                        throw new Error('this category already exist.');

                }),

        ]
    }

}