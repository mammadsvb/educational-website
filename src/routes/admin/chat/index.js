const express = require('express');
const router = express.Router();

const chatController = require('./controller')

router.get('/',
chatController.showPage)

router.get('/room',
chatController.showRoomPage)


module.exports =  router;