"use client";

import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ChatPopup from '../components/ChatPopup'; // Importando o ChatPopup
import Header from '@/components/header';
import Parallax from '@/components/parallax';
import HoverSection from '@/components/hoverSection';
import ArtistsSection from '@/components/artistsSection';
import AboutUsHoverSection from '@/components/AboutUsHoverSection';
import Footer from '@/components/Footer';

export default function LandingPage() {
  const [showChat, setShowChat] = useState(false); // Estado para controlar a exibição do chat

  return (
    <div className="bg-black text-white relative overflow-hidden">
      {/* Triângulos no topo da página */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-red-600 clip-triangle rotate-45 opacity-60"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 clip-triangle rotate-45 opacity-60"></div>

      <Header/>

      {/* Hero Section */}
      <motion.section
        className="h-screen flex flex-col justify-center items-center bg-black z-10 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-6xl font-extrabold text-center mb-4"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Arte. Tatuagem. Cultura.
        </motion.h1>
        <motion.p
          className="text-xl text-center mb-8"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Transformando suas ideias em arte desde 2000.
        </motion.p>
        <motion.button
          className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-full"
          whileHover={{ scale: 1.1 }}
        >
          Agende sua consulta
        </motion.button>
      </motion.section>

      <Parallax/>
      <HoverSection/>
      <ArtistsSection/>
      <AboutUsHoverSection/>
      <Footer/>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900 text-center">
        <h2 className="text-4xl font-bold mb-6">Sobre Nós</h2>
        <p className="max-w-2xl mx-auto text-lg">
          Somos uma equipe de artistas dedicados, focados em criar as melhores tatuagens. Nosso estúdio é conhecido pela excelência e pelos clientes satisfeitos.
        </p>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-black text-center">
        <h2 className="text-4xl font-bold mb-6">Serviços</h2>
        <div className="flex justify-center space-x-8">
          <div className="w-64 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">Tatuagem</h3>
            <p className="text-lg">Tatuagens personalizadas feitas sob medida para você.</p>
          </div>
          <div className="w-64 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">Body Piercing</h3>
            <p className="text-lg">Piercings aplicados com segurança por profissionais experientes.</p>
          </div>
          <div className="w-64 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">Desenho Personalizado</h3>
            <p className="text-lg">Transformamos suas ideias em um design exclusivo para sua tatuagem.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-center">
        <h2 className="text-4xl font-bold mb-6">Contato</h2>
        <p className="text-lg mb-6">Entre em contato conosco para mais informações.</p>
        <form className="max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Seu Nome"
            className="w-full p-3 mb-4 bg-gray-800 rounded-lg text-white"
          />
          <input
            type="email"
            placeholder="Seu Email"
            className="w-full p-3 mb-4 bg-gray-800 rounded-lg text-white"
          />
          <textarea
            placeholder="Sua Mensagem"
            className="w-full p-3 mb-4 bg-gray-800 rounded-lg text-white"
            rows={4}
          />
          <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-full">
            Enviar Mensagem
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-black text-center text-gray-400">
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://instagram.com" className="hover:text-gray-300">
            <FaInstagram size={24} />
          </a>
          <a href="https://facebook.com" className="hover:text-gray-300">
            <FaFacebookF size={24} />
          </a>
          <a href="https://twitter.com" className="hover:text-gray-300">
            <FaTwitter size={24} />
          </a>
        </div>
        © {new Date().getFullYear()} Led's Tattoo. Todos os direitos reservados.
      </footer>

      {/* Botão de Chat para abrir o popup */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-full shadow-lg"
      >
        Chat
      </button>

      {/* Chat Popup */}
      {showChat && <ChatPopup />}
    </div>
  );
}
