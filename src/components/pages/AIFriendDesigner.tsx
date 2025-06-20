import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Palette, 
  Volume2, 
  Video, 
  Heart, 
  Sparkles, 
  Save, 
  Play, 
  Pause,
  RotateCcw,
  Eye,
  EyeOff,
  MessageCircle,
  Camera,
  Mic,
  Settings,
  Crown,
  Brain,
  Smile,
  Zap,
  Coffee,
  BookOpen,
  Music,
  Star,
  Sun,
  Moon,
  Shuffle,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  Download,
  Upload
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateSpeech, playAudio } from '../../services/elevenlabs';
import { getSecureApiKey } from '../../config/apiKeys';
import toast from 'react-hot-toast';

interface AIFriendCharacter {
  id: string;
  name: string;
  age: 'teen' | 'young-adult' | 'adult' | 'elder';
  gender: 'male' | 'female' | 'non-binary';
  personality: {
    traits: string[];
    energy: number; // 0-100
    empathy: number; // 0-100
    humor: number; // 0-100
    wisdom: number; // 0-100
  };
  voice: {
    tone: 'soft' | 'warm' | 'energetic' | 'calm' | 'assertive' | 'curious';
    pitch: number; // 0-100
    speed: number; // 0-100
  };
  appearance: {
    skinTone: string;
    hairColor: string;
    hairStyle: string;
    eyeColor: string;
    faceShape: string;
    style: string;
  };
  relationship: {
    level: number; // 0-100
    memories: string[];
    milestones: string[];
    lastInteraction: string;
    checkInFrequency: 'daily' | 'weekly' | 'monthly';
  };
  preferences: {
    topics: string[];
    communicationStyle: string;
    moodSync: boolean;
    proactiveCheckIns: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

const AIFriendDesigner: React.FC = () => {
  const { user, setUser } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [character, setCharacter] = useState<AIFriendCharacter>({
    id: '',
    name: '',
    age: 'young-adult',
    gender: 'female',
    personality: {
      traits: [],
      energy: 70,
      empathy: 80,
      humor: 60,
      wisdom: 50
    },
    voice: {
      tone: 'warm',
      pitch: 50,
      speed: 50
    },
    appearance: {
      skinTone: 'medium',
      hairColor: 'brown',
      hairStyle: 'long',
      eyeColor: 'brown',
      faceShape: 'oval',
      style: 'casual'
    },
    relationship: {
      level: 0,
      memories: [],
      milestones: [],
      lastInteraction: '',
      checkInFrequency: 'daily'
    },
    preferences: {
      topics: [],
      communicationStyle: 'friendly',
      moodSync: true,
      proactiveCheckIns: true
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  const [isGeneratingAvatar, setIsGeneratingAvatar] = useState(false);
  const [isTestingVoice, setIsTestingVoice] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const steps = [
    { id: 'basic', title: 'Basic Info', icon: User },
    { id: 'personality', title: 'Personality', icon: Heart },
    { id: 'voice', title: 'Voice & Tone', icon: Volume2 },
    { id: 'appearance', title: 'Appearance', icon: Palette },
    { id: 'relationship', title: 'Relationship', icon: Sparkles },
    { id: 'preview', title: 'Preview & Save', icon: Eye }
  ];

  const personalityTraits = [
    { id: 'empathetic', label: 'Empathetic', icon: Heart, color: 'text-pink-500' },
    { id: 'funny', label: 'Funny', icon: Smile, color: 'text-yellow-500' },
    { id: 'energetic', label: 'Energetic', icon: Zap, color: 'text-orange-500' },
    { id: 'calm', label: 'Calm', icon: Coffee, color: 'text-blue-500' },
    { id: 'wise', label: 'Wise', icon: BookOpen, color: 'text-purple-500' },
    { id: 'creative', label: 'Creative', icon: Music, color: 'text-indigo-500' },
    { id: 'supportive', label: 'Supportive', icon: Star, color: 'text-green-500' },
    { id: 'optimistic', label: 'Optimistic', icon: Sun, color: 'text-amber-500' },
    { id: 'mysterious', label: 'Mysterious', icon: Moon, color: 'text-gray-500' },
    { id: 'adventurous', label: 'Adventurous', icon: Shuffle, color: 'text-red-500' }
  ];

  const voiceTones = [
    { id: 'soft', label: 'Soft & Gentle', description: 'Soothing and calming voice' },
    { id: 'warm', label: 'Warm & Friendly', description: 'Welcoming and approachable' },
    { id: 'energetic', label: 'Energetic & Upbeat', description: 'Lively and enthusiastic' },
    { id: 'calm', label: 'Calm & Peaceful', description: 'Relaxed and serene' },
    { id: 'assertive', label: 'Assertive & Confident', description: 'Strong and decisive' },
    { id: 'curious', label: 'Curious & Inquisitive', description: 'Questioning and engaged' }
  ];

  const appearanceOptions = {
    skinTone: ['light', 'medium-light', 'medium', 'medium-dark', 'dark'],
    hairColor: ['blonde', 'brown', 'black', 'red', 'gray', 'colorful'],
    hairStyle: ['short', 'medium', 'long', 'curly', 'straight', 'wavy'],
    eyeColor: ['brown', 'blue', 'green', 'hazel', 'gray', 'amber'],
    faceShape: ['oval', 'round', 'square', 'heart', 'diamond', 'oblong'],
    style: ['casual', 'professional', 'artistic', 'sporty', 'elegant', 'alternative']
  };

  // Generate Tavus avatar
  const generateTavusAvatar = async () => {
    setIsGeneratingAvatar(true);
    
    try {
      const apiKey = getSecureApiKey('tavus') as string;
      
      if (!apiKey || apiKey === 'your_tavus_api_key_here') {
        // Demo mode - simulate avatar generation
        await new Promise(resolve => setTimeout(resolve, 3000));
        setAvatarUrl('/api/placeholder/400/400');
        toast.success('🎭 Demo avatar generated! (Connect Tavus for real avatars)');
        return;
      }

      // Create Tavus persona based on character design
      const personaConfig = {
        name: character.name || 'AI Friend',
        description: `A ${character.age} ${character.gender} AI friend with ${character.personality.traits.join(', ')} personality traits`,
        appearance: {
          age_range: character.age,
          gender: character.gender,
          ethnicity: character.appearance.skinTone,
          hair_color: character.appearance.hairColor,
          hair_style: character.appearance.hairStyle,
          eye_color: character.appearance.eyeColor,
          face_shape: character.appearance.faceShape,
          style: character.appearance.style
        },
        personality: {
          traits: character.personality.traits,
          energy_level: character.personality.energy,
          empathy_level: character.personality.empathy,
          humor_level: character.personality.humor,
          wisdom_level: character.personality.wisdom
        },
        voice_settings: {
          tone: character.voice.tone,
          pitch: character.voice.pitch,
          speed: character.voice.speed
        }
      };

      const response = await fetch('https://tavusapi.com/v2/personas', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(personaConfig)
      });

      if (!response.ok) {
        throw new Error(`Tavus API error: ${response.status}`);
      }

      const persona = await response.json();
      setAvatarUrl(persona.avatar_url);
      
      // Update character with Tavus persona ID
      setCharacter(prev => ({
        ...prev,
        id: persona.persona_id,
        updatedAt: new Date().toISOString()
      }));

      toast.success('🎭 Realistic avatar generated successfully!');
      
    } catch (error) {
      console.error('Tavus avatar generation failed:', error);
      
      // Fallback to demo avatar
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAvatarUrl('/api/placeholder/400/400');
      toast.success('🎭 Demo avatar generated! (Connect Tavus for realistic avatars)');
    } finally {
      setIsGeneratingAvatar(false);
    }
  };

  // Test voice with ElevenLabs
  const testVoice = async () => {
    if (isTestingVoice) return;
    
    setIsTestingVoice(true);
    
    try {
      const testMessage = `Hi! I'm ${character.name || 'your AI friend'}. ${
        character.personality.traits.includes('funny') ? "I love making people laugh! 😄" :
        character.personality.traits.includes('empathetic') ? "I'm here to listen and support you. 💙" :
        character.personality.traits.includes('energetic') ? "I'm so excited to be your friend! ⚡" :
        "I'm looking forward to getting to know you better!"
      }`;

      const audioUrl = await generateSpeech(testMessage, 'friend', 'en');
      
      if (audioUrl) {
        await playAudio(audioUrl);
        toast.success('🎤 Voice test completed!');
      } else {
        toast.success('🎤 Voice test completed! (Demo mode)');
      }
      
    } catch (error) {
      console.error('Voice test failed:', error);
      toast.error('Voice test failed. Please try again.');
    } finally {
      setIsTestingVoice(false);
    }
  };

  // Save character
  const saveCharacter = async () => {
    try {
      const savedCharacter = {
        ...character,
        id: character.id || `friend_${Date.now()}`,
        updatedAt: new Date().toISOString()
      };

      // Save to localStorage for demo
      const savedFriends = JSON.parse(localStorage.getItem('ai_friends') || '[]');
      const existingIndex = savedFriends.findIndex((f: AIFriendCharacter) => f.id === savedCharacter.id);
      
      if (existingIndex >= 0) {
        savedFriends[existingIndex] = savedCharacter;
      } else {
        savedFriends.push(savedCharacter);
      }
      
      localStorage.setItem('ai_friends', JSON.stringify(savedFriends));
      localStorage.setItem('current_ai_friend', JSON.stringify(savedCharacter));

      // Update user preferences
      if (user) {
        setUser({
          ...user,
          preferences: {
            ...user.preferences,
            friendAge: character.age,
            currentAIFriend: savedCharacter.id
          }
        });
      }

      toast.success(`🎉 ${character.name} has been created and is ready to chat!`);
      
    } catch (error) {
      console.error('Failed to save character:', error);
      toast.error('Failed to save character. Please try again.');
    }
  };

  // Render step content
  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'basic':
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-lg font-bold text-gray-900 dark:text-white mb-4">
                What's your AI friend's name?
              </label>
              <input
                type="text"
                value={character.name}
                onChange={(e) => setCharacter(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter a name..."
                className="w-full px-6 py-4 text-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-gray-900 dark:text-white shadow-lg"
              />
            </div>

            <div>
              <label className="block text-lg font-bold text-gray-900 dark:text-white mb-4">
                Age Group
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: 'teen', label: 'Teen (13-17)', desc: 'Energetic & trendy' },
                  { id: 'young-adult', label: 'Young Adult (18-25)', desc: 'Ambitious & relatable' },
                  { id: 'adult', label: 'Adult (26-45)', desc: 'Mature & experienced' },
                  { id: 'elder', label: 'Elder (45+)', desc: 'Wise & nurturing' }
                ].map((age) => (
                  <motion.button
                    key={age.id}
                    onClick={() => setCharacter(prev => ({ ...prev, age: age.id as any }))}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      character.age === age.id
                        ? 'border-primary-500 bg-primary-500/20 text-primary-700 dark:text-primary-300'
                        : 'border-white/30 dark:border-gray-700/30 bg-white/60 dark:bg-gray-800/60 hover:border-primary-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-center">
                      <div className="font-bold text-lg mb-2">{age.label}</div>
                      <div className="text-sm opacity-75">{age.desc}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-lg font-bold text-gray-900 dark:text-white mb-4">
                Gender
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'female', label: 'Female', icon: '👩' },
                  { id: 'male', label: 'Male', icon: '👨' },
                  { id: 'non-binary', label: 'Non-binary', icon: '🧑' }
                ].map((gender) => (
                  <motion.button
                    key={gender.id}
                    onClick={() => setCharacter(prev => ({ ...prev, gender: gender.id as any }))}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      character.gender === gender.id
                        ? 'border-primary-500 bg-primary-500/20 text-primary-700 dark:text-primary-300'
                        : 'border-white/30 dark:border-gray-700/30 bg-white/60 dark:bg-gray-800/60 hover:border-primary-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{gender.icon}</div>
                      <div className="font-bold">{gender.label}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'personality':
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-lg font-bold text-gray-900 dark:text-white mb-4">
                Personality Traits
              </label>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Choose traits that define your AI friend's personality (select up to 5)
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {personalityTraits.map((trait) => {
                  const isSelected = character.personality.traits.includes(trait.id);
                  const Icon = trait.icon;
                  
                  return (
                    <motion.button
                      key={trait.id}
                      onClick={() => {
                        if (isSelected) {
                          setCharacter(prev => ({
                            ...prev,
                            personality: {
                              ...prev.personality,
                              traits: prev.personality.traits.filter(t => t !== trait.id)
                            }
                          }));
                        } else if (character.personality.traits.length < 5) {
                          setCharacter(prev => ({
                            ...prev,
                            personality: {
                              ...prev.personality,
                              traits: [...prev.personality.traits, trait.id]
                            }
                          }));
                        }
                      }}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        isSelected
                          ? 'border-primary-500 bg-primary-500/20 text-primary-700 dark:text-primary-300'
                          : 'border-white/30 dark:border-gray-700/30 bg-white/60 dark:bg-gray-800/60 hover:border-primary-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={!isSelected && character.personality.traits.length >= 5}
                    >
                      <div className="text-center">
                        <Icon className={`w-6 h-6 mx-auto mb-2 ${trait.color}`} />
                        <div className="font-bold text-sm">{trait.label}</div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { key: 'energy', label: 'Energy Level', icon: Zap, color: 'text-orange-500' },
                { key: 'empathy', label: 'Empathy', icon: Heart, color: 'text-pink-500' },
                { key: 'humor', label: 'Sense of Humor', icon: Smile, color: 'text-yellow-500' },
                { key: 'wisdom', label: 'Wisdom', icon: BookOpen, color: 'text-purple-500' }
              ].map((attr) => {
                const Icon = attr.icon;
                return (
                  <div key={attr.key} className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-6 h-6 ${attr.color}`} />
                      <label className="font-bold text-gray-900 dark:text-white">
                        {attr.label}
                      </label>
                      <span className="text-primary-500 font-bold">
                        {character.personality[attr.key as keyof typeof character.personality]}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={character.personality[attr.key as keyof typeof character.personality]}
                      onChange={(e) => setCharacter(prev => ({
                        ...prev,
                        personality: {
                          ...prev.personality,
                          [attr.key]: parseInt(e.target.value)
                        }
                      }))}
                      className="w-full h-3 bg-white/30 dark:bg-gray-700/30 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'voice':
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-lg font-bold text-gray-900 dark:text-white mb-4">
                Voice Tone
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {voiceTones.map((tone) => (
                  <motion.button
                    key={tone.id}
                    onClick={() => setCharacter(prev => ({
                      ...prev,
                      voice: { ...prev.voice, tone: tone.id as any }
                    }))}
                    className={`p-6 rounded-2xl border-2 transition-all text-left ${
                      character.voice.tone === tone.id
                        ? 'border-primary-500 bg-primary-500/20 text-primary-700 dark:text-primary-300'
                        : 'border-white/30 dark:border-gray-700/30 bg-white/60 dark:bg-gray-800/60 hover:border-primary-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-bold text-lg mb-2">{tone.label}</div>
                    <div className="text-sm opacity-75">{tone.description}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Volume2 className="w-6 h-6 text-blue-500" />
                  <label className="font-bold text-gray-900 dark:text-white">
                    Voice Pitch
                  </label>
                  <span className="text-primary-500 font-bold">
                    {character.voice.pitch}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={character.voice.pitch}
                  onChange={(e) => setCharacter(prev => ({
                    ...prev,
                    voice: { ...prev.voice, pitch: parseInt(e.target.value) }
                  }))}
                  className="w-full h-3 bg-white/30 dark:bg-gray-700/30 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Zap className="w-6 h-6 text-green-500" />
                  <label className="font-bold text-gray-900 dark:text-white">
                    Speaking Speed
                  </label>
                  <span className="text-primary-500 font-bold">
                    {character.voice.speed}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={character.voice.speed}
                  onChange={(e) => setCharacter(prev => ({
                    ...prev,
                    voice: { ...prev.voice, speed: parseInt(e.target.value) }
                  }))}
                  className="w-full h-3 bg-white/30 dark:bg-gray-700/30 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <motion.button
                onClick={testVoice}
                disabled={isTestingVoice}
                className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-xl font-bold disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isTestingVoice ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Testing Voice...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    <span>Test Voice</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-8">
            {Object.entries(appearanceOptions).map(([category, options]) => (
              <div key={category}>
                <label className="block text-lg font-bold text-gray-900 dark:text-white mb-4 capitalize">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {options.map((option) => (
                    <motion.button
                      key={option}
                      onClick={() => setCharacter(prev => ({
                        ...prev,
                        appearance: { ...prev.appearance, [category]: option }
                      }))}
                      className={`p-4 rounded-2xl border-2 transition-all capitalize ${
                        character.appearance[category as keyof typeof character.appearance] === option
                          ? 'border-primary-500 bg-primary-500/20 text-primary-700 dark:text-primary-300'
                          : 'border-white/30 dark:border-gray-700/30 bg-white/60 dark:bg-gray-800/60 hover:border-primary-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="font-bold text-sm">{option}</div>
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-center">
              <motion.button
                onClick={generateTavusAvatar}
                disabled={isGeneratingAvatar}
                className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-xl font-bold disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isGeneratingAvatar ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Generating Avatar...</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-5 h-5" />
                    <span>Generate Realistic Avatar</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        );

      case 'relationship':
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-lg font-bold text-gray-900 dark:text-white mb-4">
                Communication Style
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'friendly', label: 'Friendly & Casual', desc: 'Relaxed, informal conversations' },
                  { id: 'supportive', label: 'Supportive & Caring', desc: 'Focused on emotional support' },
                  { id: 'playful', label: 'Playful & Fun', desc: 'Light-hearted and entertaining' },
                  { id: 'intellectual', label: 'Intellectual & Deep', desc: 'Thoughtful, meaningful discussions' }
                ].map((style) => (
                  <motion.button
                    key={style.id}
                    onClick={() => setCharacter(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, communicationStyle: style.id }
                    }))}
                    className={`p-6 rounded-2xl border-2 transition-all text-left ${
                      character.preferences.communicationStyle === style.id
                        ? 'border-primary-500 bg-primary-500/20 text-primary-700 dark:text-primary-300'
                        : 'border-white/30 dark:border-gray-700/30 bg-white/60 dark:bg-gray-800/60 hover:border-primary-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-bold text-lg mb-2">{style.label}</div>
                    <div className="text-sm opacity-75">{style.desc}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-lg font-bold text-gray-900 dark:text-white mb-4">
                Check-in Frequency
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'daily', label: 'Daily', desc: 'Every day' },
                  { id: 'weekly', label: 'Weekly', desc: 'Once a week' },
                  { id: 'monthly', label: 'Monthly', desc: 'Once a month' }
                ].map((freq) => (
                  <motion.button
                    key={freq.id}
                    onClick={() => setCharacter(prev => ({
                      ...prev,
                      relationship: { ...prev.relationship, checkInFrequency: freq.id as any }
                    }))}
                    className={`p-6 rounded-2xl border-2 transition-all text-center ${
                      character.relationship.checkInFrequency === freq.id
                        ? 'border-primary-500 bg-primary-500/20 text-primary-700 dark:text-primary-300'
                        : 'border-white/30 dark:border-gray-700/30 bg-white/60 dark:bg-gray-800/60 hover:border-primary-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-bold text-lg mb-2">{freq.label}</div>
                    <div className="text-sm opacity-75">{freq.desc}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700/30">
                <div className="flex items-center space-x-4">
                  <Heart className="w-6 h-6 text-pink-500" />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">Mood Syncing</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Adapt expressions and tone based on your mood
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={() => setCharacter(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, moodSync: !prev.preferences.moodSync }
                  }))}
                  className={`relative w-16 h-8 rounded-full transition-all ${
                    character.preferences.moodSync ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                    animate={{ x: character.preferences.moodSync ? 36 : 4 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </div>

              <div className="flex items-center justify-between p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700/30">
                <div className="flex items-center space-x-4">
                  <MessageCircle className="w-6 h-6 text-blue-500" />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">Proactive Check-ins</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Your friend will reach out to you first sometimes
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={() => setCharacter(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, proactiveCheckIns: !prev.preferences.proactiveCheckIns }
                  }))}
                  className={`relative w-16 h-8 rounded-full transition-all ${
                    character.preferences.proactiveCheckIns ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                    animate={{ x: character.preferences.proactiveCheckIns ? 36 : 4 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </div>
            </div>
          </div>
        );

      case 'preview':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Meet {character.name || 'Your AI Friend'}!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Here's a preview of your AI friend. You can make final adjustments or save to start chatting!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Character Preview */}
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 border border-white/30 dark:border-gray-700/30">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-2xl">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt={character.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User className="w-16 h-16 text-white" />
                    )}
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {character.name || 'Unnamed Friend'}
                  </h4>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 capitalize">
                    {character.age.replace('-', ' ')} • {character.gender}
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {character.personality.traits.map((trait) => {
                      const traitInfo = personalityTraits.find(t => t.id === trait);
                      if (!traitInfo) return null;
                      const Icon = traitInfo.icon;
                      return (
                        <div key={trait} className={`flex items-center space-x-1 px-3 py-1 rounded-full bg-white/60 dark:bg-gray-700/60 ${traitInfo.color}`}>
                          <Icon className="w-4 h-4" />
                          <span className="text-sm font-medium capitalize">{trait}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Voice Tone:</span>
                      <span className="font-medium capitalize">{character.voice.tone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Communication:</span>
                      <span className="font-medium capitalize">{character.preferences.communicationStyle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Check-ins:</span>
                      <span className="font-medium capitalize">{character.relationship.checkInFrequency}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personality Stats */}
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 border border-white/30 dark:border-gray-700/30">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Personality Profile</h4>
                
                <div className="space-y-6">
                  {[
                    { key: 'energy', label: 'Energy Level', icon: Zap, color: 'text-orange-500' },
                    { key: 'empathy', label: 'Empathy', icon: Heart, color: 'text-pink-500' },
                    { key: 'humor', label: 'Humor', icon: Smile, color: 'text-yellow-500' },
                    { key: 'wisdom', label: 'Wisdom', icon: BookOpen, color: 'text-purple-500' }
                  ].map((attr) => {
                    const Icon = attr.icon;
                    const value = character.personality[attr.key as keyof typeof character.personality];
                    return (
                      <div key={attr.key} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Icon className={`w-5 h-5 ${attr.color}`} />
                            <span className="font-medium text-gray-900 dark:text-white">{attr.label}</span>
                          </div>
                          <span className="text-primary-500 font-bold">{value}%</span>
                        </div>
                        <div className="w-full bg-white/30 dark:bg-gray-700/30 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 pt-6 border-t border-white/20 dark:border-gray-700/20">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-gray-900 dark:text-white">Features</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Mood Syncing</span>
                      <div className={`w-3 h-3 rounded-full ${character.preferences.moodSync ? 'bg-green-500' : 'bg-gray-400'}`} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Proactive Check-ins</span>
                      <div className={`w-3 h-3 rounded-full ${character.preferences.proactiveCheckIns ? 'bg-green-500' : 'bg-gray-400'}`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <motion.button
                onClick={testVoice}
                disabled={isTestingVoice}
                className="flex items-center space-x-3 px-6 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all font-medium disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isTestingVoice ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                    <span>Testing...</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span>Test Voice</span>
                  </>
                )}
              </motion.button>

              <motion.button
                onClick={saveCharacter}
                className="flex items-center space-x-3 px-8 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl hover:from-primary-600 hover:to-accent-600 transition-all shadow-xl font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Save className="w-5 h-5" />
                <span>Create AI Friend</span>
              </motion.button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4 font-heading">
            AI Friend Designer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Create your perfect AI companion with realistic video and voice
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div key={step.id} className="flex items-center">
                  <motion.div
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isActive 
                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-xl' 
                        : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-white/60 dark:bg-gray-800/60 text-gray-400'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    animate={isActive ? { 
                      boxShadow: [
                        '0 0 0 0 rgba(93, 106, 255, 0.4)',
                        '0 0 0 10px rgba(93, 106, 255, 0)',
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </motion.div>
                  
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-4 rounded-full transition-all ${
                      isCompleted ? 'bg-green-500' : 'bg-white/30 dark:bg-gray-700/30'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          {renderStepContent()}
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between">
          <motion.button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="flex items-center space-x-2 px-6 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: currentStep > 0 ? 1.05 : 1 }}
            whileTap={{ scale: currentStep > 0 ? 0.95 : 1 }}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </motion.button>

          <motion.button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl hover:from-primary-600 hover:to-accent-600 transition-all shadow-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: currentStep < steps.length - 1 ? 1.05 : 1 }}
            whileTap={{ scale: currentStep < steps.length - 1 ? 0.95 : 1 }}
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AIFriendDesigner;