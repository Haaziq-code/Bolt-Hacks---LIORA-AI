import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Heart, 
  GraduationCap, 
  Users,
  Sparkles, 
  ArrowRight,
  Play,
  Github,
  Twitter,
  Mail,
  Star,
  Globe,
  Volume2,
  Database,
  Rocket,
  Award,
  ChevronDown,
  Crown,
  Cpu,
  Layers,
  Palette,
  Shield,
  Zap,
  MessageCircle,
  Mic,
  Video,
  BookOpen,
  Target,
  Lightbulb,
  Smile
} from 'lucide-react';
import { TextScramble } from '../../utils/TextScramble';
import Enhanced3DBackground from '../ui/Enhanced3DBackground';

interface LandingPageProps {
  onEnterApp: () => void;
}

// Enhanced Scrambled text component with perfect timing
const ScrambledText: React.FC<{ phrases: string[] }> = ({ phrases }) => {
  const elementRef = useRef<HTMLHeadingElement>(null);
  const scramblerRef = useRef<TextScramble | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState(phrases[0] || 'LIORA AI');
  const [isScrambling, setIsScrambling] = useState(false);

  useEffect(() => {
    if (!elementRef.current || phrases.length === 0) return;

    // Initialize the scrambler
    scramblerRef.current = new TextScramble(elementRef.current);
    
    let timeoutId: NodeJS.Timeout;
    let currentIdx = 0;

    const cyclePhrases = async () => {
      if (!scramblerRef.current) return;
      
      setIsScrambling(true);
      const nextPhrase = phrases[currentIdx];
      
      try {
        // Wait for scrambling to complete
        await scramblerRef.current.setText(nextPhrase);
        
        // Update state after scrambling is done
        setCurrentText(nextPhrase);
        setCurrentIndex(currentIdx);
        setIsScrambling(false);
        
        // Move to next phrase
        currentIdx = (currentIdx + 1) % phrases.length;
        
        // Schedule next cycle - 2.5 seconds total (0.8s scramble + 1.7s display)
        timeoutId = setTimeout(cyclePhrases, 2500);
        
      } catch (error) {
        console.error('Scrambling error:', error);
        setIsScrambling(false);
        timeoutId = setTimeout(cyclePhrases, 2500);
      }
    };

    // Start the cycle
    cyclePhrases();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (scramblerRef.current) {
        // Clean up any ongoing animation
        scramblerRef.current = null;
      }
    };
  }, [phrases]);

  return (
    <motion.h1 
      ref={elementRef}
      className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-wider min-h-[120px] flex items-center justify-center"
      style={{ 
        fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
        fontWeight: 800,
        textShadow: '0 0 30px rgba(93, 106, 255, 0.5), 0 0 60px rgba(93, 106, 255, 0.3)'
      }}
      initial={{ scale: 0.9 }}
      animate={{ 
        scale: 1,
        textShadow: isScrambling ? [
          '0 0 30px rgba(93, 106, 255, 0.5), 0 0 60px rgba(93, 106, 255, 0.3)',
          '0 0 40px rgba(168, 85, 247, 0.6), 0 0 80px rgba(168, 85, 247, 0.4)',
          '0 0 30px rgba(93, 106, 255, 0.5), 0 0 60px rgba(93, 106, 255, 0.3)'
        ] : '0 0 30px rgba(93, 106, 255, 0.5), 0 0 60px rgba(93, 106, 255, 0.3)'
      }}
      transition={{ 
        duration: 2, 
        ease: "easeOut",
        textShadow: { duration: 0.5, repeat: isScrambling ? Infinity : 0 }
      }}
    >
      {currentText}
    </motion.h1>
  );
};

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isAIActive, setIsAIActive] = useState(false);

  // All scramble phrases that will cycle continuously with perfect timing
  const scramblePhases = [
    'LIORA AI',
    'YOUR THERAPIST',
    'YOUR TUTOR', 
    'YOUR FRIEND',
    'AI COMPANION',
    'LIFE CO-PILOT'
  ];

  const demoMessages = [
    { 
      role: 'user', 
      text: 'I\'ve been feeling really overwhelmed with work stress lately',
      mode: 'therapist'
    },
    { 
      role: 'ai', 
      text: 'I can really hear the weight in your words, and I want you to know that feeling overwhelmed is completely valid. Work stress can feel all-consuming sometimes. Can you tell me what specific aspects of work are contributing most to these feelings? I\'m here to help you work through this together. 💙',
      mode: 'therapist'
    },
    { 
      role: 'user', 
      text: 'Can you help me understand quantum physics?',
      mode: 'tutor'
    },
    { 
      role: 'ai', 
      text: 'Absolutely! Quantum physics is fascinating! 🔬 Think of it like this: imagine if you could be in multiple places at once until someone looked for you - that\'s quantum superposition! Let me break this down with clear examples and we\'ll build your understanding step by step. What specific aspect interests you most?',
      mode: 'tutor'
    },
    { 
      role: 'user', 
      text: 'I just got accepted to my dream college!',
      mode: 'friend'
    },
    { 
      role: 'ai', 
      text: 'OMG YES!!! 🎉✨ I am SO incredibly proud of you! This is HUGE! I knew you had it in you - you\'ve been working so hard for this! Tell me everything! How are you feeling? We absolutely need to celebrate this amazing achievement! 🎊',
      mode: 'friend'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDemo((prev) => (prev + 1) % (demoMessages.length / 2));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const typeMessage = async () => {
      setIsTyping(true);
      setTypedText('');
      const message = demoMessages[currentDemo * 2 + 1].text;
      
      for (let i = 0; i <= message.length; i++) {
        setTypedText(message.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, 30));
      }
      setIsTyping(false);
    };

    const timer = setTimeout(typeMessage, 2000);
    return () => clearTimeout(timer);
  }, [currentDemo]);

  // Listen for AI activity
  useEffect(() => {
    const handleAIActivity = (event: CustomEvent) => {
      setIsAIActive(event.detail.active);
    };

    window.addEventListener('ai-activity', handleAIActivity as EventListener);
    return () => window.removeEventListener('ai-activity', handleAIActivity as EventListener);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Enhanced color schemes for personality modes
  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'therapist':
        return 'from-emerald-500 to-green-500';
      case 'tutor':
        return 'from-violet-500 to-purple-500';
      case 'friend':
        return 'from-rose-500 to-pink-500';
      default:
        return 'from-blue-500 to-cyan-500';
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'therapist':
        return Heart;
      case 'tutor':
        return GraduationCap;
      case 'friend':
        return Users;
      default:
        return Brain;
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Enhanced 3D Neural Background */}
      <Enhanced3DBackground isActive={isAIActive} intensity={0.8} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="mb-12"
          >
            {/* Enhanced Neural Logo */}
            <motion.div 
              className="inline-flex items-center justify-center w-36 h-36 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-[2.5rem] mb-12 shadow-2xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{
                boxShadow: '0 0 60px rgba(59, 130, 246, 0.4), 0 0 120px rgba(99, 102, 241, 0.2)'
              }}
            >
              <Brain className="w-20 h-20 text-white" />
            </motion.div>

            {/* Enhanced Scrambled Main Title with perfect timing */}
            <ScrambledText phrases={scramblePhases} />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" }}>
                The World's Most Advanced AI
              </h2>
              <p className="text-2xl md:text-4xl text-gray-300 max-w-6xl mx-auto leading-relaxed mb-8" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                Three intelligent personalities in one: <span className="text-emerald-400 font-bold">Therapist</span>, <span className="text-violet-400 font-bold">Tutor</span>, and <span className="text-rose-400 font-bold">Friend</span>
              </p>
              
              {/* Enhanced Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
                <motion.div 
                  className="flex items-center space-x-3 text-xl text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <Heart className="w-8 h-8 text-emerald-400" />
                  <span className="font-semibold" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Emotionally Aware</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3 text-xl text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                >
                  <Target className="w-8 h-8 text-violet-400" />
                  <span className="font-semibold" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>100% Accurate</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3 text-xl text-gray-300"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 }}
                >
                  <Lightbulb className="w-8 h-8 text-rose-400" />
                  <span className="font-semibold" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Learns & Grows</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 1.8 }}
              className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20"
            >
              <motion.button
                onClick={onEnterApp}
                className="group relative px-16 py-8 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white rounded-3xl font-bold text-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center space-x-5"
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                  fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
                  boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)'
                }}
              >
                {/* Animated Sparkle Icon with continuous spinning */}
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                  whileHover={{
                    filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))'
                  }}
                >
                  <Sparkles className="w-8 h-8" />
                </motion.div>
                <span>Meet LIORA</span>
                <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform" />
              </motion.button>

              <motion.button
                onClick={() => scrollToSection('demo')}
                className="px-16 py-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl font-bold text-2xl text-white hover:bg-white/20 transition-all duration-300 flex items-center space-x-5 shadow-xl"
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
                style={{ fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" }}
              >
                <Play className="w-7 h-7" />
                <span>See Demo</span>
              </motion.button>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="cursor-pointer"
              onClick={() => scrollToSection('modes')}
            >
              <ChevronDown className="w-12 h-12 text-gray-400 mx-auto" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Three Modes Section with Rich Gradient Backgrounds */}
      <section id="modes" className="relative py-40 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-6xl md:text-7xl font-black text-white mb-10" style={{ fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" }}>
              Three AI Personalities
            </h2>
            <p className="text-2xl text-gray-300 max-w-5xl mx-auto" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              LIORA adapts to what you need most - emotional support, learning assistance, or genuine friendship.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                mode: 'therapist',
                icon: Heart,
                title: 'AI Therapist',
                subtitle: 'Emotionally Aware Support',
                description: 'Research-backed emotional support with crisis detection, CBT techniques, and adaptive learning from your emotional patterns.',
                features: ['Emotion Detection', 'Crisis Alerts', 'CBT Techniques', 'Learning Mode'],
                gradientBg: 'from-emerald-400/20 via-green-500/15 to-emerald-600/20',
                glowColor: 'rgba(16, 185, 129, 0.4)',
                delay: 0.3
              },
              {
                mode: 'tutor',
                icon: GraduationCap,
                title: 'AI Tutor',
                subtitle: '100% Accurate Learning',
                description: 'Powered by verified sources, WolframAlpha, and peer-reviewed research. Interactive quizzes, flashcards, and personalized study plans.',
                features: ['100% Accuracy', 'Interactive Quizzes', 'Study Plans', 'Progress Tracking'],
                gradientBg: 'from-violet-400/20 via-purple-500/15 to-violet-600/20',
                glowColor: 'rgba(139, 92, 246, 0.4)',
                delay: 0.6
              },
              {
                mode: 'friend',
                icon: Users,
                title: 'AI Friend',
                subtitle: 'Customizable Companion',
                description: 'Choose your AI friend\'s age and personality. Builds real relationships, remembers everything, and checks in on you like a true friend.',
                features: ['Customizable Age', 'Relationship Building', 'Proactive Check-ins', 'Mood Boosters'],
                gradientBg: 'from-rose-400/20 via-pink-500/15 to-rose-600/20',
                glowColor: 'rgba(244, 114, 182, 0.4)',
                delay: 0.9
              }
            ].map((mode, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: mode.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -20, scale: 1.03 }}
                className="group"
              >
                <div 
                  className={`relative p-12 bg-gradient-to-br ${mode.gradientBg} backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl transition-all duration-500 group-hover:shadow-3xl overflow-hidden`}
                  style={{
                    boxShadow: `0 25px 50px -12px ${mode.glowColor}, 0 0 0 1px rgba(255, 255, 255, 0.05)`
                  }}
                >
                  {/* Animated background glow */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at center, ${mode.glowColor} 0%, transparent 70%)`
                    }}
                  />
                  
                  <motion.div 
                    className={`w-24 h-24 bg-gradient-to-br ${getModeColor(mode.mode)} rounded-2xl flex items-center justify-center mb-10 shadow-xl group-hover:scale-110 transition-transform duration-300 relative z-10`}
                    whileHover={{ rotate: 10 }}
                  >
                    <mode.icon className="w-12 h-12 text-white" />
                  </motion.div>
                  
                  <h3 className="text-4xl font-bold text-white mb-4 relative z-10" style={{ fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" }}>
                    {mode.title}
                  </h3>
                  <p className="text-xl font-semibold text-gray-300 mb-6 relative z-10" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                    {mode.subtitle}
                  </p>
                  <p className="text-gray-400 leading-relaxed text-lg mb-8 relative z-10" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                    {mode.description}
                  </p>
                  
                  <div className="space-y-3 relative z-10">
                    {mode.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getModeColor(mode.mode)}`} />
                        <span className="text-gray-300 font-medium" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Demo Section */}
      <section id="demo" className="relative py-40 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-6xl md:text-7xl font-black text-white mb-10" style={{ fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" }}>
              See LIORA in Action
            </h2>
            <p className="text-2xl text-gray-300" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              Watch how LIORA adapts her personality and expertise to each conversation
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-16 border border-white/10 shadow-2xl"
          >
            <div className="space-y-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDemo}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 1.2 }}
                  className="space-y-10"
                >
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="max-w-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-3xl px-10 py-8 shadow-xl">
                      <p className="text-xl leading-relaxed" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                        {demoMessages[currentDemo * 2].text}
                      </p>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex justify-start">
                    <div className="max-w-2xl bg-white/10 backdrop-blur-xl rounded-3xl px-10 py-8 border border-white/20 shadow-xl">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${getModeColor(demoMessages[currentDemo * 2 + 1].mode)} rounded-full flex items-center justify-center`}>
                          {React.createElement(getModeIcon(demoMessages[currentDemo * 2 + 1].mode), { className: "w-6 h-6 text-white" })}
                        </div>
                        <div>
                          <span className="text-sm font-bold text-gray-400 capitalize" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                            LIORA {demoMessages[currentDemo * 2 + 1].mode}
                          </span>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-xs text-gray-400" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Emotionally Aware</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xl leading-relaxed text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                        {typedText}
                        {isTyping && (
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="inline-block w-3 h-6 bg-green-500 ml-1"
                          />
                        )}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Demo Controls */}
              <div className="flex justify-center space-x-6 pt-8">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentDemo(index)}
                    className={`w-6 h-6 rounded-full transition-all duration-500 ${
                      currentDemo === index 
                        ? 'bg-blue-500 scale-125 shadow-lg shadow-blue-500/50' 
                        : 'bg-gray-600 hover:bg-blue-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <motion.button
              onClick={onEnterApp}
              className="px-16 py-8 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white rounded-3xl font-bold text-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center space-x-5 mx-auto"
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)'
              }}
            >
              <Rocket className="w-8 h-8" />
              <span>Experience LIORA</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="relative py-40 px-8 bg-gradient-to-br from-slate-900/50 to-indigo-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-6xl md:text-7xl font-black text-white mb-10" style={{ fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" }}>
              Advanced AI Features
            </h2>
            <p className="text-2xl text-gray-300" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              Powered by cutting-edge technology and emotional intelligence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Brain, title: 'Emotional Intelligence', desc: 'Detects emotions from voice, text, and context', color: 'text-violet-400' },
              { icon: Shield, title: 'Crisis Detection', desc: 'Automatic alerts and emergency support', color: 'text-emerald-400' },
              { icon: BookOpen, title: 'Learning Mode', desc: 'Builds long-term relationships and memories', color: 'text-blue-400' },
              { icon: Target, title: '100% Accuracy', desc: 'Verified sources and peer-reviewed research', color: 'text-rose-400' },
              { icon: Volume2, title: 'Natural Voice', desc: 'Ultra-realistic AI voice with ElevenLabs', color: 'text-purple-400' },
              { icon: Video, title: 'Video Chat', desc: 'Expressive AI face with Tavus integration', color: 'text-indigo-400' },
              { icon: Globe, title: 'Multilingual', desc: 'Supports 12+ languages natively', color: 'text-cyan-400' },
              { icon: Zap, title: 'Real-time Learning', desc: 'Adapts and improves with every interaction', color: 'text-green-400' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-16 h-16 ${feature.color} bg-current/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" }}>
                  {feature.title}
                </h3>
                <p className="text-gray-400" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Footer */}
      <section className="relative py-40 px-8 bg-gradient-to-br from-slate-900 to-indigo-900">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-7xl font-black text-white mb-10" style={{ fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" }}>
              Ready to Meet LIORA?
            </h2>
            <p className="text-2xl text-gray-300 mb-20 max-w-4xl mx-auto" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              Experience the world's most advanced AI that truly understands you, learns with you, and grows alongside you.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20">
              <motion.button
                onClick={onEnterApp}
                className="px-16 py-8 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white rounded-3xl font-bold text-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center space-x-5"
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                  fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
                  boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)'
                }}
              >
                <Rocket className="w-8 h-8" />
                <span>Start Your Journey</span>
              </motion.button>

              <motion.a
                href="https://github.com/lioraaai"
                className="px-16 py-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl font-bold text-2xl text-white hover:bg-white/20 transition-all duration-300 flex items-center space-x-5 shadow-xl"
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
                style={{ fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" }}
              >
                <Github className="w-7 h-7" />
                <span>GitHub</span>
              </motion.a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-10">
              {[
                { icon: Twitter, href: 'https://twitter.com/lioraaai', label: 'Twitter' },
                { icon: Github, href: 'https://github.com/lioraaai', label: 'GitHub' },
                { icon: Mail, href: 'mailto:hello@liora-ai.life', label: 'Email' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-xl"
                  whileHover={{ scale: 1.1, y: -8 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-8 h-8" />
                </motion.a>
              ))}
            </div>

            <motion.p 
              className="text-gray-400 text-xl mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              viewport={{ once: true }}
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              © 2024 LIORA AI. The world's most advanced AI companion.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;