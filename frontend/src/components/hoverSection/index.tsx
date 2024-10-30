import React, { useState, useEffect } from 'react';

interface ImageData {
  hoverSrc: string;
  title: string;
  description: string;
}

const HoverSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const images: ImageData[] = [
    {
      hoverSrc: 'https://ledstattoo.com.br/templates/yootheme/cache/tattoo-382337ab.webp',
      title: 'TATTOO',
      description: '',
    },
    {
      hoverSrc: 'https://ledstattoo.com.br/templates/yootheme/cache/laser-5938c060.webp',
      title: 'LASER',
      description: 'Tattoo lightening and removal with laser',
    },
    {
      hoverSrc: 'https://ledstattoo.com.br/templates/yootheme/cache/piercing-2907d38c.webp',
      title: 'PIERCING',
      description: '',
    },
  ];

  const preloadImage = (src: string) => {
    const img = new Image();
    img.src = src;
  };

  useEffect(() => {
    images.forEach((image) => {
      preloadImage(image.hoverSrc);
    });
  }, []);

  return (
    <section className="relative w-full overflow-hidden font-sans">
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: 'url("https://ledstattoo.com.br/templates/yootheme/cache/bg-01-d805f7dc.webp")' }}
      />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid gap-6 md:gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative h-[300px] md:h-[400px] group transition-transform duration-300 ease-in-out hover:scale-105"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                text-2xl md:text-4xl lg:text-5xl font-bold text-white z-20 text-center">
                {image.title}
              </h2>

              {image.description && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
                  text-center text-white z-20 text-sm md:text-lg lg:text-xl px-4">
                  {image.description}
                </div>
              )}

              <img
                src={image.hoverSrc}
                alt={image.title}
                className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 
                  transition-all duration-500 ease-in-out"
                style={{
                  transform: hoveredIndex === index ? 'scale(1)' : 'scale(1.1)',
                  transition: 'transform 0.6s ease-in-out, opacity 0.5s ease-in-out',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HoverSection;
