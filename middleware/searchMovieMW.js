const axios = require("axios");

module.exports = function(){
    return function (req, res, next) {

        let url = "http://www.omdbapi.com/?apikey=db47dc19&s=";
    
        var search_tearm = req.query.q.normalize("NFD")
        .replace(/[^a-zA-Z0-9 ]/g, "")      //keep alfanumeric ch.
        .replace(/\s/g, "+");               //replace spaces
    
        url = url + search_tearm;
    
        res.locals.movie_list = [];
    
        axios.get(url)
        .then( (response) => {
            if(response.data.Response === "False"){
                return res.send("Something went wrong!");
            }
    
            response.data.Search.forEach(element => {
                res.locals.movie_list.push({
                    title: element.Title,
                    year: element.Year,
                    poster: element.Poster,
                    imdb_id: element.imdbID,
                });
            });
            
            return next();
        });
    }
}