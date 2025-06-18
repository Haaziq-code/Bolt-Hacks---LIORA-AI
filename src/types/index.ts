export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isPro: boolean;
  createdAt: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  voiceType: 'calm' | 'energetic' | 'warm' | 'robotic';
  personalityTone: 'friendly' | 'formal' | 'humorous';
  autoSpeak: boolean;
  autoVideo: boolean;
  language: string;
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
}

export interface ChatSession {
  id: string;
  title: string;
  mode: AIMode;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  language?: string;
}

export type AIMode = 'coach' | 'therapist' | 'tutor' | 'general';

export interface DashboardStats {
  sessionsThisWeek: number;
  totalSessions: number;
  topInteraction: string;
  moodScore: number;
  averageSessionLength: number;
  streakDays: number;
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