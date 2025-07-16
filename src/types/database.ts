export type Region = 
    | 'North America' 
    | 'South America' 
    | 'Europe' 
    | 'Africa' 
    | 'Asia' 
    | 'Oceania' 
    | 'Middle East'
    | 'Caribbean'
    | 'Central America'
    | 'Unknown';

export interface DBEmotionEntry {
    id: string;
    created_at: string;
    username: string;  // The poster's username
    title: string;
    primary_emotion: string;
    description: string;
    day_rating: number;
    mood: string;
    significant_events: string[];
    weather?: string;
    region?: Region;  // Optional, broad region instead of specific location
    // We'll remove specific location for privacy
    post_frequency?: number;  // For rate limiting
    last_post?: string;      // For rate limiting
}

export interface DBUser {
    id: string;
    username: string;
    password_hash: string;  // Will be hashed server-side
    created_at: string;
    last_login: string;
    post_count: number;
}

// SQL for creating tables (keeping the scehma saved here for reference):
// This will prepare the database for the application, including user authentication and emotion tracking.


/*


-- Enable pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create enum for regions
CREATE TYPE user_region AS ENUM (
    'North America', 'South America', 'Europe', 'Africa', 
    'Asia', 'Oceania', 'Middle East', 'Caribbean', 
    'Central America', 'Unknown'
);

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ DEFAULT NOW(),
    post_count INT DEFAULT 0,
    region user_region DEFAULT 'Unknown',
    CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- Create emotions table
CREATE TABLE emotions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    username TEXT REFERENCES users(username),
    title TEXT NOT NULL,
    primary_emotion TEXT NOT NULL,
    description TEXT NOT NULL,
    day_rating INTEGER CHECK (day_rating >= 1 AND day_rating <= 10),
    mood TEXT NOT NULL,
    significant_events TEXT[] DEFAULT '{}',
    weather TEXT,
    region user_region DEFAULT 'Unknown',
    
    CONSTRAINT title_length CHECK (char_length(title) >= 3),
    CONSTRAINT description_length CHECK (char_length(description) >= 10)
);

-- Create rate limiting function
CREATE OR REPLACE FUNCTION check_rate_limit(p_username TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    last_post_time TIMESTAMPTZ;
BEGIN
    SELECT MAX(created_at)
    INTO last_post_time
    FROM emotions
    WHERE username = p_username;
    
    -- Allow post if no previous post or last post was over 1 hour ago
    RETURN (
        last_post_time IS NULL OR 
        NOW() - last_post_time > INTERVAL '1 hour'
    );
END;
$$ LANGUAGE plpgsql;

-- Create rate limiting trigger
CREATE OR REPLACE FUNCTION enforce_rate_limit()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT check_rate_limit(NEW.username) THEN
        RAISE EXCEPTION 'Rate limit exceeded. Please wait before posting again.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_emotion_rate_limit
    BEFORE INSERT ON emotions
    FOR EACH ROW
    EXECUTE FUNCTION enforce_rate_limit();

-- Create index for faster queries
CREATE INDEX idx_emotions_created_at ON emotions(created_at DESC);
CREATE INDEX idx_emotions_username ON emotions(username);
CREATE INDEX idx_emotions_region ON emotions(region);
CREATE INDEX idx_users_region ON users(region);


*/
