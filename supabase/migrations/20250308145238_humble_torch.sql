/*
  # Create demo user and profile

  1. Actions
    - Create a demo user in auth.users
    - Create corresponding profile in profiles table
*/

-- First, ensure the profiles table exists
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'player',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can view own profile'
  ) THEN
    CREATE POLICY "Users can view own profile"
      ON profiles
      FOR SELECT
      TO authenticated
      USING (auth.uid() = id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update own profile'
  ) THEN
    CREATE POLICY "Users can update own profile"
      ON profiles
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = id);
  END IF;
END $$;

-- Create the demo user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'fd4f14e7-8229-4552-95d8-9e7e3625b440',
  'authenticated',
  'authenticated',
  'demo@badgers2014.com',
  '$2a$10$PxXHaP2kWxEQFICE/JzXDu0.QELC0pQPQEDYqDWdBEEIKQzZQYxuy', -- This is for password: Demo123456!
  NOW(),
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- Create the profile for the demo user
INSERT INTO profiles (id, email, full_name, role)
VALUES (
  'fd4f14e7-8229-4552-95d8-9e7e3625b440',
  'demo@badgers2014.com',
  'Demo User',
  'player'
)
ON CONFLICT (id) DO NOTHING;