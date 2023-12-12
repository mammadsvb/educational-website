const express = require('express');
const router = express.Router();

const forumController = require('./controller')
const forumValidator = require('./validator')

router.get('/',
forumController.showPage)

router.get('/:id',
forumController.showQuePage);

router.post('/:id',
forumValidator.handle(),
forumController.validation,
forumController.createQue)

router.get('/answer/:id',
forumController.showAnsPage)

router.post('/answer/:id',
forumValidator.handle(),
forumController.validation,
forumController.createAns)

module.exports = router;