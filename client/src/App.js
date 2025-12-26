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
      // Is this legal? Is there a better way of doing this?
      if(!response.data.authorized){
        console.log("Using hyperlink as a shortcut stopgap")
        window.location.href = response.data.url;
      }
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