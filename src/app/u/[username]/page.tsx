"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/lib/auth";

interface UserStats {
    totalEmotions: number;
    uniqueEmotions: number;
    mostFrequentEmotion: string;
    mostFrequentTime: string;
    mostFrequentDay: string;
    recentEmotions: {
        emotion: string;
        title: string;
        description: string;
        day_rating: number;
        mood: string;
        created_at: string;
        location_name: string;
    }[];
    emotionFrequency: {
        [key: string]: number;
    };
}

export default function UserProfile() {
    const { username } = useParams();
    const { user } = useAuth();
    const [stats, setStats] = useState<UserStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchUserStats() {
            try {
                console.log("Fetching profile for:", username);
                const response = await fetch(`/api/profile/${username}`);
                const data = await response.json();
                console.log("Profile API response:", data);

                if (!response.ok) {
                    throw new Error(
                        data.error || "Failed to fetch profile data"
                    );
                }

                console.log("Processing profile data:", data);

                // Only set stats to null if data.stats is explicitly null
                if (data.stats === null) {
                    console.log("No emotions found for user:", username);
                    setStats(null);
                    return;
                }

                if (!data.stats) {
                    console.error("Invalid response format:", data);
                    throw new Error("Invalid response format from API");
                }

                setStats(data.stats);
            } catch (error) {
                console.error("Error fetching user stats:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUserStats();
    }, [username]); // stats is not needed in the dependency array as it's only used in setStats

    if (username !== user?.username) {
        return (
            <div className="min-h-screen bg-neutral-900 pt-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl font-mono text-foreground mb-4">
                        Access Denied
                    </h1>
                    <p className="text-foreground/60 font-mono">
                        You can only view your own profile.
                    </p>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-neutral-900 pt-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-neutral-800 rounded w-1/3 mb-4"></div>
                        <div className="h-4 bg-neutral-800 rounded w-1/4 mb-8"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="h-32 bg-neutral-800 rounded"
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="min-h-screen bg-neutral-900 pt-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl font-mono text-foreground mb-4">
                        Profile Not Found
                    </h1>
                    <p className="text-foreground/60 font-mono">
                        This emotional journey has not yet begun...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-900 pt-20">
            {/* Noise overlay */}
            <div
                className="fixed inset-0 opacity-5"
                style={{
                    backgroundImage: 'url("/noise.webp")',
                    animation: "noise 0.5s steps(2) infinite",
                }}
            />

            <div className="max-w-7xl mx-auto px-4">
                {/* Header - Atlas Style */}
                <div className="relative mb-12">
                    <div className="border-b border-foreground/20">
                        <div className="flex items-center gap-6 pb-6">
                            <div className="flex-1">
                                <h1 className="text-5xl font-mono text-foreground mb-2 tracking-tighter">
                                    <span className="text-2xl mr-2 opacity-70">@</span>
                                    {username}
                                </h1>
                                <div className="flex items-center gap-4 text-foreground/60">
                                    <span className="font-mono text-sm border border-foreground/20 px-3 py-1">
                                        {stats.totalEmotions} emotional records
                                    </span>
                                    <span className="font-mono text-sm border border-foreground/20 px-3 py-1">
                                        {stats.uniqueEmotions} unique emotions
                                    </span>
                                </div>
                            </div>
                            <div className="font-mono text-right text-foreground/40 text-sm">
                                <div>Most Active: {stats.mostFrequentTime}</div>
                                <div>{stats.mostFrequentDay}s</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Emotional Landscape - Visual Grid */}
                <div className="mb-12">
                    <h2 className="font-mono text-sm text-foreground/40 mb-6 tracking-wider">
                        EMOTIONAL LANDSCAPE ANALYSIS
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {Object.entries(stats.emotionFrequency)
                            .sort(([, a], [, b]) => b - a)
                            .map(([emotion, count], index) => (
                                <div
                                    key={emotion}
                                    className="relative group"
                                    style={{
                                        animation: `fadeIn 0.5s ease-out ${
                                            index * 0.1
                                        }s forwards`,
                                        opacity: 0,
                                    }}
                                >
                                    <div className="absolute inset-0 bg-foreground/5 border border-foreground/20 transform group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-200" />
                                    <div className="relative p-4 border border-foreground/20 bg-neutral-900 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-200">
                                        <div className="font-mono text-foreground mb-2">
                                            {emotion}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-1 bg-foreground/20 flex-1">
                                                <div
                                                    className="h-full bg-foreground transition-all duration-500"
                                                    style={{
                                                        width: `${
                                                            (count /
                                                                stats.totalEmotions) *
                                                            100
                                                        }%`,
                                                    }}
                                                />
                                            </div>
                                            <span className="font-mono text-xs text-foreground/40">
                                                {count}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Recent Journey - Timeline Style */}
                <div className="mb-12">
                    <h2 className="font-mono text-sm text-foreground/40 mb-6 tracking-wider">
                        RECENT EMOTIONAL JOURNEY
                    </h2>
                    <div className="space-y-6">
                        {stats.recentEmotions.map((emotion, index) => (
                            <div
                                key={index}
                                className="group relative"
                                style={{
                                    animation: `slideIn 0.5s ease-out ${
                                        index * 0.1
                                    }s forwards`,
                                    opacity: 0,
                                }}
                            >
                                <div className="absolute left-0 w-px h-full bg-foreground/20 group-last:h-0" />
                                <div className="absolute left-0 w-2 h-2 -translate-x-[3px] translate-y-2 bg-foreground/40 group-hover:bg-foreground transition-colors duration-200" />
                                <div className="ml-6 p-4 border border-foreground/20 bg-neutral-900 hover:bg-neutral-800/50 transition-colors duration-200">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <div className="font-mono text-foreground/80 mb-1">
                                                    {emotion.emotion}
                                                </div>
                                                <div className="font-mono text-xs text-foreground/40">
                                                    {emotion.location_name}
                                                </div>
                                            </div>
                                            <div className="font-mono text-sm text-foreground/40">
                                                {emotion.created_at}
                                            </div>
                                        </div>
                                        
                                        {/* Title and Mood */}
                                        {(emotion.title || emotion.mood) && (
                                            <div className="border-t border-foreground/10 pt-4">
                                                {emotion.title && (
                                                    <div className="font-mono text-foreground mb-2">
                                                        {emotion.title}
                                                    </div>
                                                )}
                                                {emotion.mood && (
                                                    <div className="font-mono text-sm text-foreground/60">
                                                        Mood: {emotion.mood}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        
                                        {/* Description */}
                                        {emotion.description && (
                                            <div className="border-t border-foreground/10 pt-4">
                                                <div className="font-mono text-sm text-foreground/80 whitespace-pre-wrap">
                                                    {emotion.description}
                                                </div>
                                            </div>
                                        )}
                                        
                                        {/* Day Rating */}
                                        {emotion.day_rating && (
                                            <div className="border-t border-foreground/10 pt-4">
                                                <div className="font-mono text-xs text-foreground/40">
                                                    Day Rating: {emotion.day_rating}/10
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add some animations */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes noise {
                    0%,
                    100% {
                        transform: translate(0, 0);
                    }
                    10% {
                        transform: translate(-5%, -5%);
                    }
                    20% {
                        transform: translate(-10%, 5%);
                    }
                    30% {
                        transform: translate(5%, -10%);
                    }
                    40% {
                        transform: translate(-5%, 15%);
                    }
                    50% {
                        transform: translate(-10%, 5%);
                    }
                    60% {
                        transform: translate(15%, 0);
                    }
                    70% {
                        transform: translate(0, 10%);
                    }
                    80% {
                        transform: translate(-15%, 0);
                    }
                    90% {
                        transform: translate(10%, 5%);
                    }
                }
            `}</style>
        </div>
    );
}

// Removed unused StatCard component

// Helper functions moved to API route
