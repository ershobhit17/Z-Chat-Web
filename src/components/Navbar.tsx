import React, { useState, useEffect } from 'react';
import { Download, ArrowRight, Menu, X } from 'lucide-react';
import { APP_CONFIG } from '../lib/config';

interface NavbarProps {
  scrolled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) setMobileMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#060608]/85 backdrop-blur-xl border-b border-white/[0.07] py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo & Brand */}
          <a
            href="#"
            className="flex items-center gap-3.5 group text-decoration-none"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-white/5 border border-white/10 p-1 transition-transform duration-300 group-hover:scale-105">
              <img
                src="/assets/logo/app_logo.png"
                alt="Z Chat Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-[#FF6600] transition-colors">
                Z Chat
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollTo('scene-chat')}
              className="text-sm font-medium text-[#B5B5B5] hover:text-white transition-colors bg-transparent border-none cursor-pointer"
            >
              Product
            </button>
            <button
              onClick={() => scrollTo('scene-customization')}
              className="text-sm font-medium text-[#B5B5B5] hover:text-white transition-colors bg-transparent border-none cursor-pointer"
            >
              Experience
            </button>
            <button
              onClick={() => scrollTo('scene-devices')}
              className="text-sm font-medium text-[#B5B5B5] hover:text-white transition-colors bg-transparent border-none cursor-pointer"
            >
              Multi-Device
            </button>
            <a
              href={APP_CONFIG.webAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[#B5B5B5] hover:text-white transition-colors flex items-center gap-1 text-decoration-none"
            >
              Web App <ArrowRight className="w-3.5 h-3.5 opacity-70" />
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={APP_CONFIG.webAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary !py-2 !px-4 text-xs font-semibold"
            >
              Open Web App
            </a>
            <a
              href={APP_CONFIG.androidDownloadUrl}
              download="z-chat.apk"
              className="btn-primary !py-2 !px-5 text-xs font-bold"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white bg-transparent border-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#040406]/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 md:hidden">
          <div className="flex flex-col gap-6">
            <button
              onClick={() => scrollTo('scene-chat')}
              className="text-left text-2xl font-bold font-display text-white hover:text-[#FF6600] bg-transparent border-none cursor-pointer"
            >
              Product
            </button>
            <button
              onClick={() => scrollTo('scene-social')}
              className="text-left text-2xl font-bold font-display text-white hover:text-[#FF6600] bg-transparent border-none cursor-pointer"
            >
              Social & Clips
            </button>
            <button
              onClick={() => scrollTo('scene-customization')}
              className="text-left text-2xl font-bold font-display text-white hover:text-[#FF6600] bg-transparent border-none cursor-pointer"
            >
              Customization Studio
            </button>
            <button
              onClick={() => scrollTo('scene-devices')}
              className="text-left text-2xl font-bold font-display text-white hover:text-[#FF6600] bg-transparent border-none cursor-pointer"
            >
              Android & Web
            </button>
            <a
              href={APP_CONFIG.webAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-bold font-display text-white hover:text-[#FF6600] text-decoration-none flex items-center justify-between"
            >
              Open Z Chat Web <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="flex flex-col gap-3 pt-8 border-t border-white/10">
            <a
              href={APP_CONFIG.androidDownloadUrl}
              download="z-chat.apk"
              className="btn-primary w-full text-center justify-center py-4 text-base font-bold"
            >
              <Download className="w-5 h-5" />
              Download Z Chat ({APP_CONFIG.apkSizeMb})
            </a>
            <a
              href={APP_CONFIG.webAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full text-center justify-center py-3.5 text-sm"
            >
              Launch Web App →
            </a>
          </div>
        </div>
      )}
    </>
  );
};
