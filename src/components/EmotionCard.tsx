"use client";

import { EmotionEntry } from "@/data/emotions";
import { emotionIcons } from "@/data/emotion-icons";
import { MapPin } from "lucide-react";
import * as React from "react";

interface EmotionCardProps {
    emotion: EmotionEntry;
}

export default function EmotionCard({ emotion }: EmotionCardProps) {
    const getMoodStyles = (mood: string) => {
        const styles = {
            border: "",
            background: "",
        };

        switch (mood) {
            case "excellent":
                styles.border = "var(--mood-excellent-border)";
                styles.background = "var(--mood-excellent-bg)";
                break;
            case "good":
                styles.border = "var(--mood-good-border)";
                styles.background = "var(--mood-good-bg)";
                break;
            case "neutral":
                styles.border = "var(--mood-neutral-border)";
                styles.background = "var(--mood-neutral-bg)";
                break;
            case "difficult":
                styles.border = "var(--mood-difficult-border)";
                styles.background = "var(--mood-difficult-bg)";
                break;
            case "challenging":
                styles.border = "var(--mood-challenging-border)";
                styles.background = "var(--mood-challenging-bg)";
                break;
            default:
                styles.border = "var(--border-primary)";
                styles.background = "var(--overlay-light)";
        }
        return styles;
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date);
    };

    const truncateDescription = (text: string, maxLength: number = 150) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength).trim() + "...";
    };

    return (
        <>
            <div
                style={{
                    padding: "1.5rem",
                    border: `1px solid ${getMoodStyles(emotion.mood).border}`,
                    background: getMoodStyles(emotion.mood).background,
                    transition: "var(--transition-normal)",
                    cursor: "pointer",
                }}
                className="hover:border-[var(--border-hover)] hover:shadow-md"
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    {emotionIcons[emotion.primaryEmotion] && (
                                        <div className="text-[var(--text-primary)]">
                                            {React.createElement(
                                                emotionIcons[
                                                    emotion.primaryEmotion
                                                ],
                                                { size: 20 }
                                            )}
                                        </div>
                                    )}
                                    <span
                                        style={{ color: "var(--text-primary)" }}
                                        className="font-mono text-lg font-bold"
                                    >
                                        {emotion.primaryEmotion.toUpperCase()}
                                    </span>
                                </div>
                                <span
                                    style={{ color: "var(--text-muted)" }}
                                    className="text-sm font-mono"
                                >
                                    {emotion.dayRating}/10
                                </span>
                            </div>
                        </div>
                        <h4
                            style={{ color: "var(--text-primary)" }}
                            className="font-sans text-lg font-semibold mb-2"
                        >
                            {emotion.title}
                        </h4>

                        {/* Add a dynamic tag based on dayRating */}
                        <div className="mb-3 flex gap-2">
                            <span
                                className={`text-xs font-mono px-3 py-1 rounded-full ${
                                    emotion.dayRating >= 8
                                        ? "bg-[var(--mood-excellent-bg)] text-[var(--mood-excellent-border)]"
                                        : emotion.dayRating >= 6
                                        ? "bg-[var(--mood-good-bg)] text-[var(--mood-good-border)]"
                                        : emotion.dayRating >= 4
                                        ? "bg-[var(--mood-neutral-bg)] text-[var(--mood-neutral-border)]"
                                        : "bg-[var(--mood-difficult-bg)] text-[var(--mood-difficult-border)]"
                                }`}
                            >
                                {emotion.dayRating >= 8
                                    ? "Great day"
                                    : emotion.dayRating >= 6
                                    ? "Good day"
                                    : emotion.dayRating >= 4
                                    ? "Okay day"
                                    : "Tough day"}
                            </span>
                            <span className="text-xs font-mono px-3 py-1 rounded-full bg-foreground/5 text-foreground/60">
                                {formatDate(emotion.timestamp)}
                            </span>
                        </div>
                    </div>
                </div>

                <p
                    style={{ color: "var(--text-secondary)" }}
                    className="font-sans text-sm leading-relaxed mb-4"
                >
                    {truncateDescription(emotion.description)}
                </p>

                {emotion.significantEvents.length > 0 && (
                    <div className="mb-4">
                        <p className="font-mono text-xs text-foreground/60 mb-2">
                            KEY MOMENTS:
                        </p>
                        <div className="flex flex-wrap gap-1">
                            {emotion.significantEvents.map((event, idx) => (
                                <span
                                    key={idx}
                                    className="px-2 py-1 text-xs font-mono bg-foreground/10 border border-foreground/20 text-foreground/80"
                                >
                                    {event}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex flex-wrap gap-2 text-xs font-mono text-foreground/60 mt-4 pt-4 border-t border-foreground/20">
                    {emotion.location && (
                        <div className="flex items-center gap-1.5">
                            <MapPin size={12} className="" />
                            <span>{emotion.location}</span>
                        </div>
                    )}
                    <div className="flex-1" />
                    {emotion.weather && (
                        <span className="text-xs font-mono rounded-full ">
                            {emotion.weather}
                        </span>
                    )}
                </div>
            </div>

            {/* Detailed View Modal */}
        </>
    );
}
