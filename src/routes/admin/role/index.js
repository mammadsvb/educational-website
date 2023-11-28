const express = require('express');
const router = express.Router();

const roleController = require('./controller')
const roleValidator = require('./validator');
const controller = require('./controller');

router.get('/',
controller.showPage)


router.get('/create',
roleController.showCreatePage);

router.post('/create',
roleValidator.handle(),
roleController.validator,
roleController.createRole)

module.exports = router;