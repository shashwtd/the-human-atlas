"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { SafeUser } from '@/types/auth';
import bcrypt from 'bcryptjs';
import { checkPasswordStrength } from './password';

interface AuthContextType {
    user: SafeUser | null;
    loading: boolean;
    signIn: (username: string, password: string) => Promise<{ error: Error | null }>;
    signUp: (username: string, password: string, region: string) => Promise<{ error: Error | null }>;
    signOut: () => Promise<void>;
    checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Session configuration
const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

// Password validation using the shared password strength checker
const validatePassword = (password: string): { valid: boolean; message: string } => {
    const strength = checkPasswordStrength(password);
    if (!strength.isValid) {
        return { valid: false, message: strength.error || 'Invalid password' };
    }
    return { valid: true, message: '' };
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<SafeUser | null>(null);
    const [loading, setLoading] = useState(true);

    const checkSession = async () => {
        setLoading(true);
        const session = localStorage.getItem('atlas_session');
        if (!session) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const { userData, timestamp } = JSON.parse(session);
            
            // Check if session has expired
            if (Date.now() - timestamp > SESSION_DURATION) {
                localStorage.removeItem('atlas_session');
                setUser(null);
                setLoading(false);
                return;
            }

            // Verify user still exists in database
            const { data: dbUser, error } = await supabase
                .from('users')
                .select('id, username, region, created_at, last_login, post_count')
                .eq('id', userData.id)
                .single();

            if (error || !dbUser) {
                localStorage.removeItem('atlas_session');
                setUser(null);
            } else {
                localStorage.setItem('atlas_session', JSON.stringify({
                    userData: dbUser,
                    timestamp: Date.now()
                }));
                setUser(dbUser);
            }
        } catch (error) {
            console.error('Session check error:', error);
            localStorage.removeItem('atlas_session');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkSession();
        
        // Check session every hour
        const interval = setInterval(checkSession, 60 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const signIn = async (username: string, password: string) => {
        try {
            const { data: user, error: fetchError } = await supabase
                .from('users')
                .select('*')
                .eq('username', username)
                .single();

            if (fetchError || !user) {
                throw new Error('Invalid credentials');
            }

            // Compare password with hashed password
            const passwordMatch = await bcrypt.compare(password, user.password_hash);
            if (!passwordMatch) {
                throw new Error('Invalid credentials');
            }

            // Update last login
            const { error: updateError } = await supabase
                .from('users')
                .update({ last_login: new Date().toISOString() })
                .eq('id', user.id);

            if (updateError) {
                console.error('Failed to update last login:', updateError);
            }

            // Store safe user data in session
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password_hash: _, ...safeUser } = user;
            localStorage.setItem('atlas_session', JSON.stringify({
                userData: safeUser,
                timestamp: Date.now()
            }));
            setUser(safeUser);
            return { error: null };
        } catch (error) {
            console.error('Sign in error:', error);
            return { error: error instanceof Error ? error : new Error('An unexpected error occurred') };
        }
    };

    const signUp = async (username: string, password: string, region: string) => {
        try {
            // Validate password
            const passwordValidation = validatePassword(password);
            if (!passwordValidation.valid) {
                throw new Error(passwordValidation.message);
            }

            // Validate username
            if (username.length < 3) {
                throw new Error('Username must be at least 3 characters long');
            }
            if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
                throw new Error('Username can only contain letters, numbers, underscores, and hyphens');
            }

            // Check if username already exists
            const { data: existingUser } = await supabase
                .from('users')
                .select('username')
                .eq('username', username)
                .single();

            if (existingUser) {
                throw new Error('Username already taken');
            }

            // Create new user
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

            if (createError || !newUser) {
                throw new Error('Failed to create account');
            }

            // Store session
            localStorage.setItem('atlas_session', JSON.stringify({
                userData: newUser,
                timestamp: Date.now()
            }));
            setUser(newUser);
            return { error: null };
        } catch (error) {
            console.error('Sign up error:', error);
            return { error: error instanceof Error ? error : new Error('An unexpected error occurred') };
        }
    };

    const signOut = async () => {
        localStorage.removeItem('atlas_session');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, checkSession }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
