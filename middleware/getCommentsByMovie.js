const comment_model = require("../models/comment");

module.exports = function () {
    return function (req, res, next) {

        comment_model.find({movie_imdb_id: req.params.imdb_id})
        .select("-__v")
        .populate("_author", "-password -email -__v")
        .exec((err, comments) => {
            res.locals.comment_list = comments;
            return next();
            return res.json(comments);
        });
    }
}