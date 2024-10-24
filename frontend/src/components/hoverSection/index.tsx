import React, { useState, useEffect } from 'react';

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

  // Função para pré-carregar as imagens
  const preloadImage = (src) => {
    const img = new Image();
    img.src = src;
  };

  // useEffect para pré-carregar as imagens ao montar o componente
  useEffect(() => {
    images.forEach((image) => {
      preloadImage(image.defaultSrc); // Pré-carrega a imagem padrão
      preloadImage(image.hoverSrc);   // Pré-carrega a imagem de hover
    });
  }, []); // Passa um array vazio para garantir que rode apenas uma vez quando o componente for montado

  return (
    <section className="relative w-full overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: 'url("https://ledstattoo.com.br/templates/yootheme/cache/bg-01-d805f7dc.webp")' }}
      ></div>

      {/* Image Boxes */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-full md:w-1/3 h-64 md:h-96 flex flex-col items-center justify-center transition-transform duration-300"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{ transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)' }} // Adicionando efeito de scale
          >
            {/* Título Fixo */}
            <h2 className="absolute text-2xl md:text-4xl font-bold text-white z-20">{image.title}</h2>

            {/* Descrição Fixa */}
            {image.description && (
              <div className="absolute bottom-4 text-center text-white z-20 text-sm md:text-lg">
                {image.description}
              </div>
            )}

            {/* Esconde a imagem padrão e mostra a de hover */}
            <img
              src={hoveredIndex === index ? image.hoverSrc : image.defaultSrc}
              alt={image.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}
              style={{ transition: 'opacity 0.3s ease-in-out' }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HoverSection;
