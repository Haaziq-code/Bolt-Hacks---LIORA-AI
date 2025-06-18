import React from 'react';
import { motion } from 'framer-motion';

interface VoiceWaveformProps {
  isActive: boolean;
  bars?: number;
}

const VoiceWaveform: React.FC<VoiceWaveformProps> = ({ isActive, bars = 5 }) => {
  return (
    <div className="flex items-center justify-center space-x-1">
      {Array.from({ length: bars }).map((_, index) => (
        <motion.div
          key={index}
          className="w-1 bg-current rounded-full"
          animate={isActive ? {
            height: [4, 16, 8, 20, 6, 14, 10],
            opacity: [0.4, 1, 0.6, 1, 0.5, 0.9, 0.7]
          } : {
            height: 4,
            opacity: 0.4
          }}
          transition={{
            duration: 0.8,
            repeat: isActive ? Infinity : 0,
            delay: index * 0.1,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
};

export default VoiceWaveform;