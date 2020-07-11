/**
*
*/

module.exports = function (redirect_path){
    return function (req, res, next) {
        res.redirect(redirect_path);
    }
}