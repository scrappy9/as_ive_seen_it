/**
 * 
 */

 const user_model = require("../models/user");

 module.exports = function () {
    return function (req, res, next) {
        user_model.findOne({_id: req.params.user_id},
            (err, _user) => {
                if(!err){
                    res.locals.user = _user;
                }else{
                    res.locals.user = undefined;
                }                
                return next();
            }
        );
    }
 }