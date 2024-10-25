import React from 'react';
import Link from 'next/link';

const ArtistSection: React.FC = () => {
  const artists = [
    { id: 1, name: 'Victor Caffe', imageUrl: 'https://ledstattoo.com.br/templates/yootheme/cache/Augusto-cec5461a.webp' },
    { id: 2, name: 'Ana Silva', imageUrl: 'https://ledstattoo.com.br/templates/yootheme/cache/Andressa-fd85f811.webp' },
    { id: 3, name: 'Sergio Maciel', imageUrl: 'https://ledstattoo.com.br/templates/yootheme/cache/Sergio-Maciel-751c3c5b.webp' },
  ];

  return (
    <section className="relative w-full py-16 bg-cover bg-center" style={{
      backgroundImage: 'url("https://ledstattoo.com.br/templates/yootheme/cache/bg-01-d805f7dc.webp")',
    }}>
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          OUR ARTISTS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist) => (
            <div key={artist.id} className="relative overflow-hidden rounded-lg shadow-lg group">
              <div className="h-[400px] flex items-center justify-center overflow-hidden">
                <img
                  src={artist.imageUrl}
                  alt={artist.name}
                  className="w-full h-auto max-h-full object-contain transition duration-300 grayscale group-hover:grayscale-0 transform group-hover:scale-105"
                />
                <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-[#a68d7a] bg-opacity-70 text-white px-4 py-2 rounded-sm">
                  <h3 className="font-bold text-lg whitespace-nowrap">{artist.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/artists" 
            className="inline-block px-8 py-3 rounded-sm bg-[#a68d7a] text-white hover:bg-[#8a7361] transition duration-300"
          >
            Meet All Our Artists
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArtistSection;
