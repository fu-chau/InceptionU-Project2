const allVideos = [
    { id: '001', title: 'Video 001', filename: '001.mp4' },
    { id: '002', title: 'Video 002', filename: '002.mp4' },
    { id: '003', title: 'Video 003', filename: '003.mp4' },
    { id: '004', title: 'Video 004', filename: '004.mp4' },
    { id: '005', title: 'Video 005', filename: '005.mp4' },
  ];
  
  const VideoGallery = ({ previewOnly = false }) => {
    const videosToShow = previewOnly ? allVideos.slice(0, 3) : allVideos;
  
    return (
      <div>
        {videosToShow.map((video) => (
          <div key={video.id}>
            <h4>{video.title}</h4>
            <video width="480" controls>
              <source src={`/videos/${video.filename}`} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>
    );
  };
  
  export default VideoGallery;