import React, { useEffect, useState } from 'react';
import './style.css';

const HeroSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const animateText = (text: string) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className={`inline-block transition-transform duration-1000 ease-out ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
        style={{ 
          transitionDelay: `${index * 50}ms`,
          marginRight: char === ' ' ? '0.20em' : '0.05em' // Adiciona espaçamento entre caracteres
        }}
      >
        {char}
      </span>
    ));
  };

  return (
    <div className="relative w-full h-screen bg-cover bg-center font-sans">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://ledstattoo.com.br/images/vitrine/vitrine-video.mp4"
        autoPlay
        loop
        muted
      />

      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="relative z-10 flex items-center justify-center h-full px-4 md:px-10">
        <div className="text-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-6 flex-wrap overflow-hidden font-sans" style={{
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
          }}>
            {animateText('Pioneering and modernity in every stroke')}
          </h1>
          <a
            className="inline-block px-8 py-3 mt-4 rounded-sm text-lg font-sans"
            href="/styles"
            style={{
              backgroundColor: '#a68d7a',
              color: '#fff',
              borderColor: 'transparent',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            }}
          >
            {animateText('See our work')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
