/**
 *
 */

module.exports = function() {
    return function(req, res, next) {
        res.locals.user.password = undefined; //prevents potential leaks
        req.session.user = res.locals.user;
        req.session.logged_in = true;
        req.session.last_login = Date.now();
        return next();
    };
};
