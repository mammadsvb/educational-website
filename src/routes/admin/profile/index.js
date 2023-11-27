const express = require('express');
const router = express.Router();

const profileController = require('./controller')
const profileValidator = require('./validator');

router.get('/',
profileController.showPage);

router.put('/:id',
profileValidator.handle(),
profileController.validation,
profileController.update)


module.exports = router;