import React from 'react';

function RecentSong() {
  const recentSong = {
    title: 'BIG DICK RANDY',
    artist: 'DigBar',
    album: 'BAROWEEN',
    imgUrl: 'https://i.scdn.co/image/ab67616d00001e0230f36f94373b8379f7a4472c'
  };
  console.log("Recently Skipped Component rendered");
  return (
    <div className="recently-skipped">
        <img src={recentSong.imgUrl} alt="Skipped Song"/>
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