const express = require('express');
const cors= require('cors');
require('dotenv').config();
const port= process.env.PORT;
const weatherData=require('./assets/data/weather.json');
const server=express();

server.use(cors());
server.listen(port,()=>{
    console.log("listening to port: "+port,"http://localhost:"+port+"/weather");
});
server.get('/weather',(request,response)=>{
 let city_name=request.query.searchQuery;
 let lon=request.query.lon;
 let lat=request.query.lat;
 let cityData;
 let responseArr=weatherData.find(item=>{
 if(item.city_name.toLowerCase()==city_name.toLowerCase()&&item.lon==lon&&item.lat==lat){
    cityData=new Forecast(item); 
    return item;
     
 }
 
 console.log(city_name,lon,lat);
 });
 response.send(cityData);
 console.log(cityData);
});

class Forecast{
    constructor(responseArr){
            this.data=responseArr.data.map(item=>{
            let low="Low of "+item.low_temp;
            let high=", high of "+item.max_temp;
            return {"description":low+high+" with "+item.weather.description,"date":item.datetime};
            });
            
    }
    
}