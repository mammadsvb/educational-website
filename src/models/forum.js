const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const Schema = mongoose.Schema;

const forumSchema = new mongoose.Schema({
    user  : {type : Schema.Types.ObjectId , ref:'User'},
    name : {type : String , required : true},
    label : {type : String , required : true},
},{
    timestamps : true,
    toJSON : true
});

forumSchema.virtual('questions',{
    ref : 'ForumQue',
    localField : '_id',
    foreignField : 'forum'
})


forumSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Forum',forumSchema);