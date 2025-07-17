import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        'Missing Supabase environment variables. Please check your .env.local file.'
    );
}

// Create Supabase client with anonymous key only
export const supabase = createClient(
    supabaseUrl || 'http://localhost:3000',
    supabaseAnonKey || 'fallback-key',
    {
        db: {
            schema: 'public'
        }
    }
);

// Rate limiting helper
const COOLDOWN_PERIOD = 3600000; // 1 hour in milliseconds
const lastPostTime = new Map<string, number>();

export const canUserPost = (identifier: string): boolean => {
    const now = Date.now();
    const last = lastPostTime.get(identifier);

    if (!last || (now - last) >= COOLDOWN_PERIOD) {
        lastPostTime.set(identifier, now);
        return true;
    }

    return false;
};
