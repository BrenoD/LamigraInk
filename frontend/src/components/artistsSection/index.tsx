import React from 'react';
import Link from 'next/link';

const ArtistSection: React.FC = () => {
  const artists = [
    { 
      id: 1, 
      name: 'Moises Alves', 
      imageUrl: 'artists/moises-perfil-400px.webp',
      slug: 'moises-alves',
      numberContact: '7491282294'
    },
    {
      id: 2, 
      name: 'Megan', 
      imageUrl: 'artists/Megan.webp',
      slug: 'megan',
      numberContact: '111111111'
    },
    { 
      id: 3, 
      name: 'Vini Capobianco', 
      imageUrl: 'artists/Vini.webp',
      slug: 'vini-capobianco',
      numberContact: '7939587766'
    },
  ];

  return (
    <section className="relative w-full py-8 md:py-16 bg-cover bg-center font-['Inter']" style={{
      backgroundImage: 'url("https://ledstattoo.com.br/templates/yootheme/cache/bg-01-d805f7dc.webp")',
    }}>
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 text-center">
          OUR ARTISTS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 px-4 sm:px-6 md:px-8 lg:px-12">
          {artists.map((artist) => (
            <div key={artist.id} className="relative overflow-hidden rounded-lg shadow-lg group max-w-[300px] mx-auto w-full cursor-pointer">
              <Link href={`/our-artists/${artist.slug}`}>
                <div className="h-[300px] md:h-[300px] flex items-center justify-center overflow-hidden">
                  <img
                    src={artist.imageUrl}
                    alt={artist.name}
                    className="w-full h-full object-top transition duration-300 grayscale group-hover:grayscale-0 transform group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 bg-[#a68d7a] bg-opacity-70 text-white px-4 py-2 rounded-sm">
                    <h3 className="font-semibold text-base md:text-lg whitespace-nowrap">{artist.name}</h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 text-center">
          <Link href="/artists" 
            className="inline-block px-6 md:px-8 py-2.5 md:py-3 rounded-sm bg-[#a68d7a] text-white hover:bg-[#8a7361] transition duration-300 text-sm md:text-base font-medium"
          >
            Meet Our Artists
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArtistSection;
