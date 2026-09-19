import React from 'react';
import { MessageSquare, Mic, Flame, CheckCheck } from 'lucide-react';

export const ChatSection: React.FC = () => {
  return (
    <section
      id="scene-chat"
      className="relative min-h-screen flex items-center py-32 px-6 md:px-16 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left Storytelling Column */}
        <div className="md:col-span-6 flex flex-col items-start pointer-events-auto z-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF6600] font-semibold mb-4">
            01 / Messaging Core
          </span>

          <h2 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white mb-6 leading-tight">
            Just chat.
          </h2>

          <p className="font-sans text-lg sm:text-xl text-[#B5B5B5] max-w-lg mb-10 leading-relaxed">
            Fast, pure, and distraction-free communication. Built from the ground up for high-fidelity realtime conversations with zero latency.
          </p>

          {/* Feature Specs in Studio Glass Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
            <div className="studio-glass p-5 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#7C5CFF]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-white mb-1">
                  Liquid Glass Bubbles
                </h3>
                <p className="text-xs text-[#8E8E9A] leading-normal">
                  Refractive backdrop blur with custom geometry and border radiance.
                </p>
              </div>
            </div>

            <div className="studio-glass p-5 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#FF6600]">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-white mb-1">
                  Spatial Voice Notes
                </h3>
                <p className="text-xs text-[#8E8E9A] leading-normal">
                  Realtime dynamic waveforms with multi-speed playback and crystal clarity.
                </p>
              </div>
            </div>

            <div className="studio-glass p-5 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#EF4444]">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-white mb-1">
                  Haptic Reactions
                </h3>
                <p className="text-xs text-[#8E8E9A] leading-normal">
                  Instant message reactions with live count badges and smooth micro-springs.
                </p>
              </div>
            </div>

            <div className="studio-glass p-5 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#60A5FA]">
                <CheckCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-white mb-1">
                  Presence & Receipts
                </h3>
                <p className="text-xs text-[#8E8E9A] leading-normal">
                  Sub-millisecond read confirmations with privacy-first encryption.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side is intentionally open for the 3D phone close-up */}
        <div className="md:col-span-6 hidden md:block" />
      </div>
    </section>
  );
};
