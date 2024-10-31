import React, { useEffect, useState, useRef } from 'react';
import './styles.css';

interface ParallaxSectionProps {
  onGalleryClick?: () => void;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ onGalleryClick }) => {
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
      className="parallax-section font-sans"
      aria-hidden="true"
    >
      <div 
        className="overlay"
        aria-hidden="true"
      ></div>

      <div className="content-wrapper">
        <div className="text-container">
          <h2 className={`heading ${getAnimationClass(1)}`}>
            <span className="desktop-text">Making History in the Art of Tattooing</span>
            <span className="mobile-text">Art of Tattooing</span>
          </h2>
          <p className={`description ${getAnimationClass(2)}`}>
            <span className="desktop-text">
              The largest tattoo studio in Latin America, with international recognition, 
              dozens of awards and a specialised team.
            </span>
            <span className="mobile-text">
              Latin America&apos;s largest award-winning tattoo studio
            </span>
          </p>
          <p className={`description ${getAnimationClass(3)}`}>
            <span className="desktop-text">
              Safe and professional work in piercing application, 
              laser tattoo removal and creating artwork on your skin.
            </span>
            <span className="mobile-text">
              Professional tattoos, piercings & laser removal
            </span>
          </p>
          <button
            onClick={onGalleryClick}
            className={`cta-button ${getAnimationClass(4)}`}
          >
            <span className="desktop-text">Discover Our Studio</span>
            <span className="mobile-text">View Studio</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
