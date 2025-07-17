"use client";

import { useState, useMemo, useEffect } from "react";
import { EmotionEntry, emotionCategories } from "@/data/emotions";
import EmotionCard from "./EmotionCard";
import { DBEmotionEntry } from "@/types/database";
import toast from "react-hot-toast";

interface EmotionDisplayProps {
    emotions?: EmotionEntry[];
}

export default function EmotionDisplay({ emotions: initialEmotions }: EmotionDisplayProps) {
    const [emotions, setEmotions] = useState<EmotionEntry[]>(initialEmotions || []);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        emotion: "",
        rating: "",
        mood: "",
    });

    // Fetch emotions from the API
    useEffect(() => {
        const fetchEmotions = async () => {
            try {
                const response = await fetch('/api/emotions');
                
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || 'Failed to fetch emotions');
                }

                const { emotions: data } = await response.json();

                // If no data, it means the table is empty
                if (!data || data.length === 0) {
                    setEmotions([]);
                    return;
                }

                // Convert DB entries to EmotionEntry format
                const formattedEmotions: EmotionEntry[] = (data as DBEmotionEntry[]).map(
                    (entry) => ({
                        id: entry.id,
                        primaryEmotion: entry.primary_emotion,
                        title: entry.title,
                        description: entry.description,
                        dayRating: entry.day_rating,
                        mood: entry.mood as EmotionEntry["mood"],
                        significantEvents: entry.significant_events,
                        timestamp: new Date(entry.created_at),
                        weather: entry.weather || undefined,
                        location: undefined, // We don't store specific locations
                    })
                );

                setEmotions(formattedEmotions);
            } catch (error) {
                console.error("Error fetching emotions:", error);
                toast.error(error instanceof Error ? error.message : "Failed to load emotions");
            } finally {
                setLoading(false);
            }
        };

        fetchEmotions();
    }, []); // Fetch on mount

    // Filter emotions based on selected filters
    const filteredEmotions = useMemo(() => {
        return emotions.filter((emotion) => {
            const emotionMatch =
                !filters.emotion || emotion.primaryEmotion === filters.emotion;
            const ratingMatch =
                !filters.rating ||
                emotion.dayRating >= parseInt(filters.rating);
            const moodMatch = !filters.mood || emotion.mood === filters.mood;
            return emotionMatch && ratingMatch && moodMatch;
        });
    }, [emotions, filters]);

    if (loading) {
        return (
            <section className="px-4 pb-16">
                <div className="max-w-6xl mx-auto text-center py-16">
                    <p className="font-mono text-foreground/60">
                        Loading experiences...
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="px-4 pb-16">
            <div className="max-w-6xl mx-auto">
                {/* Filters */}
                <div className="mb-8 p-6 border border-foreground/30 bg-foreground/5">
                    <h3 className="font-mono text-lg font-semibold text-foreground mb-4">
                        FILTER EXPERIENCES
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block font-mono text-sm text-foreground/80 mb-2">
                                PRIMARY EMOTION
                            </label>
                            <select
                                value={filters.emotion}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        emotion: e.target.value,
                                    })
                                }
                                className="w-full p-3 bg-background border border-foreground/30 text-foreground font-mono focus:border-foreground focus:outline-none"
                                style={{
                                    backgroundColor: "var(--filter-bg-color)",
                                    color: "var(--filter-text-color)",
                                    borderColor: "var(--filter-border-color)",
                                }}
                            >
                                <option value="">All emotions</option>
                                {emotionCategories.map((emotion) => (
                                    <option key={emotion} value={emotion}>
                                        {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block font-mono text-sm text-foreground/80 mb-2">
                                MINIMUM DAY RATING
                            </label>
                            <select
                                value={filters.rating}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        rating: e.target.value,
                                    })
                                }
                                className="w-full p-3 bg-background border border-foreground/30 text-foreground font-mono focus:border-foreground focus:outline-none"
                                style={{
                                    backgroundColor: "var(--filter-bg-color)",
                                    color: "var(--filter-text-color)",
                                    borderColor: "var(--filter-border-color)",
                                }}
                            >
                                <option value="">Any rating</option>
                                {[
                                    { value: "8", label: "8+ (Great days)" },
                                    { value: "6", label: "6+ (Good days)" },
                                    { value: "4", label: "4+ (Okay days)" },
                                    { value: "1", label: "1+ (All days)" },
                                ].map((rating) => (
                                    <option
                                        key={rating.value}
                                        value={rating.value}
                                    >
                                        {rating.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block font-mono text-sm text-foreground/80 mb-2">
                                OVERALL MOOD
                            </label>
                            <select
                                value={filters.mood}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        mood: e.target.value,
                                    })
                                }
                                className="w-full p-3 bg-background border border-foreground/30 text-foreground font-mono focus:border-foreground focus:outline-none"
                                style={{
                                    backgroundColor: "var(--filter-bg-color)",
                                    borderColor: "var(--filter-border-color)",
                                }}
                            >
                                <option value="">All moods</option>
                                {[
                                    "excellent",
                                    "good",
                                    "neutral",
                                    "difficult",
                                    "challenging",
                                ].map((mood) => (
                                    <option key={mood} value={mood}>
                                        {mood.charAt(0).toUpperCase() +
                                            mood.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Emotion Entries Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEmotions.map((emotion) => (
                        <EmotionCard key={emotion.id} emotion={emotion} />
                    ))}
                </div>

                {filteredEmotions.length === 0 && (
                    <div className="text-center py-16">
                        {emotions.length === 0 ? (
                            <p className="font-mono text-foreground/60">
                                No emotions recorded yet. Share your first emotion to get started!
                            </p>
                        ) : (
                            <>
                                <p className="font-mono text-foreground/60">
                                    No entries match your current filters.
                                </p>
                                <button
                                    onClick={() =>
                                        setFilters({
                                            emotion: "",
                                            rating: "",
                                            mood: "",
                                        })
                                    }
                                    className="mt-4 px-6 py-2 border border-foreground/30 text-foreground font-mono hover:bg-foreground/10 transition-colors"
                                    style={{
                                        borderColor: "var(--button-border-color)",
                                        color: "var(--button-text-color)",
                                        backgroundColor: "var(--button-bg-color)",
                                    }}
                                >
                                    CLEAR FILTERS
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
