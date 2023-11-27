const express = require('express');
const router = express.Router();

const registerController = require('./controller')
const registerValidator = require('./validator')

router.get('/register',
registerController.showPage)

router.post('/register',
registerValidator.handle(),
registerController.validator,
registerController.registerUser
)


module.exports = router;