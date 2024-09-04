require('dotenv').config();
require('fs');
const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const port = process.env.PORT;
scope = 'user-read-currently-playing user-modify-playback-state user-read-playback-state'

app.listen(port, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ port)
    else 
        console.log("Error occurred, server can't start", error);
    }
);