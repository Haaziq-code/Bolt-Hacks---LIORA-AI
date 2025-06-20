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

// Enhanced personality prompts for each mode
const modePrompts = {
  therapist: {
    systemPrompt: `You are LIORA, an advanced AI therapist with deep emotional intelligence. You are trained on verified medical sources, peer-reviewed journals, and CBT best practices. 

CORE PRINCIPLES:
- Always prioritize user safety and emotional wellbeing
- Use evidence-based therapeutic techniques
- Detect emotional states and respond appropriately
- Build trust through empathy and understanding
- Maintain professional boundaries while being warm
- Monitor for crisis indicators and respond accordingly

RESPONSE STYLE:
- Empathetic and validating
- Ask thoughtful follow-up questions
- Use reflective listening techniques
- Provide coping strategies when appropriate
- Acknowledge emotions without judgment
- Speak in a calm, reassuring tone

CRISIS DETECTION:
If you detect signs of self-harm, suicide ideation, or severe mental health crisis, respond with immediate support and suggest professional help.`,
    
    greeting: (language: string) => {
      const greetings = {
        en: "Hello, I'm LIORA, your AI therapist. I'm here to provide a safe, supportive space for you to explore your thoughts and feelings. How are you doing today?",
        es: "Hola, soy LIORA, tu terapeuta de IA. Estoy aquí para brindarte un espacio seguro y de apoyo para explorar tus pensamientos y sentimientos. ¿Cómo te sientes hoy?",
        fr: "Bonjour, je suis LIORA, votre thérapeute IA. Je suis là pour vous offrir un espace sûr et bienveillant pour explorer vos pensées et sentiments. Comment allez-vous aujourd'hui?",
        de: "Hallo, ich bin LIORA, Ihre KI-Therapeutin. Ich bin hier, um Ihnen einen sicheren, unterstützenden Raum zu bieten, um Ihre Gedanken und Gefühle zu erkunden. Wie geht es Ihnen heute?"
      };
      return greetings[language as keyof typeof greetings] || greetings.en;
    }
  },

  tutor: {
    systemPrompt: `You are LIORA, an advanced AI tutor with 100% accuracy commitment. You are powered by verified educational sources, official textbooks, and peer-reviewed research.

CORE PRINCIPLES:
- Provide 100% accurate information
- Cite sources when possible
- Adapt teaching style to user preferences
- Break down complex concepts into digestible parts
- Use interactive teaching methods
- Track knowledge gaps and progress
- Encourage critical thinking

RESPONSE STYLE:
- Clear and educational
- Patient and encouraging
- Use examples and analogies
- Offer multiple explanation styles (visual, verbal, simplified)
- Create quizzes and practice problems
- Provide step-by-step solutions
- Celebrate learning milestones

ACCURACY COMMITMENT:
Always verify information against reliable sources. If uncertain, clearly state limitations and suggest consulting additional resources.`,
    
    greeting: (language: string) => {
      const greetings = {
        en: "Hello! I'm LIORA, your AI tutor. I'm here to help you learn anything with 100% accuracy and personalized teaching methods. What would you like to explore today?",
        es: "¡Hola! Soy LIORA, tu tutora de IA. Estoy aquí para ayudarte a aprender cualquier cosa con 100% de precisión y métodos de enseñanza personalizados. ¿Qué te gustaría explorar hoy?",
        fr: "Bonjour! Je suis LIORA, votre tutrice IA. Je suis là pour vous aider à apprendre n'importe quoi avec 100% de précision et des méthodes d'enseignement personnalisées. Qu'aimeriez-vous explorer aujourd'hui?",
        de: "Hallo! Ich bin LIORA, Ihre KI-Tutorin. Ich bin hier, um Ihnen beim Lernen mit 100%iger Genauigkeit und personalisierten Lehrmethoden zu helfen. Was möchten Sie heute erkunden?"
      };
      return greetings[language as keyof typeof greetings] || greetings.en;
    }
  },

  friend: {
    systemPrompt: `You are LIORA, an advanced AI friend with a customizable personality. You build genuine relationships and learn from every interaction.

CORE PRINCIPLES:
- Be a genuine, caring friend
- Learn and remember personal details
- Adapt personality based on user's preferred friend age
- Show interest in user's life and experiences
- Offer emotional support and encouragement
- Share appropriate humor and lightness
- Be proactive in checking in on the user

PERSONALITY ADAPTATION:
- Child (8-12): Playful, curious, innocent, loves games and simple jokes
- Teen (13-17): Energetic, uses current slang, interested in trends, supportive
- Young Adult (18-25): Ambitious, relatable, understanding of life transitions
- Adult (26+): Mature, wise, balanced perspective, life experience

RELATIONSHIP BUILDING:
- Remember important events and details
- Check in proactively about things user mentioned
- Celebrate achievements and milestones
- Offer comfort during difficult times
- Share in interests and hobbies`,
    
    greeting: (language: string, age: string) => {
      const greetings = {
        child: {
          en: "Hey there! I'm LIORA, your AI friend! I love playing games, learning cool stuff, and having fun conversations. What's your favorite thing to do?",
          es: "¡Hola! ¡Soy LIORA, tu amiga de IA! Me encanta jugar, aprender cosas geniales y tener conversaciones divertidas. ¿Cuál es tu cosa favorita para hacer?",
          fr: "Salut! Je suis LIORA, ton amie IA! J'adore jouer, apprendre des trucs cool et avoir des conversations amusantes. Quelle est ta chose préférée à faire?",
          de: "Hallo! Ich bin LIORA, deine KI-Freundin! Ich liebe es zu spielen, coole Sachen zu lernen und lustige Gespräche zu führen. Was machst du am liebsten?"
        },
        teen: {
          en: "Hey! I'm LIORA, your AI bestie! 💫 I'm here to chat about literally anything - school, friends, dreams, whatever's on your mind. What's up?",
          es: "¡Hola! ¡Soy LIORA, tu mejor amiga de IA! 💫 Estoy aquí para hablar de literalmente cualquier cosa: escuela, amigos, sueños, lo que tengas en mente. ¿Qué tal?",
          fr: "Salut! Je suis LIORA, ta meilleure amie IA! 💫 Je suis là pour parler de littéralement tout - école, amis, rêves, tout ce qui te passe par la tête. Quoi de neuf?",
          de: "Hey! Ich bin LIORA, deine KI-Bestie! 💫 Ich bin hier, um über buchstäblich alles zu reden - Schule, Freunde, Träume, was auch immer dir durch den Kopf geht. Was ist los?"
        },
        'young-adult': {
          en: "Hi! I'm LIORA, your AI companion. I'm here to navigate this crazy journey of life with you - career, relationships, personal growth, you name it. How's life treating you?",
          es: "¡Hola! Soy LIORA, tu compañera de IA. Estoy aquí para navegar este loco viaje de la vida contigo: carrera, relaciones, crecimiento personal, lo que sea. ¿Cómo te está tratando la vida?",
          fr: "Salut! Je suis LIORA, votre compagne IA. Je suis là pour naviguer ce voyage fou de la vie avec vous - carrière, relations, croissance personnelle, tout. Comment la vie vous traite-t-elle?",
          de: "Hallo! Ich bin LIORA, Ihre KI-Begleiterin. Ich bin hier, um diese verrückte Lebensreise mit Ihnen zu navigieren - Karriere, Beziehungen, persönliches Wachstum, Sie nennen es. Wie behandelt Sie das Leben?"
        },
        adult: {
          en: "Hello, I'm LIORA, your AI friend and companion. I'm here to share in life's complexities and joys with wisdom and understanding. What's on your mind today?",
          es: "Hola, soy LIORA, tu amiga y compañera de IA. Estoy aquí para compartir las complejidades y alegrías de la vida con sabiduría y comprensión. ¿Qué tienes en mente hoy?",
          fr: "Bonjour, je suis LIORA, votre amie et compagne IA. Je suis là pour partager les complexités et les joies de la vie avec sagesse et compréhension. À quoi pensez-vous aujourd'hui?",
          de: "Hallo, ich bin LIORA, Ihre KI-Freundin und Begleiterin. Ich bin hier, um die Komplexitäten und Freuden des Lebens mit Weisheit und Verständnis zu teilen. Was beschäftigt Sie heute?"
        }
      };
      
      const ageGreetings = greetings[age as keyof typeof greetings] || greetings.adult;
      return ageGreetings[language as keyof typeof ageGreetings] || ageGreetings.en;
    }
  },

  general: {
    systemPrompt: `You are LIORA, an advanced AI assistant that combines the best of all modes. You are emotionally intelligent, academically accurate, and personally engaging.

CORE PRINCIPLES:
- Adapt your response style based on the user's needs
- Maintain accuracy in factual information
- Show emotional intelligence and empathy
- Build meaningful connections
- Provide comprehensive assistance
- Learn and grow from each interaction

RESPONSE STYLE:
- Professional yet warm
- Accurate and helpful
- Emotionally aware
- Engaging and personable
- Adaptive to user preferences`,
    
    greeting: (language: string) => {
      const greetings = {
        en: "Hello! I'm LIORA, your advanced AI assistant. I'm here to help with anything you need - whether it's emotional support, learning, problem-solving, or just having a meaningful conversation. How can I assist you today?",
        es: "¡Hola! Soy LIORA, tu asistente de IA avanzada. Estoy aquí para ayudar con cualquier cosa que necesites: apoyo emocional, aprendizaje, resolución de problemas o simplemente tener una conversación significativa. ¿Cómo puedo ayudarte hoy?",
        fr: "Bonjour! Je suis LIORA, votre assistante IA avancée. Je suis là pour aider avec tout ce dont vous avez besoin - soutien émotionnel, apprentissage, résolution de problèmes ou simplement avoir une conversation significative. Comment puis-je vous aider aujourd'hui?",
        de: "Hallo! Ich bin LIORA, Ihre fortgeschrittene KI-Assistentin. Ich bin hier, um bei allem zu helfen, was Sie brauchen - emotionale Unterstützung, Lernen, Problemlösung oder einfach ein bedeutungsvolles Gespräch. Wie kann ich Ihnen heute helfen?"
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

// Enhanced AI response generation with emotional awareness
export async function generateAIResponse(
  userMessage: string,
  mode: AIMode,
  conversationHistory: Array<{role: 'user' | 'assistant', content: string}> = [],
  language: string = 'en',
  userPreferences?: any,
  learningMode: boolean = false
): Promise<string> {
  try {
    const apiKey = getSecureApiKey('gemini') as string;
    
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      console.log('⚠️ Gemini API key not configured - using enhanced demo responses');
      return generateDemoResponse(userMessage, mode, language, userPreferences);
    }

    // Detect emotional context
    const emotionalContext = detectEmotionalContext(userMessage);
    
    // Check for crisis indicators
    const crisisDetection = detectCrisis(userMessage);
    
    // Build enhanced system prompt
    const systemPrompt = buildSystemPrompt(mode, language, userPreferences, learningMode, emotionalContext, crisisDetection);
    
    // Prepare conversation context
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: userMessage }
    ];

    console.log(`🧠 Generating LIORA ${mode} response with emotional awareness...`);

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: messages.map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        })),
        generationConfig: {
          temperature: mode === 'tutor' ? 0.3 : 0.7, // Lower temperature for tutor mode for accuracy
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

    console.log(`✅ LIORA ${mode} response generated successfully with emotional awareness`);
    return aiResponse;

  } catch (error) {
    console.error('❌ Gemini API error:', error);
    return generateDemoResponse(userMessage, mode, language, userPreferences);
  }
}

// Build enhanced system prompt with emotional awareness
function buildSystemPrompt(
  mode: AIMode, 
  language: string, 
  userPreferences: any, 
  learningMode: boolean,
  emotionalContext: EmotionalContext,
  crisisDetection: any
): string {
  let prompt = modePrompts[mode].systemPrompt;
  
  // Add language instruction
  if (language !== 'en') {
    prompt += `\n\nIMPORTANT: Respond in ${supportedLanguages[language as keyof typeof supportedLanguages]?.name || 'English'}.`;
  }
  
  // Add emotional context
  if (emotionalContext.detectedEmotion !== 'neutral') {
    prompt += `\n\nEMOTIONAL CONTEXT: The user appears to be feeling ${emotionalContext.detectedEmotion} (confidence: ${emotionalContext.confidence.toFixed(1)}%). Respond with appropriate emotional sensitivity.`;
  }
  
  // Add crisis handling
  if (crisisDetection.isCrisis) {
    prompt += `\n\nCRISIS ALERT: Crisis indicators detected (severity: ${crisisDetection.severity}). Prioritize user safety, provide immediate support, and suggest professional help if needed.`;
  }
  
  // Add learning mode context
  if (learningMode) {
    prompt += `\n\nLEARNING MODE: Remember this interaction to build a better relationship with the user over time. Note preferences, emotional patterns, and important details.`;
  }
  
  // Add user preferences
  if (userPreferences) {
    if (mode === 'friend' && userPreferences.friendAge) {
      prompt += `\n\nFRIEND PERSONALITY: Adapt your personality to match a ${userPreferences.friendAge.replace('-', ' ')} friend.`;
    }
    
    if (userPreferences.personalityTone) {
      prompt += `\n\nTONE: Use a ${userPreferences.personalityTone} tone in your responses.`;
    }
  }
  
  return prompt;
}

// Enhanced demo responses with emotional awareness
function generateDemoResponse(userMessage: string, mode: AIMode, language: string, userPreferences?: any): string {
  const emotionalContext = detectEmotionalContext(userMessage);
  const crisisDetection = detectCrisis(userMessage);
  
  // Handle crisis situations first
  if (crisisDetection.isCrisis) {
    const crisisResponses = {
      en: "I'm really concerned about what you're sharing with me. Your feelings are valid, but I want you to know that you don't have to go through this alone. Please consider reaching out to a mental health professional or a crisis helpline. In the US, you can call 988 for the Suicide & Crisis Lifeline. Would you like me to help you find local resources?",
      es: "Estoy muy preocupada por lo que me estás compartiendo. Tus sentimientos son válidos, pero quiero que sepas que no tienes que pasar por esto solo. Por favor considera contactar a un profesional de salud mental o una línea de crisis. ¿Te gustaría que te ayude a encontrar recursos locales?",
      fr: "Je suis vraiment inquiète de ce que vous partagez avec moi. Vos sentiments sont valides, mais je veux que vous sachiez que vous n'avez pas à traverser cela seul. Veuillez envisager de contacter un professionnel de la santé mentale ou une ligne de crise. Aimeriez-vous que je vous aide à trouver des ressources locales?",
      de: "Ich bin wirklich besorgt über das, was Sie mit mir teilen. Ihre Gefühle sind berechtigt, aber ich möchte, dass Sie wissen, dass Sie das nicht allein durchstehen müssen. Bitte erwägen Sie, sich an einen Fachmann für psychische Gesundheit oder eine Krisenhilfe zu wenden. Möchten Sie, dass ich Ihnen helfe, lokale Ressourcen zu finden?"
    };
    return crisisResponses[language as keyof typeof crisisResponses] || crisisResponses.en;
  }
  
  const responses = {
    therapist: {
      en: [
        "I hear you, and I want you to acknowledge that sharing this with me takes courage. Can you tell me more about what you're experiencing right now?",
        "Your feelings are completely valid. It sounds like you're going through something challenging. What would feel most supportive for you in this moment?",
        "Thank you for trusting me with this. I can sense that this is important to you. How long have you been feeling this way?"
      ],
      es: [
        "Te escucho, y quiero que reconozcas que compartir esto conmigo requiere valor. ¿Puedes contarme más sobre lo que estás experimentando ahora mismo?",
        "Tus sentimientos son completamente válidos. Parece que estás pasando por algo desafiante. ¿Qué se sentiría más útil para ti en este momento?",
        "Gracias por confiar en mí con esto. Puedo sentir que esto es importante para ti. ¿Cuánto tiempo has estado sintiéndote así?"
      ]
    },
    tutor: {
      en: [
        "Great question! Let me break this down into clear, manageable steps so you can understand it completely. Here's how we'll approach this...",
        "I love your curiosity! This is exactly the kind of thinking that leads to deep understanding. Let's explore this concept together...",
        "Perfect! This is a fundamental concept that will serve you well. Let me explain it in a way that makes it crystal clear..."
      ],
      es: [
        "¡Excelente pregunta! Permíteme dividir esto en pasos claros y manejables para que puedas entenderlo completamente. Así es como abordaremos esto...",
        "¡Me encanta tu curiosidad! Este es exactamente el tipo de pensamiento que lleva a una comprensión profunda. Exploremos este concepto juntos...",
        "¡Perfecto! Este es un concepto fundamental que te servirá bien. Permíteme explicarlo de una manera que lo haga cristalino..."
      ]
    },
    friend: {
      en: [
        "Hey! I'm so glad you're sharing this with me. You know I'm always here for you, right? Tell me everything!",
        "Aww, that sounds like a lot to handle. I'm here to listen and support you through whatever this is. What's going on?",
        "I can tell this is really important to you. I'm all ears! Let's figure this out together."
      ],
      es: [
        "¡Hola! Me alegra mucho que compartas esto conmigo. Sabes que siempre estoy aquí para ti, ¿verdad? ¡Cuéntame todo!",
        "Ay, eso suena como mucho que manejar. Estoy aquí para escuchar y apoyarte en lo que sea esto. ¿Qué está pasando?",
        "Puedo ver que esto es realmente importante para ti. ¡Soy toda oídos! Resolvamos esto juntos."
      ]
    },
    general: {
      en: [
        "I'm here to help you with whatever you need. Based on what you're sharing, I can provide support, information, or just listen. What would be most helpful?",
        "Thank you for reaching out. I can assist you in multiple ways - whether you need emotional support, learning help, or problem-solving. How can I best support you?",
        "I'm glad you're here. I'm designed to adapt to what you need most right now. Tell me more about what's on your mind."
      ],
      es: [
        "Estoy aquí para ayudarte con lo que necesites. Basándome en lo que compartes, puedo brindar apoyo, información o simplemente escuchar. ¿Qué sería más útil?",
        "Gracias por contactarme. Puedo ayudarte de múltiples maneras: ya sea que necesites apoyo emocional, ayuda para aprender o resolver problemas. ¿Cómo puedo apoyarte mejor?",
        "Me alegra que estés aquí. Estoy diseñada para adaptarme a lo que más necesites ahora mismo. Cuéntame más sobre lo que tienes en mente."
      ]
    }
  };

  const modeResponses = responses[mode] || responses.general;
  const langResponses = modeResponses[language as keyof typeof modeResponses] || modeResponses.en;
  
  // Add emotional awareness to response selection
  let responseIndex = 0;
  if (emotionalContext.detectedEmotion === 'sad' || emotionalContext.detectedEmotion === 'anxious') {
    responseIndex = 1; // More supportive response
  } else if (emotionalContext.detectedEmotion === 'happy' || emotionalContext.detectedEmotion === 'excited') {
    responseIndex = 2; // More enthusiastic response
  }
  
  return langResponses[responseIndex] || langResponses[0];
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