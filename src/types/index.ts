export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isPro: boolean;
  createdAt: string;
  preferences: UserPreferences;
  emergencyContact?: EmergencyContact;
  learningProfile?: LearningProfile;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  voiceType: 'calm' | 'energetic' | 'warm' | 'robotic';
  personalityTone: 'friendly' | 'formal' | 'humorous';
  autoSpeak: boolean;
  autoVideo: boolean;
  language: string;
  learningMode: boolean;
  friendAge: 'child' | 'teen' | 'young-adult' | 'adult';
  crisisDetection: boolean;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  email: string;
  relationship: string;
}

export interface LearningProfile {
  emotionalTriggers: string[];
  preferredResponseStyle: string;
  knowledgeGaps: string[];
  studyPatterns: StudyPattern[];
  personalityInsights: string[];
  relationshipHistory: RelationshipEvent[];
}

export interface StudyPattern {
  subject: string;
  difficulty: number;
  preferredStyle: 'visual' | 'verbal' | 'simplified';
  masteryLevel: number;
  lastStudied: string;
}

export interface RelationshipEvent {
  type: 'mood_change' | 'conversation' | 'milestone';
  description: string;
  timestamp: string;
  emotionalState: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  mode: AIMode;
  audioUrl?: string;
  videoUrl?: string;
  language?: string;
  emotionalContext?: EmotionalContext;
  accuracy?: number;
  sources?: string[];
}

export interface EmotionalContext {
  detectedEmotion: string;
  confidence: number;
  voiceTone?: string;
  textSentiment: number;
  triggers?: string[];
}

export interface ChatSession {
  id: string;
  title: string;
  mode: AIMode;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  language?: string;
  emotionalSummary?: string;
  learningOutcomes?: string[];
}

export type AIMode = 'therapist' | 'tutor' | 'friend' | 'general';

export interface DashboardStats {
  sessionsThisWeek: number;
  totalSessions: number;
  topInteraction: string;
  moodScore: number;
  averageSessionLength: number;
  streakDays: number;
  learningProgress: number;
  emotionalWellbeing: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
  popular?: boolean;
}

export interface AppContextType {
  user: User | null;
  currentMode: AIMode;
  currentSession: ChatSession | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setCurrentMode: (mode: AIMode) => void;
  setCurrentSession: (session: ChatSession | null) => void;
  setError: (error: string | null) => void;
}

export interface LanguageConfig {
  name: string;
  code: string;
  voice: string;
}

export interface CrisisAlert {
  id: string;
  userId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  triggers: string[];
  timestamp: string;
  location?: string;
  snapshot: string;
  resolved: boolean;
}

export interface TutorSession {
  id: string;
  subject: string;
  topic: string;
  difficulty: number;
  accuracy: number;
  sources: string[];
  quiz?: Quiz;
  flashcards?: Flashcard[];
}

export interface Quiz {
  id: string;
  questions: QuizQuestion[];
  score?: number;
  completed: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  userAnswer?: number;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  difficulty: number;
  lastReviewed?: string;
  masteryLevel: number;
}