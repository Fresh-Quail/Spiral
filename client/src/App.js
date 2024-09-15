import React from 'react';
import Player from './Player';
import RecentSong from './RecentSong';
import './index.css';

function App() {

  // const [progress, setProgress] = useState(0);
  // const [duration, setDuration] = useState(100);  // Default duration

  // Fetch current song data and progress from the server
  // useEffect(() => {
  //   // Example API call to fetch song data
  //   const fetchSongData = async () => {
  //     try {
  //       const response = await axios.get('/current-song');
  //       setCurrentSong({
  //         title: response.data.title,
  //         artist: response.data.artist,
  //         album: response.data.album,
  //         albumCover: response.data.albumCover,
  //       });
  //       setProgress(response.data.progress);  // In seconds
  //       setDuration(response.data.duration);  // Total song duration in seconds
  //     } catch (error) {
  //       console.error('Error fetching song data:', error);
  //     }
  //   };

  //   // Polling every 5 seconds to fetch updated song data
  //   const interval = setInterval(fetchSongData, 1000);
    
  //   // Cleanup interval when component unmounts
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div>
      <Player />
      <RecentSong />
    </div>
  );
}

export default App;