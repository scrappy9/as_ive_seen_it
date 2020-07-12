const user_model = require("../models/user");
const bcrypt = require('bcrypt');

module.exports = function() {
    return function (req, res, next){
        bcrypt.genSalt(10)
        .then(salt => {
            return bcrypt.hash(req.body.password, salt);
          })
        .then(hash => {
          
          let user = new user_model();
          user.username = req.body.username;
          user.reg_date = Date.now();
          user.email = req.body.email;    
          user.password = hash;
          user.save();

          return next();
        })
        .catch(err => res.redirect("/login?error=db_error"));        
    };
}