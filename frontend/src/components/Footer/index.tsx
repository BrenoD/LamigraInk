import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="logo"></div>
        <div className="contact">
          <h4>Contato</h4>
          <p>Email: contato@exemplo.com</p>
          <p>Telefone: (11) 1234-5678</p>
        </div>
        <div className="location">
          <h4>Onde Estamos</h4>
          <p>Rua Exemplo, 123</p>
          <p>Cidade, Estado - CEP 12345-678</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Nome da Empresa. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
