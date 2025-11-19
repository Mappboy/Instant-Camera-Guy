import React, { useEffect, useRef, useState } from 'react';

const InstagramFeed: React.FC = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Load 200px before it enters the viewport
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div className="flex justify-center" ref={ref}>
      {inView ? (
        <div className="bg-white relative min-h-[800px] w-full max-w-xl min-w-[460px] mx-auto">
          <style>{`
            .igwrapper iframe { border: 0; position: relative; z-index: 2; }
            .igwrapper a { color: rgba(0,0,0,0); position: absolute; left: 0; top: 0; z-index: 0; }
          `}</style>
          <script async src="https://www.instagram.com/embed.js" crossOrigin="anonymous"></script>
          <blockquote
            className="instagram-media"
            data-instgrm-permalink="https://www.instagram.com/theinstantcameraguy/"
            data-instgrm-version="14"
            data-limit="9"
            style={{
              border: 0,
              borderRadius: '3px',
              boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
              padding: 0,
              width: '100%',
              height: '100%',
              margin: 0,
              background: 'none',
            }}
          ></blockquote>
        </div>
      ) : (
        <div className="w-full max-w-xl min-w-[400px] mx-auto" style={{minHeight: '800px'}} />
      )}
    </div>
  );
};

export default InstagramFeed;