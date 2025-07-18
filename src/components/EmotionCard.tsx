"use client";

import { EmotionEntry } from "@/data/emotions";
import { emotionIcons } from "@/data/emotion-icons";
import { MapPin } from "lucide-react";
import { useState } from "react";
import * as React from "react";

interface EmotionCardProps {
    emotion: EmotionEntry;
}

export default function EmotionCard({ emotion }: EmotionCardProps) {
    const [isDetailedView, setIsDetailedView] = useState(false);

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

    React.useEffect(() => {
        console.log("EmotionCard mounted:", emotion);
    }, [emotion]);

    return (
        <>
            <div
                onClick={() => setIsDetailedView(true)}
                style={{
                    padding: "1.5rem",
                    border: `1px solid ${getMoodStyles(emotion.mood).border}`,
                    background: getMoodStyles(emotion.mood).background,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "pointer",
                    transform: "translateY(0)",
                }}
                className="hover:border-[var(--border-hover)] hover:shadow-lg hover:-translate-y-1 hover:shadow-foreground/5"
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        {emotion.username && (
                            <div className="mb-3">
                                <span className="font-mono text-sm px-2 py-1 rounded bg-foreground/5 text-foreground/70">
                                    @{emotion.username}
                                </span>
                            </div>
                        )}
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

                {/* Show location only if available */}
                {emotion.location && (
                    <div className="flex items-center gap-2 mt-4 text-sm text-foreground/60">
                        <MapPin size={14} />
                        <span>{emotion.location}</span>
                    </div>
                )}

                {/* Entry metadata */}
                <div className="mt-4 pt-4 border-t border-foreground/10">
                    <div className="flex justify-between items-center text-xs text-foreground/60">
                        <span>
                            {emotion.timestamp.toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </span>
                        {emotion.weather && (
                            <span className="font-mono">{emotion.weather}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Detailed View Modal */}
            {isDetailedView && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-hidden"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="emotion-modal-title"
                    onClick={() => setIsDetailedView(false)}
                >
                    <div
                        className="bg-background max-w-2xl w-full rounded-lg flex flex-col max-h-[90vh] relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            className="overflow-y-auto"
                            style={{
                                border: `1px solid ${getMoodStyles(emotion.mood).border}`,
                                background: getMoodStyles(emotion.mood).background,
                            }}
                        >
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex-1">
                                        {emotion.username && (
                                            <div className="mb-4">
                                                <span className="font-mono text-base px-3 py-1.5 rounded bg-foreground/5 text-foreground/70">
                                                    @{emotion.username}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-3 mb-3">
                                            {emotionIcons[emotion.primaryEmotion] && (
                                                <div className="text-[var(--text-primary)]">
                                                    {React.createElement(
                                                        emotionIcons[emotion.primaryEmotion],
                                                        { size: 24 }
                                                    )}
                                                </div>
                                            )}
                                            <span
                                                style={{ color: "var(--text-primary)" }}
                                                className="font-mono text-xl font-bold"
                                            >
                                                {emotion.primaryEmotion.toUpperCase()}
                                            </span>
                                            <span
                                                style={{ color: "var(--text-muted)" }}
                                                className="text-sm font-mono"
                                            >
                                                {emotion.dayRating}/10
                                            </span>
                                        </div>
                                        <h3
                                            id="emotion-modal-title"
                                            style={{ color: "var(--text-primary)" }}
                                            className="font-sans text-2xl font-semibold mb-4"
                                        >
                                            {emotion.title}
                                        </h3>
                                    </div>
                                    <button
                                        onClick={() => setIsDetailedView(false)}
                                        className="text-foreground/60 hover:text-foreground font-semibold cursor-pointer bg-white/5 px-4 py-2 hover:border"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div className="mb-4 flex gap-2">
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

                                <div className="space-y-6">
                                    <p
                                        style={{ color: "var(--text-secondary)" }}
                                        className="font-sans text-base leading-relaxed"
                                    >
                                        {emotion.description}
                                    </p>

                                    {emotion.significantEvents.length > 0 && (
                                        <div>
                                            <p className="font-mono text-xs text-foreground/60 mb-2">
                                                KEY MOMENTS:
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {emotion.significantEvents.map((event, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-3 py-1.5 text-sm font-mono bg-foreground/10 border border-foreground/20 text-foreground/80"
                                                    >
                                                        {event}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-2 text-sm font-mono text-foreground/60 pt-4 border-t border-foreground/20">
                                        {emotion.location && (
                                            <div className="flex items-center gap-1.5">
                                                <MapPin size={14} />
                                                <span>{emotion.location}</span>
                                            </div>
                                        )}
                                        <div className="flex-1" />
                                        {emotion.weather && (
                                            <span className="text-sm font-mono rounded-full">
                                                {emotion.weather}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
