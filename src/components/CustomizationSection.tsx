import React from 'react';
import { Sliders, Check } from 'lucide-react';
import { APP_CONFIG } from '../lib/config';

interface CustomizationSectionProps {
  activeThemePreset: 'midnight_glass' | 'obsidian' | 'arctic_frost';
  onSelectTheme: (theme: 'midnight_glass' | 'obsidian' | 'arctic_frost') => void;
  glassIntensity: number;
  onChangeIntensity: (val: number) => void;
}

export const CustomizationSection: React.FC<CustomizationSectionProps> = ({
  activeThemePreset,
  onSelectTheme,
  glassIntensity,
  onChangeIntensity,
}) => {
  return (
    <section
      id="scene-customization"
      className="relative min-h-screen flex items-center py-32 px-6 md:px-16 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left Interactive Control Console */}
        <div className="md:col-span-6 flex flex-col items-start pointer-events-auto z-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF6600] font-semibold mb-4">
            04 / Appearance Studio
          </span>

          <h2 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white mb-6 leading-tight">
            Make it yours.
          </h2>

          <p className="font-sans text-lg sm:text-xl text-[#B5B5B5] max-w-lg mb-8 leading-relaxed">
            Every layer of Z Chat is customizable. Select a theme preset or tune real-time frosted glass refraction directly on the device display.
          </p>

          {/* Interactive Preset Buttons */}
          <div className="flex flex-col gap-3 w-full max-w-md mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-[#777777]">
              Curated Aesthetic Presets
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {APP_CONFIG.themePresets.map((preset) => {
                const isSelected = activeThemePreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() =>
                      onSelectTheme(
                        preset.id as 'midnight_glass' | 'obsidian' | 'arctic_frost'
                      )
                    }
                    className={`p-4 rounded-2xl flex flex-col items-start gap-2 border text-left transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-white/10 border-white/40 shadow-lg'
                        : 'bg-black/40 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: preset.color }}
                      />
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className="font-display font-bold text-xs text-white">
                      {preset.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Realtime Liquid Glass Studio Slider */}
          <div className="studio-glass p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#FF6600]" />
                <span className="font-display font-bold text-sm text-white">
                  Liquid Glass Intensity
                </span>
              </div>
              <span className="font-mono text-xs text-[#FF6600] font-semibold">
                {Math.round(glassIntensity * 100)}%
              </span>
            </div>

            <input
              type="range"
              min="0.05"
              max="0.8"
              step="0.05"
              value={glassIntensity}
              onChange={(e) => onChangeIntensity(parseFloat(e.target.value))}
              className="w-full accent-[#FF6600] cursor-pointer"
            />

            <div className="flex items-center justify-between text-[11px] text-[#777777] font-mono mt-2">
              <span>Subtle Minimal</span>
              <span>Liquid Refraction</span>
              <span>Ultra Frost</span>
            </div>
          </div>
        </div>

        {/* Right side is open for the live reactive 3D phone screen */}
        <div className="md:col-span-6 hidden md:block" />
      </div>
    </section>
  );
};
