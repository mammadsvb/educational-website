const express = require('express');
const router = express.Router();
const homeController =  require('./controller');

const commentRouter = require('./comment');
const forumRouter = require('./forum')

router.get('/',
homeController.showPage);

router.get('/logout',
homeController.logout)

router.get('/course/:slug',
homeController.showCoursePage);

router.get('/download/:id',
homeController.download);

router.get('/article/:slug',
homeController.showArticlePage);

router.get('/courses',
homeController.showCourses)

router.get('/articles',
homeController.showArticles)

router.use('/comment',commentRouter)
router.use('/forum',forumRouter)

module.exports = router;