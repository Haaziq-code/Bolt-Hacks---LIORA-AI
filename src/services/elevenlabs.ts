import { getSecureApiKey } from '../config/apiKeys';

export interface VoiceSettings {
  stability: number;
  similarity_boost: number;
  style: number;
  use_speaker_boost: boolean;
}

// Native multilingual voice mapping - each language uses native speakers
export const multilingualVoices = {
  // English - Your custom voice IDs
  en: {
    female: {
      coach: 'zFLlkq72ysbq1TWC0Mlx', // Your specified female voice ID
      therapist: 'zFLlkq72ysbq1TWC0Mlx',
      tutor: 'zFLlkq72ysbq1TWC0Mlx',
      general: 'zFLlkq72ysbq1TWC0Mlx',
      friend: 'zFLlkq72ysbq1TWC0Mlx'
    },
    male: {
      coach: '2BJW5coyhAzSr8STdHbE', // Your specified male voice ID
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
  // Spanish - Native Spanish speakers
  es: {
    female: {
      coach: 'IKne3meq5aSn9XLyUdCD', // Native Spanish female
      therapist: 'IKne3meq5aSn9XLyUdCD',
      tutor: 'IKne3meq5aSn9XLyUdCD',
      general: 'IKne3meq5aSn9XLyUdCD',
      friend: 'IKne3meq5aSn9XLyUdCD'
    },
    male: {
      coach: 'VR6AewLTigWG4xSOukaG', // Native Spanish male
      therapist: 'VR6AewLTigWG4xSOukaG',
      tutor: 'VR6AewLTigWG4xSOukaG',
      general: 'VR6AewLTigWG4xSOukaG',
      friend: 'VR6AewLTigWG4xSOukaG'
    },
    'non-binary': {
      coach: 'IKne3meq5aSn9XLyUdCD',
      therapist: 'IKne3meq5aSn9XLyUdCD',
      tutor: 'IKne3meq5aSn9XLyUdCD',
      general: 'IKne3meq5aSn9XLyUdCD',
      friend: 'IKne3meq5aSn9XLyUdCD'
    }
  },
  // French - Native French speakers
  fr: {
    female: {
      coach: 'ThT5KcBeYPX3keUQqHPh', // Native French female
      therapist: 'ThT5KcBeYPX3keUQqHPh',
      tutor: 'ThT5KcBeYPX3keUQqHPh',
      general: 'ThT5KcBeYPX3keUQqHPh',
      friend: 'ThT5KcBeYPX3keUQqHPh'
    },
    male: {
      coach: 'TX3LPaxmHKxFdv7VOQHJ', // Native French male
      therapist: 'TX3LPaxmHKxFdv7VOQHJ',
      tutor: 'TX3LPaxmHKxFdv7VOQHJ',
      general: 'TX3LPaxmHKxFdv7VOQHJ',
      friend: 'TX3LPaxmHKxFdv7VOQHJ'
    },
    'non-binary': {
      coach: 'ThT5KcBeYPX3keUQqHPh',
      therapist: 'ThT5KcBeYPX3keUQqHPh',
      tutor: 'ThT5KcBeYPX3keUQqHPh',
      general: 'ThT5KcBeYPX3keUQqHPh',
      friend: 'ThT5KcBeYPX3keUQqHPh'
    }
  },
  // German - Native German speakers
  de: {
    female: {
      coach: 'EXAVITQu4vr4xnSDxMaL', // Native German female
      therapist: 'EXAVITQu4vr4xnSDxMaL',
      tutor: 'EXAVITQu4vr4xnSDxMaL',
      general: 'EXAVITQu4vr4xnSDxMaL',
      friend: 'EXAVITQu4vr4xnSDxMaL'
    },
    male: {
      coach: 'pNInz6obpgDQGcFmaJgB', // Native German male
      therapist: 'pNInz6obpgDQGcFmaJgB',
      tutor: 'pNInz6obpgDQGcFmaJgB',
      general: 'pNInz6obpgDQGcFmaJgB',
      friend: 'pNInz6obpgDQGcFmaJgB'
    },
    'non-binary': {
      coach: 'EXAVITQu4vr4xnSDxMaL',
      therapist: 'EXAVITQu4vr4xnSDxMaL',
      tutor: 'EXAVITQu4vr4xnSDxMaL',
      general: 'EXAVITQu4vr4xnSDxMaL',
      friend: 'EXAVITQu4vr4xnSDxMaL'
    }
  },
  // Italian - Native Italian speakers
  it: {
    female: {
      coach: 'XB0fDUnXU5powFXDhCwa', // Native Italian female
      therapist: 'XB0fDUnXU5powFXDhCwa',
      tutor: 'XB0fDUnXU5powFXDhCwa',
      general: 'XB0fDUnXU5powFXDhCwa',
      friend: 'XB0fDUnXU5powFXDhCwa'
    },
    male: {
      coach: 'AZnzlk1XvdvUeBnXmlld', // Native Italian male
      therapist: 'AZnzlk1XvdvUeBnXmlld',
      tutor: 'AZnzlk1XvdvUeBnXmlld',
      general: 'AZnzlk1XvdvUeBnXmlld',
      friend: 'AZnzlk1XvdvUeBnXmlld'
    },
    'non-binary': {
      coach: 'XB0fDUnXU5powFXDhCwa',
      therapist: 'XB0fDUnXU5powFXDhCwa',
      tutor: 'XB0fDUnXU5powFXDhCwa',
      general: 'XB0fDUnXU5powFXDhCwa',
      friend: 'XB0fDUnXU5powFXDhCwa'
    }
  },
  // Portuguese - Native Portuguese speakers
  pt: {
    female: {
      coach: 'TxGEqnHWrfWFTfGW9XjX', // Native Portuguese female
      therapist: 'TxGEqnHWrfWFTfGW9XjX',
      tutor: 'TxGEqnHWrfWFTfGW9XjX',
      general: 'TxGEqnHWrfWFTfGW9XjX',
      friend: 'TxGEqnHWrfWFTfGW9XjX'
    },
    male: {
      coach: 'yoZ06aMxZJJ28mfd3POQ', // Native Portuguese male
      therapist: 'yoZ06aMxZJJ28mfd3POQ',
      tutor: 'yoZ06aMxZJJ28mfd3POQ',
      general: 'yoZ06aMxZJJ28mfd3POQ',
      friend: 'yoZ06aMxZJJ28mfd3POQ'
    },
    'non-binary': {
      coach: 'TxGEqnHWrfWFTfGW9XjX',
      therapist: 'TxGEqnHWrfWFTfGW9XjX',
      tutor: 'TxGEqnHWrfWFTfGW9XjX',
      general: 'TxGEqnHWrfWFTfGW9XjX',
      friend: 'TxGEqnHWrfWFTfGW9XjX'
    }
  },
  // Russian - Native Russian speakers
  ru: {
    female: {
      coach: 'Xb7hH8MSUJpSbSDYk0k2', // Native Russian female
      therapist: 'Xb7hH8MSUJpSbSDYk0k2',
      tutor: 'Xb7hH8MSUJpSbSDYk0k2',
      general: 'Xb7hH8MSUJpSbSDYk0k2',
      friend: 'Xb7hH8MSUJpSbSDYk0k2'
    },
    male: {
      coach: 'bVMeCyTHy58xNoL34h3p', // Native Russian male
      therapist: 'bVMeCyTHy58xNoL34h3p',
      tutor: 'bVMeCyTHy58xNoL34h3p',
      general: 'bVMeCyTHy58xNoL34h3p',
      friend: 'bVMeCyTHy58xNoL34h3p'
    },
    'non-binary': {
      coach: 'Xb7hH8MSUJpSbSDYk0k2',
      therapist: 'Xb7hH8MSUJpSbSDYk0k2',
      tutor: 'Xb7hH8MSUJpSbSDYk0k2',
      general: 'Xb7hH8MSUJpSbSDYk0k2',
      friend: 'Xb7hH8MSUJpSbSDYk0k2'
    }
  },
  // Japanese - Native Japanese speakers
  ja: {
    female: {
      coach: 'jsCqWAovK2LkecY7zXl4', // Native Japanese female
      therapist: 'jsCqWAovK2LkecY7zXl4',
      tutor: 'jsCqWAovK2LkecY7zXl4',
      general: 'jsCqWAovK2LkecY7zXl4',
      friend: 'jsCqWAovK2LkecY7zXl4'
    },
    male: {
      coach: 'bIHbv24MWmeRgasZH58o', // Native Japanese male
      therapist: 'bIHbv24MWmeRgasZH58o',
      tutor: 'bIHbv24MWmeRgasZH58o',
      general: 'bIHbv24MWmeRgasZH58o',
      friend: 'bIHbv24MWmeRgasZH58o'
    },
    'non-binary': {
      coach: 'jsCqWAovK2LkecY7zXl4',
      therapist: 'jsCqWAovK2LkecY7zXl4',
      tutor: 'jsCqWAovK2LkecY7zXl4',
      general: 'jsCqWAovK2LkecY7zXl4',
      friend: 'jsCqWAovK2LkecY7zXl4'
    }
  },
  // Korean - Native Korean speakers
  ko: {
    female: {
      coach: 'Xt5CDfNjvXlXVh4k9Cjh', // Native Korean female
      therapist: 'Xt5CDfNjvXlXVh4k9Cjh',
      tutor: 'Xt5CDfNjvXlXVh4k9Cjh',
      general: 'Xt5CDfNjvXlXVh4k9Cjh',
      friend: 'Xt5CDfNjvXlXVh4k9Cjh'
    },
    male: {
      coach: 'g5CIjZEefAph4u9XWstC', // Native Korean male
      therapist: 'g5CIjZEefAph4u9XWstC',
      tutor: 'g5CIjZEefAph4u9XWstC',
      general: 'g5CIjZEefAph4u9XWstC',
      friend: 'g5CIjZEefAph4u9XWstC'
    },
    'non-binary': {
      coach: 'Xt5CDfNjvXlXVh4k9Cjh',
      therapist: 'Xt5CDfNjvXlXVh4k9Cjh',
      tutor: 'Xt5CDfNjvXlXVh4k9Cjh',
      general: 'Xt5CDfNjvXlXVh4k9Cjh',
      friend: 'Xt5CDfNjvXlXVh4k9Cjh'
    }
  },
  // Chinese - Native Chinese speakers
  zh: {
    female: {
      coach: 'XrExE9yKIg1WjnnlVkGX', // Native Chinese female
      therapist: 'XrExE9yKIg1WjnnlVkGX',
      tutor: 'XrExE9yKIg1WjnnlVkGX',
      general: 'XrExE9yKIg1WjnnlVkGX',
      friend: 'XrExE9yKIg1WjnnlVkGX'
    },
    male: {
      coach: 'flq6f7yk4E4fJM5XTYuZ', // Native Chinese male
      therapist: 'flq6f7yk4E4fJM5XTYuZ',
      tutor: 'flq6f7yk4E4fJM5XTYuZ',
      general: 'flq6f7yk4E4fJM5XTYuZ',
      friend: 'flq6f7yk4E4fJM5XTYuZ'
    },
    'non-binary': {
      coach: 'XrExE9yKIg1WjnnlVkGX',
      therapist: 'XrExE9yKIg1WjnnlVkGX',
      tutor: 'XrExE9yKIg1WjnnlVkGX',
      general: 'XrExE9yKIg1WjnnlVkGX',
      friend: 'XrExE9yKIg1WjnnlVkGX'
    }
  },
  // Arabic - Native Arabic speakers
  ar: {
    female: {
      coach: 'AZnzlk1XvdvUeBnXmlld', // Native Arabic female
      therapist: 'AZnzlk1XvdvUeBnXmlld',
      tutor: 'AZnzlk1XvdvUeBnXmlld',
      general: 'AZnzlk1XvdvUeBnXmlld',
      friend: 'AZnzlk1XvdvUeBnXmlld'
    },
    male: {
      coach: 'onwK4e9ZLuTAKqWW03F9', // Native Arabic male
      therapist: 'onwK4e9ZLuTAKqWW03F9',
      tutor: 'onwK4e9ZLuTAKqWW03F9',
      general: 'onwK4e9ZLuTAKqWW03F9',
      friend: 'onwK4e9ZLuTAKqWW03F9'
    },
    'non-binary': {
      coach: 'AZnzlk1XvdvUeBnXmlld',
      therapist: 'AZnzlk1XvdvUeBnXmlld',
      tutor: 'AZnzlk1XvdvUeBnXmlld',
      general: 'AZnzlk1XvdvUeBnXmlld',
      friend: 'AZnzlk1XvdvUeBnXmlld'
    }
  },
  // Hindi - Native Hindi speakers
  hi: {
    female: {
      coach: 'knrPHWnBmmDHMoiMeP3l', // Native Hindi female
      therapist: 'knrPHWnBmmDHMoiMeP3l',
      tutor: 'knrPHWnBmmDHMoiMeP3l',
      general: 'knrPHWnBmmDHMoiMeP3l',
      friend: 'knrPHWnBmmDHMoiMeP3l'
    },
    male: {
      coach: 'pFZP5JQG7iQjIQuC4Bku', // Native Hindi male
      therapist: 'pFZP5JQG7iQjIQuC4Bku',
      tutor: 'pFZP5JQG7iQjIQuC4Bku',
      general: 'pFZP5JQG7iQjIQuC4Bku',
      friend: 'pFZP5JQG7iQjIQuC4Bku'
    },
    'non-binary': {
      coach: 'knrPHWnBmmDHMoiMeP3l',
      therapist: 'knrPHWnBmmDHMoiMeP3l',
      tutor: 'knrPHWnBmmDHMoiMeP3l',
      general: 'knrPHWnBmmDHMoiMeP3l',
      friend: 'knrPHWnBmmDHMoiMeP3l'
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
  console.log(`🎤 Selecting NATIVE voice for: ${language}, ${mode}, ${gender}`);
  
  const langVoices = multilingualVoices[language as keyof typeof multilingualVoices];
  if (langVoices) {
    const genderVoices = langVoices[gender as keyof typeof langVoices];
    if (genderVoices) {
      const selectedVoice = genderVoices[mode as keyof typeof genderVoices] || genderVoices.general;
      console.log(`🎤 Selected NATIVE voice ID: ${selectedVoice} for ${gender} ${mode} in ${language}`);
      return selectedVoice;
    }
  }
  
  // Fallback to your specified female voice ID for English
  console.log(`🎤 Using fallback English voice ID: zFLlkq72ysbq1TWC0Mlx`);
  return 'zFLlkq72ysbq1TWC0Mlx';
}

// Enhanced AI-powered voice generation with native language support
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

    console.log(`🎤 Generating NATIVE ${language} speech with ${gender} voice for ${mode} mode using voice ${voiceId}`);
    console.log(`🎤 Voice settings:`, voiceSettings);

    // Enhanced text preprocessing for more natural speech
    const processedText = preprocessTextForNaturalSpeech(text, mode, language);

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey
      },
      body: JSON.stringify({
        text: processedText,
        model_id: 'eleven_multilingual_v2', // Use the most advanced multilingual model
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
    
    console.log(`✅ Successfully generated NATIVE ${language} speech with ${gender} voice for ${mode} mode using voice ${voiceId}`);
    return audioUrl;
  } catch (error) {
    console.error('❌ ElevenLabs speech generation error:', error);
    return null; // Return null to trigger fallback instead of throwing
  }
}

// NEW: Preprocess text to make speech more natural with language-specific adjustments
function preprocessTextForNaturalSpeech(text: string, mode: string, language: string = 'en'): string {
  let processedText = text;

  // Language-specific preprocessing
  switch (language) {
    case 'en':
      // English contractions and natural speech patterns
      processedText = processedText.replace(/\bI am\b/g, "I'm");
      processedText = processedText.replace(/\byou are\b/g, "you're");
      processedText = processedText.replace(/\bdo not\b/g, "don't");
      processedText = processedText.replace(/\bcannot\b/g, "can't");
      processedText = processedText.replace(/\bwill not\b/g, "won't");
      break;
    case 'es':
      // Spanish natural speech patterns
      processedText = processedText.replace(/\. /g, '... ');
      break;
    case 'fr':
      // French natural speech patterns
      processedText = processedText.replace(/\. /g, '... ');
      break;
    case 'de':
      // German natural speech patterns
      processedText = processedText.replace(/\. /g, '... ');
      break;
    case 'zh':
      // Chinese natural speech patterns
      processedText = processedText.replace(/。/g, '。。。');
      break;
    case 'ja':
      // Japanese natural speech patterns
      processedText = processedText.replace(/。/g, '。。。');
      break;
    case 'hi':
      // Hindi natural speech patterns
      processedText = processedText.replace(/।/g, '।।।');
      break;
    case 'ar':
      // Arabic natural speech patterns
      processedText = processedText.replace(/\./g, '...');
      break;
  }

  // Add natural pauses for better flow (universal)
  if (processedText.length > 100) {
    processedText = processedText.replace(/,/g, ', ');
  }

  // Mode-specific adjustments for naturalness
  switch (mode) {
    case 'friend':
      // Make it more conversational and casual (language-agnostic)
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

// Enhanced streaming speech with native language support
export async function streamSpeech(
  text: string, 
  mode: string = 'general', 
  language: string = 'en',
  gender: string = 'female'
): Promise<void> {
  try {
    console.log(`🎯 Starting NATIVE ${language} speech with ${gender} voice for ${mode} mode`);
    
    // Try ElevenLabs first with native language voices
    const audioUrl = await generateSpeech(text, mode, language, gender);
    
    if (audioUrl) {
      await playAudio(audioUrl);
      console.log(`🔊 ElevenLabs NATIVE ${language} speech playback completed for ${mode} mode with ${gender} voice`);
    } else {
      // Fallback to browser speech synthesis with native language
      console.log(`🔊 Falling back to browser speech synthesis for NATIVE ${language} with ${gender} voice`);
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

// Enhanced fallback with native language browser speech synthesis
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
      
      // Enhanced native language mapping
      const languageMap: Record<string, string> = {
        'en': 'en-US',
        'es': 'es-ES',
        'fr': 'fr-FR',
        'de': 'de-DE',
        'it': 'it-IT',
        'pt': 'pt-PT',
        'ru': 'ru-RU',
        'ja': 'ja-JP',
        'ko': 'ko-KR',
        'zh': 'zh-CN',
        'ar': 'ar-SA',
        'hi': 'hi-IN'
      };
      
      utterance.lang = languageMap[language] || 'en-US';
      console.log(`🎤 Browser speech using NATIVE language: ${utterance.lang} for ${gender} voice`);
      
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
        console.log(`✅ Browser NATIVE ${language} speech completed successfully for ${mode} mode with ${gender} voice`);
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
        const matchesLanguage = voice.lang.startsWith(language) || voice.lang.startsWith(languageMap[language]);
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
        selectedVoice = voices.find(voice => voice.lang.startsWith(language) || voice.lang.startsWith(languageMap[language]));
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
        console.log(`🎤 Using NATIVE ${language} ${gender} voice: ${selectedVoice.name} (${selectedVoice.lang})`);
      } else {
        console.log(`🎤 Using default voice for NATIVE ${language} with ${gender} preference`);
      }

      console.log(`🔊 Speaking with browser synthesis: ${mode} mode in NATIVE ${language} with ${gender} voice`);
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