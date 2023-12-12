const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const forumAns = new mongoose.Schema({
    user : {type : Schema.Types.ObjectId , ref : 'User'},
    question : {type : Schema.Types.ObjectId , ref : 'ForumQue'},
    name : {type : String , required : true},
    body : {type : String , required : true},
},{
    timestamps:true
});

forumAns.plugin(mongoosePaginate);

module.exports = mongoose.model('ForumAns',forumAns);