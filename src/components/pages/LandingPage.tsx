import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  Brain, 
  MessageSquare, 
  Sparkles, 
  Zap, 
  Shield, 
  Headphones,
  ArrowRight,
  Play,
  Github,
  Twitter,
  Mail,
  Star,
  Users,
  Globe,
  Heart,
  GraduationCap,
  Volume2,
  Database,
  Rocket,
  Award,
  ChevronDown,
  Crown,
  Cpu,
  Layers,
  Palette
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');

  const demoMessages = [
    { role: 'user', text: 'I need help staying motivated with my fitness goals' },
    { role: 'ai', text: 'You know what I love about that? You\'re already taking the first step by reaching out! 💪 Let\'s create a plan that actually sticks. What\'s been your biggest challenge so far?' },
    { role: 'user', text: 'I\'m feeling overwhelmed with work stress lately' },
    { role: 'ai', text: 'I can really hear that in your voice. Work stress can feel so overwhelming, and your feelings are completely valid. 💙 Let\'s explore what\'s been weighing on you most.' },
    { role: 'user', text: 'Can you explain how machine learning works?' },
    { role: 'ai', text: 'Oh, that\'s a fantastic question! 📚 Think of it like teaching a friend to recognize your favorite songs. You play them hundreds of examples until they can identify the style. That\'s essentially how ML works!' }
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
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      setIsTyping(false);
    };

    const timer = setTimeout(typeMessage, 2000);
    return () => clearTimeout(timer);
  }, [currentDemo]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
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
              LioraAI
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                Your AI Life Co-pilot
              </h2>
              <p className="text-2xl md:text-4xl text-gray-600 dark:text-gray-400 max-w-6xl mx-auto leading-relaxed">
                Have real conversations. Get natural responses. Experience AI that feels genuinely human.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 1.2 }}
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
                <span>Start with Liora</span>
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
              onClick={() => scrollToSection('features')}
            >
              <ChevronDown className="w-12 h-12 text-gray-400 mx-auto" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-40 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-6xl md:text-7xl font-black text-gray-900 dark:text-white mb-10">
              Natural AI Conversations
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-400 max-w-5xl mx-auto">
              Experience AI that speaks like a real person, with genuine emotions and natural conversation flow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Volume2,
                title: 'Human-like Voice',
                subtitle: 'Natural speech patterns.',
                description: 'AI-powered voice synthesis that sounds genuinely human, with natural pauses, emotions, and conversational flow.',
                color: 'from-orange-500 to-red-500',
                bgColor: 'from-orange-500/10 to-red-500/10',
                delay: 0.3
              },
              {
                icon: Globe,
                title: 'Multilingual Support',
                subtitle: 'Speak in your language.',
                description: 'Supports 10 major languages with native voice models and automatic language detection.',
                color: 'from-green-500 to-emerald-500',
                bgColor: 'from-green-500/10 to-emerald-500/10',
                delay: 0.6
              },
              {
                icon: Brain,
                title: 'Emotional Intelligence',
                subtitle: 'Understands how you feel.',
                description: 'Responds with genuine empathy and adapts conversation style based on your emotional state.',
                color: 'from-primary-500 to-accent-500',
                bgColor: 'from-primary-500/10 to-accent-500/10',
                delay: 0.9
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: feature.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -20, scale: 1.03 }}
                className="group"
              >
                <div className={`relative p-12 bg-gradient-to-br ${feature.bgColor} backdrop-blur-xl border border-white/40 dark:border-gray-700/40 rounded-[2.5rem] shadow-2xl hover:shadow-3xl transition-all duration-500`}>
                  <motion.div 
                    className={`w-24 h-24 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-10 shadow-xl group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 10 }}
                  >
                    <feature.icon className="w-12 h-12 text-white" />
                  </motion.div>
                  
                  <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
                    {feature.subtitle}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                    {feature.description}
                  </p>
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
              See Natural AI in Action
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-400">
              Watch how Liora responds with genuine emotion and natural conversation flow
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
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                          <Brain className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                          {currentDemo === 0 ? 'AI Coach' : currentDemo === 1 ? 'AI Therapist' : 'AI Tutor'}
                        </span>
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
              <span>Experience Natural AI</span>
            </motion.button>
          </motion.div>
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
              Ready for Natural AI Conversations?
            </h2>
            <p className="text-2xl text-gray-300 mb-20 max-w-4xl mx-auto">
              Join thousands experiencing AI that feels genuinely human - with natural speech, 
              emotional intelligence, and multilingual support.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20">
              <motion.button
                onClick={onEnterApp}
                className="px-16 py-8 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-3xl font-bold text-2xl shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 flex items-center space-x-5"
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
              >
                <Rocket className="w-8 h-8" />
                <span>Start Talking Now</span>
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
              © 2024 LioraAI. Built with ❤️ during the World's Largest Hackathon.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;