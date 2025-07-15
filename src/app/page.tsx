"use client";

import { useState } from "react";
import { dummyEmotions } from "@/data/emotions";
import EmotionDisplay from "@/components/EmotionDisplay";
import ShareYourDay from "@/components/ShareYourDay";

export default function Home() {
    const [activeTab, setActiveTab] = useState<"share" | "explore">("explore");

    return (
        <main className="w-full min-h-screen pt-12">
            {/* Hero Section */}
            <section className="px-4 py-16 text-center border-b border-foreground/20">

                <p className="font-sans text-lg md:text-xl text-foreground/80 mb-4 max-w-3xl mx-auto">
                    A COLLECTIVE LIBRARY OF HUMAN EMOTIONS
            </p>
                <h1 className="font-mono text-4xl md:text-6xl font-bold text-foreground mb-6">
                    THE HUMAN ATLAS
                </h1>
                <p className="font-mono text-sm text-foreground/60 max-w-4xl mx-auto leading-relaxed">
                    Map your emotional landscape. Share your daily experience.
                    Explore the universal human condition through authentic
                    stories. The human atlas is a private, anonymous space to
                    vent out your feelings, reflect on your day, and connect
                    with others through shared emotional experiences.
                </p>

                {/* Privacy Notice */}
                <div className="mt-8 p-4 border border-foreground/30 bg-foreground/5 max-w-xl mx-auto">
                    <div className="font-mono flex flex-col items-center justify-center gap-3 text-xs text-foreground/70">
                        <div>
                            <span className="text-green-400">●</span> COMPLETELY
                            ANONYMOUS
                        </div>
                        <div>
                            Your privacy is our priority. No personal data is
                            collected or stored.
                        </div>
                    </div>
                </div>
            </section>

            {/* Tab Navigation */}
            <section className="px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex border border-foreground/30">
                        <button
                            onClick={() => setActiveTab("explore")}
                            className={`flex-1 py-4 px-6 font-mono font-medium transition-all ${
                                activeTab === "explore"
                                    ? "bg-foreground text-background border-r border-foreground/30"
                                    : "bg-transparent text-foreground hover:bg-foreground/10 border-r border-foreground/30"
                            }`}
                        >
                            EXPLORE EMOTIONS [{dummyEmotions.length}]
                        </button>
                        <button
                            onClick={() => setActiveTab("share")}
                            className={`flex-1 py-4 px-6 font-mono font-medium transition-all ${
                                activeTab === "share"
                                    ? "bg-foreground text-background"
                                    : "bg-transparent text-foreground hover:bg-foreground/10"
                            }`}
                        >
                            SHARE YOUR DAY
                        </button>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            {activeTab === "explore" && (
                <EmotionDisplay emotions={dummyEmotions} />
            )}
            {activeTab === "share" && <ShareYourDay />}

            {/* Footer */}
            <footer className="border-t border-foreground/20 px-4 py-8">
                <div className="max-w-6xl mx-auto text-center">
                    <p className="font-mono text-sm text-foreground/60">
                        THE HUMAN ATLAS — Mapping emotions across the human
                        experience
                    </p>
                    <p className="font-mono text-xs text-foreground/40 mt-2">
                        A place for authentic connection through shared
                        emotional experiences
                    </p>
                </div>
            </footer>
        </main>
    );
}
