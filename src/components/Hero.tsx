import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Tv, Radio } from "lucide-react";

interface HeroProps {
  onOpenWatchLive: () => void;
}

export default function Hero({ onOpenWatchLive }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    // Check if the user is on a mobile device to completely bypass Three.js setup and rendering, but keep it on for Android apps/devices
    const isAndroid = typeof navigator !== "undefined" && /android/i.test(navigator.userAgent);
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768 && !isAndroid;
    if (isMobile) {
      canvas.style.display = "none";
      return;
    }

    let animationFrameId: number;
    let isHeroVisible = true;

    // Use IntersectionObserver to pause Three.js render loop when out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroVisible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    if (canvas.parentElement) {
      observer.observe(canvas.parentElement);
    }

    // Create Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x04000f, 1);
    renderer.shadowMap.enabled = true;

    // Scene and Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 2, 14);

    // Resize Handler
    const handleResize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Fog
    scene.fog = new THREE.FogExp2(0x0a0020, 0.025);

    // Lights
    const ambLight = new THREE.AmbientLight(0x1a0050, 1.5);
    scene.add(ambLight);

    const goldLight = new THREE.PointLight(0xd4af37, 8, 30);
    goldLight.position.set(0, 2, 0);
    scene.add(goldLight);

    const goldLight2 = new THREE.PointLight(0xffd060, 4, 20);
    goldLight2.position.set(0, 6, -4);
    scene.add(goldLight2);

    const purpleLight = new THREE.PointLight(0x6020c0, 3, 25);
    purpleLight.position.set(-8, 0, -8);
    scene.add(purpleLight);

    const purpleLight2 = new THREE.PointLight(0x3b0a6e, 3, 25);
    purpleLight2.position.set(8, 0, -8);
    scene.add(purpleLight2);

    // Star Background
    const starGeo = new THREE.BufferGeometry();
    const starCount = 1500;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 200;
      starPos[i * 3 + 1] = Math.random() * 100 - 10;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 200 - 20;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.12,
      transparent: true,
      opacity: 0.8,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // Cross Group
    const crossGroup = new THREE.Group();
    const crossMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0xd4af37,
      emissiveIntensity: 0.3,
    });

    // Vertical beam
    const vBeam = new THREE.Mesh(new THREE.BoxGeometry(0.7, 7, 0.4), crossMat);
    crossGroup.add(vBeam);

    // Horizontal beam
    const hBeam = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.7, 0.4), crossMat);
    hBeam.position.y = 1.5;
    crossGroup.add(hBeam);

    // Edge chamfer highlights
    const edgeMat = new THREE.MeshStandardMaterial({
      color: 0xf0d060,
      emissive: 0xf0d060,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.6,
    });
    const edgeV = new THREE.Mesh(new THREE.BoxGeometry(0.08, 7.1, 0.08), edgeMat);
    crossGroup.add(edgeV);
    const edgeH = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.08, 0.08), edgeMat);
    edgeH.position.y = 1.5;
    crossGroup.add(edgeH);
    crossGroup.position.y = 1;
    scene.add(crossGroup);

    // Cross Glow Halo
    const haloGeo = new THREE.SphereGeometry(4, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    scene.add(haloMesh);

    const halo2Mat = new THREE.MeshBasicMaterial({
      color: 0xffd060,
      transparent: true,
      opacity: 0.025,
      side: THREE.BackSide,
    });
    const halo2Mesh = new THREE.Mesh(new THREE.SphereGeometry(6, 32, 32), halo2Mat);
    scene.add(halo2Mesh);

    // Light Rays
    const rayGroup = new THREE.Group();
    const rayCount = 12;
    const rayGeometries: THREE.BufferGeometry[] = [];
    const rayMaterials: THREE.Material[] = [];

    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 2;
      const len = 6 + Math.random() * 4;
      const rayGeo = new THREE.CylinderGeometry(0.01, 0.4, len, 4);
      const rayMat = new THREE.MeshBasicMaterial({
        color: 0xd4af37,
        transparent: true,
        opacity: 0.06 + Math.random() * 0.04,
      });
      const ray = new THREE.Mesh(rayGeo, rayMat);
      ray.rotation.z = angle;
      ray.position.set((Math.sin(angle) * len) / 2, 2 + (Math.cos(angle) * len) / 2, -1);
      ray.rotation.x = Math.PI / 2 - 0.3;
      rayGroup.add(ray);

      rayGeometries.push(rayGeo);
      rayMaterials.push(rayMat);
    }
    scene.add(rayGroup);

    // Marble Ground
    const groundGeo = new THREE.PlaneGeometry(40, 30, 1, 1);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xf0eef8,
      metalness: 0.1,
      roughness: 0.15,
      transparent: true,
      opacity: 0.85,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.6;
    scene.add(ground);

    // Ground Reflection (mirror cross silhouette)
    const reflMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.06,
    });
    const reflV = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.01, 5), reflMat);
    reflV.position.set(0, -2.59, 1);
    scene.add(reflV);

    const reflH = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.01, 0.7), reflMat);
    reflH.position.set(0, -2.59, 1);
    scene.add(reflH);

    // Embers / Rising Particles
    const emberCount = 400;
    const emberGeo = new THREE.BufferGeometry();
    const ePosArr = new Float32Array(emberCount * 3);
    const eVelArr = new Float32Array(emberCount * 3);

    for (let i = 0; i < emberCount; i++) {
      ePosArr[i * 3] = (Math.random() - 0.5) * 14;
      ePosArr[i * 3 + 1] = Math.random() * 12 - 3;
      ePosArr[i * 3 + 2] = (Math.random() - 0.5) * 8;

      eVelArr[i * 3] = (Math.random() - 0.5) * 0.008;
      eVelArr[i * 3 + 1] = 0.01 + Math.random() * 0.025;
      eVelArr[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    emberGeo.setAttribute("position", new THREE.BufferAttribute(ePosArr, 3));
    const emberMat = new THREE.PointsMaterial({
      color: 0xffcc44,
      size: 0.08,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    const embers = new THREE.Points(emberGeo, emberMat);
    scene.add(embers);

    // Orbit parameters
    let orbitAngle = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isHeroVisible) return;
      const t = clock.getElapsedTime();

      // Slow orbital camera movement
      orbitAngle += 0.0012;
      const radius = 14;
      camera.position.x = Math.sin(orbitAngle) * radius;
      camera.position.z = Math.cos(orbitAngle) * radius;
      camera.position.y = 2 + Math.sin(t * 0.3) * 0.5;
      camera.lookAt(0, 2, 0);

      // Gentle cross sway
      crossGroup.rotation.y = Math.sin(t * 0.2) * 0.04;
      goldLight.intensity = 7 + Math.sin(t * 2) * 2;
      goldLight2.intensity = 4 + Math.sin(t * 1.5 + 1) * 1;

      // Update embers position
      const pos = emberGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < emberCount; i++) {
        pos[i * 3] += eVelArr[i * 3];
        pos[i * 3 + 1] += eVelArr[i * 3 + 1];
        pos[i * 3 + 2] += eVelArr[i * 3 + 2];

        // Wrap around at top
        if (pos[i * 3 + 1] > 12) {
          pos[i * 3] = (Math.random() - 0.5) * 14;
          pos[i * 3 + 1] = -3;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
        }
      }
      emberGeo.attributes.position.needsUpdate = true;

      // Rotate light rays slightly
      rayGroup.rotation.z = t * 0.04;
      crossMat.emissiveIntensity = 0.25 + Math.sin(t * 1.8) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();

      // Dispose resources
      starGeo.dispose();
      starMat.dispose();
      crossMat.dispose();
      edgeMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      halo2Mat.dispose();
      groundGeo.dispose();
      groundMat.dispose();
      reflMat.dispose();
      emberGeo.dispose();
      emberMat.dispose();

      rayGeometries.forEach((g) => g.dispose());
      rayMaterials.forEach((m) => m.dispose());

      renderer.dispose();
    };
  }, []);

  return (
    <section id="hero" className="relative w-full h-[100vh] overflow-hidden bg-gradient-to-b from-[#04000f] via-[#120427] to-[#0a0010]">
      {/* Beautiful ambient glow elements on mobile when Three.js is disabled */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,10,110,0.5)_0%,transparent_70%)] pointer-events-none md:hidden" />
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none md:hidden" />

      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Hero Overlaid UI Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4 md:px-6 pointer-events-none select-none">
        <div className="inline-block border border-brand-gold/40 text-brand-gold text-[0.68rem] md:text-xs tracking-[3px] uppercase px-5 py-2.5 rounded-sm mb-6 bg-brand-purple-dark/80 md:bg-brand-purple-dark/40 md:backdrop-blur-xs shadow-inner">
          ✦ Est. 2012 — Nakuru City, Kenya ✦
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black text-brand-gold leading-[1.05] tracking-tight mb-4 drop-shadow-[0_0_50px_rgba(212,175,55,0.4)]">
          Kingdom Seekers
          <span className="block font-serif font-light text-3xl md:text-5xl lg:text-6xl text-white mt-2">
            Fellowship
          </span>
        </h1>

        <p className="font-serif italic text-base md:text-xl lg:text-2xl text-white/95 max-w-2xl mb-3 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] font-medium">
          "Seek ye first the Kingdom of God, and His righteousness"
        </p>
        <p className="font-sans text-[0.68rem] md:text-[0.8rem] tracking-[2.5px] uppercase text-brand-gold/80 mb-10 font-semibold">
          — Matthew 6:33 • Nakuru City, Kenya
        </p>

        {/* Buttons (Restoring interactive pointer events) */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pointer-events-auto w-full max-w-md px-4">
          <button
            onClick={onOpenWatchLive}
            className="w-full sm:w-auto bg-brand-gold text-[#0a0010] px-9 py-4 rounded font-bold text-sm md:text-base tracking-[1px] uppercase transition-all duration-300 hover:bg-brand-gold-light hover:-translate-y-1 hover:scale-[1.02] shadow-[0_0_30px_rgba(212,175,55,0.45)] active:scale-95 cursor-pointer btn-pulse flex items-center justify-center gap-2.5"
          >
            <Tv className="w-4 h-4 text-[#0a0010]" /> Watch TV
          </button>
          <a
            href="#media"
            className="w-full sm:w-auto bg-transparent text-white px-9 py-3.5 rounded font-bold text-sm md:text-base tracking-[1px] uppercase border-1.5 border-white/50 transition-all duration-300 hover:border-brand-gold hover:text-brand-gold hover:bg-brand-gold/8 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Radio className="w-4 h-4" /> Listen to Radio
          </a>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-8 left-50% -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none opacity-80">
        <span className="font-sans text-[0.62rem] tracking-[2px] uppercase text-white/55 font-semibold">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-gold/60 to-transparent scroll-line-anim" />
      </div>
    </section>
  );
}
