import React from 'react';

export const BrandSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-end pb-28 px-6 text-center pointer-events-none">
      <div className="max-w-2xl mx-auto flex flex-col items-center z-20 pointer-events-auto">
        <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#FF6600] font-semibold mb-4 opacity-90">
          The Emblem
        </span>

        <h2 className="font-display font-black text-6xl sm:text-8xl tracking-tight text-white mb-4">
          Z Chat
        </h2>

        <p className="font-sans text-xl sm:text-2xl text-[#B5B5B5] tracking-wide font-normal">
          Connect differently.
        </p>

        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#FF6600] to-transparent mt-8" />
      </div>
    </section>
  );
};
