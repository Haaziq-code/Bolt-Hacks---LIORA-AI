import { getSecureApiKey } from '../config/apiKeys';

export interface VoiceSettings {
  stability: number;
  similarity_boost: number;
  style: number;
  use_speaker_boost: boolean;
}

// Enhanced multilingual voice mapping with your custom voice IDs
export const multilingualVoices = {
  en: {
    // Female voices - using your specified voice ID as default
    female: {
      coach: 'zFLlkq72ysbq1TWC0Mlx', // Your specified female voice ID
      therapist: 'zFLlkq72ysbq1TWC0Mlx', // Your specified female voice ID
      tutor: 'zFLlkq72ysbq1TWC0Mlx', // Your specified female voice ID
      general: 'zFLlkq72ysbq1TWC0Mlx', // Your specified female voice ID
      friend: 'zFLlkq72ysbq1TWC0Mlx' // Your specified female voice ID
    },
    // Male voices - using your specified voice ID
    male: {
      coach: '2BJW5coyhAzSr8STdHbE', // Your specified male voice ID
      therapist: '2BJW5coyhAzSr8STdHbE', // Your specified male voice ID
      tutor: '2BJW5coyhAzSr8STdHbE', // Your specified male voice ID
      general: '2BJW5coyhAzSr8STdHbE', // Your specified male voice ID
      friend: '2BJW5coyhAzSr8STdHbE' // Your specified male voice ID
    },
    // Non-binary voices (using your other custom voice IDs)
    'non-binary': {
      coach: 'ulZgFXalzbrnPUGQGs0S', // Your custom voice ID
      therapist: 'aEO01A4wXwd1O8GPgGlF', // Your custom voice ID
      tutor: 'UgBBYS2sOqTuMpoF3BR0', // Your custom voice ID
      general: 'zFLlkq72ysbq1TWC0Mlx', // Your specified female voice ID as fallback
      friend: 'ulZgFXalzbrnPUGQGs0S' // Your custom voice ID
    }
  },
  // Add other languages with your custom voices
  es: {
    female: {
      coach: 'zFLlkq72ysbq1TWC0Mlx',
      therapist: 'zFLlkq72ysbq1TWC0Mlx',
      tutor: 'zFLlkq72ysbq1TWC0Mlx',
      general: 'zFLlkq72ysbq1TWC0Mlx',
      friend: 'zFLlkq72ysbq1TWC0Mlx'
    },
    male: {
      coach: '2BJW5coyhAzSr8STdHbE',
      therapist: '2BJW5coyhAzSr8STdHbE',
      tutor: '2BJW5coyhAzSr8STdHbE',
      general: '2BJW5coyhAzSr8STdHbE',
      friend: '2BJW5coyhAzSr8STdHbE'
    },
    'non-binary': {
      coach: 'ulZgFXalzbrnPUGQGs0S',
      therapist: 'aEO01A4wXwd1O8GPgGlF',
      tutor: 'UgBBYS2sOqTuMpoF3BR0',
      general: 'zFLlkq72ysbq1TWC0Mlx',
      friend: 'ulZgFXalzbrnPUGQGs0S'
    }
  },
  fr: {
    female: {
      coach: 'zFLlkq72ysbq1TWC0Mlx',
      therapist: 'zFLlkq72ysbq1TWC0Mlx',
      tutor: 'zFLlkq72ysbq1TWC0Mlx',
      general: 'zFLlkq72ysbq1TWC0Mlx',
      friend: 'zFLlkq72ysbq1TWC0Mlx'
    },
    male: {
      coach: '2BJW5coyhAzSr8STdHbE',
      therapist: '2BJW5coyhAzSr8STdHbE',
      tutor: '2BJW5coyhAzSr8STdHbE',
      general: '2BJW5coyhAzSr8STdHbE',
      friend: '2BJW5coyhAzSr8STdHbE'
    },
    'non-binary': {
      coach: 'ulZgFXalzbrnPUGQGs0S',
      therapist: 'aEO01A4wXwd1O8GPgGlF',
      tutor: 'UgBBYS2sOqTuMpoF3BR0',
      general: 'zFLlkq72ysbq1TWC0Mlx',
      friend: 'ulZgFXalzbrnPUGQGs0S'
    }
  }
};

// ULTRA-NATURAL voice settings for maximum human-like speech
export const naturalVoiceSettings = {
  coach: {
    stability: 0.05, // Extremely low for maximum natural variation
    similarity_boost: 0.55, // Lower for more natural sound
    style: 0.98, // Maximum expressiveness for energy
    use_speaker_boost: true
  },
  therapist: {
    stability: 0.08, // Very low for natural warmth
    similarity_boost: 0.60, // Natural warmth
    style: 0.85, // High expressiveness for empathy
    use_speaker_boost: true
  },
  tutor: {
    stability: 0.10, // Low for natural variation
    similarity_boost: 0.58, // Clear but natural
    style: 0.90, // High expressiveness for teaching
    use_speaker_boost: true
  },
  friend: {
    stability: 0.03, // Lowest for most natural conversation
    similarity_boost: 0.50, // Most natural and conversational
    style: 0.95, // Very high expressiveness for friendship
    use_speaker_boost: true
  },
  general: {
    stability: 0.05, // Very natural conversation
    similarity_boost: 0.55, // Balanced naturalness
    style: 0.88, // High expressiveness
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
  console.log(`🎤 Selecting voice for: ${language}, ${mode}, ${gender}`);
  
  const langVoices = multilingualVoices[language as keyof typeof multilingualVoices];
  if (langVoices) {
    const genderVoices = langVoices[gender as keyof typeof langVoices];
    if (genderVoices) {
      const selectedVoice = genderVoices[mode as keyof typeof genderVoices] || genderVoices.general;
      console.log(`🎤 Selected voice ID: ${selectedVoice} for ${gender} ${mode} in ${language}`);
      return selectedVoice;
    }
  }
  
  // Fallback to your specified female voice ID
  console.log(`🎤 Using fallback voice ID: zFLlkq72ysbq1TWC0Mlx`);
  return 'zFLlkq72ysbq1TWC0Mlx';
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

    console.log(`🎤 Generating ULTRA-NATURAL ${gender} speech for ${mode} mode in ${language} with voice ${voiceId}`);
    console.log(`🎤 Voice settings:`, voiceSettings);

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
    
    console.log(`✅ Successfully generated ULTRA-NATURAL ${gender} speech for ${mode} mode in ${language} with voice ${voiceId}`);
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
      break;
    case 'therapist':
      // More thoughtful pauses
      processedText = processedText.replace(/\. /g, '... ');
      break;
    case 'tutor':
      // Emphasize key points
      processedText = processedText.replace(/\bimportant\b/gi, "important");
      processedText = processedText.replace(/\bkey\b/gi, "key");
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
    console.log(`🎯 Starting ULTRA-NATURAL ${gender} speech for ${mode} mode in ${language}`);
    
    // Try ElevenLabs first with your custom voice IDs
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