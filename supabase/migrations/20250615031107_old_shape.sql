/*
  # Create messages and chat_sessions tables

  1. New Tables
    - `messages`
      - `id` (text, primary key)
      - `sender` (text, not null) - either 'user' or 'ai'
      - `content` (text, not null) - the message content
      - `timestamp` (timestamptz, default now()) - when the message was created
      - `session_id` (text, default 'default') - groups messages by session
    
    - `chat_sessions`
      - `id` (text, primary key)
      - `title` (text, not null) - session title
      - `mode` (text, not null) - AI mode (coach, therapist, tutor, general)
      - `messages` (jsonb) - stored messages array
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
    
    - `users`
      - `id` (text, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `avatar` (text)
      - `is_pro` (boolean, default false)
      - `preferences` (jsonb)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on all tables
    - Add policies for public access (since this is a demo app)
*/

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id text PRIMARY KEY,
  sender text NOT NULL CHECK (sender IN ('user', 'ai')),
  content text NOT NULL,
  timestamp timestamptz DEFAULT now(),
  session_id text DEFAULT 'default'
);

-- Create chat_sessions table
CREATE TABLE IF NOT EXISTS chat_sessions (
  id text PRIMARY KEY,
  title text NOT NULL,
  mode text NOT NULL CHECK (mode IN ('coach', 'therapist', 'tutor', 'general')),
  messages jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id text PRIMARY KEY,
  email text UNIQUE,
  name text,
  avatar text,
  is_pro boolean DEFAULT false,
  preferences jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (demo mode)
-- Messages policies
CREATE POLICY "Allow all operations on messages"
  ON messages
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Chat sessions policies
CREATE POLICY "Allow all operations on chat_sessions"
  ON chat_sessions
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Users policies
CREATE POLICY "Allow all operations on users"
  ON users
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_messages_session_id ON messages(session_id);
CREATE INDEX IF NOT EXISTS idx_messages_timestamp ON messages(timestamp);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_updated_at ON chat_sessions(updated_at);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);