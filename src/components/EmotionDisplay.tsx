'use client';

import { useState, useMemo } from 'react';
import { EmotionEntry, emotionCategories } from '@/data/emotions';
import EmotionCard from './EmotionCard';

interface EmotionDisplayProps {
  emotions: EmotionEntry[];
}

export default function EmotionDisplay({ emotions }: EmotionDisplayProps) {
  const [filters, setFilters] = useState({
    emotion: '',
    rating: '',
    mood: ''
  });

  // Filter emotions based on selected filters
  const filteredEmotions = useMemo(() => {
    return emotions.filter(emotion => {
      const emotionMatch = !filters.emotion || emotion.primaryEmotion === filters.emotion;
      const ratingMatch = !filters.rating || emotion.dayRating >= parseInt(filters.rating);
      const moodMatch = !filters.mood || emotion.mood === filters.mood;
      return emotionMatch && ratingMatch && moodMatch;
    });
  }, [emotions, filters]);

  return (
    <section className="px-4 pb-16">
      <div className="max-w-6xl mx-auto">
        {/* Filters */}
        <div className="mb-8 p-6 border border-foreground/30 bg-foreground/5">
          <h3 className="font-mono text-lg font-semibold text-foreground mb-4">FILTER EXPERIENCES</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-mono text-sm text-foreground/80 mb-2">PRIMARY EMOTION</label>
              <select
                value={filters.emotion}
                onChange={(e) => setFilters({...filters, emotion: e.target.value})}
                className="w-full p-3 bg-background border border-foreground/30 text-foreground font-mono focus:border-foreground focus:outline-none"
                style={{ 
                  backgroundColor: 'var(--filter-bg-color)', 
                  color: 'var(--filter-text-color)',
                  borderColor: 'var(--filter-border-color)'
                }}
              >
                <option value="">All emotions</option>
                {emotionCategories.map(emotion => (
                  <option key={emotion} value={emotion}>{emotion}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-mono text-sm text-foreground/80 mb-2">MINIMUM DAY RATING</label>
              <select
                value={filters.rating}
                onChange={(e) => setFilters({...filters, rating: e.target.value})}
                className="w-full p-3 bg-background border border-foreground/30 text-foreground font-mono focus:border-foreground focus:outline-none"
                style={{ 
                  backgroundColor: 'var(--filter-bg-color)', 
                  color: 'var(--filter-text-color)',
                  borderColor: 'var(--filter-border-color)'
                }}
              >
                <option value="">Any rating</option>
                <option value="8">8+ (Great days)</option>
                <option value="6">6+ (Good days)</option>
                <option value="4">4+ (Okay days)</option>
                <option value="1">1+ (All days)</option>
              </select>
            </div>
            <div>
              <label className="block font-mono text-sm text-foreground/80 mb-2">OVERALL MOOD</label>
              <select
                value={filters.mood}
                onChange={(e) => setFilters({...filters, mood: e.target.value})}
                className="w-full p-3 bg-background border border-foreground/30 text-foreground font-mono focus:border-foreground focus:outline-none"
                style={{ 
                  backgroundColor: 'var(--filter-bg-color)', 
                  color: 'var(--filter-text-color)',
                  borderColor: 'var(--filter-border-color)'
                }}
              >
                <option value="">All moods</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="neutral">Neutral</option>
                <option value="difficult">Difficult</option>
                <option value="challenging">Challenging</option>
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
            <p className="font-mono text-foreground/60">No entries match your current filters.</p>
            <button
              onClick={() => setFilters({ emotion: '', rating: '', mood: '' })}
              className="mt-4 px-6 py-2 border border-foreground/30 text-foreground font-mono hover:bg-foreground/10 transition-colors"
              style={{ 
                borderColor: 'var(--button-border-color)',
                color: 'var(--button-text-color)',
                backgroundColor: 'var(--button-bg-color)'
              }}
            >
              CLEAR FILTERS
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
