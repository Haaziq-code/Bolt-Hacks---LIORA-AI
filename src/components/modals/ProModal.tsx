import React, { useState } from 'react';
import { X, Check, Crown, Zap, Shield, Headphones, Sparkles, CreditCard, Lock, Star, Brain, Heart, Users, Globe, Video, Mic, Database, Target, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PricingPlan } from '../../types';
import { purchaseSubscription, simulateProUpgrade } from '../../services/revenuecat';
import { useApp } from '../../context/AppContext';
import LoadingSpinner from '../ui/LoadingSpinner';
import toast from 'react-hot-toast';

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProModal: React.FC<ProModalProps> = ({ isOpen, onClose }) => {
  const { user, setUser } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  if (!isOpen) return null;

  const plans: PricingPlan[] = [
    {
      id: 'monthly',
      name: 'Pro Monthly',
      price: 29,
      interval: 'monthly',
      features: [
        'Unlimited AI conversations across all modes',
        'Priority response times (2x faster)',
        'Advanced emotional intelligence & crisis detection',
        'Personalized learning mode with memory retention',
        'Custom voice selection & ultra-realistic speech',
        'HD video chat with expressive AI avatar',
        'Session recordings & conversation exports',
        'Premium 24/7 priority support',
        'Advanced analytics & mood tracking',
        'Multi-language support (12+ languages)'
      ]
    },
    {
      id: 'yearly',
      name: 'Pro Yearly',
      price: 290,
      interval: 'yearly',
      popular: true,
      features: [
        'Everything in Monthly Plan included',
        'Save $58 per year (2 months free)',
        'Early access to new AI personalities',
        'Beta features & experimental capabilities',
        'Advanced relationship building algorithms',
        'Custom AI training on your preferences',
        'API access for developers',
        'White-label options for businesses',
        'Dedicated account manager',
        'Custom integrations & enterprise features',
        'Lifetime conversation history backup',
        'Advanced crisis intervention protocols'
      ]
    }
  ];

  const handleSubscribe = async (planId: string) => {
    setIsLoading(true);
    setSelectedPlan(planId);

    try {
      console.log('💳 Starting subscription process for:', planId);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      if (user) {
        setUser({ ...user, isPro: true });
      }
      simulateProUpgrade();
      
      toast.success('🎉 Welcome to LioraAI Pro! Payment successful!');
      
      // Close modal after success
      setTimeout(() => {
        onClose();
      }, 1500);
      
    } catch (error) {
      console.error('❌ Subscription error:', error);
      toast.error('Subscription failed. Please try again.');
    } finally {
      setIsLoading(false);
      setSelectedPlan(null);
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl max-w-7xl w-full mt-8 mb-8 shadow-2xl border border-white/30 dark:border-gray-700/30"
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-8 border-b border-white/20 dark:border-gray-700/20 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-700">
            <div className="flex items-center justify-between">
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Upgrade to LioraAI Pro
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Unlock the full potential of your AI life co-pilot
                  </p>
                </div>
              </motion.div>
              <motion.button
                onClick={onClose}
                className="p-3 hover:bg-white/20 dark:hover:bg-gray-700/20 rounded-xl transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </motion.button>
            </div>
          </div>

          {/* Enhanced Features Overview */}
          <motion.div 
            className="p-8 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-700"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              What you get with Pro
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Brain, title: 'Advanced AI Intelligence', desc: 'Enhanced emotional awareness & learning', color: 'text-violet-500' },
                { icon: Heart, title: 'Crisis Protection', desc: 'Advanced safety & emergency protocols', color: 'text-green-500' },
                { icon: Video, title: 'HD Video Chat', desc: 'Realistic AI avatar conversations', color: 'text-blue-500' },
                { icon: Globe, title: 'Global Access', desc: '12+ languages with native speakers', color: 'text-cyan-500' },
                { icon: Database, title: 'Unlimited Memory', desc: 'Lifetime conversation history', color: 'text-purple-500' },
                { icon: Target, title: '100% Accuracy', desc: 'Verified sources & fact-checking', color: 'text-orange-500' },
                { icon: Lightbulb, title: 'Personalized Learning', desc: 'AI adapts to your unique style', color: 'text-yellow-500' },
                { icon: Shield, title: 'Enterprise Security', desc: 'Bank-level encryption & privacy', color: 'text-red-500' }
              ].map((feature, index) => (
                <motion.div 
                  key={feature.title}
                  className="flex flex-col items-center space-y-3 p-6 bg-white/50 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-white/30 dark:border-gray-700/30"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className={`w-12 h-12 ${feature.color} bg-current/10 rounded-xl flex items-center justify-center`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pricing Plans */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div
                    className={`relative p-8 transition-all duration-300 rounded-3xl border-2 ${
                      plan.popular
                        ? 'border-accent-500 bg-gradient-to-br from-accent-50/50 to-accent-100/50 dark:from-accent-900/20 dark:to-accent-800/20 shadow-2xl'
                        : 'border-white/30 dark:border-gray-700/30 bg-white/50 dark:bg-gray-800/50 hover:border-primary-300 dark:hover:border-primary-600'
                    } backdrop-blur-sm`}
                  >
                    {plan.popular && (
                      <motion.div 
                        className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6, type: 'spring' }}
                      >
                        <span className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl flex items-center space-x-2">
                          <Star className="w-4 h-4" />
                          <span>Most Popular</span>
                          <Sparkles className="w-4 h-4" />
                        </span>
                      </motion.div>
                    )}
                    
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {plan.name}
                      </h3>
                      <div className="flex items-baseline justify-center">
                        <span className="text-5xl font-black text-gray-900 dark:text-white">
                          ${plan.price}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400 ml-2 text-lg">
                          /{plan.interval}
                        </span>
                      </div>
                      {plan.interval === 'yearly' && (
                        <motion.p 
                          className="text-sm text-success-600 dark:text-success-400 mt-2 font-semibold"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.7 }}
                        >
                          💰 Save $58 per year (17% off)
                        </motion.p>
                      )}
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex} 
                          className="flex items-start space-x-3"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.8 + featureIndex * 0.05 }}
                        >
                          <Check className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    <motion.button
                      onClick={() => handleSubscribe(plan.id)}
                      disabled={isLoading}
                      className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 shadow-xl shadow-accent-500/25'
                          : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isLoading && selectedPlan === plan.id ? (
                        <>
                          <LoadingSpinner size="sm" color="text-white" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5" />
                          <span>Subscribe Now</span>
                          <Lock className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <motion.div 
            className="p-8 border-t border-white/20 dark:border-gray-700/20 bg-gray-50/50 dark:bg-gray-800/50"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center justify-center space-x-6 mb-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-blue-500" />
                  <span>Stripe Protected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-purple-500" />
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>30-Day Guarantee</span>
                </div>
              </div>
              <p className="text-lg mb-2">✅ 30-day money-back guarantee • ❌ Cancel anytime • 🔒 Secure payments</p>
              <p>
                Powered by RevenueCat & Stripe • Questions? Contact{' '}
                <a href="mailto:support@liora-ai.life" className="text-primary-600 hover:text-primary-700 font-semibold">
                  support@liora-ai.life
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProModal;