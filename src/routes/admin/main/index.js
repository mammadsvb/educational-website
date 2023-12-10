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
const chatRouter = require('../chat');
const forumRouter = require('../forum')

//middlewares
const checkAccess = require('../../../middlewares/checkAccessUser')
const access = require('../../../middlewares/checkAccessModule')

const adminController = require('./controller');

router.use((req,res,next)=>{
    res.locals.layout = 'layouts/adminMaster';

    next();
})

router.get('/',
adminController.showPage) 

router.use('/course' ,access.can("course"), courseRouter);
router.use('/episode',access.can("episode"), episodeRouter);
router.use('/comment',access.can("comment"), commentRouter);
router.use('/article',access.can("article"), articleRouter);
router.use('/category',access.can("category"),categoryRouter);
router.use('/profile',access.can("profile"),profileRouter);
router.use('/permission',access.can("permission"),permissionRouter);
router.use('/role',access.can("role"),roleRouter);
router.use('/user',access.can("user"),userRouter);
router.use('/forum',access.can("forum"),forumRouter);

module.exports = router;