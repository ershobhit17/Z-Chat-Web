import React from 'react';
import { Play, Sparkles, Volume2, Flame } from 'lucide-react';

export const ClipsSection: React.FC = () => {
  return (
    <section
      id="scene-clips"
      className="relative min-h-screen flex items-center py-32 px-6 md:px-16 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left Storytelling Column */}
        <div className="md:col-span-6 flex flex-col items-start pointer-events-auto z-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF6600] font-semibold mb-4">
            03 / Video Discovery
          </span>

          <h2 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white mb-6 leading-tight">
            Discover
            <br />
            something new.
          </h2>

          <p className="font-sans text-lg sm:text-xl text-[#B5B5B5] max-w-lg mb-10 leading-relaxed">
            Z Clips delivers an immersive vertical video stream. High dynamic range playback, fluid swipe transitions, and creator-first publishing.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
            <div className="studio-glass p-5">
              <div className="flex items-center gap-2 text-[#FF6600] font-mono text-xs mb-2">
                <Play className="w-4 h-4" />
                <span>ZERO BUFFER</span>
              </div>
              <h4 className="font-display font-bold text-sm text-white mb-1">
                Instant Playback
              </h4>
              <p className="text-xs text-[#8E8E9A]">
                Predictive video caching serves the next clip instantaneously on swipe.
              </p>
            </div>

            <div className="studio-glass p-5">
              <div className="flex items-center gap-2 text-[#7C5CFF] font-mono text-xs mb-2">
                <Volume2 className="w-4 h-4" />
                <span>SPATIAL AUDIO</span>
              </div>
              <h4 className="font-display font-bold text-sm text-white mb-1">
                Studio Sound
              </h4>
              <p className="text-xs text-[#8E8E9A]">
                Crisp frequency separation optimized for mobile speakers and headphones.
              </p>
            </div>

            <div className="studio-glass p-5">
              <div className="flex items-center gap-2 text-[#EC4899] font-mono text-xs mb-2">
                <Flame className="w-4 h-4" />
                <span>ALGORITHM FREE</span>
              </div>
              <h4 className="font-display font-bold text-sm text-white mb-1">
                Authentic Trending
              </h4>
              <p className="text-xs text-[#8E8E9A]">
                Content ranked by organic engagement rather than sensationalist retention metrics.
              </p>
            </div>

            <div className="studio-glass p-5">
              <div className="flex items-center gap-2 text-[#60A5FA] font-mono text-xs mb-2">
                <Sparkles className="w-4 h-4" />
                <span>DIRECT TO CHAT</span>
              </div>
              <h4 className="font-display font-bold text-sm text-white mb-1">
                1-Tap Clip Sharing
              </h4>
              <p className="text-xs text-[#8E8E9A]">
                Send clips directly to any contact or group with automatic inline previews.
              </p>
            </div>
          </div>
        </div>

        {/* Right side for 3D vertical phone */}
        <div className="md:col-span-6 hidden md:block" />
      </div>
    </section>
  );
};
