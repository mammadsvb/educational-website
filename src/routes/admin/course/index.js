const exprees = require('express');
const router = exprees.Router();

const courseController = require('./controller');
const courseValidator = require('./validator');

const fileToField = require('../../../middlewares/fileTofield')

router.use((req,res,next)=>{
    res.locals.layout = 'layouts/adminMaster';

    next();
})

router.get('/',
courseController.showPage);

router.get('/create',
courseController.showCreatePage)

router.post('/create',
courseController.upload().single('image'),
fileToField.handle,
courseValidator.handle(),
courseController.validation,
courseController.createCourse);

router.delete('/:id',
courseController.destroy)

router.get('/edit/:id',
courseController.showEditPage);


router.put('/:id',
courseController.upload().single('image'),
fileToField.handle,
courseValidator.handle(),
courseController.validation,
courseController.update)


module.exports = router;