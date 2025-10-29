import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { contentService } from '../services/contentService';
import type { ContentPiece } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import PolaroidCard from '../components/PolaroidCard';

const HomePage: React.FC = () => {
  const [content, setContent] = useState<Record<string, ContentPiece>>({});
  const [features, setFeatures] = useState<ContentPiece[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      const slugs = ['hero', 'about', 'repairs', 'photos', 'contact', 'more-to-come'];
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
        <section className="text-center mt-8 sm:mt-16">
          <h1 className="text-4xl md:text-6xl font-special text-primary leading-tight">
            {content.hero.frontmatter.title}
          </h1>
        </section>
      )}

      {/* Polaroid Camera Image Section */}
      <section>
        <div
          className="h-[400px] md:h-[600px] w-full"
          style={{
            backgroundImage: `url("https://www.datocms-assets.com/12178/1587301302-sx70.png?q=90&auto=format&w=800&h=800&fit=clip")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center 70%',
            backgroundSize: 'auto',
          }}
          aria-label="A vintage Polaroid SX-70 camera"
          role="img"
        ></div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {features.map((feature) => (
          <PolaroidCard
            key={feature.frontmatter.slug}
            title={feature.frontmatter.title}
            image={feature.frontmatter.image || ''}
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
        </section>
      )}
      
      {/* More To Come Section */}
      {content['more-to-come'] && (
         <section className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-special mb-4">{content['more-to-come'].frontmatter.title}</h2>
            <p className="text-primary/80">{content['more-to-come'].content}</p>
         </section>
      )}

      {/* Photos Section Placeholder */}
      {content.photos && (
        <section id="photos" className="scroll-mt-24 text-center">
             <h2 className="text-4xl font-special mb-4">{content.photos.frontmatter.title}</h2>
             <p className="text-primary/80">{content.photos.content}</p>
        </section>
      )}

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