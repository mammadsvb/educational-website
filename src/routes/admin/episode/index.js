const express = require('express');
const router  = express.Router();

const episodeController = require('./controller');
const episodeValidator = require('./validator');

router.use((req,res,next)=>{
    res.locals.layout = 'layouts/adminMaster';

    next();
});


router.get('/',
episodeController.showPage);

router.get('/create',
episodeController.showCreatePage);

router.post('/create',
episodeValidator.handle(),
episodeController.validator,
episodeController.createEpisode);

router.delete('/:id',
episodeController.destroy);

router.get('/edit/:id',
episodeController.showUpdatePage)

router.put('/:id',
episodeValidator.handle(),
episodeController.validator,
episodeController.update)


module.exports = router;