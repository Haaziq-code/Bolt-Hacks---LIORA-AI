import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Brain, 
  Heart, 
  GraduationCap, 
  MessageSquare, 
  Settings, 
  Info,
  Users,
  Menu,
  X,
  Sparkles,
  Crown,
  Shield,
  BookOpen,
  UserPlus,
  Palette
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AIMode } from '../../types';

interface FloatingActionBarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const FloatingActionBar: React.FC<FloatingActionBarProps> = ({ currentPage, onPageChange }) => {
  const { currentMode, setCurrentMode, user } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: Home, 
      color: 'from-neon-500 to-cyan-500',
      description: 'Main dashboard'
    },
    { 
      id: 'memory', 
      label: 'Memory', 
      icon: MessageSquare, 
      color: 'from-violet-500 to-pink-500',
      description: 'Chat history & learning'
    },
    { 
      id: 'therapist', 
      label: 'AI Therapist', 
      icon: Heart, 
      mode: 'therapist' as AIMode, 
      color: 'from-green-500 to-emerald-500',
      description: 'Emotional support & wellness'
    },
    { 
      id: 'tutor', 
      label: 'AI Tutor', 
      icon: GraduationCap, 
      mode: 'tutor' as AIMode, 
      color: 'from-violet-500 to-purple-500',
      description: '100% accurate learning'
    },
    { 
      id: 'friend', 
      label: 'AI Friend', 
      icon: Users, 
      mode: 'friend' as AIMode, 
      color: 'from-pink-500 to-rose-500',
      description: 'Customizable companion'
    },
    { 
      id: 'ai-friend-designer', 
      label: 'Friend Designer', 
      icon: Palette, 
      color: 'from-purple-500 to-indigo-500',
      description: 'Create AI friends'
    },
    { 
      id: 'ai-friend-manager', 
      label: 'Friend Manager', 
      icon: UserPlus, 
      color: 'from-blue-500 to-cyan-500',
      description: 'Manage AI friends'
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings, 
      color: 'from-gray-500 to-slate-500',
      description: 'Preferences & learning mode'
    },
    { 
      id: 'about', 
      label: 'About', 
      icon: Info, 
      color: 'from-neon-500 to-cyan-500',
      description: 'Learn about LIORA'
    },
  ];

  const handleItemClick = (item: typeof menuItems[0]) => {
    onPageChange(item.id);
    if (item.mode) {
      setCurrentMode(item.mode);
    }
    setIsExpanded(false);
  };

  return (
    <>
      {/* Desktop Floating Action Bar */}
      <motion.nav 
        className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="glass-morphism dark:glass-morphism-dark rounded-3xl p-4 neural-glow-lg">
          <div className="flex flex-col space-y-4">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <motion.div
                  key={item.id}
                  className="relative group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <motion.button
                    onClick={() => handleItemClick(item)}
                    className={`relative p-4 rounded-2xl transition-all duration-500 ${
                      isActive
                        ? `bg-gradient-to-r ${item.color} text-white neural-glow-lg`
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:neural-glow'
                    }`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-6 h-6" />
                    
                    {/* Enhanced Tooltip */}
                    <motion.div
                      className="absolute left-full ml-6 top-1/2 transform -translate-y-1/2 glass-morphism dark:glass-morphism-dark text-slate-900 dark:text-white px-4 py-3 rounded-2xl text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 neural-glow z-50"
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                    >
                      <div className="font-bold">{item.label}</div>
                      <div className="text-xs opacity-75">{item.description}</div>
                      <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-white/20 dark:border-r-gray-800/20"></div>
                    </motion.div>

                    {/* Active Mode Indicator */}
                    {item.mode && currentMode === item.mode && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-neon-400 to-cyan-400 rounded-full shadow-neon"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles className="w-3 h-3 text-white m-0.5" />
                      </motion.div>
                    )}

                    {/* Learning Mode Indicator */}
                    {user?.preferences?.learningMode && isActive && (
                      <motion.div
                        className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full shadow-neon"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Brain className="w-3 h-3 text-white m-0.5" />
                      </motion.div>
                    )}

                    {/* Pro Badge */}
                    {user?.isPro && isActive && (
                      <motion.div
                        className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-neon"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <Crown className="w-3 h-3 text-white m-0.5" />
                      </motion.div>
                    )}
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed bottom-8 left-8 z-50 lg:hidden p-4 glass-morphism dark:glass-morphism-dark rounded-2xl neural-glow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isExpanded ? { rotate: 180 } : { rotate: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isExpanded ? (
          <X className="w-6 h-6 text-slate-800 dark:text-white" />
        ) : (
          <Menu className="w-6 h-6 text-slate-800 dark:text-white" />
        )}
      </motion.button>

      {/* Mobile Expanded Menu */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsExpanded(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Menu */}
            <motion.div
              className="absolute bottom-24 left-8 right-8 glass-morphism dark:glass-morphism-dark rounded-3xl p-6 neural-glow-xl"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-4">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className={`relative p-6 rounded-2xl transition-all duration-500 ${
                        isActive
                          ? `bg-gradient-to-r ${item.color} text-white neural-glow-lg`
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:neural-glow'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Icon className="w-8 h-8 mx-auto mb-3" />
                      <div className="text-sm font-bold">{item.label}</div>
                      <div className="text-xs opacity-75 mt-1">{item.description}</div>
                      
                      {item.mode && currentMode === item.mode && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-neon-400 to-cyan-400 rounded-full shadow-neon"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Sparkles className="w-3 h-3 text-white m-0.5" />
                        </motion.div>
                      )}

                      {user?.preferences?.learningMode && isActive && (
                        <motion.div
                          className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full shadow-neon"
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <Brain className="w-3 h-3 text-white m-0.5" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingActionBar;