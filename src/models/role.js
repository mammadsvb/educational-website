const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const roleSchema = new mongoose.Schema({
    name :{type : String , required : true},
    label :{type : String , required : true},
    permissions :[{type : Schema.Types.ObjectId , ref : 'Permission'}],
},{
    timestamps : true
});

roleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Role',roleSchema);