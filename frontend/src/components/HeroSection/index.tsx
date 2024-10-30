import React, { useEffect, useState } from 'react';
import './style.css';

const HeroSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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
          <h1 
            className={`text-white text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 ease-out
              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
              transitionDelay: '300ms'
            }}
          >
            Pioneering and modernity in every stroke
          </h1>
          <a
            className={`inline-block px-8 py-3 mt-4 rounded-sm text-lg transition-all duration-1000 ease-out
              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            href="/styles"
            style={{
              backgroundColor: '#a68d7a',
              color: '#fff',
              borderColor: 'transparent',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
              transitionDelay: '600ms'
            }}
          >
            See our work
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
