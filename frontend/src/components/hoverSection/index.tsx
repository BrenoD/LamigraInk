import React from 'react';

const HoverSection = () => {
  return (
    <section className="hover-section">
      <div className="image-box">
        <div className="overlay">
          <h2>TATUAGEM</h2>
        </div>
        <img src="/path/to/image1.jpg" alt="Tattoo Image" className="reveal-image" />
      </div>
      <div className="image-box">
        <div className="overlay">
          <h2>LASER</h2>
          <p>Clareamento e remoção de tatuagem a laser</p>
        </div>
        <img src="/path/to/image2.jpg" alt="Laser Image" className="reveal-image" />
      </div>
      <div className="image-box">
        <div className="overlay">
          <h2>PIERCING</h2>
        </div>
        <img src="/path/to/image3.jpg" alt="Piercing Image" className="reveal-image" />
      </div>
    </section>
  );
};

export default HoverSection;
