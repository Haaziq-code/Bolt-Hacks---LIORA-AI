import React from 'react';
import { User, Bot, Clock, Volume2, Copy, Check, Pause, Play, Square } from 'lucide-react';
import { motion } from 'framer-motion';
import { ChatMessage as ChatMessageType } from '../../types';
import { useVoice } from '../../hooks/useVoice';
import toast from 'react-hot-toast';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { speak, isPlaying, stopSpeaking } = useVoice();
  const [copied, setCopied] = React.useState(false);
  const [isPlayingThis, setIsPlayingThis] = React.useState(false);

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'coach':
        return 'from-orange-500 to-red-500';
      case 'therapist':
        return 'from-green-500 to-emerald-500';
      case 'tutor':
        return 'from-indigo-500 to-purple-500';
      case 'friend':
        return 'from-pink-500 to-rose-500';
      default:
        return 'from-primary-500 to-accent-500';
    }
  };

  const handleSpeak = async () => {
    if (message.role === 'assistant') {
      try {
        setIsPlayingThis(true);
        // Get user gender preference from localStorage
        const userPreferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
        const gender = userPreferences?.gender || 'female';
        
        await speak(message.content, message.mode, message.language, gender);
      } catch (error) {
        console.error('Failed to play audio:', error);
        toast.error('Failed to play audio');
      } finally {
        setIsPlayingThis(false);
      }
    }
  };

  const handleStopSpeaking = () => {
    stopSpeaking();
    setIsPlayingThis(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      toast.success('Message copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy message');
    }
  };

  return (
    <motion.div 
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-8`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
        <div className={`flex items-start space-x-4 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
          {/* Enhanced Avatar */}
          <motion.div 
            className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl ${
              message.role === 'user' 
                ? 'bg-gradient-to-br from-primary-500 to-accent-500' 
                : `bg-gradient-to-br ${getModeColor(message.mode)}`
            }`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {message.role === 'user' ? (
              <User className="w-6 h-6 text-white" />
            ) : (
              <Bot className="w-6 h-6 text-white" />
            )}
          </motion.div>

          {/* Enhanced Message Content */}
          <div className={`flex-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <motion.div 
              className={`inline-block px-8 py-6 rounded-3xl shadow-xl backdrop-blur-sm border ${
                message.role === 'user'
                  ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white border-white/20'
                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white border-white/30 dark:border-gray-700/30'
              }`}
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{message.content}</p>
            </motion.div>
            
            {/* Enhanced Timestamp and Actions */}
            <div className={`flex items-center space-x-4 mt-3 text-xs text-gray-500 dark:text-gray-400 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}>
              <div className="flex items-center space-x-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full px-3 py-1 border border-white/30 dark:border-gray-700/30">
                <Clock className="w-3 h-3" />
                <span>{formatTime(message.timestamp)}</span>
              </div>
              
              {message.role === 'assistant' && (
                <>
                  {isPlayingThis ? (
                    <motion.button 
                      onClick={handleStopSpeaking}
                      className="p-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all border border-white/30 dark:border-gray-700/30 text-primary-500 animate-pulse"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Square className="w-3 h-3" />
                    </motion.button>
                  ) : (
                    <motion.button 
                      onClick={handleSpeak}
                      className="p-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all border border-white/30 dark:border-gray-700/30"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Volume2 className="w-3 h-3" />
                    </motion.button>
                  )}
                </>
              )}
              
              <motion.button 
                onClick={handleCopy}
                className="p-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all border border-white/30 dark:border-gray-700/30"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {copied ? (
                  <Check className="w-3 h-3 text-success-500" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;