const express = require('express');
const router = express.Router();

const {recoveryPassController} = require('./controller')
const {changePassController} = require('./controller')


const {changePassValidator} = require('./validator')
const {recoveryPassValidator} = require('./validator')


router.get('/password/reset',
recoveryPassController.showPage);

router.post('/password/email',
recoveryPassValidator.handle(),
recoveryPassController.validator,
recoveryPassController.restLinkProcess)

router.get('/password/reset/:token',
changePassController.showPage)

router.post('/password/reset',
changePassValidator.handle(),
changePassController.validator,
changePassController.resetPassword)


module.exports = router;