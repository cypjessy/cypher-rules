import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Radio, Play, Pause, Volume2, Tv, RefreshCw, Music, SkipForward, SkipBack, ListMusic, VolumeX } from "lucide-react";

export default function Media() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [streamTime, setStreamTime] = useState("00:00:00");

  // Worship player state
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isWorshipPlaying, setIsWorshipPlaying] = useState(false);
  const [worshipProgress, setWorshipProgress] = useState(15);
  const [worshipVolume, setWorshipVolume] = useState(75);

  const worshipTracks = [
    {
      id: 0,
      title: "Mtakatifu",
      album: "Jehovah Shammah Live",
      duration: "6:42",
      lead: "KSF Praise & Worship"
    },
    {
      id: 1,
      title: "Nisamehe",
      album: "Mtakatifu Live Recording",
      duration: "8:15",
      lead: "KSF Praise & Worship"
    },
    {
      id: 2,
      title: "Jehovah Shammah",
      album: "Jehovah Shammah Live",
      duration: "7:30",
      lead: "KSF Praise & Worship"
    },
    {
      id: 3,
      title: "Wewe Ni Mkuu",
      album: "Uaminifu Wako Recording",
      duration: "5:50",
      lead: "KSF Praise & Worship"
    },
    {
      id: 4,
      title: "Uaminifu Wako",
      album: "Uaminifu Wako Recording",
      duration: "9:04",
      lead: "KSF Praise & Worship"
    }
  ];

  // Simulating playback progress
  useEffect(() => {
    let playInterval: NodeJS.Timeout;
    if (isWorshipPlaying) {
      playInterval = setInterval(() => {
        setWorshipProgress((prev) => {
          if (prev >= 100) {
            // Next song
            setCurrentTrackIndex((idx) => (idx + 1) % worshipTracks.length);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(playInterval);
  }, [isWorshipPlaying, worshipTracks.length]);

  // Timer simulation for live stream
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (isPlaying) {
      let seconds = 0;
      let minutes = 0;
      let hours = 0;
      timerId = setInterval(() => {
        seconds++;
        if (seconds >= 60) {
          seconds = 0;
          minutes++;
          if (minutes >= 60) {
            minutes = 0;
            hours++;
          }
        }
        const pad = (num: number) => num.toString().padStart(2, "0");
        setStreamTime(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
      }, 1000);
    } else {
      setStreamTime("00:00:00");
    }
    return () => clearInterval(timerId);
  }, [isPlaying]);

  // Three.js animation for radiating waves
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
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 18);

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
    const ambLight = new THREE.AmbientLight(0x200040, 1);
    scene.add(ambLight);

    const gl = new THREE.PointLight(0xd4af37, 4, 30);
    gl.position.set(0, 0, 5);
    scene.add(gl);

    // Antenna Tower
    const towerGroup = new THREE.Group();
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0xaaaacc,
      metalness: 0.8,
      roughness: 0.3,
    });
    const goldMatT = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0xd4af37,
      emissiveIntensity: 0.5,
    });

    // Main Mast
    const mastGeo = new THREE.CylinderGeometry(0.06, 0.12, 5, 8);
    const mast = new THREE.Mesh(mastGeo, steelMat);
    towerGroup.add(mast);

    // Crossbars
    const crossbarGeometries: THREE.CylinderGeometry[] = [];
    for (let i = 0; i < 4; i++) {
      const cbGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.5 - i * 0.2, 6);
      const cb = new THREE.Mesh(cbGeo, steelMat);
      cb.rotation.z = Math.PI / 2;
      cb.position.y = -1.5 + i * 0.9;
      towerGroup.add(cb);
      crossbarGeometries.push(cbGeo);
    }

    // Top tip glowing sphere
    const tipGeo = new THREE.SphereGeometry(0.15, 16, 16);
    const tipOrb = new THREE.Mesh(tipGeo, goldMatT);
    tipOrb.position.y = 2.6;
    towerGroup.add(tipOrb);

    towerGroup.position.y = -1;
    scene.add(towerGroup);

    // Radiating concentric wave rings
    const rings: { mesh: THREE.Mesh; phase: number }[] = [];
    const ringGeo = new THREE.TorusGeometry(0.5, 0.02, 8, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0,
    });

    for (let i = 0; i < 8; i++) {
      const ring = new THREE.Mesh(ringGeo, ringMat.clone());
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 1.6;
      rings.push({ mesh: ring, phase: i / 8 });
      scene.add(ring);
    }

    // Background purple dust
    const bgGeo = new THREE.BufferGeometry();
    const bgCount = 200;
    const bgPos = new Float32Array(bgCount * 3);
    for (let i = 0; i < bgCount; i++) {
      bgPos[i * 3] = (Math.random() - 0.5) * 30;
      bgPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      bgPos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    bgGeo.setAttribute("position", new THREE.BufferAttribute(bgPos, 3));
    const bgMat = new THREE.PointsMaterial({
      color: 0x6020c0,
      size: 0.06,
      transparent: true,
      opacity: 0.4,
    });
    const bgPoints = new THREE.Points(bgGeo, bgMat);
    scene.add(bgPoints);

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Animate rings outward
      rings.forEach((item) => {
        const phase = (t * 0.5 + item.phase) % 1;
        item.mesh.scale.setScalar(1 + phase * 8);
        (item.mesh.material as THREE.MeshBasicMaterial).opacity = (1 - phase) * 0.4;
      });

      tipOrb.material.emissiveIntensity = 0.4 + Math.sin(t * 3) * 0.3;
      towerGroup.rotation.y = Math.sin(t * 0.2) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);

      mastGeo.dispose();
      crossbarGeometries.forEach((g) => g.dispose());
      tipGeo.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      rings.forEach((item) => (item.mesh.material as THREE.MeshBasicMaterial).dispose());
      bgGeo.dispose();
      bgMat.dispose();
      steelMat.dispose();
      goldMatT.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <section id="media" className="py-24 px-3 md:px-12 bg-gradient-to-tr from-[#0d0020] to-[#1a0050] overflow-hidden relative">
      {/* Radio Wave Antenna Canvas (background opacity adjusted) */}
      <div className="absolute inset-0 w-full h-full opacity-60 pointer-events-none select-none">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="text-brand-gold text-[0.72rem] tracking-[3px] uppercase font-bold mb-4 block">
            MBCI Media Ministry
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            Transforming Lives <span className="text-brand-gold">on Air & Stream</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-gold to-transparent mx-auto mb-8 rounded-full" />

          <p className="text-brand-grey text-base md:text-lg leading-[1.8] mb-10 font-light">
            Through MBCI Radio, MBCI TV, and spiritual Praise & Worship recordings, Kingdom Seekers Fellowship broadcasts prophetic guidance, heartfelt intercession, and authentic worship to millions of souls globally.
          </p>
        </div>

        {/* Dynamic Dual Media Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8 items-start">
          
          {/* Column 1: MBCI Radio Console & Frequencies */}
          <div className="bg-[#100424]/95 md:bg-[#100424]/80 border border-brand-gold/15 rounded-3xl p-6 md:p-8 shadow-2xl md:backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-3 border-b border-white/10 pb-5 mb-6">
              <div className="bg-brand-gold/15 p-2.5 rounded-xl text-brand-gold">
                <Radio className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="text-[0.68rem] uppercase tracking-[1.5px] text-brand-gold font-bold">
                  MBCI Radio Live
                </span>
                <h4 className="text-white font-medium text-base leading-tight mt-1">
                  Prophetic Hour with Apostle J.K. William
                </h4>
              </div>
              <div className="ml-auto flex items-center gap-1.5 bg-red-600/15 border border-red-500/30 px-3 py-1 rounded-full text-red-400 text-[0.65rem] uppercase tracking-wider font-bold">
                <span className={`w-1.5 h-1.5 rounded-full bg-red-500 ${isPlaying ? "animate-pulse" : ""}`} />
                {isPlaying ? "On Air" : "Station Off"}
              </div>
            </div>

            {/* Simulated Live wave indicators */}
            <div className="h-16 flex items-end justify-center gap-1.5 mb-8 bg-black/20 rounded-xl p-4 border border-white/5">
              {[12, 36, 16, 48, 24, 10, 32, 18, 52, 14, 38, 8, 26, 44, 16, 34, 12, 28, 18, 40].map((height, i) => (
                <span
                  key={i}
                  className="block w-[3.5px] bg-brand-gold rounded-full origin-bottom"
                  style={{
                    height: isPlaying ? `${height}px` : "6px",
                    transition: "height 0.15s ease",
                    animation: isPlaying ? "wave 1s ease-in-out infinite" : "none",
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>

            {/* Control Strip */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-white/5 pb-6 mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-brand-gold text-[#0a0010] p-4 rounded-full font-bold shadow-lg shadow-brand-gold/20 hover:bg-brand-gold-light hover:scale-105 transition-all duration-300"
                >
                  {isPlaying ? <Pause className="fill-current w-5 h-5" /> : <Play className="fill-current w-5 h-5 translate-x-0.5" />}
                </button>
                <div className="text-left">
                  <span className="text-[0.65rem] text-white/40 uppercase tracking-widest font-semibold">
                    Simulated Tuned Time
                  </span>
                  <span className="text-white font-mono text-lg font-bold block">
                    {streamTime}
                  </span>
                </div>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-3 bg-black/35 px-4 py-2.5 rounded-xl border border-white/5">
                <Volume2 className="w-4 h-4 text-brand-gold" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                />
                <span className="text-white/60 font-mono text-xs w-8 text-right">{volume}%</span>
              </div>
            </div>

            {/* Frequencies badging locally inside the column */}
            <div className="text-left">
              <span className="text-[0.68rem] text-white/40 uppercase tracking-widest font-semibold mb-3 block">Regional FM Frequencies & TV</span>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col">
                  <span className="font-bold text-brand-gold text-sm">89.5 FM</span>
                  <span className="text-white/50 text-[0.68rem] uppercase tracking-wider mt-0.5">Nakuru & Rift Valley</span>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col">
                  <span className="font-bold text-brand-gold text-sm">96.8 FM</span>
                  <span className="text-white/50 text-[0.68rem] uppercase tracking-wider mt-0.5">Meru & Mt. Kenya</span>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col">
                  <span className="font-bold text-brand-gold text-sm">103.7 FM</span>
                  <span className="text-white/50 text-[0.68rem] uppercase tracking-wider mt-0.5">Nyeri & Central</span>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col">
                  <span className="font-bold text-brand-gold text-sm flex items-center gap-1.5">
                    MBCI TV <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block animate-pulse" />
                  </span>
                  <span className="text-white/50 text-[0.68rem] uppercase tracking-wider mt-0.5">National Free-to-Air</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Praise & Worship Interactive Player */}
          <div className="bg-[#100424]/95 md:bg-[#100424]/80 border border-brand-gold/15 rounded-3xl p-6 md:p-8 shadow-2xl md:backdrop-blur-md relative overflow-hidden text-left flex flex-col justify-between h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />

            {/* Player Header */}
            <div>
              <div className="flex items-center gap-3 border-b border-white/10 pb-5 mb-6">
                <div className="bg-[#7000ff]/15 p-2.5 rounded-xl text-purple-400 border border-[#7000ff]/20">
                  <Music className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[0.68rem] uppercase tracking-[1.5px] text-purple-400 font-bold">
                    Worship Center
                  </span>
                  <h4 className="text-white font-medium text-base leading-tight mt-1">
                    Spiritual Swahili Praise & Worship
                  </h4>
                </div>
                <div className="ml-auto bg-brand-gold/10 border border-brand-gold/20 px-3 py-1 rounded-full text-brand-gold text-[0.65rem] uppercase tracking-wider font-bold flex items-center gap-1">
                  <ListMusic className="w-3.5 h-3.5" />
                  5 Tracks
                </div>
              </div>

              {/* Active Track Control Block */}
              <div className="bg-black/30 rounded-2xl p-5 border border-white/5 flex flex-col sm:flex-row items-center gap-5 mb-6">
                {/* Simulated spinning Vinyl CD */}
                <div className="relative flex-shrink-0">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-[#2a1b40] via-[#050010] to-[#2a1b40] border-2 border-brand-gold/50 flex items-center justify-center shadow-lg ${isWorshipPlaying ? "animate-spin [animation-duration:8s]" : ""}`}>
                    <div className="w-5 h-5 rounded-full bg-black border border-brand-gold/20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                    </div>
                  </div>
                  <Music className="w-4 h-4 text-brand-gold absolute -bottom-1 -right-1 bg-[#100424] p-0.5 rounded-full border border-brand-gold/20" />
                </div>

                {/* Info and Progress bar */}
                <div className="flex-1 w-full text-left">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-bold text-white text-base leading-tight">{worshipTracks[currentTrackIndex].title}</h5>
                      <p className="text-xs text-brand-grey font-light mt-0.5">{worshipTracks[currentTrackIndex].album}</p>
                    </div>
                    <span className="text-[0.68rem] font-mono text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded border border-brand-gold/20">
                      Live Recorded
                    </span>
                  </div>

                  {/* Progress bar input */}
                  <div className="mt-4">
                    <div className="relative w-full h-1 bg-white/15 rounded-full overflow-hidden">
                      <div
                        className="absolute left-0 top-0 h-full bg-brand-gold transition-all duration-300"
                        style={{ width: `${worshipProgress}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center mt-2 font-mono text-[0.65rem] text-white/40">
                      <span>
                        {Math.floor((worshipProgress / 100) * 6)}:
                        {String(Math.floor(((worshipProgress / 100) * 360) % 60)).padStart(2, "0")}
                      </span>
                      <span>{worshipTracks[currentTrackIndex].duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Player Controls & Track List */}
              <div className="flex items-center justify-between border-b border-white/5 pb-5 mb-5">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setCurrentTrackIndex((idx) => (idx - 1 + worshipTracks.length) % worshipTracks.length);
                      setWorshipProgress(0);
                    }}
                    className="p-2.5 bg-white/5 rounded-lg text-white/70 hover:text-brand-gold hover:bg-white/10 transition-colors"
                    title="Previous Track"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsWorshipPlaying(!isWorshipPlaying)}
                    className="p-3.5 bg-purple-600 hover:bg-purple-500 rounded-full text-white shadow-lg shadow-purple-600/30 hover:scale-105 transition-all"
                    title={isWorshipPlaying ? "Pause" : "Play"}
                  >
                    {isWorshipPlaying ? <Pause className="fill-current w-5 h-5" /> : <Play className="fill-current w-5 h-5 translate-x-0.5" />}
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTrackIndex((idx) => (idx + 1) % worshipTracks.length);
                      setWorshipProgress(0);
                    }}
                    className="p-2.5 bg-white/5 rounded-lg text-white/70 hover:text-brand-gold hover:bg-white/10 transition-colors"
                    title="Next Track"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                </div>

                {/* Volume Slider */}
                <div className="flex items-center gap-2 bg-black/25 px-3 py-1.5 rounded-lg border border-white/5">
                  <VolumeX className="w-3.5 h-3.5 text-white/40" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={worshipVolume}
                    onChange={(e) => setWorshipVolume(Number(e.target.value))}
                    className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                  <Volume2 className="w-3.5 h-3.5 text-purple-400" />
                </div>
              </div>
            </div>

            {/* Playlist Track Selectors */}
            <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
              {worshipTracks.map((track, idx) => {
                const isActive = currentTrackIndex === idx;
                return (
                  <button
                    key={track.id}
                    onClick={() => {
                      setCurrentTrackIndex(idx);
                      setWorshipProgress(0);
                      setIsWorshipPlaying(true);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between transition-all text-xs ${
                      isActive
                        ? "bg-purple-600/10 border-purple-500/40 text-white"
                        : "bg-white/5 border-transparent text-white/60 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-[0.65rem] w-4 ${isActive ? "text-purple-400 font-bold" : "text-white/30"}`}>
                        {isActive && isWorshipPlaying ? "▶" : String(idx + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <span className={`font-medium block ${isActive ? "text-purple-300" : "text-white"}`}>{track.title}</span>
                        <span className="text-[0.65rem] text-white/40 font-light block">{track.album}</span>
                      </div>
                    </div>
                    <span className="font-mono text-[0.65rem] text-white/40">{track.duration}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
