import { useState, useEffect } from 'react';

export function useVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // USE DB INSTEAD
    fetch('/videos.json')
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching videos:', error);
        setError('Failed to load videos.');
        setLoading(false);
      });
  }, []);

  return { videos, loading, error };
}
