import { useState, useCallback, useRef } from 'react';
import { generateSpeech, streamSpeech, speakText, checkApiUsage } from '../services/elevenlabs';
import { detectUserLanguage } from '../services/gemini';
import toast from 'react-hot-toast';

export interface UseVoiceReturn {
  isPlaying: boolean;
  isRecording: boolean;
  currentLanguage: string;
  apiUsage: {charactersUsed: number, charactersLimit: number} | null;
  speak: (text: string, mode?: string, language?: string, gender?: string) => Promise<void>;
  startRecording: () => void;
  stopRecording: () => void;
  stopSpeaking: () => void;
  setLanguage: (language: string) => void;
  checkUsage: () => Promise<void>;
}

// Helper function to dispatch AI activity events
const dispatchAIActivity = (active: boolean) => {
  window.dispatchEvent(new CustomEvent('ai-activity', { detail: { active } }));
};

export function useVoice(): UseVoiceReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(detectUserLanguage());
  const [apiUsage, setApiUsage] = useState<{charactersUsed: number, charactersLimit: number} | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const currentAudioUrl = useRef<string | null>(null);

  const speak = useCallback(async (text: string, mode: string = 'general', language?: string, gender: string = 'female') => {
    const targetLanguage = language || currentLanguage;
    
    if (isPlaying) {
      stopSpeaking();
      await new Promise(resolve => setTimeout(resolve, 300)); // Slightly longer pause for natural flow
    }

    setIsPlaying(true);
    dispatchAIActivity(true); // Notify brain background of AI activity
    
    try {
      console.log(`🎤 Starting natural AI speech for ${mode} mode in ${targetLanguage} with ${gender} voice: "${text.substring(0, 50)}..."`);
      
      // Use enhanced AI-powered speech generation with gender support
      await streamSpeech(text, mode, targetLanguage, gender);
      
      console.log(`✅ Natural AI speech completed successfully for ${mode} mode in ${targetLanguage} with ${gender} voice`);
    } catch (error) {
      console.error('❌ AI speech error:', error);
      
      // Enhanced fallback with gender and language support
      try {
        console.log(`⚠️ Using enhanced browser speech synthesis for ${targetLanguage} with ${gender} voice`);
        await speakText(text, mode, targetLanguage, gender);
        console.log('✅ Enhanced browser speech completed');
      } catch (fallbackError) {
        console.error('❌ Enhanced browser speech error:', fallbackError);
        // Only show error for non-interruption errors
        if (!fallbackError.message.includes('interrupted')) {
          toast.error('Voice temporarily unavailable');
        }
      }
    } finally {
      setIsPlaying(false);
      dispatchAIActivity(false); // Notify brain background that AI activity ended
    }
  }, [isPlaying, currentLanguage]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100,
          channelCount: 1
        }
      });
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm;codecs=opus') 
          ? 'audio/webm;codecs=opus' 
          : 'audio/webm'
      });
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        console.log('🎤 Recording completed, audio blob size:', audioBlob.size);
        
        toast.success('🎤 Recording completed - Processing speech...');
        
        // Placeholder for speech-to-text integration with language detection
        // This would integrate with OpenAI Whisper or similar with language detection
        setTimeout(() => {
          toast.success(`Speech recognized in ${currentLanguage}! (Demo mode)`);
        }, 1500);
      };

      mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder error:', event);
        toast.error('Recording error occurred');
        setIsRecording(false);
        dispatchAIActivity(false);
      };

      mediaRecorder.start(250);
      setIsRecording(true);
      dispatchAIActivity(true); // Notify brain background of recording activity
      toast.success('🎤 Listening... Speak clearly!');
      
    } catch (error) {
      console.error('Recording error:', error);
      if (error.name === 'NotAllowedError') {
        toast.error('Microphone access denied. Please allow microphone access.');
      } else if (error.name === 'NotFoundError') {
        toast.error('No microphone found. Please connect a microphone.');
      } else {
        toast.error('Unable to access microphone. Please check your settings.');
      }
    }
  }, [currentLanguage]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      
      mediaRecorderRef.current.stream.getTracks().forEach(track => {
        track.stop();
      });
      
      setIsRecording(false);
      dispatchAIActivity(false); // Notify brain background that recording ended
      toast.success('🎤 Recording stopped');
    }
  }, [isRecording]);

  const stopSpeaking = useCallback(() => {
    // Stop HTML5 audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    // Clean up audio URL
    if (currentAudioUrl.current) {
      URL.revokeObjectURL(currentAudioUrl.current);
      currentAudioUrl.current = null;
    }
    
    // Stop Web Speech API
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    
    setIsPlaying(false);
    dispatchAIActivity(false); // Notify brain background that speaking ended
    toast.success('Voice playback stopped');
  }, []);

  const setLanguage = useCallback((language: string) => {
    setCurrentLanguage(language);
    console.log(`🌍 Language changed to: ${language}`);
  }, []);

  const checkUsage = useCallback(async () => {
    try {
      const usage = await checkApiUsage();
      setApiUsage(usage);
      
      if (usage) {
        const percentUsed = (usage.charactersUsed / usage.charactersLimit) * 100;
        console.log(`📊 ElevenLabs API usage: ${usage.charactersUsed}/${usage.charactersLimit} (${percentUsed.toFixed(1)}%)`);
        
        if (percentUsed > 90) {
          toast('⚠️ Voice API usage is near limit', {
            icon: '⚠️',
            style: {
              background: '#f59e0b',
              color: '#fff',
            },
          });
        }
      }
    } catch (error) {
      console.error('Failed to check API usage:', error);
    }
  }, []);

  return {
    isPlaying,
    isRecording,
    currentLanguage,
    apiUsage,
    speak,
    startRecording,
    stopRecording,
    stopSpeaking,
    setLanguage,
    checkUsage
  };
}