import { DefaultSession } from 'next-auth';

export interface SafeUser {
    id: string;
    username: string;
    name: string;  // Added for Next-Auth compatibility
    region: string;
    created_at: string;
    last_login: string;
    post_count: number;
}

export interface DBUser extends SafeUser {
    password_hash: string;
}

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: SafeUser;
    }
    
    interface User extends Omit<SafeUser, 'name'> {
        name: string;  // Next-Auth requires this
    }
}
