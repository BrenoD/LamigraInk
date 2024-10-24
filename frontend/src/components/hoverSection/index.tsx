import React, { useState } from 'react';

const HoverSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null); // Estado para controlar qual imagem está em hover

  const images = [
    {
      defaultSrc: 'https://ledstattoo.com.br/templates/yootheme/cache/bg-01-d805f7dc.webp',
      hoverSrc: 'https://ledstattoo.com.br/templates/yootheme/cache/tattoo-382337ab.webp',
      title: 'TATUAGEM',
      description: '',
    },
    {
      defaultSrc: 'https://ledstattoo.com.br/templates/yootheme/cache/bg-01-d805f7dc.webp',
      hoverSrc: 'https://ledstattoo.com.br/templates/yootheme/cache/laser-5938c060.webp',
      title: 'LASER',
      description: 'Clareamento e remoção de tatuagem a laser',
    },
    {
      defaultSrc: 'https://ledstattoo.com.br/templates/yootheme/cache/bg-01-d805f7dc.webp',
      hoverSrc: 'https://ledstattoo.com.br/templates/yootheme/cache/piercing-2907d38c.webp',
      title: 'PIERCING',
      description: '',
    },
  ];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: 'url("https://ledstattoo.com.br/templates/yootheme/cache/bg-01-d805f7dc.webp")' }}
      ></div>

      {/* Image Boxes */}
      <div className="relative z-10">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-full h-96 flex flex-col items-center justify-center"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Título Fixo */}
            <h2 className="absolute text-4xl font-bold text-white z-20">{image.title}</h2>

            {/* Descrição Fixa */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-30 transition-opacity duration-300">
              {image.description && (
                <p className="mt-2 text-lg mt-20">{image.description}</p> // Descrição com margem inferior de 2em
              )}
            </div>

            {/* Esconde a imagem padrão e mostra a de hover */}
            <img
              src={hoveredIndex === index ? image.hoverSrc : image.defaultSrc}
              alt={image.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`} // Controla a opacidade
              style={{ transition: 'opacity 0.3s ease-in-out' }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HoverSection;
