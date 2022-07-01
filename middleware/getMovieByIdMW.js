const axios = require("axios");
const api_key = require("../config/omdb");

module.exports = function(){
    return function (req, res, next) {

        let url = `https://www.omdbapi.com/?apikey=${api_key}&plot=full&i=`;
    
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