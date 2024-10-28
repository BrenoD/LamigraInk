import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageCarouselProps {
  images: string[];
  interval?: number;
}

const variants = {
  enter: {
    opacity: 0,
    scale: 1.2,
  },
  center: {
    zIndex: 1,
    opacity: 1,
    scale: 1,
  },
  exit: {
    zIndex: 0,
    opacity: 0,
    scale: 0.8,
  },
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [nextSlide, interval]);

  return (
    <div className="relative w-full pt-16" style={{
      backgroundImage: "url('https://ledstattoo.com.br/templates/yootheme/cache/bg-01-d805f7dc.webp')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="flex justify-center mb-8">
        <h2 className="text-4xl font-bold text-white pb-2 border-b-4 border-orange-300">
          Nosso Estúdio
        </h2>
      </div>
      <div className="relative w-full h-[calc(100vh-12rem)] overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 1.5 },
              scale: { duration: 1.5 },
              ease: "easeInOut",
            }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              layout="fill"
              objectFit="cover"
              unoptimized={images[currentIndex].startsWith('http')}
            />
          </motion.div>
        </AnimatePresence>
        <motion.button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full text-2xl z-10"
          onClick={prevSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          &#10094;
        </motion.button>
        <motion.button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full text-2xl z-10"
          onClick={nextSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          &#10095;
        </motion.button>
      </div>
    </div>
  );
};

export default ImageCarousel;
