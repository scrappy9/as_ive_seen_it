const axios = require("axios");

module.exports = function(){
    return function (req, res, next) {

        let url = "http://www.omdbapi.com/?apikey=db47dc19&plot=full&i=";
    
        url += req.params.imdb_id;
    
        axios.get(url)
        .then( (response) => {
            if(response.data.Response === "False"){
                return res.send("Movie not found!");
            }

            res.locals.movie = {
                title: response.data.Title,
                plot: response.data.Plot,
                poster: response.data.Poster,
                imdb_id: response.data.imdbID,
                all_data: response.data,
            };
                
            return next();
        });
    }
}