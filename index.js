const express = require("express");
const app = express();
const mongoose = require('mongoose');
const setconfig = require('./config');
const router = require('./src/routes/main');
require('dotenv').config();
require('app-module-path').addPath(__dirname);



// global.Promise = mongoose.Promise;
mongoose.connect('mongodb://127.0.0.1/Test')
.then(()=>console.log('connected to db'))
.catch((err)=>console.error(err));

setconfig(app);


app.use('/',router);



const port = process.env.PORT || 3000;
app.listen(port ,(err)=>{
    if(err) console.log(err);
    console.log(`connected to port ${port}`)
})