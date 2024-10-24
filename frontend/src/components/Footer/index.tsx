import React from 'react';
import { FaInstagram, FaFacebook } from 'react-icons/fa'; // Importando ícones do React Icons

const ContactSection = () => {
  return (
    <section
      className="relative w-full py-10 bg-cover bg-center"
      style={{
        backgroundImage: 'url("https://ledstattoo.com.br/templates/yootheme/cache/bg-01-d805f7dc.webp")', // URL da imagem de fundo
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div> {/* Overlay para escurecer o fundo */}

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-10 text-white">
        {/* Título */}
        <h2 className="text-3xl font-bold text-center mb-4">Siga-nos no Instagram</h2>
        <hr className="border-t-2 border-[#a68d7a] mb-6" /> {/* Linha divisória */}

        {/* Informações de contato */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <FaInstagram className="mr-2 text-[#a68d7a]" /> {/* Ícone do Instagram */}
            <span>Onde Estamos</span>
          </div>
          <div className="flex items-center justify-end">
            <span>Avenida Ibirapuera, 3478</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <span>Moema, São Paulo - SP</span>
          </div>
          <div className="flex items-center justify-end">
            <FaFacebook className="mr-2 text-[#a68d7a]" /> {/* Ícone do Facebook */}
            <span>(11) 94486-3323</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <span>CEP 04028-003</span>
          </div>
          <div className="flex items-center justify-end">
            <span>contato@ledstattoo.com.br</span>
          </div>
          <div className="flex justify-center mt-4">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2">
              <FaInstagram className="text-3xl text-[#a68d7a]" /> {/* Ícone clicável do Instagram */}
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2">
              <FaFacebook className="text-3xl text-[#a68d7a]" /> {/* Ícone clicável do Facebook */}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
