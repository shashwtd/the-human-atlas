'use client';

import { useState } from 'react';
import { emotionCategories } from '@/data/emotions';

export default function ShareYourDay() {
  // Form state for sharing emotions
  const [formData, setFormData] = useState({
    dayRating: 5,
    primaryEmotion: '',
    title: '',
    description: '',
    significantEvents: '',
    location: '',
    weather: '',
    mood: 'neutral' as 'excellent' | 'good' | 'neutral' | 'difficult' | 'challenging'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to a database
    console.log('Emotion entry submitted:', formData);
    alert('Thank you for sharing your emotional journey. Your entry helps build our collective understanding of human experience.');
    
    // Reset form
    setFormData({
      dayRating: 5,
      primaryEmotion: '',
      title: '',
      description: '',
      significantEvents: '',
      location: '',
      weather: '',
      mood: 'neutral' as 'excellent' | 'good' | 'neutral' | 'difficult' | 'challenging'
    });
  };

  return (
    <section className="px-4 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="font-mono text-2xl font-bold text-foreground mb-4">
            SHARE YOUR EMOTIONAL JOURNEY
          </h2>
          <p className="font-sans text-foreground/80">
            Your experience matters. Help others feel less alone by sharing your day.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Day Rating */}
          <div className="p-6 border border-foreground/30 bg-foreground/5">
            <label className="block font-mono text-lg font-semibold text-foreground mb-4">
              HOW WOULD YOU RATE YOUR DAY? ({formData.dayRating}/10)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.dayRating}
              onChange={(e) => setFormData({...formData, dayRating: parseInt(e.target.value)})}
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
                onChange={(e) => setFormData({...formData, primaryEmotion: e.target.value})}
                className="w-full p-4 bg-background border border-foreground/30 text-foreground font-mono focus:border-foreground focus:outline-none"
              >
                <option value="">Select your main emotion</option>
                {emotionCategories.map(emotion => (
                  <option key={emotion} value={emotion}>{emotion}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-mono text-sm font-semibold text-foreground/80 mb-3">
                OVERALL MOOD
              </label>
              <select
                value={formData.mood}
                onChange={(e) => setFormData({...formData, mood: e.target.value as typeof formData.mood})}
                className="w-full p-4 bg-background border border-foreground/30 text-foreground font-mono focus:border-foreground focus:outline-none"
              >
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="neutral">Neutral</option>
                <option value="difficult">Difficult</option>
                <option value="challenging">Challenging</option>
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
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full p-4 bg-background border border-foreground/30 text-foreground font-sans placeholder-foreground/40 focus:border-foreground focus:outline-none"
            />
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
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-4 bg-background border border-foreground/30 text-foreground font-sans placeholder-foreground/40 focus:border-foreground focus:outline-none resize-vertical"
            />
          </div>

          {/* Significant Events */}
          <div>
            <label className="block font-mono text-sm font-semibold text-foreground/80 mb-3">
              KEY MOMENTS (OPTIONAL)
            </label>
            <input
              type="text"
              placeholder="Separate with commas: morning coffee, work meeting, evening walk, phone call with friend"
              value={formData.significantEvents}
              onChange={(e) => setFormData({...formData, significantEvents: e.target.value})}
              className="w-full p-4 bg-background border border-foreground/30 text-foreground font-sans placeholder-foreground/40 focus:border-foreground focus:outline-none"
            />
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
                onChange={(e) => setFormData({...formData, location: e.target.value})}
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
                onChange={(e) => setFormData({...formData, weather: e.target.value})}
                className="w-full p-4 bg-background border border-foreground/30 text-foreground font-sans placeholder-foreground/40 focus:border-foreground focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-8">
            <button
              type="submit"
              className="px-12 py-4 bg-foreground text-background font-mono font-semibold text-lg hover:bg-foreground/90 transition-colors border border-foreground"
            >
              SHARE YOUR STORY
            </button>
            <p className="mt-4 text-xs font-mono text-foreground/60">
              By sharing, you&apos;re contributing to a global understanding of human emotion.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
