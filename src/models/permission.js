const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const permissionSchema = new mongoose.Schema({
    name:{type:String , required:true},
    label:{type:String , required:true}
},{
    timestamps : true
});

permissionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Permission',permissionSchema);