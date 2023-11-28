const { check } = require("express-validator")
const path = require('path');

module.exports = new class{

    handle(){
        return[
            check('title').isLength({min:1}).withMessage("title is too short!"),
            check('type').notEmpty().withMessage("type is empty!"),
            check('content').isLength({min:10}).withMessage("content is too short!"),
            check('image').custom((value,{req}) => {
                if(req.query._method === 'PUT'&& value === undefined)
                    return true;
                
                if(!value)
                    throw new Error('image is empty!')
                else{
                    const fileExe = ['.png','.jpg','.jpeg','.svg','.webp'];
                    if(!fileExe.includes(path.extname(value)))
                        throw new Error('please send image')
                }
                return true;
                
            }),
            check('price').notEmpty().withMessage("price is empty!"),
            check('tags').notEmpty().withMessage("tags is empty!"),
        ]
    }

}