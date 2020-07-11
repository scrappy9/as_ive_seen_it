const comment_model = require("../models/comment");

module.exports = function () {
    return function (req, res, next) {

        comment_model.findOne({_id: req.params.comment_id})
        .select("-__v")
        .exec((err, comment) => {
            if(err || !comment){
                return next(err);
            }

            res.locals.comment = comment;
            return next();
        });
    }
}