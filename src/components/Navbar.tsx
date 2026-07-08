import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenGive: () => void;
}

export default function Navbar({ onOpenGive }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Navigation Bar */}
      <nav
        id="mainNav"
        className={`fixed top-0 left-0 w-full z-40 px-6 py-4 md:px-12 flex items-center justify-between transition-all duration-300 ${
          isScrolled
            ? "bg-[#0a0010]/92 backdrop-blur-md border-b border-brand-gold/15 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <a href="#hero" className="flex items-center gap-3 group focus:outline-none">
          <svg className="w-9 h-9 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 36 36" fill="none">
            <rect x="15" y="2" width="6" height="32" rx="2" fill="#D4AF37" />
            <rect x="4" y="10" width="28" height="6" rx="2" fill="#D4AF37" />
            <circle cx="18" cy="13" r="4" fill="rgba(212,175,55,0.3)" />
          </svg>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold text-brand-gold tracking-wide leading-none">
              Kingdom Seekers
            </span>
            <span className="font-sans text-[0.62rem] text-brand-grey font-medium tracking-[2px] uppercase mt-1 leading-none">
              KSF — Nakuru, Kenya
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-8">
          {["About", "Services", "Ministries", "MBCI Media", "Prayer Mountain", "Visit Us"].map((item) => {
            const anchor = `#${item.toLowerCase().replace("mbci ", "").replace(" ", "-")}`;
            return (
              <li key={item}>
                <a
                  href={anchor}
                  className="text-white/85 hover:text-brand-gold text-sm font-medium tracking-wide transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Give CTA (Desktop) */}
        <div className="hidden lg:block">
          <button
            onClick={onOpenGive}
            className="bg-brand-gold text-[#0a0010] px-6 py-2 rounded font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-brand-gold-light hover:-translate-y-0.5 shadow-md shadow-brand-gold/20"
          >
            Give Online
          </button>
        </div>

        {/* Hamburger (Mobile) */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          className="lg:hidden text-white hover:text-brand-gold transition-colors p-1 z-50 focus:outline-none"
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#060010]/98 z-30 flex flex-col items-center justify-center gap-8 transition-all duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-center gap-6">
          {["About", "Services", "Ministries", "MBCI Media", "Prayer Mountain", "Visit Us"].map((item) => {
            const anchor = `#${item.toLowerCase().replace("mbci ", "").replace(" ", "-")}`;
            return (
              <li key={item} className="text-center">
                <a
                  href={anchor}
                  onClick={() => setIsOpen(false)}
                  className="font-serif text-2xl text-white hover:text-brand-gold transition-colors tracking-wide"
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          onClick={() => {
            setIsOpen(false);
            onOpenGive();
          }}
          className="bg-brand-gold text-[#0a0010] px-8 py-3 rounded-full font-semibold text-base tracking-wide transition-all duration-300 hover:bg-brand-gold-light hover:scale-105 shadow-lg shadow-brand-gold/30 mt-4"
        >
          Give Online
        </button>
      </div>
    </>
  );
}
