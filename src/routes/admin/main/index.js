const exprees = require('express');
const router = exprees.Router();

const courseRouter = require('../course');
const episodeRouter = require('../episode');
const commentRouter = require('../comment')
const articleRouter = require('../article');
const categoryRouter = require('../category');
const profileRouter = require('../profile');
const permissionRouter = require('../permission');
const roleRouter = require('../role');
const userRouter = require('../user');

const adminController = require('./controller');

router.use((req,res,next)=>{
    res.locals.layout = 'layouts/adminMaster';

    next();
})

router.get('/',
adminController.showPage) 

router.use('/course' , courseRouter);
router.use('/episode', episodeRouter);
router.use('/comment', commentRouter);
router.use('/article', articleRouter);
router.use('/category',categoryRouter);
router.use('/profile',profileRouter);
router.use('/permission',permissionRouter);
router.use('/role',roleRouter);
router.use('/user',userRouter);

module.exports = router;