import React, { useState, useEffect } from 'react';
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

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');

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

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'therapist':
        return 'from-green-500 to-emerald-500';
      case 'tutor':
        return 'from-indigo-500 to-purple-500';
      case 'friend':
        return 'from-pink-500 to-rose-500';
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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="mb-12"
          >
            {/* Logo */}
            <motion.div 
              className="inline-flex items-center justify-center w-36 h-36 bg-gradient-to-br from-primary-500 via-accent-500 to-primary-600 rounded-[2.5rem] mb-12 shadow-2xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              animate={{ 
                boxShadow: [
                  '0 0 0 0 rgba(14, 165, 233, 0.4)',
                  '0 0 0 20px rgba(14, 165, 233, 0)',
                ]
              }}
            >
              <Brain className="w-20 h-20 text-white" />
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              className="text-8xl md:text-[10rem] font-black mb-8 bg-gradient-to-r from-gray-900 via-primary-600 to-accent-600 dark:from-white dark:via-primary-400 dark:to-accent-400 bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              LIORA
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                The World's Most Advanced AI
              </h2>
              <p className="text-2xl md:text-4xl text-gray-600 dark:text-gray-400 max-w-6xl mx-auto leading-relaxed mb-8">
                Three intelligent personalities in one: <span className="text-green-500 font-bold">Therapist</span>, <span className="text-indigo-500 font-bold">Tutor</span>, and <span className="text-pink-500 font-bold">Friend</span>
              </p>
              
              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
                <motion.div 
                  className="flex items-center space-x-3 text-xl text-gray-700 dark:text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <Heart className="w-8 h-8 text-green-500" />
                  <span className="font-semibold">Emotionally Aware</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3 text-xl text-gray-700 dark:text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                >
                  <Target className="w-8 h-8 text-indigo-500" />
                  <span className="font-semibold">100% Accurate</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3 text-xl text-gray-700 dark:text-gray-300"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 }}
                >
                  <Lightbulb className="w-8 h-8 text-pink-500" />
                  <span className="font-semibold">Learns & Grows</span>
                </motion.div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 1.8 }}
              className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20"
            >
              <motion.button
                onClick={onEnterApp}
                className="group relative px-16 py-8 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-3xl font-bold text-2xl shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 flex items-center space-x-5"
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: [0, 15, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="w-8 h-8" />
                </motion.div>
                <span>Meet LIORA</span>
                <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform" />
              </motion.button>

              <motion.button
                onClick={() => scrollToSection('demo')}
                className="px-16 py-8 bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 text-gray-800 dark:text-white rounded-3xl font-bold text-2xl hover:bg-white/30 dark:hover:bg-gray-900/30 transition-all duration-300 flex items-center space-x-5 shadow-2xl"
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
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

      {/* Three Modes Section */}
      <section id="modes" className="relative py-40 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-6xl md:text-7xl font-black text-gray-900 dark:text-white mb-10">
              Three AI Personalities
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-400 max-w-5xl mx-auto">
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
                color: 'from-green-500 to-emerald-500',
                bgColor: 'from-green-500/10 to-emerald-500/10',
                delay: 0.3
              },
              {
                mode: 'tutor',
                icon: GraduationCap,
                title: 'AI Tutor',
                subtitle: '100% Accurate Learning',
                description: 'Powered by verified sources, WolframAlpha, and peer-reviewed research. Interactive quizzes, flashcards, and personalized study plans.',
                features: ['100% Accuracy', 'Interactive Quizzes', 'Study Plans', 'Progress Tracking'],
                color: 'from-indigo-500 to-purple-500',
                bgColor: 'from-indigo-500/10 to-purple-500/10',
                delay: 0.6
              },
              {
                mode: 'friend',
                icon: Users,
                title: 'AI Friend',
                subtitle: 'Customizable Companion',
                description: 'Choose your AI friend\'s age and personality. Builds real relationships, remembers everything, and checks in on you like a true friend.',
                features: ['Customizable Age', 'Relationship Building', 'Proactive Check-ins', 'Mood Boosters'],
                color: 'from-pink-500 to-rose-500',
                bgColor: 'from-pink-500/10 to-rose-500/10',
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
                <div className={`relative p-12 bg-gradient-to-br ${mode.bgColor} backdrop-blur-xl border border-white/40 dark:border-gray-700/40 rounded-[2.5rem] shadow-2xl hover:shadow-3xl transition-all duration-500`}>
                  <motion.div 
                    className={`w-24 h-24 bg-gradient-to-br ${mode.color} rounded-2xl flex items-center justify-center mb-10 shadow-xl group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 10 }}
                  >
                    <mode.icon className="w-12 h-12 text-white" />
                  </motion.div>
                  
                  <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {mode.title}
                  </h3>
                  <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
                    {mode.subtitle}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mb-8">
                    {mode.description}
                  </p>
                  
                  <div className="space-y-3">
                    {mode.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${mode.color}`} />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="relative py-40 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-6xl md:text-7xl font-black text-gray-900 dark:text-white mb-10">
              See LIORA in Action
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-400">
              Watch how LIORA adapts her personality and expertise to each conversation
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 rounded-[2.5rem] p-16 shadow-2xl"
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
                    <div className="max-w-2xl bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-3xl px-10 py-8 shadow-xl">
                      <p className="text-xl leading-relaxed">
                        {demoMessages[currentDemo * 2].text}
                      </p>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex justify-start">
                    <div className="max-w-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl px-10 py-8 shadow-xl">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${getModeColor(demoMessages[currentDemo * 2 + 1].mode)} rounded-full flex items-center justify-center`}>
                          {React.createElement(getModeIcon(demoMessages[currentDemo * 2 + 1].mode), { className: "w-6 h-6 text-white" })}
                        </div>
                        <div>
                          <span className="text-sm font-bold text-gray-500 dark:text-gray-400 capitalize">
                            LIORA {demoMessages[currentDemo * 2 + 1].mode}
                          </span>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-xs text-gray-400">Emotionally Aware</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xl leading-relaxed text-gray-900 dark:text-white">
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
                        ? 'bg-primary-500 scale-125' 
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary-300'
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
              className="px-16 py-8 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-3xl font-bold text-2xl shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 flex items-center space-x-5 mx-auto"
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.95 }}
            >
              <Rocket className="w-8 h-8" />
              <span>Experience LIORA</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-40 px-8 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-6xl md:text-7xl font-black text-gray-900 dark:text-white mb-10">
              Advanced AI Features
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-400">
              Powered by cutting-edge technology and emotional intelligence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Brain, title: 'Emotional Intelligence', desc: 'Detects emotions from voice, text, and context' },
              { icon: Shield, title: 'Crisis Detection', desc: 'Automatic alerts and emergency support' },
              { icon: BookOpen, title: 'Learning Mode', desc: 'Builds long-term relationships and memories' },
              { icon: Target, title: '100% Accuracy', desc: 'Verified sources and peer-reviewed research' },
              { icon: Volume2, title: 'Natural Voice', desc: 'Ultra-realistic AI voice with ElevenLabs' },
              { icon: Video, title: 'Video Chat', desc: 'Expressive AI face with Tavus integration' },
              { icon: Globe, title: 'Multilingual', desc: 'Supports 12+ languages natively' },
              { icon: Zap, title: 'Real-time Learning', desc: 'Adapts and improves with every interaction' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 rounded-2xl p-8 text-center shadow-xl"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="relative py-40 px-8 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-7xl font-black text-white mb-10">
              Ready to Meet LIORA?
            </h2>
            <p className="text-2xl text-gray-300 mb-20 max-w-4xl mx-auto">
              Experience the world's most advanced AI that truly understands you, learns with you, and grows alongside you.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20">
              <motion.button
                onClick={onEnterApp}
                className="px-16 py-8 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-3xl font-bold text-2xl shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 flex items-center space-x-5"
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
              >
                <Rocket className="w-8 h-8" />
                <span>Start Your Journey</span>
              </motion.button>

              <motion.a
                href="https://github.com/lioraaai"
                className="px-16 py-8 bg-white/10 backdrop-blur-xl border border-white/40 text-white rounded-3xl font-bold text-2xl hover:bg-white/20 transition-all duration-300 flex items-center space-x-5 shadow-2xl"
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
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
                  className="w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/40 rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-xl"
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