const express = require('express');
const router = express.Router();

const permissionController = require('./controller');
const permissionValidator = require('./validator')

router.get('/',
permissionController.showPage)

router.get('/create',
permissionController.showCreatePage);

router.post('/create',
permissionValidator.handle(),
permissionController.validator,
permissionController.createPermission);

router.get('/edit/:id',
permissionController.showEditPage);

router.delete('/:id',
permissionController.destroy)

router.put('/:id',
permissionValidator.handle(),
permissionController.validator,
permissionController.update)


module.exports = router;