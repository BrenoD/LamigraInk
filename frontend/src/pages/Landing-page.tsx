"use client";

import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ChatPopup from '../components/ChatPopup'; // Importando o ChatPopup
import Header from '@/components/header/Header';
import Parallax from '@/components/parallax';
import HoverSection from '../components/hoverSection';
import ArtistsSection from '@/components/artistsSection';
import AboutUsHoverSection from '@/components/AboutUsHoverSection';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';

// Função para gerar um Room ID aleatório
const generateRoomId = () => {
  return Math.random().toString(36).substring(2, 10); // Gera um Room ID único
};

export default function LandingPage() {
  const [showChat, setShowChat] = useState(false); // Estado para controlar a exibição do chat
  const [roomId, setRoomId] = useState<string>(''); // Estado para armazenar o Room ID
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (showChat && !roomId) {
      const newRoomId = generateRoomId();
      setRoomId(newRoomId);
  
      // Registra o chat como ativo no backend
      fetch('http://localhost:8080/active-chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomId: newRoomId }),
      }).catch(error => console.error("Erro ao registrar chat ativo:", error));
    }
  }, [showChat, roomId]);
  

  return (
    <div className="bg-black text-white relative overflow-hidden">
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Conteúdo principal da página
      <motion.section className="h-screen flex flex-col justify-center items-center bg-black z-10 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl font-bold">Arte. Tatuagem. Cultura.</h1>
      </motion.section> */}

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

      <Parallax />
      <HoverSection />
      <ArtistsSection />
      <AboutUsHoverSection />
      <Footer />

      {/* Botão de Chat */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-5 z-50 right-5 bg-green-500 text-white p-3 rounded-full shadow-lg"
      >
        Chat
      </button>

      {showChat && roomId && (
        <ChatPopup roomId={roomId} userType="client" onClose={() => setShowChat(false)} />
      )}
    </div>
  );
}
