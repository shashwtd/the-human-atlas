import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { SafeUser, DBUser } from '@/types/auth';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    throw new Error('Missing credentials');
                }

                // Get user
                const { data: user, error: fetchError } = await supabase
                    .from('users')
                    .select('*')
                    .eq('username', credentials.username)
                    .single();

                if (fetchError || !user) {
                    throw new Error('Invalid credentials');
                }

                const dbUser = user as DBUser;

                // Verify password
                const passwordMatch = await bcrypt.compare(credentials.password, dbUser.password_hash);
                if (!passwordMatch) {
                    throw new Error('Invalid credentials');
                }

                // Update last login
                await supabase
                    .from('users')
                    .update({ last_login: new Date().toISOString() })
                    .eq('id', dbUser.id);

                // Return the safe user data without password hash
                const safeUser: SafeUser = {
                    id: dbUser.id,
                    username: dbUser.username,
                    name: dbUser.username, // Use username as name for Next-Auth compatibility
                    region: dbUser.region,
                    created_at: dbUser.created_at,
                    last_login: dbUser.last_login,
                    post_count: dbUser.post_count
                };
                
                return safeUser;
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user as SafeUser;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user as SafeUser;
            return session;
        }
    },
    pages: {
        signIn: '/auth',
    },
}
