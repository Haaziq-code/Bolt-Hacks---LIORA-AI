import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { AppProvider } from './context/AppContext';
import FloatingActionBar from './components/layout/FloatingActionBar';
import Header from './components/layout/Header';
import ChatInterface from './components/chat/ChatInterface';
import Dashboard from './components/dashboard/Dashboard';
import Memory from './components/pages/Memory';
import Settings from './components/pages/Settings';
import About from './components/pages/About';
import LandingPage from './components/pages/LandingPage';
import ProModal from './components/modals/ProModal';
import TavusWidget from './components/ui/TavusWidget';
import ParticleSystem from './components/ui/ParticleSystem';
import BrainBackground from './components/ui/BrainBackground';
import Enhanced3DBackground from './components/ui/Enhanced3DBackground';
import { checkSubscriptionStatus } from './services/revenuecat';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAIActive, setIsAIActive] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // Check subscription status
    checkSubscriptionStatus().then(isSubscribed => {
      if (isSubscribed) {
        console.log('User has active subscription');
      }
    });

    // Listen for subscription updates
    const handleSubscriptionUpdate = () => {
      window.location.reload();
    };

    window.addEventListener('subscription-updated', handleSubscriptionUpdate);
    return () => window.removeEventListener('subscription-updated', handleSubscriptionUpdate);
  }, []);

  // Listen for AI activity (voice input, speaking, etc.)
  useEffect(() => {
    const handleAIActivity = (event: CustomEvent) => {
      setIsAIActive(event.detail.active);
    };

    window.addEventListener('ai-activity', handleAIActivity as EventListener);
    return () => window.removeEventListener('ai-activity', handleAIActivity as EventListener);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
    setCurrentPage('settings');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setIsSettingsOpen(false);
  };

  const renderMainContent = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onEnterApp={() => setCurrentPage('home')} />;
      case 'home':
        return (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 h-full p-8">
            <div className="xl:col-span-3">
              <ChatInterface onBack={() => setCurrentPage('landing')} />
            </div>
            <div className="xl:col-span-1 hidden xl:block">
              <Dashboard />
            </div>
          </div>
        );
      case 'memory':
        return <Memory />;
      case 'coach':
      case 'therapist':
      case 'tutor':
        return (
          <div className="p-8">
            <ChatInterface onBack={handleBackToHome} />
          </div>
        );
      case 'settings':
        return <Settings />;
      case 'about':
        return <About />;
      default:
        return (
          <div className="p-8">
            <ChatInterface onBack={handleBackToHome} />
          </div>
        );
    }
  };

  // Show landing page without nav/header
  if (currentPage === 'landing') {
    return (
      <AppProvider>
        <div className="min-h-screen relative overflow-hidden">
          {/* Enhanced 3D Background */}
          <Enhanced3DBackground isActive={isAIActive} intensity={0.8} />
          
          {/* Original Background Elements (reduced opacity to complement 3D background) */}
          <div className="fixed inset-0 bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 opacity-20">
            <ParticleSystem />
          </div>
          
          <LandingPage onEnterApp={() => setCurrentPage('home')} />
          
          {/* Luxurious Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="fixed top-8 right-8 z-50 p-4 glass-morphism dark:glass-morphism-dark rounded-2xl shadow-luxury hover:shadow-luxury-lg transition-all duration-500 group"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div 
              className="w-6 h-6 text-gray-800 dark:text-white transition-all duration-500"
              animate={{ rotate: isDarkMode ? 180 : 0 }}
            >
              {isDarkMode ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-yellow-400 animate-glow-pulse"
                >
                  ☀️
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-indigo-600 animate-glow-pulse"
                >
                  🌙
                </motion.div>
              )}
            </motion.div>
          </motion.button>

          {/* Luxurious Built on Bolt Badge */}
          <div className="fixed bottom-8 right-8 z-40">
            <motion.div 
              className="glass-morphism dark:glass-morphism-dark rounded-2xl px-8 py-4 shadow-luxury-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              animate={{ 
                boxShadow: [
                  '0 0 0 0 rgba(14, 165, 233, 0.2)',
                  '0 0 0 10px rgba(14, 165, 233, 0)',
                ]
              }}
              transition={{ 
                boxShadow: { duration: 2, repeat: Infinity },
                hover: { duration: 0.3 }
              }}
            >
              <div className="flex items-center space-x-4 text-lg text-gray-800 dark:text-white">
                <motion.span 
                  className="text-2xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⚡
                </motion.span>
                <span className="font-medium">Built on</span>
                <span className="font-black bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent text-xl">
                  Bolt
                </span>
                <motion.span 
                  className="text-2xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ✨
                </motion.span>
              </div>
            </motion.div>
          </div>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: isDarkMode ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                color: isDarkMode ? '#ffffff' : '#000000',
                border: `1px solid ${isDarkMode ? 'rgba(55, 65, 81, 0.3)' : 'rgba(229, 231, 235, 0.3)'}`,
                borderRadius: '16px',
                backdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              },
            }}
          />
        </div>
      </AppProvider>
    );
  }

  return (
    <AppProvider>
      <div className="min-h-screen relative overflow-hidden">
        {/* Enhanced 3D Background */}
        <Enhanced3DBackground isActive={isAIActive} intensity={1.0} />
        
        {/* Original Background Elements (reduced opacity to complement 3D background) */}
        <div className="fixed inset-0 bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 opacity-15">
          <ParticleSystem />
          
          {/* Luxurious gradient orbs (reduced opacity) */}
          <motion.div 
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-primary-400/5 to-accent-400/5 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div 
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-accent-400/5 to-primary-400/5 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{ duration: 25, repeat: Infinity }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/3 to-purple-400/3 rounded-full blur-3xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Floating Action Bar */}
        <FloatingActionBar 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
        />

        {/* Luxurious Header */}
        <Header 
          onToggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          onOpenPro={() => setIsProModalOpen(true)}
          onOpenSettings={handleOpenSettings}
          onBack={currentPage !== 'home' && currentPage !== 'landing' ? handleBackToHome : undefined}
          showBackButton={currentPage !== 'home' && currentPage !== 'landing'}
        />

        {/* Main Content with Cinematic Transitions */}
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ 
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              {renderMainContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Enhanced Tavus Video Widget */}
        <TavusWidget />

        {/* Luxurious Pro Modal */}
        <ProModal 
          isOpen={isProModalOpen}
          onClose={() => setIsProModalOpen(false)}
        />

        {/* Luxurious Built on Bolt Badge */}
        <div className="fixed bottom-6 right-6 z-30">
          <motion.div 
            className="glass-morphism dark:glass-morphism-dark rounded-xl px-6 py-3 shadow-luxury"
            whileHover={{ scale: 1.05, y: -2 }}
            animate={{ 
              boxShadow: [
                '0 0 0 0 rgba(14, 165, 233, 0.2)',
                '0 0 0 8px rgba(14, 165, 233, 0)',
              ]
            }}
            transition={{ 
              boxShadow: { duration: 2, repeat: Infinity },
              hover: { duration: 0.3 }
            }}
          >
            <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
              <motion.span 
                className="text-lg"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⚡
              </motion.span>
              <span className="font-medium">Built on</span>
              <span className="font-black bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                Bolt
              </span>
              <motion.span 
                className="text-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ✨
              </motion.span>
            </div>
          </motion.div>
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: isDarkMode ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)',
              color: isDarkMode ? '#ffffff' : '#000000',
              border: `1px solid ${isDarkMode ? 'rgba(55, 65, 81, 0.3)' : 'rgba(229, 231, 235, 0.3)'}`,
              borderRadius: '16px',
              backdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            },
          }}
        />
      </div>
    </AppProvider>
  );
}

export default App;