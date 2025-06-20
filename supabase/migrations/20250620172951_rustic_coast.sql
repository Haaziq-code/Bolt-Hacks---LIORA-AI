/*
  # Add 'friend' mode to chat_sessions table

  1. Changes
    - Update the `chat_sessions_mode_check` constraint to include 'friend' as a valid mode
    - This allows the application to save chat sessions with mode 'friend'

  2. Security
    - No changes to RLS policies needed
*/

-- Drop the existing check constraint
ALTER TABLE chat_sessions DROP CONSTRAINT IF EXISTS chat_sessions_mode_check;

-- Add the updated check constraint that includes 'friend'
ALTER TABLE chat_sessions ADD CONSTRAINT chat_sessions_mode_check 
  CHECK (mode IN ('coach', 'therapist', 'tutor', 'general', 'friend'));