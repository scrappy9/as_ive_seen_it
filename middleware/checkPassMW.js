/**
 *
 */

module.exports = function() {
    return function(req, res, next) {
        if(res.locals.user.password == req.body.password){
            return next();
        }else {
            return res.redirect("/login?password=incorrect");
        }
    };
};
