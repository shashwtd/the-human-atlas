type StrengthLevel = 'weak' | 'medium' | 'strong';

interface PasswordStrength {
    score: number;
    level: StrengthLevel;
    message: string;
    color: string;
    isValid: boolean;
    error?: string;
}

export const checkPasswordStrength = (password: string): PasswordStrength => {
    if (password.length < 6) {
        return {
            score: 0,
            level: 'weak',
            message: 'Too short',
            color: 'var(--mood-challenging-border)',
            isValid: false,
            error: 'Password must be at least 6 characters long',
        };
    }

    let score = 1;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password) || /[^A-Za-z0-9]/.test(password) || /[0-9]/.test(password)) score++;

    let level: StrengthLevel;
    let message: string;
    let color: string;

    if (score === 1) {
        level = 'weak';
        message = 'Okay';
        color = 'var(--mood-difficult-border)';
    } else if (score === 2) {
        level = 'medium';
        message = 'Good';
        color = 'var(--mood-good-border)';
    } else {
        level = 'strong';
        message = 'Great';
        color = 'var(--mood-excellent-border)';
    }

    return { score, level, message, color, isValid: true };
};
