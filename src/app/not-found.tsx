"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 p-6 relative overflow-hidden">
      {/* Animated background noise effect */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url("/noise.webp")',
          animation: 'noise 0.5s steps(2) infinite'
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h1 className="text-7xl md:text-9xl font-mono font-bold text-foreground mb-6 glitch-text">
          404
        </h1>
        <h2 className="text-xl md:text-2xl font-mono text-foreground/80 mb-8 typewriter-text">
          EMOTION: LOST & CONFUSED
        </h2>
        <div className="space-y-4 mb-12">
          <p className="text-lg text-foreground/60 font-mono leading-relaxed">
            Like a misplaced emotion in our human atlas,<br/>
            this page seems to have wandered off the map.
          </p>
          <p className="text-sm text-foreground/40 font-mono">
            [Coordinates not found in the emotional landscape]
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="px-6 py-2 bg-foreground text-background font-mono border border-black hover:bg-background hover:text-foreground hover:border-foreground transition-all duration-200"
          >
            Return to Base
          </Link>
          <Link
            href="/explore"
            className="px-6 py-2 bg-background text-foreground font-mono border border-foreground hover:bg-foreground hover:text-background transition-all duration-200"
          >
            Explore Atlas
          </Link>
        </div>
      </div>

      {/* Add some style for animations */}
      <style jsx global>{`
        @keyframes noise {
          0%, 100% { transform: translate(0,0) }
          10% { transform: translate(-5%,-5%) }
          20% { transform: translate(-10%,5%) }
          30% { transform: translate(5%,-10%) }
          40% { transform: translate(-5%,15%) }
          50% { transform: translate(-10%,5%) }
          60% { transform: translate(15%,0) }
          70% { transform: translate(0,10%) }
          80% { transform: translate(-15%,0) }
          90% { transform: translate(10%,5%) }
        }

        .glitch-text {
          position: relative;
          text-shadow: 
            0.05em 0 0 rgba(255,0,0,0.75),
            -0.025em -0.05em 0 rgba(0,255,0,0.75),
            0.025em 0.05em 0 rgba(0,0,255,0.75);
          animation: glitch 500ms infinite;
        }

        @keyframes glitch {
          0% { text-shadow: 0.05em 0 0 rgba(255,0,0,0.75), -0.05em -0.025em 0 rgba(0,255,0,0.75), -0.025em 0.05em 0 rgba(0,0,255,0.75); }
          14% { text-shadow: 0.05em 0 0 rgba(255,0,0,0.75), -0.05em -0.025em 0 rgba(0,255,0,0.75), -0.025em 0.05em 0 rgba(0,0,255,0.75); }
          15% { text-shadow: -0.05em -0.025em 0 rgba(255,0,0,0.75), 0.025em 0.025em 0 rgba(0,255,0,0.75), -0.05em -0.05em 0 rgba(0,0,255,0.75); }
          49% { text-shadow: -0.05em -0.025em 0 rgba(255,0,0,0.75), 0.025em 0.025em 0 rgba(0,255,0,0.75), -0.05em -0.05em 0 rgba(0,0,255,0.75); }
          50% { text-shadow: 0.025em 0.05em 0 rgba(255,0,0,0.75), 0.05em 0 0 rgba(0,255,0,0.75), 0 -0.05em 0 rgba(0,0,255,0.75); }
          99% { text-shadow: 0.025em 0.05em 0 rgba(255,0,0,0.75), 0.05em 0 0 rgba(0,255,0,0.75), 0 -0.05em 0 rgba(0,0,255,0.75); }
          100% { text-shadow: -0.025em 0 0 rgba(255,0,0,0.75), -0.025em -0.025em 0 rgba(0,255,0,0.75), -0.025em -0.05em 0 rgba(0,0,255,0.75); }
        }

        .typewriter-text {
          overflow: hidden;
          border-right: 0.15em solid #fff;
          white-space: nowrap;
          margin: 0 auto;
          animation: 
            typing 3.5s steps(40, end),
            blink-caret 0.75s step-end infinite;
        }

        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }

        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #fff }
        }
      `}</style>
    </main>
  );
}
