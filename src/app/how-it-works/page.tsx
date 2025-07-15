'use client';

import { 
  Heart, 
  Shield, 
  Users, 
  Brain,
  Lightbulb,
  HeartHandshake,
  MessageCircle,
  Lock
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HowItWorks() {
  return (
    <main className="w-full min-h-screen bg-neutral-900 pt-16">
      {/* Hero Section */}
      <section className="px-4 py-16 text-center border-b border-[var(--border-primary)]">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <Brain 
              size={64} 
              className="text-[var(--foreground)]"
              strokeWidth={1.5}
            />
          </div>
          <h1 className="font-mono text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
            UNDERSTANDING THE HUMAN ATLAS
          </h1>
          <p className="font-sans text-lg md:text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
            A revolutionary platform designed to map the landscape of human emotions, 
            fostering understanding, connection, and self-reflection.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="px-4 py-16 border-b border-[var(--border-primary)]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-[var(--border-primary)] bg-[var(--overlay-light)]">
              <div className="flex justify-center mb-4">
                <Heart 
                  size={32} 
                  className="text-[var(--mood-excellent-border)]"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-mono text-lg font-semibold text-[var(--text-primary)] mb-3">
                EMOTIONAL INTELLIGENCE
              </h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Develop deeper understanding of your emotional patterns and triggers
              </p>
            </div>
            <div className="text-center p-6 border border-[var(--border-primary)] bg-[var(--overlay-light)]">
              <div className="flex justify-center mb-4">
                <Users 
                  size={32} 
                  className="text-[var(--mood-good-border)]"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-mono text-lg font-semibold text-[var(--text-primary)] mb-3">
                SHARED EXPERIENCES
              </h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Connect with others through the universal language of emotions
              </p>
            </div>
            <div className="text-center p-6 border border-[var(--border-primary)] bg-[var(--overlay-light)]">
              <div className="flex justify-center mb-4">
                <Shield 
                  size={32} 
                  className="text-[var(--mood-neutral-border)]"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-mono text-lg font-semibold text-[var(--text-primary)] mb-3">
                SAFE SPACE
              </h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Express yourself freely in a completely anonymous environment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="px-4 py-16 border-b border-[var(--border-primary)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-center text-[var(--text-primary)] mb-12">
            YOUR JOURNEY WITH THE HUMAN ATLAS
          </h2>
          
          <div className="space-y-12">
            {/* Step 1: Recording */}
            <div className="border border-[var(--border-primary)] p-8 bg-[var(--overlay-light)]">
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="font-mono text-2xl font-semibold text-[var(--text-primary)] mb-4">
                    1. RECORD YOUR EMOTIONAL JOURNEY
                  </h3>
                  <div className="space-y-6">
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      Share your daily experiences in a safe, anonymous space. Our intuitive interface makes it easy
                      to capture the full spectrum of your emotions and the moments that shaped them.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[var(--text-secondary)]">
                      <div className="space-y-2">
                        <h4 className="font-mono text-[var(--text-primary)] text-lg">What you can share:</h4>
                        <ul className="list-disc pl-4 space-y-2">
                          <li>Day rating on a scale of 1-10</li>
                          <li>Primary emotion from 20+ categories</li>
                          <li>Overall mood and emotional state</li>
                          <li>Detailed description of your experience</li>
                          <li>Key moments and significant events</li>
                          <li>Optional context (location, weather)</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-mono text-[var(--text-primary)] text-lg">Tips for sharing:</h4>
                        <ul className="list-disc pl-4 space-y-2">
                          <li>Be honest and authentic</li>
                          <li>Include specific details</li>
                          <li>Reflect on your feelings</li>
                          <li>Share what you learned</li>
                          <li>Keep it personal but anonymous</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-2 border-[var(--border-primary)] overflow-hidden">
                  <Image 
                    src="/screenshots/record.png"
                    alt="Recording your day in The Human Atlas"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Exploring */}
            <div className="border border-[var(--border-primary)] p-8 bg-[var(--overlay-light)]">
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="font-mono text-2xl font-semibold text-[var(--text-primary)] mb-4">
                    2. EXPLORE THE EMOTIONAL LANDSCAPE
                  </h3>
                  <div className="space-y-6">
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      Discover how others navigate their emotional journeys. Our powerful filtering system
                      helps you find experiences that resonate with your current state of mind.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[var(--text-secondary)]">
                      <div className="space-y-2">
                        <h4 className="font-mono text-[var(--text-primary)] text-lg">Filter options:</h4>
                        <ul className="list-disc pl-4 space-y-2">
                          <li>By primary emotion (joy, sadness, etc.)</li>
                          <li>By day rating (find similar experiences)</li>
                          <li>By overall mood</li>
                          <li>Most recent entries</li>
                          <li>Featured stories</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-mono text-[var(--text-primary)] text-lg">How to explore:</h4>
                        <ul className="list-disc pl-4 space-y-2">
                          <li>Browse without restrictions</li>
                          <li>Find similar experiences</li>
                          <li>Learn from others&apos; journeys</li>
                          <li>Discover new perspectives</li>
                          <li>Connect through shared emotions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-2 border-[var(--border-primary)] overflow-hidden">
                  <Image 
                    src="/screenshots/explore.png"
                    alt="Exploring emotions in The Human Atlas"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Insights */}
            <div className="border border-[var(--border-primary)] p-8 bg-[var(--overlay-light)]">
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="font-mono text-2xl font-semibold text-[var(--text-primary)] mb-4">
                    3. GAIN MEANINGFUL INSIGHTS
                  </h3>
                  <div className="space-y-6">
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      Transform your emotional awareness through patterns and insights. Understanding your emotional
                      landscape and connecting with others&apos; experiences leads to personal growth and deeper empathy.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[var(--text-secondary)]">
                      <div className="space-y-2">
                        <h4 className="font-mono text-[var(--text-primary)] text-lg">What you&apos;ll learn:</h4>
                        <ul className="list-disc pl-4 space-y-2">
                          <li>Your emotional patterns</li>
                          <li>Common triggers and responses</li>
                          <li>Coping strategies from others</li>
                          <li>Universal human experiences</li>
                          <li>Personal growth opportunities</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-mono text-[var(--text-primary)] text-lg">Benefits:</h4>
                        <ul className="list-disc pl-4 space-y-2">
                          <li>Enhanced self-awareness</li>
                          <li>Better emotional regulation</li>
                          <li>Increased empathy</li>
                          <li>Reduced isolation</li>
                          <li>Personal development</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-2 border-[var(--border-primary)] overflow-hidden">
                  <Image 
                    src="/screenshots/insights.png"
                    alt="Gaining insights in The Human Atlas"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="px-4 py-16 border-b border-[var(--border-primary)] bg-[var(--overlay-light)]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Lock 
              size={48} 
              className="text-[var(--foreground)]"
              strokeWidth={1.5}
            />
          </div>
          <h2 className="font-mono text-2xl font-bold text-[var(--text-primary)] mb-4">
            YOUR PRIVACY IS OUR PRIORITY
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
            The Human Atlas is built on the foundation of complete anonymity. We never collect personal data,
            and your entries are stripped of any identifying information before being shared.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border border-[var(--border-primary)] bg-[var(--background)]">
              <h3 className="font-mono text-sm font-semibold text-[var(--text-primary)] mb-2">NO ACCOUNT NEEDED</h3>
              <p className="text-[var(--text-muted)] text-sm">Share your experiences without creating an account</p>
            </div>
            <div className="p-4 border border-[var(--border-primary)] bg-[var(--background)]">
              <h3 className="font-mono text-sm font-semibold text-[var(--text-primary)] mb-2">ZERO TRACKING</h3>
              <p className="text-[var(--text-muted)] text-sm">No cookies, no tracking, no analytics</p>
            </div>
            <div className="p-4 border border-[var(--border-primary)] bg-[var(--background)]">
              <h3 className="font-mono text-sm font-semibold text-[var(--text-primary)] mb-2">ENCRYPTED STORAGE</h3>
              <p className="text-[var(--text-muted)] text-sm">All entries are encrypted and secure</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Impact */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-mono text-2xl font-bold text-[var(--text-primary)] mb-12">
            CONTRIBUTING TO COLLECTIVE UNDERSTANDING
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border border-[var(--border-primary)] bg-[var(--overlay-light)]">
              <h3 className="font-mono text-xl font-semibold text-[var(--text-primary)] mb-4">
                FOR INDIVIDUALS
              </h3>
              <ul className="space-y-4 text-left">
                <li className="flex items-start gap-3">
                  <Lightbulb size={20} className="text-[var(--mood-excellent-border)] mt-1" />
                  <span className="text-[var(--text-secondary)]">
                    Gain insights into your emotional patterns
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Heart size={20} className="text-[var(--mood-good-border)] mt-1" />
                  <span className="text-[var(--text-secondary)]">
                    Find comfort in shared experiences
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Brain size={20} className="text-[var(--mood-neutral-border)] mt-1" />
                  <span className="text-[var(--text-secondary)]">
                    Develop emotional awareness
                  </span>
                </li>
              </ul>
            </div>
            <div className="p-6 border border-[var(--border-primary)] bg-[var(--overlay-light)]">
              <h3 className="font-mono text-xl font-semibold text-[var(--text-primary)] mb-4">
                FOR SOCIETY
              </h3>
              <ul className="space-y-4 text-left">
                <li className="flex items-start gap-3">
                  <Users size={20} className="text-[var(--mood-excellent-border)] mt-1" />
                  <span className="text-[var(--text-secondary)]">
                    Build empathy through shared stories
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle size={20} className="text-[var(--mood-good-border)] mt-1" />
                  <span className="text-[var(--text-secondary)]">
                    Meaningful discussions about mental health
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <HeartHandshake size={20} className="text-[var(--mood-neutral-border)] mt-1" />
                  <span className="text-[var(--text-secondary)]">
                    Create a more understanding world
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 border-t border-[var(--border-primary)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-mono text-2xl font-bold text-[var(--text-primary)] mb-6">
            JOIN THE EMOTIONAL REVOLUTION
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 max-w-lg mx-auto">
            Every story shared is a step towards better understanding ourselves and each other.
            Your experiences matter. Start sharing today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/about-project"
              className="px-8 py-4 border border-[var(--border-primary)] text-[var(--text-primary)] font-mono font-semibold hover:bg-[var(--hover-bg)] transition-colors"
            >
              ABOUT  PROJECT
            </Link>
            <Link 
              href="/"
              className="px-8 py-4 bg-[var(--button-bg)] text-[var(--button-text)] font-mono font-semibold hover:bg-[var(--button-hover-bg)] transition-colors"
            >
              START SHARING
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
