"use client";

import { useState, useEffect, useRef } from 'react';
import ChatPopup from '../components/ChatPopup';

import Parallax from '../components/Parallax';
import HoverSection from '../components/HoverSection';
import ArtistsSection from '../components/ArtistsSection';

import Footer from '@/components/Footer';
import Header from '../components/Header/Header';
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


  return (
    <div className="bg-black text-white relative overflow-hidden">
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
      <div ref={placementRef}>
        <Parallax onGalleryClick={() => scrollToSection(galleryRef)} />
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
