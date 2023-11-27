const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;


const categorySchema = new mongoose.Schema({
    name  :{type:String , required :true},
    slug  :{type:String , default:''},
    parent:{type:Schema.Types.ObjectId , ref:'Category' , default:null}
},{
    timestamps : true,
    toJSON :{virtuals:true}
});

categorySchema.pre('save',function(next){
    this.slug = this.name.trim().replace(/[^0-9|a-z|A-Z]|-/g,'-');
    
    next();
})


categorySchema.virtual('childs',{
    ref:'Category',
    localField:'_id',
    foreignField:'parent'
});


module.exports = mongoose.model('Category',categorySchema);