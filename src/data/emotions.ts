export interface EmotionEntry {
    username?: string; // Optional username for the emotion entry
    id: string;
    dayRating: number; // 1-10 scale
    primaryEmotion: string;
    title: string;
    description: string;
    significantEvents: string[];
    timestamp: Date;
    location?: string;
    weather?: string;
    mood: "excellent" | "good" | "neutral" | "difficult" | "challenging";
}

export const emotionCategories = [
    "Joy",
    "Sadness",
    "Anger",
    "Fear",
    "Surprise",
    "Disgust",
    "Love",
    "Anxiety",
    "Excitement",
    "Contentment",
    "Frustration",
    "Hope",
    "Loneliness",
    "Gratitude",
    "Overwhelmed",
    "Peaceful",
    "Confused",
    "Inspired",
    "Melancholy",
    "Euphoric",
];
