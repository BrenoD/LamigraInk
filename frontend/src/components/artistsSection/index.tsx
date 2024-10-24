import React from 'react';

const ArtistSection: React.FC = () => {
  const artists = [
    { id: 1, name: 'Victor Caffe', imageUrl: 'https://ledstattoo.com.br/templates/yootheme/cache/Augusto-cec5461a.webp' },
    { id: 2, name: 'Victor Caffe', imageUrl: 'https://ledstattoo.com.br/templates/yootheme/cache/Andressa-fd85f811.webp' },
    { id: 3, name: 'Victor Caffe', imageUrl: 'https://ledstattoo.com.br/templates/yootheme/cache/Sergio-Maciel-751c3c5b.webp' },
  ];

  return (
    <div
      className="relative w-full py-16 bg-cover bg-center"
      style={{
        backgroundImage: 'url("https://ledstattoo.com.br/templates/yootheme/cache/bg-01-d805f7dc.webp")',
      }}
    >
      {/* Overlay para escurecer o fundo */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Título */}
      <div className="relative z-10 px-4 md:px-10 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white ml-10 md:ml-20 text-center md:text-left">
          NOSSOS ARTISTAS
        </h2>
      </div>

      {/* Cards dos Artistas */}
      <div className="relative z-10 flex flex-wrap justify-center gap-6 md:gap-8">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 overflow-hidden rounded-sm shadow-lg group" // Ajustes de tamanho responsivo
          >
            <img
              src={artist.imageUrl}
              alt={artist.name}
              className="w-full h-full object-cover transition duration-300 grayscale group-hover:grayscale-0 transform group-hover:scale-110" // Efeito de escala e cor
            />
            {/* Quadrado com o nome do artista */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#a68d7a] text-white p-2 text-center">
              <h3 className="font-bold">{artist.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Botão "Conheça os Artistas" */}
      <div className="relative z-10 mt-8 flex justify-center">
        <a
          href="/artistas"
          className="inline-block px-8 py-3 rounded-sm"
          style={{
            backgroundColor: '#a68d7a',
            color: '#fff',
            borderColor: 'transparent',
          }}
        >
          Conheça os Artistas
        </a>
      </div>
    </div>
  );
};

export default ArtistSection;
