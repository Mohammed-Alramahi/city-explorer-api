const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Axios = require('axios');
const envPort = process.env.PORT;
const server = express();


server.use(cors());
server.listen(envPort, () => {
    console.log("listening to port: " + envPort, "http://localhost:3300/weather?q=amman&lon=36&lat=32");
});
server.get('/', (request, response) => {
    response.send("not found!")
});
server.get('/weather', handleWeatherApi);
function handleWeatherApi(request, response) {
    const envWeatherUrl = process.env.WEATHER_API;
    const envWeatherApiKey = process.env.WEATHER_API_KEY;
    let lon = request.query.lon;
    let lat = request.query.lat;
    let weatherUrl = `${envWeatherUrl}lat=${lat}&lon=${lon}&key=${envWeatherApiKey}`;
    Axios
    .get(weatherUrl)
    .then(result => {
        console.log('hello', result.data);

        let forecastArr = result.data.data.map(item => {
            return new Forecast(item);
        });
        response.send(forecastArr);

    })
    .catch(err=>{
     response.send(err.message);
    });
}


server.get('/movies',handleMovieApi);
function handleMovieApi(request,response){
    let movieName=request.query.q;
    const envMovieUrl=process.env.MOVIE_API;
    const envMovieApiKey=process.env.MOVIE_API_KEY;
    let movieUrl;
    if(movieName){
       movieUrl=`${envMovieUrl}api_key=${envMovieApiKey}&query=${movieName}`
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
server.get('*', (request, response) => {
    response.send("not found!")
});


class Forecast {
    constructor(item) {
        this.date = item.datetime;
        this.description = item.weather.description;
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