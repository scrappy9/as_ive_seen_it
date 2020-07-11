const mongoose = require("mongoose");
const db = require("../config/db");

const comment_schema = new mongoose.Schema({
    date: Number,
    movie_name: String,
    movie_imdb_id: String,
    content: String,
    _author: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "user",
    },
    
});
const comment = db.model("comment", comment_schema);

module.exports = comment; 
