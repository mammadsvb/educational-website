const express = require('express');
const router = express.Router();

const forumController = require('./controller');
const forumValidator = require('./validator');

router.get('/',
forumController.showPage)

router.get('/create',
forumController.showCreatePage)

router.post('/create',
forumValidator.handle(),
forumController.validator,
forumController.createForum)

router.delete('/:id',
forumController.destroy);

router.get('/edit/:id',
forumController.showUpdatePage);

router.put('/:id',
forumValidator.handle(),
forumController.validator,
forumController.update);


module.exports = router;