import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Phone3D } from './Phone3D';
import { Laptop3D } from './Laptop3D';
import { ZBrand3D } from './ZBrand3D';

interface ProductCanvasProps {
  scrollProgress: number; // 0.0 to 1.0
  activeThemePreset: 'midnight_glass' | 'obsidian' | 'arctic_frost';
  glassIntensity: number;
  interactiveScreen?: 'chat' | 'social' | 'customization' | 'settings';
}

export const ProductCanvas: React.FC<ProductCanvasProps> = ({
  scrollProgress,
  activeThemePreset,
  glassIntensity,
  interactiveScreen = 'chat',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  const phoneRef = useRef<Phone3D | null>(null);
  const laptopRef = useRef<Laptop3D | null>(null);
  const zBrandRef = useRef<ZBrand3D | null>(null);
  const sweepLightRef = useRef<THREE.SpotLight | null>(null);
  const rimLight1Ref = useRef<THREE.DirectionalLight | null>(null);
  const rimLight2Ref = useRef<THREE.DirectionalLight | null>(null);

  // Subtle Luxury Stardust Field
  const particleFieldRef = useRef<THREE.Points | null>(null);

  // Mouse tilt and drag smoothing
  const mouseRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });
  const dragRotRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });
  const flipAngleRef = useRef(0);
  const scrollSmoothRef = useRef(0);
  const animFrameRef = useRef<number>(0);
  const interactiveScreenRef = useRef(interactiveScreen);

  // Trigger 3D Spin Flip animation when interactive screen changes
  useEffect(() => {
    if (interactiveScreenRef.current !== interactiveScreen) {
      interactiveScreenRef.current = interactiveScreen;
      flipAngleRef.current = Math.PI * 2; // Full 360 degree spin
    }
  }, [interactiveScreen]);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040405, 0.035);
    sceneRef.current = scene;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 9.8);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    containerRef.current.appendChild(renderer.domElement);

    // 4. Ultra-Premium Luxury Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x14141c, 1.6);
    scene.add(ambientLight);

    // Key Light (Crisp studio specular)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 8, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Left Rim Light (Refined Warm Amber/Champagne Titanium Highlight)
    const rimLight1 = new THREE.DirectionalLight(0xff8833, 2.0);
    rimLight1.position.set(-8, 3, -2);
    scene.add(rimLight1);
    rimLight1Ref.current = rimLight1;

    // Right Rim Light (Subtle Cool Platinum Edge)
    const rimLight2 = new THREE.DirectionalLight(0x7799cc, 1.4);
    rimLight2.position.set(7, -2, -3);
    scene.add(rimLight2);
    rimLight2Ref.current = rimLight2;

    // Dynamic Sweeping Spotlight
    const sweepLight = new THREE.SpotLight(0xffffff, 0, 25, Math.PI / 5, 0.6, 1.2);
    sweepLight.position.set(0, 5, 8);
    scene.add(sweepLight);
    sweepLightRef.current = sweepLight;

    // Soft Studio Ground Shadow Receiver
    const shadowGeo = new THREE.PlaneGeometry(30, 30);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.4 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -3.8;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // ========================================================
    // 5. Subtle Luxury Micro-Stardust (Clean & Non-distracting)
    // ========================================================
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 26;
      positions[i + 1] = (Math.random() - 0.5) * 24;
      positions[i + 2] = (Math.random() - 0.5) * 16 - 2;

      // Soft platinum and amber micro-glow
      const isWarm = Math.random() > 0.6;
      colors[i] = isWarm ? 1.0 : 0.8;
      colors[i + 1] = isWarm ? 0.7 : 0.85;
      colors[i + 2] = isWarm ? 0.4 : 1.0;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.028,
      vertexColors: true,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
    });

    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);
    particleFieldRef.current = particlePoints;

    // 6. Add Core 3D Products
    const phone = new Phone3D();
    scene.add(phone.group);
    phoneRef.current = phone;

    const laptop = new Laptop3D();
    scene.add(laptop.group);
    laptopRef.current = laptop;
    laptop.group.position.set(3, -8, -5);
    laptop.group.scale.set(0.001, 0.001, 0.001);

    const zBrand = new ZBrand3D();
    scene.add(zBrand.group);
    zBrandRef.current = zBrand;

    // ========================================================
    // INTERACTIVE MOUSE PARALLAX & 3D DRAG TO ROTATE
    // ========================================================
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.closest('button') || target.closest('a') || target.closest('input'))) {
        return;
      }
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = nx * 0.4;
      mouseRef.current.targetY = ny * 0.3;

      if (isDragging) {
        const deltaX = e.clientX - prevX;
        const deltaY = e.clientY - prevY;
        prevX = e.clientX;
        prevY = e.clientY;

        dragRotRef.current.targetY += deltaX * 0.009;
        dragRotRef.current.targetX += deltaY * 0.009;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    // Resize listener
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 7. Animation / Render Loop
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Lerp mouse inertia
      const mouse = mouseRef.current;
      mouse.currentX += (mouse.targetX - mouse.currentX) * 0.08;
      mouse.currentY += (mouse.targetY - mouse.currentY) * 0.08;

      // Lerp drag rotation inertia
      const drag = dragRotRef.current;
      drag.currentX += (drag.targetX - drag.currentX) * 0.09;
      drag.currentY += (drag.targetY - drag.currentY) * 0.09;

      // When not dragging, gently spring drag rotation back towards center
      if (!isDragging) {
        drag.targetX *= 0.985;
        drag.targetY *= 0.985;
      }

      // Smoothly dampen 3D spin flip
      flipAngleRef.current *= 0.92;

      // Lerp scroll progress for cinematic momentum
      scrollSmoothRef.current += (scrollProgress - scrollSmoothRef.current) * 0.08;
      const sp = scrollSmoothRef.current;

      // Subtle particle drift
      if (particleFieldRef.current) {
        particleFieldRef.current.rotation.y = elapsed * 0.02;
        particleFieldRef.current.rotation.x = Math.sin(elapsed * 0.05) * 0.03;
      }

      // Dynamic rim light subtle breathing
      if (rimLight1Ref.current) {
        rimLight1Ref.current.intensity = 1.8 + Math.sin(elapsed * 1.5) * 0.3;
      }
      if (rimLight2Ref.current) {
        rimLight2Ref.current.intensity = 1.3 + Math.cos(elapsed * 1.5) * 0.2;
      }

      // Dynamic screen animation updates (waveform + typing indicator + elapsed time)
      if (phoneRef.current) {
        phoneRef.current.updateOptions({
          waveformPhase: elapsed * 4,
          typingStep: elapsed * 10,
          time: elapsed,
        });
      }

      // Choreograph scenes along scroll progress (0.0 to 1.0)
      choreographScene(sp, elapsed, mouse.currentX, mouse.currentY, drag.currentX, drag.currentY, flipAngleRef.current);

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
        rendererRef.current.domElement.remove();
      }
    };
  }, []);

  // Update theme & glass intensity on phone screen when changed in UI
  useEffect(() => {
    if (phoneRef.current) {
      phoneRef.current.updateOptions({
        themePreset: activeThemePreset,
        glassIntensity: glassIntensity,
      });
    }
  }, [activeThemePreset, glassIntensity]);

  /**
   * Continuous Cinematic Timeline Director with 3D Motion Dynamics & Drag Physics
   */
  const choreographScene = (
    sp: number,
    time: number,
    mx: number,
    my: number,
    dragX: number,
    dragY: number,
    flip: number
  ) => {
    const phone = phoneRef.current;
    const laptop = laptopRef.current;
    const zBrand = zBrandRef.current;
    const camera = cameraRef.current;
    const sweepLight = sweepLightRef.current;
    if (!phone || !laptop || !zBrand || !camera) return;

    const isMobile = window.innerWidth < 768;

    phone.group.visible = true;
    laptop.group.visible = true;

    // Continuous dynamic levitation sine wave (NEVER static, ultra smooth)
    const levitate = Math.sin(time * 2.0) * 0.10;
    const tiltWobble = Math.cos(time * 1.5) * 0.025;

    // ==========================================
    // STAGE 0: HERO (0.00 - 0.14)
    // Clean, luxury placement on right side, comfortably under navbar
    // ==========================================
    if (sp <= 0.14) {
      const curScreen = interactiveScreenRef.current || 'chat';
      phone.updateOptions({ activeScreen: curScreen });

      // Placed cleanly on the right half, below the top navbar
      const posX = isMobile ? 0 : 2.35 + mx * 0.35;
      const posY = -0.16 + levitate + my * 0.28;
      phone.group.position.set(posX, posY, 0.4);
      phone.group.scale.set(0.85, 0.85, 0.85);

      // Clean Apple-style studio angle
      phone.group.rotation.set(
        0.03 - my * 0.32 + tiltWobble + dragX,
        -0.22 + mx * 0.40 + Math.sin(time * 1.0) * 0.03 + dragY + flip,
        0.015
      );

      camera.position.set(0, 0, 9.8);
      laptop.group.scale.set(0.001, 0.001, 0.001);
      zBrand.update(time, 0);
      if (sweepLight) sweepLight.intensity = 0;
    }
    // ==========================================
    // STAGE 1: JUST CHAT (0.14 - 0.27)
    // ==========================================
    else if (sp <= 0.27) {
      const t = (sp - 0.14) / 0.13;
      phone.updateOptions({ activeScreen: 'chat' });

      const targetX = isMobile ? 0 : 1.2;
      phone.group.position.set(
        targetX + mx * 0.3,
        0.05 - t * 0.15 + my * 0.2 + levitate * 0.7,
        0.4 + t * 1.8
      );
      phone.group.rotation.set(
        0.02 - my * 0.25 + tiltWobble + dragX,
        -0.12 + t * 0.08 + mx * 0.3 + dragY,
        0.01
      );
      phone.group.scale.set(0.95, 0.95, 0.95);

      camera.position.set(0, 0, 9.8);
      laptop.group.scale.set(0.001, 0.001, 0.001);
      zBrand.update(time, 0);
    }
    // ==========================================
    // STAGE 2: ENTER SCREEN TRANSITION (0.27 - 0.38)
    // ==========================================
    else if (sp <= 0.38) {
      const t = (sp - 0.27) / 0.11;
      const pushZ = 2.2 + t * 2.6;
      phone.group.position.set(
        (1 - t) * 1.2,
        (1 - t) * -0.05 + levitate * 0.5,
        pushZ
      );
      phone.group.rotation.set(-my * 0.15 + tiltWobble + dragX, mx * 0.15 + dragY, 0);

      if (t > 0.5) {
        phone.updateOptions({ activeScreen: 'social' });
      } else {
        phone.updateOptions({ activeScreen: 'chat' });
      }
      laptop.group.scale.set(0.001, 0.001, 0.001);
      zBrand.update(time, 0);
    }
    // ==========================================
    // STAGE 3: Z SOCIAL FEED (0.38 - 0.50)
    // ==========================================
    else if (sp <= 0.50) {
      const t = (sp - 0.38) / 0.12;
      phone.updateOptions({ activeScreen: 'social' });

      const targetX = isMobile ? 0 : -0.9;
      phone.group.position.set(
        targetX + mx * 0.3,
        0.05 + my * 0.2 + levitate,
        1.2 - t * 0.4
      );
      phone.group.rotation.set(
        0.04 - my * 0.25 + tiltWobble + dragX,
        0.18 - t * 0.08 + mx * 0.3 + dragY,
        -0.03
      );
      phone.group.scale.set(0.95, 0.95, 0.95);

      laptop.group.scale.set(0.001, 0.001, 0.001);
      zBrand.update(time, 0);
    }
    // ==========================================
    // STAGE 4: Z CLIPS (0.50 - 0.62)
    // ==========================================
    else if (sp <= 0.62) {
      const t = (sp - 0.50) / 0.12;
      phone.updateOptions({ activeScreen: 'clips' });

      const targetX = isMobile ? 0 : 0.9;
      phone.group.position.set(
        targetX + mx * 0.3,
        0.05 + my * 0.2 + levitate,
        0.8 + t * 0.4
      );
      phone.group.rotation.set(
        -0.04 - my * 0.25 + tiltWobble + dragX,
        -0.15 + t * 0.2 + mx * 0.3 + dragY,
        0.02
      );
      phone.group.scale.set(0.95, 0.95, 0.95);

      laptop.group.scale.set(0.001, 0.001, 0.001);
      zBrand.update(time, 0);
    }
    // ==========================================
    // STAGE 5: CUSTOMIZATION STUDIO (0.62 - 0.74)
    // ==========================================
    else if (sp <= 0.74) {
      phone.updateOptions({ activeScreen: 'customization' });

      const targetX = isMobile ? 0 : 1.0;
      phone.group.position.set(
        targetX + mx * 0.3,
        0.05 + levitate,
        1.1
      );
      phone.group.rotation.set(
        0.02 - my * 0.25 + tiltWobble + dragX,
        -0.18 + mx * 0.3 + dragY,
        0.01
      );
      phone.group.scale.set(0.95, 0.95, 0.95);

      laptop.group.scale.set(0.001, 0.001, 0.001);
      zBrand.update(time, 0);
    }
    // ==========================================
    // STAGE 6: MULTI-DEVICE WORLD (0.74 - 0.84)
    // ==========================================
    else if (sp <= 0.84) {
      const t = (sp - 0.74) / 0.10;
      phone.updateOptions({ activeScreen: 'settings' });

      // Camera pulls back smoothly
      camera.position.set(0, 0, 9.8 + t * 2.2);

      // Phone moves to foreground left
      phone.group.position.set(
        -2.2 + mx * 0.3,
        -0.3 + my * 0.2 + levitate * 0.6,
        1.8
      );
      phone.group.rotation.set(
        0.05 - my * 0.25 + tiltWobble + dragX,
        0.22 + mx * 0.25 + dragY,
        -0.02
      );
      phone.group.scale.set(0.95, 0.95, 0.95);

      // Laptop appears in background right
      const lScale = Math.min(1, t * 1.2);
      laptop.group.scale.set(lScale, lScale, lScale);
      laptop.group.position.set(
        1.8 + mx * 0.2,
        -0.7 + my * 0.1,
        -0.4
      );
      laptop.group.rotation.set(
        0.08 - my * 0.15,
        -0.28 + mx * 0.2,
        0
      );

      zBrand.update(time, 0);
    }
    // ==========================================
    // STAGE 7: WEB APP FOCUS (0.84 - 0.94)
    // ==========================================
    else if (sp <= 0.94) {
      const t = (sp - 0.84) / 0.10;

      // Laptop glides into center view
      laptop.group.scale.set(1.15, 1.15, 1.15);
      laptop.group.position.set(
        (1 - t) * 1.8 + t * (isMobile ? 0 : 0.8) + mx * 0.3,
        -0.5 + my * 0.2,
        -0.4 + t * 2.2
      );
      laptop.group.rotation.set(
        0.04 - my * 0.15,
        -0.28 + t * 0.2 + mx * 0.25,
        0
      );

      // Phone shifts further aside
      phone.group.position.set(
        -3.2 + mx * 0.2,
        -0.5 + levitate * 0.4,
        0.5
      );
      phone.group.scale.set(0.85, 0.85, 0.85);

      zBrand.update(time, 0);
    }
    // ==========================================
    // STAGE 8: 3D Z BRAND MOMENT (0.94 - 1.00)
    // ==========================================
    else {
      const t = (sp - 0.94) / 0.06;

      // Devices descend into darkness
      const fadeScale = Math.max(0.001, 1 - t * 3.5);
      phone.group.scale.set(fadeScale, fadeScale, fadeScale);
      laptop.group.scale.set(fadeScale, fadeScale, fadeScale);
      phone.group.position.y = -6 * t;
      laptop.group.position.y = -6 * t;

      camera.position.set(0, 0, 9.8);

      // Giant 3D Z emerges into the center
      const zVis = Math.min(1.0, t * 1.6);
      zBrand.update(time, zVis);
      zBrand.group.position.set(0, 0.3, 0);

      if (sweepLight) {
        sweepLight.intensity = zVis * 8.5;
        sweepLight.position.x = Math.sin(time * 0.8) * 6;
        sweepLight.position.y = 4 + Math.cos(time * 0.6) * 2;
        sweepLight.target = zBrand.zMesh;
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
      style={{ overflow: 'hidden' }}
    />
  );
};
