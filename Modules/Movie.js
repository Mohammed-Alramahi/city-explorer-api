const Axios = require('axios');
let cache={};
function handleMovieApi(request,response){
    let movieName=request.query.q;
    const envMovieUrl=process.env.MOVIE_API;
    const envMovieApiKey=process.env.MOVIE_API_KEY;
    let movieUrl;
    if (cache[movieName] !== undefined) {
        console.log('Data came from the Memory');
        response.send(cache[movieName]);
    }
    else{
            movieUrl=`${envMovieUrl}api_key=${envMovieApiKey}&query=${movieName}`
            console.log(`${envMovieUrl}api_key=${envMovieApiKey}&query=${movieName}`);
         Axios
         .get(movieUrl)
         .then(result=>{
         let movies=result.data.results.map(item=>{
             return new Movie(item);
         })
         cache[movieName] = movies;
         response.send(movies);
         })
         .catch(err=>{
             response.send(err.message);
         });
         console.log("Data came from request");   
        }
   
}

class Movie {
    constructor(item) {
        this.title = item.title;
        this.overview = item.overview;
        this.average_votes=item.vote_average;
        this.total_votes=item.vote_count;
        this.popularity=item.popularity;
        this.released_on=item.release_date;
    }

}
module.exports=handleMovieApi;