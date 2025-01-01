import React, { useEffect } from 'react';
import Player from './Player';
import RecentSong from './RecentSong';
import axios from 'axios';
import './index.css';

function App() {

  useEffect(() => {
    const authorize = async() => {
      const response = await axios.get('http://localhost:5000/authorize');
      console.log(response.data)
      if(!response.data.authorized)
        window.location.href = response.data.url;
  };
  authorize();
  }, []);
  
  return (
    <div>
      <Player />
      <RecentSong />
    </div>
  );
}

export default App;