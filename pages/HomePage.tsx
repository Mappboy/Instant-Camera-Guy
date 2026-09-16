import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { contentService } from '../services/contentService';
import type { ContentPiece } from '../types';
import PolaroidCard from '../components/PolaroidCard';
import InstagramFeed from '../components/InstagramFeed';
import { getImageUrl } from '../utils/imageUtils';
import { ResponsiveImage } from '@responsive-image/react';
import HeroImage from '../assets/images/sx_70.png?lqip=blurhash&format=avif;webp;png&quality=80&responsive';
import JakeProfileImage from '../assets/images/jake_profile.jpg?lqip=blurhash&quality=80&responsive';
import YouTubeEmbed from '../components/YouTubeEmbed';

const SLUGS = ['hero', 'about', 'repairs', 'photos', 'contact'];

const getInitialContent = (): Record<string, ContentPiece> => {
  const contentMap: Record<string, ContentPiece> = {};
  for (const slug of SLUGS) {
    const piece = contentService.getContentSync(slug);
    if (piece) {
      contentMap[slug] = piece;
    }
  }
  return contentMap;
};

const HomePage: React.FC = () => {
  const [content] = useState<Record<string, ContentPiece>>(getInitialContent);
  const [features] = useState<ContentPiece[]>(() => contentService.getFeaturesSync());

  const featuredVideo = {
    "title": "The SX-70R PCB",
    "id": "eTm0L0xm6Cc"
  };

  return (
    <div className="flex flex-col gap-16 sm:gap-24 md:gap-32">
      {/* Hero Section */}
      {content.hero && (
        <section className="w-full">
          <div className="p-4 text-center">
            <h1 className="text-5xl md:text-6xl sm:text-5xl font-medium text-primary tracking-tighter leading-[1.1]">
              {content.hero.frontmatter.title}<span className="rainbow-text">instant cameras</span>
            </h1>
          </div>
          <div
            className="relative w-full max-w-4xl mx-auto"
            style={{
              paddingTop: '66.67%', // 3:2 Aspect Ratio matching sx_70.png (3888x2592)
            }}
          >
            <ResponsiveImage
              src={HeroImage}
              alt="A vintage Polaroid SX-70 camera"
              loading="eager"
              fetchPriority="high"
              size={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 900px"
              className="absolute inset-0 w-full h-full lg:w-3/4 lg:h-3/4 object-contain mx-auto"
            />
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {features.map((feature) => (
          <PolaroidCard
            key={feature.frontmatter.slug}
            title={feature.frontmatter.title}
            image={getImageUrl(feature.frontmatter.image, {responsive:true})}
            excerpt={feature.content}
          />
        ))}
      </section>
      
      {/* About Section */}
      {content.about && (
        <section id="about" className="scroll-mt-24 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-special mb-8">{content.about.frontmatter.title}</h2>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <ResponsiveImage
                  src={JakeProfileImage}
                  alt="Jake, The Instant Camera Guy"
                  loading="lazy"
                  decoding="async"
                  className="w-48 h-48 rounded-full object-cover shadow-lg flex-shrink-0 border-4 border-accent-green"
                />
                <div className="prose lg:prose-lg text-left">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content.about.content}</ReactMarkdown>
                </div>
            </div>
        </section>
      )}
      
      {/* Repairs Section */}
      {content.repairs && (
        <section id="repairs" className="scroll-mt-24 max-w-4xl mx-auto">
            <h2 className="text-4xl font-special mb-8 text-center">{content.repairs.frontmatter.title}</h2>
            <div className="prose lg:prose-lg mx-auto bg-background p-8 sm:p-12 shadow-lg rounded-sm border-t-8 border-accent-red">
                 <ReactMarkdown remarkPlugins={[remarkGfm]}>{content.repairs.content}</ReactMarkdown>
            </div>
          <a 
            href="/repair" 
            className="mt-8 inline-block bg-accent-red text-background font-bold py-3 px-8 rounded-sm shadow-lg hover:bg-accent-red/90 transition-colors"
          >
            More Info ... 
          </a>
        </section>)
      }
      {/* Instagram Section */}
      <section id="instagram" className="scroll-mt-24">
        <div className="text-center">
            <h2 className="text-4xl font-special mb-4">Follow My Journey</h2>
            <p className="max-w-2xl mx-auto text-primary/80 mb-2">
                Check out my latest repairs, custom mods, and favorite instant shots on Instagram. It's the best place to see what I'm up to!
            </p>
            <p className="max-w-2xl mx-auto text-primary/70 text-sm mb-8">
                Please read through the highlights section and top posts for all information regarding pricing, products and warranty etc.
            </p>
        </div>
        <InstagramFeed />
        <div className="text-center">
            <a
                href="https://www.instagram.com/theinstantcameraguy/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-accent-orange text-background font-bold py-3 px-8 rounded-sm shadow-lg hover:bg-accent-teal/90 transition-colors"
            >
                Follow on Instagram
            </a>
        </div>
      </section>

      {/* Videos Section */}
      <section id="videos" className="scroll-mt-24">
          <h2 className="text-4xl font-special mb-8 text-center">Featured Video</h2>
          <div className="bg-background p-8 sm:p-12 shadow-lg rounded-sm border-t-8 border-accent-blue">
              <h3 className="text-2xl font-special mb-4">{featuredVideo.title}</h3>
              <YouTubeEmbed videoId={featuredVideo.id} title={featuredVideo.title} />
          </div>
          <a 
              href="/videos" 
              className="mt-8 inline-block bg-accent-blue text-background font-bold py-3 px-8 rounded-sm shadow-lg hover:bg-accent-blue/90 transition-colors"
          >
              More Videos
          </a>
      </section>

      {/* Contact Section */}
      {content.contact && (
        <section id="contact" className="scroll-mt-24 max-w-2xl mx-auto">
             <h2 className="text-4xl font-special mb-8 text-center">{content.contact.frontmatter.title}</h2>
             <div className="prose lg:prose-lg mx-auto bg-background p-8 sm:p-12 shadow-lg rounded-sm border-t-8 border-accent-teal">
                 <ReactMarkdown remarkPlugins={[remarkGfm]}>{content.contact.content}</ReactMarkdown>
            </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;