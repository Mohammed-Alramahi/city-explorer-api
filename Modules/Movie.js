const Axios = require('axios');
function handleMovieApi(request,response){
    let movieName=request.query.q;
    const envMovieUrl=process.env.MOVIE_API;
    const envMovieApiKey=process.env.MOVIE_API_KEY;
    let movieUrl;
    if(movieName){
       movieUrl=`${envMovieUrl}api_key=${envMovieApiKey}&query=${movieName}`
       console.log(`${envMovieUrl}api_key=${envMovieApiKey}&query=${movieName}`);
    }
    else{
        response.send('Something wrong!');
    }
    Axios
    .get(movieUrl)
    .then(result=>{
    let movies=result.data.results.map(item=>{
        return new Movie(item);
    })
    response.send(movies);
    })
    .catch(err=>{
        response.send(err.message);
    });
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