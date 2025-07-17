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

export const dummyEmotions: EmotionEntry[] = [
    {
        id: "1",
        dayRating: 8,
        primaryEmotion: "Joy",
        title: "Finally finished my thesis",
        description:
            "After months of research and writing, I submitted my thesis today. The relief is overwhelming, but also a deep sense of accomplishment. I celebrated with my favorite coffee and a long walk in the park.",
        significantEvents: [
            "Thesis submission",
            "Coffee celebration",
            "Park walk",
        ],
        timestamp: new Date("2025-07-13T14:30:00"),
        location: "University campus",
        weather: "Sunny",
        mood: "excellent",
    },
    {
        id: "2",
        dayRating: 4,
        primaryEmotion: "Anxiety",
        title: "Job interview anxiety",
        description:
            "Had a big interview today for my dream job. Woke up with butterflies in my stomach and couldn't shake the nervous energy. The interview went okay, but the waiting is killing me.",
        significantEvents: [
            "Job interview",
            "Nervous breakfast",
            "Waiting for results",
        ],
        timestamp: new Date("2025-07-13T09:15:00"),
        location: "Downtown office",
        weather: "Cloudy",
        mood: "difficult",
    },
    {
        id: "3",
        dayRating: 6,
        primaryEmotion: "Contentment",
        title: "Simple pleasures",
        description:
            "Nothing extraordinary happened today, but I felt at peace. Made pancakes for breakfast, read a good book, and had a video call with my sister. Sometimes the ordinary days are the most beautiful.",
        significantEvents: [
            "Homemade pancakes",
            "Reading session",
            "Family call",
        ],
        timestamp: new Date("2025-07-12T20:45:00"),
        location: "Home",
        weather: "Rainy",
        mood: "good",
    },
    {
        id: "4",
        dayRating: 9,
        primaryEmotion: "Love",
        title: "Surprise from my partner",
        description:
            "My partner surprised me with tickets to see my favorite band live. I literally cried tears of joy. We spent the evening dancing and singing along to every song. My heart feels so full.",
        significantEvents: [
            "Concert surprise",
            "Live music",
            "Dancing together",
        ],
        timestamp: new Date("2025-07-12T22:00:00"),
        location: "Concert venue",
        weather: "Clear",
        mood: "excellent",
    },
    {
        id: "5",
        dayRating: 3,
        primaryEmotion: "Frustration",
        title: "Technology meltdown",
        description:
            "My laptop crashed right before an important presentation, and I lost hours of work. Spent the day trying to recover files and dealing with tech support. Feeling defeated and behind on everything.",
        significantEvents: [
            "Laptop crash",
            "Data recovery attempts",
            "Tech support calls",
        ],
        timestamp: new Date("2025-07-11T16:20:00"),
        location: "Home office",
        weather: "Stormy",
        mood: "challenging",
    },
    {
        id: "6",
        dayRating: 7,
        primaryEmotion: "Gratitude",
        title: "Community support",
        description:
            "When I posted about my struggles this week, the response from friends and even strangers was incredible. People shared their own stories and offered help. Reminded me that I'm not alone.",
        significantEvents: [
            "Social media post",
            "Community responses",
            "Feeling supported",
        ],
        timestamp: new Date("2025-07-11T19:30:00"),
        location: "Home",
        weather: "Partly cloudy",
        mood: "good",
    },
    {
        id: "7",
        dayRating: 5,
        primaryEmotion: "Melancholy",
        title: "Missing old friends",
        description:
            "Saw photos from my college reunion that I couldn't attend. Feeling nostalgic and a bit sad about how we've all drifted apart. Life takes us in different directions, but sometimes I miss the simplicity of those days.",
        significantEvents: [
            "Reunion photos",
            "Nostalgic memories",
            "Reflective evening",
        ],
        timestamp: new Date("2025-07-10T21:15:00"),
        location: "Home",
        weather: "Overcast",
        mood: "neutral",
    },
    {
        id: "8",
        dayRating: 8,
        primaryEmotion: "Inspired",
        title: "Art museum visit",
        description:
            "Spent the afternoon at the modern art museum. One painting in particular moved me to tears - the way the artist captured human vulnerability was breathtaking. Left feeling creatively energized.",
        significantEvents: [
            "Museum visit",
            "Emotional art experience",
            "Creative inspiration",
        ],
        timestamp: new Date("2025-07-10T15:45:00"),
        location: "Art museum",
        weather: "Bright and clear",
        mood: "excellent",
    },
    {
        id: "9",
        dayRating: 2,
        primaryEmotion: "Overwhelmed",
        title: "Everything at once",
        description:
            "Work deadline, family drama, health concerns, and financial stress all hit at the same time. Couldn't focus on anything properly. Ended up ordering takeout and watching comfort shows until I fell asleep on the couch.",
        significantEvents: [
            "Work stress",
            "Family issues",
            "Health worries",
            "Comfort food",
        ],
        timestamp: new Date("2025-07-09T23:30:00"),
        location: "Home",
        weather: "Foggy",
        mood: "challenging",
    },
    {
        id: "10",
        dayRating: 9,
        primaryEmotion: "Euphoric",
        title: "Marathon personal best",
        description:
            "Ran my first sub-4 hour marathon today! The endorphin rush was incredible, and crossing that finish line felt like flying. All those early morning training runs were worth it. I proved to myself I can do anything.",
        significantEvents: [
            "Marathon race",
            "Personal record",
            "Endorphin high",
            "Achievement celebration",
        ],
        timestamp: new Date("2025-07-09T12:20:00"),
        location: "City marathon route",
        weather: "Perfect running weather",
        mood: "excellent",
    },
];
