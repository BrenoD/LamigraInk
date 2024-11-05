"use client";

import { FaComment } from "react-icons/fa6";
import Image from "next/image"
import { useState, useEffect, useRef } from 'react';
import ChatPopup from '../components/ChatPopup';
import Parallax from '../components/parallax';
import HoverSection from '../components/hoverSection';
import ArtistsSection from '../components/artistsSection';
import Footer from '@/components/Footer';
import Header from '../components/header/Header';
import HeroSection from '@/components/HeroSection';
import ImageCarousel from '@/components/ImageCarousel';
import YouTubeSection from '../components/YouTubeSection/index';
import BookingFeeSection from '@/components/BookingFeeSection';
import AftercareSection from '@/components/AftercareSection';

// Array de imagens para o carrossel
const carouselImages = [
  'https://t4.ftcdn.net/jpg/07/32/21/35/360_F_732213522_Od8FD6XBPgYmHKtJByVoJaiL8miY2QoN.jpg',
  'https://t4.ftcdn.net/jpg/07/32/21/35/360_F_732213522_Od8FD6XBPgYmHKtJByVoJaiL8miY2QoN.jpg',
  'https://t4.ftcdn.net/jpg/07/32/21/35/360_F_732213522_Od8FD6XBPgYmHKtJByVoJaiL8miY2QoN.jpg',
];

// Função para gerar um Room ID aleatório
const generateRoomId = () => {
  return Math.random().toString(36).substring(2, 10); // Gera um Room ID único
};

export default function LandingPage() {
  const [showChat, setShowChat] = useState(false); // Estado para controlar a exibição do chat
  const [roomId, setRoomId] = useState<string>(''); // Estado para armazenar o Room ID
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Estado para controle da animação de carregamento
  const [exitAnimation, setExitAnimation] = useState(false); // Estado para a animação de saída

  // Criar as refs para cada seção
  const galleryRef = useRef<HTMLDivElement>(null);
  const youtubeRef = useRef<HTMLDivElement>(null);
  const aftercareRef = useRef<HTMLDivElement>(null);
  const placementRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const giftCardsRef = useRef<HTMLDivElement>(null);
  const artistsSectionRef = useRef<HTMLDivElement>(null);

  // Função para rolar até a seção
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

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

  // Configuração da animação de carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setExitAnimation(true); // Inicia a animação de saída após 3 segundos
      setTimeout(() => setLoading(false), 1000); // Remove a div após a animação de saída
    }, 3000); // Duração antes da animação de saída

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black text-white relative overflow-hidden">
      {/* Div de carregamento com transição suave */}
      {loading && (
        <div className={`fixed inset-0 flex items-center justify-center z-50 transition-transform duration-1000 ease-in-out ${exitAnimation ? "-translate-x-full" : "translate-x-0"}`}>
          <div className="fixed inset-0 flex items-center justify-center bg-black">
            <Image src="/images/LogoTrueLamigra.webp" alt="La Migra logo" width={360} height={150} />
          </div>
        </div>
      )}

      {/* Conteúdo do site com transição de opacidade */}
      <div className={`transition-opacity duration-1000 ease-in-out ${exitAnimation ? "opacity-100" : "opacity-0"}`}>
        <Header
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          scrollToSection={scrollToSection}
          refs={{
            gallery: galleryRef,
            youtube: youtubeRef,
            aftercare: aftercareRef,
            placement: placementRef,
            booking: bookingRef,
            giftCards: giftCardsRef,
            artistsSection: artistsSectionRef
          }}
        />

        <video
          autoPlay
          muted
          loop
          id="background-video"
          className="absolute top-0 left-0 w-full h-screen sm:h-auto object-cover lg:object-contain z-0 pointer-events-none"
        >
          <source src="/vitrine-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <HeroSection />
        <Parallax onGalleryClick={() => scrollToSection(galleryRef)} />
        <HoverSection />
        <div ref={artistsSectionRef}>
          <ArtistsSection />
        </div>
        <div ref={galleryRef}>
          <ImageCarousel images={carouselImages} />
        </div>
        <div ref={youtubeRef}>
          <YouTubeSection />
        </div>
        <div ref={aftercareRef}>
          <AftercareSection />
        </div>
        <div ref={bookingRef}>
          <BookingFeeSection />
        </div>
        <div ref={giftCardsRef}>
          {/* Componente GiftCards aqui */}
        </div>
        <Footer />

        {/* Botão de Chat */}
        <button
          onClick={() => setShowChat(!showChat)}
          className="fixed bottom-5 z-50 right-5 bg-green-500 text-white p-5 rounded-full shadow-lg text-4xl flex items-center justify-center"
        >
          <FaComment />
        </button>

        {showChat && roomId && (
          <ChatPopup roomId={roomId} userType="client" onClose={() => setShowChat(false)} />
        )}
      </div>
    </div>
  );
}
