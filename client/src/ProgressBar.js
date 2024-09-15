import React from 'react';

function ProgressBar({ progress, duration }) {
  const widh = {width: (progress / duration) * 100} 
  console.log("Progress Bar rendered");
  return (
    <div className="playback-bar">
      <div className="progress" style={widh}></div>
    </div>
  );
}

export default ProgressBar; 