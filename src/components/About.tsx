import React, { useState, useEffect, useRef } from "react";
import { Book, Shield, Users, Flame, Heart, Sparkles, Anchor, ChevronRight, Target, Compass, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function About() {
  const parallaxContainerRef = useRef<HTMLDivElement | null>(null);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const [activeBelief, setActiveBelief] = useState(0);
  const [currentAboutImgIndex, setCurrentAboutImgIndex] = useState(0);

  const aboutImages = [
    {
      url: "https://i.postimg.cc/6QzH0FqH/1.jpg",
      tag: "Nakuru Cathedral Sanctuary",
      category: "Architectural Beacon",
      caption: "The Magnificent 10,000-Seat Temple of Worship",
    },
    {
      url: "https://i.postimg.cc/651MYwC5/7.jpg",
      tag: "Prophetic Altar",
      category: "Altar of Prayer",
      caption: "Encountering God's Power & Prophetic Grace",
    },
    {
      url: "https://i.postimg.cc/Y0Cxzy92/8.jpg",
      tag: "Global Fellowship",
      category: "Kingdom Congregation",
      caption: "Thousands Gathered in One Accord and Worship",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAboutImgIndex((prev) => (prev + 1) % aboutImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const coreBeliefs = [
    {
      id: 0,
      title: "The Holy Scriptures",
      icon: Book,
      ref: "2 Timothy 3:16",
      desc: "We believe the Bible is the inspired, infallible, and authoritative Word of God, serving as our supreme and final rule for faith, doctrine, and daily Christian conduct."
    },
    {
      id: 1,
      title: "The Triune God",
      icon: Shield,
      ref: "Matthew 28:19",
      desc: "We believe in one eternal God, Creator of all things, infinitely perfect and eternally co-existing in three distinct persons: Father, Son, and Holy Spirit."
    },
    {
      id: 2,
      title: "Salvation by Grace",
      icon: Heart,
      ref: "Ephesians 2:8-9",
      desc: "We believe that salvation is a gift from God, received through personal faith in Jesus Christ, His sacrificial death on the cross, His bodily resurrection, and His ascension."
    },
    {
      id: 3,
      title: "The Holy Spirit",
      icon: Flame,
      ref: "Acts 1:8",
      desc: "We believe in the indwelling presence of the Holy Spirit, who convicts of sin, regenerates the heart, empowers believers for holy living, and equips with spiritual gifts."
    },
    {
      id: 4,
      title: "Water Baptism & Communion",
      icon: Anchor,
      ref: "Matthew 28:19, 1 Cor 11:24",
      desc: "We practice water baptism by immersion as an outward confession of inward transformation, and the Holy Communion in remembrance of Christ's broken body and shed blood."
    },
    {
      id: 5,
      title: "Seek Ye First the Kingdom",
      icon: Sparkles,
      ref: "Matthew 6:33",
      desc: "We are deeply committed to seeking first the Kingdom of God and His righteousness. This includes establishing the Altar of Prayer, raising Kingdom leaders, and evangelism."
    }
  ];

  const handleParallaxMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    if (!parallaxContainerRef.current) return;
    const rect = parallaxContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setParallaxOffset({
      x: -x * 25,
      y: -y * 25,
    });
  };

  const handleParallaxMouseLeave = () => {
    setParallaxOffset({ x: 0, y: 0 });
  };

  return (
    <section id="about" className="py-24 px-3 md:px-12 bg-gradient-to-br from-[#0a0010] via-[#1a0636] to-[#0a0010] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Premium Cathedral & Sanctuary Slideshow (Large Preview) */}
          <div className="relative rounded-2xl overflow-hidden h-[420px] sm:h-[500px] lg:h-[550px] w-full shadow-2xl group/img border border-white/10 bg-[#0a0010]">
            {/* Glassmorphic border glow effect */}
            <div className="absolute inset-0 border border-white/10 rounded-2xl z-20 pointer-events-none" />
            
            {/* Cinematic dark gradients for readable captions */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none" />
            
            {/* Slide Images with crossfade & Ken Burns zoom */}
            {aboutImages.map((image, idx) => (
              <div
                key={image.url}
                className="absolute inset-0 transition-opacity duration-1000 ease-in-out will-change-opacity transform-gpu"
                style={{
                  opacity: idx === currentAboutImgIndex ? 1 : 0,
                  zIndex: idx === currentAboutImgIndex ? 5 : 0,
                }}
              >
                <img
                  src={image.url}
                  alt={image.tag}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-transform duration-[5000ms] ease-out will-change-transform transform-gpu ${
                    idx === currentAboutImgIndex ? "scale-105" : "scale-100"
                  }`}
                  loading="lazy"
                />
              </div>
            ))}

            {/* Decorative Corner Accents (Golden brackets) */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-brand-gold/70 z-20" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-brand-gold/70 z-20" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-brand-gold/70 z-20" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-brand-gold/70 z-20" />

            {/* Floating Tag (Changes dynamically) */}
            <div className="absolute top-6 left-6 z-20 bg-black/90 md:bg-black/60 md:backdrop-blur-md px-3.5 py-1.5 rounded-full border border-brand-gold/20 text-[0.68rem] tracking-widest uppercase text-brand-gold font-mono flex items-center gap-1.5 transition-all duration-500">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping" />
              {aboutImages[currentAboutImgIndex].tag}
            </div>

            {/* Embedded caption overlay (Changes dynamically with a smooth fade) */}
            <div className="absolute bottom-6 left-6 right-20 z-20 text-left transition-all duration-500">
              <span className="text-brand-gold text-[0.65rem] font-mono tracking-widest uppercase block mb-1">
                {aboutImages[currentAboutImgIndex].category}
              </span>
              <h4 className="font-serif text-lg sm:text-xl lg:text-2xl font-semibold text-white tracking-tight leading-snug drop-shadow-md">
                {aboutImages[currentAboutImgIndex].caption}
              </h4>
            </div>

            {/* Elegant Interactive Dots Controls on bottom right */}
            <div className="absolute bottom-6 right-6 z-25 flex items-center gap-2">
              {aboutImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentAboutImgIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentAboutImgIndex
                      ? "w-6 bg-brand-gold"
                      : "w-2.5 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Text Story & Content */}
          <div className="flex flex-col text-left">
            <span className="text-brand-gold text-[0.72rem] tracking-[3px] uppercase font-semibold mb-4 block">
              Our Story
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              A Church <span className="text-brand-gold">Built on Faith</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-brand-gold to-transparent mb-8 rounded-full" />
            
            <p className="text-brand-grey text-base md:text-lg leading-[1.8] mb-6 font-light">
              Founded in 2012 by Apostle John Kimani William and Rev. Naomi Kimani, Kingdom Seekers Fellowship has grown from a small room in Nakuru to a congregation of thousands — with over 20 branches across Kenya and a magnificent 10,000-seat auditorium that stands as a landmark of faith in the Rift Valley.
            </p>
            <p className="text-white/70 italic text-sm md:text-base leading-[1.8] mb-10 border-l-2 border-brand-gold/50 pl-4 font-light">
              "From humble beginnings to a movement that spans cities and nations, KSF continues to be a beacon of hope, healing, and transformation across East Africa and beyond."
            </p>

            {/* Statistics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div className="border-l-2 border-brand-gold pl-4 py-1.5">
                <span className="font-serif text-2xl md:text-3xl font-bold text-brand-gold block">
                  20+
                </span>
                <span className="font-sans text-[0.68rem] tracking-wider text-white/60 uppercase mt-1 block">
                  Branches in Kenya
                </span>
              </div>
              <div className="border-l-2 border-brand-gold pl-4 py-1.5">
                <span className="font-serif text-2xl md:text-3xl font-bold text-brand-gold block">
                  10,000
                </span>
                <span className="font-sans text-[0.68rem] tracking-wider text-white/60 uppercase mt-1 block">
                  Seat Auditorium
                </span>
              </div>
              <div className="border-l-2 border-brand-gold pl-4 py-1.5">
                <span className="font-serif text-2xl md:text-3xl font-bold text-brand-gold block">
                  12+
                </span>
                <span className="font-sans text-[0.68rem] tracking-wider text-white/60 uppercase mt-1 block">
                  Years of Ministry
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Premium Living Word Showcase with Interactive Parallax Image */}
        <div className="mt-20 relative rounded-3xl overflow-hidden border border-brand-gold/15 bg-gradient-to-br from-[#120427]/60 to-[#1e073c]/40 p-1 md:p-2 group hover:border-brand-gold/30 transition-all duration-500 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-center p-4 md:p-10">
            
            {/* Interactive Parallax Image Container */}
            <div 
              ref={parallaxContainerRef}
              onMouseMove={handleParallaxMouseMove}
              onMouseLeave={handleParallaxMouseLeave}
              className="lg:col-span-7 relative h-[340px] sm:h-[400px] w-full bg-[#1a0836]/30 rounded-2xl border border-brand-gold/10 overflow-hidden shadow-2xl shadow-black/50 cursor-pointer isolate z-0"
            >
              <img
                src="https://i.postimg.cc/DzYsKyyw/10.jpg"
                alt="The Holy Scriptures"
                referrerPolicy="no-referrer"
                className="absolute inset-0 lg:inset-[-30px] w-full h-full lg:w-[calc(100%+60px)] lg:h-[calc(100%+60px)] object-cover transition-transform duration-500 ease-out pointer-events-none will-change-transform transform-gpu"
                loading="lazy"
                style={{
                  transform: typeof window !== "undefined" && window.innerWidth >= 1024
                    ? `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px) scale(1.08)`
                    : "none",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none z-15" />
              
              {/* Corner Accents */}
              <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-brand-gold/40 z-10 pointer-events-none" />
              <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-brand-gold/40 z-10 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-brand-gold/40 z-10 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-brand-gold/40 z-10 pointer-events-none" />

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/90 md:bg-black/60 md:backdrop-blur-md px-5 py-2 rounded-full border border-brand-gold/20 select-none z-20 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                <span className="font-sans text-[0.68rem] tracking-[2px] uppercase text-brand-gold font-semibold">
                  ◆ Interactive Parallax Depth ◆
                </span>
              </div>
            </div>

            {/* Content info next to the Parallax Image */}
            <div className="lg:col-span-5 text-left flex flex-col justify-center">
              <span className="text-brand-gold text-[0.72rem] tracking-[3px] uppercase font-semibold mb-3 block">
                The Living Word
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight leading-tight">
                Our Foundation of <span className="text-brand-gold">Divine Truth</span>
              </h3>
              
              <div className="w-12 h-1 bg-gradient-to-r from-brand-gold to-transparent mb-6 rounded-full" />
              
              <p className="text-brand-grey text-sm md:text-base font-light leading-relaxed mb-6">
                Kingdom Seekers Fellowship is anchored entirely on the inspired, uncompromised Word of God. As an altar of truth, we seek to write the Holy Scriptures on the hearts of believers, igniting a hunger for personal devotion and kingdom leadership.
              </p>

              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-gold/10 flex items-center justify-center mt-0.5">
                    <span className="text-brand-gold text-[10px]">✔</span>
                  </div>
                  <div>
                    <h5 className="text-white text-xs font-semibold uppercase tracking-wider font-mono">Inspired Scriptures</h5>
                    <p className="text-white/60 text-xs font-light mt-0.5">The Bible is our supreme final rule for faith and daily Christian conduct.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-gold/10 flex items-center justify-center mt-0.5">
                    <span className="text-brand-gold text-[10px]">✔</span>
                  </div>
                  <div>
                    <h5 className="text-white text-xs font-semibold uppercase tracking-wider font-mono">Discipleship & Leadership</h5>
                    <p className="text-white/60 text-xs font-light mt-0.5">Raising believers who seek first the Kingdom and walk in righteousness.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Vision & Mission Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
          {/* Vision */}
          <div className="bg-[#120427]/50 border border-brand-gold/15 p-8 rounded-2xl relative overflow-hidden group hover:border-brand-gold/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-gold/5 to-transparent rounded-full -mr-10 -mt-10 blur-xl group-hover:bg-brand-gold/10 transition-all duration-500" />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/15 flex items-center justify-center border border-brand-gold/30">
                <Target className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <span className="text-[0.68rem] uppercase tracking-widest text-brand-gold/70 block">Our Goal</span>
                <h3 className="font-serif text-xl font-bold text-white">Our Vision</h3>
              </div>
            </div>
            <p className="text-brand-grey text-base leading-[1.7] font-light">
              To make disciples of all nations, teaching them to seek first the Kingdom of God and His righteousness, and to see families, cities, and nations completely transformed by the power of the Gospel.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-brand-gold">
              <span>MATTHEW 6:33</span>
              <span className="w-2 h-2 rounded-full bg-brand-gold/50" />
              <span>MARK 16:15</span>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-[#120427]/50 border border-brand-gold/15 p-8 rounded-2xl relative overflow-hidden group hover:border-brand-gold/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#7000ff]/5 to-transparent rounded-full -mr-10 -mt-10 blur-xl group-hover:bg-[#7000ff]/10 transition-all duration-500" />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#7000ff]/15 flex items-center justify-center border border-[#7000ff]/30">
                <Compass className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <span className="text-[0.68rem] uppercase tracking-widest text-purple-300/70 block">Our Mandate</span>
                <h3 className="font-serif text-xl font-bold text-white">Our Mission</h3>
              </div>
            </div>
            <p className="text-brand-grey text-base leading-[1.7] font-light">
              To raise a global generation of believers fully committed to authentic worship, intense prayer, intercession, and sound biblical teachings, establishing spiritual altars in every sector of society.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-purple-400">
              <span>ISAIAH 58:12</span>
              <span className="w-2 h-2 rounded-full bg-purple-400/50" />
              <span>1 PETER 2:9</span>
            </div>
          </div>
        </div>

        {/* Statement of Faith Section */}
        <div className="mt-28">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-gold text-[0.72rem] tracking-[3px] uppercase font-semibold mb-3 block">
              What We Hold Dear
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              Our Statement of Faith
            </h2>
            <p className="text-brand-grey text-sm md:text-base font-light">
              Our beliefs are rooted deeply in the absolute authority of God's Word. Explore the core theological pillars of Kingdom Seekers Fellowship.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Beliefs List */}
            <div className="lg:col-span-5 space-y-3">
              {coreBeliefs.map((belief) => {
                const IconComponent = belief.icon;
                const isActive = activeBelief === belief.id;
                return (
                  <div
                    key={belief.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveBelief(isActive ? -1 : belief.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setActiveBelief(isActive ? -1 : belief.id);
                      }
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex flex-col gap-1 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 cursor-pointer select-none ${
                      isActive
                        ? "bg-brand-gold/10 border-brand-gold text-white shadow-lg shadow-brand-gold/5"
                        : "bg-[#120427]/30 border-white/5 text-white/70 hover:bg-[#120427]/60 hover:border-white/10 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                        isActive ? "bg-brand-gold/20 text-brand-gold" : "bg-white/5 text-white/50"
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm md:text-base truncate">{belief.title}</h4>
                        <p className="text-[0.68rem] font-mono text-white/40 mt-0.5">{belief.ref}</p>
                      </div>
                      <ChevronRight className={`w-5 h-5 transition-transform duration-300 shrink-0 ${
                        isActive ? "transform rotate-90 text-brand-gold" : "opacity-30"
                      }`} />
                    </div>

                    {/* Expandable card details strictly on mobile view */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="lg:hidden overflow-hidden w-full"
                        >
                          <div className="mt-4 pt-4 border-t border-brand-gold/20 text-left">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-brand-gold font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 bg-brand-gold/10 rounded border border-brand-gold/20">
                                Pillar 0{belief.id + 1}
                              </span>
                            </div>
                            <p className="text-brand-grey text-sm leading-relaxed font-light">
                              {belief.desc}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Active Belief Detail Display (Desktop Only) */}
            <div className="lg:col-span-7 h-full hidden lg:block">
              {(() => {
                const displayBelief = coreBeliefs[activeBelief >= 0 ? activeBelief : 0];
                return (
                  <div className="bg-gradient-to-br from-[#120427]/80 to-[#1e073c]/50 border border-brand-gold/20 p-8 md:p-10 rounded-2xl h-full flex flex-col justify-between relative overflow-hidden min-h-[320px] shadow-2xl">
                    <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-gold/5 rounded-full blur-2xl" />
                    
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-brand-gold font-mono text-xs tracking-widest uppercase px-2.5 py-1 bg-brand-gold/10 rounded-md border border-brand-gold/20">
                          Pillar 0{displayBelief.id + 1}
                        </span>
                        <span className="text-white/40 font-mono text-xs">•</span>
                        <span className="text-white/60 font-mono text-xs tracking-wider">{displayBelief.ref}</span>
                      </div>

                      <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-6">
                        {displayBelief.title}
                      </h3>

                      <p className="text-brand-grey text-base md:text-lg leading-[1.8] font-light">
                        {displayBelief.desc}
                      </p>
                    </div>

                    <div className="mt-10 pt-6 border-t border-white/5 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-brand-gold" />
                      </div>
                      <span className="text-xs text-white/50 italic font-light">
                        "Seeking first the Kingdom of God and His righteousness" — KSF Foundation
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
