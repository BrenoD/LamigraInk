import React, { useState, useRef } from 'react';
import { Parallax } from 'react-parallax';
import YouTube from 'react-youtube';

interface Video {
  id: string;
  title: string;
}

const videos: Video[] = [
  { id: 'ALGBBqZVGu4', title: 'Can Anyone Become a Professional Tattoo Artist?' },
  { id: 'ema93zzoCTk', title: 'Flamino Experience - Realistic Tattoo' },
  { id: 'a6XvOHYsJk8', title: 'The Differences Between Professional and Amateur Tattoo Artists' },
  { id: '5DyPGmo1A7M', title: 'How to Overcome the Fear of Tattooing | Tattoo Masters' },
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
      bgImageAlt="Tattoo studio background"
      strength={500}
    >
      <section 
        className="py-8 md:py-12 lg:py-16 relative font-sans" 
        ref={scrollContainerRef}
      >
        <div className="absolute inset-0 bg-black opacity-80"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center text-white">
            Featured Videos
          </h2>
          
          <div className="max-w-4xl mx-auto">
            {/* Main video */}
            <div className="mb-8">
              <div className="aspect-w-16 aspect-h-9 mb-4 rounded-lg overflow-hidden">
                <YouTube videoId={videos[activeVideoIndex].id} opts={opts} />
              </div>
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-white">
                {videos[activeVideoIndex].title}
              </h3>
            </div>

            {/* Secondary videos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {[0, 1].map((offset) => {
                const index = (startIndex + offset) % videos.length;
                return (
                  <div 
                    key={videos[index].id} 
                    className="cursor-pointer relative group"
                    onClick={() => handleVideoClick(index)}
                  >
                    <div className="aspect-w-16 aspect-h-9 mb-2 rounded-lg overflow-hidden">
                      <img 
                        src={`https://img.youtube.com/vi/${videos[index].id}/maxresdefault.jpg`}
                        alt={videos[index].title}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-sm md:text-base lg:text-lg font-semibold text-white line-clamp-2">
                      {videos[index].title}
                    </h3>
                    {offset === 1 && videos.length > 3 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-lg">
                        <span className="text-white text-xl md:text-2xl">+{videos.length - 3}</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleScroll();
                          }}
                          className="ml-2 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition-all duration-300"
                          aria-label="Next videos"
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

          <div className="text-center mt-8 md:mt-12">
            <a
              href="https://www.youtube.com/channel/UCJ-VXbZ3Ci9rtuT4_Ycz9Mg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg transition duration-300 hover:bg-white hover:text-black text-sm sm:text-base"
            >
              Visit Our YouTube Channel
            </a>
          </div>
        </div>
      </section>
    </Parallax>
  );
};

export default YouTubeSection;
