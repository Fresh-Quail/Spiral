require('dotenv').config();
require('fs');
const express = require('express');
const path = require('path');
const axios = require('axios');
const qs = require('querystring');
const app = express();
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI
const port = process.env.SERVER;

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  };
app.use(cors(corsOptions));

var access_token = null;
var refresh_token;

scope = 'user-read-currently-playing user-modify-playback-state user-read-playback-state';

app.get('/authorize', async (req, res, next) => {
    authUrl = 'https://accounts.spotify.com/authorize?' +
        qs.stringify({
          response_type: 'code',
          client_id: client_id,
          redirect_uri: redirect_uri,
          scope: scope
        });
    if(access_token == null) res.json({ authorized: false, url: authUrl });
    else res.json({ authorized: true });
});


app.get('/callback', async (req, res) => {
    const authCode = req.query.code;
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', 
            {
                code: authCode,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            }, 
            {
                headers: {
                    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
                    'content-type': 'application/x-www-form-urlencoded'
                }
            }
        );

        access_token = response.data.access_token;
        refresh_token = response.data.refresh_token;
        console.log(`Access Token: ${access_token}`);
        console.log(`Refresh Token: ${refresh_token}`);
        res.redirect('http://localhost:3000/' //+
            // qs.stringify({
            //     access_token: access_token,
            //     refresh_token: refresh_token
            // })
        );
    } catch (error) {
        console.error('Error fetching access token:', error.data);
        // res.redirect('/#' +
        //     qs.stringify({
        //     error: 'invalid_token'
        //     })
        // );
    }
  }
);

app.get('/playback', (req, res) => {   
    var options = {
        headers: {'Authorization': 'Bearer ' + access_token}
      };
      // use the access token to access the Spotify Web API
      axios.get('https://api.spotify.com/v1/me/player', options).then(res => console.log('Response Data:', res.data));
      res.sendFile(path.join(__dirname, 'public', 'player.html'))
});

app.get('/current-track', async (req, res) => {   
    var options = {
        headers: {'Authorization': 'Bearer ' + access_token}
    };

    try {
        const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', options);
        const track = {
            title: response.data.item.name,
            artists: response.data.item.artists.map(artist => artist.name),
            album: response.data.item.album.name,
            image_url: response.data.item.album.images[0].url,
            progress: response.data.progress_ms,
            duration: response.data.item.duration_ms,
            is_playing: response.data.is_playing
        }
        res.json(track);
    } catch(err) {
        if(err.status == 429)
            console.log("Rate limited");
        else if (err.status == 401){
            console.log('Bad or expired token');
        }
        else
            console.log("No track is playing.", err.status)}
});

app.get('/skip', async (req, res) => {   
    var options = {
        headers: {'Authorization': 'Bearer ' + access_token}
    };
    
    axios.post('https://api.spotify.com/v1/me/player/next', null, options).then(
        res => {
            console.log('Response Data:', res.data)
        }
    );
});


app.listen(port, (error) =>{
    if(!error){
        console.log("Server is Successfully Running and listening on port "+ port);
    }
    else 
        console.log("Error occurred, server can't start", error);
    }
);