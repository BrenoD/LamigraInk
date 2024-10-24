import React, { useState, useEffect } from 'react';

const HoverSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null); // Estado para controlar qual imagem está em hover

  const images = [
    {
      defaultSrc: 'https://ledstattoo.com.br/templates/yootheme/cache/bg-01-d805f7dc.webp',
      hoverSrc: 'https://ledstattoo.com.br/templates/yootheme/cache/callcontato-423525fd.webp',
      title: 'SOLICITE UM ORÇAMENTO',
      description: 'E AGENTE SUA TATOO',
    }
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
      <div className="relative z-10">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-full h-80 md:h-96 flex flex-col items-center justify-center"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Título Fixo */}
            <h2 className="absolute text-3xl md:text-4xl font-bold text-white z-20 text-center md:text-left px-4">
              {image.title}
            </h2>

            {/* Descrição Fixa */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-30 transition-opacity duration-300 px-4">
              {image.description && (
                <p className="mt-2 text-sm md:text-lg mt-16 md:mt-20 text-center md:text-left">
                  {image.description}
                </p>
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
