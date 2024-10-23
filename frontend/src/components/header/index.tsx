import React from 'react';
import './header.css';

const Header = () => {
    return (
    <header className="header">
        <div className="header-container">
        <div className="logo">Lamigra Tattoo</div>
        <nav className="nav-menu">
            <a href="#" className="nav-link">HOME</a>
            <a href="#" className="nav-link">O ESTÚDIO</a>
            <a href="#" className="nav-link">SERVIÇOS</a>
            <a href="#" className="nav-link">ARTISTAS</a>
            <a href="#" className="nav-link">ESTILOS</a>
            <a href="#" className="nav-link">CONTATO</a>
        </nav>
        <div className="social-icons">
            <a href="#"><i className="fa fa-instagram"></i></a>
            <a href="#"><i className="fa fa-facebook"></i></a>
        </div>
        </div>
    </header>
    );
};

export default Header;
