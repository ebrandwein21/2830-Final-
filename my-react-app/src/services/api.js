export const fetchVideos = async () => {
  try {
    const response = await fetch('/videos.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const videos = await response.json();
    return videos;
  } catch (error) {
    console.error('Failed to fetch videos:', error);
    throw error;
  }
};