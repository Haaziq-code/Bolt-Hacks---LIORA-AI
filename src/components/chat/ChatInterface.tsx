import React, { useEffect, useRef } from 'react';
import { Send, Mic, Square, Volume2, VolumeX, Trash2, Sparkles, ArrowLeft, Globe, Brain, Shield, BookOpen, Users, Heart, GraduationCap, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { useChat } from '../../hooks/useChat';
import { useVoice } from '../../hooks/useVoice';
import { supportedLanguages } from '../../services/gemini';
import ChatMessageComponent from './ChatMessage';
import VideoAgent from './VideoAgent';
import VoiceWaveform from '../ui/VoiceWaveform';
import LoadingSpinner from '../ui/LoadingSpinner';
import toast from 'react-hot-toast';

interface ChatInterfaceProps {
  onBack?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onBack }) => {
  const { user, currentMode } = useApp();
  const { messages, isLoading, sendMessage, clearChat, initializeChat, currentLanguage, setLanguage } = useChat(currentMode);
  const { isPlaying, isRecording, startRecording, stopRecording, stopSpeaking, setLanguage: setVoiceLanguage } = useVoice();
  const [inputValue, setInputValue] = React.useState('');
  const [displayedMessages, setDisplayedMessages] = React.useState(messages);
  const [showLanguageSelector, setShowLanguageSelector] = React.useState(false);
  const [showModeInfo, setShowModeInfo] = React.useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayedMessages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (messages.length === 0) {
      initializeChat();
    }
  }, [currentMode, initializeChat, messages.length]);

  // Enhanced message display logic
  useEffect(() => {
    if (messages.length <= 2) {
      setDisplayedMessages(messages);
    } else {
      const latestMessages = messages.slice(-2);
      setTimeout(() => {
        setDisplayedMessages(latestMessages);
      }, 200);
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const message = inputValue.trim();
    setInputValue('');
    
    try {
      await sendMessage(message);
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const toggleSpeech = () => {
    if (isPlaying) {
      stopSpeaking();
      toast.success('Speech stopped');
    } else {
      toast('Send a message to hear LIORA respond');
    }
  };

  const handleClearChat = () => {
    if (messages.length > 0) {
      clearChat();
      toast.success('Chat cleared');
      setTimeout(() => initializeChat(), 100);
    }
  };

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    setVoiceLanguage(langCode);
    setShowLanguageSelector(false);
    toast.success(`Language changed to ${supportedLanguages[langCode as keyof typeof supportedLanguages].name}`);
  };

  const getModeInfo = () => {
    switch (currentMode) {
      case 'therapist':
        return {
          title: 'AI Therapist',
          description: 'Emotionally aware support with crisis detection and CBT techniques',
          icon: Heart,
          color: 'from-green-500 to-emerald-500',
          features: ['Emotion Detection', 'Crisis Alerts', 'CBT Techniques', 'Learning Mode']
        };
      case 'tutor':
        return {
          title: 'AI Tutor',
          description: '100% accurate learning with verified sources and interactive teaching',
          icon: GraduationCap,
          color: 'from-indigo-500 to-purple-500',
          features: ['100% Accuracy', 'Interactive Quizzes', 'Study Plans', 'Progress Tracking']
        };
      case 'friend':
        return {
          title: 'AI Friend',
          description: 'Customizable companion that builds real relationships over time',
          icon: Users,
          color: 'from-pink-500 to-rose-500',
          features: ['Customizable Age', 'Relationship Building', 'Proactive Check-ins', 'Mood Boosters']
        };
      case 'coach':
        return {
          title: 'AI Coach',
          description: 'Motivational support for achieving your goals and personal growth',
          icon: Sparkles,
          color: 'from-orange-500 to-red-500',
          features: ['Goal Setting', 'Motivation', 'Accountability', 'Action Plans']
        };
      default:
        return {
          title: 'LIORA AI',
          description: 'Advanced AI assistant combining all three personalities',
          icon: Brain,
          color: 'from-primary-500 to-accent-500',
          features: ['Multi-Modal', 'Adaptive', 'Intelligent', 'Comprehensive']
        };
    }
  };

  const modeInfo = getModeInfo();

  return (
    <div className="h-full flex flex-col bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl overflow-hidden">
      {/* Enhanced Header */}
      <motion.div 
        className="flex items-center justify-between p-6 border-b border-white/20 dark:border-gray-700/20 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm relative z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.button
          onClick={onBack}
          className="flex items-center space-x-3 px-6 py-3 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-white/40 dark:border-gray-600/40 rounded-2xl hover:bg-white/90 dark:hover:bg-gray-700/90 transition-all shadow-lg group"
          whileHover={{ scale: 1.05, x: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
          <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            Back to Home
          </span>
        </motion.button>

        <div className="flex items-center space-x-4">
          {/* Enhanced Mode Indicator */}
          <motion.div 
            className={`px-6 py-3 bg-gradient-to-r ${modeInfo.color} backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-lg cursor-pointer`}
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowModeInfo(!showModeInfo)}
          >
            <div className="flex items-center space-x-3">
              <modeInfo.icon className="w-6 h-6 text-white" />
              <div>
                <span className="font-bold text-white text-lg">{modeInfo.title}</span>
                <div className="flex items-center space-x-2 mt-1">
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-white"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-white/80 text-sm">Active</span>
                  {user?.preferences?.learningMode && (
                    <>
                      <Brain className="w-4 h-4 text-white/80" />
                      <span className="text-white/80 text-sm">Learning</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Language Selector */}
          <div className="relative z-[100]">
            <motion.button
              onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="flex items-center space-x-3 px-4 py-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-white/40 dark:border-gray-600/40 rounded-2xl hover:bg-white/90 dark:hover:bg-gray-700/90 transition-all shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {supportedLanguages[currentLanguage as keyof typeof supportedLanguages]?.flag} {supportedLanguages[currentLanguage as keyof typeof supportedLanguages]?.name || 'English'}
              </span>
            </motion.button>

            <AnimatePresence>
              {showLanguageSelector && (
                <motion.div
                  className="absolute top-full right-0 mt-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-2xl p-2 min-w-48 z-[200] max-h-64 overflow-y-auto"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {Object.entries(supportedLanguages).map(([code, lang]) => (
                    <motion.button
                      key={code}
                      onClick={() => handleLanguageChange(code)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center space-x-3 ${
                        currentLanguage === code
                          ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                          : 'hover:bg-white/60 dark:hover:bg-gray-700/60 text-gray-700 dark:text-gray-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Mode Info Popup */}
      <AnimatePresence>
        {showModeInfo && (
          <motion.div
            className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-2xl p-6 max-w-md"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${modeInfo.color} rounded-xl flex items-center justify-center`}>
                <modeInfo.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{modeInfo.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{modeInfo.description}</p>
              </div>
            </div>
            <div className="space-y-2">
              {modeInfo.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${modeInfo.color}`} />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowModeInfo(false)}
              className="absolute top-2 right-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Agent */}
      <motion.div 
        className="flex-shrink-0 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <VideoAgent mode={currentMode} isActive={displayedMessages.length > 1 || isLoading} />
      </motion.div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 relative z-10">
        <AnimatePresence mode="wait">
          {displayedMessages.length === 0 ? (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
            >
              <motion.div 
                className={`w-24 h-24 bg-gradient-to-br ${modeInfo.color} rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl`}
                animate={{ 
                  boxShadow: [
                    '0 0 0 0 rgba(14, 165, 233, 0.4)',
                    '0 0 0 30px rgba(14, 165, 233, 0)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <modeInfo.icon className="w-12 h-12 text-white" />
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Initializing {modeInfo.title}...
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto text-lg leading-relaxed mb-6">
                {modeInfo.description}
              </p>
              {user?.preferences?.learningMode && (
                <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
                  <Brain className="w-5 h-5" />
                  <span className="font-semibold">Learning Mode Active</span>
                </div>
              )}
            </motion.div>
          ) : (
            <AnimatePresence>
              {displayedMessages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -40, scale: 0.95 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <ChatMessageComponent message={message} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div 
            className="flex items-center space-x-4 text-gray-500 dark:text-gray-400 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <LoadingSpinner size="sm" />
            <span className="text-sm font-medium">LIORA is thinking...</span>
            <VoiceWaveform isActive={true} bars={4} />
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input Area */}
      <motion.div 
        className="flex-shrink-0 p-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-white/30 dark:border-gray-700/30 relative z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.4 }}
      >
        <div className="flex items-center space-x-4 max-w-4xl mx-auto">
          {/* Clear Chat Button */}
          {messages.length > 1 && (
            <motion.button
              onClick={handleClearChat}
              className="p-4 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/40 dark:border-gray-700/40 text-gray-600 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Trash2 className="w-5 h-5" />
            </motion.button>
          )}

          {/* Voice Control */}
          <motion.button
            onClick={toggleRecording}
            className={`p-4 rounded-2xl transition-all shadow-lg ${
              isRecording
                ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-red-500/25'
                : 'bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/40 dark:border-gray-700/40 text-gray-600 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-gray-800/80'
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            animate={isRecording ? { 
              boxShadow: [
                '0 0 0 0 rgba(239, 68, 68, 0.4)',
                '0 0 0 15px rgba(239, 68, 68, 0)',
              ]
            } : {}}
            transition={{ duration: 1.5, repeat: isRecording ? Infinity : 0 }}
          >
            {isRecording ? (
              <Square className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </motion.button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Ask LIORA ${currentMode === 'general' ? '' : currentMode} anything...`}
              className="w-full px-8 py-5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/40 dark:border-gray-700/40 text-gray-900 dark:text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 placeholder-gray-500 dark:placeholder-gray-400 text-lg transition-all shadow-lg"
              disabled={isLoading}
            />
            {isRecording && (
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                <VoiceWaveform isActive={true} />
              </div>
            )}
          </div>

          {/* Send Button */}
          <motion.button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="p-5 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl hover:from-primary-600 hover:to-accent-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? (
              <LoadingSpinner size="sm" color="text-white" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </motion.button>

          {/* Speech Toggle */}
          <motion.button
            onClick={toggleSpeech}
            className={`p-4 rounded-2xl transition-all shadow-lg ${
              isPlaying
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-green-500/25'
                : 'bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/40 dark:border-gray-700/40 text-gray-600 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-gray-800/80'
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <Square className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatInterface;