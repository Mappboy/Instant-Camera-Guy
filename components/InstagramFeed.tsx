import React from 'react';

const InstagramFeed: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="igwrapper">
        <style>{`
          .igwrapper { background: #fff; position: relative; }
          .igwrapper iframe { border: 0; position: relative; z-index: 2; }
          .igwrapper a { color: rgba(0,0,0,0); position: absolute; left: 0; top: 0; z-index: 0; }
        `}</style>
        <script async src="https://www.instagram.com/embed.js"></script>
        <blockquote
          className="instagram-media"
          data-instgrm-permalink="https://www.instagram.com/theinstantcameraguy/"
          data-instgrm-version="14"
          style={{
            background: '#FFF',
            border: 0,
            borderRadius: '3px',
            boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
            margin: '1px',
            maxWidth: '600px',
            minWidth: '326px',
            padding: 0,
            width: 'calc(100% - 2px)',
          }}
        ></blockquote>
      </div>
    </div>
  );
};

export default InstagramFeed;