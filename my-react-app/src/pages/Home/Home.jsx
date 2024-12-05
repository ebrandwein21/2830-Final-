import React, { useEffect, useState } from 'react';
import VideoCard from '../../components/VideoCard/VideoCard';
import './Home.css';
import { fetchVideos } from '../../services/api';

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVideos()
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching videos:', error);
        setError(`Failed to load videos: ${error.message}`);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading videos...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <main className="main-content">
      <div className="video-grid">
        {videos.map((video, index) => (
          <VideoCard key={index} title={video.title} link={video.link} />
        ))}
      </div>
    </main>
  );
}

export default Home;
