"use client";

import ShareYourDay from "@/components/ShareYourDay";
import { useAuth } from "@/lib/auth";
import { LogIn } from "lucide-react";
import Image from "next/image";

export default function RecordPage() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-neutral-900 pt-24">
            {/* Noise overlay */}
            <div
                className="fixed inset-0 pointer-events-none opacity-5"
                style={{
                    backgroundImage: 'url("/noise.webp")',
                }}
            />

            <div className="max-w-4xl mx-auto px-4">
                {user ? (
                    <ShareYourDay />
                ) : (
                    <div className="text-center py-16 px-4">
                        {/* Placeholder illustration: replace /share-illustration.svg with your asset */}
                        <h1 className="font-mono tracking-tighter text-2xl md:text-4xl font-bold text-foreground mb-6">
                            Before you share...
                        </h1>
                        <p className="font-mono text-base md:text-lg text-foreground/80 mb-8 tracking-tight max-w-xl mx-auto">
                            To record your emotional experience and contribute to the human atlas, please sign in first.
                        </p>
                        <a 
                            href="/auth" 
                            className="inline-block px-6 py-2 bg-foreground text-background font-mono font-medium border border-foreground hover:bg-background hover:text-foreground transition-colors"
                        >
                             <LogIn className="inline mr-4" size={20} />
                            SIGN IN TO CONTINUE
                        </a>
                        
                    </div>
                )}
            </div>
        </div>
    );
}
