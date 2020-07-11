const express = require("express");

const authMW = require("../middleware/authMW");
const renderMW = require("../middleware/renderMW");
const getCommentByIdMW = require("../middleware/getCommentById");
const saveCommentMW = require("../middleware/saveCommentMW");
const editCommentMW = require("../middleware/editCommentMW");
var router = express.Router();


router.post("/new/:imdb_id",
    authMW(),
    saveCommentMW()
);

router.get("/delete/:comment_id",
    authMW(),
    getCommentByIdMW(),
    (req, res, next) => {
        const redir = res.locals.comment.movie_imdb_id;
        if(res.locals.comment._author == res.locals.user._id){
            res.locals.comment.remove()
        }
        return res.redirect(`/movie/details/${redir}`);
    }
);

router.get("/edit/:comment_id",
    authMW(),
    getCommentByIdMW(),
    (req, res, next) => {
        res.locals.comment.action =  `/comment/edit/${req.params.comment_id}`;            
        return next();
    },
    renderMW("../views/pages/comment_edit.ejs")
);

router.post("/edit/:comment_id",
    authMW(),
    editCommentMW(),
);

module.exports = router;