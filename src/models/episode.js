const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const bcrypt = require('bcrypt');

const episodeSchema = new mongoose.Schema({

    course : {type : Schema.Types.ObjectId , ref:'Course'},
    title  : {type : String , required : true},
    type   : {type : String , required : true},
    number  : {type : String , required : true},
    content  : {type : String , required : true},
    time    : {type : String , default : "00:00:00"},
    videoUrl  : {type : String , required : true},
    downloadCount  : {type : Number , default : 0},

},{
    timestamps : true,
})

episodeSchema.plugin(mongoosePaginate);

episodeSchema.methods.download = function(check,accessUser){
    if(!check) return '#';

    let access = false;
    if(this.type = 'free'){
        access = true
    }else if(this.type == 'vip' || this.type == 'cash')
        access = accessUser
    
    const time = new Date().getTime() * 1000 *60*60*24*2;
    const secret = `kjasd@AS78!xck5q%w${this.id}${time}`
    const salt =  bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(secret,salt);

    return access ? `/download/${this.id}?secret=${hash}&t=${time}` : '#';
}

episodeSchema.methods.inc = async function(filed,number=1){
    this[filed] += number;
    await this.save() 
}

module.exports =  mongoose.model('Episode',episodeSchema);