const express = require('express');
const expressLayout = require("express-ejs-layouts");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const mongoStore = require("connect-mongo");
const flash = require('connect-flash');
const passport = require('passport');
const methodOverride = require('method-override');
const Helper = require('./helper');

const access = require('./src/middlewares/checkAccessModule')
const rememberLogin = require('./src/middlewares/rememberLogin');


function setconfig(app){
    require('./src/passports/passpoer-local');
    require('./src/passports/passport-google');
    app.use(express.static('public'));
    app.set('view engine','ejs');
    app.use(expressLayout);
    app.set('layout','./layouts/master');
    app.set("layout extractScripts", true);
    app.set("layout extractStyles", true);
    app.use(express.json());
    app.use(express.urlencoded({extended:true}))
    app.use(session({
        secret : "secretKey",
        resave : true,
        saveUninitialized : true,
        store  : mongoStore.create({mongoUrl:'mongodb://127.0.0.1/Test'}),
        cookie : { secure : false}
    }));
    app.use(cookieParser('secretID'));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(methodOverride('_method'));
    app.use(rememberLogin.handle);
    app.use((req,res,next)=>{
        app.locals = new Helper(req,res).object();
        next();
    });

    app.use(access.middleware())
}



module.exports = setconfig;