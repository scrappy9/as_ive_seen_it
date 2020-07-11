var express = require("express");
const { check, validationResult } = require('express-validator');

const getUserByName = require("../middleware/getUserByName");
const checkPassMW = require("../middleware/checkPassMW");
const setSessionMW = require("../middleware/setSessionMW");
const redirectMW = require("../middleware/redirectMW");

var router = express.Router();

router.post("/", 
    [check('username').not().isEmpty(), check('password').not().isEmpty()], 
    (req, res, next) => {
        var results = validationResult(req);
        if(results.isEmpty()){
            return next();
        }else{
            return res.redirect("/login?error=invalid_input");
        }
    },
    getUserByName(),
    (req, res, next) => {
        if(res.locals.user == undefined){
           return res.redirect("/login?error=invalid_username");
        }
        return next();
    },
    checkPassMW(),
    setSessionMW(),
    redirectMW("/movie/popular")
);

router.get("/", (req, res) => {
    if(req.session.logged_in === true){
        res.redirect(`/user/${req.session.user._id}`);
    }else{
        //return res.json(req.query);
        res.locals.query = req.query;
        return res.render("pages/login.ejs");
    }
})
module.exports = router;
