/**
 *  Finds the most popular movies based on comment counts.
 */

const comment_model = require("../models/comment");

module.exports = function() {
    return function(req, res, next) {  
        comment_model.aggregate([
            {"$group": {_id: { "movie_name": "$movie_name", "movie_imdb_id": "$movie_imdb_id", }, count: {"$sum": 1}}},
            {"$sort": {count: -1}},
            {"$limit": 20}
        ]).then(resp => {
            res.locals.popular_movies = resp;
            return next();
            return res.json(resp);
        });
    };
};