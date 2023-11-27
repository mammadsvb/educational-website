const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema

const courseScehma = new mongoose.Schema({
    user : {type : Schema.Types.ObjectId , ref : 'User'},
    title : {type : String , required : true},
    type : {type : String , required : true},
    content : {type : String , required : true},
    image : {type : Object , required : true},
    price : {type : String , required : true},
    tags : {type : String , required : true},
    time : { type : String , default : "00:00:00"},
    categoreis :[{type:Schema.Types.ObjectId , ref :'Category'}],
    viewCount : {type : Number , default : 0},
    commentCount : {type : Number , default : 0},
    slug : {type : String , default : ''},
},{
    timestamps : true,
    toJSON : {virtuals : true}
})

courseScehma.pre('save',function(next){
    this.slug = this.title.trim().replace(/[^0-9|a-z|A-Z]|-/g,'-')

    next();

});

courseScehma.methods.inc = async function(field,num=1){
    this[field] += num;
    await this.save();
}

courseScehma.virtual('episodes',{
    ref:'Episode',
    localField:'_id',
    foreignField : 'course'
})

courseScehma.virtual('comments',{
    ref:'Comment',
    localField : '_id',
    foreignField : 'course'
})

courseScehma.plugin(mongoosePaginate)

module.exports = mongoose.model('Course',courseScehma);