import React from 'react';
import Image from 'next/image';

interface ArtistGalleryProps {
  artist: {
    id: number;
    name: string;
    artworks: string[];
  };
}

const ArtistGallery: React.FC<ArtistGalleryProps> = ({ artist }) => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-[#a68d7a]">{artist.name}</h2>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {artist.artworks.map((artwork, index) => (
          <div key={index} className="flex-shrink-0 w-64 h-64 relative rounded-lg overflow-hidden">
            <Image
              src={artwork}
              alt={`Tatuagem de ${artist.name}`}
              layout="fill"
              objectFit="cover"
              className="transition-all duration-300 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistGallery;
