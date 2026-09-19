import React from 'react';
import { RefreshCw, Layers } from 'lucide-react';

export const MultiDeviceSection: React.FC = () => {
  return (
    <section
      id="scene-devices"
      className="relative min-h-screen flex items-center py-32 px-6 md:px-16 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Storytelling Column */}
        <div className="md:col-span-6 flex flex-col items-start pointer-events-auto z-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF6600] font-semibold mb-4">
            05 / Unified Ecosystem
          </span>

          <h2 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white mb-6 leading-tight">
            Wherever
            <br />
            you are.
          </h2>

          <p className="font-sans text-xl sm:text-2xl text-white font-medium tracking-tight mb-4">
            Z Chat on your phone. Z Chat on the web.
          </p>

          <p className="font-sans text-base sm:text-lg text-[#B5B5B5] max-w-lg mb-10 leading-relaxed">
            Start a message on Android during your commute. Pick up right where you left off on your browser at your desk. Everything stays synchronized with zero latency.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
            <div className="studio-glass p-5 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#FF6600]">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-white">
                  Continuous Realtime
                </h4>
                <p className="text-xs text-[#8E8E9A] mt-1">
                  Cloud state replication updates active conversations instantaneously.
                </p>
              </div>
            </div>

            <div className="studio-glass p-5 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#7C5CFF]">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-white">
                  Shared Identity
                </h4>
                <p className="text-xs text-[#8E8E9A] mt-1">
                  Your customized themes, sound preferences, and profile sync across all screens.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Space on right for the 3D phone + laptop duo composition */}
        <div className="md:col-span-6 hidden md:block" />
      </div>
    </section>
  );
};
