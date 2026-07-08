import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { Send, MapPin, Sparkles, CheckCircle2 } from "lucide-react";

export default function Mountain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formCategory, setFormCategory] = useState("Healing");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePrayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formMessage) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form fields
      setFormName("");
      setFormEmail("");
      setFormPhone("");
      setFormMessage("");
    }, 1200);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    let animationFrameId: number;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x020008, 1);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050015, 0.018);

    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 200);
    camera.position.set(0, 2, 20);

    const handleResize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Lights
    const ambLight = new THREE.AmbientLight(0x150030, 2);
    scene.add(ambLight);

    const moonLight = new THREE.DirectionalLight(0x8060c0, 1.5);
    moonLight.position.set(-5, 10, -10);
    scene.add(moonLight);

    const goldGlow = new THREE.PointLight(0xd4af37, 2, 30);
    goldGlow.position.set(0, 8, 0);
    scene.add(goldGlow);

    // Mountain Generator
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    function makeMountain(x: number, z: number, scale: number, color: number) {
      const geo = new THREE.ConeGeometry(scale, scale * 1.4, 8);
      
      // Deform mountain slightly for a low-poly rugged organic look
      const pos = geo.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length; i += 3) {
        if (pos[i + 1] < scale * 0.6) {
          pos[i] += (Math.random() - 0.5) * scale * 0.25;
          pos[i + 2] += (Math.random() - 0.5) * scale * 0.25;
        }
      }
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color,
        flatShading: true,
        metalness: 0,
        roughness: 1,
      });

      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, -2 + scale * 0.3, z);
      scene.add(m);

      geometries.push(geo);
      materials.push(mat);
      return m;
    }

    // Creating several layer of mountains
    makeMountain(0, -10, 8, 0x2a1050);
    makeMountain(-10, -14, 6, 0x1e0840);
    makeMountain(10, -14, 7, 0x220a48);
    makeMountain(-5, -8, 4, 0x180630);
    makeMountain(6, -9, 5, 0x200840);
    makeMountain(-14, -16, 5, 0x1a0638);
    makeMountain(14, -16, 5.5, 0x1e0840);

    // Add glowing snow caps on top peaks
    const capGeo = new THREE.ConeGeometry(1.5, 1.5, 6);
    const capMat = new THREE.MeshStandardMaterial({ color: 0xddd8f0, flatShading: true });
    geometries.push(capGeo);
    materials.push(capMat);

    const caps = [
      [0, 7.5, -10],
      [-10, 5.5, -14],
      [10, 6.5, -14],
    ];
    caps.forEach(([x, y, z]) => {
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.set(x, y, z);
      scene.add(cap);
    });

    // Ground plane mist
    const mistGeo = new THREE.PlaneGeometry(80, 30);
    const mistMat = new THREE.MeshBasicMaterial({
      color: 0x3b0a6e,
      transparent: true,
      opacity: 0.15,
    });
    const mist = new THREE.Mesh(mistGeo, mistMat);
    mist.rotation.x = -Math.PI / 2;
    mist.position.y = -1.5;
    scene.add(mist);
    geometries.push(mistGeo);
    materials.push(mistMat);

    // Stars Particles
    const starCount = 1000;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 200;
      starPos[i * 3 + 1] = Math.random() * 60 + 5;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 200 - 10;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.18,
      transparent: true,
      opacity: 0.9,
    });
    const starsMesh = new THREE.Points(starGeo, starMat);
    scene.add(starsMesh);
    geometries.push(starGeo);
    materials.push(starMat);

    // Moon and Halo glow
    const moonGeo = new THREE.SphereGeometry(1.4, 20, 20);
    const moonMat = new THREE.MeshBasicMaterial({ color: 0xd0c8f0 });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    moon.position.set(-15, 20, -40);
    scene.add(moon);
    geometries.push(moonGeo);
    materials.push(moonMat);

    const moonGlowGeo = new THREE.SphereGeometry(2.8, 20, 20);
    const moonGlowMat = new THREE.MeshBasicMaterial({
      color: 0x9070d0,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
    });
    const moonGlow = new THREE.Mesh(moonGlowGeo, moonGlowMat);
    moonGlow.position.copy(moon.position);
    scene.add(moonGlow);
    geometries.push(moonGlowGeo);
    materials.push(moonGlowMat);

    // Divine Pillar Light Shaft
    const shaftGeo = new THREE.CylinderGeometry(0.3, 3, 20, 8, 1, true);
    const shaftMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.04,
      side: THREE.DoubleSide,
    });
    const shaft = new THREE.Mesh(shaftGeo, shaftMat);
    shaft.position.set(0, 10, -10);
    scene.add(shaft);
    geometries.push(shaftGeo);
    materials.push(shaftMat);

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      starsMesh.material.opacity = 0.7 + Math.sin(t * 0.5) * 0.2;
      goldGlow.intensity = 1.5 + Math.sin(t * 0.8) * 0.5;
      shaft.material.opacity = 0.03 + Math.sin(t * 0.3) * 0.02;

      // Subtle slow camera hover
      camera.position.x = Math.sin(t * 0.05) * 1;
      camera.lookAt(0, 1, -10);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);

      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());

      renderer.dispose();
    };
  }, []);

  return (
    <section id="prayer-mountain" className="relative min-h-[90vh] flex items-center bg-[#040010] overflow-hidden py-24">
      {/* 3D Landscape Canvas */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Mountain Story Card */}
          <div className="lg:col-span-6 text-left bg-black/85 md:bg-black/40 md:backdrop-blur-md border border-white/5 p-8 md:p-12 rounded-3xl shadow-2xl">
            <span className="text-brand-gold text-[0.72rem] tracking-[3px] uppercase font-bold mb-4 block">
              Heaven's Gate
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              Prayer <span className="text-brand-gold">Mountain</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-brand-gold to-transparent mb-8 rounded-full" />

            <p className="text-brand-grey text-base md:text-lg leading-[1.8] mb-6 font-light">
              Heaven's Gate Prayer Mountain is a place of sacred encounter, fasting, and divine breakthrough. Nestled in the breathtaking, peaceful landscape of the Great Rift Valley, it is where believers from across Kenya and the world come to seek God's face in deep isolation and meditation.
            </p>
            <p className="text-white/60 text-sm md:text-base leading-[1.8] mb-10 font-light">
              Located just 25 kilometers from Nakuru City along the main Nakuru–Nairobi Highway, this peaceful sanctuary is open 24/7 for personal spiritual retreats, corporate prayers, healing gatherings, deliverance, and prophetic times of encounter.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#visit-us"
                className="inline-flex items-center justify-center gap-2 bg-brand-gold text-[#0a0010] px-8 py-3.5 rounded-lg font-bold text-sm tracking-[0.5px] shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-all duration-300 hover:bg-brand-gold-light hover:-translate-y-0.5"
              >
                ⛰️ Plan Your Prayer Visit
              </a>
              <div className="flex items-center gap-2 text-white/40 text-xs font-mono">
                <MapPin className="w-4 h-4 text-brand-gold" />
                <span>Rift Valley, Kenya</span>
              </div>
            </div>
          </div>

          {/* Right Column: Submit Prayer Request Form */}
          <div className="lg:col-span-6">
            <div className="bg-[#120427]/95 md:bg-[#120427]/80 border border-brand-gold/15 p-6 md:p-10 rounded-3xl shadow-2xl md:backdrop-blur-md relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none" />

              {!isSubmitted ? (
                <form onSubmit={handlePrayerSubmit}>
                  <div className="flex items-center gap-2.5 mb-2">
                    <Sparkles className="w-5 h-5 text-brand-gold" />
                    <span className="text-brand-gold text-[0.68rem] uppercase tracking-widest font-bold">
                      24/7 Altar of Prayer
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-white mb-2">
                    Submit Your Request
                  </h3>
                  <p className="text-brand-grey text-xs md:text-sm font-light mb-6">
                    Our intercession team at the Prayer Mountain is waiting to stand in the gap with you. Your requests are kept strictly confidential.
                  </p>

                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-white/60 text-[0.72rem] font-medium tracking-wide mb-1.5 font-mono uppercase">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold transition-all"
                      />
                    </div>

                    {/* Email & Phone grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/60 text-[0.72rem] font-medium tracking-wide mb-1.5 font-mono uppercase">Email Address</label>
                        <input
                          type="email"
                          placeholder="yourname@domain.com"
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-[0.72rem] font-medium tracking-wide mb-1.5 font-mono uppercase">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+254 7XX XXX XXX"
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold transition-all"
                        />
                      </div>
                    </div>

                    {/* Request Category */}
                    <div>
                      <label className="block text-white/60 text-[0.72rem] font-medium tracking-wide mb-1.5 font-mono uppercase">Prayer Focus</label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="w-full bg-[#1c0a35] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold transition-all cursor-pointer"
                      >
                        <option value="Healing">Healing & Sound Health</option>
                        <option value="Family">Family Restoration</option>
                        <option value="Deliverance">Deliverance & Freedom</option>
                        <option value="Breakthrough">Financial & Career Breakthrough</option>
                        <option value="Salvation">Salvation & Spiritual Growth</option>
                        <option value="Other">Other Request</option>
                      </select>
                    </div>

                    {/* Request message */}
                    <div>
                      <label className="block text-white/60 text-[0.72rem] font-medium tracking-wide mb-1.5 font-mono uppercase">Your Prayer Request *</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Detail your request here. Be as open as you'd like..."
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-gold to-brand-gold-light text-[#0a0010] py-3.5 rounded-xl font-bold text-sm tracking-[0.5px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01]"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-[#0a0010] border-t-transparent rounded-full animate-spin" />
                          <span>Laying request at Altar...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Prayer Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-12 px-4 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-brand-gold/15 flex items-center justify-center mb-6 border border-brand-gold/30">
                    <CheckCircle2 className="w-8 h-8 text-brand-gold animate-bounce" />
                  </div>
                  
                  <h3 className="font-serif text-2xl font-bold text-white mb-3">
                    Laid at the Altar
                  </h3>
                  
                  <p className="text-brand-grey text-sm md:text-base font-light mb-8 max-w-sm leading-relaxed">
                    Thank you. Your request has been successfully registered and laid at the <strong>24/7 Altar of Prayer</strong>. Our dedicated intercession team at the Prayer Mountain will begin praying over your request immediately.
                  </p>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-xs font-semibold text-white transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
