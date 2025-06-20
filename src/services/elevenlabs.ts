import { getSecureApiKey } from '../config/apiKeys';

export interface VoiceSettings {
  stability: number;
  similarity_boost: number;
  style: number;
  use_speaker_boost: boolean;
}

// Enhanced multilingual voice mapping with gender-appropriate native speakers
export const multilingualVoices = {
  en: {
    // Female voices
    female: {
      coach: 'EXAVITQu4vr4xnSDxMaL', // Bella - energetic female
      therapist: 'ThT5KcBeYPX3keUQqHPh', // Dorothy - calm female
      tutor: '21m00Tcm4TlvDq8ikWAM', // Rachel - clear female
      general: 'EXAVITQu4vr4xnSDxMaL', // Bella - friendly female
      friend: 'jsCqWAovK2LkecY7zXl4' // Elli - warm female
    },
    // Male voices
    male: {
      coach: 'pNInz6obpgDQGcFmaJgB', // Adam - energetic male
      therapist: 'VR6AewLTigWG4xSOukaG', // Josh - calm male
      tutor: 'TxGEqnHWrfWFTfGW9XjX', // Daniel - clear male
      general: 'AZnzlk1XvdvUeBnXmlld', // Domi - friendly male
      friend: 'VR6AewLTigWG4xSOukaG' // Josh - warm male
    },
    // Non-binary voices (using more neutral-sounding voices)
    'non-binary': {
      coach: 'AZnzlk1XvdvUeBnXmlld', // Domi - neutral energetic
      therapist: 'EXAVITQu4vr4xnSDxMaL', // Bella - neutral calm
      tutor: '21m00Tcm4TlvDq8ikWAM', // Rachel - neutral clear
      general: 'AZnzlk1XvdvUeBnXmlld', // Domi - neutral friendly
      friend: 'EXAVITQu4vr4xnSDxMaL' // Bella - neutral warm
    }
  },
  // Add other languages with gender-appropriate voices
  es: {
    female: {
      coach: 'jsCqWAovK2LkecY7zXl4', // Spanish female energetic
      therapist: 'jsCqWAovK2LkecY7zXl4', // Spanish female calm
      tutor: 'jsCqWAovK2LkecY7zXl4', // Spanish female clear
      general: 'jsCqWAovK2LkecY7zXl4', // Spanish female friendly
      friend: 'jsCqWAovK2LkecY7zXl4'
    },
    male: {
      coach: 'VR6AewLTigWG4xSOukaG', // Spanish male energetic
      therapist: 'VR6AewLTigWG4xSOukaG', // Spanish male calm
      tutor: 'VR6AewLTigWG4xSOukaG', // Spanish male clear
      general: 'VR6AewLTigWG4xSOukaG', // Spanish male friendly
      friend: 'VR6AewLTigWG4xSOukaG'
    },
    'non-binary': {
      coach: 'jsCqWAovK2LkecY7zXl4',
      therapist: 'jsCqWAovK2LkecY7zXl4',
      tutor: 'jsCqWAovK2LkecY7zXl4',
      general: 'jsCqWAovK2LkecY7zXl4',
      friend: 'jsCqWAovK2LkecY7zXl4'
    }
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
  friend: {
    stability: 0.5, // Natural conversation
    similarity_boost: 0.8,
    style: 0.6, // Friendly and warm
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

// Get voice ID based on language, mode, and gender
function getVoiceForLanguageAndMode(language: string, mode: string, gender: string = 'female'): string {
  const langVoices = multilingualVoices[language as keyof typeof multilingualVoices];
  if (langVoices) {
    const genderVoices = langVoices[gender as keyof typeof langVoices];
    if (genderVoices) {
      return genderVoices[mode as keyof typeof genderVoices] || genderVoices.general;
    }
  }
  // Fallback to English female
  const englishVoices = multilingualVoices.en.female;
  return englishVoices[mode as keyof typeof englishVoices] || englishVoices.general;
}

// Enhanced AI-powered voice generation with gender-appropriate voices
export async function generateSpeech(
  text: string, 
  mode: string = 'general',
  language: string = 'en',
  gender: string = 'female',
  settings?: VoiceSettings
): Promise<string | null> {
  try {
    if (!isElevenLabsConfigured()) {
      console.log('🔒 ElevenLabs API key not configured - using browser speech synthesis');
      return null; // Return null to trigger fallback
    }

    const apiKey = getSecureApiKey('elevenlabs') as string;
    const voiceId = getVoiceForLanguageAndMode(language, mode, gender);
    const voiceSettings = settings || naturalVoiceSettings[mode as keyof typeof naturalVoiceSettings] || naturalVoiceSettings.general;

    console.log(`🎤 Generating natural ${gender} speech for ${mode} mode in ${language} with voice ${voiceId}`);

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
      console.error(`❌ ElevenLabs API error: ${response.status} - ${errorText}`);
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    
    console.log(`✅ Successfully generated natural ${gender} speech for ${mode} mode in ${language}`);
    return audioUrl;
  } catch (error) {
    console.error('❌ ElevenLabs speech generation error:', error);
    return null; // Return null to trigger fallback instead of throwing
  }
}

// Enhanced streaming speech with gender-appropriate voices
export async function streamSpeech(
  text: string, 
  mode: string = 'general', 
  language: string = 'en',
  gender: string = 'female'
): Promise<void> {
  try {
    console.log(`🎯 Starting natural ${gender} speech for ${mode} mode in ${language}`);
    
    // Try ElevenLabs first
    const audioUrl = await generateSpeech(text, mode, language, gender);
    
    if (audioUrl) {
      await playAudio(audioUrl);
      console.log(`🔊 ElevenLabs speech playback completed for ${mode} mode in ${language} with ${gender} voice`);
    } else {
      // Fallback to browser speech synthesis
      console.log(`🔊 Falling back to browser speech synthesis for ${mode} mode in ${language} with ${gender} voice`);
      await speakText(text, mode, language, gender);
    }
  } catch (error) {
    console.error('❌ Speech stream error, trying fallback:', error);
    // Final fallback to browser speech synthesis
    try {
      await speakText(text, mode, language, gender);
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
    
    // Set a timeout for loading
    setTimeout(() => {
      if (audio.readyState < 2) {
        reject(new Error('Audio loading timeout'));
      }
    }, 10000);
    
    audio.load();
  });
}

// Enhanced fallback with gender-appropriate browser speech synthesis
export function speakText(
  text: string, 
  mode: string = 'general', 
  language: string = 'en',
  gender: string = 'female'
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('Speech synthesis not supported'));
      return;
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    // Wait a moment for the cancel to take effect
    setTimeout(() => {
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
      
      // Enhanced personality differences for more natural speech with gender consideration
      switch (mode) {
        case 'coach':
          utterance.rate = 1.1;
          utterance.pitch = gender === 'male' ? 0.8 : 1.2;
          utterance.volume = 0.95;
          break;
        case 'therapist':
          utterance.rate = 0.8;
          utterance.pitch = gender === 'male' ? 0.7 : 0.9;
          utterance.volume = 0.8;
          break;
        case 'tutor':
          utterance.rate = 0.9;
          utterance.pitch = gender === 'male' ? 0.8 : 1.0;
          utterance.volume = 0.9;
          break;
        case 'friend':
          utterance.rate = 1.0;
          utterance.pitch = gender === 'male' ? 0.7 : 1.1;
          utterance.volume = 0.9;
          break;
        default:
          utterance.rate = 1.0;
          utterance.pitch = gender === 'male' ? 0.8 : 1.0;
          utterance.volume = 0.85;
      }

      utterance.onend = () => {
        console.log(`✅ Browser speech completed successfully for ${mode} mode with ${gender} voice`);
        resolve();
      };
      
      utterance.onerror = (event) => {
        // Handle 'interrupted' as expected behavior, not an error
        if (event.error === 'interrupted') {
          console.log(`🔄 Speech interrupted (expected behavior) for ${mode} mode`);
          resolve(); // Resolve instead of reject for interruptions
          return;
        }
        
        console.error(`Speech synthesis error: ${event.error}`);
        reject(new Error(`Speech synthesis error: ${event.error}`));
      };

      // Try to find a voice that matches the language and gender preference
      const voices = speechSynthesis.getVoices();
      
      // Filter voices by language and gender
      const preferredVoices = voices.filter(voice => {
        const matchesLanguage = voice.lang.startsWith(language);
        const matchesGender = gender === 'male' 
          ? voice.name.toLowerCase().includes('male') || voice.name.toLowerCase().includes('man') || voice.name.toLowerCase().includes('david') || voice.name.toLowerCase().includes('alex')
          : gender === 'female'
          ? voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('woman') || voice.name.toLowerCase().includes('samantha') || voice.name.toLowerCase().includes('victoria')
          : true; // non-binary accepts any
        
        return matchesLanguage && (matchesGender || voices.length < 10); // Fallback if no gender-specific voices
      });

      // Select the best voice
      let selectedVoice = null;
      if (preferredVoices.length > 0) {
        selectedVoice = preferredVoices[0];
      } else {
        // Fallback to any voice that matches the language
        selectedVoice = voices.find(voice => voice.lang.startsWith(language));
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
        console.log(`🎤 Using ${gender} voice: ${selectedVoice.name} for ${language}`);
      } else {
        console.log(`🎤 Using default voice for ${language} with ${gender} preference`);
      }

      console.log(`🔊 Speaking with browser synthesis: ${mode} mode in ${language} with ${gender} voice`);
      speechSynthesis.speak(utterance);
    }, 100);
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