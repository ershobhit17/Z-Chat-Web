import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ChatSection } from './components/ChatSection';
import { SocialSection } from './components/SocialSection';
import { ClipsSection } from './components/ClipsSection';
import { CustomizationSection } from './components/CustomizationSection';
import { MultiDeviceSection } from './components/MultiDeviceSection';
import { WebAppSection } from './components/WebAppSection';
import { ProfileSection } from './components/ProfileSection';
import { GallerySection } from './components/GallerySection';
import { BrandSection } from './components/BrandSection';
import { DownloadSection } from './components/DownloadSection';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { OpeningLoader } from './components/OpeningLoader';
import { ProductCanvas } from './components/three/ProductCanvas';

export const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeThemePreset, setActiveThemePreset] = useState<
    'midnight_glass' | 'obsidian' | 'arctic_frost'
  >('midnight_glass');
  const [interactiveScreen, setInteractiveScreen] = useState<
    'chat' | 'social' | 'customization' | 'settings'
  >('chat');
  const [glassIntensity, setGlassIntensity] = useState(0.2);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;

      setScrollProgress(progress);
      setScrolled(scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#040405] text-[#F5F5F5] selection:bg-[#FF6600] selection:text-black">
      {/* Dynamic Ambient Living Aurora Mesh & Cinema Overlays */}
      <div className="ambient-aurora-glow" />
      <div className="cinema-grain" />
      <div className="cinema-vignette" />

      {/* Opening Cinematic Fade */}
      <OpeningLoader onComplete={() => {}} />

      {/* Fixed 3D Studio Canvas with Orbiting 3D Motion Graphics */}
      <ProductCanvas
        scrollProgress={scrollProgress}
        activeThemePreset={activeThemePreset}
        glassIntensity={glassIntensity}
        interactiveScreen={interactiveScreen}
      />

      {/* Navigation Header */}
      <Navbar scrolled={scrolled} />

      {/* Storytelling Timeline Sections */}
      <main className="relative z-20">
        <HeroSection
          activeScreen={interactiveScreen}
          onSelectScreen={setInteractiveScreen}
        />
        <ChatSection />
        <SocialSection />
        <ClipsSection />
        <CustomizationSection
          activeThemePreset={activeThemePreset}
          onSelectTheme={setActiveThemePreset}
          glassIntensity={glassIntensity}
          onChangeIntensity={setGlassIntensity}
        />
        <MultiDeviceSection />
        <WebAppSection />
        <ProfileSection />
        <GallerySection />
        <BrandSection />
        <DownloadSection />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Mobile Conversion Sticky Bar */}
      <MobileBottomBar visible={scrolled && scrollProgress < 0.92} />
    </div>
  );
};

export default App;
