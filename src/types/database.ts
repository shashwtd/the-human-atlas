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

// COMPLETE DATABASE SETUP SQL
// Copy everything between the --- lines and run it in Supabase SQL editor

/*
---------------------------------------------------------------------------

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create enum for regions
DROP TYPE IF EXISTS user_region CASCADE;
CREATE TYPE user_region AS ENUM (
    'North America', 'South America', 'Europe', 'Africa', 
    'Asia', 'Oceania', 'Middle East', 'Caribbean', 
    'Central America', 'Unknown'
);

-- Create users table
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ DEFAULT NOW(),
    post_count INT DEFAULT 0,
    region user_region DEFAULT 'Unknown',
    created_by TEXT DEFAULT CURRENT_USER,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by TEXT DEFAULT CURRENT_USER,
    CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- Create emotions table
DROP TABLE IF EXISTS emotions CASCADE;
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
    created_by TEXT DEFAULT CURRENT_USER,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by TEXT DEFAULT CURRENT_USER,
    
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

-- Create indexes for faster queries
CREATE INDEX idx_emotions_created_at ON emotions(created_at DESC);
CREATE INDEX idx_emotions_username ON emotions(username);
CREATE INDEX idx_emotions_region ON emotions(region);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_region ON users(region);

-- Create audit trigger function
CREATE OR REPLACE FUNCTION update_audit_fields()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    NEW.updated_by = CURRENT_USER;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add audit triggers
CREATE TRIGGER users_audit
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_audit_fields();

CREATE TRIGGER emotions_audit
    BEFORE UPDATE ON emotions
    FOR EACH ROW
    EXECUTE FUNCTION update_audit_fields();

-- Prevent users from changing their username if they have existing posts
CREATE OR REPLACE FUNCTION check_username_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.username != NEW.username AND EXISTS (
        SELECT 1 FROM emotions WHERE username = OLD.username
    ) THEN
        RAISE EXCEPTION 'Cannot change username with existing posts';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_username_change
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION check_username_change();

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE emotions ENABLE ROW LEVEL SECURITY;

-- Allow service role to bypass RLS for users table
ALTER TABLE users FORCE ROW LEVEL SECURITY;

-- User table policies
-- Allow authenticated users to see their own data
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT
    USING (
        auth.role() = 'authenticated' 
        AND auth.uid()::text = id::text
    );

-- Allow authenticated users to update their own data
CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE
    USING (
        auth.role() = 'authenticated' 
        AND auth.uid()::text = id::text
    )
    WITH CHECK (
        auth.role() = 'authenticated' 
        AND auth.uid()::text = id::text
    );

-- Service role has full access
CREATE POLICY "Service role has full access" ON users
    FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- Emotions table policies
CREATE POLICY "Users can view all emotions" ON emotions
    FOR SELECT
    USING (true);

-- Helper function to get the current user's username from JWT
CREATE OR REPLACE FUNCTION get_jwt_username()
RETURNS TEXT AS $$
BEGIN
    RETURN current_setting('request.jwt.claims', true)::json->>'username';
EXCEPTION
    WHEN OTHERS THEN RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if a user owns a username
CREATE OR REPLACE FUNCTION is_username_owner(check_username TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM users
        WHERE id::text = auth.uid()::text
        AND username = check_username
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE POLICY "Users can create own emotions" ON emotions
    FOR INSERT
    WITH CHECK (is_username_owner(username));

CREATE POLICY "Users can update own emotions" ON emotions
    FOR UPDATE
    USING (is_username_owner(username))
    WITH CHECK (is_username_owner(username));

CREATE POLICY "Users can delete own emotions" ON emotions
    FOR DELETE
    USING (is_username_owner(username));

-- Grant necessary permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON users TO authenticated;
GRANT ALL ON emotions TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Secure the schema
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM anon;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon;


-- Create function to increment post count
CREATE OR REPLACE FUNCTION increment_post_count(user_name text)
RETURNS void AS $$
BEGIN
    UPDATE users
    SET post_count = post_count + 1
    WHERE username = user_name;
END;
$$ LANGUAGE plpgsql;




---------------------------------------------------------------------------
*/