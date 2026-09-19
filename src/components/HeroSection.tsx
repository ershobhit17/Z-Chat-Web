import React from 'react';
import { Download, ArrowRight, ShieldCheck, Sparkles, MessageSquare, Palette, Compass, Settings, Zap } from 'lucide-react';
import { APP_CONFIG } from '../lib/config';

interface HeroSectionProps {
  activeScreen?: 'chat' | 'social' | 'customization' | 'settings';
  onSelectScreen?: (screen: 'chat' | 'social' | 'customization' | 'settings') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeScreen = 'chat',
  onSelectScreen,
}) => {
  const demoScreens = [
    { id: 'chat', label: 'Chats Hub', icon: MessageSquare, badge: 'Realtime 5G+' },
    { id: 'customization', label: 'Appearance Studio', icon: Palette, badge: 'USP Engine' },
    { id: 'social', label: 'Z Social', icon: Compass, badge: 'Video Feed' },
    { id: 'settings', label: 'Settings', icon: Settings, badge: 'Profile & Dev' },
  ] as const;

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 px-6 md:px-16 pointer-events-none">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Editorial Left Content */}
        <div className="md:col-span-7 flex flex-col items-start pointer-events-auto z-20">
          {/* Micro Meta Badge with Pulsing Live Dot */}
          <div className="badge-meta mb-6 group cursor-pointer hover:border-white/30 transition-all duration-300">
            <span className="badge-dot animate-ping" />
            <span className="badge-dot" />
            <span>Official Release • {APP_CONFIG.version} • Live 3D Experience</span>
          </div>

          {/* Large Editorial Headline */}
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-[0.98] mb-6 whitespace-pre-line">
            Messaging,
            <br />
            <span className="bg-gradient-to-r from-white via-[#FF6600] to-[#EC4899] bg-clip-text text-transparent animate-pulse">
              reimagined.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="font-sans text-xl sm:text-2xl text-[#B5B5B5] font-normal tracking-tight max-w-xl mb-8 leading-relaxed">
            {APP_CONFIG.subheadline}
          </p>

          {/* Interactive 3D Phone Screen Selector (Live Interactive Demo) */}
          <div className="w-full max-w-xl mb-8 p-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between mb-2.5 px-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#A1A1AA] flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#FF6600]" />
                Interactive 3D Demo • Select Screen
              </span>
              <span className="text-[10px] font-mono text-[#EC4899] font-medium bg-[#EC4899]/10 px-2 py-0.5 rounded-full border border-[#EC4899]/20">
                Live Dynamic
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {demoScreens.map((s) => {
                const isSelected = activeScreen === s.id;
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => onSelectScreen && onSelectScreen(s.id)}
                    className={`relative p-2.5 rounded-xl flex flex-col items-start gap-1 transition-all duration-300 text-left cursor-pointer group ${
                      isSelected
                        ? 'bg-gradient-to-b from-white/15 to-white/5 border border-[#FF6600]/80 shadow-[0_0_20px_rgba(255,102,0,0.3)]'
                        : 'bg-black/30 border border-white/5 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isSelected ? 'text-[#FF6600]' : 'text-[#8E8E9A] group-hover:text-white'
                        }`}
                      />
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6600] animate-pulse" />
                      )}
                    </div>
                    <span className="font-display font-bold text-xs text-white leading-tight mt-1">
                      {s.label}
                    </span>
                    <span className="text-[9px] font-mono text-[#777777] group-hover:text-[#B5B5B5]">
                      {s.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Access Actions (Visual Hierarchy) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
            {/* Primary Action (Visually Dominant) */}
            <a
              href={APP_CONFIG.androidDownloadUrl}
              download="z-chat.apk"
              className="btn-primary text-base py-4 px-8 group relative overflow-hidden"
              id="hero-download-btn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              <Download className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>Download Z Chat</span>
              <span className="text-xs font-semibold opacity-75 ml-1">({APP_CONFIG.apkSizeMb})</span>
            </a>

            {/* Secondary Action (Minimal, Elegant) */}
            <a
              href={APP_CONFIG.webAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm py-4 px-7 group"
              id="hero-web-btn"
            >
              <span>Open Z Chat Web</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Trust & Platform Indicator */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-[#777777] font-medium tracking-wide">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF6600]" />
              <span>Direct Android APK • Verified</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0A84FF]" />
              <span>Zero-install Web Client</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Fluid 60 FPS Studio</span>
            </div>
          </div>
        </div>

        {/* Right side interactive 3D Orbit & Rotate Zone (Clean & Unobstructed) */}
        <div className="md:col-span-5 relative hidden md:flex flex-col items-center justify-end min-h-[580px] pointer-events-auto cursor-grab active:cursor-grabbing group">
          {/* Subtle Luxury Interactive Drag & Rotate Indicator Pill */}
          <div className="mb-4 px-4 py-2 rounded-full bg-black/70 border border-white/10 backdrop-blur-md text-xs font-mono text-[#8E8E9A] flex items-center gap-2.5 shadow-2xl group-hover:border-[#FF6600]/50 group-hover:text-white transition-all duration-300 select-none">
            <span className="w-2 h-2 rounded-full bg-[#FF6600] animate-ping" />
            <span>Click & Drag to Rotate in 3D</span>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Hint Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#777777] opacity-60 pointer-events-none">
        <span>Scroll to explore 3D timeline</span>
        <div className="w-0.5 h-6 bg-gradient-to-b from-[#FF6600] to-transparent rounded-full animate-bounce" />
      </div>
    </section>
  );
};
