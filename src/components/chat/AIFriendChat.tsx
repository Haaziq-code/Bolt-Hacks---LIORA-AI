import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Heart, 
  Smile, 
  MessageCircle, 
  Settings,
  Camera,
  Phone,
  PhoneOff,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  User,
  Bot,
  Clock,
  Send,
  Pause,
  Play,
  Square
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useVoice } from '../../hooks/useVoice';
import { generateAIResponse } from '../../services/gemini';
import { getSecureApiKey } from '../../config/apiKeys';
import VoiceWaveform from '../ui/VoiceWaveform';
import LoadingSpinner from '../ui/LoadingSpinner';
import toast from 'react-hot-toast';

interface AIFriendCharacter {
  id: string;
  name: string;
  age: string;
  gender: string;
  personality: {
    traits: string[];
    energy: number;
    empathy: number;
    humor: number;
    wisdom: number;
  };
  voice: {
    tone: string;
    pitch: number;
    speed: number;
  };
  appearance: any;
  relationship: {
    level: number;
    memories: string[];
    milestones: string[];
    lastInteraction: string;
    checkInFrequency: string;
  };
  preferences: {
    moodSync: boolean;
    proactiveCheckIns: boolean;
    communicationStyle: string;
  };
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  emotion?: string;
  mood?: string;
}

const AIFriendChat: React.FC = () => {
  const { user } = useApp();
  const { speak, isPlaying, isRecording, startRecording, stopRecording, stopSpeaking } = useVoice();
  
  const [character, setCharacter] = useState<AIFriendCharacter | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [isVideoConnected, setIsVideoConnected] = useState(false);
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [currentMood, setCurrentMood] = useState<'happy' | 'sad' | 'neutral' | 'excited' | 'calm'>('neutral');
  const [relationshipLevel, setRelationshipLevel] = useState(0);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const [isPlayingMessage, setIsPlayingMessage] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Load AI friend character
  useEffect(() => {
    const loadCharacter = () => {
      try {
        const savedCharacter = localStorage.getItem('current_ai_friend');
        if (savedCharacter) {
          const parsed = JSON.parse(savedCharacter);
          setCharacter(parsed);
          setRelationshipLevel(parsed.relationship?.level || 0);
          
          // Load conversation history
          const chatHistory = localStorage.getItem(`chat_history_${parsed.id}`);
          if (chatHistory) {
            setMessages(JSON.parse(chatHistory));
          } else {
            // Send initial greeting
            sendInitialGreeting(parsed);
          }
        }
      } catch (error) {
        console.error('Failed to load AI friend:', error);
        toast.error('Failed to load your AI friend');
      }
    };

    loadCharacter();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Save conversation history
  useEffect(() => {
    if (character && messages.length > 0) {
      localStorage.setItem(`chat_history_${character.id}`, JSON.stringify(messages));
    }
  }, [messages, character]);

  // Send initial greeting
  const sendInitialGreeting = async (char: AIFriendCharacter) => {
    const greetings = {
      teen: `Hey! I'm ${char.name}! 😊 I'm so excited to be your AI friend! What's up?`,
      'young-adult': `Hi there! I'm ${char.name}, your new AI companion. I'm really looking forward to getting to know you better!`,
      adult: `Hello! I'm ${char.name}. I'm here as your AI friend and I'm genuinely excited to start this journey with you.`,
      elder: `Greetings, dear friend. I'm ${char.name}, and I'm honored to be your AI companion. How are you feeling today?`
    };

    const greeting = greetings[char.age as keyof typeof greetings] || greetings['young-adult'];
    
    const greetingMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content: greeting,
      timestamp: new Date().toISOString(),
      emotion: 'happy',
      mood: 'welcoming'
    };

    setMessages([greetingMessage]);
    
    // Speak the greeting with gender-appropriate voice
    try {
      setIsPlayingMessage(greetingMessage.id);
      await speak(greeting, 'friend', undefined, char.gender);
      setIsPlayingMessage(null);
    } catch (error) {
      console.error('Failed to speak greeting:', error);
      setIsPlayingMessage(null);
    }
  };

  // Enhanced AI response generation with character personality
  const generatePersonalizedResponse = async (userMessage: string): Promise<string> => {
    if (!character) return "I'm sorry, I couldn't process that right now.";

    // Build personality-aware prompt
    const personalityPrompt = `You are ${character.name}, an AI friend with the following characteristics:

Age: ${character.age}
Gender: ${character.gender}
Personality traits: ${character.personality.traits.join(', ')}
Energy level: ${character.personality.energy}%
Empathy level: ${character.personality.empathy}%
Humor level: ${character.personality.humor}%
Wisdom level: ${character.personality.wisdom}%

Communication style: ${character.preferences.communicationStyle}
Current relationship level: ${relationshipLevel}%

Remember these conversation topics: ${conversationContext.slice(-5).join(', ')}

IMPORTANT: Your response must be directly relevant to what the user just said. Always acknowledge their message and respond appropriately to their specific question or statement.

Respond as this character would, maintaining consistency with their personality traits and relationship level. Be natural, engaging, and remember details from our conversation.`;

    try {
      const response = await generateAIResponse(
        userMessage,
        'friend',
        [
          { role: 'system', content: personalityPrompt },
          ...messages.slice(-6).map(msg => ({ role: msg.role, content: msg.content })),
          { role: 'user', content: userMessage }
        ]
      );

      // Update relationship level based on interaction
      setRelationshipLevel(prev => Math.min(100, prev + 1));
      
      // Add to conversation context
      setConversationContext(prev => [...prev.slice(-10), userMessage].filter(Boolean));

      return response;
    } catch (error) {
      console.error('Failed to generate personalized response:', error);
      return "I'm having trouble thinking right now. Could you try saying that again?";
    }
  };

  // Send message
  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading || !character) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await generatePersonalizedResponse(inputValue.trim());
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
        emotion: detectEmotion(response),
        mood: currentMood
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Speak the response with character's gender-appropriate voice
      try {
        setIsPlayingMessage(assistantMessage.id);
        await speak(response, 'friend', undefined, character.gender);
        setIsPlayingMessage(null);
      } catch (speechError) {
        console.error('Speech error:', speechError);
        setIsPlayingMessage(null);
      }

      // Update character's last interaction
      if (character) {
        const updatedCharacter = {
          ...character,
          relationship: {
            ...character.relationship,
            lastInteraction: new Date().toISOString(),
            level: relationshipLevel
          }
        };
        localStorage.setItem('current_ai_friend', JSON.stringify(updatedCharacter));
      }

    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  // Detect emotion from message
  const detectEmotion = (text: string): string => {
    const emotions = {
      happy: ['happy', 'joy', 'excited', 'great', 'wonderful', 'amazing', '😊', '😄', '🎉'],
      sad: ['sad', 'sorry', 'unfortunately', 'difficult', 'hard', '😢', '😞'],
      excited: ['excited', 'awesome', 'fantastic', 'incredible', 'wow', '🎉', '✨'],
      calm: ['calm', 'peaceful', 'relax', 'gentle', 'soothing', '😌'],
      empathetic: ['understand', 'feel', 'support', 'here for you', 'listen', '💙', '❤️']
    };

    const lowerText = text.toLowerCase();
    for (const [emotion, keywords] of Object.entries(emotions)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        return emotion;
      }
    }
    return 'neutral';
  };

  // Start video chat with Tavus
  const startVideoChat = async () => {
    if (!character) return;
    
    setIsVideoMode(true);
    
    try {
      const apiKey = getSecureApiKey('tavus') as string;
      
      if (!apiKey || apiKey === 'your_tavus_api_key_here') {
        // Demo mode
        setTimeout(() => {
          setIsVideoConnected(true);
          toast.success('🎥 Demo video chat started!');
        }, 2000);
        return;
      }

      // Start Tavus conversation
      const response = await fetch('https://tavusapi.com/v2/conversations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          persona_id: character.id,
          participant_name: user?.name || 'Friend',
          conversation_config: {
            participant_role: 'human',
            ai_name: character.name,
            ai_role: 'AI Friend',
            conversation_style: character.preferences.communicationStyle,
            emotional_intelligence: true,
            mood_sync: character.preferences.moodSync
          }
        })
      });

      if (response.ok) {
        const conversation = await response.json();
        setIsVideoConnected(true);
        toast.success(`🎥 Video chat with ${character.name} started!`);
      } else {
        throw new Error('Failed to start video chat');
      }
      
    } catch (error) {
      console.error('Video chat failed:', error);
      // Fallback to demo mode
      setTimeout(() => {
        setIsVideoConnected(true);
        toast.success('🎥 Demo video chat started!');
      }, 1000);
    }
  };

  // End video chat
  const endVideoChat = () => {
    setIsVideoMode(false);
    setIsVideoConnected(false);
    setIsVideoExpanded(false);
    toast.success('Video chat ended');
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Stop speaking current message
  const stopCurrentSpeaking = () => {
    stopSpeaking();
    setIsPlayingMessage(null);
  };

  // Play specific message
  const playMessage = async (message: ChatMessage) => {
    if (message.role !== 'assistant' || !character) return;
    
    if (isPlayingMessage) {
      stopSpeaking();
      setIsPlayingMessage(null);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    try {
      setIsPlayingMessage(message.id);
      await speak(message.content, 'friend', undefined, character.gender);
      setIsPlayingMessage(null);
    } catch (error) {
      console.error('Failed to play message:', error);
      setIsPlayingMessage(null);
    }
  };

  if (!character) {
    return (
      <div className="min-h-screen bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            No AI Friend Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Create your AI friend first to start chatting
          </p>
          <button
            onClick={() => window.location.href = '/ai-friend-designer'}
            className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl hover:from-primary-600 hover:to-accent-600 transition-all shadow-xl font-bold"
          >
            Create AI Friend
          </button>
        </div>
      </div>
    );
  }

  // Get avatar URL based on gender for video chat
  const getAvatarForVideoChat = () => {
    // Beautiful, realistic avatars for video chat
    const avatars = {
      female: [
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
        'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1'
      ],
      male: [
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
        'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1'
      ],
      'non-binary': [
        'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1'
      ]
    };
    
    const genderAvatars = avatars[character.gender as keyof typeof avatars] || avatars.female;
    const randomIndex = Math.floor(Math.random() * genderAvatars.length);
    return genderAvatars[randomIndex];
  };

  return (
    <div className="min-h-screen bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/20 dark:border-gray-700/20 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-xl overflow-hidden">
            {character.appearance?.avatarUrl ? (
              <img 
                src={character.appearance.avatarUrl} 
                alt={character.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-6 h-6 text-white" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {character.name}
            </h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Online • Relationship Level {relationshipLevel}%
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Video Toggle */}
          <motion.button
            onClick={isVideoConnected ? endVideoChat : startVideoChat}
            className={`p-3 rounded-xl transition-all ${
              isVideoConnected 
                ? 'bg-red-500 text-white' 
                : 'bg-white/60 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-gray-800/80'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isVideoConnected ? <PhoneOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </motion.button>

          {/* Voice Toggle */}
          <motion.button
            onClick={isPlaying ? stopSpeaking : () => {}}
            className={`p-3 rounded-xl transition-all ${
              isPlaying 
                ? 'bg-green-500 text-white' 
                : 'bg-white/60 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-gray-800/80'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <Square className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </motion.button>

          {/* Settings */}
          <motion.button
            className="p-3 rounded-xl bg-white/60 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Area */}
          <AnimatePresence>
            {isVideoMode && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isVideoExpanded ? 400 : 200, opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden"
              >
                {isVideoConnected ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl overflow-hidden">
                        <img 
                          src={getAvatarForVideoChat()} 
                          alt={character.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{character.name}</h3>
                      <p className="text-white/70">Video chat active</p>
                      <div className="mt-4">
                        <VoiceWaveform isActive={isPlaying || isLoading} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <LoadingSpinner size="lg" color="text-white" />
                      <p className="mt-4">Connecting to {character.name}...</p>
                    </div>
                  </div>
                )}

                {/* Video Controls */}
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <motion.button
                    onClick={() => setIsVideoExpanded(!isVideoExpanded)}
                    className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isVideoExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs md:max-w-md lg:max-w-lg ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-start space-x-3 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {/* Avatar */}
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                        message.role === 'user' 
                          ? 'bg-gradient-to-r from-primary-500 to-accent-500' 
                          : 'bg-gradient-to-r from-pink-500 to-rose-500'
                      }`}>
                        {message.role === 'user' ? (
                          <User className="w-5 h-5 text-white" />
                        ) : (
                          <Bot className="w-5 h-5 text-white" />
                        )}
                      </div>

                      {/* Message */}
                      <div className={`flex-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block px-6 py-4 rounded-2xl shadow-lg backdrop-blur-sm border ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white border-white/20'
                            : 'bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white border-white/30 dark:border-gray-700/30'
                        }`}>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        </div>
                        
                        {/* Timestamp and Actions */}
                        <div className={`flex items-center space-x-2 mt-2 text-xs text-gray-500 dark:text-gray-400 ${
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}>
                          <div className="flex items-center space-x-2 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-full px-3 py-1">
                            <Clock className="w-3 h-3" />
                            <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          
                          {message.role === 'assistant' && (
                            <>
                              {isPlayingMessage === message.id ? (
                                <motion.button 
                                  onClick={stopCurrentSpeaking}
                                  className="p-2 bg-white/60 dark:bg-gray-700/60 rounded-full hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all text-primary-500"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Square className="w-3 h-3" />
                                </motion.button>
                              ) : (
                                <motion.button 
                                  onClick={() => playMessage(message)}
                                  className="p-2 bg-white/60 dark:bg-gray-700/60 rounded-full hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Volume2 className="w-3 h-3" />
                                </motion.button>
                              )}
                            </>
                          )}
                          
                          {message.emotion && (
                            <span className="px-2 py-1 bg-white/60 dark:bg-gray-700/60 rounded-full text-xs capitalize">
                              {message.emotion}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div 
                className="flex items-center space-x-3 text-gray-500 dark:text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <LoadingSpinner size="sm" />
                <span className="text-sm">{character.name} is thinking...</span>
                <VoiceWaveform isActive={true} bars={3} />
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-white/30 dark:border-gray-700/30">
            <div className="flex items-center space-x-4">
              {/* Voice Recording */}
              <motion.button
                onClick={isRecording ? stopRecording : startRecording}
                className={`p-3 rounded-xl transition-all ${
                  isRecording
                    ? 'bg-red-500 text-white shadow-red-500/25'
                    : 'bg-white/60 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-gray-800/80'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </motion.button>

              {/* Text Input */}
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Message ${character.name}...`}
                  className="w-full px-6 py-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 text-gray-900 dark:text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 placeholder-gray-500 dark:placeholder-gray-400"
                  disabled={isLoading}
                />
                {isRecording && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <VoiceWaveform isActive={true} />
                  </div>
                )}
              </div>

              {/* Send Button */}
              <motion.button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="p-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl hover:from-pink-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" color="text-white" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Sidebar - Character Info */}
        <div className="w-80 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-l border-white/30 dark:border-gray-700/30 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Character Profile */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl overflow-hidden">
                {character.appearance?.avatarUrl ? (
                  <img 
                    src={character.appearance.avatarUrl} 
                    alt={character.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-white" />
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {character.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 capitalize">
                {character.age.replace('-', ' ')} • {character.gender}
              </p>
            </div>

            {/* Relationship Level */}
            <div className="bg-white/60 dark:bg-gray-700/60 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900 dark:text-white">Relationship</span>
                <span className="text-primary-500 font-bold">{relationshipLevel}%</span>
              </div>
              <div className="w-full bg-white/30 dark:bg-gray-600/30 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${relationshipLevel}%` }}
                />
              </div>
            </div>

            {/* Personality Traits */}
            <div className="bg-white/60 dark:bg-gray-700/60 rounded-2xl p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">Personality</h4>
              <div className="flex flex-wrap gap-2">
                {character.personality.traits.map((trait) => (
                  <span 
                    key={trait}
                    className="px-3 py-1 bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-pink-700 dark:text-pink-300 rounded-full text-sm font-medium capitalize"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Mood Indicator */}
            <div className="bg-white/60 dark:bg-gray-700/60 rounded-2xl p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">Current Mood</h4>
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentMood === 'happy' ? 'bg-yellow-500' :
                  currentMood === 'excited' ? 'bg-orange-500' :
                  currentMood === 'calm' ? 'bg-blue-500' :
                  currentMood === 'sad' ? 'bg-gray-500' :
                  'bg-green-500'
                }`}>
                  {currentMood === 'happy' && <Smile className="w-4 h-4 text-white" />}
                  {currentMood === 'excited' && <Sparkles className="w-4 h-4 text-white" />}
                  {currentMood === 'calm' && <Heart className="w-4 h-4 text-white" />}
                  {currentMood === 'sad' && <User className="w-4 h-4 text-white" />}
                  {currentMood === 'neutral' && <MessageCircle className="w-4 h-4 text-white" />}
                </div>
                <span className="capitalize font-medium text-gray-900 dark:text-white">
                  {currentMood}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <motion.button
                onClick={() => setCurrentMood('happy')}
                className="w-full p-3 bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 rounded-xl hover:bg-yellow-500/30 transition-all font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                😊 I'm feeling happy
              </motion.button>
              
              <motion.button
                onClick={() => setCurrentMood('sad')}
                className="w-full p-3 bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-500/30 transition-all font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                😢 I need support
              </motion.button>
              
              <motion.button
                onClick={() => setCurrentMood('excited')}
                className="w-full p-3 bg-orange-500/20 text-orange-700 dark:text-orange-300 rounded-xl hover:bg-orange-500/30 transition-all font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                🎉 I'm excited!
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFriendChat;