var express = require("express");

const authMW = require("../middleware/authMW");
const searchMovieMW = require("../middleware/searchMovieMW");
const getMovieByIdMW = require("../middleware/getMovieByIdMW");
const getCommentsByMovie = require("../middleware/getCommentsByMovie");
const getPopularMoviesMW = require("../middleware/getPopularMoviesMW");

const renderMW = require("../middleware/renderMW");
const redirectMW = require("../middleware/redirectMW");

var router = express.Router();

router.get("/popular",
    authMW(),
    getPopularMoviesMW(),
    renderMW("pages/top_movies.ejs"),
);

router.get("/search",
    authMW(),
    searchMovieMW(),
    renderMW("pages/movie_list.ejs")
);

router.get("/details/:imdb_id",
    authMW(),
    getMovieByIdMW(),
    getCommentsByMovie(),
    renderMW("pages/movie.ejs")
);

module.exports = router;