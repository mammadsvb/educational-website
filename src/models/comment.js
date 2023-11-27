const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
    user : {type : Schema.Types.ObjectId , ref :'User'},
    course : {type : Schema.Types.ObjectId , ref :'Course' , default : undefined},
    article : {type : Schema.Types.ObjectId , ref :'Article' , default : undefined},
    comment : {type : String , required : true},
    check : {type:Boolean , default : false},
    parent : {type : Schema.Types.ObjectId , ref:'Comment' , default : null}
},{
    timestamps:true,
    toJSON : {virtuals : true},
});

commentSchema.virtual('comments',{
    ref:'Comment',
    localField : '_id',
    foreignField : 'parent'
})

commentSchema.virtual('autoSection',{
    ref : doc=>{
        if(doc.course)
            return 'Course';
        else if (doc.article)
            return 'Article';
    },

    localField : doc=>{
        if(doc.course)
            return 'course'
        else if(doc.article)
            return 'article'
    },

    foreignField : '_id',
    justOne : true

})

commentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Comment",commentSchema);