/*
  # Fix chat_sessions mode constraint to include friend mode

  1. Changes
    - Drop the existing check constraint on chat_sessions table
    - Add updated check constraint that includes 'friend' as a valid mode
    - This ensures the application can save chat sessions with mode 'friend'

  2. Security
    - No changes to RLS policies needed
    - Only updating the allowed values for the mode column
*/

-- Drop the existing check constraint if it exists
ALTER TABLE chat_sessions DROP CONSTRAINT IF EXISTS chat_sessions_mode_check;

-- Add the updated check constraint that includes 'friend'
ALTER TABLE chat_sessions ADD CONSTRAINT chat_sessions_mode_check 
  CHECK (mode IN ('coach', 'therapist', 'tutor', 'general', 'friend'));