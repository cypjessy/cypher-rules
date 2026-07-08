import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Ministries from "./components/Ministries";
import Media from "./components/Media";
import Mountain from "./components/Mountain";
import Leadership from "./components/Leadership";
import Visit from "./components/Visit";
import Footer from "./components/Footer";
import GiveModal from "./components/GiveModal";
import WatchLiveModal from "./components/WatchLiveModal";

export default function App() {
  const [isGiveOpen, setIsGiveOpen] = useState(false);
  const [isWatchLiveOpen, setIsWatchLiveOpen] = useState(false);

  const openGiveModal = () => setIsGiveOpen(true);
  const closeGiveModal = () => setIsGiveOpen(false);

  const openWatchLiveModal = () => setIsWatchLiveOpen(true);
  const closeWatchLiveModal = () => setIsWatchLiveOpen(false);

  // Preload and cache all major image assets to prevent network fetches on scroll
  useEffect(() => {
    const imagesToPreload = [
      "https://i.postimg.cc/dVt593hb/4.jpg",
      "https://i.postimg.cc/0QgGhyy0/5.jpg",
      "https://i.postimg.cc/6QZnVxf4/6.jpg",
      "https://i.postimg.cc/6QzH0FqH/1.jpg",
      "https://i.postimg.cc/651MYwC5/7.jpg",
      "https://i.postimg.cc/Y0Cxzy92/8.jpg",
      "https://i.postimg.cc/DzYsKyyw/10.jpg",
      "https://i.postimg.cc/BQ5BVVtw/21.jpg",
      "https://i.postimg.cc/3rmXkcj8/22.jpg",
      "https://i.postimg.cc/rmWrtDrP/23.jpg",
      "https://i.postimg.cc/NjynRL9D/13.jpg",
      "https://i.postimg.cc/vmX6M7bd/15.jpg",
      "https://i.postimg.cc/y65JjYvv/16.jpg",
      "https://i.postimg.cc/4N693RQD/17.jpg",
      "https://i.postimg.cc/ZnThFNXM/18.jpg",
      "https://i.postimg.cc/ncP6MNVw/19.jpg",
      "https://i.postimg.cc/ZRbfwLKF/20.jpg",
      "https://i.postimg.cc/VNKz5d3f/12.jpg"
    ];

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (

    <div className="relative min-h-screen bg-[#0a0010] text-white selection:bg-brand-gold selection:text-black">
      
      {/* Navigation Header */}
      <Navbar onOpenGive={openGiveModal} />

      {/* Hero Section */}
      <Hero onOpenWatchLive={openWatchLiveModal} />

      {/* About Section */}
      <About />

      {/* Services Section */}
      <Services />

      {/* Ministries Section */}
      <Ministries />

      {/* MBCI Media Section */}
      <Media />

      {/* Heaven's Gate Prayer Mountain Section */}
      <Mountain />

      {/* Leadership Section */}
      <Leadership />

      {/* Visit Us Section */}
      <Visit />

      {/* Footer Section */}
      <Footer />

      {/* Floating Watch Live Action Button (Restored from user's original design) */}
      <button
        onClick={openWatchLiveModal}
        className="fixed bottom-4 right-4 md:bottom-7 md:right-7 z-30 bg-brand-gold text-black px-4 py-2.5 md:px-6 md:py-3.5 rounded-full font-bold text-[10px] md:text-sm tracking-widest uppercase flex items-center gap-1.5 md:gap-2 shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:bg-brand-gold-light hover:-translate-y-0.5 hover:scale-103 transition-all duration-300 cursor-pointer select-none float-watch-pulse"
        style={{
          boxShadow: "0 4px 20px rgba(212,175,55,0.4)",
          animation: "btnPulse 2.5s ease-in-out infinite",
        }}
      >
        <span className="text-[10px]">▶</span> Watch Live Stream
      </button>

      {/* Give Online Modal Popup */}
      <GiveModal isOpen={isGiveOpen} onClose={closeGiveModal} />

      {/* Live Stream Stream Fellowship Modal Popup */}
      <WatchLiveModal isOpen={isWatchLiveOpen} onClose={closeWatchLiveModal} />

    </div>
  );
}
