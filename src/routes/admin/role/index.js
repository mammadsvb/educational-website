const express = require('express');
const router = express.Router();

const roleController = require('./controller')

router.get('/create',
roleController.showCreatePage)

module.exports = router;