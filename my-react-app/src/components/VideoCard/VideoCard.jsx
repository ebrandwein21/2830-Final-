import React from 'react';
import './VideoCard.css';

function VideoCard({ title, link }) {
  return (
    <div className="video-card">
      <div className="video-wrapper">
        <iframe
          src={link}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title}
        ></iframe>
      </div>
      <h2 className="video-title">{title}</h2>
    </div>
  );
}

export default VideoCard;