const Controller = require('../../main/controller');

const Episode = require('../../../models/episode')
const Course = require('../../../models/course')

module.exports = new class extends Controller{

    async showPage(req,res){
        // const episodes = await Episode.paginate({},{page ,limit:10});

        const episodes = await Episode.find({}).populate('course');
        // const courses = await  Course.find({});
        res.render('pages/admin/episode/episode',{episodes})
    }

    async showCreatePage(req,res){

        const courses = await Course.find({});
        res.render('pages/admin/episode/createEpisode',{massages : req.flash('errors'),success: req.flash('success') ,courses})
    }

    validator(req,res,next){
        this.validation(req,res,next);
    }

    createEpisode(req,res){
        const newEpisode = new Episode({...req.body});

        newEpisode.save().catch(err => console.error(err))    

        this.updateCourseTime(req.body.course);
    
        req.flash('success',"episode added");
        return this.back(req,res);
    }

    async destroy(req,res){
        const episode = await Episode.findByIdAndDelete(req.params.id);
        if(!episode)
            return res.json('episode not found');

        this.updateCourseTime(episode.course);
        
        return this.back(req,res);
    }

    async showUpdatePage(req,res){
        const episode = await Episode.findById(req.params.id);
        const courses = await Course.find({});

        res.render('pages/admin/episode/editEpisode',{massages : req.flash('errors') , episode , courses});
    }

    async update(req,res){

        await Episode.findByIdAndUpdate(req.params.id ,{$set : {...req.body}});
        
        this.updateCourseTime(req.body.course);

        res.redirect('/admin/episode');

    }

    async updateCourseTime(courseId){

        const course = await Course.findById(courseId).populate('episodes');
        // const episodes = await Episode.find({course : courseId});

        course.set({
            time : this.getCourseTime(course.episodes),
          });

        course.save();
    }

    getCourseTime(episodes){
        
        let seconed = 0;

        episodes.forEach(episode =>{
            const time = episode.time.split(':');

            if(time.length == 2){
                seconed += parseInt(time[0]) * 60;
                seconed += parseInt(time[1]); 

            }else if( time.length == 3){

                seconed += parseInt(time[0]) * 60 * 60;
                seconed += parseInt(time[1]) * 60;
                seconed += parseInt(time[2]); 
            }

        })

        let hour = Math.floor(seconed /3600);
        let min   = Math.floor(seconed /60) % 60;
        seconed = Math.floor(seconed % 60);

        hour = hour>9 ? String(hour) : `0${hour}`;
        min  = min >9 ? String(min)  : `0${min}`;
        seconed  = seconed >9 ? String(seconed)  : `0${seconed}`;
        
        
        return `${hour}:${min}:${seconed}`;

    }



}