import { createClient } from '@supabase/supabase-js';
import { ChatMessage, ChatSession, User } from '../types';
import { getSecureApiKey } from '../config/apiKeys';

// Get secure Supabase configuration
function getSupabaseConfig() {
  try {
    const config = getSecureApiKey('supabase') as { url: string; anonKey: string };
    return {
      url: config.url,
      anonKey: config.anonKey
    };
  } catch (error) {
    console.error('🔒 Failed to access secure Supabase configuration:', error);
    return null;
  }
}

const supabaseConfig = getSupabaseConfig();

// Check if we're in demo mode (no valid Supabase credentials)
const isDemoMode = !supabaseConfig || 
                   !supabaseConfig.url || 
                   !supabaseConfig.anonKey ||
                   supabaseConfig.url === 'demo_url' || 
                   supabaseConfig.anonKey === 'demo_key';

export const supabase = isDemoMode ? null : createClient(supabaseConfig.url, supabaseConfig.anonKey);

// In-memory storage for demo mode
let memoryMessages: Array<{id: string, sender: string, content: string, timestamp: string, session_id: string}> = [];

// Core chat memory functions
export async function saveMessage({ sender, content }: { sender: string; content: string }): Promise<void> {
  try {
    const message = {
      id: Date.now().toString(),
      sender,
      content,
      timestamp: new Date().toISOString(),
      session_id: 'default'
    };

    if (isDemoMode || !supabase) {
      console.log('🔒 Demo mode: Saving message to secure memory', message);
      memoryMessages.push(message);
      return;
    }

    const { error } = await supabase
      .from('messages')
      .insert([message]);

    if (error) throw error;
    console.log('🔒 Message saved to secure Supabase:', message);
  } catch (error) {
    console.error('Error saving message:', error);
    // Fallback to memory storage
    const message = {
      id: Date.now().toString(),
      sender,
      content,
      timestamp: new Date().toISOString(),
      session_id: 'default'
    };
    memoryMessages.push(message);
  }
}

export async function getMessages(): Promise<Array<{id: string, sender: string, content: string, timestamp: string, session_id: string}>> {
  try {
    if (isDemoMode || !supabase) {
      console.log('🔒 Demo mode: Loading messages from secure memory', memoryMessages);
      return memoryMessages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    }

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('session_id', 'default')
      .order('timestamp', { ascending: true });

    if (error) throw error;
    console.log('🔒 Messages loaded from secure Supabase:', data);
    return data || [];
  } catch (error) {
    console.error('Error loading messages:', error);
    // Fallback to memory storage
    return memoryMessages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }
}

export async function clearMessages(): Promise<void> {
  try {
    if (isDemoMode || !supabase) {
      console.log('🔒 Demo mode: Clearing messages from secure memory');
      memoryMessages = [];
      return;
    }

    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('session_id', 'default');

    if (error) throw error;
    console.log('🔒 Messages cleared from secure Supabase');
  } catch (error) {
    console.error('Error clearing messages:', error);
    // Fallback to memory storage
    memoryMessages = [];
  }
}

// Mock data for demo mode
const mockSessions: ChatSession[] = [
  {
    id: '1',
    title: 'Career Development Goals',
    mode: 'coach',
    messages: [
      {
        id: '1',
        role: 'user',
        content: 'I want to discuss my career goals for the next 5 years.',
        timestamp: '2024-01-15T10:00:00Z',
        mode: 'coach'
      },
      {
        id: '2',
        role: 'assistant',
        content: 'Fantastic! Setting 5-year career goals shows real vision and commitment. Let\'s break this down into actionable steps that will set you up for success. What industry or role are you most passionate about pursuing?',
        timestamp: '2024-01-15T10:01:00Z',
        mode: 'coach'
      }
    ],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Managing Work Stress',
    mode: 'therapist',
    messages: [
      {
        id: '3',
        role: 'user',
        content: 'I\'ve been feeling overwhelmed at work lately.',
        timestamp: '2024-01-14T15:30:00Z',
        mode: 'therapist'
      },
      {
        id: '4',
        role: 'assistant',
        content: 'I hear you, and I want you to know that feeling overwhelmed is completely valid. Work stress can feel all-consuming sometimes. Can you tell me what specific aspects of work are contributing most to these feelings?',
        timestamp: '2024-01-14T15:31:00Z',
        mode: 'therapist'
      }
    ],
    createdAt: '2024-01-14T15:30:00Z',
    updatedAt: '2024-01-14T16:00:00Z'
  },
  {
    id: '3',
    title: 'Learning Python Fundamentals',
    mode: 'tutor',
    messages: [
      {
        id: '5',
        role: 'user',
        content: 'Can you help me understand Python dictionaries?',
        timestamp: '2024-01-13T09:15:00Z',
        mode: 'tutor'
      },
      {
        id: '6',
        role: 'assistant',
        content: 'Absolutely! Python dictionaries are fantastic data structures. Think of them like a real dictionary - you look up a word (key) to find its definition (value). Let\'s start with a simple example: {\'name\': \'Alice\', \'age\': 25}. Would you like me to show you how to create and use them?',
        timestamp: '2024-01-13T09:16:00Z',
        mode: 'tutor'
      }
    ],
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T10:45:00Z'
  }
];

export async function saveSession(session: ChatSession): Promise<void> {
  try {
    if (isDemoMode || !supabase) {
      console.log('🔒 Demo mode: Session would be saved to secure Supabase', session);
      return;
    }

    const { error } = await supabase
      .from('chat_sessions')
      .upsert({
        id: session.id,
        title: session.title,
        mode: session.mode,
        messages: session.messages,
        created_at: session.createdAt,
        updated_at: session.updatedAt
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error saving session:', error);
    // Don't throw error in demo mode to prevent UI disruption
    if (!isDemoMode) {
      throw error;
    }
  }
}

export async function loadSessions(): Promise<ChatSession[]> {
  try {
    if (isDemoMode || !supabase) {
      console.log('🔒 Demo mode: Loading mock sessions');
      return mockSessions;
    }

    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;

    return data?.map(session => ({
      id: session.id,
      title: session.title,
      mode: session.mode,
      messages: session.messages,
      createdAt: session.created_at,
      updatedAt: session.updated_at
    })) || [];
  } catch (error) {
    console.error('Error loading sessions:', error);
    // Always return mock data as fallback
    return mockSessions;
  }
}

export async function deleteSession(sessionId: string): Promise<void> {
  try {
    if (isDemoMode || !supabase) {
      console.log('🔒 Demo mode: Session would be deleted from secure Supabase', sessionId);
      return;
    }

    const { error } = await supabase
      .from('chat_sessions')
      .delete()
      .eq('id', sessionId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting session:', error);
    // Don't throw error in demo mode to prevent UI disruption
    if (!isDemoMode) {
      throw error;
    }
  }
}

export async function saveUser(user: User): Promise<void> {
  try {
    if (isDemoMode || !supabase) {
      console.log('🔒 Demo mode: User would be saved to secure Supabase', user);
      return;
    }

    const { error } = await supabase
      .from('users')
      .upsert({
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        is_pro: user.isPro,
        preferences: user.preferences,
        created_at: user.createdAt
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error saving user:', error);
    // Don't throw error in demo mode to prevent UI disruption
    if (!isDemoMode) {
      throw error;
    }
  }
}