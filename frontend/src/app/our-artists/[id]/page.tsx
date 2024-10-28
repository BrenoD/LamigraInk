'use client';

import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { artistsData } from '@/data/artists';

export default function ArtistDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const artist = artistsData.find((a) => a.id === id);

  if (!artist) {
    return <div>Artista não encontrado</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex gap-8 mb-8">
        <div className="relative w-[300px] h-[300px] grayscale">
          <Image
            src={artist.profileImage}
            alt={artist.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl mb-4">{artist.name}</h1>
          <p className="text-lg leading-relaxed text-gray-600">
            {artist.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {artist.gallery.map((image, index) => (
          <div 
            key={index} 
            className="relative w-full h-[300px] hover:scale-[1.02] transition-transform"
          >
            <Image
              src={image}
              alt={`Trabalho ${index + 1} de ${artist.name}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
