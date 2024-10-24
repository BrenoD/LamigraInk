import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-cover bg-center">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://ledstattoo.com.br/images/vitrine/vitrine-video.mp4"
        autoPlay
        loop
        muted
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Text and Button - Centralized */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 md:px-10">
        <div className="text-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-6 flex-wrap">
            Arte. Tatuagem. Cultura.
          </h1>
          <a
            className="inline-block px-8 py-3 mt-4 rounded-sm text-lg"
            href="/estilos"
            style={{
              backgroundColor: '#a68d7a',
              color: '#fff',
              borderColor: 'transparent',
            }}
          >
            Veja nossas tattoos
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
