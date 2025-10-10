// Helper to extract videoId from Youtube URL
function getVideoId(url) {
  const regex = /(?:v=|\/)([0-9A-Za-z_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default function YouTubeEmbed({ videoUrl }) {
  const videoId = getVideoId(videoUrl);

  if (!videoId) return <div>Invalid YouTube URL</div>;

  return (
    <iframe
      width="100%"
      height="200px"
      className="rounded-[10px]"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube Video Player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
