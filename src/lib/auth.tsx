"use client";

import React from 'react';
import { SessionProvider, useSession, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from 'next-auth/react';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}

export function useAuth() {
    const { data: session, status } = useSession();
    
    const signIn = async (username: string, password: string) => {
        try {
            const result = await nextAuthSignIn('credentials', {
                username,
                password,
                redirect: false,
            });

            if (result?.error) {
                throw new Error(result.error);
            }

            return { error: null };
        } catch (error) {
            return { error: error instanceof Error ? error : new Error('An unexpected error occurred') };
        }
    };

    const signUp = async (username: string, password: string, region: string) => {
        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    action: 'signup',
                    username,
                    password,
                    region
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to sign up');
            }

            // After successful signup, sign in automatically
            return signIn(username, password);
        } catch (error) {
            return { error: error instanceof Error ? error : new Error('An unexpected error occurred') };
        }
    };

    const signOut = () => nextAuthSignOut();

    return {
        user: session?.user || null,
        loading: status === "loading",
        signIn,
        signUp,
        signOut
    };
}
