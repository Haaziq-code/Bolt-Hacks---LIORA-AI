import { getSecureApiKey } from '../config/apiKeys';

export interface VoiceSettings {
  stability: number;
  similarity_boost: number;
  style: number;
  use_speaker_boost: boolean;
}

// Enhanced multilingual voice mapping with native speakers
export const multilingualVoices = {
  en: {
    coach: 'pNInz6obpgDQGcFmaJgB', // Adam - energetic English
    therapist: 'EXAVITQu4vr4xnSDxMaL', // Bella - calm English
    tutor: '21m00Tcm4TlvDq8ikWAM', // Rachel - clear English
    general: 'AZnzlk1XvdvUeBnXmlld' // Domi - friendly English
  },
  zh: {
    coach: 'XrExE9yKIg1WjnnlVkGX', // Mandarin energetic
    therapist: 'ThT5KcBeYPX3keUQqHPh', // Mandarin calm
    tutor: 'SOYHLrjzK2X1ezoPC6cr', // Mandarin clear
    general: 'XrExE9yKIg1WjnnlVkGX' // Mandarin friendly
  },
  hi: {
    coach: 'pqHfZKP75CvOlQylNhV4', // Hindi energetic
    therapist: 'IKne3meq5aSn9XLyUdCD', // Hindi calm
    tutor: 'bIHbv24MWmeRgasZH58o', // Hindi clear
    general: 'pqHfZKP75CvOlQylNhV4' // Hindi friendly
  },
  es: {
    coach: 'VR6AewLTigWG4xSOukaG', // Spanish energetic
    therapist: 'jsCqWAovK2LkecY7zXl4', // Spanish calm
    tutor: 'jBpfuIE2acCO8z3wKNLl', // Spanish clear
    general: 'VR6AewLTigWG4xSOukaG' // Spanish friendly
  },
  fr: {
    coach: 'cgSgspJ2msm6clMCkdW9', // French energetic
    therapist: 'cgSgspJ2msm6clMCkdW9', // French calm
    tutor: 'cgSgspJ2msm6clMCkdW9', // French clear
    general: 'cgSgspJ2msm6clMCkdW9' // French friendly
  },
  ar: {
    coach: 'cgSgspJ2msm6clMCkdW9', // Arabic energetic
    therapist: 'cgSgspJ2msm6clMCkdW9', // Arabic calm
    tutor: 'cgSgspJ2msm6clMCkdW9', // Arabic clear
    general: 'cgSgspJ2msm6clMCkdW9' // Arabic friendly
  },
  bn: {
    coach: 'cgSgspJ2msm6clMCkdW9', // Bengali energetic
    therapist: 'cgSgspJ2msm6clMCkdW9', // Bengali calm
    tutor: 'cgSgspJ2msm6clMCkdW9', // Bengali clear
    general: 'cgSgspJ2msm6clMCkdW9' // Bengali friendly
  },
  ru: {
    coach: 'cgSgspJ2msm6clMCkdW9', // Russian energetic
    therapist: 'cgSgspJ2msm6clMCkdW9', // Russian calm
    tutor: 'cgSgspJ2msm6clMCkdW9', // Russian clear
    general: 'cgSgspJ2msm6clMCkdW9' // Russian friendly
  },
  pt: {
    coach: 'cgSgspJ2msm6clMCkdW9', // Portuguese energetic
    therapist: 'cgSgspJ2msm6clMCkdW9', // Portuguese calm
    tutor: 'cgSgspJ2msm6clMCkdW9', // Portuguese clear
    general: 'cgSgspJ2msm6clMCkdW9' // Portuguese friendly
  },
  ur: {
    coach: 'cgSgspJ2msm6clMCkdW9', // Urdu energetic
    therapist: 'cgSgspJ2msm6clMCkdW9', // Urdu calm
    tutor: 'cgSgspJ2msm6clMCkdW9', // Urdu clear
    general: 'cgSgspJ2msm6clMCkdW9' // Urdu friendly
  }
};

// Enhanced voice settings for more natural, human-like speech
export const naturalVoiceSettings = {
  coach: {
    stability: 0.4, // More variation for energy
    similarity_boost: 0.9,
    style: 0.8, // High expressiveness
    use_speaker_boost: true
  },
  therapist: {
    stability: 0.8, // Stable and calming
    similarity_boost: 0.95,
    style: 0.2, // Gentle and soothing
    use_speaker_boost: true
  },
  tutor: {
    stability: 0.6, // Clear but engaging
    similarity_boost: 0.85,
    style: 0.5, // Balanced engagement
    use_speaker_boost: true
  },
  general: {
    stability: 0.5, // Natural conversation
    similarity_boost: 0.8,
    style: 0.4, // Friendly and approachable
    use_speaker_boost: true
  }
};

// Check if ElevenLabs API key is configured using secure configuration
function isElevenLabsConfigured(): boolean {
  try {
    const apiKey = getSecureApiKey('elevenlabs') as string;
    return !!(apiKey && apiKey.startsWith('sk_') && apiKey !== 'your_elevenlabs_api_key_here');
  } catch (error) {
    console.error('🔒 Failed to access secure ElevenLabs API key:', error);
    return false;
  }
}

// Get voice ID based on language and mode
function getVoiceForLanguageAndMode(language: string, mode: string): string {
  const langVoices = multilingualVoices[language as keyof typeof multilingualVoices];
  if (langVoices) {
    return langVoices[mode as keyof typeof langVoices] || langVoices.general;
  }
  // Fallback to English
  const englishVoices = multilingualVoices.en;
  return englishVoices[mode as keyof typeof englishVoices] || englishVoices.general;
}

// Enhanced AI-powered voice generation with multilingual support
export async function generateSpeech(
  text: string, 
  mode: string = 'general',
  language: string = 'en',
  settings?: VoiceSettings
): Promise<string | null> {
  try {
    if (!isElevenLabsConfigured()) {
      console.log('🔊 ElevenLabs API key not configured - using browser speech synthesis');
      return null; // Return null to trigger fallback
    }

    const apiKey = getSecureApiKey('elevenlabs') as string;
    const voiceId = getVoiceForLanguageAndMode(language, mode);
    const voiceSettings = settings || naturalVoiceSettings[mode as keyof typeof naturalVoiceSettings] || naturalVoiceSettings.general;

    console.log(`🎤 Generating speech for ${mode} mode in ${language} with voice ${voiceId}`);

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey
      },
      body: JSON.stringify({
        text: text.trim(),
        model_id: 'eleven_multilingual_v2',
        voice_settings: voiceSettings,
        optimize_streaming_latency: 2,
        output_format: 'mp3_44100_128'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { detail: { message: errorText } };
      }

      // Handle specific error cases
      if (response.status === 401) {
        if (errorData.detail?.status === 'quota_exceeded') {
          console.warn('⚠️ ElevenLabs quota exceeded - falling back to browser speech');
          return null; // Trigger fallback instead of throwing
        } else {
          console.warn('⚠️ ElevenLabs API authentication failed - falling back to browser speech');
          return null; // Trigger fallback instead of throwing
        }
      }

      console.warn(`⚠️ ElevenLabs API error ${response.status}: ${errorData.detail?.message || errorText} - falling back to browser speech`);
      return null; // Always return null to trigger fallback instead of throwing
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    
    console.log(`✅ Successfully generated speech for ${mode} mode in ${language}`);
    return audioUrl;
  } catch (error) {
    console.warn('⚠️ ElevenLabs speech generation failed - falling back to browser speech:', error);
    return null; // Return null to trigger fallback instead of throwing
  }
}

// Enhanced streaming speech with natural playback
export async function streamSpeech(text: string, mode: string = 'general', language: string = 'en'): Promise<void> {
  try {
    console.log(`🎯 Starting speech for ${mode} mode in ${language}`);
    
    // Try ElevenLabs first
    const audioUrl = await generateSpeech(text, mode, language);
    
    if (audioUrl) {
      await playAudio(audioUrl);
      console.log(`🔊 ElevenLabs speech playback completed for ${mode} mode in ${language}`);
    } else {
      // Fallback to browser speech synthesis
      console.log(`🔊 Using browser speech synthesis for ${mode} mode in ${language}`);
      await speakText(text, mode, language);
    }
  } catch (error) {
    console.warn('⚠️ Speech stream error, trying fallback:', error);
    // Final fallback to browser speech synthesis
    try {
      await speakText(text, mode, language);
    } catch (fallbackError) {
      console.error('❌ All speech synthesis methods failed:', fallbackError);
      throw new Error('Speech synthesis unavailable');
    }
  }
}

export async function playAudio(audioUrl: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const audio = new Audio(audioUrl);
    
    audio.preload = 'auto';
    audio.volume = 0.9;
    
    audio.onended = () => {
      URL.revokeObjectURL(audioUrl);
      resolve();
    };
    
    audio.onerror = (error) => {
      console.error('🔊 Audio playback error:', error);
      URL.revokeObjectURL(audioUrl);
      reject(new Error('Audio playback failed'));
    };
    
    audio.oncanplaythrough = () => {
      audio.play().catch(reject);
    };
    
    setTimeout(() => {
      if (audio.readyState < 2) {
        reject(new Error('Audio loading timeout'));
      }
    }, 10000);
    
    audio.load();
  });
}

// Enhanced fallback with multilingual browser speech synthesis
export function speakText(text: string, mode: string = 'general', language: string = 'en'): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('Speech synthesis not supported'));
      return;
    }

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Enhanced language mapping
    const languageMap: Record<string, string> = {
      'en': 'en-US',
      'zh': 'zh-CN',
      'hi': 'hi-IN',
      'es': 'es-ES',
      'fr': 'fr-FR',
      'ar': 'ar-SA',
      'bn': 'bn-BD',
      'ru': 'ru-RU',
      'pt': 'pt-BR',
      'ur': 'ur-PK'
    };
    
    utterance.lang = languageMap[language] || 'en-US';
    
    // Enhanced personality differences for more natural speech
    switch (mode) {
      case 'coach':
        utterance.rate = 1.1;
        utterance.pitch = 1.2;
        utterance.volume = 0.95;
        break;
      case 'therapist':
        utterance.rate = 0.8;
        utterance.pitch = 0.9;
        utterance.volume = 0.8;
        break;
      case 'tutor':
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 0.9;
        break;
      default:
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 0.85;
    }

    utterance.onend = () => resolve();
    utterance.onerror = (event) => {
      console.error(`Speech synthesis error: ${event.error}`);
      reject(new Error(`Speech synthesis error: ${event.error}`));
    };

    // Try to find a voice that matches the language
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => voice.lang.startsWith(language));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    speechSynthesis.speak(utterance);
  });
}

// Check ElevenLabs API usage and limits with secure configuration
export async function checkApiUsage(): Promise<{charactersUsed: number, charactersLimit: number} | null> {
  try {
    if (!isElevenLabsConfigured()) {
      return null;
    }

    const apiKey = getSecureApiKey('elevenlabs') as string;

    const response = await fetch('https://api.elevenlabs.io/v1/user/subscription', {
      headers: {
        'xi-api-key': apiKey
      }
    });

    if (!response.ok) {
      console.warn(`API usage check failed: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return {
      charactersUsed: data.character_count,
      charactersLimit: data.character_limit
    };
  } catch (error) {
    console.warn('API usage check error:', error);
    return null;
  }
}