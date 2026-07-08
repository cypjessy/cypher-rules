import { Facebook, Youtube, Flame } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#060010] border-t border-brand-gold/20 pt-16 pb-8 px-6 md:px-12 text-left">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Links grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-brand-gold/10">
          
          {/* Brand Col */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <svg className="w-11 h-11" viewBox="0 0 44 44" fill="none">
                <rect x="19" y="4" width="6" height="36" rx="2" fill="#D4AF37" />
                <rect x="6" y="14" width="32" height="6" rx="2" fill="#D4AF37" />
                <circle cx="22" cy="17" r="5" fill="rgba(212,175,55,0.25)" />
                <circle cx="22" cy="17" r="2" fill="rgba(212,175,55,0.5)" />
              </svg>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-brand-gold tracking-wide leading-none">
                  Kingdom Seekers
                </span>
                <span className="font-sans text-[0.68rem] text-brand-grey font-medium tracking-[2px] uppercase mt-1 leading-none">
                  KSF — Nakuru, Kenya
                </span>
              </div>
            </div>
            <p className="font-serif italic text-white/60 leading-relaxed text-sm">
              "Seek ye first the Kingdom of God,<br />and His righteousness."
            </p>
            
            {/* Social handles with stats */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-lg border border-brand-gold/20 flex items-center justify-center text-brand-grey hover:border-brand-gold hover:text-brand-gold hover:bg-brand-gold/8 transition-all"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-10 h-10 rounded-lg border border-brand-gold/20 flex items-center justify-center text-brand-grey hover:border-brand-gold hover:text-brand-gold hover:bg-brand-gold/8 transition-all"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-10 h-10 rounded-lg border border-brand-gold/20 flex items-center justify-center text-brand-grey hover:border-brand-gold hover:text-brand-gold hover:bg-brand-gold/8 transition-all font-bold"
                >
                  <span className="text-xs">♪</span>
                </a>
              </div>
              <span className="text-white/30 text-[0.72rem] tracking-wider uppercase font-semibold">
                📘 Facebook: 87K+ Followers
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-[1.1rem] font-semibold text-brand-gold pb-2 border-b border-brand-gold/15 mb-6">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { name: "About KSF", url: "#about" },
                { name: "Services", url: "#services" },
                { name: "Ministries", url: "#ministries" },
                { name: "MBCI Media", url: "#media" },
                { name: "Prayer Mountain", url: "#prayer-mountain" },
                { name: "Visit Us", url: "#visit-us" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    className="text-white/55 hover:text-brand-gold text-sm tracking-wide transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Fellowships */}
          <div>
            <h4 className="font-serif text-[1.1rem] font-semibold text-brand-gold pb-2 border-b border-brand-gold/15 mb-6">
              Ministries
            </h4>
            <ul className="flex flex-col gap-3">
              {["Men's Fellowship", "Women's Fellowship", "Youth Ministry", "Children's Church", "MBCI Missions", "Heaven's Gate"].map((item) => (
                <li key={item}>
                  <span className="text-white/55 text-sm tracking-wide block">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="font-serif text-[1.1rem] font-semibold text-brand-gold pb-2 border-b border-brand-gold/15 mb-6">
              Contact
            </h4>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Bondeni Area, Nakuru City<br />
              Kenya<br />
              East Africa
            </p>
            <p className="text-sm">
              <a href="tel:+254111012200" className="text-brand-gold font-bold hover:underline">
                +254 111 012200
              </a>
              <span className="block mt-2">
                <a href="mailto:info@ksfchurch.com" className="text-white/40 hover:text-brand-gold hover:underline">
                  info@ksfchurch.com
                </a>
              </span>
            </p>
          </div>

        </div>

        {/* Bottom copyright and scripture bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-serif italic text-brand-gold/60 text-sm md:text-base max-w-xl leading-relaxed">
            "Seek ye first the Kingdom of God, and all these things shall be added unto you." — Matthew 6:33
          </p>
          <p className="text-white/30 text-xs tracking-wider uppercase font-semibold">
            © {new Date().getFullYear()} Kingdom Seekers Fellowship. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
