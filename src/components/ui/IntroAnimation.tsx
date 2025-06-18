import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoPath, setVideoPath] = useState('');
  const [loadingAttempts, setLoadingAttempts] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timeline = [
      { delay: 500, action: () => setStage(1) },
      { delay: 1500, action: () => setStage(2) },
      { delay: 3000, action: () => setShowLogo(true) },
      { delay: 4500, action: () => setShowText(true) },
      { delay: 8000, action: onComplete }, // Extended time to see the video
    ];

    timeline.forEach(({ delay, action }) => {
      setTimeout(action, delay);
    });
  }, [onComplete]);

  const handleVideoLoad = () => {
    console.log('🎥 Video loaded successfully from:', videoPath);
    setVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch(e => {
        console.log('Video autoplay blocked, that\'s okay');
      });
    }
  };

  const handleVideoError = (e: any) => {
    console.log('❌ Video failed to load from:', videoPath, e);
    setLoadingAttempts(prev => prev + 1);
    
    // Try next source
    if (videoRef.current && videoRef.current.children.length > loadingAttempts + 1) {
      const nextSource = videoRef.current.children[loadingAttempts + 1] as HTMLSourceElement;
      if (nextSource) {
        setVideoPath(nextSource.src);
        console.log('🔄 Trying next video source:', nextSource.src);
      }
    } else {
      setVideoError(true);
      console.log('❌ All video sources failed, using CSS animation fallback');
    }
  };

  const handleSourceError = (e: any, src: string) => {
    console.log('❌ Source failed:', src);
    setVideoPath(src);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] overflow-hidden bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Your Custom Video Background from Public/Public.mp4 */}
      {!videoError && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-70' : 'opacity-0'
          }`}
          muted
          autoPlay
          loop
          playsInline
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          style={{ 
            filter: 'brightness(0.9) contrast(1.1)',
            objectFit: 'cover'
          }}
        >
          {/* 🎬 YOUR VIDEO FROM Public/Public.mp4 */}
          <source src="/Public/Public.mp4" type="video/mp4" onError={(e) => handleSourceError(e, '/Public/Public.mp4')} />
          <source src="/Public/public.mp4" type="video/mp4" onError={(e) => handleSourceError(e, '/Public/public.mp4')} />
          <source src="/Public/PUBLIC.mp4" type="video/mp4" onError={(e) => handleSourceError(e, '/Public/PUBLIC.mp4')} />
          
          {/* Alternative paths in case of different structure */}
          <source src="/public/Public.mp4" type="video/mp4" onError={(e) => handleSourceError(e, '/public/Public.mp4')} />
          <source src="/Public.mp4" type="video/mp4" onError={(e) => handleSourceError(e, '/Public.mp4')} />
          <source src="/public.mp4" type="video/mp4" onError={(e) => handleSourceError(e, '/public.mp4')} />
          
          {/* Fallback common names */}
          <source src="/Public/video.mp4" type="video/mp4" onError={(e) => handleSourceError(e, '/Public/video.mp4')} />
          <source src="/Public/intro.mp4" type="video/mp4" onError={(e) => handleSourceError(e, '/Public/intro.mp4')} />
          <source src="/video.mp4" type="video/mp4" onError={(e) => handleSourceError(e, '/video.mp4')} />
        </video>
      )}

      {/* Enhanced CSS Animation Fallback (if video fails) */}
      <div className={`absolute inset-0 ${videoLoaded ? 'opacity-20' : 'opacity-100'} transition-opacity duration-1000`}>
        {/* Animated Ink Drop Effect */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 2 ? 1 : 0 }}
          transition={{ duration: 2 }}
        >
          {/* Main ink explosion */}
          <motion.div
            className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full"
            style={{
              background: 'radial-gradient(circle, #FF3C3C 0%, #FF7043 30%, #FFA726 60%, transparent 100%)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: stage >= 2 ? [0, 8, 12] : 0,
              opacity: stage >= 2 ? [0, 0.8, 0.4] : 0
            }}
            transition={{ duration: 3, ease: "easeOut" }}
          />

          {/* Secondary ink burst */}
          <motion.div
            className="absolute top-1/2 right-1/3 w-24 h-24 rounded-full"
            style={{
              background: 'radial-gradient(circle, #E91E63 0%, #F48FB1 40%, #CE93D8 70%, transparent 100%)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: stage >= 2 ? [0, 6, 10] : 0,
              opacity: stage >= 2 ? [0, 0.7, 0.3] : 0
            }}
            transition={{ duration: 2.5, delay: 0.5, ease: "easeOut" }}
          />

          {/* Flowing ink streams */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 origin-left"
              style={{
                width: '200px',
                height: '4px',
                background: `linear-gradient(90deg, ${
                  i % 2 === 0 ? '#FF3C3C' : '#E91E63'
                } 0%, transparent 100%)`,
                transform: `rotate(${i * 45}deg)`,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ 
                scaleX: stage >= 2 ? 1 : 0,
                opacity: stage >= 2 ? [0, 0.8, 0.4] : 0
              }}
              transition={{ 
                duration: 2, 
                delay: 0.3 + i * 0.1, 
                ease: "easeOut" 
              }}
            />
          ))}

          {/* Floating ink particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: ['#FF3C3C', '#FF7043', '#E91E63', '#F48FB1', '#CE93D8'][i % 5],
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: stage >= 2 ? [0, 1.5, 1] : 0,
                opacity: stage >= 2 ? [0, 1, 0.6] : 0,
                x: stage >= 2 ? [0, (Math.random() - 0.5) * 200] : 0,
                y: stage >= 2 ? [0, (Math.random() - 0.5) * 200] : 0,
              }}
              transition={{ 
                duration: 3, 
                delay: 1 + Math.random() * 2, 
                ease: "easeOut" 
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* LIORA Logo - Appears over video */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20"
            style={{ top: '45%', transform: 'translateY(-50%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-8xl md:text-[8rem] font-bold text-center relative"
              style={{
                fontFamily: "'Helvetica Neue', sans-serif",
                fontWeight: 700,
                color: '#FF3C3C',
                textShadow: '0 0 60px rgba(255, 60, 60, 0.8), 0 0 30px rgba(255, 60, 60, 0.6), 0 4px 20px rgba(0, 0, 0, 0.3)',
                filter: 'drop-shadow(0 10px 20px rgba(255, 60, 60, 0.4))'
              }}
              initial={{ opacity: 0, scale: 0.5, y: 200 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 2.5, 
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 50,
                damping: 15
              }}
            >
              LIORA
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtitle */}
      <AnimatePresence>
        {showText && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20"
            style={{ top: '58%', transform: 'translateY(-50%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          >
            <motion.p 
              className="text-2xl md:text-3xl text-center relative"
              style={{
                fontFamily: "'Helvetica Neue', sans-serif",
                color: '#333333',
                fontWeight: 400,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
              }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              Your AI Life Co-Pilot
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Video Status Indicator - Always Visible */}
      <div className="absolute top-4 left-4 text-sm text-white bg-black/70 p-4 rounded-xl z-50 backdrop-blur-sm border border-white/20 min-w-[300px]">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${videoLoaded ? 'bg-green-400 animate-pulse' : videoError ? 'bg-red-400' : 'bg-yellow-400 animate-pulse'}`}></div>
            <span className="font-bold">
              Video: {videoLoaded ? '✅ Playing Your Video!' : videoError ? '❌ Using Fallback Animation' : '⏳ Loading...'}
            </span>
          </div>
          
          <div className="text-xs space-y-1 opacity-90">
            <div>Stage: {stage}/4 {stage >= 2 && '(Animation Active)'}</div>
            <div>Attempts: {loadingAttempts + 1}/9</div>
            <div>Current Path: {videoPath || '/Public/Public.mp4'}</div>
            <div className="text-yellow-300">
              📁 Looking in: projects/Public/Public.mp4
            </div>
          </div>

          {videoLoaded && (
            <div className="text-green-300 text-xs font-bold animate-pulse">
              🎥 YOUR 15-SECOND VIDEO IS PLAYING! 🎥
            </div>
          )}

          {videoError && (
            <div className="text-red-300 text-xs">
              ⚠️ Video not found - check file location
            </div>
          )}
        </div>
      </div>

      {/* File Structure Helper */}
      <div className="absolute top-4 right-4 text-xs text-white bg-blue-900/70 p-4 rounded-xl z-50 backdrop-blur-sm border border-blue-400/20 max-w-[250px]">
        <div className="font-bold mb-2">📁 Expected Structure:</div>
        <div className="font-mono text-xs space-y-1">
          <div>your-project/</div>
          <div>├── Public/</div>
          <div>│   └── Public.mp4 ← Your video</div>
          <div>├── src/</div>
          <div>└── package.json</div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <AnimatePresence>
        {showText && (
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 1.5 }}
          >
            <motion.p 
              className="text-lg"
              style={{
                fontFamily: 'Arial, sans-serif',
                color: '#FF3C3C',
                fontWeight: 400,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
              }}
              animate={{ 
                y: [0, -10, 0],
                opacity: [1, 0.7, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1
              }}
            >
              ↓ scroll to continue
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default IntroAnimation;