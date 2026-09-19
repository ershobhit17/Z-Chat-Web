import React from 'react';
import { Download, ArrowRight } from 'lucide-react';
import { APP_CONFIG } from '../lib/config';

interface MobileBottomBarProps {
  visible: boolean;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden flex items-center gap-2.5 p-2 rounded-2xl bg-[#08080c]/90 border border-white/15 backdrop-blur-xl shadow-2xl transition-all duration-300 pointer-events-auto">
      <a
        href={APP_CONFIG.androidDownloadUrl}
        download="z-chat.apk"
        className="btn-primary flex-1 !py-3 !px-4 text-xs font-bold justify-center"
      >
        <Download className="w-4 h-4" />
        <span>Download Z Chat</span>
      </a>
      <a
        href={APP_CONFIG.webAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary !py-3 !px-3.5 text-xs font-semibold"
        aria-label="Open Web App"
      >
        <span>Web</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </div>
  );
};
