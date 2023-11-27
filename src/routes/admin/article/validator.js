const {check} = require('express-validator');
const path = require('path')
module.exports = new class{
    handle(){
        return[
            check('title').isLength({min : 5}).withMessage('title can\'t be less than 5 char.'),
            check('content').notEmpty().withMessage('write content'),
            check('image').custom((value,{req})=>{
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
            check('tags').notEmpty().withMessage('tags is empty'),
        ]
    }

}