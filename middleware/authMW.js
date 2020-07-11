/**
 *  If session exists then expose user details to ejs,
 *  otherwise redirect to login page.
 */

module.exports = function() {
    return function(req, res, next) {
        if( typeof req.session.logged_in === "undefined" || req.session.logged_in !== true){
            return res.redirect("/login");
        }

        res.locals.user = req.session.user;
        
        next();
    };
};
