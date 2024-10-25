"use client";

import { useState, useRef } from 'react';
import ChatPopup from '../components/ChatPopup';
import Header from '../components/Header/Header';
import HeroSection from '../components/HeroSection';
import Parallax from '../components/Parallax';
import HoverSection from '../components/HoverSection';
import ArtistsSection from '../components/ArtistsSection';
import Footer from '../components/Footer';
import YouTubeSection from '../components/YouTubeSection';
import AftercareSection from '../components/AftercareSection';
import ImageCarousel from '../components/ImageCarousel';
import BookingFeeSection from '@/components/BookingFeeSection';

const backgroundStyle = {
  backgroundImage: "url('https://ledstattoo.com.br/templates/yootheme/cache/bg-01-d805f7dc.webp')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
};

export default function LandingPage() {
  const [showChat, setShowChat] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const galleryRef = useRef<HTMLDivElement>(null);
  const youtubeRef = useRef<HTMLDivElement>(null);
  const aftercareRef = useRef<HTMLDivElement>(null);
  const placementRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const giftCardsRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const carouselImages = [
    'https://as2.ftcdn.net/v2/jpg/06/64/80/63/1000_F_664806390_BZz3oC5X2GM0epBWLwSxhdfpYXWMJ3Kg.jpg',
    'https://as1.ftcdn.net/v2/jpg/06/27/73/36/1000_F_627733695_76OIk9H1hlmVXqQw6DJKWwllo2Apn2bH.jpg',
    'https://as1.ftcdn.net/v2/jpg/07/93/59/78/1000_F_793597866_0wxhOMfaNXFrHggscUcdl8q36i672NSq.jpg',
    // Adicione mais URLs de imagens conforme necessário
  ];

  return (
    <div className="bg-black text-white relative" style={backgroundStyle}>
      <div className="absolute inset-0 bg-black opacity-80 z-0"></div>
      <div className="relative z-10">
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
            giftCards: giftCardsRef
          }}
        />
        <HeroSection />
        <Parallax />
        <HoverSection />
        <ArtistsSection />
        <YouTubeSection />
        <AftercareSection />
        <ImageCarousel images={carouselImages} interval={3000} />
        <BookingFeeSection />
        <Footer />

        <button
          onClick={() => setShowChat(!showChat)}
          className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-full shadow-lg z-50"
        >
          Chat
        </button>

        {showChat && <ChatPopup onClose={() => setShowChat(false)} />}
      </div>
    </div>
  );
}
