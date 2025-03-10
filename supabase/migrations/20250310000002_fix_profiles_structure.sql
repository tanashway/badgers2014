/*
  # Fix profiles table structure

  This migration:
  1. Ensures the profiles table has the correct columns
  2. Adds any missing columns
  3. Sets correct defaults and constraints
*/

-- Ensure the profiles table exists with the correct structure
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'player',
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add any missing columns (if they don't exist)
DO $$ 
BEGIN 
  BEGIN
    ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email text NOT NULL;
  EXCEPTION
    WHEN duplicate_column THEN 
      NULL;
  END;

  BEGIN
    ALTER TABLE profiles ADD COLUMN IF NOT EXISTS full_name text NOT NULL;
  EXCEPTION
    WHEN duplicate_column THEN 
      NULL;
  END;

  BEGIN
    ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'player';
  EXCEPTION
    WHEN duplicate_column THEN 
      NULL;
  END;

  BEGIN
    ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url text;
  EXCEPTION
    WHEN duplicate_column THEN 
      NULL;
  END;

  BEGIN
    ALTER TABLE profiles ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();
  EXCEPTION
    WHEN duplicate_column THEN 
      NULL;
  END;

  BEGIN
    ALTER TABLE profiles ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();
  EXCEPTION
    WHEN duplicate_column THEN 
      NULL;
  END;
END $$;

-- Create or replace the trigger for updating the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 