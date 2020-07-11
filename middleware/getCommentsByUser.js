
const comment_model = require("../models/comment");

module.exports = function () {
    return function (req, res, next) {
        //return res.json(req.params);
        comment_model.find({_author: req.params.user_id})
        .select("-__v")
        .exec((err, comments) => {
            res.locals.comment_list = comments;
            return next();
            return res.json(comments);
        });

    };
};