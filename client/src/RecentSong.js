import React from 'react';

function RecentSong() {
  const recentSong = {
    title: 'No recently skipped songs',
    artist: '',
    album: '',
    imgUrl: ''
  };
  console.log("Recently Skipped Component rendered");
  return (
    <div className="recently-skipped">
        <img src={recentSong.imgUrl}/>
        <p className="song-name">{recentSong.title}</p>
        <p className="artist-name">{recentSong.artist}</p>
        <p className="album-name">{recentSong.album}</p>

        <div className="controls">
            <i className="fas fa-play play-button"></i>
            <i className="fas fa-plus"></i>
        </div>
    </div>
  );
}

export default RecentSong;