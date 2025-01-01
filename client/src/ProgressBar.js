import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProgressBar({ progress, duration }) {
  console.log('Re-render p-bar', progress, duration)
  const widh = {width: (progress / duration) * 100 + '%'}
  return (
    <div className="playback-bar">
      <div className="progress" style={widh}></div>
    </div>
  );
}

export default ProgressBar; 