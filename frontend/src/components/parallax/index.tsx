import React from 'react';
import './ParallaxSection.css';

const ParallaxSection = () => {
  return (
    <section className="parallax-section">
      <div className="text-container">
        <h2 className="fade-in-text delay-1">Fazendo História no Mundo da Tatuagem</h2>
        <br />
        <p className="fade-in-text delay-2">O maior estúdio de tatuagem da América Latina, com reconhecimento internacional, dezenas de prêmios e equipe especializada.</p>
        <br />
        <p className="fade-in-text delay-3">Trabalho seguro e responsável na aplicação de piercings, retirada de tatuagens a laser e criação de obras de arte em sua pele.</p>
        <br />
        <button className='fade-in-text delay-4'>Conheça o Estúdio</button>
      </div>
    </section>
  );
};

export default ParallaxSection;
