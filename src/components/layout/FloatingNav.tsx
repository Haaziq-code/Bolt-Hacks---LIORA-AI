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
  Zap,
  Menu,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AIMode } from '../../types';

interface FloatingNavProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const FloatingNav: React.FC<FloatingNavProps> = ({ currentPage, onPageChange }) => {
  const { currentMode, setCurrentMode } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, color: 'from-blue-500 to-cyan-500' },
    { id: 'memory', label: 'Memory', icon: MessageSquare, color: 'from-purple-500 to-pink-500' },
    { id: 'coach', label: 'AI Coach', icon: Zap, mode: 'coach' as AIMode, color: 'from-orange-500 to-red-500' },
    { id: 'therapist', label: 'AI Therapist', icon: Heart, mode: 'therapist' as AIMode, color: 'from-green-500 to-emerald-500' },
    { id: 'tutor', label: 'AI Tutor', icon: GraduationCap, mode: 'tutor' as AIMode, color: 'from-indigo-500 to-purple-500' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'from-gray-500 to-slate-500' },
    { id: 'about', label: 'About', icon: Info, color: 'from-teal-500 to-cyan-500' },
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
      {/* Mobile Menu Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed top-6 left-6 z-50 lg:hidden p-4 bg-white/20 dark:bg-slate-900/20 backdrop-blur-xl border border-white/30 dark:border-slate-700/30 rounded-2xl shadow-2xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isExpanded ? (
            <X className="w-6 h-6 text-slate-800 dark:text-white" />
          ) : (
            <Menu className="w-6 h-6 text-slate-800 dark:text-white" />
          )}
        </motion.div>
      </motion.button>

      {/* Desktop Floating Navigation */}
      <motion.nav 
        className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-3xl p-4 shadow-2xl">
          <div className="flex flex-col space-y-4">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`relative group p-4 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-white/20 dark:hover:bg-slate-800/20'
                  }`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Icon className="w-6 h-6" />
                  
                  {/* Tooltip */}
                  <motion.div
                    className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                  >
                    {item.label}
                    <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-slate-900 dark:border-r-white"></div>
                  </motion.div>

                  {/* Active Indicator */}
                  {item.mode && currentMode === item.mode && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.nav>

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
              className="absolute top-24 left-6 right-6 bg-white/20 dark:bg-slate-900/20 backdrop-blur-xl border border-white/30 dark:border-slate-700/30 rounded-3xl p-6 shadow-2xl"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
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
                      className={`p-4 rounded-2xl transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-white/20 dark:hover:bg-slate-800/20'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2" />
                      <span className="text-sm font-medium">{item.label}</span>
                      
                      {item.mode && currentMode === item.mode && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
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

export default FloatingNav;