'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { artistsData } from '@/data/artists';

export default function ArtistsPage() {
  const searchParams = useSearchParams();
  const artistId = searchParams.get('id');

  if (artistId) {
    const artist = artistsData.find((a) => a.id === artistId);

    if (!artist) {
      return <div>Artista não encontrado</div>;
    }

    return (
      <div className="p-8">
        <button 
          onClick={() => window.history.back()}
          className="px-4 py-2 mb-8 text-white bg-gray-800 rounded hover:bg-gray-700 transition-colors"
        >
          Voltar para lista
        </button>

        <div className="max-w-6xl mx-auto mb-12">
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
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 max-w-6xl mx-auto">
      {artistsData.map((artist) => (
        <Link href={`/our-artists?id=${artist.id}`} key={artist.id}>
          <div className="rounded-lg overflow-hidden shadow-lg hover:-translate-y-1 transition-transform">
            <div className="relative w-full h-[300px] grayscale">
              <Image
                src={artist.profileImage}
                alt={artist.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-2xl text-gray-800">{artist.name}</h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
