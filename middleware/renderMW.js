
module.exports = function (view_path){
    return function (req, res, next) {
        res.render(view_path);
    };
};