import React, { useState } from 'react';
import { Sparkles, Zap, ArrowUpRight } from 'lucide-react';

interface ScreenDemo {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  img: string;
  accent: string;
  badge: string;
  specs: string[];
}

export const GallerySection: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ [key: number]: { x: number; y: number } }>({});

  const screens: ScreenDemo[] = [
    {
      id: 'chats',
      title: 'Chats Hub',
      subtitle: 'Pure conversation with instant haptic reactions & requests',
      tag: 'Core Messaging',
      img: '/assets/screenshots/chats_main.png',
      accent: '#FF6600',
      badge: '5G+ Realtime',
      specs: ['Sub-ms latency', 'Offline caching', 'End-to-end cipher'],
    },
    {
      id: 'appearance',
      title: 'Appearance Studio',
      subtitle: 'Dynamic anime atmosphere with live liquid glass refraction',
      tag: 'Aesthetic Engine',
      img: '/assets/screenshots/appearance_main.png',
      accent: '#EC4899',
      badge: 'USP Shader',
      specs: ['26 Theme presets', 'Custom mesh atmosphere', 'Live preview'],
    },
    {
      id: 'social',
      title: 'Z Social & Watch',
      subtitle: 'Seamless feed with integrated YouTube streaming & clips',
      tag: 'Connected Stream',
      img: '/assets/screenshots/social_main.png',
      accent: '#00E5FF',
      badge: 'High Bitrate',
      specs: ['Zero compression', 'Curated channels', 'Direct chat sharing'],
    },
    {
      id: 'settings',
      title: 'Settings & Studio USP',
      subtitle: 'Granular notification control, developer profile & telemetry',
      tag: 'System Control',
      img: '/assets/screenshots/settings_main.png',
      accent: '#7C5CFF',
      badge: 'Profile & Config',
      specs: ['Appearance USP hook', 'Global switches', 'AI/ML verified'],
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMousePos((prev) => ({ ...prev, [idx]: { x, y } }));
  };

  const handleMouseLeave = (idx: number) => {
    setHoveredIdx(null);
    setMousePos((prev) => ({ ...prev, [idx]: { x: 0, y: 0 } }));
  };

  return (
    <section id="gallery" className="relative min-h-screen flex flex-col justify-center py-32 px-6 md:px-12 overflow-hidden pointer-events-auto">
      {/* Background Motion Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#FF6600]/15 via-[#EC4899]/15 to-[#7C5CFF]/15 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto w-full mb-16 text-center">
        <div className="badge-meta mb-4 inline-flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6600] animate-spin" style={{ animationDuration: '6s' }} />
          <span>Authentic Interface Topology</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <h2 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight mb-6">
          Every screen,{' '}
          <span className="bg-gradient-to-r from-white via-[#FF6600] to-[#EC4899] bg-clip-text text-transparent">
            alive in 3D.
          </span>
        </h2>
        <p className="font-sans text-lg sm:text-xl text-[#B5B5B5] max-w-2xl mx-auto leading-relaxed">
          Hover and tilt to explore the real interface captured directly from production builds. Interactive physical depth, liquid glass highlights, and zero compression.
        </p>
      </div>

      {/* 3D Interactive Spatial Tilt Cards Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
        {screens.map((s, idx) => {
          const isHovered = hoveredIdx === idx;
          const pos = mousePos[idx] || { x: 0, y: 0 };
          const rotX = isHovered ? -pos.y * 14 : 0;
          const rotY = isHovered ? pos.x * 14 : 0;

          // Levitation floating animation offset
          const floatDelay = `${idx * 1.2}s`;

          return (
            <div
              key={s.id}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseMove={(e) => handleMouseMove(e, idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              style={{ perspective: '1200px' }}
              className="relative group"
            >
              {/* Outer 3D Tilt Phone Frame */}
              <div
                style={{
                  transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${isHovered ? '25px' : '0px'})`,
                  transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  animationDelay: floatDelay,
                }}
                className="relative rounded-[38px] p-3 bg-gradient-to-b from-[#1c1c24] via-[#0d0d12] to-[#08080a] border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-all duration-300 group-hover:border-white/40 group-hover:shadow-[0_25px_60px_rgba(255,102,0,0.18)]"
              >
                {/* Metallic Bezel Rim Highlight */}
                <div
                  className="absolute inset-0 rounded-[38px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at ${(pos.x + 1) * 50}% ${(pos.y + 1) * 50}%, rgba(255, 255, 255, 0.2) 0%, transparent 60%)`,
                  }}
                />

                {/* Speaker Ear-piece Notch / Dynamic Island Bar */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 rounded-full bg-black/80 border border-white/10 z-30 flex items-center justify-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#181822] border border-white/20" />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
                </div>

                {/* Inner Screen Surface */}
                <div className="overflow-hidden rounded-[30px] aspect-[460/1024] bg-black relative border border-white/5">
                  {/* Real Screenshot Image */}
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Specular Glare Layer tracking mouse */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                      opacity: isHovered ? 0.35 : 0,
                      background: `linear-gradient(${115 + pos.x * 30}deg, transparent 20%, rgba(255, 255, 255, 0.4) 50%, transparent 80%)`,
                    }}
                  />

                  {/* Bottom Gradient for Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                  {/* Floating Action Badge on Screen */}
                  <div className="absolute top-12 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span
                      className="text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md shadow-lg"
                      style={{
                        backgroundColor: `${s.accent}20`,
                        borderColor: `${s.accent}50`,
                        color: s.accent,
                      }}
                    >
                      {s.badge}
                    </span>
                    <span className="w-6 h-6 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white/80 backdrop-blur-md">
                      <Zap className="w-3 h-3 text-[#FF6600]" />
                    </span>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1 pointer-events-none">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#B5B5B5] font-semibold">
                      {s.tag}
                    </span>
                    <span className="text-base font-display font-bold text-white flex items-center justify-between">
                      {s.title}
                      <ArrowUpRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </span>
                    <p className="text-[11px] text-[#A1A1AA] line-clamp-2 leading-relaxed">
                      {s.subtitle}
                    </p>
                  </div>
                </div>

                {/* Specs Pill row below screen */}
                <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-1.5">
                  {s.specs.map((spec, specIdx) => (
                    <span
                      key={specIdx}
                      className="text-[9px] font-mono text-[#8E8E9A] bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/5"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
