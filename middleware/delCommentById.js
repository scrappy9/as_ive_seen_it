const comment_model = require("../models/comment");

module.exports = function () {
    return function (req, res, next) {

        comment_model.deleteOne(
            {
                _id: req.params.comment_id,
                _author: res.locals.user._id
            }
        )
        .exec()
        .then(
            (result) => {
                res.json(result); 
            }
        )
        .catch(
            (err) => {
                if(err){
                    return res.send("failed to delete comment!");
                }
            }
        );
    }
}