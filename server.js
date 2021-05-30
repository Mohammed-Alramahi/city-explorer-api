const express = require('express');
const cors = require('cors');
require('dotenv').config();
const MovieHandler = require('./Modules/Movie.js');
const WeatherHandler=require('./Modules/Weather.js');
const envPort = process.env.PORT;
const server = express();

server.use(cors());
server.listen(envPort, () => {
    console.log("listening to port: " + envPort);
});
server.get('/', (request, response) => {
    response.send("not found!")
});
server.get('/weather', WeatherHandler);

server.get('/movies', MovieHandler);

server.get('*', (request, response) => {
    response.send("not found!")
});


