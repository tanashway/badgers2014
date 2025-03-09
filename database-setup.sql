-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create players table
CREATE TABLE IF NOT EXISTS players (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    jersey_number INTEGER,
    position TEXT,
    date_of_birth DATE,
    phone TEXT,
    email TEXT,
    emergency_contact TEXT,
    emergency_phone TEXT,
    notes TEXT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create games table
CREATE TABLE IF NOT EXISTS games (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    opponent TEXT NOT NULL,
    location TEXT,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    home_away TEXT CHECK (home_away IN ('home', 'away')),
    score_us INTEGER,
    score_them INTEGER,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create attendance table
CREATE TABLE IF NOT EXISTS attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    game_id UUID REFERENCES games(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('attending', 'not_attending', 'maybe', 'no_response')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (player_id, game_id)
);

-- Create media table
CREATE TABLE IF NOT EXISTS media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    game_id UUID REFERENCES games(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('photo', 'video')),
    url TEXT NOT NULL,
    thumbnail TEXT,
    title TEXT,
    timestamp TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    location TEXT,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    event_type TEXT CHECK (event_type IN ('game', 'practice', 'meeting', 'social', 'other')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies

-- Profiles: Allow users to read all profiles but only update their own
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to read all profiles"
    ON profiles FOR SELECT
    USING (true);

CREATE POLICY "Allow users to update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Allow users to insert their own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Players: Allow authenticated users to read all players
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read all players"
    ON players FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert players"
    ON players FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update players"
    ON players FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Games: Allow authenticated users to read all games
ALTER TABLE games ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read all games"
    ON games FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert games"
    ON games FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update games"
    ON games FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Attendance: Allow authenticated users to read all attendance records
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read all attendance records"
    ON attendance FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert attendance records"
    ON attendance FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update attendance records"
    ON attendance FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Media: Allow authenticated users to read all media
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read all media"
    ON media FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert media"
    ON media FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update media"
    ON media FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Events: Allow authenticated users to read all events
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read all events"
    ON events FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert events"
    ON events FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update events"
    ON events FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, first_name, last_name, avatar_url)
  VALUES (new.id, '', '', '');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample data (optional)
-- Uncomment if you want to add sample data

/*
-- Insert sample games
INSERT INTO games (opponent, location, date, home_away, score_us, score_them, notes)
VALUES 
('Eagles FC', 'City Stadium', '2024-03-30 15:00:00', 'home', 3, 1, 'Great game!'),
('Metro United', 'Metro Field', '2024-03-23 14:00:00', 'away', 2, 0, 'Clean sheet'),
('Riverside FC', 'Riverside Park', '2024-03-16 16:00:00', 'away', 1, 1, 'Tough match');

-- Insert sample events
INSERT INTO events (title, description, location, start_time, end_time, event_type)
VALUES 
('Team Practice', 'Regular weekly practice', 'Training Ground', '2024-04-02 18:00:00', '2024-04-02 20:00:00', 'practice'),
('Team Meeting', 'Season planning meeting', 'Club House', '2024-04-05 19:00:00', '2024-04-05 20:30:00', 'meeting'),
('Game vs Lions FC', 'League match', 'City Stadium', '2024-04-08 15:00:00', '2024-04-08 17:00:00', 'game');
*/ 