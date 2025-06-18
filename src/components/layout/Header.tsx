import React from 'react';
import { Sun, Moon, Mic, Video, Settings, Crown, Sparkles, Brain, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import VoiceWaveform from '../ui/VoiceWaveform';
import { useVoice } from '../../hooks/useVoice';

interface HeaderProps {
  onToggleTheme: () => void;
  isDarkMode: boolean;
  onOpenPro: () => void;
  onOpenSettings?: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  onToggleTheme, 
  isDarkMode, 
  onOpenPro, 
  onOpenSettings,
  onBack,
  showBackButton = false
}) => {
  const { user, currentMode } = useApp();
  const { isPlaying, isRecording, apiUsage, checkUsage } = useVoice();

  React.useEffect(() => {
    checkUsage();
  }, [checkUsage]);

  const getModeInfo = () => {
    switch (currentMode) {
      case 'coach':
        return { 
          name: 'AI Coach', 
          color: 'from-orange-500 to-red-500',
          bg: 'from-orange-500/20 to-red-500/20',
          icon: '💪'
        };
      case 'therapist':
        return { 
          name: 'AI Therapist', 
          color: 'from-green-500 to-emerald-500',
          bg: 'from-green-500/20 to-emerald-500/20',
          icon: '🧠'
        };
      case 'tutor':
        return { 
          name: 'AI Tutor', 
          color: 'from-indigo-500 to-purple-500',
          bg: 'from-indigo-500/20 to-purple-500/20',
          icon: '📚'
        };
      default:
        return { 
          name: 'LioraAI', 
          color: 'from-accent-500 to-accent-600',
          bg: 'from-accent-500/20 to-accent-600/20',
          icon: '🤖'
        };
    }
  };

  const modeInfo = getModeInfo();

  return (
    <motion.header 
      className="relative z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/10 dark:border-gray-700/10 px-8 py-6 shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between">
        {/* Logo & Mode Indicator with Back Button */}
        <div className="flex items-center space-x-6">
          {/* Back Button */}
          {showBackButton && onBack && (
            <motion.button
              onClick={onBack}
              className="p-3 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all shadow-lg"
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </motion.button>
          )}

          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="w-14 h-14 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center shadow-xl"
              animate={{ 
                boxShadow: [
                  '0 0 0 0 rgba(14, 165, 233, 0.4)',
                  '0 0 0 10px rgba(14, 165, 233, 0)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Brain className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent font-heading">
                LioraAI
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Your AI Life Co-pilot</p>
            </div>
          </motion.div>
          
          <motion.div 
            className={`px-6 py-3 rounded-2xl bg-gradient-to-r ${modeInfo.bg} backdrop-blur-sm border border-white/30 dark:border-gray-700/30 shadow-lg`}
            whileHover={{ scale: 1.02 }}
            layout
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{modeInfo.icon}</span>
              <div>
                <span className="font-bold text-gray-800 dark:text-white">{modeInfo.name}</span>
                <div className="flex items-center space-x-2 mt-1">
                  <motion.div 
                    className={`w-2 h-2 rounded-full ${
                      isPlaying || isRecording ? 'bg-green-500' : 'bg-emerald-500'
                    }`}
                    animate={isPlaying || isRecording ? { scale: [1, 1.3, 1] } : { opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    {isPlaying ? 'Speaking' : isRecording ? 'Listening' : 'Online'}
                  </span>
                  {(isPlaying || isRecording) && (
                    <VoiceWaveform isActive={true} bars={3} />
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* API Usage Indicator */}
          {apiUsage && (
            <motion.div 
              className="px-4 py-2 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-xs text-gray-600 dark:text-gray-400">
                <span className="font-semibold">Voice API:</span>
                <span className="ml-1">
                  {Math.round((apiUsage.charactersUsed / apiUsage.charactersLimit) * 100)}%
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          {/* Voice/Video Controls */}
          <div className="hidden md:flex items-center space-x-3">
            <motion.button 
              className="p-3 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mic className={`w-5 h-5 ${isRecording ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'}`} />
            </motion.button>
            <motion.button 
              className="p-3 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Video className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </motion.button>
          </div>

          {/* Pro Upgrade */}
          {!user?.isPro && (
            <motion.button
              onClick={onOpenPro}
              className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-xl"
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 20px 40px -10px rgba(249, 115, 22, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Crown className="w-5 h-5" />
              <span className="font-semibold">Upgrade Pro</span>
              <Sparkles className="w-4 h-4" />
            </motion.button>
          )}

          {user?.isPro && (
            <motion.div 
              className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-500/30 text-orange-600 dark:text-orange-400 rounded-xl shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              <Crown className="w-5 h-5" />
              <span className="font-semibold">Pro Member</span>
            </motion.div>
          )}

          {/* Enhanced Theme Toggle */}
          <motion.button
            onClick={onToggleTheme}
            className="p-3 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDarkMode ? 180 : 0 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600" />
              )}
            </motion.div>
          </motion.button>

          {/* Fixed Settings Button */}
          <motion.button 
            onClick={() => {
              console.log('Settings button clicked');
              if (onOpenSettings) {
                onOpenSettings();
              }
            }}
            className="p-3 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;