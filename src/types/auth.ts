export interface SafeUser {
    id: string;
    username: string;
    region: string;
    created_at: string;
    last_login: string;
    post_count: number;
}

export interface DBUser extends SafeUser {
    password_hash: string;
}
