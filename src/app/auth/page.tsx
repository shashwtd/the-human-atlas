"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { getUserRegion } from '@/lib/geo';
import { Region } from '@/types/database';
import { Lock, Eye, EyeOff, Loader2, AlertCircle, User, LogIn, UserPlus, MapPin } from 'lucide-react';
import { checkPasswordStrength } from '@/lib/password';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [region, setRegion] = useState<Region>('Unknown');
    const [loading, setLoading] = useState(false);
    const [regionLoading, setRegionLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showUsernameHint, setShowUsernameHint] = useState(false);
    const [showPasswordHint, setShowPasswordHint] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({ 
        score: 0, 
        level: 'weak', 
        message: '', 
        color: '',
        isValid: false 
    });
    const { signIn, signUp } = useAuth();
    const router = useRouter();

    useEffect(() => {
        async function fetchRegion() {
            if (!isLogin) {
                setRegionLoading(true);
                try {
                    const detectedRegion = await getUserRegion();
                    setRegion(detectedRegion);
                } catch (error) {
                    console.error('Error fetching region:', error);
                } finally {
                    setRegionLoading(false);
                }
            }
        }
        fetchRegion();
    }, [isLogin]);

    // Username validation
    const validateUsername = (username: string) => {
        if (username.length < 3) {
            return { isValid: false, error: 'Username must be at least 3 characters' };
        }
        if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
            return { isValid: false, error: 'Only letters, numbers, underscores, and hyphens allowed' };
        }
        return { isValid: true, error: '' };
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (!isLogin) {
            setPasswordStrength(checkPasswordStrength(newPassword));
        }
        setError(''); // Clear any previous errors
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUsername = e.target.value;
        setUsername(newUsername);
        setError(''); // Clear any previous errors
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Early validation
        if (!isLogin) {
            const usernameValidation = validateUsername(username);
            if (!usernameValidation.isValid) {
                setError(usernameValidation.error);
                return;
            }

            const pwdStrength = checkPasswordStrength(password);
            if (!pwdStrength.isValid) {
                setError(pwdStrength.error || 'Invalid password');
                return;
            }
        }

        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                const { error } = await signIn(username, password);
                if (error) throw error;
            } else {
                const { error } = await signUp(username, password, region);
                if (error) throw error;
            }
            router.push('/');
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="w-full min-h-screen pt-12">
            {/* Hero Section */}
            <section className="px-4 pb-16 pt-20 text-center">
                <h1 className="font-mono text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
                    {isLogin ? 'WELCOME BACK' : 'JOIN THE ATLAS'}
                </h1>
                <p className="font-sans text-lg md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                    {isLogin 
                        ? 'Continue your journey in emotional cartography'
                        : 'Become part of a global community sharing authentic emotional experiences'
                    }
                </p>
            </section>

            {/* Auth Form Section */}
            <section className="px-4 pb-16">
                <div className="max-w-xl mx-auto">
                    {/* Tab Navigation */}
                    <div className="flex border border-[var(--border-primary)] mb-8">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-4 px-6 font-mono font-medium transition-all flex items-center justify-center gap-2 ${
                                isLogin
                                    ? "bg-foreground text-background border-r border-[var(--border-primary)]"
                                    : "bg-transparent text-foreground hover:bg-[var(--overlay-light)] border-r border-[var(--border-primary)]"
                            }`}
                        >
                            <LogIn size={16} />
                            SIGN IN
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-4 px-6 font-mono font-medium transition-all flex items-center justify-center gap-2 ${
                                !isLogin
                                    ? "bg-foreground text-background"
                                    : "bg-transparent text-foreground hover:bg-[var(--overlay-light)]"
                            }`}
                        >
                            <UserPlus size={16} />
                            SIGN UP
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="border border-[var(--border-primary)] p-6 bg-[var(--overlay-light)]">
                            <div className="space-y-4">
                                {/* Username Field with Hint */}
                                <div>
                                    <label htmlFor="username" className="font-mono text-sm text-[var(--text-muted)] mb-2 flex items-center gap-2">
                                        USERNAME
                                    </label>
                                    <div className="relative">
                                        <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)]" />
                                        <input
                                            id="username"
                                            type="text"
                                            required
                                            className="w-full pl-10 pr-4 py-3 bg-[var(--background)] border border-[var(--border-primary)] font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-hover)]"
                                            placeholder="Enter username"
                                            value={username}
                                            onChange={handleUsernameChange}
                                            onFocus={() => setShowUsernameHint(true)}
                                            onBlur={() => setShowUsernameHint(false)}
                                        />
                                    </div>
                                    {!isLogin && showUsernameHint && (
                                        <div className="mt-2 font-mono text-xs text-[var(--text-muted)]">
                                            <p className="mb-1">• Choose a unique username (don&apos;t use your real name)</p>
                                            <p className="mb-1">• At least 3 characters long</p>
                                            <p>• Letters, numbers, underscores, and hyphens only</p>
                                        </div>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label htmlFor="password" className="font-mono text-sm text-[var(--text-muted)] mb-2">
                                        PASSWORD
                                    </label>
                                    <div className="relative">
                                        <Lock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)]" />
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            className="w-full pl-10 pr-12 py-3 bg-[var(--background)] border border-[var(--border-primary)] font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-hover)]"
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                            onFocus={() => setShowPasswordHint(true)}
                                            onBlur={() => setShowPasswordHint(false)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                                        >
                                            {showPassword ? (
                                                <EyeOff size={16} />
                                            ) : (
                                                <Eye size={16} />
                                            )}
                                        </button>
                                    </div>
                                    {!isLogin && (
                                        <div className="mt-2">
                                            {showPasswordHint && (
                                                <p className="font-mono text-xs text-[var(--text-muted)] mb-1">
                                                    Minimum 6 characters required
                                                </p>
                                            )}
                                            {password && (
                                                <p className="font-mono text-sm" style={{ color: passwordStrength.color }}>
                                                    {passwordStrength.level === 'weak' && !passwordStrength.isValid && '✗ This password needs work'}
                                                    {passwordStrength.level === 'weak' && passwordStrength.isValid && '✓ This works'}
                                                    {passwordStrength.level === 'medium' && '✓ Good password!'}
                                                    {passwordStrength.level === 'strong' && '✨ Perfect!'}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Region Selection */}
                                {!isLogin && (
                                    <div>
                                        <label htmlFor="region" className="font-mono text-sm text-[var(--text-muted)] mb-2 flex items-center gap-2">
                                            REGION
                                            {regionLoading && <Loader2 size={14} className="animate-spin" />}
                                        </label>
                                        <div className="relative">
                                            <MapPin size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)]" />
                                            <select
                                                id="region"
                                                value={region}
                                                onChange={(e) => setRegion(e.target.value as Region)}
                                                className="w-full pl-10 pr-4 py-3 bg-[var(--background)] border border-[var(--border-primary)] font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-hover)] appearance-none"
                                                disabled={regionLoading}
                                            >
                                                <option value="North America">North America</option>
                                                <option value="South America">South America</option>
                                                <option value="Europe">Europe</option>
                                                <option value="Africa">Africa</option>
                                                <option value="Asia">Asia</option>
                                                <option value="Oceania">Oceania</option>
                                                <option value="Middle East">Middle East</option>
                                                <option value="Caribbean">Caribbean</option>
                                                <option value="Central America">Central America</option>
                                                <option value="Unknown">Prefer not to say</option>
                                            </select>
                                        </div>
                                        <p className="mt-3 text-xs font-mono text-[var(--text-muted)]">
                                            Region information is only collected to understand emotional patterns across different parts of the world.
                                            Your specific location is never stored. You may also deny this by selecting &quot;Prefer not to say&quot;.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Error Display */}
                        {error && (
                            <div className="flex items-center gap-2 p-4 border border-[var(--mood-challenging-border)] bg-[var(--mood-challenging-bg)]">
                                <AlertCircle size={16} className="text-[var(--mood-challenging-border)]" />
                                <p className="font-mono text-sm text-[var(--mood-challenging-border)]">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || (!isLogin && !passwordStrength.isValid)}
                            className="w-full py-4 px-6 bg-foreground text-background font-mono font-medium hover:bg-[var(--hover-bg)] hover:text-[var(--hover-text)] hover:border cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    PROCESSING...
                                </>
                            ) : isLogin ? (
                                <>
                                    <LogIn size={16} />
                                    SIGN IN TO ATLAS
                                </>
                            ) : (
                                <>
                                    <UserPlus size={16} />
                                    CREATE ACCOUNT
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
}
