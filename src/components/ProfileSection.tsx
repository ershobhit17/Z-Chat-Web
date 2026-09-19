import React from 'react';
import { UserCheck, Shield } from 'lucide-react';

export const ProfileSection: React.FC = () => {
  return (
    <section
      id="scene-profile"
      className="relative min-h-screen flex items-center py-32 px-6 md:px-16 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left Column Storytelling */}
        <div className="md:col-span-6 flex flex-col items-start pointer-events-auto z-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF6600] font-semibold mb-4">
            07 / Digital Identity
          </span>

          <h2 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white mb-6 leading-tight">
            People behind
            <br />
            the conversations.
          </h2>

          <p className="font-sans text-lg sm:text-xl text-[#B5B5B5] max-w-lg mb-10 leading-relaxed">
            Your profile is your digital home. Express your aesthetic through custom banners, showcase your posts, and build your circle with granular privacy controls.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
            <div className="studio-glass p-5">
              <div className="flex items-center gap-2 text-[#7C5CFF] mb-2">
                <UserCheck className="w-4 h-4" />
                <span className="font-mono text-xs uppercase tracking-wider">Follow Controls</span>
              </div>
              <h4 className="font-display font-bold text-sm text-white mb-1">
                Private & Public Circles
              </h4>
              <p className="text-xs text-[#8E8E9A]">
                Accept follow requests selectively or open your profile to the public explorer.
              </p>
            </div>

            <div className="studio-glass p-5">
              <div className="flex items-center gap-2 text-[#FF6600] mb-2">
                <Shield className="w-4 h-4" />
                <span className="font-mono text-xs uppercase tracking-wider">Data Sovereignty</span>
              </div>
              <h4 className="font-display font-bold text-sm text-white mb-1">
                No Ad Tracking
              </h4>
              <p className="text-xs text-[#8E8E9A]">
                Your identity data stays encrypted without cross-site tracking or behavioral auctions.
              </p>
            </div>
          </div>
        </div>

        {/* Right side is intentionally open for the phone profile render */}
        <div className="md:col-span-6 hidden md:block" />
      </div>
    </section>
  );
};
