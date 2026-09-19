/**
 * Z CHAT - Central Product Configuration
 * 
 * All download links, web links, social links, and product meta-data
 * are declared here for single-source-of-truth access.
 */

export interface ProductConfig {
  appName: string;
  tagline: string;
  subheadline: string;
  androidDownloadUrl: string;
  webAppUrl: string;
  apkSizeMb: string;
  version: string;
  themePresets: {
    id: string;
    name: string;
    color: string;
    desc: string;
  }[];
}

export const APP_CONFIG: ProductConfig = {
  appName: "Z Chat",
  tagline: "Messaging,\nreimagined.",
  subheadline: "Chat. Share. Discover.",
  
  // Real Local & Configurable URLs
  // The actual 62.4MB Flutter Release APK is located directly in public/downloads/z-chat.apk
  androidDownloadUrl: "/downloads/z-chat.apk",
  
  // The authentic Flutter Web production build is located in public/app/
  webAppUrl: "/app/",
  
  apkSizeMb: "59.9 MB",
  version: "v1.0.2",
  
  themePresets: [
    {
      id: "midnight_glass",
      name: "Midnight Glass",
      color: "#7C5CFF",
      desc: "Deep nebula mesh with frosted glass bubbles"
    },
    {
      id: "obsidian",
      name: "Obsidian",
      color: "#F97316",
      desc: "Pure OLED absolute black with vibrant titanium orange"
    },
    {
      id: "arctic_frost",
      name: "Arctic Frost",
      color: "#0A84FF",
      desc: "Crystalline blue accents with crisp transparency"
    }
  ]
};
