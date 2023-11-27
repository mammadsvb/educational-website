const Controller = require('../../main/controller');

const Comment = require('../../../models/comment')

module.exports = new class extends Controller{

    async showPage(req,res){

        const comments = await Comment.paginate({},{limit:10,sort:{createdAt : -1},populate:[{
            path:'user',
            select :'username'
        },
        'course',
        'article'
    ]})
    
        // return res.json(comments)
        res.render('pages/admin/comment/comment',{comments:comments.docs});

    }

    async destroy(req,res){
        const deleteComment = await Comment.findByIdAndDelete(req.params.id).populate('comments').populate('autoSection');
        // return res.json(deleteComment)

        if(!deleteComment)
            res.json('this commnet don\'t exist');

        deleteComment.comments.forEach(async(comment)=>{ 
            const cm = await Comment.findByIdAndDelete(comment._id).populate('autoSection');

            cm.autoSection.inc('commentCount',-1);
        });

        deleteComment.autoSection.inc('commentCount',-1)
        
        this.back(req,res)
    }

    async approve(req,res){
        const approveComment = await Comment.findByIdAndUpdate(req.params.id,{$set:{check:true}}).populate('autoSection');

        
        if(!approveComment)
            res.json('this commnet don\'t exist');

        approveComment.autoSection.inc('commentCount')

        this.back(req,res);

    }



}