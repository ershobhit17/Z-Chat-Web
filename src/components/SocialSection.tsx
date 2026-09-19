import React from 'react';
import { Compass, Film, Heart } from 'lucide-react';

export const SocialSection: React.FC = () => {
  return (
    <section
      id="scene-social"
      className="relative min-h-screen flex items-center py-32 px-6 md:px-16 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left column is empty for the phone tilted towards left */}
        <div className="md:col-span-6 hidden md:block" />

        {/* Right Storytelling Column */}
        <div className="md:col-span-6 flex flex-col items-start pointer-events-auto z-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF6600] font-semibold mb-4">
            02 / Connected World
          </span>

          <h2 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white mb-6 leading-tight">
            More than a
            <br />
            conversation.
          </h2>

          <p className="font-sans text-lg sm:text-xl text-[#B5B5B5] max-w-lg mb-10 leading-relaxed">
            Transition seamlessly between private chats and public discovery. Share high-definition moments, follow creator updates, and explore curated feeds.
          </p>

          <div className="flex flex-col gap-4 w-full max-w-md">
            <div className="studio-glass p-5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#FF6600]">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-white">
                  Following & Explore Streams
                </h4>
                <p className="text-xs text-[#8E8E9A] mt-0.5">
                  Dual curated modes to focus on close friends or discover trending creators.
                </p>
              </div>
            </div>

            <div className="studio-glass p-5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#7C5CFF]">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-white">
                  Full Spectrum Stories & Video
                </h4>
                <p className="text-xs text-[#8E8E9A] mt-0.5">
                  High-bitrate video playback with responsive aspect ratios and zero compression artifacts.
                </p>
              </div>
            </div>

            <div className="studio-glass p-5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#EC4899]">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-white">
                  Direct Community Engagement
                </h4>
                <p className="text-xs text-[#8E8E9A] mt-0.5">
                  Engage with creators, participate in live comments, and repost directly to your chats.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
