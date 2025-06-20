/*
  # Fix chat_sessions mode constraint to include 'friend'

  1. Changes
    - Drop the existing check constraint on the chat_sessions table
    - Add an updated check constraint that includes 'friend' as a valid mode
    - This allows the application to save chat sessions with the 'friend' mode

  2. Security
    - No changes to RLS policies needed
*/

-- Drop the existing check constraint
ALTER TABLE chat_sessions DROP CONSTRAINT IF EXISTS chat_sessions_mode_check;

-- Add the updated check constraint that includes 'friend'
ALTER TABLE chat_sessions ADD CONSTRAINT chat_sessions_mode_check 
  CHECK (mode IN ('coach', 'therapist', 'tutor', 'general', 'friend'));