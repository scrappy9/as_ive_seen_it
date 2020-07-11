const mongoose = require("mongoose");
const db = require("../config/db");
const user_schema = new mongoose.Schema({
    username: String,
    password: String,
    reg_date: Number,
    email:    String,
});
const user = db.model("user", user_schema);

module.exports = user; 
