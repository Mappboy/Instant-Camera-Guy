import React from 'react';
import YouTubeEmbed from '../components/YouTubeEmbed';

const videos = [
  {
    "title": "The SX-70R PCB",
    "id": "eTm0L0xm6Cc"
  },
  {
    "title": "The PolaVolt i-Type mod",
    "id": "x8RvxlTctgU"
  },
  {
    "title": "An example of one of my refurbs",
    "id": "SayrMGyGum0"
  },
  {
    "title": "No Upgrades Without an Overhaul: Why servicing the SX-70 is so important.",
    "id": "PEMsFa5q32g"
  }
];

const VideosPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl md:text-6xl font-special text-primary leading-tight text-center my-8">
        Videos
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {videos.map((video) => (
          <div key={video.id}>
            <h2 className="text-2xl font-special mb-4">{video.title}</h2>
            <YouTubeEmbed videoId={video.id} title={video.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideosPage;