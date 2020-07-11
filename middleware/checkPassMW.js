const bcrypt = require('bcrypt');

module.exports = function() {
    return function(req, res, next) {

        bcrypt.compare(req.body.password, res.locals.user.password, function(err, result) {
            // result == true or false
            if(result){
                return next();
            }else {
                return res.redirect("/login?error=incorrect_password");
            }
        });
    };
};
