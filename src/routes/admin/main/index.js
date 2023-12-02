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

//middlewares
const checkAccess = require('../../../middlewares/checkAccessUser')

const adminController = require('./controller');

router.use((req,res,next)=>{
    res.locals.layout = 'layouts/adminMaster';

    next();
})

router.get('/',
adminController.showPage) 

router.use('/course' ,checkAccess.check("course"), courseRouter);
router.use('/episode',checkAccess.check("episode"), episodeRouter);
router.use('/comment',checkAccess.check("comment"), commentRouter);
router.use('/article',checkAccess.check("article"), articleRouter);
router.use('/category',checkAccess.check("category"),categoryRouter);
router.use('/profile',checkAccess.check("profile"),profileRouter);
router.use('/permission',checkAccess.check("permission"),permissionRouter);
router.use('/role',checkAccess.check("role"),roleRouter);
router.use('/user',checkAccess.check("user"),userRouter);

module.exports = router;