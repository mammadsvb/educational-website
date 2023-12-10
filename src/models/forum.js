const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const forumSchema = new mongoose.Schema({
    user  : {type : Schema.Types.ObjectId , ref:'User'},
    name : {type : String , required : true},
    label : {type : String , required : true},
},{
    timestamps : true
});


module.exports = mongoose.model('Forum',forumSchema);