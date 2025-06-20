import { useState, useCallback, useRef, useEffect } from 'react';
import { ChatMessage, ChatSession, AIMode } from '../types';
import { generateAIResponse, getPersonalityGreeting, detectUserLanguage, detectInputLanguage } from '../services/gemini';
import { saveSession, saveMessage, getMessages } from '../services/supabase';
import { useVoice } from './useVoice';
import toast from 'react-hot-toast';

export interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  currentSession: ChatSession | null;
  currentLanguage: string;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
  loadSession: (session: ChatSession) => void;
  initializeChat: () => void;
  setLanguage: (language: string) => void;
}

// Helper function to dispatch AI activity events
const dispatchAIActivity = (active: boolean) => {
  window.dispatchEvent(new CustomEvent('ai-activity', { detail: { active } }));
};

export function useChat(mode: AIMode): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState(detectUserLanguage());
  const conversationHistory = useRef<Array<{role: 'user' | 'assistant' | 'system', content: string}>>([]);
  const { speak, setLanguage: setVoiceLanguage } = useVoice();
  const hasInitialized = useRef(false);
  const hasLoadedFromMemory = useRef(false);

  // Load chat history from Supabase on mount - but only if user wants data saved
  useEffect(() => {
    const loadChatHistory = async () => {
      if (hasLoadedFromMemory.current) return;
      
      // Check if user wants data saved (default to true for backward compatibility)
      const userPreferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
      const saveData = userPreferences.saveData !== false;
      
      if (!saveData) {
        console.log('🔒 Data saving disabled - starting fresh session');
        hasLoadedFromMemory.current = true;
        return;
      }
      
      try {
        const savedMessages = await getMessages();
        if (savedMessages.length > 0) {
          const chatMessages: ChatMessage[] = savedMessages.map(msg => ({
            id: msg.id,
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.content,
            timestamp: msg.timestamp,
            mode: mode,
            language: currentLanguage
          }));
          
          setMessages(chatMessages);
          conversationHistory.current = chatMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          }));
          hasInitialized.current = true;
          hasLoadedFromMemory.current = true;
          console.log('🔒 Loaded chat history from secure storage:', chatMessages);
        }
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }
    };

    loadChatHistory();
  }, [mode, currentLanguage]);

  const initializeChat = useCallback(async () => {
    if (hasInitialized.current || hasLoadedFromMemory.current) return;
    
    const greeting = getPersonalityGreeting(mode, currentLanguage);
    const greetingMessage: ChatMessage = {
      id: 'greeting-' + Date.now(),
      role: 'assistant',
      content: greeting,
      timestamp: new Date().toISOString(),
      mode,
      language: currentLanguage
    };

    setMessages([greetingMessage]);
    conversationHistory.current = [{ role: 'assistant', content: greeting }];
    hasInitialized.current = true;

    // Save greeting only if user wants data saved
    const userPreferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    const saveData = userPreferences.saveData !== false;
    
    if (saveData) {
      try {
        await saveMessage({ sender: 'ai', content: greeting });
      } catch (error) {
        console.error('Failed to save greeting:', error);
      }
    }
  }, [mode, currentLanguage]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Auto-detect language from user input
    const detectedLanguage = detectInputLanguage(content);
    console.log(`🌍 User message language detected as: ${detectedLanguage}`);
    
    // Update language if different from current
    if (detectedLanguage !== currentLanguage) {
      console.log(`🌍 Switching language from ${currentLanguage} to ${detectedLanguage}`);
      setCurrentLanguage(detectedLanguage);
      setVoiceLanguage(detectedLanguage);
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString(),
      mode,
      language: detectedLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    dispatchAIActivity(true); // Notify brain background of AI thinking

    // Add to conversation history
    conversationHistory.current.push({ role: 'user', content: content.trim() });

    // Save user message only if user wants data saved
    const userPreferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    const saveData = userPreferences.saveData !== false;
    
    if (saveData) {
      try {
        await saveMessage({ sender: 'user', content: content.trim() });
      } catch (error) {
        console.error('Failed to save user message:', error);
      }
    }

    try {
      // Generate AI response with conversation context and language support using Gemini
      console.log(`🤖 Generating natural, human-like AI response in ${detectedLanguage}...`);
      const aiResponse = await generateAIResponse(
        content.trim(), 
        mode, 
        conversationHistory.current,
        detectedLanguage
      );

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString(),
        mode,
        language: detectedLanguage
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Add to conversation history
      conversationHistory.current.push({ role: 'assistant', content: aiResponse });

      // Save AI response only if user wants data saved
      if (saveData) {
        try {
          await saveMessage({ sender: 'ai', content: aiResponse });
        } catch (error) {
          console.error('Failed to save AI message:', error);
        }
      }

      // Get user gender preference for voice
      const userGender = userPreferences?.gender || 'female';

      // Speak the response with language and gender support
      try {
        await speak(aiResponse, mode, detectedLanguage, userGender);
      } catch (speechError) {
        console.error('Speech error:', speechError);
      }

      // Save session only if user wants data saved
      if (saveData) {
        const session: ChatSession = {
          id: currentSession?.id || Date.now().toString(),
          title: currentSession?.title || generateSessionTitle(content),
          mode,
          messages: [...messages, userMessage, assistantMessage],
          createdAt: currentSession?.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          language: detectedLanguage
        };

        setCurrentSession(session);
        
        try {
          await saveSession(session);
        } catch (saveError) {
          console.error('Failed to save session:', saveError);
          // Don't show error to user for save issues in demo mode
        }
      }

    } catch (error) {
      console.error('🔒 Gemini chat error:', error);
      toast.error('Failed to get AI response. Please try again.');
      
      // Remove the user message if AI response failed
      setMessages(prev => prev.slice(0, -1));
      conversationHistory.current.pop();
    } finally {
      setIsLoading(false);
      dispatchAIActivity(false); // Notify brain background that AI thinking ended
    }
  }, [mode, messages, currentSession, isLoading, speak, currentLanguage, setVoiceLanguage]);

  const clearChat = useCallback(async () => {
    setMessages([]);
    setCurrentSession(null);
    conversationHistory.current = [];
    hasInitialized.current = false;
    hasLoadedFromMemory.current = false;

    // Clear messages from Supabase only if user wants data saved
    const userPreferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    const saveData = userPreferences.saveData !== false;
    
    if (saveData) {
      try {
        const { clearMessages } = await import('../services/supabase');
        await clearMessages();
        console.log('🔒 Chat memory cleared from secure storage');
      } catch (error) {
        console.error('Failed to clear chat memory:', error);
      }
    }
  }, []);

  const loadSession = useCallback((session: ChatSession) => {
    setMessages(session.messages);
    setCurrentSession(session);
    conversationHistory.current = session.messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));
    hasInitialized.current = true;
    hasLoadedFromMemory.current = true;
    
    // Set language from session if available
    if (session.language) {
      setCurrentLanguage(session.language);
      setVoiceLanguage(session.language);
    }
  }, [setVoiceLanguage]);

  const setLanguage = useCallback((language: string) => {
    console.log(`🌍 Chat language changing from ${currentLanguage} to ${language}`);
    setCurrentLanguage(language);
    setVoiceLanguage(language);
    
    // Update all existing messages with new language
    setMessages(prev => prev.map(msg => ({
      ...msg,
      language: language
    })));
    
    // Clear chat and reinitialize with new language
    conversationHistory.current = [];
    hasInitialized.current = false;
    hasLoadedFromMemory.current = false;
    
    // Reinitialize chat with new language
    setTimeout(() => {
      initializeChat();
    }, 100);
    
    console.log(`✅ Chat language changed to: ${language}`);
  }, [currentLanguage, setVoiceLanguage, initializeChat]);

  return {
    messages,
    isLoading,
    currentSession,
    currentLanguage,
    sendMessage,
    clearChat,
    loadSession,
    initializeChat,
    setLanguage
  };
}

function generateSessionTitle(firstMessage: string): string {
  const words = firstMessage.split(' ').slice(0, 4);
  return words.join(' ') + (firstMessage.split(' ').length > 4 ? '...' : '');
}