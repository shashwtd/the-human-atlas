"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { Region } from "@/types/database";
import toast from "react-hot-toast";
import { emotionCategories } from "@/data/emotions";
import TagInput from "./TagInput";

export default function ShareYourDay() {
    const { user } = useAuth();
    // Form state for sharing emotions
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [formData, setFormData] = useState(() => {
        // Try to load saved form data from localStorage
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('savedStoryDraft');
            if (saved) {
                try {
                    const parsedData = JSON.parse(saved);
                    // Ensure significantEvents is always an array
                    return {
                        ...parsedData,
                        significantEvents: Array.isArray(parsedData.significantEvents) 
                            ? parsedData.significantEvents.map((event: string | { text: string } | unknown) => 
                                typeof event === 'string' ? event : typeof event === 'object' && event && 'text' in event ? event.text : ''
                            )
                            : []
                    };
                } catch (e) {
                    console.error('Failed to parse saved story draft', e);
                }
            }
        }
        return {
            dayRating: 5,
            primaryEmotion: "",
            title: "",
            description: "",
            significantEvents: [] as string[],
            location: "",
            weather: "",
            mood: "neutral" as
                | "excellent"
                | "good"
                | "neutral"
                | "difficult"
                | "challenging",
        };
    });

    // Track which fields are focused
    const [focusedField, setFocusedField] = useState<string | null>(null);

    // Save form data to localStorage whenever it changes
    useEffect(() => {
        if (hasInteracted) {
            localStorage.setItem('savedStoryDraft', JSON.stringify(formData));
        }
    }, [formData, hasInteracted]);

    // Function to handle any form field change
    const handleFieldChange = (field: string, value: string | number | boolean | string[]) => {
        if (!hasInteracted) {
            setHasInteracted(true);
            if (!user) {
                toast.custom((t) => (
                    <div className="bg-background border border-foreground/20 px-6 py-4 shadow-lg rounded-lg">
                        <p className="font-mono text-foreground mb-2">Not signed in</p>
                        <p className="text-sm text-foreground/70 mb-3">
                            You&apos;ll need to sign in to share your story, but don&apos;t worry - we&apos;ll save your draft.
                        </p>
                        <div className="flex gap-3">
                            <a 
                                href="/auth"
                                className="px-4 py-2 bg-foreground text-background text-sm font-mono hover:bg-foreground/90 transition-colors"
                            >
                                Sign in now
                            </a>
                            <button 
                                onClick={() => toast.dismiss(t.id)}
                                className="px-4 py-2 border border-foreground/20 text-sm font-mono hover:bg-foreground/5 transition-colors"
                            >
                                Continue writing
                            </button>
                        </div>
                    </div>
                ), {
                    duration: 10000,
                });
            }
        }
        setFormData((prev: FormData) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            toast.error("Please sign in to share your story");
            return;
        }

        try {
            setIsSubmitting(true);

            // Get events list directly as it's already in string format
            const eventsList = formData.significantEvents;

            const response = await fetch('/api/emotions', {
                method: 'POST',
                credentials: 'include', // Add this to include session cookie
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: formData.title,
                    primaryEmotion: formData.primaryEmotion,
                    description: formData.description,
                    dayRating: formData.dayRating,
                    mood: formData.mood,
                    significantEvents: eventsList,
                    weather: formData.weather || undefined,
                    region: user.region as Region,
                }),
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Failed to share story');
            }

            // Clear form and saved draft after successful submission
            const defaultFormData = {
                dayRating: 5,
                primaryEmotion: "",
                title: "",
                description: "",
                significantEvents: [] as { id: string; text: string }[],
                location: "",
                mood: "neutral",
                weather: "",
            };
            setFormData(defaultFormData);
            localStorage.removeItem('savedStoryDraft');
            setHasInteracted(false);

            toast.success("Successfully shared your story!");
        } catch (error) {
            console.error("Error sharing emotion:", error);
            toast.error(error instanceof Error ? error.message : "Failed to share your story");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="px-4 pb-16">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 text-center">
                    <h2 className="font-mono text-2xl font-bold text-foreground mb-4">
                        SHARE YOUR EMOTIONAL JOURNEY
                    </h2>
                    <p className="font-sans text-foreground/80">
                        Your experience matters. Help others feel less alone by
                        sharing your day.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Day Rating */}
                    <div className="p-6 border border-foreground/30 bg-foreground/5">
                        <label className="block font-mono text-lg font-semibold text-foreground mb-4">
                            HOW WOULD YOU RATE YOUR DAY? ({formData.dayRating}
                            /10)
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={formData.dayRating}
                            onChange={(e) => handleFieldChange('dayRating', parseInt(e.target.value))}
                            className="w-full h-2 bg-foreground/20 appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs font-mono text-foreground/60 mt-2">
                            <span>Terrible</span>
                            <span>Neutral</span>
                            <span>Amazing</span>
                        </div>
                    </div>

                    {/* Primary Emotion & Mood */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-mono text-sm font-semibold text-foreground/80 mb-3">
                                PRIMARY EMOTION *
                            </label>
                            <select
                                required
                                value={formData.primaryEmotion}
                                onChange={(e) => handleFieldChange('primaryEmotion', e.target.value)}
                                className="w-full p-4 bg-background border border-foreground/30 text-foreground font-sans focus:border-foreground focus:outline-none"
                            >
                                <option value="">Select an emotion</option>
                                {emotionCategories.map((emotion) => (
                                    <option key={emotion} value={emotion}>
                                        {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block font-mono text-sm font-semibold text-foreground/80 mb-3">
                                OVERALL MOOD *
                            </label>
                            <select
                                required
                                value={formData.mood}
                                onChange={(e) => handleFieldChange('mood', e.target.value as typeof formData.mood)}
                                className="w-full p-4 bg-background border border-foreground/30 text-foreground font-sans focus:border-foreground focus:outline-none"
                            >
                                {[
                                    "excellent",
                                    "good",
                                    "neutral",
                                    "difficult",
                                    "challenging",
                                ].map((mood) => (
                                    <option key={mood} value={mood}>
                                        {mood.charAt(0).toUpperCase() + mood.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block font-mono text-sm font-semibold text-foreground/80 mb-3">
                            TITLE FOR YOUR DAY *
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g., 'Finally got that promotion' or 'Feeling overwhelmed but grateful'"
                            value={formData.title}
                            onChange={(e) => handleFieldChange('title', e.target.value)}
                            onFocus={() => setFocusedField('title')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full p-4 bg-background border border-foreground/30 text-foreground font-sans placeholder-foreground/40 focus:border-foreground focus:outline-none"
                        />
                        {focusedField === 'title' && (
                            <p className="mt-2 text-sm text-foreground/60 font-mono">
                                Keep it concise (3-50 characters). This will be the headline of your story.
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-mono text-sm font-semibold text-foreground/80 mb-3">
                            TELL US ABOUT YOUR DAY *
                        </label>
                        <textarea
                            required
                            rows={6}
                            placeholder="Share what happened, how you felt, what made this day memorable or challenging. Be as detailed or brief as you'd like."
                            value={formData.description}
                            onChange={(e) => handleFieldChange('description', e.target.value)}
                            onFocus={() => setFocusedField('description')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full p-4 bg-background border border-foreground/30 text-foreground font-sans placeholder-foreground/40 focus:border-foreground focus:outline-none resize-vertical"
                        />
                        {focusedField === 'description' && (
                            <p className="mt-2 text-sm text-foreground/60 font-mono">
                                Share your thoughts in at least 10 characters. Feel free to be as detailed as you&apos;d like.
                            </p>
                        )}
                    </div>

                    {/* Significant Events */}
                    <div>
                        <label className="block font-mono text-sm font-semibold text-foreground/80 mb-3">
                            KEY MOMENTS
                        </label>
                        <div 
                            className="tag-input-wrapper"
                            onClick={(e) => {
                                const container = e.currentTarget;
                                const input = container.querySelector('.rti--input') as HTMLInputElement;
                                if (input) {
                                    input.focus();
                                    setFocusedField('events');
                                }
                            }}
                            onFocus={() => setFocusedField('events')}
                            onBlur={(e) => {
                                if (!e.currentTarget.contains(e.relatedTarget)) {
                                    setFocusedField(null);
                                }
                            }}
                            tabIndex={-1}
                        >
                            <TagInput
                                tags={formData.significantEvents}
                                onChange={(tags: string[]) => {
                                    handleFieldChange('significantEvents', tags);
                                }}
                                maxTags={4}
                                placeholder="Type and press enter to add a moment"
                                onFocus={() => setFocusedField('events')}
                                onBlur={() => setFocusedField(null)}
                            />
                            {focusedField === 'events' && (
                                <p className="mt-2 text-xs text-foreground/60 font-mono">
                                    Press enter after typing to add a key moment • {formData.significantEvents.length}/4 moments added
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Location & Weather */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-mono text-sm font-semibold text-foreground/80 mb-3">
                                LOCATION (OPTIONAL)
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Home, Office, Park, City center"
                                value={formData.location}
                                onChange={(e) => handleFieldChange('location', e.target.value)}
                                className="w-full p-4 bg-background border border-foreground/30 text-foreground font-sans placeholder-foreground/40 focus:border-foreground focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block font-mono text-sm font-semibold text-foreground/80 mb-3">
                                WEATHER (OPTIONAL)
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Sunny, Rainy, Cloudy, Perfect"
                                value={formData.weather}
                                onChange={(e) => handleFieldChange('weather', e.target.value)}
                                className="w-full p-4 bg-background border border-foreground/30 text-foreground font-sans placeholder-foreground/40 focus:border-foreground focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center pt-8">
                        {!user ? (
                            <div className="space-y-4">
                                <p className="font-mono text-foreground/80">Sign in to share your story</p>
                                <a 
                                    href="/auth"
                                    className="inline-block px-12 py-4 bg-foreground text-background font-mono font-semibold text-lg hover:bg-foreground/90 transition-colors border border-foreground"
                                >
                                    SIGN IN
                                </a>
                            </div>
                        ) : (
                            <>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`px-12 py-4 bg-foreground text-background font-mono font-semibold text-lg hover:bg-foreground/90 transition-colors border border-foreground ${
                                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {isSubmitting ? 'SHARING...' : 'SHARE YOUR STORY'}
                                </button>
                                <p className="mt-4 text-xs font-mono text-foreground/60">
                                    By sharing, you&apos;re contributing to a global understanding of human emotion.
                                </p>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
}
