import React from 'react';
import './ArtistsSection.css';

const ArtistsSection = () => {
  return (
    <section className="artists-section">
      <h2>Conheça Nossos Artistas</h2>
      <div className="artists-container">
        <div className="artist-card artist1">
          <div className="artist-info">
            <h3>Artista 1</h3>
          </div>
        </div>
        <div className="artist-card artist2">
          <div className="artist-info">
            <h3>Artista 2</h3>
          </div>
        </div>
        <div className="artist-card artist3">
          <div className="artist-info">
            <h3>Artista 3</h3>
          </div>
        </div>
      </div>
      <button className='button'>Conheça os artistas</button>
    </section>
  );
};

export default ArtistsSection;
