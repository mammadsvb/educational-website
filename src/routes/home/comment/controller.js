const Controller = require('../../main/controller');

const Comment = require('../../../models/comment');

module.exports = new class extends Controller{

    async comment(req,res){
        if(!req.body.comment)
            return this.back(req,res);

        const comment = new Comment({
                user: req.user._id,
                ...req.body
        });

        await comment.save();

        this.back(req,res);

    }

}