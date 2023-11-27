const express = require('express');
const router = express.Router();

const commentController = require('./controller')

router.use((req,res,next)=>{
    res.locals.layout = 'layouts/adminMaster';

    next();
});

router.get('/',
commentController.showPage);

router.delete('/:id',
commentController.destroy);

router.put('/:id',
commentController.approve)

module.exports = router;

