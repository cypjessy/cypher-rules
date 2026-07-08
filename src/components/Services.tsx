import React, { useState, useEffect } from "react";
import { Sun, ShieldAlert, Sparkles, Flame, BookOpen, Clock } from "lucide-react";

interface ServiceItem {
  icon: React.ReactNode;
  emoji: string;
  time: string;
  title: string;
  description: string;
}

const servicesList: ServiceItem[] = [
  {
    icon: <Sun className="w-5 h-5 text-brand-gold-light" />,
    emoji: "🌅",
    time: "Mon–Fri • 5:30–7:00 AM",
    title: "Morning Glory",
    description: "Start your day in the presence of God. Daily morning prayers and devotion to ignite your spirit for the day ahead.",
  },
  {
    icon: <Sparkles className="w-5 h-5 text-brand-gold-light" />,
    emoji: "⚡",
    time: "Sunday • 10:00 AM",
    title: "Hour of Power",
    description: "An electrifying Sunday morning session of praise, worship, and prophetic intercession before the main service.",
  },
  {
    icon: <ShieldAlert className="w-5 h-5 text-brand-gold-light" />,
    emoji: "✝️",
    time: "Sunday • 11:00 AM",
    title: "Sunday Morning Worship",
    description: "Our flagship weekly gathering — powerful worship, the Word, and community in a 10,000-seat house of God.",
  },
  {
    icon: <Flame className="w-5 h-5 text-brand-gold-light" />,
    emoji: "🔥",
    time: "Friday • 10:00 PM",
    title: "Friday Night Kesha",
    description: "An all-night prayer vigil of fire and glory. Experience breakthrough, healing, and the supernatural move of God.",
  },
  {
    icon: <BookOpen className="w-5 h-5 text-brand-gold-light" />,
    emoji: "📖",
    time: "Thursday • 7:00 PM",
    title: "Prayer & Bible Study",
    description: "Deep-dive into the Word of God and grow in intercession. Build your faith through scriptural truth and prayer.",
  },
  {
    icon: <Clock className="w-5 h-5 text-brand-gold-light" />,
    emoji: "🙏",
    time: "Daily • Lunchtime",
    title: "Daily Lunchtime Prayers",
    description: "A midday moment of communion with God. Join believers online and in person for a daily pause in His presence.",
  },
];

const bgImages = [
  "https://i.postimg.cc/dVt593hb/4.jpg",
  "https://i.postimg.cc/0QgGhyy0/5.jpg",
  "https://i.postimg.cc/6QZnVxf4/6.jpg"
];

export default function Services() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000); // Transitions smoothly every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="services" className="py-24 px-3 md:px-12 relative overflow-hidden text-white min-h-[800px] flex items-center">
      {/* Auto-playing premium background slideshow with crossfade & Ken Burns zoom */}
      <div className="absolute inset-0 z-0 bg-[#0a0010]">
        {bgImages.map((img, index) => (
          <div
            key={img}
            className="absolute inset-0 transition-all duration-[2000ms] ease-in-out"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: index === currentBgIndex ? 0.55 : 0,
              transform: index === currentBgIndex ? "scale(1.05)" : "scale(1.0)",
            }}
          />
        ))}
      </div>

      {/* Cinematic gradient overlays for extreme visual contrast and readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#0d031c]/40 to-black/75 z-1 pointer-events-none" />

      {/* Luxury ambient purple orb flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-purple/10 blur-[140px] pointer-events-none z-1" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-gold text-[0.72rem] tracking-[4px] uppercase font-bold mb-4 block font-mono">
            Weekly Programs
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            Services & <span className="text-brand-gold">Programs</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-gold to-transparent mx-auto mb-6 rounded-full" />
          <p className="text-brand-grey text-base md:text-lg leading-[1.7] font-light">
            Experience the presence of God throughout the week. Every gathering is an altar of encounter, supernatural breakthrough, and deep covenant community.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => (
            <div
              key={service.title}
              className="group relative bg-[#1c0a35]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:shadow-[0_25px_50px_rgba(212,175,55,0.15)] hover:border-brand-gold/40 hover:bg-[#250d47]/50 overflow-hidden cursor-default"
            >
              {/* Premium hover glow and corner brackets */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 blur-[35px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-purple/20 blur-[25px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-brand-gold/0 group-hover:border-brand-gold/50 transition-all duration-500" />
              <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-brand-gold/0 group-hover:border-brand-gold/50 transition-all duration-500" />
              <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-brand-gold/0 group-hover:border-brand-gold/50 transition-all duration-500" />
              <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-brand-gold/0 group-hover:border-brand-gold/50 transition-all duration-500" />

              {/* Subtle light layer on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/3 via-transparent to-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

              {/* Badge & Emoji Row */}
              <div className="flex justify-between items-center mb-6 relative z-10">
                <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-md text-brand-gold text-[0.72rem] font-semibold px-4 py-1.5 rounded-full border border-white/10 shadow-sm group-hover:bg-brand-gold group-hover:text-brand-purple-dark group-hover:border-brand-gold transition-all duration-300">
                  <span className="text-xs group-hover:scale-125 transition-transform duration-300">⏰</span> {service.time}
                </div>
                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-xl border border-white/10 shadow-inner group-hover:scale-110 group-hover:border-brand-gold/30 group-hover:bg-brand-gold/10 transition-all duration-300">
                  {service.emoji}
                </div>
              </div>

              {/* Readable Heading & Content */}
              <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-brand-gold-light transition-colors duration-300 relative z-10 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/80 block group-hover:scale-150 transition-transform duration-300" />
                {service.title}
              </h3>
              
              <p className="text-brand-grey text-[0.92rem] leading-[1.65] font-light relative z-10 group-hover:text-white transition-colors duration-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
