import React, { useEffect, useState } from 'react';
import { Download, ArrowRight, QrCode, Smartphone, Globe, CheckCircle2 } from 'lucide-react';
import QRCode from 'qrcode';
import { APP_CONFIG } from '../lib/config';

export const DownloadSection: React.FC = () => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    // Generate real QR Code for downloading the Android APK directly
    // Construct full absolute URL for external devices on the same network or hosted domain
    const downloadTarget = window.location.origin + APP_CONFIG.androidDownloadUrl;
    QRCode.toDataURL(downloadTarget, {
      width: 280,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR generation error:', err));
  }, []);

  return (
    <section
      id="download"
      className="relative min-h-screen flex flex-col justify-center py-32 px-6 md:px-12 pointer-events-auto bg-gradient-to-b from-transparent via-[#07070a]/60 to-[#040406]"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center text-center mb-16">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF6600] font-semibold mb-3">
          Get Started
        </span>

        <h2 className="font-display font-extrabold text-5xl sm:text-7xl text-white tracking-tight mb-4">
          Ready to chat differently?
        </h2>

        <p className="font-sans text-xl sm:text-2xl text-[#B5B5B5] max-w-xl">
          Choose how you connect.
        </p>
      </div>

      {/* Two Real Access Options (Android Dominant & Web App) */}
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        {/* Option 1: Android App (Visually Dominant) */}
        <div className="md:col-span-7 rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-[#16161c]/90 to-[#0c0c10]/95 border-2 border-[#FF6600]/40 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6600]/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#FF6600]/15 border border-[#FF6600]/30 text-[#FF6600]">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl text-white">
                    Z Chat for Android
                  </h3>
                  <span className="text-xs font-mono text-[#8E8E9A]">
                    Official Release • {APP_CONFIG.version}
                  </span>
                </div>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FF6600] text-black">
                Primary
              </span>
            </div>

            <p className="text-[#B5B5B5] text-base mb-8 leading-relaxed">
              Full native performance, haptic message feedback, Appearance Studio shader engine, spatial voice notes, and instant background notifications.
            </p>

            <ul className="space-y-3 mb-10 text-sm text-[#CCCCCC]">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#FF6600]" />
                <span>Compatible with Android 8.0+ (ARM64 & x86_64)</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#FF6600]" />
                <span>Direct production APK release ({APP_CONFIG.apkSizeMb})</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#FF6600]" />
                <span>End-to-end encrypted realtime synchronization</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 pt-6 border-t border-white/10">
            <a
              href={APP_CONFIG.androidDownloadUrl}
              download="z-chat.apk"
              className="btn-primary text-base py-4 px-8 justify-center flex-1"
              id="final-download-apk-btn"
            >
              <Download className="w-5 h-5" />
              <span>Download Z Chat</span>
              <span className="text-xs font-normal opacity-80">({APP_CONFIG.apkSizeMb})</span>
            </a>

            {/* Desktop QR Code */}
            {qrDataUrl && (
              <div className="hidden lg:flex items-center gap-3 bg-black/60 p-2.5 rounded-2xl border border-white/10">
                <img
                  src={qrDataUrl}
                  alt="Scan to download Z Chat APK"
                  className="w-16 h-16 rounded-lg object-contain bg-white p-1"
                />
                <div className="flex flex-col text-left pr-2">
                  <span className="text-[11px] font-bold text-white flex items-center gap-1">
                    <QrCode className="w-3 h-3 text-[#FF6600]" />
                    Scan Phone
                  </span>
                  <span className="text-[10px] text-[#8E8E9A]">Direct install</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Option 2: Web App (Minimal, Accessible) */}
        <div className="md:col-span-5 rounded-3xl p-8 sm:p-10 bg-[#0e0e12]/80 border border-white/10 shadow-xl backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-[#0A84FF]">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl text-white">
                  Z Chat Web
                </h3>
                <span className="text-xs font-mono text-[#8E8E9A]">
                  Modern Desktop Browsers
                </span>
              </div>
            </div>

            <p className="text-[#B5B5B5] text-base mb-8 leading-relaxed">
              No installation needed. Run the full Z Chat application immediately inside your browser on Windows, macOS, or Linux.
            </p>

            <ul className="space-y-3 mb-10 text-sm text-[#CCCCCC]">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#0A84FF]" />
                <span>Instant loading via CanvasKit WebAssembly</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#0A84FF]" />
                <span>Seamless real-time message sync with phone</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#0A84FF]" />
                <span>Keyboard shortcuts & multi-column navigation</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-white/10">
            <a
              href={APP_CONFIG.webAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-base py-4 px-8 w-full justify-center"
              id="final-open-web-btn"
            >
              <span>Open Z Chat Web</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
