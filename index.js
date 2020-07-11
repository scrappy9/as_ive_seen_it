const express = require("express");
const session = require("express-session");
const mongo_store = require('connect-mongo')(session);
const ejs = require("ejs");

const app = express();
const port = process.env.PORT || 80; //TODO: change port to 3000 because reasons

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = require("./config/db");
app.use(session({
    secret: "randomstringandstuff",
    resave: false,
    saveUninitialized: false,
    store: new mongo_store({mongooseConnection: db.connection}) 
}));

var register_router = require("./routes/register");
var login_router = require("./routes/login");
const user_router = require("./routes/user");
const movie_router = require("./routes/movie");
const comment_router = require("./routes/comment");

app.use("/register", register_router);
app.use("/login", login_router);
app.use("/user", user_router);
app.use("/movie", movie_router);
app.use("/comment", comment_router);

app.get("/logout", (req, res, next) => {
    req.session.destroy(err => {res.redirect("/login")});
});

const authMW = require("./middleware/authMW");
app.get("/",
    authMW(),
    (req, res, next) => {
        res.render("./pages/main.ejs");
        //return res.redirect(`/user/${res.locals.user._id}`)
        //return res.json(res.locals.user);
});

app.use((err, req, res, next) => {
    res.end('Problem...');
    console.log(err);
});

app.listen(port, () => {console.log("Listening on port: " + port);});
