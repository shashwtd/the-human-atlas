"use client";

import EmotionDisplay from "@/components/EmotionDisplay";

export default function ExplorePage() {
  return (
    <main className="w-full min-h-screen pt-12">
      {/* Page Title */}
      <section className="px-4 py-8">
        <div className="max-w-6xl mx-auto text-center flex items-center justify-center flex-col mb-4">
          <h1 className="font-mono text-3xl md:text-4xl font-bold text-foreground">
            EXPLORE EMOTIONS
          </h1>
          <p className="mt-4 text-sm md:text-base font-mono max-w-2xl text-foreground/70">
            Dive deep into the spectrum of human feelings. Filter, browse, and
            connect with authentic stories from around the world.
          </p>
        </div>
      </section>

      {/* Emotion Browser */}
      <EmotionDisplay />
    </main>
  );
}
