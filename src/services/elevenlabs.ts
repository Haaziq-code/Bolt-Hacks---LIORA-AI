import { getSecureApiKey } from '../config/apiKeys';

export interface VoiceSettings {
  stability: number;
  similarity_boost: number;
  style: number;
  use_speaker_boost: boolean;
}

// Enhanced multilingual voice mapping with the most natural, human-like voices
export const multilingualVoices = {
  en: {
    // Female voices - using the most natural sounding ones
    female: {
      coach: 'EXAVITQu4vr4xnSDxMaL', // Bella - very natural female
      therapist: 'ThT5KcBeYPX3keUQqHPh', // Dorothy - warm, empathetic female
      tutor: '21m00Tcm4TlvDq8ikWAM', // Rachel - clear, intelligent female
      general: 'jsCqWAovK2LkecY7zXl4', // Elli - most natural conversational female
      friend: 'jsCqWAovK2LkecY7zXl4' // Elli - perfect for friendly conversations
    },
    // Male voices - using the most natural sounding ones
    male: {
      coach: 'pNInz6obpgDQGcFmaJgB', // Adam - energetic but natural male
      therapist: 'VR6AewLTigWG4xSOukaG', // Josh - calm, supportive male
      tutor: 'TxGEqnHWrfWFTfGW9XjX', // Daniel - clear, natural male
      general: 'AZnzlk1XvdvUeBnXmlld', // Domi - most natural conversational male
      friend: 'VR6AewLTigWG4xSOukaG' // Josh - warm, friendly male
    },
    // Non-binary voices (using most neutral-sounding natural voices)
    'non-binary': {
      coach: 'AZnzlk1XvdvUeBnXmlld', // Domi - neutral energetic
      therapist: 'jsCqWAovK2LkecY7zXl4', // Elli - neutral calm
      tutor: '21m00Tcm4TlvDq8ikWAM', // Rachel - neutral clear
      general: 'AZnzlk1XvdvUeBnXmlld', // Domi - neutral friendly
      friend: 'jsCqWAovK2LkecY7zXl4' // Elli - neutral warm
    }
  },
  // Add other languages with natural voices
  es: {
    female: {
      coach: 'jsCqWAovK2LkecY7zXl4',
      therapist: 'jsCqWAovK2LkecY7zXl4',
      tutor: 'jsCqWAovK2LkecY7zXl4',
      general: 'jsCqWAovK2LkecY7zXl4',
      friend: 'jsCqWAovK2LkecY7zXl4'
    },
    male: {
      coach: 'VR6AewLTigWG4xSOukaG',
      therapist: 'VR6AewLTigWG4xSOukaG',
      tutor: 'VR6AewLTigWG4xSOukaG',
      general: 'VR6AewLTigWG4xSOukaG',
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

// Add the new voice IDs
multilingualVoices.en.female.coach = 'aEO01A4wXwd1O8GPgGlF';
multilingualVoices.en.male.coach = '2BJW5coyhAzSr8STdHbE';
multilingualVoices.en.female.friend = 'UgBBYS2sOqTuMpoF3BR0';
multilingualVoices.en.male.friend = 'ulZgFXalzbrnPUGQGs0S';

// COMPLETELY REDESIGNED voice settings for maximum naturalness
export const naturalVoiceSettings = {
  coach: {
    stability: 0.3, // Lower for more natural variation
    similarity_boost: 0.8, // Slightly lower for more natural sound
    style: 0.9, // High expressiveness for energy
    use_speaker_boost: true
  },
  therapist: {
    stability: 0.4, // Balanced for calm but natural
    similarity_boost: 0.85, // Natural warmth
    style: 0.6, // Moderate expressiveness for empathy
    use_speaker_boost: true
  },
  tutor: {
    stability: 0.35, // Natural variation for engagement
    similarity_boost: 0.8, // Clear but natural
    style: 0.7, // Good expressiveness for teaching
    use_speaker_boost: true
  },
  friend: {
    stability: 0.25, // Lowest for most natural conversation
    similarity_boost: 0.75, // Most natural and conversational
    style: 0.8, // High expressiveness for friendship
    use_speaker_boost: true
  },
  general: {
    stability: 0.3, // Natural conversation
    similarity_boost: 0.8, // Balanced naturalness
    style: 0.7, // Good expressiveness
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
  // Fallback to English female with most natural voice
  const englishVoices = multilingualVoices.en.female;
  return englishVoices[mode as keyof typeof englishVoices] || englishVoices.friend;
}

// Enhanced AI-powered voice generation with maximum naturalness
export async function generateSpeech(
  text: string, 
  mode: string = 'general',
  language: string = 'en',
  gender: string = 'female',
  settings?: VoiceSettings
): Promise<string | null> {
  try {
    if (!isElevenLabsConfigured()) {
      console.log('🔒 ElevenLabs API key not configured - using enhanced browser speech synthesis');
      return null; // Return null to trigger fallback
    }

    const apiKey = getSecureApiKey('elevenlabs') as string;
    const voiceId = getVoiceForLanguageAndMode(language, mode, gender);
    const voiceSettings = settings || naturalVoiceSettings[mode as keyof typeof naturalVoiceSettings] || naturalVoiceSettings.friend;

    console.log(`🎤 Generating ultra-natural ${gender} speech for ${mode} mode in ${language} with voice ${voiceId}`);

    // Enhanced text preprocessing for more natural speech
    const processedText = preprocessTextForNaturalSpeech(text, mode);

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey
      },
      body: JSON.stringify({
        text: processedText,
        model_id: 'eleven_multilingual_v2', // Use the most advanced model
        voice_settings: voiceSettings,
        optimize_streaming_latency: 1, // Faster response
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
    
    console.log(`✅ Successfully generated ultra-natural ${gender} speech for ${mode} mode in ${language}`);
    return audioUrl;
  } catch (error) {
    console.error('❌ ElevenLabs speech generation error:', error);
    return null; // Return null to trigger fallback instead of throwing
  }
}

// NEW: Preprocess text to make speech more natural
function preprocessTextForNaturalSpeech(text: string, mode: string): string {
  let processedText = text;

  // Add natural pauses for better flow
  processedText = processedText.replace(/\. /g, '... ');
  processedText = processedText.replace(/! /g, '! ');
  processedText = processedText.replace(/\? /g, '? ');

  // Add breathing pauses for longer sentences
  if (processedText.length > 100) {
    processedText = processedText.replace(/,/g, ', ');
  }

  // Mode-specific adjustments for naturalness
  switch (mode) {
    case 'friend':
      // Make it more conversational and casual
      processedText = processedText.replace(/\bI am\b/g, "I'm");
      processedText = processedText.replace(/\byou are\b/g, "you're");
      processedText = processedText.replace(/\bdo not\b/g, "don't");
      processedText = processedText.replace(/\bcannot\b/g, "can't");
      processedText = processedText.replace(/\bwill not\b/g, "won't");
      processedText = processedText.replace(/\bw\b/g, "with");
      break;
    case 'therapist':
      // More thoughtful pauses
      processedText = processedText.replace(/\. /g, '... ');
      break;
    case 'tutor':
      // Emphasize key points
      processedText = processedText.replace(/\bimportant\b/gi, "<emphasis>important</emphasis>");
      processedText = processedText.replace(/\bkey\b/gi, "<emphasis>key</emphasis>");
      break;
  }

  return processedText;
}

// Enhanced streaming speech with natural playback
export async function streamSpeech(
  text: string, 
  mode: string = 'general', 
  language: string = 'en',
  gender: string = 'female'
): Promise<void> {
  try {
    console.log(`🎯 Starting ultra-natural ${gender} speech for ${mode} mode in ${language}`);
    
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
          utterance.rate = gender === 'male' ? 1.1 : 1.15;
          utterance.pitch = gender === 'male' ? 0.9 : 1.2;
          utterance.volume = 0.95;
          break;
        case 'therapist':
          utterance.rate = gender === 'male' ? 0.85 : 0.9;
          utterance.pitch = gender === 'male' ? 0.8 : 1.0;
          utterance.volume = 0.85;
          break;
        case 'tutor':
          utterance.rate = gender === 'male' ? 0.95 : 1.0;
          utterance.pitch = gender === 'male' ? 0.85 : 1.05;
          utterance.volume = 0.9;
          break;
        case 'friend':
          utterance.rate = gender === 'male' ? 1.05 : 1.1;
          utterance.pitch = gender === 'male' ? 0.8 : 1.15;
          utterance.volume = 0.95;
          break;
        default:
          utterance.rate = gender === 'male' ? 1.0 : 1.05;
          utterance.pitch = gender === 'male' ? 0.85 : 1.1;
          utterance.volume = 0.9;
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