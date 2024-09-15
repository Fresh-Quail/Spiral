import React from 'react';
import ProgressBar from './ProgressBar';

function Player() {
  const song = {
    title: '4 BIG GUYS',
    artist: 'DigBar',
    album: 'DIGBARGAYRAPS THE ALBUM',
    imgUrl: 'https://i.scdn.co/image/ab67616d00001e02c43e285c1cff260bfa5f74f2'
  }; 
  console.log("\n\n\n\n");
  return (
    <div className="center-container">
    <img src={song.imgUrl} alt="Song Image" className="song-img" id="song-img"/>
    
    <div className="song-info">
        <h3 id="song-name">{song.title}</h3>
        <p id="artist-name">{song.artist}</p>
        <p id="album-name">{song.album}</p>
    </div>

    <ProgressBar progress={99999999} duration={999999999}/>
</div>
  );
}

export default Player;