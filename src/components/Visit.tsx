import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { MapPin, Phone, Globe, Clock, Compass, Search, User, Calendar, Map, Layers } from "lucide-react";

export default function Visit() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMapTab, setActiveMapTab] = useState<"3D_MODEL" | "ROAD_MAP" | "SATELLITE_MAP">("SATELLITE_MAP");
  const [activeBranchBg, setActiveBranchBg] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice = window.innerWidth < 1024 || (typeof navigator !== "undefined" && /android|iphone|ipad|ipod|mobi/i.test(navigator.userAgent));
      setIsMobile(isMobileDevice);
      if (isMobileDevice) {
        setActiveMapTab("ROAD_MAP");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const branchBgImages = [
    "https://i.postimg.cc/BQ5BVVtw/21.jpg",
    "https://i.postimg.cc/3rmXkcj8/22.jpg",
    "https://i.postimg.cc/rmWrtDrP/23.jpg"
  ];

  const churchBranches = [
    {
      name: "Nakuru Main Church (Cathedral)",
      pastor: "Apostle John Kimani William",
      location: "Bondeni, near Kanu Street, Nakuru City",
      contact: "+254 111 012200",
      services: "Sunday: 7:00 AM, 9:30 AM & 11:30 AM",
      region: "Rift Valley"
    },
    {
      name: "Nairobi Branch",
      pastor: "Pastor Peter Karanja",
      location: "Umoja, Outering Road, Nairobi",
      contact: "+254 722 000111",
      services: "Sunday: 8:00 AM & 10:30 AM",
      region: "Nairobi / Central"
    },
    {
      name: "Mombasa Branch",
      pastor: "Pastor James Mwangi",
      location: "Mombasa Island, near Ganjoni",
      contact: "+254 733 111222",
      services: "Sunday: 9:00 AM",
      region: "Coast"
    },
    {
      name: "Eldoret Branch",
      pastor: "Pastor David Kiprop",
      location: "Eldoret Town, opposite Town Hall",
      contact: "+254 711 222333",
      services: "Sunday: 8:30 AM & 11:00 AM",
      region: "Rift Valley"
    },
    {
      name: "Kisumu Branch",
      pastor: "Pastor Stephen Onyango",
      location: "Milimani Area, Kisumu",
      contact: "+254 725 333444",
      services: "Sunday: 9:00 AM",
      region: "Western / Nyanza"
    },
    {
      name: "Kitale Branch",
      pastor: "Pastor Grace Wanjiku",
      location: "Kitale Town, near Central Police",
      contact: "+254 712 444555",
      services: "Sunday: 9:00 AM",
      region: "Rift Valley"
    },
    {
      name: "Nyeri Branch",
      pastor: "Pastor Samuel Gichuki",
      location: "Nyeri Town, near King'ong'o",
      contact: "+254 721 555666",
      services: "Sunday: 8:30 AM & 10:45 AM",
      region: "Nairobi / Central"
    },
    {
      name: "Naivasha Branch",
      pastor: "Pastor John Njuguna",
      location: "Naivasha Town, near Lake Road",
      contact: "+254 734 666777",
      services: "Sunday: 9:00 AM",
      region: "Rift Valley"
    }
  ];

  const regions = ["All", "Rift Valley", "Nairobi / Central", "Coast", "Western / Nyanza"];

  const filteredBranches = churchBranches.filter((b) => {
    const matchesRegion = selectedRegion === "All" || b.region === selectedRegion;
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.pastor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  useEffect(() => {
    if (isMobile) return;
    const interval = setInterval(() => {
      setActiveBranchBg((prev) => (prev + 1) % branchBgImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isMobile]);

  useEffect(() => {
    if (activeMapTab !== "3D_MODEL" || !canvasRef.current) return;

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
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 6.2, 10);
    camera.lookAt(0, 0, 0);

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
    const ambLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambLight);

    const dl = new THREE.DirectionalLight(0xffffff, 1.8);
    dl.position.set(5, 10, 5);
    scene.add(dl);

    const purpleL = new THREE.PointLight(0x6020c0, 2, 20);
    purpleL.position.set(-4, 4, 2);
    scene.add(purpleL);

    // Base Box Map representing Nakuru City ground
    const mapGeo = new THREE.BoxGeometry(12, 0.3, 9);
    const mapMat = new THREE.MeshStandardMaterial({
      color: 0xe8e4f8,
      roughness: 0.9,
      metalness: 0,
    });
    const mapBase = new THREE.Mesh(mapGeo, mapMat);
    mapBase.position.y = -0.5;
    scene.add(mapBase);

    // Grid Roads
    const roadMat = new THREE.MeshStandardMaterial({ color: 0xc8c0e8, roughness: 1 });
    const roads = [
      [0, 0, 0.3, 9], // Main center road vertical
      [0, 0, 12, 0.3], // Main center road horizontal
      [-3, -2, 0.2, 5],
      [3, 1.5, 0.2, 5],
      [-2, -3.5, 4, 0.2],
      [2.5, 2.5, 4, 0.2],
    ];
    const roadGeometries: THREE.BoxGeometry[] = [];
    roads.forEach(([x, z, w, d]) => {
      const geo = new THREE.BoxGeometry(w, 0.02, d);
      const road = new THREE.Mesh(geo, roadMat);
      road.position.set(x, -0.34, z);
      scene.add(road);
      roadGeometries.push(geo);
    });

    // Low-poly City blocks (colored buildings)
    const blockColors = [0xd4cff0, 0xc8c4e8, 0xe0daf8, 0xbcb8e0];
    const blockData = [
      [-3, 0, -2, 1],
      [3, 0, 2, 1.2],
      [-2, 0, 2, 0.8],
      [2.5, 0, -2, 1.5],
      [-4.5, 0, -1, 0.9],
      [4, 0, 0.5, 1.1],
      [-1.5, 0, -3.5, 0.7],
      [1, 0, 3.5, 0.8],
      [-3.5, 0, 2.5, 1],
      [3.5, 0, -3, 0.9],
    ];
    const blockGeometries: THREE.BoxGeometry[] = [];
    const blockMaterials: THREE.MeshStandardMaterial[] = [];

    blockData.forEach(([x, _, z, h], i) => {
      const w = 0.6 + Math.random() * 0.4;
      const d = 0.6 + Math.random() * 0.4;
      const geo = new THREE.BoxGeometry(w, h, d);
      const mat = new THREE.MeshStandardMaterial({
        color: blockColors[i % blockColors.length],
        roughness: 0.8,
      });
      const block = new THREE.Mesh(geo, mat);
      block.position.set(x, -0.35 + h / 2, z);
      scene.add(block);

      blockGeometries.push(geo);
      blockMaterials.push(mat);
    });

    // Lake Nakuru representing blue area
    const lakeGeo = new THREE.BoxGeometry(4, 0.05, 2.5);
    const lakeMat = new THREE.MeshStandardMaterial({
      color: 0x8090d0,
      roughness: 0.3,
      metalness: 0.1,
      transparent: true,
      opacity: 0.8,
    });
    const lake = new THREE.Mesh(lakeGeo, lakeMat);
    lake.position.set(-3.5, -0.33, -3);
    scene.add(lake);

    // Interactive Pin Drop Group
    const pinGroup = new THREE.Group();
    const pinSphereGeo = new THREE.SphereGeometry(0.28, 16, 16);
    const pinSphereMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.6,
      roughness: 0.2,
      emissive: 0xd4af37,
      emissiveIntensity: 0.4,
    });
    const pinSphere = new THREE.Mesh(pinSphereGeo, pinSphereMat);
    pinSphere.position.y = 0.3;
    pinGroup.add(pinSphere);

    const pinStemGeo = new THREE.CylinderGeometry(0.04, 0.01, 0.7, 8);
    const pinStemMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.5,
      roughness: 0.3,
    });
    const pinStem = new THREE.Mesh(pinStemGeo, pinStemMat);
    pinStem.position.y = -0.1;
    pinGroup.add(pinStem);

    // Pin Halo expand ring
    const pinRingGeo = new THREE.TorusGeometry(0.5, 0.04, 8, 32);
    const pinRingMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.3,
    });
    const pinRing = new THREE.Mesh(pinRingGeo, pinRingMat);
    pinRing.position.y = 0;
    pinRing.rotation.x = Math.PI / 2;
    pinGroup.add(pinRing);

    pinGroup.position.set(0.5, 4, 0.5); // Start high and drop down
    scene.add(pinGroup);

    // Drop and Bounce Variables
    let pinDropY = 6;
    let pinDropping = true;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (pinDropping) {
        pinDropY -= 0.12;
        if (pinDropY <= 0.6) {
          pinDropY = 0.6;
          pinDropping = false;
        }
        pinGroup.position.y = pinDropY;
      } else {
        // Bouncing idle animation
        pinGroup.position.y = 0.6 + Math.sin(t * 1.5) * 0.12;
        pinSphereMat.emissiveIntensity = 0.3 + Math.sin(t * 3) * 0.2;
        pinRing.scale.setScalar(1 + Math.sin(t * 2.5) * 0.2);
      }

      // Gentle camera scan
      camera.position.x = Math.sin(t * 0.2) * 1.5;
      camera.position.z = 10 + Math.cos(t * 0.15) * 1;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);

      mapGeo.dispose();
      mapMat.dispose();
      roadGeometries.forEach((g) => g.dispose());
      roadMat.dispose();
      blockGeometries.forEach((g) => g.dispose());
      blockMaterials.forEach((m) => m.dispose());
      lakeGeo.dispose();
      lakeMat.dispose();
      pinSphereGeo.dispose();
      pinSphereMat.dispose();
      pinStemGeo.dispose();
      pinStemMat.dispose();
      pinRingGeo.dispose();
      pinRingMat.dispose();

      renderer.dispose();
    };
  }, [activeMapTab]);

  return (
    <>
      <section id="visit-us" className="py-24 px-3 md:px-12 bg-gradient-to-b from-[#110123] to-[#0d011c] text-white relative overflow-hidden">
        {/* Subtle background glow decoration */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
            <span className="text-brand-gold text-[0.72rem] tracking-[3px] uppercase font-bold mb-4 block">
              Find Us
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
              Visit <span className="text-brand-gold">Our Home</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-brand-gold to-transparent mx-auto mb-6 rounded-full" />
            <p className="text-white/70 text-base md:text-lg leading-[1.7] font-light">
              You are always welcome at Kingdom Seekers Fellowship. Come exactly as you are — we have a seat waiting with your name on it.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Interactive Map Section */}
            <div className="flex flex-col w-full bg-[#180836]/90 md:bg-[#180836]/60 md:backdrop-blur-md rounded-2xl border border-brand-gold/15 overflow-hidden shadow-2xl shadow-black/45">
              {/* Map Tab Controllers */}
              <div className="flex bg-[#100322]/95 md:bg-[#100322]/85 md:backdrop-blur-md p-2 border-b border-white/5 gap-2 overflow-x-auto shrink-0">
                <button
                  onClick={() => setActiveMapTab("SATELLITE_MAP")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all shrink-0 cursor-pointer ${
                    activeMapTab === "SATELLITE_MAP"
                      ? "bg-brand-gold text-black shadow-md shadow-brand-gold/15"
                      : "text-white/70 hover:bg-white/5 hover:text-brand-gold"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  3D Satellite Aerial
                </button>
                <button
                  onClick={() => setActiveMapTab("ROAD_MAP")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all shrink-0 cursor-pointer ${
                    activeMapTab === "ROAD_MAP"
                      ? "bg-brand-gold text-black shadow-md shadow-brand-gold/15"
                      : "text-white/70 hover:bg-white/5 hover:text-brand-gold"
                  }`}
                >
                  <Map className="w-3.5 h-3.5" />
                  Live Road Map
                </button>
                <button
                  onClick={() => setActiveMapTab("3D_MODEL")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all shrink-0 cursor-pointer ${
                    activeMapTab === "3D_MODEL"
                      ? "bg-brand-gold text-black shadow-md shadow-brand-gold/15"
                      : "text-white/70 hover:bg-white/5 hover:text-brand-gold"
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  3D Low-Poly Model
                </button>
              </div>

              {/* Map Screen container */}
              <div className="relative h-[340px] sm:h-[420px] w-full bg-slate-950 overflow-hidden">
                {activeMapTab === "ROAD_MAP" && (
                  <iframe
                    title="Kingdom Seekers Fellowship Road Map"
                    src={`https://maps.google.com/maps?q=Kingdom%20Seekers%20Fellowship%2C%20Nakuru%20Kenya&t=&z=${isMobile ? 18 : 16}&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-full border-0 animate-fade-in invert-[90%] hue-rotate-180 brightness-95"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                )}

                {activeMapTab === "SATELLITE_MAP" && (
                  <iframe
                    title="Kingdom Seekers Fellowship Satellite Map"
                    src={`https://maps.google.com/maps?q=Kingdom%20Seekers%20Fellowship%2C%20Nakuru%20Kenya&t=k&z=${isMobile ? 20 : 18}&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-full border-0 animate-fade-in"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                )}

                {activeMapTab === "3D_MODEL" && (
                  <>
                    <canvas ref={canvasRef} className="w-full h-full block animate-fade-in" />
                    <div className="absolute top-4 right-4 bg-brand-gold text-black px-3 py-1 rounded-md text-xs font-bold shadow-md flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "10s" }} />
                      <span>3D Nakuru Center Grid</span>
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#100322]/95 md:bg-[#100322]/90 md:backdrop-blur-md border border-brand-gold/25 px-4 py-1.5 rounded-full shadow-lg text-[0.7rem] uppercase tracking-wider text-brand-gold font-bold select-none text-center whitespace-nowrap">
                      📍 Bondeni Street Center Highlighted
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Visit details contact cards block */}
            <div className="flex flex-col text-left gap-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Location Card */}
                <div className="bg-[#180836]/90 md:bg-[#180836]/45 md:backdrop-blur-md border border-brand-gold/15 rounded-2xl p-6 hover:-translate-y-1 hover:border-brand-gold/30 hover:shadow-2xl hover:shadow-brand-gold/5 transition-all duration-350 group flex flex-col justify-between">
                  <div className="flex gap-4 items-start">
                    <div className="w-11 h-11 bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 border border-brand-gold/30 text-brand-gold rounded-xl flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-bold text-white leading-tight mb-2 group-hover:text-brand-gold transition-colors">
                        Our Location
                      </h4>
                      <p className="text-white/70 text-[0.88rem] leading-relaxed font-light">
                        Bondeni, Nakuru City, Kenya
                        <span className="block text-[0.78rem] text-white/40 mt-1">
                          Near Kanu Street, Nakuru City Centre
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sunday Timings Card */}
                <div className="bg-[#180836]/90 md:bg-[#180836]/45 md:backdrop-blur-md border border-brand-gold/15 rounded-2xl p-6 hover:-translate-y-1 hover:border-brand-gold/30 hover:shadow-2xl hover:shadow-brand-gold/5 transition-all duration-350 group flex flex-col justify-between">
                  <div className="flex gap-4 items-start">
                    <div className="w-11 h-11 bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 border border-brand-gold/30 text-brand-gold rounded-xl flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-bold text-white leading-tight mb-2 group-hover:text-brand-gold transition-colors">
                        Sunday Services
                      </h4>
                      <p className="text-white/70 text-[0.88rem] leading-relaxed font-light">
                        Hour of Power: 10:00 AM
                        <span className="block font-semibold text-brand-gold mt-1">
                          Main Worship: 11:00 AM
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Call Card */}
                <div className="bg-[#180836]/90 md:bg-[#180836]/45 md:backdrop-blur-md border border-brand-gold/15 rounded-2xl p-6 hover:-translate-y-1 hover:border-brand-gold/30 hover:shadow-2xl hover:shadow-brand-gold/5 transition-all duration-350 group flex flex-col justify-between">
                  <div className="flex gap-4 items-start">
                    <div className="w-11 h-11 bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 border border-brand-gold/30 text-brand-gold rounded-xl flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-bold text-white leading-tight mb-2 group-hover:text-brand-gold transition-colors">
                        Call Center
                      </h4>
                      <a href="tel:+254111012200" className="text-brand-gold hover:text-brand-gold-light hover:underline text-[0.92rem] font-bold block mt-1">
                        +254 111 012200
                      </a>
                    </div>
                  </div>
                </div>

                {/* Web Card */}
                <div className="bg-[#180836]/90 md:bg-[#180836]/45 md:backdrop-blur-md border border-brand-gold/15 rounded-2xl p-6 hover:-translate-y-1 hover:border-brand-gold/30 hover:shadow-2xl hover:shadow-brand-gold/5 transition-all duration-350 group flex flex-col justify-between">
                  <div className="flex gap-4 items-start">
                    <div className="w-11 h-11 bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 border border-brand-gold/30 text-brand-gold rounded-xl flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-bold text-white leading-tight mb-2 group-hover:text-brand-gold transition-colors">
                        Web Domain
                      </h4>
                      <a
                        href="https://ksfchurch.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-gold hover:text-brand-gold-light hover:underline text-[0.92rem] font-bold block mt-1"
                      >
                        ksfchurch.com
                      </a>
                    </div>
                  </div>
                </div>

              </div>

              {/* Transport Note Banner */}
              <div className="flex gap-4 items-center bg-brand-gold/10 border border-brand-gold/20 rounded-2xl p-5 mt-4 shadow-lg shadow-black/20">
                <span className="text-3xl select-none">🚌</span>
                <p className="text-white/90 text-sm font-light leading-relaxed">
                  <span className="text-brand-gold font-bold">Free transport</span> is provided to and from church for members in and around Nakuru. Contact the church main office on Sunday morning to arrange pickup from your area.
                </p>
              </div>

              {/* CTA Direction button */}
              <a
                href="https://maps.google.com/?q=Kingdom+Seekers+Fellowship,Nakuru,Kenya"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-gold to-brand-gold/80 hover:from-brand-gold-light hover:to-brand-gold text-black px-8 py-4 rounded-xl font-bold text-sm md:text-base tracking-[0.5px] shadow-lg shadow-brand-gold/10 hover:shadow-xl hover:shadow-brand-gold/20 transition-all duration-300 hover:-translate-y-0.5 mt-2"
              >
                🗺️ Open KSF in Google Maps
              </a>
            </div>

          </div>

        </div>
      </section>

    {/* National Branches Directory - Fully Edge-to-Edge with Dark Theme and Prominent Autoplay Background */}
    <section id="church-branches" className="relative w-full bg-gradient-to-b from-[#120427] to-[#080010] py-24 border-t border-white/5 overflow-hidden">
      
      {/* Autoplay Background Slideshow with pristine visibility, disabled on mobile in favor of premium gradient */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden bg-gradient-to-b from-[#120427] to-[#080010]">
        {!isMobile && branchBgImages.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1500 ease-in-out will-change-[opacity,transform] transform-gpu ${
              index === activeBranchBg ? "opacity-65 scale-102" : "opacity-0 scale-100"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        {/* Advanced edge-to-edge cinematic dark vignette overlays for readability and image highlight */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#120427] via-transparent to-[#120427] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#120427]/75 via-[#120427]/30 to-[#080010]/85" />
      </div>

      {/* Content wrapper - Restricting content width but keeping the background and container edge-to-edge */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-brand-gold text-[0.72rem] tracking-[3px] uppercase font-bold mb-3 block">
            KSF National Network
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Our Church Branches
          </h2>
          <p className="text-white/80 text-sm md:text-base font-light">
            Kingdom Seekers Fellowship has established vibrant altars of worship and prayer in major towns and cities across Kenya. Find a home branch near you.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide border transition-all duration-300 cursor-pointer ${
                  selectedRegion === region
                    ? "bg-brand-gold text-[#100020] border-brand-gold shadow-md shadow-brand-gold/15"
                    : "bg-white/5 text-white/70 border-white/10 hover:border-brand-gold/30 hover:text-brand-gold"
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
            <input
              type="text"
              placeholder="Search branch, pastor, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-white/10 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all bg-white/5 text-white placeholder-white/30"
            />
          </div>
        </div>

        {/* Branches Grid */}
        {filteredBranches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBranches.map((branch, idx) => (
              <div
                key={idx}
                className="bg-[#180836]/95 md:bg-[#180836]/75 md:backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-xl hover:shadow-black/50 hover:border-brand-gold/25 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between text-left group"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-4">
                    <span className="bg-brand-gold/10 text-brand-gold text-[0.65rem] font-bold tracking-wider px-2.5 py-1 rounded-md uppercase border border-brand-gold/10">
                      {branch.region}
                    </span>
                    <span className="text-white/30 text-[0.68rem] font-mono">ID: 0{idx + 1}</span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-white mb-4 line-clamp-1 leading-tight group-hover:text-brand-gold transition-colors duration-250">
                    {branch.name}
                  </h4>

                  <div className="space-y-3 text-[0.85rem] text-white/70 font-light border-b border-white/5 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-brand-gold/60 flex-shrink-0" />
                      <span className="truncate"><strong>Pastor:</strong> {branch.pastor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-brand-gold/60 flex-shrink-0" />
                      <span className="truncate"><strong>Location:</strong> {branch.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-brand-gold/60 flex-shrink-0" />
                      <span className="truncate"><strong>Services:</strong> {branch.services}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[0.82rem]">
                  <span className="text-white/40 font-mono">{branch.contact}</span>
                  <a
                    href={`tel:${branch.contact.replace(/\s+/g, "")}`}
                    className="text-brand-gold font-semibold hover:text-brand-gold-light hover:underline flex items-center gap-0.5"
                  >
                    Call Branch ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/5 border border-dashed border-white/10 rounded-2xl p-12 text-center max-w-md mx-auto">
            <span className="text-3xl">🔍</span>
            <h4 className="font-bold text-white mt-3 mb-1">No Branches Found</h4>
            <p className="text-white/50 text-xs font-light">
              No branches match your search criteria. Try modifying your filter or query.
            </p>
          </div>
        )}
      </div>
    </section>
  </>
  );
}
