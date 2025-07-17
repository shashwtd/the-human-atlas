import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { checkPasswordStrength } from '@/lib/password';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Create Supabase client with service role for auth operations only
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { action, username, password, region } = body;

        if (action === 'signup') {
            // Validate inputs
            if (!username || !password || !region) {
                return NextResponse.json(
                    { error: 'Missing required fields' },
                    { status: 400 }
                );
            }

            // Validate password
            const passwordCheck = checkPasswordStrength(password);
            if (!passwordCheck.isValid) {
                return NextResponse.json(
                    { error: passwordCheck.error },
                    { status: 400 }
                );
            }

            // Validate username
            if (username.length < 3) {
                return NextResponse.json(
                    { error: 'Username must be at least 3 characters long' },
                    { status: 400 }
                );
            }
            if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
                return NextResponse.json(
                    { error: 'Username can only contain letters, numbers, underscores, and hyphens' },
                    { status: 400 }
                );
            }

            // Check if username exists
            const { data: existingUser } = await supabase
                .from('users')
                .select('username')
                .eq('username', username)
                .single();

            if (existingUser) {
                return NextResponse.json(
                    { error: 'Username already taken' },
                    { status: 400 }
                );
            }

            // Create user
            const hashedPassword = await bcrypt.hash(password, 10);
            const { data: newUser, error: createError } = await supabase
                .from('users')
                .insert([{
                    username,
                    password_hash: hashedPassword,
                    region,
                    created_at: new Date().toISOString(),
                    last_login: new Date().toISOString(),
                    post_count: 0
                }])
                .select('id, username, region, created_at, last_login, post_count')
                .single();

            if (createError) {
                console.error('Error creating user:', createError);
                return NextResponse.json(
                    { error: 'Failed to create account' },
                    { status: 500 }
                );
            }

            return NextResponse.json({ user: newUser });
        }

        if (action === 'signin') {
            // Validate inputs
            if (!username || !password) {
                return NextResponse.json(
                    { error: 'Missing credentials' },
                    { status: 400 }
                );
            }

            // Get user
            const { data: user, error: fetchError } = await supabase
                .from('users')
                .select('*')
                .eq('username', username)
                .single();

            if (fetchError || !user) {
                return NextResponse.json(
                    { error: 'Invalid credentials' },
                    { status: 401 }
                );
            }

            // Verify password
            const passwordMatch = await bcrypt.compare(password, user.password_hash);
            if (!passwordMatch) {
                return NextResponse.json(
                    { error: 'Invalid credentials' },
                    { status: 401 }
                );
            }

            // Update last login
            const { error: updateError } = await supabase
                .from('users')
                .update({ last_login: new Date().toISOString() })
                .eq('id', user.id);

            if (updateError) {
                console.error('Failed to update last login:', updateError);
            }

            // Remove sensitive data from response
            const { password_hash: {}, ...safeUser } = user;
            return NextResponse.json({ user: safeUser });
        }

        return NextResponse.json(
            { error: 'Invalid action' },
            { status: 400 }
        );
    } catch (error) {
        console.error('Auth error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
