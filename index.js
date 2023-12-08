const express = require("express");
const app = express();
const { createServer } = require('node:http');
const mongoose = require('mongoose');
const setconfig = require('./config');
const router = require('./src/routes/main');
require('dotenv').config();
require('app-module-path').addPath(__dirname);
const { Server } = require('socket.io');

const chatController = require('./src/routes/admin/chat/controller')

const server = createServer(app);
const io = new Server(server);

chatController.connectToSocket(io)

// global.Promise = mongoose.Promise;
mongoose.connect('mongodb://127.0.0.1/Test')
.then(()=>console.log('connected to db'))
.catch((err)=>console.error(err));

setconfig(app);


app.use('/',router);




const port = process.env.PORT || 3000;
server.listen(port ,(err)=>{
    if(err) console.log(err);
    console.log(`connected to port ${port}`)
})