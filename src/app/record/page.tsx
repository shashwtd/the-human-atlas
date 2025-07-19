"use client";

import ShareYourDay from "@/components/ShareYourDay";
import { useAuth } from "@/lib/auth";

export default function RecordPage() {
    const { user } = useAuth();

    if (!user) return null;

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

                <ShareYourDay />
            </div>

           
        </div>
    );
}
