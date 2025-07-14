'use client';

import { EmotionEntry } from '@/data/emotions';

interface EmotionCardProps {
  emotion: EmotionEntry;
}

export default function EmotionCard({ emotion }: EmotionCardProps) {
  const getMoodStyles = (mood: string) => {
    const styles = {
      border: '',
      background: ''
    };
    
    switch (mood) {
      case 'excellent':
        styles.border = 'var(--mood-excellent-border)';
        styles.background = 'var(--mood-excellent-bg)';
        break;
      case 'good':
        styles.border = 'var(--mood-good-border)';
        styles.background = 'var(--mood-good-bg)';
        break;
      case 'neutral':
        styles.border = 'var(--mood-neutral-border)';
        styles.background = 'var(--mood-neutral-bg)';
        break;
      case 'difficult':
        styles.border = 'var(--mood-difficult-border)';
        styles.background = 'var(--mood-difficult-bg)';
        break;
      case 'challenging':
        styles.border = 'var(--mood-challenging-border)';
        styles.background = 'var(--mood-challenging-bg)';
        break;
      default:
        styles.border = 'var(--border-primary)';
        styles.background = 'var(--overlay-light)';
    }
    return styles;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div
      style={{
        padding: '1.5rem',
        border: `1px solid ${getMoodStyles(emotion.mood).border}`,
        background: getMoodStyles(emotion.mood).background,
        transition: 'var(--transition-normal)'
      }}
      className="hover:border-[var(--border-hover)]"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span 
              style={{ color: 'var(--text-primary)' }}
              className="font-mono text-lg font-bold"
            >
              {emotion.primaryEmotion.toUpperCase()}
            </span>
            <span 
              style={{ color: 'var(--text-muted)' }}
              className="text-sm font-mono"
            >
              {emotion.dayRating}/10
            </span>
          </div>
          <h4 
            style={{ color: 'var(--text-primary)' }}
            className="font-sans text-lg font-semibold mb-2"
          >
            {emotion.title}
          </h4>
        </div>
      </div>
      
      <p 
        style={{ color: 'var(--text-secondary)' }}
        className="font-sans text-sm leading-relaxed mb-4"
      >
        {emotion.description}
      </p>
      
      {emotion.significantEvents.length > 0 && (
        <div className="mb-4">
          <p className="font-mono text-xs text-foreground/60 mb-2">KEY MOMENTS:</p>
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
      
      <div className="flex justify-between text-xs font-mono text-foreground/60 mt-4 pt-4 border-t border-foreground/20">
        <span>{formatDate(emotion.timestamp)}</span>
        {emotion.location && <span>{emotion.location}</span>}
      </div>
    </div>
  );
}
