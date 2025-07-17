import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Check if user has posted within the last hour
export async function checkRateLimit(username: string): Promise<boolean> {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    
    const { data: recentPosts, error } = await supabase
        .from('emotions')
        .select('created_at')
        .eq('username', username)
        .gte('created_at', oneHourAgo)
        .limit(1);

    if (error) {
        console.error('Rate limit check error:', error);
        throw new Error('Failed to check rate limit');
    }

    return recentPosts?.length === 0;
}
