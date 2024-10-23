import React from 'react';

const HoverSection = () => {
  return (
    <section className="hover-section">
      <div className="image-box">
        <div className="overlay">
          <h2>SOLICITE UM ORÇAMENTO</h2>
          <button>Solicite um orçamento</button>
        </div>
        <img src="/path/to/image1.jpg" alt="Tattoo Image" className="reveal-image" />
      </div>
    </section>
  );
};

export default HoverSection;
