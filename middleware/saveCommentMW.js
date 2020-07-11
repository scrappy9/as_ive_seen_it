const comment_model = require("../models/comment");
const axios = require("axios");

module.exports = function (){
    return function (req, res, next) {
        
        if(typeof res.locals.comment !== "undefined"){
            res.locals.comment.save()
            return res.redirect(`/movie/details/${req.params.imdb_id}`);
        }


        let url = `http://www.omdbapi.com/?apikey=db47dc19&i=${req.params.imdb_id}`;
        axios.get(url)
        .then((response) => {
            if(response.data.Response === "False"){
                return res.send("Something went wrong!");
            }else{
                return(response.data);
            }
        }).then(data => {
            //return res.json(data);
            res.locals.comment = new comment_model();         
            res.locals.comment.date = Date.now();
            res.locals.comment.movie_name = `${data.Title} (${data.Year})`;
            res.locals.comment.movie_imdb_id = req.params.imdb_id;
            res.locals.comment.content = req.body.content;
            res.locals.comment._author = req.session.user;
            res.locals.comment.save()
            .then( result => { res.redirect(`/movie/details/${req.params.imdb_id}`); } )
            .catch( error => { res.send("comment failed to save")} );
        });
        

    }
}