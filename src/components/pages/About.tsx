import React from 'react';
import { 
  Heart, 
  Zap, 
  Users, 
  Globe, 
  Star, 
  Award,
  ExternalLink,
  Mail,
  Twitter,
  Github,
  Brain,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const features = [
    {
      icon: Heart,
      title: 'AI Therapist',
      description: 'Emotional support and mental wellness guidance available 24/7',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'AI Coach',
      description: 'Personal development and goal achievement with motivational support',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Users,
      title: 'AI Tutor',
      description: 'Personalized learning assistance across any subject or skill',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Globe,
      title: 'Always Available',
      description: 'Your AI companion is ready to help whenever you need it',
      color: 'from-primary-500 to-accent-500'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '10K+' },
    { label: 'Conversations', value: '100K+' },
    { label: 'Success Rate', value: '95%' },
    { label: 'Countries', value: '50+' }
  ];

  const team = [
    {
      name: 'Alex Chen',
      role: 'AI Engineer',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      bio: 'Passionate about democratizing AI for personal growth'
    },
    {
      name: 'Sarah Williams',
      role: 'UX Designer',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      bio: 'Creating intuitive experiences that make AI accessible to everyone'
    },
    {
      name: 'Marcus Johnson',
      role: 'Product Manager',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      bio: 'Building products that enhance human potential through AI'
    }
  ];

  return (
    <div className="p-8 space-y-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl">
      {/* Hero Section */}
      <motion.div 
        className="text-center space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center shadow-2xl">
          <Brain className="w-12 h-12 text-white" />
        </div>
        <div>
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-6 font-heading">
            About LioraAI
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Built to give everyone an AI friend in their pocket — anytime, anywhere. 
            LioraAI is your personal life co-pilot, combining the wisdom of a coach, 
            the empathy of a therapist, and the knowledge of a tutor.
          </p>
        </div>
      </motion.div>

      {/* Origin Story */}
      <motion.div 
        className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center font-heading">
            Our Story
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              LioraAI was born during the World's Largest Hackathon, where our team realized that 
              while AI technology was advancing rapidly, truly personal, empathetic AI assistance 
              remained out of reach for most people.
            </p>
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              We envisioned a world where everyone could have access to intelligent, compassionate 
              support for their personal growth, mental wellness, and learning journey. Not just 
              another chatbot, but a true companion that understands context, remembers your goals, 
              and adapts to your unique needs.
            </p>
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Today, LioraAI serves thousands of users worldwide, helping them achieve their goals, 
              manage stress, learn new skills, and navigate life's challenges with confidence.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Features */}
      <div className="space-y-12">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
            Three AI Personalities, One Powerful Platform
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Each mode is specifically designed to provide the most relevant and effective support for your needs.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={index} 
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 border border-white/30 dark:border-gray-700/30 text-center shadow-xl hover:shadow-2xl transition-all"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-xl`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-heading">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <motion.div 
        className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-12 border border-white/30 dark:border-gray-700/30 shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
              <div className="text-4xl font-black text-primary-500 mb-3">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Team */}
      <div className="space-y-12">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
            Meet the Team
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Built by a passionate team of AI researchers, designers, and engineers 
            who believe in the power of technology to enhance human potential.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div 
              key={index} 
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 border border-white/30 dark:border-gray-700/30 text-center shadow-xl hover:shadow-2xl transition-all"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-6 shadow-xl"
              />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-heading">
                {member.name}
              </h3>
              <p className="text-primary-500 font-semibold mb-4">
                {member.role}
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hackathon Badge */}
      <motion.div 
        className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-3xl p-12 text-white text-center shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8"
        >
          <Award className="w-10 h-10" />
        </motion.div>
        <h3 className="text-3xl font-bold mb-6 font-heading">
          Built during the World's Largest Hackathon
        </h3>
        <p className="text-accent-100 text-xl max-w-3xl mx-auto leading-relaxed">
          This project was created as part of the largest global hackathon event, 
          showcasing cutting-edge AI technology and innovative user experience design.
        </p>
      </motion.div>

      {/* Contact */}
      <motion.div 
        className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-12 border border-white/30 dark:border-gray-700/30 shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <div className="text-center space-y-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white font-heading">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Have questions, feedback, or want to learn more about LioraAI? 
            We'd love to hear from you!
          </p>
          
          <div className="flex justify-center space-x-8">
            <motion.a
              href="mailto:hello@liora-ai.life"
              className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl hover:from-primary-600 hover:to-accent-600 transition-all shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-5 h-5" />
              <span className="font-semibold">Email Us</span>
            </motion.a>
            <motion.a
              href="https://twitter.com/lioraaai"
              className="flex items-center space-x-3 px-8 py-4 bg-white/60 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all shadow-xl border border-white/30 dark:border-gray-700/30"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Twitter className="w-5 h-5" />
              <span className="font-semibold">Twitter</span>
            </motion.a>
            <motion.a
              href="https://github.com/lioraaai"
              className="flex items-center space-x-3 px-8 py-4 bg-white/60 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all shadow-xl border border-white/30 dark:border-gray-700/30"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
              <span className="font-semibold">GitHub</span>
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Built on Bolt Badge */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg">
          <Sparkles className="w-5 h-5 text-primary-500" />
          <span className="font-semibold">Built on Bolt</span>
          <ExternalLink className="w-4 h-4" />
        </div>
      </motion.div>
    </div>
  );
};

export default About;