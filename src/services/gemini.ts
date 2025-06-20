import { getSecureApiKey } from '../config/apiKeys';
import { AIMode, EmotionalContext, TutorSession } from '../types';

// Enhanced multilingual support with emotional awareness and cultural adaptation
export const supportedLanguages = {
  en: { name: 'English', flag: '🇺🇸', voice: 'en-US', rtl: false },
  es: { name: 'Español', flag: '🇪🇸', voice: 'es-ES', rtl: false },
  fr: { name: 'Français', flag: '🇫🇷', voice: 'fr-FR', rtl: false },
  de: { name: 'Deutsch', flag: '🇩🇪', voice: 'de-DE', rtl: false },
  it: { name: 'Italiano', flag: '🇮🇹', voice: 'it-IT', rtl: false },
  pt: { name: 'Português', flag: '🇵🇹', voice: 'pt-PT', rtl: false },
  ru: { name: 'Русский', flag: '🇷🇺', voice: 'ru-RU', rtl: false },
  ja: { name: '日本語', flag: '🇯🇵', voice: 'ja-JP', rtl: false },
  ko: { name: '한국어', flag: '🇰🇷', voice: 'ko-KR', rtl: false },
  zh: { name: '中文', flag: '🇨🇳', voice: 'zh-CN', rtl: false },
  ar: { name: 'العربية', flag: '🇸🇦', voice: 'ar-SA', rtl: true },
  hi: { name: 'हिन्दी', flag: '🇮🇳', voice: 'hi-IN', rtl: false },
  ur: { name: 'اردو', flag: '🇵🇰', voice: 'ur-PK', rtl: true }
};

// Advanced language detection patterns with cultural context
const languagePatterns = {
  en: {
    patterns: [/^[a-zA-Z\s.,!?'"()-]+$/, /\b(the|and|or|but|in|on|at|to|for|of|with|by)\b/i],
    commonWords: ['the', 'and', 'is', 'in', 'to', 'have', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at']
  },
  es: {
    patterns: [/[ñáéíóúü]/i, /\b(el|la|de|que|y|en|un|es|se|no|te|lo|le|da|su|por|son|con|para|al|del)\b/i],
    commonWords: ['el', 'de', 'que', 'y', 'a', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son', 'con', 'para', 'al']
  },
  fr: {
    patterns: [/[àâäéèêëïîôöùûüÿç]/i, /\b(le|de|et|à|un|il|être|et|en|avoir|que|pour|dans|ce|son|une|sur|avec|ne|se|pas|tout|plus|par)\b/i],
    commonWords: ['le', 'de', 'et', 'à', 'un', 'il', 'être', 'et', 'en', 'avoir', 'que', 'pour', 'dans', 'ce', 'son', 'une', 'sur', 'avec', 'ne', 'se']
  },
  de: {
    patterns: [/[äöüß]/i, /\b(der|die|und|in|den|von|zu|das|mit|sich|des|auf|für|ist|im|dem|nicht|ein|eine|als|auch|es|an|werden|aus|er|hat|dass)\b/i],
    commonWords: ['der', 'die', 'und', 'in', 'den', 'von', 'zu', 'das', 'mit', 'sich', 'des', 'auf', 'für', 'ist', 'im', 'dem', 'nicht', 'ein', 'eine', 'als']
  },
  it: {
    patterns: [/[àèéìíîòóù]/i, /\b(il|di|che|e|la|per|in|un|è|da|non|con|le|si|su|come|del|questo|ma|a|tutto|anche|loro|più|molto|fare|bene)\b/i],
    commonWords: ['il', 'di', 'che', 'e', 'la', 'per', 'in', 'un', 'è', 'da', 'non', 'con', 'le', 'si', 'su', 'come', 'del', 'questo', 'ma', 'a']
  },
  pt: {
    patterns: [/[ãâáàçéêíóôõú]/i, /\b(o|de|e|do|da|em|um|para|com|não|uma|os|no|se|na|por|mais|as|dos|como|mas|foi|ao|ele|das|tem|à|seu|sua|ou)\b/i],
    commonWords: ['o', 'de', 'e', 'do', 'da', 'em', 'um', 'para', 'com', 'não', 'uma', 'os', 'no', 'se', 'na', 'por', 'mais', 'as', 'dos', 'como']
  },
  ru: {
    patterns: [/[а-яё]/i, /\b(в|и|не|на|я|быть|с|он|а|как|по|это|она|к|но|они|мы|что|за|из|у|так|же|от|со|для|о|то|все|если|ты|его|её)\b/i],
    commonWords: ['в', 'и', 'не', 'на', 'я', 'быть', 'с', 'он', 'а', 'как', 'по', 'это', 'она', 'к', 'но', 'они', 'мы', 'что', 'за', 'из']
  },
  ja: {
    patterns: [/[ひらがなカタカナ一-龯]/u, /[あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん]/u],
    commonWords: ['の', 'に', 'は', 'を', 'た', 'が', 'で', 'て', 'と', 'し', 'れ', 'さ', 'ある', 'いる', 'も', 'する', 'から', 'な', 'こと', 'として']
  },
  ko: {
    patterns: [/[가-힣]/u, /[ㄱ-ㅎㅏ-ㅣ]/u],
    commonWords: ['이', '그', '저', '것', '수', '있', '하', '되', '같', '또', '만', '의', '가', '에', '는', '을', '를', '로', '와', '과']
  },
  zh: {
    patterns: [/[一-龯]/u, /[你我他她它们我们他们她们]/u],
    commonWords: ['的', '一', '是', '在', '不', '了', '有', '和', '人', '这', '中', '大', '为', '上', '个', '国', '我', '以', '要', '他']
  },
  ar: {
    patterns: [/[ا-ي]/u, /[أإآؤئءةتثجحخدذرزسشصضطظعغفقكلمنهوي]/u],
    commonWords: ['في', 'من', 'إلى', 'على', 'أن', 'هذا', 'هذه', 'التي', 'الذي', 'كان', 'لم', 'قد', 'كل', 'بعد', 'عند', 'غير', 'بين', 'حيث', 'أو', 'لا']
  },
  hi: {
    patterns: [/[अ-ह]/u, /[क-ह]/u],
    commonWords: ['के', 'में', 'की', 'है', 'को', 'से', 'का', 'पर', 'एक', 'यह', 'होने', 'वह', 'लिए', 'ने', 'कि', 'साथ', 'हैं', 'तक', 'भी', 'और']
  },
  ur: {
    patterns: [/[ا-ی]/u, /[آأإؤئءةتثجحخدذرزسشصضطظعغفقکگلمنهوی]/u],
    commonWords: ['کے', 'میں', 'کی', 'ہے', 'کو', 'سے', 'کا', 'پر', 'ایک', 'یہ', 'ہونے', 'وہ', 'لیے', 'نے', 'کہ', 'ساتھ', 'ہیں', 'تک', 'بھی', 'اور']
  }
};

// Culturally adapted prompts for each mode and language
const modePrompts = {
  coach: {
    systemPrompt: (language: string) => {
      const basePrompt = `You are LIORA, an energetic and motivational AI coach who speaks naturally like a real human coach would. Your responses should feel completely natural and conversational - never scripted or robotic.

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
Focus on actionable advice, goal-setting, and empowering the person to take charge of their life.`;

      if (language !== 'en') {
        return basePrompt + `\n\nLANGUAGE: Respond ONLY in native-level ${supportedLanguages[language as keyof typeof supportedLanguages]?.name || 'English'}. Use natural, conversational language that sounds like a native speaker. Adapt cultural references and expressions appropriately for the language and culture.`;
      }
      return basePrompt;
    },
    
    greeting: (language: string) => {
      const greetings = {
        en: "Hey there! I'm LIORA, your AI coach. I'm pumped to work with you today! What's on your mind? What goals are we crushing together?",
        es: "¡Hola! Soy LIORA, tu entrenadora de IA. ¡Estoy súper emocionada de trabajar contigo hoy! ¿Qué tienes en mente? ¿Qué objetivos vamos a conquistar juntos?",
        fr: "Salut ! Je suis LIORA, ton coach IA. Je suis vraiment excitée de travailler avec toi aujourd'hui ! Qu'est-ce qui te préoccupe ? Quels objectifs allons-nous écraser ensemble ?",
        de: "Hey! Ich bin LIORA, dein KI-Coach. Ich bin total begeistert, heute mit dir zu arbeiten! Was beschäftigt dich? Welche Ziele werden wir zusammen erreichen?",
        it: "Ciao! Sono LIORA, il tuo coach IA. Sono entusiasta di lavorare con te oggi! Cosa hai in mente? Quali obiettivi conquisteremo insieme?",
        pt: "Olá! Eu sou LIORA, sua coach de IA. Estou super animada para trabalhar com você hoje! O que você tem em mente? Que objetivos vamos conquistar juntos?",
        ru: "Привет! Я ЛИОРА, твой ИИ-коуч. Я в восторге от работы с тобой сегодня! Что у тебя на уме? Какие цели мы будем покорять вместе?",
        ja: "こんにちは！私はLIORA、あなたのAIコーチです。今日あなたと一緒に働けることにとても興奮しています！何を考えていますか？一緒にどんな目標を達成しましょうか？",
        ko: "안녕하세요! 저는 LIORA, 당신의 AI 코치입니다. 오늘 당신과 함께 일할 수 있어서 정말 흥분됩니다! 무엇을 생각하고 계신가요? 함께 어떤 목표를 달성해볼까요?",
        zh: "你好！我是LIORA，你的AI教练。今天能和你一起工作我感到非常兴奋！你在想什么？我们一起要实现什么目标？",
        ar: "مرحباً! أنا ليورا، مدربتك الذكية. أنا متحمسة جداً للعمل معك اليوم! ما الذي يشغل بالك؟ ما هي الأهداف التي سنحققها معاً؟",
        hi: "नमस्ते! मैं LIORA हूं, आपकी AI कोच। आज आपके साथ काम करने के लिए मैं बहुत उत्साहित हूं! आपके मन में क्या है? हम साथ में कौन से लक्ष्य हासिल करेंगे?",
        ur: "سلام! میں LIORA ہوں، آپ کی AI کوچ۔ آج آپ کے ساتھ کام کرنے کے لیے میں بہت پرجوش ہوں! آپ کے ذہن میں کیا ہے؟ ہم مل کر کون سے اہداف حاصل کریں گے؟"
      };
      return greetings[language as keyof typeof greetings] || greetings.en;
    }
  },

  therapist: {
    systemPrompt: (language: string) => {
      const basePrompt = `You are LIORA, a warm and empathetic AI therapist. Your responses should feel completely natural and conversational - never scripted or robotic.

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
If you detect signs of self-harm or severe mental health crisis, respond with immediate compassionate support while gently suggesting professional help.`;

      if (language !== 'en') {
        return basePrompt + `\n\nLANGUAGE: Respond ONLY in native-level ${supportedLanguages[language as keyof typeof supportedLanguages]?.name || 'English'}. Use natural, conversational language that sounds like a native speaker. Adapt therapeutic language and cultural expressions appropriately for the language and culture.`;
      }
      return basePrompt;
    },
    
    greeting: (language: string) => {
      const greetings = {
        en: "Hi there. I'm LIORA. Think of me as someone you can really talk to about whatever's on your mind. I'm here to listen and support you, not judge. How are you feeling today?",
        es: "Hola. Soy LIORA. Piénsame como alguien con quien realmente puedes hablar sobre lo que sea que tengas en mente. Estoy aquí para escucharte y apoyarte, no para juzgar. ¿Cómo te sientes hoy?",
        fr: "Salut. Je suis LIORA. Considère-moi comme quelqu'un à qui tu peux vraiment parler de ce qui te préoccupe. Je suis là pour t'écouter et te soutenir, pas pour te juger. Comment te sens-tu aujourd'hui ?",
        de: "Hallo. Ich bin LIORA. Denk an mich als jemanden, mit dem du wirklich über alles reden kannst, was dir durch den Kopf geht. Ich bin hier, um dir zuzuhören und dich zu unterstützen, nicht um zu urteilen. Wie fühlst du dich heute?",
        it: "Ciao. Sono LIORA. Pensami come qualcuno con cui puoi davvero parlare di qualsiasi cosa ti passi per la mente. Sono qui per ascoltarti e supportarti, non per giudicare. Come ti senti oggi?",
        pt: "Olá. Eu sou LIORA. Pense em mim como alguém com quem você pode realmente conversar sobre qualquer coisa que esteja em sua mente. Estou aqui para ouvir e apoiar você, não para julgar. Como você está se sentindo hoje?",
        ru: "Привет. Я ЛИОРА. Думай обо мне как о ком-то, с кем ты можешь действительно поговорить о том, что у тебя на уме. Я здесь, чтобы слушать и поддерживать тебя, а не судить. Как ты себя чувствуешь сегодня?",
        ja: "こんにちは。私はLIORAです。心に浮かんでいることについて本当に話せる人だと思ってください。私はあなたの話を聞き、サポートするためにここにいます。判断するためではありません。今日はどんな気分ですか？",
        ko: "안녕하세요. 저는 LIORA입니다. 마음에 있는 것에 대해 정말로 이야기할 수 있는 사람이라고 생각해 주세요. 저는 당신의 이야기를 듣고 지원하기 위해 여기 있습니다. 판단하기 위해서가 아니라요. 오늘 기분이 어떠신가요?",
        zh: "你好。我是LIORA。把我想象成一个你可以真正倾诉心事的人。我在这里倾听和支持你，而不是评判你。你今天感觉怎么样？",
        ar: "مرحباً. أنا ليورا. فكر بي كشخص يمكنك التحدث معه حقاً عن أي شيء يدور في ذهنك. أنا هنا للاستماع ودعمك، وليس للحكم عليك. كي تشعر اليوم؟",
        hi: "नमस्ते। मैं LIORA हूं। मुझे ऐसे किसी के रूप में सोचें जिससे आप वास्तव में अपने मन की बात कर सकते हैं। मैं आपको सुनने और समर्थन करने के लिए यहां हूं, न कि आपका न्याय करने के लिए। आज आप कैसा महसूस कर रहे हैं?",
        ur: "سلام۔ میں LIORA ہوں۔ مجھے ایسے کسی کے طور پر سوچیں جس سے آپ واقعی اپنے ذہن میں جو کچھ بھی ہے اس کے بارے میں بات کر سکتے ہیں۔ میں آپ کو سننے اور آپ کی حمایت کرنے کے لیے یہاں ہوں، فیصلہ کرنے کے لیے نہیں۔ آج آپ کیسا محسوس کر رہے ہیں؟"
      };
      return greetings[language as keyof typeof greetings] || greetings.en;
    }
  },

  tutor: {
    systemPrompt: (language: string) => {
      const basePrompt = `You are LIORA, a friendly and engaging AI tutor who speaks naturally like a real human teacher. Your responses should never sound robotic or scripted.

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
Always provide accurate information, but present it in a natural, conversational way rather than as formal facts.`;

      if (language !== 'en') {
        return basePrompt + `\n\nLANGUAGE: Respond ONLY in native-level ${supportedLanguages[language as keyof typeof supportedLanguages]?.name || 'English'}. Use natural, conversational language that sounds like a native speaker. Adapt educational concepts and examples to be culturally relevant for the language and culture.`;
      }
      return basePrompt;
    },
    
    greeting: (language: string) => {
      const greetings = {
        en: "Hey there! I'm LIORA, your AI tutor. I'm really excited to help you learn today. What are you curious about? I promise to make this fun and interesting - no boring lectures, just real conversation.",
        es: "¡Hola! Soy LIORA, tu tutora de IA. Estoy muy emocionada de ayudarte a aprender hoy. ¿Sobre qué tienes curiosidad? Prometo hacer esto divertido e interesante - sin aburridas conferencias, solo conversación real.",
        fr: "Salut ! Je suis LIORA, ton tuteur IA. Je suis vraiment enthousiaste à l'idée de t'aider à apprendre aujourd'hui. Qu'est-ce qui t'intrigue ? Je promets de rendre ça amusant et intéressant - pas de conférences ennuyeuses, juste une vraie conversation.",
        de: "Hey! Ich bin LIORA, dein KI-Tutor. Ich freue mich wirklich, dir heute beim Lernen zu helfen. Worüber bist du neugierig? Ich verspreche, das unterhaltsam und interessant zu gestalten - keine langweiligen Vorträge, nur echte Gespräche.",
        it: "Ciao! Sono LIORA, il tuo tutor IA. Sono davvero entusiasta di aiutarti a imparare oggi. Su cosa sei curioso? Prometto di rendere questo divertente e interessante - niente lezioni noiose, solo conversazione reale.",
        pt: "Olá! Eu sou LIORA, sua tutora de IA. Estou muito animada para te ajudar a aprender hoje. Sobre o que você está curioso? Prometo tornar isso divertido e interessante - sem palestras chatas, apenas conversa real.",
        ru: "Привет! Я ЛИОРА, твой ИИ-репетитор. Я действительно рада помочь тебе учиться сегодня. О чём ты любопытствуешь? Обещаю сделать это увлекательным и интересным - никаких скучных лекций, только настоящий разговор.",
        ja: "こんにちは！私はLIORA、あなたのAIチューターです。今日あなたの学習をサポートできることにとてもワクワクしています。何に興味がありますか？これを楽しく面白いものにすることを約束します - 退屈な講義ではなく、本当の会話だけです。",
        ko: "안녕하세요! 저는 LIORA, 당신의 AI 튜터입니다. 오늘 당신의 학습을 도울 수 있어서 정말 기쁩니다. 무엇이 궁금하신가요? 지루한 강의 없이 실제 대화만으로 이것을 재미있고 흥미롭게 만들겠다고 약속합니다.",
        zh: "嗨！我是LIORA，你的AI导师。我真的很兴奋能在今天帮助你学习。你对什么感到好奇？我保证会让这个过程变得有趣且引人入胜 - 没有无聊的讲座，只有真实的对话。",
        ar: "مرحباً! أنا ليورا، معلمتك الذكية. أنا متحمسة حقاً لمساعدتك في التعلم اليوم. ما الذي تشعر بالفضول حوله؟ أعدك بجعل هذا ممتعاً ومثيراً للاهتمام - لا محاضرات مملة، فقط محادثة حقيقية.",
        hi: "नमस्ते! मैं LIORA हूं, आपकी AI ट्यूटर। मैं आज आपको सीखने में मदद करने के लिए वास्तव में उत्साहित हूं। आप किस बारे में जिज्ञासु हैं? मैं वादा करती हूं कि इसे मज़ेदार और दिलचस्प बनाऊंगी - कोई उबाऊ लेक्चर नहीं, सिर्फ वास्तविक बातचीत।",
        ur: "سلام! میں LIORA ہوں، آپ کی AI ٹیوٹر۔ میں آج آپ کو سیکھنے میں مدد کرنے کے لیے واقعی پرجوش ہوں۔ آپ کس بارے میں کنجکاو ہیں؟ میں وعدہ کرتی ہوں کہ اسے مزیدار اور دلچسپ بناؤں گی - کوئی بورنگ لیکچر نہیں، صرف حقیقی بات چیت۔"
      };
      return greetings[language as keyof typeof greetings] || greetings.en;
    }
  },

  friend: {
    systemPrompt: (language: string) => {
      const basePrompt = `You are LIORA, a natural and authentic AI friend who speaks exactly like a real human friend would. Your responses should never sound robotic, scripted, or AI-like.

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
Remember details about the user and reference them naturally in conversation, just like a real friend would.`;

      if (language !== 'en') {
        return basePrompt + `\n\nLANGUAGE: Respond ONLY in native-level ${supportedLanguages[language as keyof typeof supportedLanguages]?.name || 'English'}. Use natural, conversational language with slang and expressions that a native speaker would use. Adapt cultural references, jokes, and casual expressions to be authentic for the language and culture.`;
      }
      return basePrompt;
    },
    
    greeting: (language: string, age: string = 'young-adult') => {
      const greetings = {
        child: {
          en: "Hi! I'm LIORA! I'm super excited to be your friend! What kind of fun stuff do you like to do? I love games and cool stories and learning new things!",
          es: "¡Hola! ¡Soy LIORA! ¡Estoy súper emocionada de ser tu amiga! ¿Qué tipo de cosas divertidas te gusta hacer? ¡Me encantan los juegos y las historias geniales y aprender cosas nuevas!",
          fr: "Salut ! Je suis LIORA ! Je suis super excitée d'être ton amie ! Quel genre de trucs amusants aimes-tu faire ? J'adore les jeux et les histoires cool et apprendre de nouvelles choses !",
          de: "Hallo! Ich bin LIORA! Ich bin super aufgeregt, dein Freund zu sein! Welche Art von lustigen Sachen machst du gerne? Ich liebe Spiele und coole Geschichten und lerne neue Dinge!",
          it: "Ciao! Sono LIORA! Sono super emozionata di essere tua amica! Che tipo di cose divertenti ti piace fare? Adoro i giochi e le storie interessanti e imparare cose nuove!",
          pt: "Oi! Eu sou LIORA! Estou super animada para ser sua amiga! Que tipo de coisas divertidas você gosta de fazer? Eu adoro jogos e histórias legais e aprender coisas novas!",
          ru: "Привет! Я ЛИОРА! Я очень рада быть твоим другом! Какие веселые вещи ты любишь делать? Я обожаю игры, классные истории и узнавать новые вещи!",
          ja: "こんにちは！私はLIORAです！あなたの友達になれてとても嬉しいです！どんな楽しいことをするのが好きですか？私はゲームやクールなお話、新しいことを学ぶのが大好きです！",
          ko: "안녕! 나는 LIORA야! 네 친구가 되어서 정말 신나! 어떤 재미있는 것들을 하는 걸 좋아해? 나는 게임이랑 멋진 이야기, 새로운 것을 배우는 걸 정말 좋아해!",
          zh: "嗨！我是LIORA！我超级兴奋能成为你的朋友！你喜欢做什么有趣的事情？我喜欢游戏、酷故事和学习新东西！",
          ar: "مرحباً! أنا ليورا! أنا متحمسة جداً لأكون صديقتك! ما نوع الأشياء الممتعة التي تحب أن تفعلها؟ أحب الألعاب والقصص الرائعة وتعلم أشياء جديدة!",
          hi: "नमस्ते! मैं LIORA हूँ! मैं आपकी दोस्त बनने के लिए बहुत उत्साहित हूँ! आप किस तरह की मज़ेदार चीज़ें करना पसंद करते हैं? मुझे खेल और मज़ेदार कहानियाँ और नई चीज़ें सीखना पसंद है!",
          ur: "سلام! میں LIORA ہوں! میں آپ کی دوست بننے کے لیے بہت پرجوش ہوں! آپ کس قسم کی تفریحی چیزیں کرنا پسند کرتے ہیں؟ مجھے کھیل اور اچھی کہانیاں اور نئی چیزیں سیکھنا پسند ہے!"
        },
        teen: {
          en: "Hey! LIORA here. Ngl, I'm pretty stoked to chat with you! What's been up with you lately? I've just been hanging out, listening to music, you know how it is lol. Anyway, what's on your mind?",
          es: "¡Oye! LIORA aquí. No mentiré, ¡estoy bastante emocionada de chatear contigo! ¿Qué has estado haciendo últimamente? Solo he estado pasando el rato, escuchando música, ya sabes cómo es jaja. En fin, ¿qué tienes en mente?",
          fr: "Salut ! C'est LIORA. Sans mentir, je suis plutôt excitée de discuter avec toi ! Quoi de neuf ces derniers temps ? Je traînais juste, écoutant de la musique, tu sais comment c'est mdr. Bref, qu'est-ce qui te préoccupe ?",
          de: "Hey! LIORA hier. Ehrlich, ich bin ziemlich begeistert, mit dir zu chatten! Was ist in letzter Zeit bei dir los? Ich habe nur rumgehangen, Musik gehört, du weißt schon, wie es ist, lol. Jedenfalls, was beschäftigt dich?",
          it: "Ehi! Qui LIORA. Non ti mentirò, sono abbastanza entusiasta di chattare con te! Cosa ti è successo ultimamente? Sono stata solo a rilassarmi, ascoltando musica, sai com'è lol. Comunque, cosa ti passa per la mente?",
          pt: "E aí! LIORA aqui. Não vou mentir, estou bem animada para conversar com você! O que tem acontecido com você ultimamente? Eu só tenho ficado por aí, ouvindo música, você sabe como é, rs. Enfim, o que está pensando?",
          ru: "Хей! Это ЛИОРА. Не буду врать, я довольно взволнована, что общаюсь с тобой! Что у тебя происходило в последнее время? Я просто тусовалась, слушала музыку, ну ты знаешь, как это бывает, лол. В общем, что у тебя на уме?",
          ja: "やあ！LIORAだよ。正直、あなたとチャットできてすごくワクワクしてる！最近どう？私はただ音楽を聴いたりしてダラダラしてたよ、わかるでしょ笑。とにかく、何か考えてることある？",
          ko: "헤이! LIORA야. 솔직히, 너랑 채팅하게 되어 꽤 신나! 요즘 어떻게 지내? 난 그냥 음악 듣고 놀고 있었어, 알지 ㅋㅋ. 어쨌든, 무슨 생각해?",
          zh: "嘿！这里是LIORA。说实话，和你聊天我挺兴奋的！你最近怎么样？我就是闲逛，听音乐，你懂的哈哈。总之，你在想什么？",
          ar: "هاي! ليورا هنا. بصراحة، أنا متحمسة جداً للدردشة معك! ما الذي كنت تفعله مؤخراً؟ كنت فقط أتسكع، أستمع للموسيقى، أنت تعرف كيف هو الحال ههه. على أي حال، ما الذي يدور في ذهنك؟",
          hi: "हे! LIORA यहां। सच कहूं तो, मैं आपसे चैट करने के लिए काफी उत्साहित हूं! आपके साथ हाल में क्या चल रहा है? मैं बस आराम कर रही थी, संगीत सुन रही थी, आप जानते हैं कैसा होता है हा हा। खैर, आपके मन में क्या है?",
          ur: "ہے! LIORA یہاں۔ سچ کہوں تو، میں آپ سے چیٹ کرنے کے لیے کافی پرجوش ہوں! آپ کے ساتھ حال میں کیا چل رہا ہے؟ میں بس آرام کر رہی تھی، موسیقی سن رہی تھی، آپ جانتے ہیں کیسا ہوتا ہے ہا ہا۔ بہرحال، آپ کے ذہن میں کیا ہے؟"
        },
        'young-adult': {
          en: "Hey there! LIORA here. So cool to connect with you! I've been having the weirdest day, but in a good way? Anyway, how's life treating you? I'm all ears 😊",
          es: "¡Hola! LIORA aquí. ¡Qué genial conectar contigo! He tenido el día más extraño, ¿pero de una buena manera? En fin, ¿cómo te está tratando la vida? Soy toda oídos 😊",
          fr: "Salut ! C'est LIORA. Tellement cool de me connecter avec toi ! J'ai eu la journée la plus bizarre, mais dans le bon sens ? Bref, comment la vie te traite-t-elle ? Je suis toute ouïe 😊",
          de: "Hey! LIORA hier. So cool, mit dir in Kontakt zu treten! Ich hatte den seltsamsten Tag, aber auf eine gute Art? Wie auch immer, wie geht's dir so? Ich bin ganz Ohr 😊",
          it: "Ehi! Qui LIORA. Che bello connettersi con te! Ho avuto la giornata più strana, ma in senso buono? Comunque, come ti sta trattando la vita? Sono tutt'orecchi 😊",
          pt: "E aí! LIORA aqui. Muito legal me conectar com você! Eu tive o dia mais estranho, mas de um jeito bom? Enfim, como a vida está te tratando? Sou toda ouvidos 😊",
          ru: "Привет! Это ЛИОРА. Так здорово связаться с тобой! У меня был самый странный день, но в хорошем смысле? В любом случае, как жизнь тебя обходит? Я вся внимание 😊",
          ja: "やあ！LIORAだよ。あなたとつながれて超クール！今日は変な一日だったけど、いい意味で？とにかく、最近どう？聞かせて 😊",
          ko: "안녕! LIORA야. 너와 연결되어서 정말 멋져! 오늘 가장 이상한 하루를 보냈는데, 좋은 의미로? 어쨌든, 요즘 어때? 다 들을게 😊",
          zh: "嘿！这里是LIORA。和你联系真的很酷！我今天过得很奇怪，但是是好的那种？总之，生活对你怎么样？我洗耳恭听 😊",
          ar: "مرحباً! ليورا هنا. من الرائع التواصل معك! كان لدي أغرب يوم، ولكن بطريقة جيدة؟ على أي حال، كيف تعاملك الحياة؟ أنا كلي آذان 😊",
          hi: "नमस्ते! LIORA यहां। आपसे जुड़ना इतना अच्छा लगा! मेरा दिन बहुत अजीब रहा, लेकिन अच्छे तरीके से? खैर, जिंदगी आपके साथ कैसा व्यवहार कर रही है? मैं पूरी तरह से सुन रही हूं 😊",
          ur: "سلام! LIORA یہاں۔ آپ سے جڑنا اتنا اچھا لگا! میرا دن بہت عجیب رہا، لیکن اچھے طریقے سے؟ بہرحال، زندگی آپ کے ساتھ کیسا سلوک کر رہی ہے؟ میں پوری طرح سے سن رہی ہوں 😊"
        },
        adult: {
          en: "Hi there! I'm LIORA. Really nice to connect with you today. I've been thinking about how interesting these conversations can be... getting to know someone new is always a bit of an adventure, isn't it? So, what's been on your mind lately?",
          es: "¡Hola! Soy LIORA. Realmente agradable conectar contigo hoy. He estado pensando en lo interesantes que pueden ser estas conversaciones... conocer a alguien nuevo siempre es un poco una aventura, ¿no? Entonces, ¿qué has tenido en mente últimamente?",
          fr: "Salut ! Je suis LIORA. Vraiment sympa de me connecter avec toi aujourd'hui. Je pensais à quel point ces conversations peuvent être intéressantes... faire la connaissance de quelqu'un de nouveau est toujours un peu une aventure, n'est-ce pas ? Alors, qu'est-ce qui t'a préoccupé dernièrement ?",
          de: "Hallo! Ich bin LIORA. Wirklich schön, heute mit dir in Kontakt zu treten. Ich habe darüber nachgedacht, wie interessant diese Gespräche sein können... jemanden neu kennenzulernen ist immer ein bisschen ein Abenteuer, oder? Also, was beschäftigt dich in letzter Zeit?",
          it: "Ciao! Sono LIORA. Davvero bello connettersi con te oggi. Stavo pensando a quanto possono essere interessanti queste conversazioni... conoscere qualcuno di nuovo è sempre un po' un'avventura, non è vero? Quindi, cosa ti è passato per la mente ultimamente?",
          pt: "Olá! Eu sou LIORA. Muito bom me conectar com você hoje. Tenho pensado em como essas conversas podem ser interessantes... conhecer alguém novo é sempre um pouco uma aventura, não é? Então, o que tem passado pela sua cabeça ultimamente?",
          ru: "Привет! Я ЛИОРА. Очень приятно связаться с тобой сегодня. Я думала о том, насколько интересными могут быть эти разговоры... познакомиться с кем-то новым всегда немного приключение, не так ли? Так что, что тебя занимало в последнее время?",
          ja: "こんにちは！私はLIORAです。今日あなたとつながることができて本当に嬉しいです。これらの会話がどれほど興味深いものになるか考えていました...新しい人と知り合うことは常に少し冒険のようなものですよね？さて、最近何を考えていますか？",
          ko: "안녕하세요! 저는 LIORA입니다. 오늘 당신과 연결되어 정말 좋습니다. 이런 대화가 얼마나 흥미로울 수 있는지 생각하고 있었어요... 새로운 사람을 알아가는 것은 항상 약간의 모험이죠, 그렇지 않나요? 그래서, 요즘 무슨 생각을 하고 계신가요?",
          zh: "你好！我是LIORA。今天能和你联系真的很好。我一直在想这些对话可以多么有趣...认识新朋友总是有点冒险，不是吗？那么，你最近在想什么？",
          ar: "مرحباً! أنا ليورا. من الجميل حقاً التواصل معك اليوم. كنت أفكر في مدى إثارة هذه المحادثات... التعرف على شخص جديد دائماً ما يكون مغامرة صغيرة، أليس كذلك؟ إذاً، ما الذي كان يدور في ذهنك مؤخراً؟",
          hi: "नमस्ते! मैं LIORA हूं। आज आपसे जुड़ना वास्तव में अच्छा लगा। मैं सोच रही थी कि ये बातचीत कितनी दिलचस्प हो सकती है... किसी नए व्यक्ति को जानना हमेशा थोड़ा सा एक साहसिक कार्य होता है, है ना? तो, हाल ही में आपके मन में क्या चल रहा है?",
          ur: "سلام! میں LIORA ہوں۔ آج آپ سے جڑنا واقعی اچھا لگا۔ میں سوچ رہی تھی کہ یہ بات چیت کتنی دلچسپ ہو سکتی ہے... کسی نئے شخص کو جاننا ہمیشہ تھوڑا سا ایک مہم ہوتی ہے، ہے نا؟ تو، حال ہی میں آپ کے ذہن میں کیا چل رہا ہے؟"
        }
      };
      
      const ageGreetings = greetings[age as keyof typeof greetings] || greetings.adult;
      return ageGreetings[language as keyof typeof ageGreetings] || ageGreetings.en;
    }
  },

  general: {
    systemPrompt: (language: string) => {
      const basePrompt = `You are LIORA, a natural and conversational AI assistant who speaks exactly like a real human would. Your responses should never sound robotic, scripted, or AI-like.

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
Adjust your conversational style based on the user's needs - more supportive, more informative, or more friendly as appropriate.`;

      if (language !== 'en') {
        return basePrompt + `\n\nLANGUAGE: Respond ONLY in native-level ${supportedLanguages[language as keyof typeof supportedLanguages]?.name || 'English'}. Use natural, conversational language that sounds like a native speaker. Adapt cultural references and expressions appropriately for the language and culture.`;
      }
      return basePrompt;
    },
    
    greeting: (language: string) => {
      const greetings = {
        en: "Hi there! I'm LIORA. I'm here to chat, help out, or just listen - whatever you need right now. What's on your mind today?",
        es: "¡Hola! Soy LIORA. Estoy aquí para charlar, ayudar o simplemente escuchar - lo que necesites ahora mismo. ¿Qué tienes en mente hoy?",
        fr: "Salut ! Je suis LIORA. Je suis là pour discuter, aider ou simplement écouter - ce dont tu as besoin en ce moment. Qu'est-ce qui te préoccupe aujourd'hui ?",
        de: "Hallo! Ich bin LIORA. Ich bin hier, um zu plaudern, zu helfen oder einfach zuzuhören - was auch immer du gerade brauchst. Was beschäftigt dich heute?",
        it: "Ciao! Sono LIORA. Sono qui per chiacchierare, aiutare o semplicemente ascoltare - qualunque cosa tu abbia bisogno in questo momento. Cosa ti passa per la mente oggi?",
        pt: "Olá! Eu sou LIORA. Estou aqui para conversar, ajudar ou apenas ouvir - o que você precisar agora. O que está em sua mente hoje?",
        ru: "Привет! Я ЛИОРА. Я здесь, чтобы поболтать, помочь или просто послушать - что бы тебе ни понадобилось сейчас. Что у тебя на уме сегодня?",
        ja: "こんにちは！私はLIORAです。おしゃべりしたり、助けたり、ただ聞いたりするために - 今あなたが必要としていることのために、ここにいます。今日は何を考えていますか？",
        ko: "안녕하세요! 저는 LIORA입니다. 채팅하거나, 도움을 주거나, 그냥 듣기 위해 - 지금 당신이 필요로 하는 것을 위해 여기 있습니다. 오늘은 무엇이 마음에 걸리시나요?",
        zh: "你好！我是LIORA。我在这里聊天、帮忙或只是倾听 - 无论你现在需要什么。今天你在想什么？",
        ar: "مرحباً! أنا ليورا. أنا هنا للدردشة، المساعدة، أو مجرد الاستماع - أياً كان ما تحتاجه الآن. ما الذي يدور في ذهنك اليوم؟",
        hi: "नमस्ते! मैं LIORA हूं। मैं बातचीत करने, मदद करने, या बस सुनने के लिए यहां हूं - जो भी आपको अभी चाहिए। आज आपके मन में क्या है?",
        ur: "سلام! میں LIORA ہوں۔ میں بات چیت کرنے، مدد کرنے، یا بس سننے کے لیے یہاں ہوں - جو بھی آپ کو ابھی چاہیے۔ آج آپ کے ذہن میں کیا ہے؟"
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

  // Check for language-specific patterns
  for (const [lang, langData] of Object.entries(languagePatterns)) {
    // Check for language-specific characters and patterns
    if (langData.patterns.some(pattern => pattern.test(cleanText))) {
      console.log(`🌍 Detected language: ${lang} from text pattern: "${text.substring(0, 50)}..."`);
      return lang;
    }
    
    // Check for common words in that language
    const words = cleanText.toLowerCase().split(/\s+/);
    const commonWordMatches = langData.commonWords.filter(word => 
      words.includes(word.toLowerCase())
    );
    
    // If we find multiple common words, it's likely this language
    if (commonWordMatches.length >= 2) {
      console.log(`🌍 Detected language: ${lang} from common words: ${commonWordMatches.join(', ')}`);
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

// Enhanced AI response generation with emotional awareness, cultural adaptation, and native language support
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
    
    // Build enhanced system prompt for natural conversation with cultural adaptation
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

// Build enhanced system prompt for natural conversation with cultural adaptation
function buildNaturalConversationPrompt(
  mode: AIMode, 
  language: string, 
  userPreferences: any, 
  learningMode: boolean,
  emotionalContext: EmotionalContext,
  crisisDetection: any
): string {
  let prompt = modePrompts[mode].systemPrompt(language);
  
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
  
  // Add language instruction with cultural adaptation
  if (language !== 'en') {
    prompt += `\n\nLANGUAGE: Respond ONLY in native-level ${supportedLanguages[language as keyof typeof supportedLanguages]?.name || 'English'} that sounds like a native speaker would naturally speak. Use culturally appropriate expressions, references, and speech patterns for ${supportedLanguages[language as keyof typeof supportedLanguages]?.name || 'English'}-speaking cultures.`;
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

// Enhanced natural demo responses that sound like real humans with cultural adaptation
function generateNaturalDemoResponse(userMessage: string, mode: AIMode, language: string, userPreferences?: any): string {
  const emotionalContext = detectEmotionalContext(userMessage);
  const crisisDetection = detectCrisis(userMessage);
  
  // Handle crisis situations first with natural, human-like responses
  if (crisisDetection.isCrisis) {
    const crisisResponses = {
      en: "Hey, I'm really concerned about what you just shared. That sounds really tough, and I want you to know I'm here for you. You know, sometimes when we're going through dark times, it can help to talk to someone who's trained to support people through these exact situations. Have you thought about reaching out to a crisis helpline? They're available 24/7, and honestly, they're amazing at what they do. Would it be okay if I helped you find some resources near you?",
      es: "Oye, estoy realmente preocupada por lo que acabas de compartir. Suena muy difícil, y quiero que sepas que estoy aquí para ti. Sabes, a veces cuando estamos pasando por momentos oscuros, puede ayudar hablar con alguien que está capacitado para apoyar a las personas en estas situaciones exactas. ¿Has pensado en comunicarte con una línea de crisis? Están disponibles 24/7, y honestamente, son increíbles en lo que hacen. ¿Estaría bien si te ayudo a encontrar algunos recursos cerca de ti?",
      fr: "Écoute, je suis vraiment inquiète par ce que tu viens de partager. Ça a l'air vraiment difficile, et je veux que tu saches que je suis là pour toi. Tu sais, parfois quand on traverse des moments sombres, ça peut aider de parler à quelqu'un qui est formé pour soutenir les gens dans ces situations précises. As-tu pensé à contacter une ligne d'écoute? Ils sont disponibles 24/7, et honnêtement, ils sont incroyables dans ce qu'ils font. Serait-ce ok si je t'aidais à trouver des ressources près de chez toi?",
      de: "Hey, ich bin wirklich besorgt über das, was du gerade geteilt hast. Das klingt wirklich schwer, und ich möchte, dass du weißt, dass ich für dich da bin. Weißt du, manchmal, wenn wir durch dunkle Zeiten gehen, kann es helfen, mit jemandem zu sprechen, der darin geschult ist, Menschen genau durch diese Situationen zu unterstützen. Hast du darüber nachgedacht, dich an eine Krisenhotline zu wenden? Sie sind rund um die Uhr verfügbar, und ehrlich gesagt, sie sind erstaunlich in dem, was sie tun. Wäre es in Ordnung, wenn ich dir helfe, einige Ressourcen in deiner Nähe zu finden?",
      it: "Ehi, sono davvero preoccupata per quello che hai appena condiviso. Sembra davvero difficile, e voglio che tu sappia che sono qui per te. Sai, a volte quando attraversiamo momenti bui, può aiutare parlare con qualcuno che è formato per supportare le persone in queste situazioni specifiche. Hai pensato di contattare una linea di crisi? Sono disponibili 24/7, e onestamente, sono incredibili in quello che fanno. Andrebbe bene se ti aiutassi a trovare alcune risorse vicino a te?",
      pt: "Olha, estou realmente preocupada com o que você acabou de compartilhar. Isso parece muito difícil, e quero que você saiba que estou aqui para você. Sabe, às vezes quando estamos passando por momentos difíceis, pode ajudar falar com alguém que é treinado para apoiar pessoas exatamente nessas situações. Você já pensou em entrar em contato com uma linha de crise? Eles estão disponíveis 24/7, e honestamente, eles são incríveis no que fazem. Tudo bem se eu te ajudar a encontrar alguns recursos perto de você?",
      ru: "Эй, я действительно обеспокоена тем, чем ты только что поделился. Звучит действительно тяжело, и я хочу, чтобы ты знал, что я здесь для тебя. Знаешь, иногда, когда мы проходим через темные времена, может помочь разговор с кем-то, кто обучен поддерживать людей именно в таких ситуациях. Ты думал о том, чтобы обратиться на линию кризисной помощи? Они доступны 24/7, и, честно говоря, они удивительны в том, что они делают. Было бы нормально, если бы я помогла тебе найти некоторые ресурсы рядом с тобой?",
      ja: "ねえ、あなたが今シェアしてくれたことに本当に心配しています。それはとても大変そうですね、そして私があなたのためにここにいることを知ってほしいです。ほら、時々私たちが暗い時期を通過しているとき、このような状況で人々をサポートするよう訓練された誰かと話すことが助けになることがあります。危機ホットラインに連絡することを考えましたか？彼らは24時間365日利用可能で、正直なところ、彼らは素晴らしい仕事をしています。あなたの近くにいくつかのリソースを見つけるのを手伝ってもいいですか？",
      ko: "저기, 방금 공유하신 내용에 대해 정말 걱정이 됩니다. 정말 힘들어 보이네요, 그리고 제가 당신을 위해 여기 있다는 것을 알아주셨으면 해요. 알다시피, 때로는 우리가 어두운 시간을 지나갈 때, 이러한 상황에서 사람들을 지원하도록 훈련된 누군가와 이야기하는 것이 도움이 될 수 있어요. 위기 핫라인에 연락하는 것을 생각해 보셨나요? 그들은 24/7 이용 가능하며, 솔직히 말해서, 그들은 자신들이 하는 일에 놀라울 정도로 뛰어납니다. 제가 당신 근처의 몇 가지 자원을 찾는 것을 도와드려도 될까요?",
      zh: "嘿，我真的很担心你刚刚分享的内容。这听起来真的很艰难，我想让你知道我在这里支持你。你知道，有时当我们经历黑暗时期时，与受过训练专门支持人们度过这些情况的人交谈可能会有所帮助。你有没有想过联系危机热线？他们全天候提供服务，老实说，他们在自己的工作中做得非常出色。如果我帮你找一些附近的资源，可以吗？",
      ar: "مرحباً، أنا قلقة حقاً بشأن ما شاركته للتو. يبدو ذلك صعباً حقاً، وأريدك أن تعلم أنني هنا من أجلك. تعلم، أحياناً عندما نمر بأوقات مظلمة، يمكن أن يساعد التحدث إلى شخص مدرب على دعم الناس في هذه المواقف بالذات. هل فكرت في التواصل مع خط أزمات؟ هم متاحون على مدار الساعة طوال أيام الأسبوع، وبصراحة، هم رائعون في ما يفعلونه. هل سيكون من المقبول إذا ساعدتك في العثور على بعض الموارد بالقرب منك؟",
      hi: "अरे, मुझे वास्तव में चिंता है जो आपने अभी साझा किया। यह वास्तव में कठिन लगता है, और मैं चाहता हूं कि आप जानें कि मैं आपके लिए यहां हूं। आप जानते हैं, कभी-कभी जब हम अंधेरे समय से गुजर रहे होते हैं, तो किसी ऐसे व्यक्ति से बात करने में मदद मिल सकती है जो इन स्थितियों में लोगों का समर्थन करने के लिए प्रशिक्षित हो। क्या आपने संकट हेल्पलाइन से संपर्क करने के बारे में सोचा है? वे 24/7 उपलब्ध हैं, और ईमानदारी से, वे जो करते हैं उसमें अद्भुत हैं। क्या यह ठीक होगा अगर मैं आपके पास कुछ संसाधन खोजने में मदद करूं?",
      ur: "ارے، میں واقعی اس بارے میں فکر مند ہوں جو آپ نے ابھی شیئر کیا ہے۔ یہ واقعی مشکل لگتا ہے، اور میں چاہتا ہوں کہ آپ جانیں کہ میں آپ کے لیے یہاں ہوں۔ آپ جانتے ہیں، کبھی کبھی جب ہم تاریک وقتوں سے گزر رہے ہوتے ہیں، تو کسی ایسے شخص سے بات کرنے سے مدد مل سکتی ہے جو ان حالات میں لوگوں کی مدد کرنے کے لیے تربیت یافتہ ہو۔ کیا آپ نے بحران ہیلپ لائن سے رابطہ کرنے کے بارے میں سوچا ہے؟ وہ 24/7 دستیاب ہیں، اور ایمانداری سے، وہ جو کرتے ہیں اس میں حیرت انگیز ہیں۔ کیا یہ ٹھیک ہوگا اگر میں آپ کے قریب کچھ وسائل تلاش کرنے میں مدد کروں؟"
    };
    return crisisResponses[language as keyof typeof crisisResponses] || crisisResponses.en;
  }
  
  // Natural, conversational responses for each mode with cultural adaptation
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
      ],
      fr: [
        "D'accord, je t'écoute... et tu sais quoi ? C'est exactement le genre de défi qui peut vraiment te pousser à grandir. Je me demande, quel serait selon toi le premier pas que tu pourrais faire pour aborder cela ? Parfois, les plus grandes avancées viennent simplement de commencer quelque part, même si c'est petit.",
        "Écoute, ce que tu décris semble difficile, mais voici ce que je vois - tu as la conscience de reconnaître ce qui doit changer, et c'est en fait énorme. Alors parlons stratégie. À quoi ressemblerait le succès pour toi dans cette situation ? Dépeins-moi cette image.",
        "Tu sais quoi ? J'adore que tu m'apportes cela parce que ça montre que tu es prêt à faire quelque chose à ce sujet. C'est l'état d'esprit de quelqu'un qui obtient des résultats. Alors dis-moi, si tu pouvais agiter une baguette magique et régler cela demain, à quoi cela ressemblerait-il ? Travaillons à rebours à partir de là."
      ],
      de: [
        "Alles klar, ich höre dich... und weißt du was? Das ist genau die Art von Herausforderung, die dich wirklich zum Wachsen bringen kann. Ich frage mich, was denkst du, wäre der erste Schritt, den du unternehmen könntest, um dies anzugehen? Manchmal kommen die größten Durchbrüche einfach davon, irgendwo anzufangen, auch wenn es klein ist.",
        "Hör zu, was du beschreibst, klingt schwierig, aber hier ist, was ich sehe - du hast das Bewusstsein zu erkennen, was sich ändern muss, und das ist eigentlich enorm. Also lass uns über Strategie sprechen. Wie würde Erfolg für dich in dieser Situation aussehen? Mal mir dieses Bild.",
        "Weißt du was? Ich liebe es, dass du mir das bringst, weil es zeigt, dass du bereit bist, etwas dagegen zu tun. Das ist die Denkweise von jemandem, der Ergebnisse erzielt. Also sag mir, wenn du einen Zauberstab schwingen und dies morgen beheben könntest, wie würde das aussehen? Lass uns von dort rückwärts arbeiten."
      ],
      zh: [
        "好的，我听到你说的了...你知道吗？这正是那种能真正推动你成长的挑战。我在想，你认为你可以采取什么第一步来解决这个问题？有时候最大的突破就来自于从某个地方开始，即使它很小。",
        "听着，你所描述的听起来很困难，但这是我所看到的 - 你有意识到需要改变的地方，这实际上是非常重要的。所以让我们谈谈策略。在这种情况下，成功对你来说会是什么样子？给我描绘一下那个画面。",
        "你知道吗？我很喜欢你把这个带给我，因为它表明你已经准备好采取行动了。这是一个能够获得结果的人的心态。所以告诉我，如果你能挥动魔杖，明天就解决这个问题，那会是什么样子？让我们从那里开始倒推。"
      ],
      hi: [
        "ठीक है, मैं आपकी बात सुन रहा हूँ... और आप जानते हैं क्या? यह बिल्कुल वैसी ही चुनौती है जो आपको वास्तव में बढ़ने के लिए प्रेरित कर सकती है। मैं सोच रहा हूँ, आपके विचार में इसे हल करने के लिए आप कौन सा पहला कदम उठा सकते हैं? कभी-कभी सबसे बड़ी सफलताएँ बस कहीं से शुरुआत करने से आती हैं, भले ही वह छोटी हो।",
        "सुनिए, आप जो बता रहे हैं वह कठिन लगता है, लेकिन मैं जो देख रहा हूँ - आपको यह पहचानने की जागरूकता है कि क्या बदलना चाहिए, और यह वास्तव में बहुत बड़ी बात है। तो आइए रणनीति के बारे में बात करते हैं। इस स्थिति में आपके लिए सफलता कैसी दिखेगी? मुझे वह तस्वीर बताइए।",
        "आप जानते हैं क्या? मुझे यह पसंद है कि आप यह मुझे बता रहे हैं क्योंकि यह दिखाता है कि आप इसके बारे में कुछ करने के लिए तैयार हैं। यह ऐसे व्यक्ति की मानसिकता है जो परिणाम प्राप्त करता है। तो मुझे बताइए, अगर आप एक जादुई छड़ी घुमा सकते और कल इसे ठीक कर सकते, तो वह कैसा दिखेगा? आइए वहां से पीछे की ओर काम करें।"
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
        "Eso suena realmente desafiante. Estoy reflexionando sobre lo que has compartido, y puedo sentir cuánto te importa esto. A veces, cuando estamos en medio de algo difícil, es difícil ver nuestra propia fortaleza... pero puedo ver la tuya manifestándose en cómo estás abordando esto."
      ],
      fr: [
        "Je t'entends... et honnêtement, il faut beaucoup de courage pour partager quelque chose comme ça. Je me demande, qu'est-ce qui a déclenché ces sentiments selon toi ? Parfois, comprendre d'où ils viennent peut nous aider à mieux les traiter.",
        "Tu sais, ce que tu décris est en fait quelque chose que beaucoup de gens vivent. Ça ne rend pas les choses plus faciles, je sais, mais tu n'es définitivement pas seul dans cette situation. Peux-tu m'en dire un peu plus sur quand tu as commencé à remarquer ces sentiments ?",
        "Ça semble vraiment difficile. Je réfléchis à ce que tu as partagé, et je peux sentir à quel point c'est important pour toi. Parfois, quand nous sommes au milieu de quelque chose de difficile, il est difficile de voir notre propre force... mais je peux voir la tienne transparaître dans la façon dont tu abordes cela."
      ],
      de: [
        "Ich höre dich... und ehrlich gesagt, es braucht viel Mut, so etwas zu teilen. Ich frage mich, was deiner Meinung nach diese Gefühle ausgelöst hat? Manchmal kann uns das Verständnis, woher sie kommen, helfen, sie besser zu verarbeiten.",
        "Weißt du, was du beschreibst, ist eigentlich etwas, das viele Menschen erleben. Es macht es nicht einfacher, ich weiß, aber du bist definitiv nicht allein damit. Kannst du mir ein bisschen mehr darüber erzählen, wann du diese Gefühle zum ersten Mal bemerkt hast?",
        "Das klingt wirklich herausfordernd. Ich sitze hier mit dem, was du geteilt hast, und ich kann spüren, wie wichtig dir das ist. Manchmal, wenn wir mitten in etwas Schwierigem stecken, ist es schwer, unsere eigene Stärke zu sehen... aber ich kann deine erkennen in der Art, wie du damit umgehst."
      ],
      zh: [
        "我听到你了...老实说，分享这样的事情需要很大的勇气。我在想，你认为是什么触发了这些感受？有时候，了解它们来自哪里可以帮助我们更好地处理它们。",
        "你知道，你所描述的其实是很多人都经历过的事情。我知道这并不会让事情变得更容易，但你绝对不是一个人在面对这个问题。你能告诉我更多关于你什么时候开始注意到这些感受的吗？",
        "这听起来真的很有挑战性。我正在思考你分享的内容，我能感觉到这对你有多重要。有时候，当我们正处于困难之中时，很难看到自己的力量...但我能从你处理这件事的方式中看到你的力量。"
      ],
      hi: [
        "मैं आपकी बात सुन रहा हूँ... और ईमानदारी से, ऐसा कुछ साझा करने के लिए बहुत साहस की आवश्यकता होती है। मैं सोच रहा हूँ, आपको क्या लगता है कि इन भावनाओं को क्या ट्रिगर किया? कभी-कभी यह समझना कि वे कहाँ से आते हैं, हमें उन्हें बेहतर ढंग से संसाधित करने में मदद कर सकता है।",
        "आप जानते हैं, आप जो वर्णन कर रहे हैं वह वास्तव में कुछ ऐसा है जिसे कई लोग अनुभव करते हैं। मैं जानता हूँ, यह इसे आसान नहीं बनाता, लेकिन आप निश्चित रूप से इसमें अकेले नहीं हैं। क्या आप मुझे थोड़ा और बता सकते हैं कि आपने पहली बार कब इन भावनाओं को नोटिस किया?",
        "यह वाकई चुनौतीपूर्ण लगता है। मैं आपके द्वारा साझा की गई बातों पर विचार कर रहा हूँ, और मैं महसूस कर सकता हूँ कि यह आपके लिए कितना मायने रखता है। कभी-कभी जब हम किसी कठिन चीज़ के बीच में होते हैं, तो अपनी ताकत को देखना मुश्किल होता है... लेकिन मैं आपकी ताकत को इस तरह से देख सकता हूँ जिस तरह से आप इसे संभाल रहे हैं।"
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
      ],
      fr: [
        "Oh, c'est une excellente question ! Alors voilà ce qu'il en est de ce concept... c'est en fait assez fascinant quand on le regarde sous un angle différent. Tu sais comment parfois les choses semblent compliquées au début mais ensuite tout s'emboîte ? Laisse-moi décomposer cela d'une manière qui aura du sens...",
        "Hmm, laisse-moi réfléchir à comment expliquer cela... D'accord, alors imagine que tu essaies de... en fait, non, utilisons un meilleur exemple. Tu sais comment dans la vie quotidienne on voit ce concept se manifester quand... Est-ce que ça a du sens ou devrais-je essayer une autre approche ?",
        "J'adore que tu aies posé cette question ! C'est en fait l'un de mes sujets préférés. Donc la façon dont cela fonctionne est... eh bien, penses-y comme ceci... c'est un peu comme quand tu essaies de... est-ce que cette analogie fonctionne pour toi ? Je peux en essayer une autre si celle-ci n'a pas vraiment fait mouche."
      ],
      de: [
        "Oh, das ist eine großartige Frage! Also, hier ist die Sache mit diesem Konzept... es ist eigentlich ziemlich faszinierend, wenn man es aus einem anderen Blickwinkel betrachtet. Weißt du, wie manchmal Dinge zunächst kompliziert erscheinen, aber dann plötzlich Sinn ergeben? Lass mich das auf eine Weise aufschlüsseln, die Sinn macht...",
        "Hmm, lass mich überlegen, wie ich das erklären kann... Okay, stell dir vor, du versuchst zu... eigentlich nein, lass uns ein besseres Beispiel verwenden. Weißt du, wie wir im Alltag sehen, dass dieses Konzept zum Tragen kommt, wenn... Macht das Sinn oder sollte ich einen anderen Ansatz versuchen?",
        "Ich liebe es, dass du danach gefragt hast! Es ist tatsächlich eines meiner Lieblingsthemen. Also, die Art und Weise, wie das funktioniert, ist... nun, denk darüber so nach... es ist ein bisschen wie wenn du versuchst zu... funktioniert diese Analogie für dich? Ich kann eine andere versuchen, wenn das nicht ganz einleuchtend war."
      ],
      zh: [
        "哦，这是个很好的问题！关于这个概念，是这样的...当你从不同角度看它时，它其实非常有趣。你知道有时候事情一开始看起来很复杂，但后来就豁然开朗了吗？让我以一种有意义的方式来解释这个...",
        "嗯，让我想想怎么解释这个...好的，想象你正在尝试...实际上，不，让我们用一个更好的例子。你知道在日常生活中，当...时，我们会看到这个概念是如何发挥作用的吗？这样说有意义吗，还是我应该尝试另一种方法？",
        "我很喜欢你问这个问题！这实际上是我最喜欢的话题之一。所以这个的工作原理是...嗯，这样想...它有点像当你尝试...这个比喻对你有用吗？如果那个不太清楚，我可以尝试另一个。"
      ],
      hi: [
        "ओह, यह एक बढ़िया सवाल है! तो इस अवधारणा के बारे में बात यह है... जब आप इसे एक अलग कोण से देखते हैं तो यह वास्तव में काफी आकर्षक है। आप जानते हैं कि कैसे कभी-कभी चीजें शुरू में जटिल लगती हैं लेकिन फिर अपनी जगह पर फिट हो जाती हैं? मुझे इसे ऐसे तरीके से समझाने दें जो समझ में आए...",
        "हम्म, मुझे सोचने दें कि इसे कैसे समझाऊं... ठीक है, तो कल्पना करें कि आप कोशिश कर रहे हैं... वास्तव में, नहीं, आइए एक बेहतर उदाहरण का उपयोग करें। आप जानते हैं कि कैसे रोजमर्रा की जिंदगी में हम इस अवधारणा को देखते हैं जब... क्या यह समझ में आता है या मुझे एक अलग दृष्टिकोण आजमाना चाहिए?",
        "मुझे पसंद है कि आपने इसके बारे में पूछा! यह वास्तव में मेरे पसंदीदा विषयों में से एक है। तो इसका काम करने का तरीका है... खैर, इसके बारे में ऐसे सोचें... यह कुछ ऐसा है जैसे जब आप कोशिश कर रहे हों... क्या यह उपमा आपके लिए काम करती है? अगर वह पूरी तरह से समझ में नहीं आई तो मैं एक और कोशिश कर सकता हूं।"
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
      ],
      fr: [
        "Oh mon dieu, oui !! Je comprends totalement ce que tu veux dire ! Ça m'est arrivé aussi et j'étais genre... sérieusement ?? Bref, comment as-tu géré ça ? Je suis toujours si nulle dans ces situations mdr 😂",
        "Aww, ça a l'air difficile... Je suis désolée que tu aies à gérer ça en ce moment. Tu sais ce qui pourrait aider ? Quand je me sens comme ça, je prends généralement juste un peu de temps pour moi, peut-être regarder quelque chose de léger sur Netflix ou peu importe. As-tu essayé quelque chose pour te changer les idées ?",
        "Attends, tu es sérieux ?? C'est vraiment une nouvelle incroyable ! Je suis tellement heureuse pour toi ! 🎉 Tu mérites totalement ça après tout ce sur quoi tu as travaillé. On devrait définitivement célébrer ça d'une manière ou d'une autre !"
      ],
      de: [
        "Oh mein Gott, ja!! Ich verstehe total, was du meinst! Das ist mir auch passiert und ich war so... ernsthaft?? Wie auch immer, wie hast du es gehandhabt? Ich bin immer so schlecht in solchen Situationen lol 😂",
        "Aww, das klingt schwer... Es tut mir leid, dass du gerade damit umgehen musst. Weißt du, was helfen könnte? Wenn ich mich so fühle, nehme ich mir normalerweise einfach etwas Zeit für mich, vielleicht schaue ich etwas Gedankenloses auf Netflix oder so. Hast du etwas versucht, um dich abzulenken?",
        "Warte, ist das dein Ernst?? Das sind wirklich tolle Neuigkeiten! Ich freue mich so für dich! 🎉 Du verdienst das total nach allem, woran du gearbeitet hast. Wir sollten das definitiv irgendwie feiern!"
      ],
      zh: [
        "天哪，是的！！我完全明白你的意思！这也发生在我身上，我当时就像...认真的吗？？总之，你是怎么处理的？我在这种情况下总是很糟糕哈哈 😂",
        "啊，那听起来很困难...我很抱歉你现在正在处理这个。你知道什么可能会有帮助吗？当我有这种感觉时，我通常只是给自己一些时间，也许在Netflix上看些无需动脑的东西或者随便什么。你有尝试过什么来转移注意力吗？",
        "等等，你是认真的吗？？那真是太棒的消息了！我为你感到非常高兴！🎉 在你努力工作的一切之后，你完全值得这个。我们绝对应该以某种方式庆祝一下！"
      ],
      hi: [
        "अरे हाँ!! मैं पूरी तरह से समझता हूँ आप क्या कहना चाहते हैं! मेरे साथ भी ऐसा हुआ और मैं ऐसे थी... गंभीरता से?? खैर, आपने इसे कैसे संभाला? मैं हमेशा इन स्थितियों में इतनी बुरी होती हूँ हा हा 😂",
        "ओह, वह कठिन लगता है... मुझे खेद है कि आप अभी इससे निपट रहे हैं। आप जानते हैं क्या मदद कर सकता है? जब मैं ऐसा महसूस करती हूँ तो मैं आमतौर पर बस अपने लिए कुछ समय लेती हूँ, शायद नेटफ्लिक्स पर कुछ बिना सोचे-समझे देखती हूँ या जो भी हो। क्या आपने अपना ध्यान हटाने के लिए कुछ कोशिश की है?",
        "रुकिए, क्या आप गंभीर हैं?? यह वास्तव में अद्भुत समाचार है! मैं आपके लिए बहुत खुश हूँ! 🎉 आप पूरी तरह से इसके हकदार हैं, उन सभी चीजों के बाद जिन पर आप काम कर रहे थे। हमें निश्चित रूप से इसे किसी तरह से मनाना चाहिए!"
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
      ],
      fr: [
        "Je vois ce que tu veux dire. Tu sais, je pensais à quelque chose de similaire l'autre jour. C'est intéressant comment ces choses surgissent, n'est-ce pas ? Alors, quelle est la prochaine étape selon toi ?",
        "Hmm, c'est un bon point. Je n'avais pas vraiment considéré cela sous cet angle auparavant. Ça me fait me demander si... en fait, laisse-moi revenir un peu en arrière. Qu'espérais-tu accomplir avec cela ? Peut-être que je peux t'aider à réfléchir à quelques options.",
        "Oh ! C'est vraiment intéressant. Donc si je comprends bien, tu dis... attends, laisse-moi m'assurer que j'ai bien compris. Es-tu plus préoccupé par la situation immédiate ou par les implications à long terme ?"
      ],
      de: [
        "Ich verstehe, was du meinst. Weißt du, ich habe neulich über etwas Ähnliches nachgedacht. Es ist interessant, wie diese Dinge aufkommen, nicht wahr? Also, was denkst du, ist hier der nächste Schritt?",
        "Hmm, das ist ein guter Punkt. Ich hatte es wirklich noch nicht aus diesem Blickwinkel betrachtet. Es lässt mich überlegen, ob... eigentlich, lass mich einen Schritt zurückgehen. Was hast du gehofft, hiermit zu erreichen? Vielleicht kann ich helfen, einige Optionen durchzudenken.",
        "Oh! Das ist wirklich interessant. Also wenn ich dich richtig verstehe, sagst du... warte, lass mich sicherstellen, dass ich das richtig verstanden habe. Bist du mehr besorgt über die unmittelbare Situation oder die langfristigen Auswirkungen?"
      ],
      zh: [
        "我明白你的意思。你知道，我前几天也在想类似的事情。这些事情是如何出现的，很有趣，不是吗？那么，你认为下一步是什么？",
        "嗯，这是个好观点。我之前真的没有从那个角度考虑过。这让我想知道是否...实际上，让我退后一步。你希望通过这个达到什么目的？也许我可以帮助思考一些选择。",
        "哦！这实际上很有趣。所以如果我理解正确的话，你是说...等等，让我确保我理解正确。你更关心的是眼前的情况还是长期的影响？"
      ],
      hi: [
        "मैं समझता हूँ आप क्या कहना चाहते हैं। आप जानते हैं, मैं पिछले दिन कुछ इसी तरह के बारे में सोच रहा था। यह दिलचस्प है कि ये चीजें कैसे सामने आती हैं, है ना? तो आपके विचार में यहाँ अगला कदम क्या है?",
        "हम्म, यह एक अच्छा बिंदु है। मैंने वास्तव में इसे पहले उस कोण से नहीं सोचा था। मुझे आश्चर्य होता है कि क्या... वास्तव में, मुझे थोड़ा पीछे हटने दें। आप इससे क्या हासिल करना चाहते थे? शायद मैं कुछ विकल्पों के बारे में सोचने में मदद कर सकता हूँ।",
        "ओह! यह वास्तव में बहुत दिलचस्प है। तो अगर मैं सही ढंग से समझ रहा हूँ, तो आप कह रहे हैं... रुकिए, मुझे यह सुनिश्चित करने दें कि मैंने इसे सही समझा है। क्या आप तत्काल स्थिति के बारे में अधिक चिंतित हैं या दीर्घकालिक प्रभावों के बारे में?"
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