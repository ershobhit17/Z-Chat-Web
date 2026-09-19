import * as THREE from 'three';

export class Laptop3D {
  public group: THREE.Group;
  public lidGroup: THREE.Group;
  private screenCanvas: HTMLCanvasElement;
  private screenCtx: CanvasRenderingContext2D | null;
  private screenTexture: THREE.CanvasTexture;

  constructor() {
    this.group = new THREE.Group();
    this.lidGroup = new THREE.Group();

    // 2560x1600 widescreen resolution for ultra-crisp web app view
    this.screenCanvas = document.createElement('canvas');
    this.screenCanvas.width = 2560;
    this.screenCanvas.height = 1600;
    this.screenCtx = this.screenCanvas.getContext('2d');

    this.screenTexture = new THREE.CanvasTexture(this.screenCanvas);
    this.screenTexture.minFilter = THREE.LinearFilter;
    this.screenTexture.magFilter = THREE.LinearFilter;
    this.screenTexture.generateMipmaps = false;

    this.buildGeometry();
    this.renderWebScreen();
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
    const baseW = 7.6;
    const baseD = 5.2;
    const baseH = 0.18;
    const radius = 0.25;

    const aluminumMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x18181c,
      metalness: 0.92,
      roughness: 0.28,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
      reflectivity: 0.85,
    });

    const darkPlasticMaterial = new THREE.MeshStandardMaterial({
      color: 0x0c0c0e,
      roughness: 0.6,
      metalness: 0.1,
    });

    // 1. BASE DECK
    const baseShape = this.createRoundedRectShape(baseW, baseD, radius);
    const baseExtrude = new THREE.ExtrudeGeometry(baseShape, {
      depth: baseH,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    });
    baseExtrude.center();
    const baseMesh = new THREE.Mesh(baseExtrude, aluminumMaterial);
    baseMesh.rotation.x = Math.PI / 2;
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    this.group.add(baseMesh);

    // Keyboard well recess
    const kbW = baseW * 0.76;
    const kbD = baseD * 0.44;
    const kbShape = this.createRoundedRectShape(kbW, kbD, 0.08);
    const kbMesh = new THREE.Mesh(new THREE.ShapeGeometry(kbShape), darkPlasticMaterial);
    kbMesh.rotation.x = -Math.PI / 2;
    kbMesh.position.set(0, baseH / 2 + 0.041, -baseD * 0.14);
    this.group.add(kbMesh);

    // Trackpad
    const padW = baseW * 0.32;
    const padD = baseD * 0.28;
    const padShape = this.createRoundedRectShape(padW, padD, 0.06);
    const padMesh = new THREE.Mesh(
      new THREE.ShapeGeometry(padShape),
      new THREE.MeshStandardMaterial({ color: 0x222228, roughness: 0.3, metalness: 0.4 })
    );
    padMesh.rotation.x = -Math.PI / 2;
    padMesh.position.set(0, baseH / 2 + 0.041, baseD * 0.28);
    this.group.add(padMesh);

    // 2. DISPLAY HINGE
    const hingeGeo = new THREE.CylinderGeometry(0.08, 0.08, baseW * 0.4, 16);
    hingeGeo.rotateZ(Math.PI / 2);
    const hingeMesh = new THREE.Mesh(hingeGeo, aluminumMaterial);
    hingeMesh.position.set(0, baseH / 2 + 0.02, -baseD / 2);
    this.group.add(hingeMesh);

    // 3. LID / DISPLAY
    this.lidGroup.position.set(0, baseH / 2 + 0.04, -baseD / 2);
    // Angled screen: 105 degrees open for optimal viewing
    this.lidGroup.rotation.x = -Math.PI * 0.58;

    const lidShape = this.createRoundedRectShape(baseW, baseD, radius);
    const lidExtrude = new THREE.ExtrudeGeometry(lidShape, {
      depth: 0.1,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    });
    lidExtrude.center();
    const lidShell = new THREE.Mesh(lidExtrude, aluminumMaterial);
    lidShell.position.set(0, baseD / 2, -0.05);
    lidShell.castShadow = true;
    this.lidGroup.add(lidShell);

    // Screen Display Mesh
    const screenW = baseW - 0.5;
    const screenH = baseD - 0.5;
    const screenGeo = new THREE.PlaneGeometry(screenW, screenH);
    const screenMat = new THREE.MeshBasicMaterial({
      map: this.screenTexture,
      toneMapped: false,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, baseD / 2, 0.002);
    this.lidGroup.add(screenMesh);

    // Screen Glass Layer with realistic reflectivity
    const screenGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.95,
      transparent: true,
      opacity: 0.35,
    });
    const screenGlass = new THREE.Mesh(screenGeo, screenGlassMat);
    screenGlass.position.set(0, baseD / 2, 0.005);
    this.lidGroup.add(screenGlass);

    this.group.add(this.lidGroup);
  }

  public renderWebScreen() {
    const ctx = this.screenCtx;
    if (!ctx) return;

    const w = this.screenCanvas.width;
    const h = this.screenCanvas.height;

    // Background Canvas
    ctx.fillStyle = '#070709';
    ctx.fillRect(0, 0, w, h);

    // Sidebar: 680px width
    const sbW = 680;
    ctx.fillStyle = '#0C0C10';
    ctx.fillRect(0, 0, sbW, h);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(sbW, 0);
    ctx.lineTo(sbW, h);
    ctx.stroke();

    // Sidebar Top Bar
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 48px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Z Chat Web', 120, 110);

    // Logo Icon
    ctx.fillStyle = '#FF6600';
    ctx.beginPath();
    ctx.roundRect(40, 60, 60, 60, 14);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 40px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Z', 70, 105);
    ctx.textAlign = 'left';

    // Search Bar
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.roundRect(40, 150, sbW - 80, 75, 18);
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '400 32px "Inter", sans-serif';
    ctx.fillText('Search conversations...', 80, 198);

    // Conversation List Items
    const chats = [
      { name: 'Alex Rivers', msg: 'Hey! Check the new liquid glass theme...', time: '10:48 AM', active: true, unread: 0 },
      { name: 'Z Studio Team', msg: 'Production build ready for release 🚀', time: '10:15 AM', active: false, unread: 2 },
      { name: 'Sarah Chen', msg: 'Audio voice notes sound crystal clear', time: '09:42 AM', active: false, unread: 0 },
      { name: 'Marcus Vance', msg: 'Sent an attachment', time: 'Yesterday', active: false, unread: 0 },
      { name: 'Elena Rostova', msg: 'Let’s sync this evening', time: 'Sep 16', active: false, unread: 0 },
    ];

    chats.forEach((c, idx) => {
      const cy = 260 + idx * 135;
      if (c.active) {
        ctx.fillStyle = 'rgba(124, 92, 255, 0.12)';
        ctx.beginPath();
        ctx.roundRect(24, cy, sbW - 48, 120, 20);
        ctx.fill();
        ctx.strokeStyle = 'rgba(124, 92, 255, 0.3)';
        ctx.stroke();
      }

      // Avatar
      ctx.fillStyle = c.active ? '#7C5CFF' : '#22222E';
      ctx.beginPath();
      ctx.arc(85, cy + 60, 42, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '600 32px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(c.name.substring(0, 2).toUpperCase(), 85, cy + 72);
      ctx.textAlign = 'left';

      // Name & preview
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '600 36px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(c.name, 150, cy + 50);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.font = '400 28px "Inter", sans-serif';
      ctx.fillText(c.msg, 150, cy + 92);

      // Time
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '400 24px "Inter", sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(c.time, sbW - 50, cy + 50);

      if (c.unread > 0) {
        ctx.fillStyle = '#FF6600';
        ctx.beginPath();
        ctx.arc(sbW - 65, cy + 85, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '700 22px "Inter", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(c.unread.toString(), sbW - 65, cy + 92);
      }
      ctx.textAlign = 'left';
    });

    // Active Chat Pane (Main Body)
    const cw = w - sbW;
    const cx = sbW;

    // Chat Header
    ctx.fillStyle = 'rgba(15, 15, 20, 0.9)';
    ctx.fillRect(cx, 0, cw, 130);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.moveTo(cx, 130);
    ctx.lineTo(w, 130);
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 42px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Alex Rivers', cx + 60, 75);

    ctx.fillStyle = '#10B981';
    ctx.beginPath();
    ctx.arc(cx + 42, 65, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '400 28px "Inter", sans-serif';
    ctx.fillText('Online • Syncing with mobile in real-time', cx + 60, 110);

    // Messages in Main Chat
    // 1. Bubble from Alex
    this.drawDesktopBubble(
      ctx,
      cx + 60,
      220,
      760,
      140,
      'rgba(30, 30, 42, 0.7)',
      '#FFFFFF',
      'Everything syncs instantly between Android and Web.',
      '10:46 AM'
    );

    // 2. Sent bubble
    this.drawDesktopBubble(
      ctx,
      cx + cw - 880,
      400,
      820,
      160,
      '#7C5CFF',
      '#FFFFFF',
      'Seamless multi-device connectivity without missing a beat. ✨',
      '10:48 AM',
      true
    );

    // Bottom Web Input Bar
    ctx.fillStyle = 'rgba(14, 14, 18, 0.95)';
    ctx.fillRect(cx, h - 140, cw, 140);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.moveTo(cx, h - 140);
    ctx.lineTo(w, h - 140);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.beginPath();
    ctx.roundRect(cx + 40, h - 115, cw - 180, 85, 20);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '400 32px "Inter", sans-serif';
    ctx.fillText('Write a message to Alex...', cx + 80, h - 62);

    ctx.fillStyle = '#FF6600';
    ctx.beginPath();
    ctx.roundRect(w - 110, h - 115, 75, 85, 20);
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.font = '700 36px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('↑', w - 72, h - 60);
    ctx.textAlign = 'left';

    this.screenTexture.needsUpdate = true;
  }

  private drawDesktopBubble(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    bg: string,
    color: string,
    text: string,
    time: string,
    doubleCheck?: boolean
  ) {
    ctx.save();
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 28);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.font = '500 32px "Inter", sans-serif';
    ctx.fillText(text, x + 36, y + 60);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '400 24px "Inter", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(time, x + w - 30, y + h - 25);

    if (doubleCheck) {
      ctx.fillStyle = '#60A5FA';
      ctx.fillText('✓✓', x + w - 145, y + h - 25);
    }
    ctx.restore();
  }
}
