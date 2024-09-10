require('dotenv').config();
require('fs');
const express = require('express');
const path = require('path');
const axios = require('axios');
const qs = require('querystring')
const app = express();
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI
const port = process.env.SERVER;

var access_token
var refresh_token

scope = 'user-read-currently-playing user-modify-playback-state user-read-playback-state'

app.use('/login', async (req, res) => {
    res.redirect('https://accounts.spotify.com/authorize?' +
        qs.stringify({
          response_type: 'code',
          client_id: client_id,
          redirect_uri: redirect_uri,
          scope: scope
        })
    );
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
                }, 
                json: true
            }
        );

        access_token = response.data.access_token;
        refresh_token = response.data.refresh_token;
        console.log(`Access Token: ${access_token}`);
        console.log(`Refresh Token: ${refresh_token}`);
  
        // You can now use the access token to make authenticated requests to the API
        res.redirect('/playback/#' +
            qs.stringify({
                access_token: access_token,
                refresh_token: refresh_token
            })
        );

    //   res.send('Authorization successful!');
    } catch (error) {
        console.error('Error fetching access token:', error);   
        res.redirect('/#' +
            qs.stringify({
            error: 'invalid_token'
            })
        );
    }
  }
);

app.get('/playback', (req, res) => {   
    var options = {
        headers: {'Authorization': 'Bearer ' + access_token},
        json: true
      };
      // use the access token to access the Spotify Web API
      axios.get('https://api.spotify.com/v1/me/player', options).then(res => console.log('Response Data:', res.data));
      res.sendFile(path.join(__dirname, 'public', 'player.html'))
})

app.listen(port, (error) =>{
    if(!error){
        console.log("Server is Successfully Running, and App is listening on port "+ port);
    }
    else 
        console.log("Error occurred, server can't start", error);
    }
);