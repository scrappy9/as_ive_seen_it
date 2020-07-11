const user_model = require("../models/user");

module.exports = function() {
    return function (req, res, next){
        let user = new user_model();

        user.username = req.body.username; //TODO unique
        user.reg_date = Date.now();
        user.email = req.body.email;
        user.password = req.body.password; //TODO hash
        user.save();
        return next();
    };
}