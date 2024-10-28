import React, { useEffect, useState, useRef } from 'react';

const ParallaxSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimationStep(1);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  useEffect(() => {
    if (animationStep > 0 && animationStep < 5) {
      const timer = setTimeout(() => {
        setAnimationStep(prevStep => prevStep + 1);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [animationStep]);

  const getRandomAnimation = () => {
    const animations = [
      'fade-in-top',
      'fade-in-left',
      'fade-in-right',
      'fade-in-bottom',
      'zoom-in',
    ];
    return animations[Math.floor(Math.random() * animations.length)];
  };

  const getAnimationClass = (step: number) => {
    const baseClass = 'transition-all duration-500 ease-out';
    const randomAnimation = getRandomAnimation();
    return `${baseClass} ${animationStep >= step ? randomAnimation : 'opacity-0'}`;
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen bg-cover bg-fixed bg-top" 
      style={{ backgroundImage: `url('https://ledstattoo.com.br/templates/yootheme/cache/sobre-home-5d9c8c37.webp')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Text and Button - Aligned Left */}
      <div className="relative z-10 flex items-center justify-center md:justify-end h-full px-4 md:px-10">
        <div className="text-white max-w-lg text-center md:text-left mr-10">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 ${getAnimationClass(1)}`}>
            Making History in the Tattoo World
          </h2>
          <p className={`text-lg md:text-xl mb-4 md:mb-6 ${getAnimationClass(2)}`}>
            The largest tattoo studio in Latin America, with international recognition, dozens of awards, and a specialized team.
          </p>
          <p className={`text-lg md:text-xl mb-6 ${getAnimationClass(3)}`}>
            Safe and responsible work in applying piercings, laser tattoo removal, and creating works of art on your skin.
          </p>
          <a
            className={`inline-block px-6 py-3 rounded-sm ${getAnimationClass(4)}`}
            href="/studio"
            style={{
              backgroundColor: '#a68d7a',
              color: '#fff',
              borderColor: 'transparent',
            }}
          >
            Discover the Studio
          </a>
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
