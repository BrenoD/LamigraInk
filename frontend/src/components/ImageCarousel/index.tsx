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
    <div className="relative w-full pt-8 md:pt-16" style={{
      backgroundImage: "url('https://ledstattoo.com.br/templates/yootheme/cache/bg-01-d805f7dc.webp')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="flex justify-center mb-4 md:mb-8">
        <h2 className="text-2xl md:text-4xl font-bold text-white pb-2 border-b-4 border-orange-300 font-inter">
          Our Studio
        </h2>
      </div>
      <div className="relative w-full h-[50vh] md:h-[calc(100vh-12rem)] overflow-hidden">
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
              alt={`Studio image ${currentIndex + 1}`}
              layout="fill"
              objectFit="cover"
              priority={currentIndex === 0}
              quality={75}
              unoptimized={images[currentIndex].startsWith('http')}
              className="select-none"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Botões atualizados */}
        <div className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-10">
          <motion.button
            className="bg-black bg-opacity-50 text-white p-2 md:p-4 rounded-full text-xl md:text-2xl hover:bg-opacity-70 transition-colors duration-300"
            onClick={prevSlide}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Imagem anterior"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            &#10094;
          </motion.button>
        </div>
        
        <div className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-10">
          <motion.button
            className="bg-black bg-opacity-50 text-white p-2 md:p-4 rounded-full text-xl md:text-2xl hover:bg-opacity-70 transition-colors duration-300"
            onClick={nextSlide}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Próxima imagem"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            &#10095;
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
