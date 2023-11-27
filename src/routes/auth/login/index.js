const express = require('express');
const router = express.Router();

const loginController = require('./controller')
const loginValidator = require('./validator')

router.get('/login',
loginController.showPage)


router.post('/login',
loginValidator.handle(),
loginController.validator,
loginController.loginUser
)

router.get('/google',
loginController.google)

router.get('/google/callback',
loginController.googleCB)

module.exports = router;