const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueString = require('unique-string');

const userSchema = new mongoose.Schema({
    username : {type  : String , required : true},
    email : {type  : String , required : true},
    password : {type  : String , required : true},
    rememberToken : {type : String , default : ''},
    admin : {type : Boolean , default : false}
},{
    timestamps : true,
    toJSON : {virtuals : true},
})

userSchema.pre('save',function(next){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password,salt);
    this.password = hash;

    next();
})

userSchema.pre('findOneAndUpdate',function(next){

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.getUpdate().$set.password,salt);
    this.getUpdate().$set.password = hash;
    
    next();
 
})




userSchema.methods.comparePass = function(password){

    return bcrypt.compareSync(password , this.password);

}

userSchema.methods.setRememberToken = function(res){

    const token = uniqueString();
    res.cookie('remember_token' , token , {maxAge : 1000 * 60 * 60 * 24 * 2 , httpOnly : true , signed : true});

    this.updateOne({rememberToken : token})
        .catch(err => console.error(err));
}

userSchema.methods.isVip=function(){
    return true;
}

userSchema.methods.payCash=function(){
    return false;
}



userSchema.virtual('courses',{
    ref : "Course",
    localField : "_id",
    foreignField : 'user'
});

userSchema.virtual('articles',{
    ref:'Article',
    localField:'_id',
    foreignField: 'user'
});

userSchema.virtual('comments',{
    ref: 'Comment',
    localField : '_id',
    foreignField:'user'
})





module.exports = mongoose.model('User',userSchema);