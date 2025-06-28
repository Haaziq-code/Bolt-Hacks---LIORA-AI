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
import AIFriendDesigner from './components/pages/AIFriendDesigner';
import AIFriendManager from './components/pages/AIFriendManager';
import AIFriendChat from './components/chat/AIFriendChat';
import ProModal from './components/modals/ProModal';
import TavusWidget from './components/ui/TavusWidget';
import Enhanced3DBackground from './components/ui/Enhanced3DBackground';
import { checkSubscriptionStatus } from './services/revenuecat';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isDarkMode, setIsDarkMode] = useState(true); // Always start in dark mode for black background
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAIActive, setIsAIActive] = useState(false);

  useEffect(() => {
    // Force dark mode for black background design
    setIsDarkMode(true);
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');

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
    // Keep dark mode for black background design
    setIsDarkMode(true);
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
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
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 h-full p-8 pt-32">
            <div className="xl:col-span-3">
              <ChatInterface onBack={() => setCurrentPage('landing')} />
            </div>
            <div className="xl:col-span-1 hidden xl:block">
              <Dashboard />
            </div>
          </div>
        );
      case 'memory':
        return (
          <div className="pt-32 px-8">
            <Memory />
          </div>
        );
      case 'therapist':
      case 'tutor':
      case 'friend':
        return (
          <div className="p-8 pt-32">
            <ChatInterface onBack={handleBackToHome} />
          </div>
        );
      case 'ai-friend-designer':
        return (
          <div className="pt-32 px-8">
            <AIFriendDesigner />
          </div>
        );
      case 'ai-friend-manager':
        return (
          <div className="pt-32 px-8">
            <AIFriendManager />
          </div>
        );
      case 'ai-friend-chat':
        return (
          <div className="pt-32 px-8">
            <AIFriendChat />
          </div>
        );
      case 'settings':
        return (
          <div className="pt-32 px-8">
            <Settings />
          </div>
        );
      case 'about':
        return (
          <div className="pt-32 px-8">
            <About />
          </div>
        );
      default:
        return (
          <div className="p-8 pt-32">
            <ChatInterface onBack={handleBackToHome} />
          </div>
        );
    }
  };

  // Show landing page without nav/header
  if (currentPage === 'landing') {
    return (
      <AppProvider>
        <div className="min-h-screen relative overflow-hidden bg-black">
          {/* Enhanced 3D Neural Background */}
          <Enhanced3DBackground isActive={isAIActive} intensity={0.8} />
          
          <LandingPage onEnterApp={() => setCurrentPage('home')} />
          
          {/* Futuristic Theme Toggle - Hidden for black background design */}
          <motion.button
            onClick={toggleTheme}
            className="fixed top-8 right-8 z-50 p-4 glass-morphism dark:glass-morphism-dark rounded-2xl neural-glow hover:neural-glow-lg transition-all duration-500 group opacity-0 pointer-events-none"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div 
              className="w-6 h-6 text-gray-800 dark:text-white transition-all duration-500"
              animate={{ rotate: isDarkMode ? 180 : 0 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-neon-400 animate-neon-glow"
              >
                🌙
              </motion.div>
            </motion.div>
          </motion.button>

          {/* Enhanced Built on Bolt Badge */}
          <div className="fixed bottom-8 right-8 z-40">
            <motion.div 
              className="glass-morphism dark:glass-morphism-dark rounded-2xl px-8 py-4 neural-glow"
              whileHover={{ scale: 1.05, y: -2 }}
              animate={{ 
                boxShadow: [
                  '0 0 0 0 rgba(93, 106, 255, 0.2)',
                  '0 0 0 10px rgba(93, 106, 255, 0)',
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
                <span className="font-black text-neural text-xl">
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
                background: 'rgba(26, 27, 75, 0.9)',
                color: '#ffffff',
                border: '1px solid rgba(93, 106, 255, 0.3)',
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
      <div className="min-h-screen relative overflow-hidden bg-black">
        {/* Enhanced 3D Neural Background */}
        <Enhanced3DBackground isActive={isAIActive} intensity={1.0} />
        
        {/* Neural gradient overlay */}
        <div className="fixed inset-0 bg-gradient-to-br from-midnight-950/85 via-midnight-900/75 to-violet-950/85 dark:from-midnight-950/90 dark:via-midnight-900/85 dark:to-violet-950/90 opacity-40">
          {/* Neural network pattern overlay */}
          <div className="absolute inset-0 opacity-20">
            {/* Floating neural nodes */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-neon-400/60 rounded-full"
                style={{
                  left: `${15 + i * 8}%`,
                  top: `${15 + (i % 3) * 30}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating Action Bar */}
        <FloatingActionBar 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
        />

        {/* Enhanced Header */}
        <Header 
          onToggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          onOpenPro={() => setIsProModalOpen(true)}
          onOpenSettings={handleOpenSettings}
          onBack={currentPage !== 'home' && currentPage !== 'landing' ? handleBackToHome : undefined}
          showBackButton={currentPage !== 'home' && currentPage !== 'landing'}
        />

        {/* Main Content with Neural Transitions */}
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

        {/* Enhanced Pro Modal */}
        <ProModal 
          isOpen={isProModalOpen}
          onClose={() => setIsProModalOpen(false)}
        />

        {/* Enhanced Built on Bolt Badge */}
        <div className="fixed bottom-6 right-6 z-30">
          <motion.div 
            className="glass-morphism dark:glass-morphism-dark rounded-xl px-6 py-3 neural-glow"
            whileHover={{ scale: 1.05, y: -2 }}
            animate={{ 
              boxShadow: [
                '0 0 0 0 rgba(93, 106, 255, 0.2)',
                '0 0 0 8px rgba(93, 106, 255, 0)',
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
              <span className="font-black text-neural">
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
              background: 'rgba(26, 27, 75, 0.9)',
              color: '#ffffff',
              border: '1px solid rgba(93, 106, 255, 0.3)',
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