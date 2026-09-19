import React from 'react';
import { ArrowRight, Globe, Zap, Laptop } from 'lucide-react';
import { APP_CONFIG } from '../lib/config';

export const WebAppSection: React.FC = () => {
  return (
    <section
      id="scene-webapp"
      className="relative min-h-screen flex items-center py-32 px-6 md:px-16 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Storytelling Column */}
        <div className="md:col-span-6 flex flex-col items-start pointer-events-auto z-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#0A84FF] font-semibold mb-4">
            06 / Browser Engine
          </span>

          <h2 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white mb-6 leading-tight">
            Keep the
            <br />
            conversation
            <br />
            going.
          </h2>

          <p className="font-sans text-lg sm:text-xl text-[#B5B5B5] max-w-lg mb-8 leading-relaxed">
            Experience Z Chat directly from Chrome, Safari, Edge, or Brave. Full keyboard shortcuts, ultra-wide layout, drag-and-drop file attachments, and instant audio messages.
          </p>

          {/* Web App Direct CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10 w-full sm:w-auto">
            <a
              href={APP_CONFIG.webAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base py-4 px-8"
              id="webapp-scene-cta"
            >
              <span>Open Z Chat Web</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <div className="flex items-center gap-2 text-xs font-mono text-[#8E8E9A] px-3 py-2 rounded-lg bg-white/5 border border-white/10">
              <Globe className="w-3.5 h-3.5 text-[#0A84FF]" />
              <span>Zero install • Instant launch</span>
            </div>
          </div>

          {/* Key Desktop Highlights */}
          <div className="flex flex-col gap-3 w-full max-w-md">
            <div className="flex items-center gap-3 text-sm text-[#B5B5B5]">
              <Zap className="w-4 h-4 text-[#FF6600]" />
              <span>CanvasKit GPU-accelerated graphics rendering</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#B5B5B5]">
              <Laptop className="w-4 h-4 text-[#7C5CFF]" />
              <span>Responsive split-view desktop architecture</span>
            </div>
          </div>
        </div>

        {/* Space on right for the 3D laptop front view */}
        <div className="md:col-span-6 hidden md:block" />
      </div>
    </section>
  );
};
