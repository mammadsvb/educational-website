const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/User');

require('dotenv').config()


passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
     
    User.findOne({email : profile.email})
      .then(user =>{
        if(user)  return done(null,user);

        const addUser = new User({
          username : profile.displayName,
          email : profile.email,
          password : profile.id
        });

        addUser.save()
          .catch(err => done(err));
       
        return done(null,addUser)
      })
      .catch(err => done(err))
  }
));



passport.serializeUser((user, done)=>{
  done(null , user.id);
})

passport.deserializeUser((id, done)=>{
  User.findById(id)
      .then(user => done(null,user));

})