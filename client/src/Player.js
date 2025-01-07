import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import axios from 'axios';

function Player() {
  const [song, setSong] = useState({
    title: '4 BIG GUYS',
    artist: 'DigBar',
    album: 'DIGBARGAYRAPS THE ALBUM',
    image_url: 'https://i.scdn.co/image/ab67616d00001e02c43e285c1cff260bfa5f74f2'
  }); 
  
  // Fetch current song data and progress from the server
  useEffect(() => {
    const fetchSongData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/check_current-track')//.then(res => console.log(res.data));
        setSong({
          title: response.data.title,
          artist: response.data.artists[0],
          album: response.data.album,
          image_url: response.data.image_url,
          progress: response.data.progress,
          duration: response.data.duration
        });
      } catch (error) {
        console.error('Error fetching song data:', error);
      }
    };
    console.log(song)

    // Polling every 1 second to fetch updated song data
    const interval = setInterval(fetchSongData, 1000);
    // Cleanup interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="center-container">
    <img src={song.image_url} alt="Song" className="song-img" id="song-img"/>
    
    <div className="song-info">
        <h3 id="song-name">{song.title}</h3>
        <p id="artist-name">{song.artist}</p>
        <p id="album-name">{song.album}</p>
    </div>

    <ProgressBar progress={song.progress} duration={song.duration}/>
</div>
  );
}

export default Player;