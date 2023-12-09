const express = require('express');
const router = express.Router();

// routes
const homeRouter = require('../home');
const registerRouter = require('../auth/register')
const loginRouter = require('../auth/login')
const passResetRouter = require('../auth/password')
const adminRouter = require('../admin/main');


//middlewares
const redirectAuth = require('../../middlewares/redirectAuth');
const adminRedirect = require('../../middlewares/adminRedirect')

router.use('/',homeRouter);
router.use('/auth',redirectAuth.handle,registerRouter,loginRouter,passResetRouter);
router.use('/admin',adminRedirect.handle,adminRouter);



module.exports = router;