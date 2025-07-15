'use client';

import { 
  Compass,
  Heart,
  Users,
  Globe,
  Code2,
  GraduationCap,
  Puzzle,
  Stars,
  Ship,
  Rocket,
  Github
} from 'lucide-react';
import Link from 'next/link';

export default function AboutProject() {
  return (
    <main className="w-full min-h-screen bg-neutral-900 pt-16">
      {/* Hero Section */}
      <section className="px-4 py-16 text-center border-b border-[var(--border-primary)]">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <Ship 
              size={64} 
              className="text-[var(--foreground)]"
              strokeWidth={1.5}
            />
          </div>
          <h1 className="font-mono text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
            THE STORY BEHIND THE HUMAN ATLAS
          </h1>
          <p className="font-sans text-lg md:text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
            A journey into emotional cartography, born at Hack Club&apos;s Shipwrecked 2025
          </p>
          <div className="inline-flex items-center px-4 py-2 border border-[var(--border-primary)] bg-[var(--overlay-light)]">
            <Stars size={20} className="text-[var(--foreground)] mr-2" />
            <span className="font-mono text-sm text-[var(--text-muted)]">
              SHIPWRECKED 2025 SUBMISSION
            </span>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="px-4 py-16 border-b border-[var(--border-primary)]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-mono text-2xl font-bold text-[var(--text-primary)] mb-6">
                THE GENESIS
              </h2>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  The Human Atlas was conceived during Hack Club&apos;s Shipwrecked 2025, a unique program
                  that challenges young developers to push the boundaries of their creativity and technical skills.
                </p>
                <p>
                  In a world increasingly dominated by artificial intelligence and digital interactions,
                  we recognized the need for a platform that celebrates and explores the depth of human
                  emotions – the very essence of what makes us human.
                </p>
                <div className="flex items-center gap-3 mt-6">
                  <Ship size={20} className="text-[var(--foreground)]" />
                  <span className="font-mono text-sm">Built during Shipwrecked 2025</span>
                </div>
              </div>
            </div>
            <div className="border border-[var(--border-primary)] p-6 bg-[var(--overlay-light)]">
              <h3 className="font-mono text-lg font-semibold text-[var(--text-primary)] mb-4">
                PROJECT STATISTICS
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Users size={24} className="text-[var(--mood-excellent-border)]" />
                  <div>
                    <h4 className="font-mono text-[var(--text-primary)]">Community First</h4>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Built for and by the community, focusing on shared human experiences
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Code2 size={24} className="text-[var(--mood-good-border)]" />
                  <div>
                    <h4 className="font-mono text-[var(--text-primary)]">Open Source</h4>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Transparent development process with community contributions welcome
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Globe size={24} className="text-[var(--mood-neutral-border)]" />
                  <div>
                    <h4 className="font-mono text-[var(--text-primary)]">Global Reach</h4>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Designed to connect people across cultures and continents
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 py-16 border-b border-[var(--border-primary)] bg-[var(--overlay-light)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-mono text-2xl font-bold text-center text-[var(--text-primary)] mb-12">
            OUR MISSION & VISION
          </h2>
          <div className="space-y-8">
            <div className="p-6 border border-[var(--border-primary)] bg-[var(--background)]">
              <div className="flex items-start gap-4">
                <Compass size={24} className="text-[var(--foreground)]" />
                <div>
                  <h3 className="font-mono text-lg font-semibold text-[var(--text-primary)] mb-3">
                    MISSION STATEMENT
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    To create a safe, anonymous space where individuals can share their emotional
                    experiences, contributing to a collective understanding of human feelings and
                    fostering empathy across cultural and geographical boundaries.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border border-[var(--border-primary)] bg-[var(--background)]">
                <h3 className="font-mono text-lg font-semibold text-[var(--text-primary)] mb-4">
                  WHY EMOTIONS MATTER
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Heart size={20} className="text-[var(--mood-excellent-border)] mt-1" />
                    <span className="text-[var(--text-secondary)]">
                      Emotions are the universal language that connects all humans
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users size={20} className="text-[var(--mood-good-border)] mt-1" />
                    <span className="text-[var(--text-secondary)]">
                      Shared experiences reduce feelings of isolation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Puzzle size={20} className="text-[var(--mood-neutral-border)] mt-1" />
                    <span className="text-[var(--text-secondary)]">
                      Understanding emotions leads to better mental health
                    </span>
                  </li>
                </ul>
              </div>
              <div className="p-6 border border-[var(--border-primary)] bg-[var(--background)]">
                <h3 className="font-mono text-lg font-semibold text-[var(--text-primary)] mb-4">
                  FUTURE VISION
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Globe size={20} className="text-[var(--mood-excellent-border)] mt-1" />
                    <span className="text-[var(--text-secondary)]">
                      Create the world&apos;s largest emotional experience database
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <GraduationCap size={20} className="text-[var(--mood-good-border)] mt-1" />
                    <span className="text-[var(--text-secondary)]">
                      Develop educational resources for emotional intelligence
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Rocket size={20} className="text-[var(--mood-neutral-border)] mt-1" />
                    <span className="text-[var(--text-secondary)]">
                      Expand features based on community feedback
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack & Development */}
      <section className="px-4 py-16 border-b border-[var(--border-primary)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-mono text-2xl font-bold text-center text-[var(--text-primary)] mb-12">
            BUILT WITH PASSION
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-mono text-lg font-semibold text-[var(--text-primary)] mb-6">
                DEVELOPMENT JOURNEY
              </h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  The Human Atlas was developed during the intense and exciting Shipwrecked 2025
                  program by Hack Club. Our development process focused on creating a seamless,
                  accessible, and engaging platform that prioritizes user privacy and emotional expression.
                </p>
                <p>
                  We chose modern technologies that allow for rapid iteration and excellent user
                  experience, while maintaining the highest standards of security and performance.
                </p>
              </div>
            </div>
            <div className="border border-[var(--border-primary)] p-6 bg-[var(--overlay-light)]">
              <h3 className="font-mono text-lg font-semibold text-[var(--text-primary)] mb-4">
                TECHNICAL HIGHLIGHTS
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="text-[var(--text-muted)] font-mono">Next.js 13</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[var(--text-muted)] font-mono">React & TypeScript</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[var(--text-muted)] font-mono">Tailwind CSS</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[var(--text-muted)] font-mono">Lucide Icons</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team & Acknowledgments */}
      <section className="px-4 py-16 border-b border-[var(--border-primary)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-mono text-2xl font-bold text-[var(--text-primary)] mb-8">
            ACKNOWLEDGMENTS
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
            Special thanks to Hack Club for organizing Shipwrecked 2025 and providing the
            platform for this project to come to life. We&apos;re grateful for the support,
            feedback, and encouragement from the amazing Hack Club community.
          </p>
          <Link 
            href="https://github.com/shashwtd/the-human-atlas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-[var(--border-primary)] hover:bg-[var(--hover-bg)] transition-colors"
          >
            <Github size={20} className="text-[var(--foreground)] mr-2" />
            <span className="font-mono text-[var(--text-primary)]">View on GitHub</span>
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-mono text-2xl font-bold text-[var(--text-primary)] mb-6">
            BE PART OF THE JOURNEY
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
            The Human Atlas is more than just a project – it&apos;s a movement towards better
            understanding ourselves and each other. Join us in mapping the landscape of human emotions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/how-it-works"
              className="px-8 py-4 bg-[var(--button-bg)] text-[var(--button-text)] font-mono font-semibold hover:bg-[var(--button-hover-bg)] transition-colors"
            >
              LEARN MORE
            </Link>
            <Link 
              href="/"
              className="px-8 py-4 border border-[var(--border-primary)] text-[var(--text-primary)] font-mono font-semibold hover:bg-[var(--hover-bg)] transition-colors"
            >
              START SHARING
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
