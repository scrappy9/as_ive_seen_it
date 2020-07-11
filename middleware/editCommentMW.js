const comment_model = require("../models/comment");

module.exports = function () {
    return function (req, res, next) {

        comment_model.findOneAndUpdate(
            {
                _id: req.params.comment_id,
                _author: res.locals.user._id
            },
            {
                "$set":{
                    "content": req.body.content
                }
            },
            {
                new: true
            }    
        ).exec()
        .then(movie => {
            return res.redirect(`/movie/details/${movie.movie_imdb_id}`);
            res.json(movie) 
        })
        .catch(err => {res.send("access denied") })
    }
}