import React, { useState, useEffect } from 'react';

const HoverSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const images = [
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
      preloadImage(image.defaultSrc);
      preloadImage(image.hoverSrc);
    });
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: 'url("https://ledstattoo.com.br/templates/yootheme/cache/bg-01-d805f7dc.webp")' }}
      ></div>

      <div className="relative z-10 flex flex-col items-stretch justify-center">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative h-[300px] flex flex-col items-center justify-center transition-transform duration-300 mb-4"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{ transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)' }}
          >
            <h2 className="absolute text-2xl md:text-4xl font-bold text-white z-20">{image.title}</h2>

            {image.description && (
              <div className="absolute bottom-4 text-center text-white z-20 text-sm md:text-lg">
                {image.description}
              </div>
            )}

            <img
              src={hoveredIndex === index ? image.hoverSrc : image.defaultSrc}
              alt={image.title}
              className="w-full h-full object-cover transition-opacity duration-300"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out'
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HoverSection;
