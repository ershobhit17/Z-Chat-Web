import * as THREE from 'three';

export class ZBrand3D {
  public group: THREE.Group;
  public zMesh: THREE.Mesh;
  public material: THREE.MeshPhysicalMaterial;

  constructor() {
    this.group = new THREE.Group();

    // High-end sculptural dark polished titanium & liquid obsidian material
    this.material = new THREE.MeshPhysicalMaterial({
      color: 0x1a1a1f,
      metalness: 0.95,
      roughness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.98,
      ior: 1.8,
    });

    const shape = new THREE.Shape();
    // Precise sculptural ribbon Z geometry matching the official Z logo
    // Scale roughly 4x4 units centered
    const w = 4.2;
    const h = 4.6;
    const barH = 0.85;

    // Start at top-left
    shape.moveTo(-w / 2, h / 2);
    // Top bar to top-right
    shape.lineTo(w / 2 - 0.3, h / 2);
    shape.quadraticCurveTo(w / 2 + 0.1, h / 2 - 0.2, w / 2, h / 2 - barH);
    // Diagonal ribbon down to bottom-left
    shape.lineTo(-w / 2 + barH * 0.9, -h / 2 + barH);
    // Bottom bar to bottom-right
    shape.lineTo(w / 2, -h / 2 + barH);
    shape.quadraticCurveTo(w / 2 + 0.1, -h / 2 + 0.1, w / 2 - 0.3, -h / 2);
    // Bottom edge to bottom-left
    shape.lineTo(-w / 2 + 0.3, -h / 2);
    shape.quadraticCurveTo(-w / 2 - 0.1, -h / 2 + 0.2, -w / 2, -h / 2 + barH);
    // Diagonal return back up
    shape.lineTo(w / 2 - barH * 0.9, h / 2 - barH);
    // Inner return to top-left
    shape.lineTo(-w / 2, h / 2 - barH);
    shape.quadraticCurveTo(-w / 2 - 0.1, h / 2 - 0.1, -w / 2, h / 2);

    const extrudeSettings = {
      depth: 0.7,
      bevelEnabled: true,
      bevelSegments: 10,
      steps: 2,
      bevelSize: 0.12,
      bevelThickness: 0.12,
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();

    this.zMesh = new THREE.Mesh(geometry, this.material);
    this.zMesh.castShadow = true;
    this.zMesh.receiveShadow = true;
    this.group.add(this.zMesh);

    // Initial state hidden/scaled down
    this.group.scale.set(0.001, 0.001, 0.001);
    this.group.visible = false;
  }

  public update(time: number, visibility: number) {
    if (visibility <= 0.005) {
      this.group.visible = false;
      return;
    }
    this.group.visible = true;

    // Smooth entry scale
    const scale = Math.min(1.0, visibility * 1.1);
    this.group.scale.set(scale, scale, scale);

    // Subtle majestic studio rotation
    this.zMesh.rotation.y = Math.sin(time * 0.4) * 0.18;
    this.zMesh.rotation.x = Math.cos(time * 0.3) * 0.06;
  }
}
