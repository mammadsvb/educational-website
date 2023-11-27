const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongoosePaginate = require('mongoose-paginate-v2');


const articleSchema = new mongoose.Schema({
    user : {type : Schema.Types.ObjectId , ref:'User'},
    title : {type:String ,required:true},
    slug : {type:String ,default:''},
    content : {type:String ,required:true},
    images : {type:Object ,required:true},
    tags : {type:String ,required:true},
    categoreis : [{type : Schema.Types.ObjectId, ref:'Category'}],
    viewCount : {type:Number ,default:0},
    commentCount : {type:Number ,default:0},
},{
    timestamps : true,
    toJSON :{virtuals:true}
});

articleSchema.pre('save',function(next){
    this.slug = this.title.trim().replace(/[^0-9|a-z|A-Z]|-/g,'-')

    next();
})

articleSchema.methods.inc = async function(field,num=1){
    this[field] += num;
    await this.save();

}

articleSchema.virtual('comments',{
    ref:'Comment',
    localField : '_id',
    foreignField:'article',
});

articleSchema.plugin(mongoosePaginate)


module.exports = mongoose.model('Article',articleSchema);