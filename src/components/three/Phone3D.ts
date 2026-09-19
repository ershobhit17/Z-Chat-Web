import * as THREE from 'three';

export interface PhoneTextureOptions {
  activeScreen: 'chat' | 'social' | 'clips' | 'customization' | 'profile' | 'settings';
  themePreset?: 'midnight_glass' | 'obsidian' | 'arctic_frost';
  glassIntensity?: number;
  waveformPhase?: number;
  typingStep?: number;
  time?: number;
}

export class Phone3D {
  public group: THREE.Group;
  public screenMesh: THREE.Mesh | null = null;
  private screenCanvas: HTMLCanvasElement;
  private screenCtx: CanvasRenderingContext2D | null;
  private screenTexture: THREE.CanvasTexture;
  private cachedImages: Record<string, HTMLImageElement> = {};
  private currentOptions: PhoneTextureOptions = {
    activeScreen: 'chat',
    themePreset: 'midnight_glass',
    glassIntensity: 0.2,
    waveformPhase: 0,
    typingStep: 0,
    time: 0,
  };

  constructor() {
    this.group = new THREE.Group();

    // High-res mobile aspect ratio canvas for ultra-sharp screen rendering
    this.screenCanvas = document.createElement('canvas');
    this.screenCanvas.width = 1080;
    this.screenCanvas.height = 2400;
    this.screenCtx = this.screenCanvas.getContext('2d');

    this.screenTexture = new THREE.CanvasTexture(this.screenCanvas);
    this.screenTexture.minFilter = THREE.LinearFilter;
    this.screenTexture.magFilter = THREE.LinearFilter;
    this.screenTexture.generateMipmaps = false;

    this.preloadAssets();
    this.buildGeometry();
    this.renderScreenTexture();
  }

  private preloadAssets() {
    const assets = {
      logo: '/assets/logo/app_logo.png',
      chatsMain: '/assets/screenshots/chats_main.png',
      settingsMain: '/assets/screenshots/settings_main.png',
      appearanceMain: '/assets/screenshots/appearance_main.png',
      socialMain: '/assets/screenshots/social_main.png',
      appearanceMidnight: '/assets/screenshots/appearance_midnight.png',
      appearanceLiquid: '/assets/screenshots/appearance_liquid_glass.png',
      appearanceArctic: '/assets/screenshots/appearance_arctic.png',
    };

    Object.entries(assets).forEach(([key, src]) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        this.cachedImages[key] = img;
        this.renderScreenTexture();
      };
    });
  }

  private createRoundedRectShape(width: number, height: number, radius: number): THREE.Shape {
    const shape = new THREE.Shape();
    const x = -width / 2;
    const y = -height / 2;
    shape.moveTo(x + radius, y);
    shape.lineTo(x + width - radius, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + radius);
    shape.lineTo(x + width, y + height - radius);
    shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    shape.lineTo(x + radius, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - radius);
    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);
    return shape;
  }

  private buildGeometry() {
    const width = 3.6;
    const height = 7.8;
    const depth = 0.32;
    const cornerRadius = 0.52;

    // Outer Phone Body (Titanium Space Black Frame with Micro Bevel)
    const bodyShape = this.createRoundedRectShape(width, height, cornerRadius);
    const extrudeSettings = {
      depth: depth,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    };

    const bodyGeometry = new THREE.ExtrudeGeometry(bodyShape, extrudeSettings);
    bodyGeometry.center();

    const titaniumFrameMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x141416,
      metalness: 0.95,
      roughness: 0.22,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
      reflectivity: 0.9,
    });

    const bodyMesh = new THREE.Mesh(bodyGeometry, titaniumFrameMaterial);
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    this.group.add(bodyMesh);

    // Frosted Glass Back Plate
    const backShape = this.createRoundedRectShape(width - 0.04, height - 0.04, cornerRadius - 0.02);
    const backGeometry = new THREE.ShapeGeometry(backShape);
    const backMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x09090b,
      metalness: 0.1,
      roughness: 0.45,
      clearcoat: 0.7,
      clearcoatRoughness: 0.2,
    });
    const backMesh = new THREE.Mesh(backGeometry, backMaterial);
    backMesh.position.z = -depth / 2 - 0.062;
    backMesh.rotation.y = Math.PI;
    this.group.add(backMesh);

    // Camera Island Bump
    const cameraIslandWidth = 1.4;
    const cameraIslandHeight = 1.9;
    const cameraIslandRadius = 0.32;
    const cameraShape = this.createRoundedRectShape(cameraIslandWidth, cameraIslandHeight, cameraIslandRadius);
    const cameraExtrude = new THREE.ExtrudeGeometry(cameraShape, {
      depth: 0.08,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    });
    cameraExtrude.center();
    const cameraIslandMesh = new THREE.Mesh(cameraExtrude, titaniumFrameMaterial);
    cameraIslandMesh.position.set(-width / 2 + 1.0, height / 2 - 1.3, -depth / 2 - 0.11);
    this.group.add(cameraIslandMesh);

    // Triple Camera Lenses
    const lensRadius = 0.24;
    const lensGeometry = new THREE.CylinderGeometry(lensRadius, lensRadius, 0.06, 32);
    lensGeometry.rotateX(Math.PI / 2);

    const lensRingMaterial = new THREE.MeshStandardMaterial({
      color: 0x222226,
      metalness: 0.95,
      roughness: 0.15,
    });
    const lensGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x050711,
      metalness: 0.2,
      roughness: 0.05,
      clearcoat: 1.0,
      reflectivity: 0.95,
    });

    const lensPositions = [
      { x: -width / 2 + 0.76, y: height / 2 - 0.95 },
      { x: -width / 2 + 0.76, y: height / 2 - 1.6 },
      { x: -width / 2 + 1.32, y: height / 2 - 1.28 },
    ];

    lensPositions.forEach((pos) => {
      const ring = new THREE.Mesh(lensGeometry, lensRingMaterial);
      ring.position.set(pos.x, pos.y, -depth / 2 - 0.16);
      this.group.add(ring);

      const glassInner = new THREE.Mesh(
        new THREE.CircleGeometry(lensRadius - 0.04, 32),
        lensGlassMaterial
      );
      glassInner.position.set(pos.x, pos.y, -depth / 2 - 0.191);
      glassInner.rotation.y = Math.PI;
      this.group.add(glassInner);
    });

    // Front Screen Plate
    const screenWidth = width - 0.22;
    const screenHeight = height - 0.22;
    const screenRadius = cornerRadius - 0.1;
    const screenShape = this.createRoundedRectShape(screenWidth, screenHeight, screenRadius);
    const screenGeometry = new THREE.ShapeGeometry(screenShape);

    // Texture UV mapping fix for custom shape
    const posAttribute = screenGeometry.getAttribute('position');
    const uvs = [];
    for (let i = 0; i < posAttribute.count; i++) {
      const u = (posAttribute.getX(i) + screenWidth / 2) / screenWidth;
      const v = (posAttribute.getY(i) + screenHeight / 2) / screenHeight;
      uvs.push(u, v);
    }
    screenGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

    const screenMaterial = new THREE.MeshBasicMaterial({
      map: this.screenTexture,
      toneMapped: false,
    });

    this.screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
    this.screenMesh.position.z = depth / 2 + 0.062;
    this.group.add(this.screenMesh);

    // Front Protective Glass Layer with subtle real specular sheen
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.08,
      transmission: 0.92,
      thickness: 0.04,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      ior: 1.5,
      transparent: true,
      opacity: 0.35,
    });
    const frontGlassMesh = new THREE.Mesh(screenGeometry, glassMaterial);
    frontGlassMesh.position.z = depth / 2 + 0.065;
    this.group.add(frontGlassMesh);

    // Punch-hole selfie camera
    const punchHole = new THREE.Mesh(
      new THREE.CircleGeometry(0.09, 24),
      new THREE.MeshBasicMaterial({ color: 0x000000 })
    );
    punchHole.position.set(0, height / 2 - 0.45, depth / 2 + 0.066);
    this.group.add(punchHole);
  }

  public updateOptions(newOptions: Partial<PhoneTextureOptions>) {
    this.currentOptions = { ...this.currentOptions, ...newOptions };
    this.renderScreenTexture();
  }

  /**
   * High-Fidelity 2D Screen Render matching the REAL Z Chat application
   */
  public renderScreenTexture() {
    const ctx = this.screenCtx;
    if (!ctx) return;

    const w = this.screenCanvas.width;
    const h = this.screenCanvas.height;
    const opts = this.currentOptions;
    const time = opts.time || 0;

    // Base Screen Clear
    ctx.fillStyle = '#060608';
    ctx.fillRect(0, 0, w, h);

    let isCustomProcedural = false;

    // Dispatch based on active screen scene
    switch (opts.activeScreen) {
      case 'chat':
        isCustomProcedural = this.renderChatScreen(ctx, w, h, opts);
        break;
      case 'social':
        isCustomProcedural = this.renderSocialScreen(ctx, w, h, opts);
        break;
      case 'clips':
        isCustomProcedural = this.renderClipsScreen(ctx, w, h, opts);
        break;
      case 'customization':
        isCustomProcedural = this.renderCustomizationScreen(ctx, w, h, opts);
        break;
      case 'settings':
      case 'profile':
        isCustomProcedural = this.renderSettingsScreen(ctx, w, h, opts);
        break;
      default:
        isCustomProcedural = this.renderChatScreen(ctx, w, h, opts);
    }

    if (isCustomProcedural) {
      this.renderStatusBar(ctx, w);
      this.renderHomeIndicator(ctx, w, h);
    }

    // Dynamic Sweeping Glass Glare / Sheen effect across the screen (continuous motion)
    this.renderGlassSheen(ctx, w, h, time);

    this.screenTexture.needsUpdate = true;
  }

  private renderGlassSheen(ctx: CanvasRenderingContext2D, w: number, h: number, time: number) {
    const cycle = (time * 0.35) % 3.0; // every 3s
    if (cycle < 1.2) {
      const progress = cycle / 1.2;
      const xPos = progress * (w + 1200) - 600;
      
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const sheenGrad = ctx.createLinearGradient(xPos, 0, xPos + 500, h);
      sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      sheenGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)');
      sheenGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = sheenGrad;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    }
  }

  private renderStatusBar(ctx: CanvasRenderingContext2D, w: number) {
    ctx.save();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '600 36px "Inter", sans-serif';
    ctx.fillText('2:23', 90, 115);

    // Network & Battery icons
    ctx.font = '500 30px "Inter", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('5G+  75%', w - 90, 115);
    ctx.restore();
  }

  private renderHomeIndicator(ctx: CanvasRenderingContext2D, w: number, h: number) {
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.beginPath();
    ctx.roundRect(w / 2 - 180, h - 35, 360, 10, 5);
    ctx.fill();
    ctx.restore();
  }

  private renderChatScreen(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    opts: PhoneTextureOptions
  ): boolean {
    const img = this.cachedImages.chatsMain;
    const time = opts.time || 0;

    if (img && img.complete) {
      // Draw authentic Z Chat screenshot
      ctx.drawImage(img, 0, 0, w, h);

      // 3D Motion Graphics Overlay 1: Dynamic Island Audio Equalizer Pulse
      ctx.save();
      const wavePhase = (opts.waveformPhase || 0) * 1.5;
      const barCount = 7;
      const eqStartX = w / 2 + 10;
      const eqY = 82;
      ctx.fillStyle = '#EC4899';
      for (let i = 0; i < barCount; i++) {
        const barH = 8 + Math.abs(Math.sin(wavePhase + i * 0.8)) * 24;
        ctx.beginPath();
        ctx.roundRect(eqStartX + i * 10, eqY - barH / 2, 5, barH, 2.5);
        ctx.fill();
      }

      // 3D Motion Graphics Overlay 2: Floating Action Button (Pink Pencil) Pulsing Radiance
      const fabCenterX = w * 0.90;
      const fabCenterY = h * 0.875;
      const pulse = 1 + Math.sin(time * 3) * 0.15;
      const pulseAlpha = 0.25 + Math.sin(time * 3) * 0.2;

      ctx.beginPath();
      ctx.arc(fabCenterX, fabCenterY, 80 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(236, 72, 153, ${Math.max(0, pulseAlpha)})`;
      ctx.fill();

      // 3D Motion Graphics Overlay 3: Active Tab ("Chats (3)") Shimmer Border
      const tabPulseAlpha = 0.4 + Math.sin(time * 2.5) * 0.3;
      ctx.strokeStyle = `rgba(255, 102, 0, ${tabPulseAlpha})`;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(46, 275, w * 0.45, 95, 30);
      ctx.stroke();

      ctx.restore();
      return false; // already has real status bar
    }

    // Procedural Fallback if image still loading
    this.renderProceduralChatScreen(ctx, w, h, opts);
    return true;
  }

  private renderCustomizationScreen(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    opts: PhoneTextureOptions
  ): boolean {
    const img =
      opts.themePreset === 'arctic_frost' && this.cachedImages.appearanceArctic
        ? this.cachedImages.appearanceArctic
        : opts.themePreset === 'obsidian' && this.cachedImages.appearanceLiquid
        ? this.cachedImages.appearanceLiquid
        : this.cachedImages.appearanceMain || this.cachedImages.appearanceMidnight;

    const time = opts.time || 0;

    if (img && img.complete) {
      ctx.drawImage(img, 0, 0, w, h);

      // 3D Motion Graphics Overlay: Live Liquid Glass Refractive Shimmer on preview area
      ctx.save();
      const previewY = h * 0.22;
      const previewH = h * 0.22;
      const shimmerX = (Math.sin(time * 1.8) * 0.5 + 0.5) * w;
      
      const grad = ctx.createRadialGradient(shimmerX, previewY + previewH / 2, 20, shimmerX, previewY + previewH / 2, 380);
      grad.addColorStop(0, 'rgba(236, 72, 153, 0.22)');
      grad.addColorStop(0.5, 'rgba(124, 92, 255, 0.12)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(50, previewY, w - 100, previewH);

      // Live pulse on active theme preset chip
      const presetPulse = 0.5 + Math.sin(time * 3) * 0.3;
      ctx.strokeStyle = `rgba(236, 72, 153, ${presetPulse})`;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.roundRect(45, h * 0.555, 380, 110, 55);
      ctx.stroke();

      ctx.restore();
      return false;
    }

    ctx.fillStyle = '#08080C';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 54px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Appearance Studio', 80, 230);
    return true;
  }

  private renderSocialScreen(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    opts: PhoneTextureOptions
  ): boolean {
    const img = this.cachedImages.socialMain || this.cachedImages.socialFeed;
    const time = opts.time || 0;

    if (img && img.complete) {
      ctx.drawImage(img, 0, 0, w, h);

      // 3D Motion Graphics Overlay: Pulsing Play Button Glow on Video Thumbnails
      ctx.save();
      const playPulse = 1 + Math.sin(time * 3.5) * 0.12;
      const playCenterX = w * 0.5;
      const playCenterY = h * 0.355;

      ctx.beginPath();
      ctx.arc(playCenterX, playCenterY, 65 * playPulse, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(236, 72, 153, 0.35)';
      ctx.fill();

      // Pulsing Post button (bottom right pink pill)
      const postPulseAlpha = 0.3 + Math.sin(time * 2.8) * 0.25;
      ctx.strokeStyle = `rgba(255, 255, 255, ${postPulseAlpha})`;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(w * 0.74, h * 0.84, w * 0.22, 120, 36);
      ctx.stroke();

      ctx.restore();
      return false;
    }

    ctx.fillStyle = '#070709';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 64px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Z Social', 80, 230);
    return true;
  }

  private renderSettingsScreen(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    opts: PhoneTextureOptions
  ): boolean {
    const img = this.cachedImages.settingsMain;
    const time = opts.time || 0;

    if (img && img.complete) {
      ctx.drawImage(img, 0, 0, w, h);

      // 3D Motion Graphics Overlay: Shimmer on Appearance Studio USP Banner
      ctx.save();
      const uspY = h * 0.25;
      const uspX = (Math.sin(time * 1.5) * 0.5 + 0.5) * (w - 100);
      const uspGrad = ctx.createLinearGradient(uspX, uspY, uspX + 300, uspY + 180);
      uspGrad.addColorStop(0, 'rgba(236, 72, 153, 0)');
      uspGrad.addColorStop(0.5, 'rgba(236, 72, 153, 0.25)');
      uspGrad.addColorStop(1, 'rgba(236, 72, 153, 0)');
      ctx.fillStyle = uspGrad;
      ctx.beginPath();
      ctx.roundRect(40, uspY, w - 80, 180, 42);
      ctx.fill();

      // Glowing Notification Toggle Switches (Living state)
      const switchPulse = 0.6 + Math.sin(time * 2) * 0.4;
      ctx.strokeStyle = `rgba(236, 72, 153, ${switchPulse})`;
      ctx.lineWidth = 3;
      for (let i = 0; i < 6; i++) {
        const switchY = h * 0.41 + i * (h * 0.082);
        ctx.beginPath();
        ctx.roundRect(w * 0.78, switchY, 130, 75, 40);
        ctx.stroke();
      }

      ctx.restore();
      return false;
    }

    return this.renderProceduralProfileScreen(ctx, w, h);
  }

  private renderClipsScreen(ctx: CanvasRenderingContext2D, w: number, h: number, opts: PhoneTextureOptions) {
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, '#0F172A');
    gradient.addColorStop(0.5, '#1E1B4B');
    gradient.addColorStop(1, '#050508');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Floating UI Elements
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 52px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Z Clips', 80, 220);

    // Creator Info
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 44px "Inter", sans-serif';
    ctx.fillText('@er_shobhit_', 80, h - 340);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '400 36px "Inter", sans-serif';
    ctx.fillText('Exploring seamless 3D micro-animations in Z Chat 🚀', 80, h - 270);

    // Side Action Icons (Like, Comment, Share) with motion pulse
    const time = opts.time || 0;
    const actions = ['❤️ 2.4k', '💬 184', '↗️ Share'];
    actions.forEach((act, idx) => {
      const pulseScale = idx === 0 ? 1 + Math.sin(time * 4) * 0.08 : 1;
      ctx.save();
      ctx.fillStyle = 'rgba(20, 20, 28, 0.7)';
      ctx.beginPath();
      ctx.arc(w - 110, h - 600 + idx * 150, 55 * pulseScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = idx === 0 ? 'rgba(236, 72, 153, 0.6)' : 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '500 28px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(act, w - 110, h - 590 + idx * 150);
      ctx.restore();
    });
    ctx.textAlign = 'left';
    return true;
  }

  private renderProceduralChatScreen(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    opts: PhoneTextureOptions
  ) {
    const gradient = ctx.createRadialGradient(w * 0.7, h * 0.35, 50, w * 0.5, h * 0.4, 900);
    gradient.addColorStop(0, 'rgba(124, 92, 255, 0.18)');
    gradient.addColorStop(0.5, 'rgba(15, 15, 25, 0.5)');
    gradient.addColorStop(1, '#08080C');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Top Navigation Header
    ctx.fillStyle = 'rgba(14, 14, 20, 0.85)';
    ctx.fillRect(0, 0, w, 280);

    // Top Bar Details
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 48px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Alex Rivers', 220, 210);

    ctx.fillStyle = '#10B981';
    ctx.beginPath();
    ctx.arc(195, 202, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.font = '500 32px "Inter", sans-serif';
    ctx.fillText('Online • Appearance Studio active', 220, 255);

    // Avatar
    ctx.fillStyle = '#7C5CFF';
    ctx.beginPath();
    ctx.arc(120, 215, 55, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 40px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('AL', 120, 230);
    ctx.textAlign = 'left';

    // Message 1 (Received)
    this.drawBubble(
      ctx,
      80,
      380,
      820,
      280,
      'rgba(30, 30, 42, 0.75)',
      '#FFFFFF',
      'Hey! Look at this, it updates instantly in real-time. 🔥',
      '10:45 AM',
      false,
      '🔥 1'
    );

    // Message 2 (Sent)
    const accent = opts.themePreset === 'obsidian' ? '#EA580C' : opts.themePreset === 'arctic_frost' ? '#0A84FF' : '#7C5CFF';
    this.drawBubble(
      ctx,
      180,
      720,
      820,
      310,
      accent,
      '#FFFFFF',
      'Clean, minimal, and fully personalized. Love this liquid glass vibe! ✨',
      '10:47 AM',
      true,
      undefined,
      true
    );

    // Message 3: Voice Note Message
    this.drawVoiceMessage(ctx, 80, 1100, 780, 180, opts.waveformPhase || 0);

    // Bottom Chat Input Bar
    this.drawChatInputBar(ctx, w, h);
  }

  private renderProceduralProfileScreen(ctx: CanvasRenderingContext2D, w: number, h: number): boolean {
    ctx.fillStyle = '#08080C';
    ctx.fillRect(0, 0, w, h);

    const bannerGrad = ctx.createLinearGradient(0, 0, w, 400);
    bannerGrad.addColorStop(0, '#311042');
    bannerGrad.addColorStop(1, '#0C0A1D');
    ctx.fillStyle = bannerGrad;
    ctx.fillRect(0, 0, w, 440);

    ctx.fillStyle = '#181822';
    ctx.beginPath();
    ctx.arc(w / 2, 440, 130, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#08080C';
    ctx.lineWidth = 14;
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 54px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Shobhit Jain', w / 2, 640);

    ctx.fillStyle = '#FF6600';
    ctx.font = '500 36px "Space Grotesk", monospace';
    ctx.fillText('@er_shobhit_', w / 2, 700);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.font = '400 34px "Inter", sans-serif';
    ctx.fillText('Building the future of digital expression. Z Chat.', w / 2, 770);

    ctx.textAlign = 'left';
    return true;
  }

  private drawBubble(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    bgColor: string,
    textColor: string,
    text: string,
    time: string,
    _isSent?: boolean,
    reaction?: string,
    hasDoubleCheck?: boolean
  ) {
    ctx.save();
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 42);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle = textColor;
    ctx.font = '500 42px "Inter", sans-serif';
    this.wrapText(ctx, text, x + 48, y + 90, w - 96, 56);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.font = '400 30px "Inter", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(time, x + w - 50, y + h - 35);

    if (hasDoubleCheck) {
      ctx.fillStyle = '#60A5FA';
      ctx.fillText('✓✓', x + w - 190, y + h - 35);
    }

    if (reaction) {
      ctx.fillStyle = 'rgba(20, 20, 28, 0.95)';
      ctx.beginPath();
      ctx.roundRect(x + 40, y + h - 25, 130, 60, 30);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.stroke();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '500 32px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(reaction, x + 105, y + h + 18);
    }

    ctx.restore();
  }

  private drawVoiceMessage(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    phase: number
  ) {
    ctx.save();
    ctx.fillStyle = 'rgba(30, 30, 42, 0.8)';
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 42);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle = '#7C5CFF';
    ctx.beginPath();
    ctx.arc(x + 95, y + h / 2, 48, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.moveTo(x + 88, y + h / 2 - 20);
    ctx.lineTo(x + 112, y + h / 2);
    ctx.lineTo(x + 88, y + h / 2 + 20);
    ctx.closePath();
    ctx.fill();

    const barCount = 26;
    const startX = x + 180;
    const spacing = 18;
    ctx.fillStyle = '#987DFF';
    for (let i = 0; i < barCount; i++) {
      const heightVal = 25 + Math.sin(i * 0.45 + phase) * 25 + Math.cos(i * 0.9) * 20;
      const barH = Math.max(12, heightVal);
      ctx.beginPath();
      ctx.roundRect(startX + i * spacing, y + h / 2 - barH / 2, 8, barH, 4);
      ctx.fill();
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '500 30px "Inter", sans-serif';
    ctx.fillText('0:24', x + w - 110, y + h / 2 + 10);
    ctx.restore();
  }

  private drawChatInputBar(ctx: CanvasRenderingContext2D, w: number, h: number) {
    ctx.save();
    ctx.fillStyle = 'rgba(12, 12, 16, 0.95)';
    ctx.fillRect(0, h - 220, w, 220);

    ctx.fillStyle = 'rgba(30, 30, 38, 0.85)';
    ctx.beginPath();
    ctx.roundRect(70, h - 170, w - 240, 110, 55);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '400 38px "Inter", sans-serif';
    ctx.fillText('Type a message...', 130, h - 100);

    ctx.fillStyle = '#FF6600';
    ctx.beginPath();
    ctx.arc(w - 100, h - 115, 52, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#000000';
    ctx.font = '700 42px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('↑', w - 100, h - 100);
    ctx.restore();
  }

  private wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) {
    const words = text.split(' ');
    let line = '';

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
  }
}
