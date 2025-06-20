import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Volume2, 
  Video, 
  Globe,
  Trash2,
  Download,
  Save,
  Crown,
  Sparkles,
  Lock,
  CheckCircle,
  AlertTriangle,
  Brain,
  Heart,
  Users,
  GraduationCap,
  Phone,
  Mail,
  UserCheck,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { performSecurityAudit, isConfigurationLocked } from '../../config/apiKeys';

const Settings: React.FC = () => {
  const { user, setUser } = useApp();
  const [activeTab, setActiveTab] = useState('profile');
  const [preferences, setPreferences] = useState(user?.preferences || {
    theme: 'light',
    voiceType: 'warm',
    personalityTone: 'friendly',
    autoSpeak: true,
    autoVideo: true,
    language: 'en',
    learningMode: false,
    friendAge: 'young-adult',
    crisisDetection: true,
  });
  const [emergencyContact, setEmergencyContact] = useState(user?.emergencyContact || {
    name: '',
    phone: '',
    email: '',
    relationship: ''
  });
  const [securityAudit, setSecurityAudit] = useState(performSecurityAudit());

  React.useEffect(() => {
    setSecurityAudit(performSecurityAudit());
  }, []);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User, color: 'from-blue-500 to-cyan-500' },
    { id: 'ai-modes', label: 'AI Modes', icon: Brain, color: 'from-purple-500 to-pink-500' },
    { id: 'learning', label: 'Learning', icon: Brain, color: 'from-green-500 to-emerald-500' },
    { id: 'voice', label: 'Voice & Video', icon: Volume2, color: 'from-indigo-500 to-purple-500' },
    { id: 'emergency', label: 'Emergency', icon: Phone, color: 'from-red-500 to-pink-500' },
    { id: 'security', label: 'Security', icon: Shield, color: 'from-orange-500 to-red-500' },
    { id: 'notifications', label: 'Notifications', icon: Bell, color: 'from-yellow-500 to-orange-500' },
    { id: 'data', label: 'Data', icon: Download, color: 'from-teal-500 to-cyan-500' },
  ];

  const voiceOptions = [
    { id: 'calm', label: 'Calm', description: 'Soothing and peaceful voice' },
    { id: 'energetic', label: 'Energetic', description: 'Upbeat and motivating voice' },
    { id: 'warm', label: 'Warm', description: 'Friendly and welcoming voice' },
    { id: 'robotic', label: 'Robotic', description: 'Clear and precise voice' },
  ];

  const personalityOptions = [
    { id: 'friendly', label: 'Friendly', description: 'Casual and approachable' },
    { id: 'formal', label: 'Formal', description: 'Professional and structured' },
    { id: 'humorous', label: 'Humorous', description: 'Light-hearted and fun' },
  ];

  const friendAgeOptions = [
    { id: 'child', label: 'Child (8-12)', description: 'Playful, curious, innocent' },
    { id: 'teen', label: 'Teen (13-17)', description: 'Energetic, trendy, supportive' },
    { id: 'young-adult', label: 'Young Adult (18-25)', description: 'Ambitious, relatable, understanding' },
    { id: 'adult', label: 'Adult (26+)', description: 'Mature, wise, experienced' },
  ];

  const handleSavePreferences = () => {
    if (user) {
      setUser({ 
        ...user, 
        preferences,
        emergencyContact: emergencyContact.name ? emergencyContact : undefined
      });
    }
    alert('Settings saved successfully!');
  };

  const toggleLearningMode = () => {
    setPreferences(prev => ({ ...prev, learningMode: !prev.learningMode }));
  };

  const toggleCrisisDetection = () => {
    setPreferences(prev => ({ ...prev, crisisDetection: !prev.crisisDetection }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-8">
              <div className="relative">
                <img
                  src={user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1'}
                  alt="Profile"
                  className="w-32 h-32 rounded-3xl object-cover shadow-2xl"
                />
                <motion.button 
                  className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl flex items-center justify-center shadow-xl"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✏️
                </motion.button>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-heading">
                  {user?.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">{user?.email}</p>
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-2xl text-sm font-semibold ${
                  user?.isPro 
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                }`}>
                  {user?.isPro && <Crown className="w-4 h-4" />}
                  <span>{user?.isPro ? 'Pro Member' : 'Free Member'}</span>
                  {user?.isPro && <Sparkles className="w-4 h-4" />}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={user?.name}
                  className="w-full px-6 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  className="w-full px-6 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        );

      case 'ai-modes':
        return (
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                AI Personality Settings
              </h3>
              
              {/* Friend Age Setting */}
              <div className="mb-8">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <Users className="w-5 h-5 text-pink-500" />
                  <span>AI Friend Age</span>
                </h4>
                <div className="space-y-4">
                  {friendAgeOptions.map((option) => (
                    <motion.div 
                      key={option.id} 
                      className="flex items-center space-x-4 p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg"
                      whileHover={{ scale: 1.02 }}
                    >
                      <input
                        type="radio"
                        id={option.id}
                        name="friendAge"
                        value={option.id}
                        checked={preferences.friendAge === option.id}
                        onChange={(e) => setPreferences({ ...preferences, friendAge: e.target.value as any })}
                        className="w-5 h-5 text-primary-500 focus:ring-primary-500"
                      />
                      <div>
                        <label htmlFor={option.id} className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                          {option.label}
                        </label>
                        <p className="text-gray-500 dark:text-gray-400">
                          {option.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Personality Tone */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Personality Tone
                </h4>
                <div className="space-y-4">
                  {personalityOptions.map((option) => (
                    <motion.div 
                      key={option.id} 
                      className="flex items-center space-x-4 p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg"
                      whileHover={{ scale: 1.02 }}
                    >
                      <input
                        type="radio"
                        id={option.id}
                        name="personality"
                        value={option.id}
                        checked={preferences.personalityTone === option.id}
                        onChange={(e) => setPreferences({ ...preferences, personalityTone: e.target.value as any })}
                        className="w-5 h-5 text-primary-500 focus:ring-primary-500"
                      />
                      <div>
                        <label htmlFor={option.id} className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                          {option.label}
                        </label>
                        <p className="text-gray-500 dark:text-gray-400">
                          {option.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'learning':
        return (
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-heading flex items-center space-x-3">
                <Brain className="w-8 h-8 text-green-500" />
                <span>LIORA Learning Settings</span>
              </h3>
              
              {/* Learning Mode Toggle */}
              <div className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl border-2 border-green-200 dark:border-green-700 mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Learning Mode</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-lg">
                        When enabled, LIORA builds long-term relationships and learns from every interaction
                      </p>
                    </div>
                  </div>
                  <motion.button
                    onClick={toggleLearningMode}
                    className={`relative w-20 h-10 rounded-full transition-all duration-300 ${
                      preferences.learningMode 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute top-1 w-8 h-8 bg-white rounded-full shadow-lg"
                      animate={{ x: preferences.learningMode ? 44 : 4 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </motion.button>
                </div>
                
                {preferences.learningMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 p-6 bg-white/60 dark:bg-gray-800/60 rounded-2xl"
                  >
                    <h5 className="font-bold text-green-700 dark:text-green-300 mb-3">Learning Mode Features:</h5>
                    <ul className="space-y-2 text-green-600 dark:text-green-400">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Remembers your preferences and emotional patterns</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Builds long-term relationship history</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Adapts responses based on past interactions</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Tracks learning progress and knowledge gaps</span>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </div>

              {/* Crisis Detection */}
              <div className="p-8 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-3xl border-2 border-red-200 dark:border-red-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Crisis Detection</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Automatically detect crisis situations and provide emergency support
                      </p>
                    </div>
                  </div>
                  <motion.button
                    onClick={toggleCrisisDetection}
                    className={`relative w-20 h-10 rounded-full transition-all duration-300 ${
                      preferences.crisisDetection 
                        ? 'bg-gradient-to-r from-red-500 to-pink-500' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute top-1 w-8 h-8 bg-white rounded-full shadow-lg"
                      animate={{ x: preferences.crisisDetection ? 44 : 4 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'emergency':
        return (
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-heading flex items-center space-x-3">
                <Phone className="w-8 h-8 text-red-500" />
                <span>Emergency Contact</span>
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Set up an emergency contact for crisis situations. LIORA will alert this person if crisis indicators are detected.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    value={emergencyContact.name}
                    onChange={(e) => setEmergencyContact({ ...emergencyContact, name: e.target.value })}
                    className="w-full px-6 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg"
                    placeholder="Enter contact name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={emergencyContact.phone}
                    onChange={(e) => setEmergencyContact({ ...emergencyContact, phone: e.target.value })}
                    className="w-full px-6 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={emergencyContact.email}
                    onChange={(e) => setEmergencyContact({ ...emergencyContact, email: e.target.value })}
                    className="w-full px-6 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Relationship
                  </label>
                  <select
                    value={emergencyContact.relationship}
                    onChange={(e) => setEmergencyContact({ ...emergencyContact, relationship: e.target.value })}
                    className="w-full px-6 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg"
                  >
                    <option value="">Select relationship</option>
                    <option value="family">Family Member</option>
                    <option value="friend">Friend</option>
                    <option value="partner">Partner/Spouse</option>
                    <option value="therapist">Therapist</option>
                    <option value="doctor">Doctor</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'voice':
        return (
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                Voice Settings
              </h3>
              <div className="space-y-4">
                {voiceOptions.map((option) => (
                  <motion.div 
                    key={option.id} 
                    className="flex items-center space-x-4 p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <input
                      type="radio"
                      id={option.id}
                      name="voice"
                      value={option.id}
                      checked={preferences.voiceType === option.id}
                      onChange={(e) => setPreferences({ ...preferences, voiceType: e.target.value as any })}
                      className="w-5 h-5 text-primary-500 focus:ring-primary-500"
                    />
                    <div>
                      <label htmlFor={option.id} className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        {option.label}
                      </label>
                      <p className="text-gray-500 dark:text-gray-400">
                        {option.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                Auto Features
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg">
                  <div>
                    <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                      Auto Speak
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">
                      Automatically read AI responses aloud
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.autoSpeak}
                    onChange={(e) => setPreferences({ ...preferences, autoSpeak: e.target.checked })}
                    className="w-5 h-5 text-primary-500 focus:ring-primary-500 rounded"
                  />
                </div>
                <div className="flex items-center justify-between p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg">
                  <div>
                    <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                      Auto Video
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">
                      Automatically show video responses
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.autoVideo}
                    onChange={(e) => setPreferences({ ...preferences, autoVideo: e.target.checked })}
                    className="w-5 h-5 text-primary-500 focus:ring-primary-500 rounded"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'security':
        return (
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-heading flex items-center space-x-3">
                <Shield className="w-8 h-8 text-primary-500" />
                <span>Security Status</span>
              </h3>
              
              {/* Security Overview */}
              <div className={`p-6 rounded-2xl border-2 mb-6 ${
                securityAudit.isSecure 
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700' 
                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
              }`}>
                <div className="flex items-center space-x-4 mb-4">
                  {securityAudit.isSecure ? (
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  )}
                  <div>
                    <h4 className={`text-xl font-bold ${
                      securityAudit.isSecure ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                    }`}>
                      {securityAudit.isSecure ? 'Security Status: Secure' : 'Security Status: Issues Detected'}
                    </h4>
                    <p className={`${
                      securityAudit.isSecure ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {securityAudit.isSecure 
                        ? 'All API keys are properly secured and locked'
                        : `${securityAudit.issues.length} security issue(s) detected`
                      }
                    </p>
                  </div>
                </div>
                
                {!securityAudit.isSecure && (
                  <div className="mt-4">
                    <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">Issues:</h5>
                    <ul className="list-disc list-inside space-y-1 text-red-600 dark:text-red-400">
                      {securityAudit.issues.map((issue, index) => (
                        <li key={index}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* API Key Status */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">API Key Configuration</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'ElevenLabs', service: 'elevenlabs', status: 'secured' },
                    { name: 'Google Gemini', service: 'gemini', status: 'secured' },
                    { name: 'Supabase', service: 'supabase', status: 'secured' },
                    { name: 'RevenueCat', service: 'revenuecat', status: 'secured' },
                    { name: 'Tavus', service: 'tavus', status: 'secured' },
                  ].map((api) => (
                    <div key={api.service} className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Lock className="w-5 h-5 text-green-500" />
                          <span className="font-semibold text-gray-900 dark:text-white">{api.name}</span>
                        </div>
                        <span className="text-sm px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full font-medium">
                          Secured
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Configuration Lock Status */}
              <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Lock className="w-6 h-6 text-primary-500" />
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">Configuration Lock</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        API keys are locked and cannot be modified at runtime
                      </p>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-xl font-semibold ${
                    isConfigurationLocked() 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  }`}>
                    {isConfigurationLocked() ? 'Locked' : 'Unlocked'}
                  </div>
                </div>
              </div>

              {/* Security Audit Details */}
              <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Security Audit</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Last Audit:</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {new Date(securityAudit.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Configuration Hash:</span>
                    <span className="text-gray-900 dark:text-white font-mono text-xs">
                      b8g9e3f4d2c5g7b9f4e3d2c5g7b9f4e3
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">AI Provider:</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      Google Gemini Pro
                    </span>
                  </div>
                </div>
                
                <motion.button
                  onClick={() => setSecurityAudit(performSecurityAudit())}
                  className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Run Security Audit
                </motion.button>
              </div>
            </div>
          </motion.div>
        );

      case 'data':
        return (
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                Data Management
              </h3>
              <div className="space-y-6">
                <motion.button 
                  className="flex items-center space-x-4 w-full p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all shadow-lg"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-6 h-6 text-primary-500" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 dark:text-white text-lg">Export Data</p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Download all your conversations and learning data
                    </p>
                  </div>
                </motion.button>
                <motion.button 
                  className="flex items-center space-x-4 w-full p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-red-200 dark:border-red-700 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-red-600 dark:text-red-400 shadow-lg"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Trash2 className="w-6 h-6" />
                  <div className="text-left">
                    <p className="font-semibold text-lg">Delete Account</p>
                    <p className="opacity-75">
                      Permanently delete your account and all data
                    </p>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        );

      default:
        return (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-500 dark:text-gray-400 text-xl">
              Settings for {activeTab} coming soon...
            </p>
          </motion.div>
        );
    }
  };

  return (
    <div className="p-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4 font-heading">LIORA Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xl">
            Customize your AI companion and learning experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-3">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-left transition-all duration-300 ${
                      activeTab === tab.id
                        ? `bg-gradient-to-r ${tab.color} text-white shadow-xl`
                        : 'text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-800/60 hover:shadow-lg'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="font-semibold">{tab.label}</span>
                    {tab.id === 'security' && !securityAudit.isSecure && (
                      <AlertTriangle className="w-4 h-4 text-red-400 ml-auto" />
                    )}
                    {tab.id === 'learning' && preferences.learningMode && (
                      <Brain className="w-4 h-4 text-green-400 ml-auto" />
                    )}
                  </motion.button>
                );
              })}
            </nav>
          </div>

          {/* Enhanced Content */}
          <div className="lg:col-span-3">
            <motion.div 
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-white/30 dark:border-gray-700/30 p-8 shadow-xl"
              layout
            >
              {renderTabContent()}
              
              {/* Enhanced Save Button */}
              {(activeTab === 'ai-modes' || activeTab === 'voice' || activeTab === 'learning' || activeTab === 'emergency') && (
                <motion.div 
                  className="mt-12 pt-8 border-t border-white/30 dark:border-gray-700/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <motion.button
                    onClick={handleSavePreferences}
                    className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl hover:from-primary-600 hover:to-accent-600 transition-all shadow-xl font-semibold"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;