import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, VolumeX, Volume2 } from 'lucide-react';

const VideoPlayer = ({ src,className,mutePosition="right",showMuteButton = true }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          playVideo();
        } else {
          pauseVideo();
        }
      });
    }, options);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
       
      }).catch((error) => {
        console.error("Autoplay failed:", error);
        setIsPlaying(false);
      });
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full rounded-2xl overflow-hidden "
      onClick={togglePlayPause}
    >
      <video
        ref={videoRef}
        src={src}
        muted={isMuted}
        loop
        playsInline
        className={` cursor-pointer w-full ${className}`}
        preload="metadata"
        poster={`${src}#t=0.9`}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 flex items-center justify-center  bg-opacity-20 transition-opacity duration-300">
        {isPlaying ? (
          <Pause className="w-12 h-12 text-white opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/50 p-3 rounded-full" />
        ) : (
          <Play className="w-12 h-12 text-white bg-black/50 p-3 rounded-full" />
        )}
      </div>
      {showMuteButton && <button
        onClick={toggleMute}
        className={`absolute bottom-3 ${mutePosition}-4 bg-black/70 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors duration-200`}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>}
    </div>
  );
};

export default VideoPlayer;

