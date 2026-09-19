import React from 'react';
import { APP_CONFIG } from '../lib/config';

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-white/[0.08] bg-[#040406] py-14 px-6 md:px-12 pointer-events-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Logo & Info */}
        <div className="flex items-center gap-3.5">
          <div className="w-8 h-8 rounded-xl overflow-hidden bg-white/5 border border-white/10 p-1">
            <img
              src="/assets/logo/app_logo.png"
              alt="Z Chat Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm text-white tracking-tight">
              Z Chat
            </span>
            <span className="text-[11px] text-[#777777]">
              Messaging, reimagined.
            </span>
          </div>
        </div>

        {/* Center: Minimal Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-medium text-[#8E8E9A]">
          <a href="#scene-chat" className="hover:text-white transition-colors text-decoration-none">
            Product
          </a>
          <a href="#scene-customization" className="hover:text-white transition-colors text-decoration-none">
            Experience
          </a>
          <a
            href={APP_CONFIG.webAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors text-decoration-none"
          >
            Open Web App
          </a>
          <a
            href={APP_CONFIG.androidDownloadUrl}
            download="z-chat.apk"
            className="hover:text-[#FF6600] transition-colors text-decoration-none"
          >
            Download ({APP_CONFIG.apkSizeMb})
          </a>
          <span className="text-white/20">•</span>
          <span className="cursor-default">Privacy</span>
          <span className="cursor-default">Terms</span>
        </div>

        {/* Right: Copyright */}
        <div className="text-[11px] font-mono text-[#666666]">
          © {new Date().getFullYear()} Z Chat. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
