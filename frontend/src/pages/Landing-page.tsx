"use client";

import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ChatPopup from '../components/ChatPopup'; // Importando o ChatPopup
import Header from '@/components/header/Header';
import Parallax from '@/components/parallax';
import HoverSection from '../components/hoverSection';
import ArtistsSection from '@/components/artistsSection';
import AboutUsHoverSection from '@/components/AboutUsHoverSection';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';

export default function LandingPage() {
  const [showChat, setShowChat] = useState(false); // Estado para controlar a exibição do chat
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-black text-white relative overflow-hidden">
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <HeroSection/>
      <Parallax />
      <HoverSection />
      <ArtistsSection />
      <AboutUsHoverSection />
      <Footer />

      

      {/* Botão de Chat para abrir o popup */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-full shadow-lg"
      >
        Chat
      </button>

      {/* Chat Popup */}
      {showChat && <ChatPopup onClose={function (): void {
        throw new Error('Function not implemented.');
      } } />}
    </div>
  );
}