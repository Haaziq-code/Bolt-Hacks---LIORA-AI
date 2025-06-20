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

// No mock sessions - start fresh
const mockSessions: ChatSession[] = [];

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
      console.log('🔒 Demo mode: No premade sessions - starting fresh');
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
    // Always return empty array instead of mock data
    return [];
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