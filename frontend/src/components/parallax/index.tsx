import React from 'react';

const ParallaxSection = () => {
  return (
    <section className="relative w-full h-screen bg-cover bg-fixed bg-top" style={{ backgroundImage: `url('https://ledstattoo.com.br/templates/yootheme/cache/sobre-home-5d9c8c37.webp')` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Text and Button - Aligned Left */}
      <div className="relative z-10 flex items-center justify-end mr-40 h-full px-4 md:px-10">
        <div className="text-white max-w-lg">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Fazendo História no Mundo da Tatuagem
          </h2>
          <p className="text-xl mb-6">
            O maior estúdio de tatuagem da América Latina, com reconhecimento internacional, dezenas de prêmios e equipe especializada.
          </p>
          <p className="text-xl mb-6">
            Trabalho seguro e responsável na aplicação de piercings, retirada de tatuagens a laser e criação de obras de arte em sua pele.
          </p>
          <a
            className="inline-block px-8 py-3 rounded-sm"
            href="/estudio"
            style={{
              backgroundColor: '#a68d7a',
              color: '#fff',
              borderColor: 'transparent',
            }}
          >
            Conheça o Estúdio
          </a>
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
