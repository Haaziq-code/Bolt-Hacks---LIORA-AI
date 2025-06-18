import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AIMode, ChatSession, AppContextType } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

// Mock user data for demonstration
const mockUser: User = {
  id: '1',
  email: 'user@example.com',
  name: 'Alex Johnson',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  isPro: false,
  createdAt: '2024-01-01T00:00:00Z',
  preferences: {
    theme: 'light',
    voiceType: 'warm',
    personalityTone: 'friendly',
    autoSpeak: true,
    autoVideo: true,
    language: 'en',
  },
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(mockUser);
  const [currentMode, setCurrentMode] = useState<AIMode>('general');
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const value: AppContextType = {
    user,
    currentMode,
    currentSession,
    isLoading,
    error,
    setUser,
    setCurrentMode,
    setCurrentSession,
    setError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};