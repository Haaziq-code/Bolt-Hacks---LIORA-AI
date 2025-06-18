import React from 'react';
import { Camera, CameraOff, Maximize2, Minimize2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AIMode } from '../../types';

interface VideoAgentProps {
  mode: AIMode;
  isActive: boolean;
}

const VideoAgent: React.FC<VideoAgentProps> = ({ mode, isActive }) => {
  const [isVideoEnabled, setIsVideoEnabled] = React.useState(true);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const getAgentPersonality = () => {
    switch (mode) {
      case 'coach':
        return {
          name: 'Coach Alex',
          personality: 'Energetic & Motivational',
          color: 'from-orange-500 to-red-500',
          avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
          bgGradient: 'from-orange-500/20 to-red-500/20'
        };
      case 'therapist':
        return {
          name: 'Dr. Sarah',
          personality: 'Calm & Empathetic',
          color: 'from-green-500 to-emerald-500',
          avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
          bgGradient: 'from-green-500/20 to-emerald-500/20'
        };
      case 'tutor':
        return {
          name: 'Prof. Emma',
          personality: 'Patient & Knowledgeable',
          color: 'from-indigo-500 to-purple-500',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
          bgGradient: 'from-indigo-500/20 to-purple-500/20'
        };
      default:
        return {
          name: 'LioraAI',
          personality: 'Helpful & Friendly',
          color: 'from-primary-500 to-accent-500',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
          bgGradient: 'from-primary-500/20 to-accent-500/20'
        };
    }
  };

  const agent = getAgentPersonality();

  return (
    <div className="p-8">
      <motion.div 
        className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-3xl overflow-hidden shadow-2xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="p-8">
          {/* Enhanced Header */}
          <div className="flex items-center justify-between mb-6">
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div 
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center shadow-xl`}
                animate={isActive ? { 
                  boxShadow: [
                    '0 0 0 0 rgba(14, 165, 233, 0.4)',
                    '0 0 0 15px rgba(14, 165, 233, 0)',
                  ]
                } : {}}
                transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
              >
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-heading">{agent.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{agent.personality}</p>
              </div>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <motion.div 
                className="flex items-center space-x-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div 
                  className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-emerald-500'}`}
                  animate={isActive ? { scale: [1, 1.3, 1] } : { opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {isActive ? 'Active' : 'Standby'}
                </span>
              </motion.div>
            </div>
          </div>

          {/* Enhanced Video Area */}
          <motion.div 
            className={`relative bg-gradient-to-br ${agent.bgGradient} backdrop-blur-sm rounded-2xl overflow-hidden ${
              isFullscreen ? 'aspect-square' : 'aspect-video'
            }`}
            layout
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence>
              {isVideoEnabled ? (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-center">
                    <motion.div 
                      className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center shadow-2xl`}
                      animate={isActive ? { 
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, -2, 0]
                      } : {}}
                      transition={{ duration: 3, repeat: isActive ? Infinity : 0 }}
                    >
                      <img
                        src={agent.avatar}
                        alt={agent.name}
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                    </motion.div>
                    <motion.p 
                      className="text-white text-xl font-bold mb-2"
                      animate={isActive ? { opacity: [0.7, 1, 0.7] } : {}}
                      transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                    >
                      {agent.name}
                    </motion.p>
                    <p className="text-gray-300 text-sm mb-4">
                      {isActive ? 'Listening & responding...' : 'Ready to chat'}
                    </p>
                    
                    {/* Enhanced Tavus Integration Placeholder */}
                    <div className="mt-6 text-xs text-gray-400 bg-black/30 rounded-xl px-4 py-2 backdrop-blur-sm border border-white/10">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-3 h-3" />
                        <span>[TAVUS VIDEO INTEGRATION - Talk to Liora]</span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Animated Background */}
                  <div className="absolute inset-0 opacity-20">
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-400/30 to-accent-400/30"
                      animate={{ opacity: [0.2, 0.4, 0.2] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white/30 rounded-full"
                        style={{
                          left: `${15 + i * 12}%`,
                          top: `${15 + (i % 2) * 70}%`,
                        }}
                        animate={{
                          y: [0, -30, 0],
                          opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <CameraOff className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg font-medium">Video disabled</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Enhanced Video Controls */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <motion.button 
                onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                className="p-3 bg-black/50 text-white rounded-xl hover:bg-black/70 transition-all backdrop-blur-sm border border-white/20 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isVideoEnabled ? (
                  <Camera className="w-4 h-4" />
                ) : (
                  <CameraOff className="w-4 h-4" />
                )}
              </motion.button>
              
              <motion.button 
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-3 bg-black/50 text-white rounded-xl hover:bg-black/70 transition-all backdrop-blur-sm border border-white/20 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </motion.button>
            </div>

            {/* Enhanced Status Indicator */}
            <AnimatePresence>
              {isActive && isVideoEnabled && (
                <motion.div 
                  className="absolute top-4 left-4 flex items-center space-x-2 bg-black/50 text-white px-4 py-2 rounded-xl backdrop-blur-sm border border-white/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <motion.div 
                    className="w-2 h-2 bg-red-500 rounded-full"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="text-sm font-medium">Live</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default VideoAgent;