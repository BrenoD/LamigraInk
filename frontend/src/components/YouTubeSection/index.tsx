import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Parallax } from 'react-parallax';

const YouTube = dynamic(() => import('react-youtube'), { ssr: false });

interface Video {
  id: string;
  title: string;
}

const videos: Video[] = [
  { id: 'ALGBBqZVGu4', title: 'Can anyone become a professional tattoo artist?' },
  { id: 'ema93zzoCTk', title: 'Flamino Experience - Realistic Tattoo' },
  { id: 'a6XvOHYsJk8', title: 'The differences between Professional and Amateur Tattoo Artists' },
  { id: '5DyPGmo1A7M', title: 'How to overcome the fear of tattooing and being tattooed | Tattoo Masters' },
  // Add more videos as needed
];

const YouTubeSection: React.FC = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  const handleVideoClick = (index: number) => {
    setActiveVideoIndex(index);
    setStartIndex(index + 1);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  return (
    <Parallax
      blur={0}
      bgImage="https://ledstattoo.com.br/templates/yootheme/cache/bg-01-d805f7dc.webp"
      bgImageAlt="Tattoo background"
      strength={500}
    >
      <section 
        className="py-8 relative" 
        ref={scrollContainerRef}
      >
        {/* Adjust the opacity of the dark overlay layer to match the HoverSection */}
        <div className="absolute inset-0 bg-black opacity-80"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-white">Our YouTube Channel</h2>
          
          <div className="max-w-4xl mx-auto">
            {/* Main video */}
            <div className="mb-6">
              <div className="aspect-w-16 aspect-h-9 mb-2">
                <YouTube videoId={videos[activeVideoIndex].id} opts={opts} />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-white">{videos[activeVideoIndex].title}</h3>
            </div>

            {/* Secondary videos */}
            <div className="grid grid-cols-2 gap-4">
              {[0, 1].map((offset) => {
                const index = (startIndex + offset) % videos.length;
                return (
                  <div 
                    key={videos[index].id} 
                    className="cursor-pointer relative"
                    onClick={() => handleVideoClick(index)}
                  >
                    <div className="aspect-w-16 aspect-h-9 mb-2">
                      <img 
                        src={`https://img.youtube.com/vi/${videos[index].id}/0.jpg`}
                        alt={videos[index].title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="text-sm md:text-base font-semibold text-white line-clamp-2">{videos[index].title}</h3>
                    {offset === 1 && videos.length > 3 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                        <span className="text-white text-2xl">+{videos.length - 3}</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleScroll();
                          }}
                          className="ml-2 bg-white bg-opacity-20 text-white p-2 rounded-full"
                        >
                          &#8594;
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center mt-8">
            <a
              href="https://www.youtube.com/channel/UCJ-VXbZ3Ci9rtuT4_Ycz9Mg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-transparent border border-white text-white font-bold py-2 px-4 transition duration-300 text-sm sm:text-base"
            >
              Visit our channel
            </a>
          </div>
        </div>
      </section>
    </Parallax>
  );
};

export default YouTubeSection;
