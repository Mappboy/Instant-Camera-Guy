import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { contentService } from '../services/contentService';
import type { ContentPiece } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import PolaroidCard from '../components/PolaroidCard';
import InstagramFeed from '../components/InstagramFeed';
import { getImageUrl } from '../utils/imageUtils';
import { ResponsiveImage } from '@responsive-image/react';
import HeroImage from '../assets/images/sx_70.png?responsive';

const HomePage: React.FC = () => {
  const [content, setContent] = useState<Record<string, ContentPiece>>({});
  const [features, setFeatures] = useState<ContentPiece[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      const slugs = ['hero', 'about', 'repairs','photos', 'contact', 'more-to-come'];
      const promises = slugs.map(slug => contentService.getContent(slug));
      const results = await Promise.all(promises);
      const contentMap: Record<string, ContentPiece> = {};
      results.forEach((piece, index) => {
        if (piece) {
          contentMap[slugs[index]] = piece;
        }
      });
      setContent(contentMap);
      
      const featureResults = await contentService.getFeatures();
      setFeatures(featureResults);

      setLoading(false);
    };
    fetchContent();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col gap-16 sm:gap-24 md:gap-32">
      {/* Hero Section */}
      {content.hero && (
        <section className="w-full">
          <div className="p-4 text-center">
            <h1 className="text-4xl md:text-6xl font-special leading-tight z-10">
              {content.hero.frontmatter.title}
            </h1>
          </div>
          <div
            className="relative w-full"
            style={{
              paddingTop: '70%', // 16:9 Aspect Ratio
            }}
          >
            <ResponsiveImage src={HeroImage}
              alt="A vintage Polaroid SX-70 camera"
              width={80}
              className="absolute inset-0 w-full h-full object-cover"
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
            image={ getImageUrl(feature.frontmatter.image)}
            excerpt={feature.content}
          />
        ))}
      </section>

      {/* About Section */}
      {content.about && (
        <section id="about" className="scroll-mt-24 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-special mb-8">{content.about.frontmatter.title}</h2>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <img src={content.about.frontmatter.image} alt="Jake, The Instant Camera Guy" className="w-48 h-48 rounded-full object-cover shadow-lg flex-shrink-0 border-4 border-accent-green"/>
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
            <h2 className="text-4xl font-special mb-4">Follow Our Journey</h2>
            <p className="max-w-2xl mx-auto text-primary/80 mb-8">
                Check out our latest repairs, custom mods, and favorite instant shots on Instagram. It's the best place to see what we're up to!
            </p>
        </div>
        <InstagramFeed />
        <div className="text-center">
            <a
                href="https://www.instagram.com/theinstantcameraguy/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-accent-teal text-background font-bold py-3 px-8 rounded-sm shadow-lg hover:bg-accent-teal/90 transition-colors"
            >
                Follow on Instagram
            </a>
        </div>
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