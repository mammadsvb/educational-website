const express = require('express');
const router = express.Router();

const userController = require('./controller')
const userValidator = require('./validator');
const controller = require('./controller');

router.get('/',
controller.showPage)


router.get('/create',
userController.showCreatePage);

router.post('/create',
userValidator.handle(),
userController.validator,
userController.createUser)

router.delete('/:id',
userController.destroy);

router.get('/edit/:id',
userController.showEditPage);

router.put('/:id',
userValidator.handle(),
userController.validator,
userController.update);

router.get("/adminAccess/:id",
userController.adminAccess)

module.exports = router;