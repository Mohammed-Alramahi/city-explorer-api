const express = require('express');
const cors= require('cors');
require('dotenv').config();
const port= process.env.PORT;
const weatherData=require('./assets/data/weather.json');
const server=express();

server.use(cors());
server.listen(port,()=>{
    console.log("listening to port: "+port,"http://localhost:3300/weather?q=amman&lon=36&lat=32");
});
server.get('/',(request,response)=>{
 response.send("not found!")
 });
server.get('/weather',(request,response)=>{
 let city_name=request.query.q;
 let lon=request.query.lon;
 let lat=request.query.lat;
 let responseArr=weatherData.find(item=>{
 if(item.city_name.toLowerCase()==city_name.toLowerCase()&&Math.round(item.lon)==lon&&Math.round(item.lat)==lat){
 
    return item;
     
 }
 });
 console.log(responseArr);
 if(responseArr){
 let cityData=responseArr.data.map(item=>{
    return new Forecast(item); 
    });
    
        response.send(cityData);
    }
    else{
        response.send("not found!");
    }
});

class Forecast{
    constructor(item){
         this.date=item.datetime;
         this.description=item.weather.description;
    }
    
}

server.get('*',(request,response)=>{
    response.send("not found!")
    });
    