const express = require('express');
const router = express.Router();

const articleController = require('./controller');
const articleValidator = require('./validator')

const fileToField = require('../../../middlewares/fileTofield');

router.get('/',
articleController.showPage);

router.get('/create',
articleController.showCreatePage);

router.post('/create',
articleController.upload().single('image'),
fileToField.handle,
articleValidator.handle(),
articleController.validator,
articleController.creteArticle);

router.delete('/:id',
articleController.destroy);

router.get('/edit/:id',
articleController.showEditPage);

router.put('/:id',
articleController.upload().single('image'),
fileToField.handle,
articleValidator.handle(),
articleController.validation,
articleController.update)



module.exports = router;