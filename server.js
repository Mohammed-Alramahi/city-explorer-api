const express = require('express');
const cors= require('cors');
require('dotenv').config();
const Axios=require('axios');
const envPort= process.env.PORT;
const envWeatherUrl=process.env.WEATHER_API;
const envWeatherApiKey=process.env.WEATHER_API_KEY;
const server=express();


server.use(cors());
server.listen(envPort,()=>{
    console.log("listening to port: "+envPort,"http://localhost:3300/weather?q=amman&lon=36&lat=32");
});
server.get('/',(request,response)=>{
 response.send("not found!")
 });
server.get('/weather',handleWeatherApi);
 function handleWeatherApi(request,response){ 
 let lon=request.query.lon;
 let lat=request.query.lat;
 let weatherUrl=`${envWeatherUrl}lat=${lat}&lon=${lon}&key=${envWeatherApiKey}`;
  Axios.get(weatherUrl).then(result=>{
    console.log('hello',result.data);
 
 let forecastArr=result.data.data.map(item=>{
  return new Forecast(item);
 });
 response.send(forecastArr);

 });
}

class Forecast{
    constructor(item){
         this.date=item.datetime;
         this.description=item.weather.description;
    }
    
}

server.get('*',(request,response)=>{
    response.send("not found!ss")
    });
    