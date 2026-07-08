import React, { useState, useEffect } from "react";
import { 
  ChevronRight, 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  User, 
  Mail, 
  Clock, 
  BookOpen, 
  Sparkles, 
  CheckCircle, 
  Send 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ministriesDetailedList, MinistryDetail } from "../data/ministriesData";

export default function Ministries() {
  const [selectedMinistry, setSelectedMinistry] = useState<MinistryDetail | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: ""
  });

  // Handle locking body scroll when full page details are open
  useEffect(() => {
    if (selectedMinistry) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedMinistry]);

  const handleOpenMinistry = (ministry: MinistryDetail) => {
    setSelectedMinistry(ministry);
    setFormSubmitted(false);
    setFormData({ fullName: "", email: "", phone: "", message: "" });
  };

  const handleCloseMinistry = () => {
    setSelectedMinistry(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;
    setFormSubmitted(true);
  };

  return (
    <section id="ministries" className="py-24 px-3 md:px-12 bg-gradient-to-b from-brand-purple-dark via-[#150530] to-brand-purple-dark relative overflow-hidden">
      
      {/* Background Floating Orbs - optimized to hide on mobile to prevent scroll lag */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 hidden md:block">
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-brand-purple/40 filter blur-[80px]" />
        <div className="absolute top-1/2 right-[-80px] w-[250px] h-[250px] rounded-full bg-brand-gold/6 filter blur-[80px]" />
        <div className="absolute bottom-[-60px] left-[40%] w-[200px] h-[200px] rounded-full bg-[#6414a0]/30 filter blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-gold text-[0.72rem] tracking-[3px] uppercase font-bold mb-4 block animate-fade-in">
            Our Ministries
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            Serving Every <span className="text-brand-gold">Season of Life</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-gold to-transparent mx-auto mb-6 rounded-full" />
          <p className="text-brand-grey text-base md:text-lg leading-[1.7] font-light">
            From children to elders, from local streets to distant nations — KSF reaches every generation and every corner of the earth with the love and power of Jesus Christ.
          </p>
        </div>

        {/* Ministries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministriesDetailedList.map((ministry) => (
            <div
              key={ministry.title}
              onClick={() => handleOpenMinistry(ministry)}
              className="group relative bg-[#1c0c3b] border border-brand-gold/15 rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-brand-gold/40 hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer transform-gpu"
            >
              {/* Image Header with Hover Scale */}
              <div className="relative h-48 w-full overflow-hidden bg-brand-purple-dark/40">
                <img
                  src={ministry.image}
                  alt={ministry.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108 will-change-transform transform-gpu"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180836] via-[#180836]/30 to-black/40" />
                
                {/* Emoji Emblem Overlay Tag */}
                <div className="absolute bottom-3 left-4 bg-brand-gold/90 text-black px-2.5 py-1 rounded-md text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md shadow-black/25">
                  <span>{ministry.emoji}</span>
                  <span>Ministry</span>
                </div>
              </div>

              {/* Content area */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg md:text-xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors duration-250">
                    {ministry.title}
                  </h3>
                  <p className="text-white/70 text-[0.84rem] md:text-[0.88rem] leading-[1.65] font-light mb-6">
                    {ministry.shortDesc}
                  </p>
                </div>

                {/* Bottom Interactive Button Badge */}
                <div className="pt-4 border-t border-brand-gold/10 flex items-center justify-between text-xs text-brand-gold font-semibold group-hover:text-brand-gold-light transition-colors duration-250">
                  <span>Learn More & Connect</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-250" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Full-Page Interactive Slide-over Overlay */}
      <AnimatePresence>
        {selectedMinistry && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="fixed inset-0 z-50 bg-[#0c021c] overflow-y-auto text-white"
          >
            {/* Top Navigation Bar (Sticky for luxury UX) */}
            <div className="sticky top-0 z-30 bg-[#0c021c]/95 md:bg-[#0c021c]/90 md:backdrop-blur-md border-b border-white/5 py-4 px-4 md:px-12 flex items-center justify-between">
              <button
                onClick={handleCloseMinistry}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-brand-gold/30 hover:text-brand-gold transition-all text-xs font-semibold cursor-pointer select-none"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Ministries</span>
              </button>
              <div className="flex items-center gap-2">
                <span className="text-brand-gold text-lg">{selectedMinistry.emoji}</span>
                <span className="font-serif font-bold text-sm md:text-base hidden sm:inline">{selectedMinistry.title}</span>
              </div>
              <div className="w-20 sm:block hidden text-right text-[10px] font-mono text-white/40">
                KSF GLOBAL
              </div>
            </div>

            {/* Immersive Hero Header */}
            <div className="relative h-[250px] md:h-[400px] w-full bg-slate-900 overflow-hidden">
              <img
                src={selectedMinistry.image}
                alt={selectedMinistry.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover scale-102"
              />
              {/* Complex high-contrast gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0c021c]/70 to-[#0c021c]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0c021c]/90 via-transparent to-[#0c021c]/90" />
              
              {/* Hero Header Content */}
              <div className="absolute bottom-6 left-0 right-0 max-w-7xl mx-auto px-4 md:px-12 text-left">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-brand-gold bg-brand-gold/10 border border-brand-gold/25 px-2.5 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase">
                    Pillar Division
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="text-white/70 text-xs font-light">{selectedMinistry.emoji} {selectedMinistry.title}</span>
                </div>
                <h1 className="font-serif text-3xl md:text-6xl font-extrabold text-white leading-tight mb-2">
                  {selectedMinistry.title}
                </h1>
                <p className="text-brand-gold text-sm md:text-lg font-light max-w-3xl leading-relaxed">
                  {selectedMinistry.tagline}
                </p>
              </div>
            </div>

            {/* Reading Content Grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
                
                {/* Left Side: Editorial Static Reading Content (7 cols) */}
                <div className="lg:col-span-7 space-y-12 text-left">
                  
                  {/* Deep-Dive Story paragraph */}
                  <div className="space-y-6">
                    <h3 className="font-serif text-2xl font-bold text-white border-b border-brand-gold/20 pb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-brand-gold" />
                      About this Ministry
                    </h3>
                    <p className="text-white/80 text-base md:text-lg leading-[1.8] font-light">
                      {selectedMinistry.fullDesc}
                    </p>
                  </div>

                  {/* Core Pillars Grid */}
                  <div className="space-y-6">
                    <h3 className="font-serif text-2xl font-bold text-white border-b border-brand-gold/20 pb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-brand-gold" />
                      Our Vision & Pillars
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {selectedMinistry.pillars.map((pillar, pIdx) => (
                        <div 
                          key={pIdx} 
                          className="bg-[#180836]/40 border border-white/5 hover:border-brand-gold/20 p-5 rounded-xl transition-all duration-300"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <span className="w-6 h-6 rounded-full bg-brand-gold/15 text-brand-gold text-xs font-mono font-bold flex items-center justify-center border border-brand-gold/20">
                              0{pIdx + 1}
                            </span>
                            <h4 className="font-bold text-white text-base">{pillar.title}</h4>
                          </div>
                          <p className="text-white/70 text-sm font-light leading-relaxed pl-9">
                            {pillar.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sacred Scripture Blockquote */}
                  <div className="relative overflow-hidden bg-gradient-to-r from-brand-gold/10 to-brand-gold/5 border-l-4 border-brand-gold p-6 md:p-8 rounded-r-2xl">
                    <span className="absolute -right-4 -bottom-10 text-[100px] font-serif text-brand-gold/5 select-none pointer-events-none">“</span>
                    <p className="font-serif text-base md:text-lg italic text-white/90 leading-relaxed mb-4">
                      {selectedMinistry.keyVerses.split(" — ")[0]}
                    </p>
                    <span className="text-brand-gold font-mono text-xs tracking-wider block">
                      — {selectedMinistry.keyVerses.split(" — ")[1] || "Holy Bible"}
                    </span>
                  </div>

                </div>

                {/* Right Side: Information widgets & Connection Form (5 cols) */}
                <div className="lg:col-span-5 space-y-8 text-left">
                  
                  {/* Schedule Widget Card */}
                  <div className="bg-[#180836]/90 md:bg-[#180836]/60 md:backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
                    <h4 className="font-serif text-lg font-bold text-white border-b border-white/5 pb-3 mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-brand-gold" />
                      Service & Meeting Times
                    </h4>
                    <div className="space-y-4">
                      {selectedMinistry.meetingSchedule.map((sched, sIdx) => (
                        <div key={sIdx} className="flex gap-4 items-start border-b border-white/5 last:border-0 pb-4 last:pb-0">
                          <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0 mt-0.5">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-bold text-white text-sm block">{sched.day}</span>
                            <span className="text-brand-gold text-xs font-semibold block mt-0.5">{sched.time}</span>
                            <span className="text-white/60 text-xs flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3 text-white/30" />
                              {sched.venue}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ministry Leader Contact Card */}
                  <div className="bg-[#180836]/90 md:bg-[#180836]/60 md:backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-xl flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 border border-brand-gold/20 text-brand-gold rounded-full flex items-center justify-center shrink-0">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-wider text-brand-gold uppercase block">Ministry Lead</span>
                      <h4 className="font-bold text-white text-base leading-tight mt-0.5">{selectedMinistry.leader.name}</h4>
                      <p className="text-white/50 text-xs leading-none mt-1 font-light">{selectedMinistry.leader.role}</p>
                      <a 
                        href={`mailto:${selectedMinistry.leader.contact}`}
                        className="text-brand-gold hover:underline text-xs flex items-center gap-1.5 mt-2 font-medium"
                      >
                        <Mail className="w-3 h-3" />
                        {selectedMinistry.leader.contact}
                      </a>
                    </div>
                  </div>

                  {/* Interactive Get Involved Form */}
                  <div className="bg-gradient-to-br from-[#1d0a3d] to-[#12042b] border border-brand-gold/20 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-full blur-xl" />
                    
                    {!formSubmitted ? (
                      <>
                        <h4 className="font-serif text-xl font-bold text-white mb-2">Get Connected</h4>
                        <p className="text-white/70 text-xs font-light leading-relaxed mb-6">
                          Ready to grow or volunteer? Fill out this brief card to join our active fellowship and coordinate with our leadership.
                        </p>
                        
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                          <div>
                            <label className="text-[10px] font-mono tracking-widest text-brand-gold uppercase block mb-1">Full Name</label>
                            <input 
                              type="text" 
                              required
                              value={formData.fullName}
                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                              placeholder="e.g. Samuel Gichuhi"
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-[10px] font-mono tracking-widest text-brand-gold uppercase block mb-1">Email Address</label>
                              <input 
                                type="email" 
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="name@example.com"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-mono tracking-widest text-brand-gold uppercase block mb-1">Phone Number</label>
                              <input 
                                type="tel" 
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+254 7XX XXX XXX"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] font-mono tracking-widest text-brand-gold uppercase block mb-1">My Interest / Note</label>
                            <textarea 
                              rows={3}
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              placeholder="I'd love to volunteer / join meetings..."
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold resize-none"
                            />
                          </div>

                          <button 
                            type="submit"
                            className="w-full bg-brand-gold text-black hover:bg-brand-gold-light font-bold text-xs uppercase tracking-widest py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-gold/10 transition-all cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Submit Connection Form</span>
                          </button>
                        </form>
                      </>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-8 text-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center mx-auto mb-4 border border-brand-gold/25">
                          <CheckCircle className="w-8 h-8 animate-bounce" />
                        </div>
                        <h4 className="font-serif text-xl font-bold text-white mb-2">Thank You, {formData.fullName.split(" ")[0]}!</h4>
                        <p className="text-white/75 text-sm font-light leading-relaxed max-w-sm mx-auto mb-6">
                          Your connection request for <span className="text-brand-gold font-semibold">{selectedMinistry.title}</span> has been received. {selectedMinistry.leader.name} or a fellowship coordinator will reach out to you via <span className="text-brand-gold font-medium">{formData.email}</span> shortly.
                        </p>
                        <button
                          onClick={() => setFormSubmitted(false)}
                          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:border-brand-gold/30 hover:text-brand-gold text-xs font-semibold cursor-pointer"
                        >
                          Send another message
                        </button>
                      </motion.div>
                    )}

                  </div>

                </div>

              </div>
            </div>

            {/* Sticky footer close helper */}
            <div className="py-12 border-t border-white/5 text-center bg-[#070112]">
              <button 
                onClick={handleCloseMinistry}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-gold text-black hover:bg-brand-gold-light font-bold text-sm shadow-xl transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Ministries Directory</span>
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
