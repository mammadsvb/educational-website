const Controller = require('../../main/controller');



//dbs
const Role = require('../../../models/role');
const User = require('../../../models/User');

module.exports = new class extends Controller{

    async showPage(req,res){

        const users = await User.find({}).populate('roles');

        res.render('pages/admin/user/user',{users})
    }

    async showCreatePage(req,res){

        res.render('pages/admin/user/createUser',{massages : req.flash('errors'),success : req.flash('success')})
    }

    validator(req,res,next){
        this.validation(req,res,next)
    }

    async createUser(req,res){
        const {username,email} = req.body;

        const newUser = new User({
            username,
            email,
            password:username
        })
        newUser.password = newUser.hashPass(newUser.password)
        await newUser.save();

        req.flash('success','user added');
        this.back(req,res)
    }


    async destroy(req,res){
        const user = await User.findByIdAndDelete(req.params.id);

        if(!user)
            return res.json('not Found');

        res.redirect('/admin/user');
    }

    async showEditPage(req,res){

        const user = await User.findById(req.params.id);


        res.render('pages/admin/user/editUser',{massages:req.flash('errors') , user });
    }

    async update(req,res){

        const {username,password,email} = req.body

        const user = await User.findById(req.params.id)
        if(!user)
            return res.json('not found');
        user.set({
            username,
            email,
            password : password != user.password ? user.hashPass(password): user.password,
        })

        await user.save()


        res.redirect('/admin/user');
    }

    async adminAccess(req,res){
        const user = await User.findById(req.params.id);
        
        user.set({
            admin : !user.admin,
        });

        await user.save();
        res.redirect('/admin/user')
    }
    
}