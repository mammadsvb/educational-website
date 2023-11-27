const express = require('express');
const router = express.Router();

const categoryController = require('./controller');

const categoryValidator = require('./validator');

router.use((req,res,next)=>{
    res.locals.layout = 'layouts/adminMaster';

    next();
})

router.get('/',
categoryController.showPage);

router.get('/create',
categoryController.showCreatePage);

router.post('/create',
categoryValidator.handle(),
categoryController.validator,
categoryController.createCategory);

router.delete('/:id',
categoryController.destroy);

router.get('/edit/:id',
categoryController.showEditPage);

router.put('/:id',
categoryValidator.handle(),
categoryController.validator,
categoryController.update);

module.exports = router;