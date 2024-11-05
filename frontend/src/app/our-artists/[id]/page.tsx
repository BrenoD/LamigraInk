'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { FaWhatsapp } from "react-icons/fa";


import { artistsData, loadArtistGallery } from '@/data/artists';
import { FadeInOnScroll } from '@/components/FadeInOnScroll';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useScrollPosition } from '@/hooks/useScrollPosition';

function getWhatsAppLink(number: string): string {
  const message = "Hello! I would like to know more about the prices and the estimated time for a custom tattoo. Could you guys help me?";
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedMessage}`;
}

export default function ArtistDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [loading, setLoading] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: string]: boolean }>({});
  const artist = artistsData.find((a) => a.id === id);
  const scrollPosition = useScrollPosition();
  const [visibleImages, setVisibleImages] = useState<{ [key: string]: boolean }>({});
  const imageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    async function loadGallery() {
      if (id) {
        setLoading(true);
        await loadArtistGallery(id);
        setLoading(false);
      }
    }

    loadGallery();
  }, [id]);

  useEffect(() => {
    const checkVisibility = () => {
      Object.entries(imageRefs.current).forEach(([key, element]) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = (
            rect.top >= -100 &&
            rect.top <= window.innerHeight - 100 ||
            rect.bottom >= 100 &&
            rect.bottom <= window.innerHeight + 100
          );

          if (isVisible && !visibleImages[key]) {
            const delayOffset = Math.abs(rect.top - window.innerHeight / 2) / 10;
            const baseDelay = 300;

            setTimeout(() => {
              setVisibleImages(prev => ({
                ...prev,
                [key]: true
              }));
            }, baseDelay + delayOffset);
          } else if (!isVisible && visibleImages[key]) {
            setTimeout(() => {
              setVisibleImages(prev => ({
                ...prev,
                [key]: false
              }));
            }, 150);
          }
        }
      });
    };

    checkVisibility();
  }, [scrollPosition, visibleImages]);

  const handleImageLoad = (imageUrl: string) => {
    setImagesLoaded(prev => ({
      ...prev,
      [imageUrl]: true
    }));
  };

  const getImageClassName = (imageUrl: string, isProfile = false) => {
    const isMobile = window.innerWidth < 768;
    const baseClasses = `object-cover rounded-lg`;
    const transitionClasses = `transition-all duration-1000`;

    // Se for a foto do perfil, retorna classes sem efeito preto e branco
    if (isProfile) {
      return `${baseClasses} ${transitionClasses} shadow-[0_0_35px_rgba(255,255,255,0.8)] ${!imagesLoaded[imageUrl] ? 'opacity-0' : 'opacity-100'
        }`;
    }

    // Para imagens da galeria
    const hoverClasses = `shadow-[0_0_35px_rgba(255,255,255,0.8)] grayscale-0 contrast-100 brightness-100`;
    const normalClasses = `shadow-none grayscale contrast-75 brightness-90`;

    return `${baseClasses} ${transitionClasses} ${visibleImages[imageUrl]
        ? `${hoverClasses} scale-[1.02]`
        : `${normalClasses} scale-100 ${isMobile ? '' : 'group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100'}`
      } ${!imagesLoaded[imageUrl] ? 'opacity-0' : 'opacity-100'}`;
  };

  const setImageRef = (key: string, element: HTMLDivElement | null) => {
    imageRefs.current[key] = element;
  };

  if (!artist) {
    return <div>Artist not found</div>;
  }

  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 bg-fixed bg-center bg-cover -z-10"
        style={{
          backgroundImage: 'url("https://ledstattoo.com.br/templates/yootheme/cache/bg-01-d805f7dc.webp")',
          transform: 'translateZ(-1px) scale(2)',
          zIndex: -1
        }}
      />

      <div className="relative bg-black/70 min-h-screen">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">

          <FadeInOnScroll>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 lg:gap-20 min-h-[60vh] mb-6 md:mb-8">
              {/* Coluna da esquerda - Imagem */}
              <div className="md:sticky md:top-8 md:self-start w-full md:w-auto">
                <div
                  ref={el => setImageRef('profile', el)}
                  className="relative w-[280px] h-[380px] sm:w-[300px] sm:h-[400px] mx-auto group"
                >
                  {!imagesLoaded[artist.profileImage] && (
                    <div className="absolute inset-0 bg-gray-100">
                      <LoadingSpinner />
                    </div>
                  )}
                  <div className="absolute inset-[-10px] border-[3px] border-white/30 rounded-lg transform -rotate-2"></div>
                  <div className="absolute inset-[-10px] border-[3px] border-white/30 rounded-lg transform rotate-2"></div>
                  <Image
                    src={artist.profileImage}
                    alt={artist.name}
                    fill
                    className={getImageClassName(artist.profileImage, true)}
                    onLoad={() => handleImageLoad(artist.profileImage)}
                  />
                </div>
              </div>

              {/* Coluna da direita - Conteúdo de texto */}
              <div className="flex-1 text-center md:text-left px-4 md:px-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 md:mb-8 text-white font-bold relative">
                  {artist.name}
                  <span className="absolute bottom-[-10px] left-0 w-full h-[3px] bg-orange-300/70"></span>
                </h1>
                <div className="space-y-4 md:space-y-6">
                  <p className="text-lg md:text-xl leading-relaxed text-gray-300">
                    {artist.description}
                  </p>

                  {artist.specialities && artist.specialities.length > 0 && (
                    <>
                      <h2 className="text-xl md:text-2xl text-white mb-4">Specialities</h2>
                      <ul className="text-gray-300 space-y-3">
                        {artist.specialities.map((speciality, index) => (
                          <li key={index} className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full bg-orange-300/70 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-black"></div>
                            </div>
                            {speciality}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {artist.experience && (
                    <>
                      <h2 className="text-xl md:text-2xl text-white mb-4">Experience</h2>
                      <p className="text-gray-300 flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-orange-300/70 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-black"></div>
                        </div>
                        Over {artist.experience} years of tattooing experience
                      </p>
                    </>
                  )}

                  {/* Botão de contato via WhatsApp */}
                  <div className="mt-6">
                    <a
                      href={getWhatsAppLink(artist.numberContact)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500 text-white hover:bg-green-600 transition duration-300"
                    >
                      <FaWhatsapp className="w-20 h-20" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </FadeInOnScroll>

          <div className="border-t border-white/20 pt-8 md:pt-12">
            <h2 className="text-3xl md:text-4xl text-white mb-6 md:mb-8 text-center">Work Gallery</h2>
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 px-4 md:px-6 lg:px-8">
                {artist.gallery.map((image, index) => (
                  <FadeInOnScroll key={index} delay={index * 100}>
                    <div
                      ref={el => setImageRef(image, el)}
                      className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] group transition-transform duration-500"
                    >
                      {!imagesLoaded[image] && (
                        <div className="absolute inset-0 bg-gray-100">
                          <LoadingSpinner />
                        </div>
                      )}
                      {image.endsWith('.mp4') ? (
                        <video
                          src={image}
                          controls
                          className={getImageClassName(image)}
                          onLoadedData={() => handleImageLoad(image)}
                        />
                      ) : (
                        <Image
                          src={image}
                          alt={`Work ${index + 1} by ${artist.name}`}
                          fill
                          className={getImageClassName(image)}
                          onLoad={() => handleImageLoad(image)}
                        />
                      )}
                    </div>
                  </FadeInOnScroll>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
