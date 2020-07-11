const user_model = require("../models/user");
const bcrypt = require('bcrypt');

module.exports = function() {
    return function (req, res, next){
        /*
        let user = new user_model();
        user.username = req.body.username;
        user.reg_date = Date.now();
        user.email = req.body.email;

        //user.password = req.body.password; //TODO hash
        console.log(user.password);
        user.save();
        */

        bcrypt.genSalt(10)
        .then(salt => {
            console.log(`Salt: ${salt}`);
            return bcrypt.hash(req.body.password, salt);
          })
          .then(hash => {
            console.log(`Hash: ${hash}`);

            // Store hash in your password DB.
            let user = new user_model();
            user.username = req.body.username;
            user.reg_date = Date.now();
            user.email = req.body.email;    
            user.password = hash;
            console.log(user.password);
            user.save();

            return next();
          })
          .catch(err => res.redirect("/login?error=internal_error"));

          //return next();          
    };
}