import React from 'react';
import { ResponsiveImage } from '@responsive-image/react';

interface PolaroidCardProps {
  image: any;
  title: string;
  excerpt: string;
}

const PolaroidCard: React.FC<PolaroidCardProps> = ({ image, title, excerpt }) => {
  // Add a slight random rotation for a more organic feel
  const [rotation] = React.useState(Math.random() * 4 - 2);
const isResponsiveImage = typeof image === 'object' && image !== null && 'src' in image;
  return (
    <div className="block group">
      <div
        className="bg-background p-3 pb-4 shadow-lg rounded-sm transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl flex flex-col"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <div className="bg-primary/5">
            {isResponsiveImage ? (
                <ResponsiveImage
                    src={image}
                    alt={title}
                    className="w-full h-auto object-cover aspect-square"
                />
            ) : (
                // Fallback for simple strings or missing src objects
                <img 
                    src={image}
                    alt={title}
                    className="w-full h-auto object-cover aspect-square"
                />
            )}
        </div>
        <div className="pt-4 text-center">
            <h3 className="font-special text-xl font-bold text-primary">
              {title}
            </h3>
            <p className="text-sm text-primary/80 mt-2 px-1 text-balance">
                {excerpt}
            </p>
        </div>
      </div>
    </div>
  );
};

export default PolaroidCard;