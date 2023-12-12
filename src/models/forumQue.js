const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const Schema = mongoose.Schema;

const forumQueSchema = new mongoose.Schema({
    user  : {type : Schema.Types.ObjectId , ref:'User'},
    name : {type : String , required : true},
    body : {type : String , required : true},
    forum : {type : Schema.Types.ObjectId , ref : 'Forum'},
    countAns : {type : Number , default : 0},
},{
    timestamps : true
});

forumQueSchema.methods.inc = async function(filed,num=1){

    this[filed] += num;
    await this.save();
}


forumQueSchema.plugin(mongoosePaginate);




module.exports = mongoose.model('ForumQue',forumQueSchema);