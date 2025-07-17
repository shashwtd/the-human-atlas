import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { checkRateLimit } from '@/lib/rate-limit';
import { authOptions } from '@/lib/auth-config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Create Supabase client with service role for database operations
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET() {
    try {
        // Fetch emotions - no auth required for viewing
        const { data: emotions, error } = await supabase
            .from('emotions')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching emotions:', error);
            return NextResponse.json(
                { error: 'Failed to fetch emotions' },
                { status: 500 }
            );
        }

        return NextResponse.json({ emotions });
    } catch (error) {
        console.error('Emotions fetch error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        // Get the session to verify authentication
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Parse request body
        const body = await request.json();
        const {
            title,
            primaryEmotion,
            description,
            dayRating,
            mood,
            significantEvents,
            weather,
            region
        } = body;

        // Validate required fields
        if (!title || !primaryEmotion || !description || !dayRating || !mood) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validate field formats
        if (title.length < 3) {
            return NextResponse.json(
                { error: 'Title must be at least 3 characters long' },
                { status: 400 }
            );
        }

        if (description.length < 10) {
            return NextResponse.json(
                { error: 'Description must be at least 10 characters long' },
                { status: 400 }
            );
        }

        if (dayRating < 1 || dayRating > 10) {
            return NextResponse.json(
                { error: 'Day rating must be between 1 and 10' },
                { status: 400 }
            );
        }

        // Check rate limit
        const username = session.user.name;
        if (!username) {
            return NextResponse.json(
                { error: 'Invalid user session' },
                { status: 400 }
            );
        }

        try {
            const canPost = await checkRateLimit(username);
            if (!canPost) {
                return NextResponse.json(
                    { error: 'Please wait at least an hour between posts' },
                    { status: 429 }
                );
            }
        } catch (error) {
            console.error('Rate limit check failed:', error);
            // Continue if rate limit check fails
        }

        // Create emotion entry
        const { data: emotion, error: createError } = await supabase
            .from('emotions')
            .insert([{
                username,
                title,
                primary_emotion: primaryEmotion,
                description,
                day_rating: dayRating,
                mood,
                significant_events: significantEvents || [],
                weather,
                region,
                created_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (createError) {
            console.error('Error creating emotion:', createError);
            return NextResponse.json(
                { error: 'Failed to create emotion entry' },
                { status: 500 }
            );
        }

        // Update user's post count using RPC
        const { error: updateError } = await supabase.rpc('increment_post_count', {
            user_name: username
        });

        if (updateError) {
            console.error('Error updating post count:', updateError);
            // Don't fail the request if post count update fails
        }

        return NextResponse.json({ emotion });
    } catch (error) {
        console.error('Emotion creation error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
