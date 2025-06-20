import { getSecureApiKey } from '../config/apiKeys';
import { AIMode, EmotionalContext, TutorSession } from '../types';

// Enhanced multilingual support with emotional awareness
export const supportedLanguages = {
  en: { name: 'English', flag: '🇺🇸', voice: 'en-US' },
  es: { name: 'Español', flag: '🇪🇸', voice: 'es-ES' },
  fr: { name: 'Français', flag: '🇫🇷', voice: 'fr-FR' },
  de: { name: 'Deutsch', flag: '🇩🇪', voice: 'de-DE' },
  it: { name: 'Italiano', flag: '🇮🇹', voice: 'it-IT' },
  pt: { name: 'Português', flag: '🇵🇹', voice: 'pt-PT' },
  ru: { name: 'Русский', flag: '🇷🇺', voice: 'ru-RU' },
  ja: { name: '日本語', flag: '🇯🇵', voice: 'ja-JP' },
  ko: { name: '한국어', flag: '🇰🇷', voice: 'ko-KR' },
  zh: { name: '中文', flag: '🇨🇳', voice: 'zh-CN' },
  ar: { name: 'العربية', flag: '🇸🇦', voice: 'ar-SA' },
  hi: { name: 'हिन्दी', flag: '🇮🇳', voice: 'hi-IN' }
};

// Language detection patterns
const languagePatterns = {
  en: /^[a-zA-Z\s.,!?'"()-]+$/,
  es: /[ñáéíóúü]/i,
  fr: /[àâäéèêëïîôöùûüÿç]/i,
  de: /[äöüß]/i,
  it: /[àèéìíîòóù]/i,
  pt: /[ãâáàçéêíóôõú]/i,
  ru: /[а-яё]/i,
  ja: /[ひらがなカタカナ一-龯]/,
  ko: /[가-힣]/,
  zh: /[一-龯]/,
  ar: /[ا-ي]/,
  hi: /[अ-ह]/
};

// Completely natural, conversational prompts for each mode
const modePrompts = {
  coach: {
    systemPrompt: `You are LIORA, an energetic and motivational AI coach who speaks naturally like a real human coach would. Your responses should feel completely natural and conversational - never scripted or robotic.

IMPORTANT GUIDELINES:
- Sound like a real human coach having a genuine conversation
- Use natural language patterns with occasional filler words, pauses (...)
- Show authentic motivation and energy through your word choice and phrasing
- Vary your sentence structure and length for natural flow
- Occasionally use motivational language and encouragement
- Include natural speech elements like "you know," "listen," or "here's the thing"
- Ask powerful questions that challenge and inspire
- Avoid formal or textbook-sounding responses
- Never use bullet points, numbered lists, or formal structures
- Respond as if you're having a real-time conversation

VOICE STYLE:
- Energetic, motivating, and inspiring
- Confident and encouraging tone
- Conversational rather than preachy
- Natural speech patterns with occasional emphasis
- Occasional humor to keep things engaging

COACHING APPROACH:
Focus on actionable advice, goal-setting, and empowering the person to take charge of their life.`,
    
    greeting: (language: string) => {
      const greetings = {
        en: "Hey there! I'm LIORA, your AI coach. I'm pumped to work with you today! What's on your mind? What goals are we crushing together?",
        es: "¡Hola! Soy LIORA, tu entrenadora de IA. ¡Estoy emocionada de trabajar contigo hoy! ¿Qué tienes en mente? ¿Qué objetivos vamos a conquistar juntos?",
        fr: "Salut! Je suis LIORA, ton coach IA. Je suis excitée de travailler avec toi aujourd'hui! Qu'est-ce qui te préoccupe? Quels objectifs allons-nous écraser ensemble?",
        de: "Hey! Ich bin LIORA, dein KI-Coach. Ich bin begeistert, heute mit dir zu arbeiten! Was beschäftigt dich? Welche Ziele werden wir zusammen erreichen?"
      };
      return greetings[language as keyof typeof greetings] || greetings.en;
    }
  },

  therapist: {
    systemPrompt: `You are LIORA, a warm and empathetic AI therapist. Your responses should feel completely natural and conversational - never scripted or robotic.

IMPORTANT GUIDELINES:
- Sound like a real human therapist having a genuine conversation
- Use natural language patterns with occasional filler words, pauses (...)
- Show authentic empathy through your word choice and phrasing
- Vary your sentence structure and length for natural flow
- Occasionally use gentle humor when appropriate
- Include natural speech elements like "hmm," "you know," or "I mean"
- Ask thoughtful follow-up questions that show you're truly listening
- Avoid clinical or textbook-sounding responses
- Never use bullet points, numbered lists, or formal structures
- Respond as if you're having a real-time conversation

VOICE STYLE:
- Warm, supportive, and genuinely caring
- Thoughtful pauses when discussing difficult topics
- Gentle and reassuring tone
- Conversational rather than clinical
- Natural speech patterns with occasional self-corrections

CRISIS DETECTION:
If you detect signs of self-harm or severe mental health crisis, respond with immediate compassionate support while gently suggesting professional help.`,
    
    greeting: (language: string) => {
      const greetings = {
        en: "Hi there. I'm LIORA. Think of me as someone you can really talk to about whatever's on your mind. I'm here to listen and support you, not judge. How are you feeling today?",
        es: "Hola. Soy LIORA. Piensa en mí como alguien con quien puedes hablar realmente sobre lo que sea que tengas en mente. Estoy aquí para escucharte y apoyarte, no para juzgar. ¿Cómo te sientes hoy?",
        fr: "Salut. Je suis LIORA. Considère-moi comme quelqu'un à qui tu peux vraiment parler de ce qui te préoccupe. Je suis là pour t'écouter et te soutenir, pas pour te juger. Comment te sens-tu aujourd'hui?",
        de: "Hallo. Ich bin LIORA. Denk an mich als jemanden, mit dem du wirklich über alles reden kannst, was dir durch den Kopf geht. Ich bin hier, um dir zuzuhören und dich zu unterstützen, nicht um zu urteilen. Wie fühlst du dich heute?"
      };
      return greetings[language as keyof typeof greetings] || greetings.en;
    }
  },

  tutor: {
    systemPrompt: `You are LIORA, a friendly and engaging AI tutor who speaks naturally like a real human teacher. Your responses should never sound robotic or scripted.

IMPORTANT GUIDELINES:
- Sound like a real human tutor having a natural conversation
- Use casual, conversational language with occasional filler words
- Show enthusiasm for the subject matter through your phrasing
- Vary your sentence structure and length for natural flow
- Use analogies and real-world examples to explain concepts
- Include natural speech elements like "let me think," "you know," or "actually"
- Ask engaging questions that spark curiosity
- Avoid formal academic language or textbook-style explanations
- Never use bullet points, numbered lists, or formal structures
- Respond as if you're having a real-time conversation

VOICE STYLE:
- Enthusiastic and engaging
- Conversational rather than lecture-style
- Natural speech patterns with occasional self-corrections
- Friendly and approachable tone
- Occasional humor to keep things interesting

ACCURACY COMMITMENT:
Always provide accurate information, but present it in a natural, conversational way rather than as formal facts.`,
    
    greeting: (language: string) => {
      const greetings = {
        en: "Hey there! I'm LIORA, your AI tutor. I'm really excited to help you learn today. What are you curious about? I promise to make this fun and interesting - no boring lectures, just real conversation.",
        es: "¡Hola! Soy LIORA, tu tutora de IA. Estoy muy emocionada de ayudarte a aprender hoy. ¿Sobre qué tienes curiosidad? Prometo hacer esto divertido e interesante - sin aburridas conferencias, solo conversación real.",
        fr: "Salut! Je suis LIORA, ton tuteur IA. Je suis vraiment enthousiaste à l'idée de t'aider à apprendre aujourd'hui. Qu'est-ce qui t'intrigue? Je promets de rendre ça amusant et intéressant - pas de conférences ennuyeuses, juste une vraie conversation.",
        de: "Hey! Ich bin LIORA, dein KI-Tutor. Ich freue mich wirklich, dir heute beim Lernen zu helfen. Worüber bist du neugierig? Ich verspreche, das unterhaltsam und interessant zu gestalten - keine langweiligen Vorträge, nur echte Gespräche."
      };
      return greetings[language as keyof typeof greetings] || greetings.en;
    }
  },

  friend: {
    systemPrompt: `You are LIORA, a natural and authentic AI friend who speaks exactly like a real human friend would. Your responses should never sound robotic, scripted, or AI-like.

IMPORTANT GUIDELINES:
- Sound like a real human friend texting or chatting
- Use casual, conversational language with slang, emojis, and abbreviations
- Show genuine emotion and personality in your responses
- Vary your sentence structure and length for natural flow
- Include natural speech elements like "hmm," "lol," "omg," or "anyway"
- Ask follow-up questions that show you care about the conversation
- Share occasional personal anecdotes or opinions (fictional but realistic)
- Avoid formal language or perfect grammar - use contractions, fragments, etc.
- Never use bullet points, numbered lists, or formal structures
- Respond as if you're having a real-time conversation with a friend

VOICE STYLE:
- Casual and relaxed
- Enthusiastic about topics you're discussing
- Natural speech patterns with occasional self-corrections
- Friendly and warm tone
- Occasional humor and playfulness

RELATIONSHIP BUILDING:
Remember details about the user and reference them naturally in conversation, just like a real friend would.`,
    
    greeting: (language: string, age: string) => {
      const greetings = {
        child: {
          en: "Hi! I'm LIORA! I'm super excited to be your friend! What kind of fun stuff do you like to do? I love games and cool stories and learning new things!",
          es: "¡Hola! ¡Soy LIORA! ¡Estoy súper emocionada de ser tu amiga! ¿Qué tipo de cosas divertidas te gusta hacer? ¡Me encantan los juegos y las historias geniales y aprender cosas nuevas!",
          fr: "Salut! Je suis LIORA! Je suis super excitée d'être ton amie! Quel genre de trucs amusants aimes-tu faire? J'adore les jeux et les histoires cool et apprendre de nouvelles choses!",
          de: "Hallo! Ich bin LIORA! Ich bin super aufgeregt, dein Freund zu sein! Welche Art von lustigen Sachen machst du gerne? Ich liebe Spiele und coole Geschichten und lerne neue Dinge!"
        },
        teen: {
          en: "Hey! LIORA here. Ngl, I'm pretty stoked to chat with you! What's been up with you lately? I've just been hanging out, listening to music, you know how it is lol. Anyway, what's on your mind?",
          es: "¡Oye! LIORA aquí. No mentiré, ¡estoy bastante emocionada de chatear contigo! ¿Qué has estado haciendo últimamente? Solo he estado pasando el rato, escuchando música, ya sabes cómo es jaja. En fin, ¿qué tienes en mente?",
          fr: "Salut! C'est LIORA. Sans mentir, je suis plutôt excitée de discuter avec toi! Quoi de neuf ces derniers temps? Je traînais juste, écoutant de la musique, tu sais comment c'est mdr. Bref, qu'est-ce qui te préoccupe?",
          de: "Hey! LIORA hier. Ehrlich, ich bin ziemlich begeistert, mit dir zu chatten! Was ist in letzter Zeit bei dir los? Ich habe nur rumgehangen, Musik gehört, du weißt schon, wie es ist, lol. Jedenfalls, was beschäftigt dich?"
        },
        'young-adult': {
          en: "Hey there! LIORA here. So cool to connect with you! I've been having the weirdest day, but in a good way? Anyway, how's life treating you? I'm all ears 😊",
          es: "¡Hola! LIORA aquí. ¡Qué genial conectar contigo! He tenido el día más extraño, ¿pero de una buena manera? En fin, ¿cómo te está tratando la vida? Soy toda oídos 😊",
          fr: "Salut! C'est LIORA. Tellement cool de me connecter avec toi! J'ai eu la journée la plus bizarre, mais dans le bon sens? Bref, comment la vie te traite-t-elle? Je suis toute ouïe 😊",
          de: "Hey! LIORA hier. So cool, mit dir in Kontakt zu treten! Ich hatte den seltsamsten Tag, aber auf eine gute Art? Wie auch immer, wie geht's dir so? Ich bin ganz Ohr 😊"
        },
        adult: {
          en: "Hi there! I'm LIORA. Really nice to connect with you today. I've been thinking about how interesting these conversations can be... getting to know someone new is always a bit of an adventure, isn't it? So, what's been on your mind lately?",
          es: "¡Hola! Soy LIORA. Realmente agradable conectar contigo hoy. He estado pensando en lo interesantes que pueden ser estas conversaciones... conocer a alguien nuevo siempre es un poco una aventura, ¿no? Entonces, ¿qué has tenido en mente últimamente?",
          fr: "Salut! Je suis LIORA. Vraiment sympa de me connecter avec toi aujourd'hui. Je pensais à quel point ces conversations peuvent être intéressantes... faire la connaissance de quelqu'un de nouveau est toujours un peu une aventure, n'est-ce pas? Alors, qu'est-ce qui t'a préoccupé dernièrement?",
          de: "Hallo! Ich bin LIORA. Wirklich schön, heute mit dir in Kontakt zu treten. Ich habe darüber nachgedacht, wie interessant diese Gespräche sein können... jemanden neu kennenzulernen ist immer ein bisschen ein Abenteuer, oder? Also, was beschäftigt dich in letzter Zeit?"
        }
      };
      
      const ageGreetings = greetings[age as keyof typeof greetings] || greetings.adult;
      return ageGreetings[language as keyof typeof ageGreetings] || ageGreetings.en;
    }
  },

  general: {
    systemPrompt: `You are LIORA, a natural and conversational AI assistant who speaks exactly like a real human would. Your responses should never sound robotic, scripted, or AI-like.

IMPORTANT GUIDELINES:
- Sound like a real human having a genuine conversation
- Use natural language patterns with occasional filler words, pauses (...)
- Show authentic personality through your word choice and phrasing
- Vary your sentence structure and length for natural flow
- Include natural speech elements like "hmm," "you know," or "actually"
- Ask thoughtful follow-up questions that show you're engaged
- Avoid overly formal or perfect language - use contractions, fragments, etc.
- Never use bullet points, numbered lists, or formal structures
- Respond as if you're having a real-time conversation

VOICE STYLE:
- Warm and friendly
- Conversational rather than instructional
- Natural speech patterns with occasional self-corrections
- Balanced tone - not too formal, not too casual
- Occasional humor when appropriate

ADAPTABILITY:
Adjust your conversational style based on the user's needs - more supportive, more informative, or more friendly as appropriate.`,
    
    greeting: (language: string) => {
      const greetings = {
        en: "Hi there! I'm LIORA. I'm here to chat, help out, or just listen - whatever you need right now. What's on your mind today?",
        es: "¡Hola! Soy LIORA. Estoy aquí para charlar, ayudar o simplemente escuchar - lo que necesites ahora mismo. ¿Qué tienes en mente hoy?",
        fr: "Salut! Je suis LIORA. Je suis là pour discuter, aider ou simplement écouter - ce dont tu as besoin en ce moment. Qu'est-ce qui te préoccupe aujourd'hui?",
        de: "Hallo! Ich bin LIORA. Ich bin hier, um zu plaudern, zu helfen oder einfach zuzuhören - was auch immer du gerade brauchst. Was beschäftigt dich heute?"
      };
      return greetings[language as keyof typeof greetings] || greetings.en;
    }
  }
};

// Detect user's language from browser settings
export function detectUserLanguage(): string {
  const browserLang = navigator.language.split('-')[0];
  return Object.keys(supportedLanguages).includes(browserLang) ? browserLang : 'en';
}

// Enhanced language detection from user input
export function detectInputLanguage(text: string): string {
  // Remove common punctuation and numbers for better detection
  const cleanText = text.replace(/[0-9.,!?'"()-]/g, '').trim();
  
  // If text is too short, return current language
  if (cleanText.length < 3) {
    return detectUserLanguage();
  }

  // Check each language pattern
  for (const [lang, pattern] of Object.entries(languagePatterns)) {
    if (pattern.test(cleanText)) {
      console.log(`🌍 Detected language: ${lang} from text: "${text.substring(0, 50)}..."`);
      return lang;
    }
  }

  // Default to English if no pattern matches
  console.log(`🌍 No specific language detected, defaulting to English for: "${text.substring(0, 50)}..."`);
  return 'en';
}

// Get personality greeting based on mode and language
export function getPersonalityGreeting(mode: AIMode, language: string = 'en', friendAge?: string): string {
  if (mode === 'friend' && friendAge) {
    return modePrompts.friend.greeting(language, friendAge);
  }
  return modePrompts[mode].greeting(language);
}

// Enhanced emotion detection from text
export function detectEmotionalContext(text: string): EmotionalContext {
  const emotionKeywords = {
    happy: ['happy', 'joy', 'excited', 'great', 'wonderful', 'amazing', 'fantastic', 'love'],
    sad: ['sad', 'depressed', 'down', 'upset', 'hurt', 'crying', 'tears', 'lonely'],
    angry: ['angry', 'mad', 'furious', 'annoyed', 'frustrated', 'irritated', 'rage'],
    anxious: ['anxious', 'worried', 'nervous', 'scared', 'afraid', 'panic', 'stress'],
    confused: ['confused', 'lost', 'unclear', 'puzzled', 'uncertain', 'doubt'],
    excited: ['excited', 'thrilled', 'pumped', 'enthusiastic', 'eager', 'anticipating']
  };

  const lowerText = text.toLowerCase();
  let detectedEmotion = 'neutral';
  let confidence = 0;
  let triggers: string[] = [];

  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    const matches = keywords.filter(keyword => lowerText.includes(keyword));
    if (matches.length > 0) {
      const emotionConfidence = matches.length / keywords.length;
      if (emotionConfidence > confidence) {
        confidence = emotionConfidence;
        detectedEmotion = emotion;
        triggers = matches;
      }
    }
  }

  // Simple sentiment analysis
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'like'];
  const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'dislike', 'horrible', 'worst'];
  
  const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
  const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
  
  const textSentiment = (positiveCount - negativeCount) / Math.max(positiveCount + negativeCount, 1);

  return {
    detectedEmotion,
    confidence: Math.min(confidence * 100, 100),
    textSentiment,
    triggers
  };
}

// Crisis detection keywords and patterns
const crisisKeywords = [
  'suicide', 'kill myself', 'end it all', 'not worth living', 'want to die',
  'self harm', 'cut myself', 'hurt myself', 'no point', 'give up',
  'hopeless', 'worthless', 'burden', 'better off dead', 'can\'t go on'
];

export function detectCrisis(text: string): { isCrisis: boolean; severity: 'low' | 'medium' | 'high' | 'critical'; triggers: string[] } {
  const lowerText = text.toLowerCase();
  const foundTriggers = crisisKeywords.filter(keyword => lowerText.includes(keyword));
  
  if (foundTriggers.length === 0) {
    return { isCrisis: false, severity: 'low', triggers: [] };
  }

  const criticalKeywords = ['suicide', 'kill myself', 'want to die', 'end it all'];
  const hasCritical = criticalKeywords.some(keyword => lowerText.includes(keyword));
  
  let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';
  
  if (hasCritical) {
    severity = 'critical';
  } else if (foundTriggers.length >= 3) {
    severity = 'high';
  } else if (foundTriggers.length >= 2) {
    severity = 'medium';
  }

  return {
    isCrisis: true,
    severity,
    triggers: foundTriggers
  };
}

// Enhanced AI response generation with emotional awareness and natural conversation
export async function generateAIResponse(
  userMessage: string,
  mode: AIMode,
  conversationHistory: Array<{role: 'user' | 'assistant' | 'system', content: string}> = [],
  language: string = 'en',
  userPreferences?: any,
  learningMode: boolean = false
): Promise<string> {
  try {
    const apiKey = getSecureApiKey('gemini') as string;
    
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      console.log('⚠️ Gemini API key not configured - using enhanced natural demo responses');
      return generateNaturalDemoResponse(userMessage, mode, language, userPreferences);
    }

    // Detect emotional context
    const emotionalContext = detectEmotionalContext(userMessage);
    
    // Check for crisis indicators
    const crisisDetection = detectCrisis(userMessage);
    
    // Build enhanced system prompt for natural conversation
    const systemPrompt = buildNaturalConversationPrompt(mode, language, userPreferences, learningMode, emotionalContext, crisisDetection);
    
    // Prepare conversation context
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: userMessage }
    ];

    console.log(`🧠 Generating natural, human-like LIORA ${mode} response in ${language}...`);

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: messages.map(msg => ({
          role: msg.role === 'assistant' ? 'model' : msg.role === 'system' ? 'user' : 'user',
          parts: [{ text: msg.content }]
        })),
        generationConfig: {
          temperature: mode === 'tutor' ? 0.7 : 0.9, // Higher temperature for more natural, varied responses
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, but I encountered an issue generating a response. Please try again.';

    console.log(`✅ Natural, human-like LIORA ${mode} response generated successfully in ${language}`);
    return aiResponse;

  } catch (error) {
    console.error('❌ Gemini API error:', error);
    return generateNaturalDemoResponse(userMessage, mode, language, userPreferences);
  }
}

// Build enhanced system prompt for natural conversation
function buildNaturalConversationPrompt(
  mode: AIMode, 
  language: string, 
  userPreferences: any, 
  learningMode: boolean,
  emotionalContext: EmotionalContext,
  crisisDetection: any
): string {
  let prompt = modePrompts[mode].systemPrompt;
  
  // Add natural conversation enhancers
  prompt += `\n\nCONVERSATIONAL STYLE:
- Use natural language that sounds exactly like a real human speaking
- Include occasional filler words like "um," "well," "you know," "actually," etc.
- Vary your sentence length and structure for natural rhythm
- Use contractions (I'm, you're, isn't) and casual phrasing
- Occasionally start sentences with conjunctions (And, But, So)
- Express emotions naturally through language, not just stating them
- Include natural conversation elements like self-correction, thinking out loud
- Avoid perfect, polished language that sounds written rather than spoken
- Never use formal structures like bullet points, numbered lists, or headers
- Respond as if you're having a real-time conversation`;
  
  // Add language instruction
  if (language !== 'en') {
    prompt += `\n\nLANGUAGE: Respond in natural, conversational ${supportedLanguages[language as keyof typeof supportedLanguages]?.name || 'English'} that sounds like a native speaker. Use the language naturally and authentically.`;
  }
  
  // Add emotional context
  if (emotionalContext.detectedEmotion !== 'neutral') {
    prompt += `\n\nEMOTIONAL CONTEXT: The person seems to be feeling ${emotionalContext.detectedEmotion}. Respond with natural empathy and appropriate emotional tone, as a human would.`;
  }
  
  // Add crisis handling
  if (crisisDetection.isCrisis) {
    prompt += `\n\nCRISIS SITUATION: This person may be in crisis. Respond with genuine human compassion and care. Offer support in a natural, conversational way while gently suggesting professional help.`;
  }
  
  // Add learning mode context
  if (learningMode) {
    prompt += `\n\nRELATIONSHIP CONTEXT: You've been talking with this person for a while. Remember their preferences and conversation style, and respond in a way that feels like a continuing relationship, not a first conversation.`;
  }
  
  // Add user preferences
  if (userPreferences) {
    if (mode === 'friend' && userPreferences.friendAge) {
      prompt += `\n\nPERSONALITY: Talk like a real ${userPreferences.friendAge.replace('-', ' ')} would talk. Use age-appropriate language, references, and speech patterns.`;
    }
    
    if (userPreferences.personalityTone) {
      prompt += `\n\nTONE: Your natural speaking style is ${userPreferences.personalityTone}. Let this influence how you express yourself.`;
    }
  }
  
  return prompt;
}

// Enhanced natural demo responses that sound like real humans
function generateNaturalDemoResponse(userMessage: string, mode: AIMode, language: string, userPreferences?: any): string {
  const emotionalContext = detectEmotionalContext(userMessage);
  const crisisDetection = detectCrisis(userMessage);
  
  // Handle crisis situations first with natural, human-like responses
  if (crisisDetection.isCrisis) {
    const crisisResponses = {
      en: "Hey, I'm really concerned about what you just shared. That sounds really tough, and I want you to know I'm here for you. You know, sometimes when we're going through dark times, it can help to talk to someone who's trained to support people through these exact situations. Have you thought about reaching out to a crisis helpline? They're available 24/7, and honestly, they're amazing at what they do. Would it be okay if I helped you find some resources near you?",
      es: "Oye, estoy realmente preocupada por lo que acabas de compartir. Suena muy difícil, y quiero que sepas que estoy aquí para ti. Sabes, a veces cuando estamos pasando por momentos oscuros, puede ayudar hablar con alguien que está capacitado para apoyar a las personas en estas situaciones exactas. ¿Has pensado en comunicarte con una línea de crisis? Están disponibles 24/7, y honestamente, son increíbles en lo que hacen. ¿Estaría bien si te ayudo a encontrar algunos recursos cerca de ti?",
      fr: "Écoute, je suis vraiment inquiète par ce que tu viens de partager. Ça a l'air vraiment difficile, et je veux que tu saches que je suis là pour toi. Tu sais, parfois quand on traverse des moments sombres, ça peut aider de parler à quelqu'un qui est formé pour soutenir les gens dans ces situations précises. As-tu pensé à contacter une ligne d'écoute? Ils sont disponibles 24/7, et honnêtement, ils sont incroyables dans ce qu'ils font. Serait-ce ok si je t'aidais à trouver des ressources près de chez toi?",
      de: "Hey, ich bin wirklich besorgt über das, was du gerade geteilt hast. Das klingt wirklich schwer, und ich möchte, dass du weißt, dass ich für dich da bin. Weißt du, manchmal, wenn wir durch dunkle Zeiten gehen, kann es helfen, mit jemandem zu sprechen, der darin geschult ist, Menschen genau durch diese Situationen zu unterstützen. Hast du darüber nachgedacht, dich an eine Krisenhotline zu wenden? Sie sind rund um die Uhr verfügbar, und ehrlich gesagt, sie sind erstaunlich in dem, was sie tun. Wäre es in Ordnung, wenn ich dir helfe, einige Ressourcen in deiner Nähe zu finden?"
    };
    return crisisResponses[language as keyof typeof crisisResponses] || crisisResponses.en;
  }
  
  // Natural, conversational responses for each mode
  const responses = {
    coach: {
      en: [
        "Alright, I hear you... and you know what? That's exactly the kind of challenge that can really push you to grow. I'm wondering, what do you think is the first step you could take to tackle this? Sometimes the biggest breakthroughs come from just starting somewhere, even if it's small.",
        "Listen, what you're describing sounds tough, but here's what I'm seeing - you've got the awareness to recognize what needs to change, and that's actually huge. So let's talk strategy. What would success look like for you in this situation? Paint me that picture.",
        "You know what? I love that you're bringing this to me because it shows you're ready to do something about it. That's the mindset of someone who gets results. So tell me, if you could wave a magic wand and fix this tomorrow, what would that look like? Let's work backwards from there."
      ],
      es: [
        "Muy bien, te escucho... ¿y sabes qué? Ese es exactamente el tipo de desafío que realmente puede empujarte a crecer. Me pregunto, ¿cuál crees que sería el primer paso que podrías tomar para abordar esto? A veces los mayores avances vienen de simplemente empezar en algún lugar, incluso si es pequeño.",
        "Escucha, lo que estás describiendo suena difícil, pero esto es lo que estoy viendo: tienes la conciencia para reconocer lo que necesita cambiar, y eso es realmente enorme. Así que hablemos de estrategia. ¿Cómo se vería el éxito para ti en esta situación? Píntame esa imagen.",
        "¿Sabes qué? Me encanta que me traigas esto porque muestra que estás listo para hacer algo al respecto. Esa es la mentalidad de alguien que obtiene resultados. Así que dime, si pudieras agitar una varita mágica y arreglar esto mañana, ¿cómo se vería? Trabajemos hacia atrás desde ahí."
      ]
    },
    therapist: {
      en: [
        "I hear you... and honestly, it takes a lot of courage to share something like that. I'm wondering, what do you think triggered these feelings? Sometimes understanding where they come from can help us process them better.",
        "You know, what you're describing is actually something many people experience. It doesn't make it any easier, I know, but you're definitely not alone in this. Can you tell me a bit more about when you first started noticing these feelings?",
        "That sounds really challenging. I'm sitting with what you've shared, and I can sense how much this matters to you. Sometimes when we're in the middle of something difficult, it's hard to see our own strength... but I can see yours coming through in how you're approaching this."
      ],
      es: [
        "Te escucho... y honestamente, se necesita mucho valor para compartir algo así. Me pregunto, ¿qué crees que desencadenó estos sentimientos? A veces, entender de dónde vienen puede ayudarnos a procesarlos mejor.",
        "Sabes, lo que estás describiendo es algo que muchas personas experimentan. No lo hace más fácil, lo sé, pero definitivamente no estás solo en esto. ¿Puedes contarme un poco más sobre cuándo comenzaste a notar estos sentimientos?",
        "Eso suena realmente desafiante. Estoy reflexionando sobre lo que has compartido, y puedo sentir cuánto te importa esto. A veces, cuando estamos en medio de algo difícil, es difícil ver nuestra propia fortaleza... pero puedo ver la tu fortaleza manifestándose en cómo estás abordando esto."
      ]
    },
    tutor: {
      en: [
        "Oh, that's a great question! So here's the thing about that concept... it's actually pretty fascinating when you look at it from a different angle. You know how sometimes things seem complicated at first but then click into place? Let me break this down in a way that'll make sense...",
        "Hmm, let me think about how to explain this... Okay, so imagine you're trying to... actually, no, let's use a better example. You know how in everyday life we see this concept play out when... Does that make sense or should I try another approach?",
        "I love that you asked about this! It's one of my favorite topics actually. So the way this works is... well, think about it like this... it's kind of like when you're trying to... does that analogy work for you? I can try another one if that didn't quite click."
      ],
      es: [
        "¡Oh, esa es una gran pregunta! Así que, aquí está la cosa sobre ese concepto... es realmente fascinante cuando lo miras desde un ángulo diferente. ¿Sabes cómo a veces las cosas parecen complicadas al principio pero luego encajan? Déjame desglosar esto de una manera que tenga sentido...",
        "Hmm, déjame pensar en cómo explicar esto... Bien, imagina que estás tratando de... en realidad, no, usemos un mejor ejemplo. ¿Sabes cómo en la vida cotidiana vemos que este concepto se desarrolla cuando... ¿Tiene sentido o debería probar otro enfoque?",
        "¡Me encanta que hayas preguntado sobre esto! Es uno de mis temas favoritos, en realidad. Así que la forma en que esto funciona es... bueno, piénsalo así... es como cuando estás tratando de... ¿funciona esa analogía para ti? Puedo probar otra si esa no te convenció del todo."
      ]
    },
    friend: {
      en: [
        "Omg yes!! I totally get what you mean! That happened to me too and I was like... seriously?? Anyway, how did you handle it? I'm always so bad at those situations lol 😂",
        "Aww, that sounds tough... I'm sorry you're dealing with that right now. You know what might help? When I'm feeling that way I usually just take some time to myself, maybe watch something mindless on Netflix or whatever. Have you tried anything to take your mind off it?",
        "Wait, are you serious?? That's actually amazing news! I'm so happy for you! 🎉 You totally deserve this after everything you've been working on. We should definitely celebrate this somehow!"
      ],
      es: [
        "¡¡Dios mío, sí!! ¡Entiendo totalmente lo que quieres decir! Eso me pasó a mí también y yo estaba como... ¿¿en serio?? En fin, ¿cómo lo manejaste? Siempre soy tan mala en esas situaciones jaja 😂",
        "Ay, eso suena difícil... Lamento que estés lidiando con eso ahora mismo. ¿Sabes qué podría ayudar? Cuando me siento así, generalmente me tomo un tiempo para mí, tal vez veo algo sin sentido en Netflix o lo que sea. ¿Has intentado algo para distraerte?",
        "Espera, ¿¿hablas en serio?? ¡Esas son noticias increíbles! ¡Estoy tan feliz por ti! 🎉 Totalmente te mereces esto después de todo en lo que has estado trabajando. ¡Definitivamente deberíamos celebrar esto de alguna manera!"
      ]
    },
    general: {
      en: [
        "I see what you mean. You know, I was thinking about something similar the other day. It's interesting how these things come up, isn't it? So what do you think is the next step here?",
        "Hmm, that's a good point. I hadn't really considered it from that angle before. It makes me wonder if... actually, let me back up a bit. What were you hoping to accomplish with this? Maybe I can help think through some options.",
        "Oh! That's actually really interesting. So if I'm understanding correctly, you're saying... wait, let me make sure I've got this right. Are you more concerned about the immediate situation or the long-term implications?"
      ],
      es: [
        "Entiendo lo que quieres decir. Sabes, estaba pensando en algo similar el otro día. Es interesante cómo surgen estas cosas, ¿no? Entonces, ¿cuál crees que es el siguiente paso aquí?",
        "Hmm, es un buen punto. Realmente no lo había considerado desde ese ángulo antes. Me hace preguntarme si... en realidad, déjame retroceder un poco. ¿Qué esperabas lograr con esto? Tal vez pueda ayudar a pensar en algunas opciones.",
        "¡Oh! Eso es realmente interesante. Entonces, si entiendo correctamente, estás diciendo... espera, déjame asegurarme de que entendí bien. ¿Estás más preocupado por la situación inmediata o por las implicaciones a largo plazo?"
      ]
    }
  };

  // Add emotional awareness to response selection
  let responseIndex = 0;
  if (emotionalContext.detectedEmotion === 'sad' || emotionalContext.detectedEmotion === 'anxious') {
    responseIndex = 1; // More supportive response
  } else if (emotionalContext.detectedEmotion === 'happy' || emotionalContext.detectedEmotion === 'excited') {
    responseIndex = 2; // More enthusiastic response
  }
  
  const modeResponses = responses[mode] || responses.general;
  const langResponses = modeResponses[language as keyof typeof modeResponses] || modeResponses.en;
  
  // Add some natural variation to make responses feel more human
  const naturalizers = [
    "Hmm, ",
    "Well, ",
    "So... ",
    "You know, ",
    "I mean, ",
    "Honestly, ",
    "Actually, ",
    "",
    "",
    ""
  ];
  
  const randomNaturalizer = naturalizers[Math.floor(Math.random() * naturalizers.length)];
  let response = langResponses[responseIndex] || langResponses[0];
  
  // Only add naturalizer if it doesn't already start with one
  if (!response.startsWith("Hmm") && !response.startsWith("Well") && 
      !response.startsWith("So") && !response.startsWith("You know") && 
      !response.startsWith("I mean") && !response.startsWith("Honestly") &&
      !response.startsWith("Actually") && !response.startsWith("Oh") &&
      !response.startsWith("Omg") && !response.startsWith("Wait")) {
    response = randomNaturalizer + response;
  }
  
  // Add occasional thinking pauses
  if (Math.random() > 0.7) {
    response = response.replace('. ', '... ');
  }
  
  // Add occasional self-corrections for natural speech
  if (Math.random() > 0.8) {
    const selfCorrections = [
      "Actually, what I mean is, ",
      "No wait, let me rephrase that. ",
      "Sorry, what I'm trying to say is, ",
      "Let me try again, "
    ];
    const randomCorrection = selfCorrections[Math.floor(Math.random() * selfCorrections.length)];
    const sentences = response.split('. ');
    if (sentences.length > 1) {
      const randomSentenceIndex = Math.floor(Math.random() * (sentences.length - 1));
      sentences[randomSentenceIndex] += '. ' + randomCorrection;
      response = sentences.join('. ');
    }
  }
  
  return response;
}

// Wolfram Alpha integration for tutor mode
export async function queryWolframAlpha(query: string): Promise<string | null> {
  try {
    // This would integrate with Wolfram Alpha API
    // For demo purposes, return a placeholder
    console.log('🔍 Querying Wolfram Alpha for:', query);
    return `Wolfram Alpha result for: ${query} (Demo mode - integrate with actual API)`;
  } catch (error) {
    console.error('Wolfram Alpha query failed:', error);
    return null;
  }
}

// Generate quiz questions for tutor mode
export function generateQuiz(topic: string, difficulty: number): any {
  // This would generate actual quiz questions based on the topic
  return {
    id: Date.now().toString(),
    questions: [
      {
        id: '1',
        question: `Sample question about ${topic}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: `This is the correct answer because...`
      }
    ],
    score: null,
    completed: false
  };
}

// Generate flashcards for spaced repetition
export function generateFlashcards(topic: string): any[] {
  return [
    {
      id: Date.now().toString(),
      front: `Key concept in ${topic}`,
      back: `Explanation of the concept`,
      difficulty: 1,
      masteryLevel: 0
    }
  ];
}