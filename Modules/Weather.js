const Axios= require('axios');
function handleWeatherApi(request, response) {
    const envWeatherUrl = process.env.WEATHER_API;
    const envWeatherApiKey = process.env.WEATHER_API_KEY;
    let lon = request.query.lon;
    let lat = request.query.lat;
    let weatherUrl = `${envWeatherUrl}lat=${lat}&lon=${lon}&key=${envWeatherApiKey}`;
    Axios
        .get(weatherUrl)
        .then(result => {
            let forecastArr = result.data.data.map(item => {
                return new Forecast(item);
            });
            response.send(forecastArr);

        })
        .catch(err => {
            response.send(err.message);
        });
}

class Forecast {
    constructor(item) {
        this.date = item.datetime;
        this.description = item.weather.description;
    }

}
module.exports=handleWeatherApi;