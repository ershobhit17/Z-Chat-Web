import React, { useEffect, useState } from 'react';

interface OpeningLoaderProps {
  onComplete: () => void;
}

export const OpeningLoader: React.FC<OpeningLoaderProps> = ({ onComplete }) => {
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Elegant fast reveal (1000ms total, zero lag)
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 900);

    const completeTimer = setTimeout(() => {
      setHidden(true);
      onComplete();
    }, 1400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#040405] flex flex-col items-center justify-center transition-opacity duration-700 pointer-events-none ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Subtle radial ambient glow behind logo */}
        <div className="absolute w-48 h-48 bg-[#FF6600]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white/5 border border-white/10 p-2 shadow-2xl relative mb-6 animate-pulse-subtle">
          <img
            src="/assets/logo/app_logo.png"
            alt="Z Chat"
            className="w-full h-full object-contain"
          />
        </div>

        <span className="font-display font-bold text-lg text-white tracking-widest uppercase">
          Z Chat
        </span>
        <span className="text-[11px] font-mono text-[#777777] tracking-widest mt-1">
          INITIALIZING STUDIO ENGINE
        </span>
      </div>
    </div>
  );
};
