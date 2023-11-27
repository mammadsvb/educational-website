const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User')

passport.use('local.register',new LocalStrategy({
    usernameField : 'email',
    passportField : 'password',
    passReqToCallback : true

},async (req,email,password,done)=>{
    
    try{
        let user = await User.findOne({email});

        if(user)    return done(null,false,req.flash('errors','user already register.'))

    }catch(err){
        done(err)
    }

    const addUser = new User({
        username : req.body.username,
        email,
        password,
    });

    addUser.save()
    .then(user => done(null,user))
    .catch(err => done(err,false,req.flash('errors','server done.')));


}))


passport.use('local.login',new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
},async (req,email,password,done)=>{

    try{
        
        const user = await User.findOne({email});

        if(!user || !user.comparePass(password)) return done(null,false,req.flash('errors','user not found'));

        done(null,user);

    }catch{
        done(err);
    }

}))



passport.serializeUser((user, done)=>{
    done(null , user.id);
})

passport.deserializeUser((id, done)=>{
    User.findById(id)
        .then(user => done(null,user));

})