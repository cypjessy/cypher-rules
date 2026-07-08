import React, { useState, useEffect, useRef } from "react";
import { X, Play, Volume2, Maximize, Send, MessageSquare } from "lucide-react";

interface Comment {
  id: string;
  name: string;
  location: string;
  message: string;
}

const initialComments: Comment[] = [
  { id: "1", name: "Mercy Wanjiku", location: "Nakuru", message: "Amen! I receive this word of hope!" },
  { id: "2", name: "David Koech", location: "Eldoret", message: "Shalom family! Tuning in live." },
  { id: "3", name: "Pastor Peter", location: "Nairobi Branch", message: "Great is the grace upon our Apostle tonight." },
  { id: "4", name: "Grace Mitchell", location: "Dallas, TX", message: "Listening from Texas, USA! God bless Kingdom Seekers!" },
  { id: "5", name: "John Mwangi", location: "Mombasa", message: "The fire of Kesha is reaching my living room!" },
];

const commentPool = [
  "Glory to Jesus!",
  "Amen and Amen!",
  "Breakthrough is mine tonight!",
  "What a powerful word from Nakuru!",
  "The presence of God is here.",
  "Seeking first the Kingdom of God!",
  "God bless Apostle John Kimani William!",
  "Greetings from Kisumu!",
  "I am healed in Jesus Name!",
  "Thank you MBCI for this broadcast.",
  "Joining from London, UK!",
];

const namesPool = [
  "Charles Omondi", "Sarah Kemunto", "Emmanuel Kiprotich", 
  "Esther Nduta", "Joshua Musyoka", "Jane Atieno",
  "James Ndwiga", "Mary Muthoni", "Robert Kipkemboi"
];

const locationsPool = [
  "Kisumu", "Nyeri", "Naivasha", "Meru", 
  "London", "Nairobi", "Nakuru West", "Molo", "Kericho"
];

interface WatchLiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WatchLiveModal({ isOpen, onClose }: WatchLiveModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(90);
  const [chatInput, setChatInput] = useState("");
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Auto-scrolling simulated chat comments
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = setInterval(() => {
      const randomName = namesPool[Math.floor(Math.random() * namesPool.length)];
      const randomLoc = locationsPool[Math.floor(Math.random() * locationsPool.length)];
      const randomMsg = commentPool[Math.floor(Math.random() * commentPool.length)];

      const newComment: Comment = {
        id: Math.random().toString(),
        name: randomName,
        location: randomLoc,
        message: randomMsg,
      };

      setComments((prev) => [...prev.slice(-30), newComment]);
    }, 3500);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  // Video screen particle visualizer (Spiritual fire waves)
  useEffect(() => {
    if (!canvasRef.current || !isOpen) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: { x: number; y: number; size: number; speedY: number; color: string; alpha: number }[] = [];

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || 640;
      canvas.height = canvas.parentElement?.clientHeight || 360;
    };
    resizeCanvas();

    const createParticle = () => {
      const sizes = [1, 2, 3, 4];
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const x = Math.random() * canvas.width;
      const y = canvas.height + 10;
      const speedY = -(1 + Math.random() * 2);
      
      const colors = ["#D4AF37", "#F0D060", "#3B0A6E", "#7A20C0", "#E0A0FF"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particles.push({ x, y, size, speedY, color, alpha: 0.8 });
    };

    const draw = () => {
      ctx.fillStyle = "rgba(10, 0, 16, 0.2)"; // Ghosting tail trail
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (isPlaying) {
        if (Math.random() < 0.4) createParticle();

        particles.forEach((p, i) => {
          p.y += p.speedY;
          p.alpha -= 0.005;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();

          // remove if faded out or above screen
          if (p.y < 0 || p.alpha <= 0) {
            particles.splice(i, 1);
          }
        });
        ctx.globalAlpha = 1.0;

        // Draw HUD overlay info
        ctx.fillStyle = "rgba(212, 175, 55, 0.7)";
        ctx.font = "bold 11px monospace";
        ctx.fillText("📡 LIVE BROADCSTING | 1080p 60FPS", 20, 30);
        ctx.fillText("🔊 AUDIO DIGITAL DOLBY 5.1", 20, 50);

        // Draw animated sound frequency lines at bottom
        ctx.fillStyle = "rgba(212, 175, 55, 0.35)";
        for (let x = 0; x < canvas.width; x += 10) {
          const barHeight = Math.sin(x * 0.05 + Date.now() * 0.01) * 15 + 20;
          ctx.fillRect(x, canvas.height - barHeight, 6, barHeight);
        }
      } else {
        // Paused screen
        ctx.fillStyle = "#ffffff";
        ctx.font = "20px Georgia";
        ctx.textAlign = "center";
        ctx.fillText("Stream Paused", canvas.width / 2, canvas.height / 2);
        ctx.font = "12px sans-serif";
        ctx.fillText("Click Play to resume active feed.", canvas.width / 2, canvas.height / 2 + 30);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newComment: Comment = {
      id: Math.random().toString(),
      name: "You",
      location: "Nakuru Center",
      message: chatInput.trim(),
    };

    setComments((prev) => [...prev, newComment]);
    setChatInput("");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 md:bg-black/85 md:backdrop-blur-md p-2 sm:p-4 flex justify-center items-center">
      <div className="relative w-full max-w-5xl bg-[#0d001a] border border-brand-gold/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row h-[90vh] lg:h-[70vh] my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-brand-gold transition-colors p-2 z-50 bg-black/80 md:bg-black/50 md:backdrop-blur-md rounded-full border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player Side */}
        <div className="flex-1 relative bg-black flex flex-col justify-between overflow-hidden">
          
          {/* Canvas Stream Box */}
          <div className="flex-1 w-full h-full relative bg-[#0a0010]">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
            
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 md:bg-black/60 md:backdrop-blur-xs">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="bg-brand-gold text-black p-5 rounded-full hover:bg-brand-gold-light hover:scale-105 transition-all"
                >
                  <Play className="fill-current w-8 h-8 translate-x-0.5" />
                </button>
              </div>
            )}
          </div>

          {/* Controls bar */}
          <div className="bg-[#100324] border-t border-white/10 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:text-brand-gold transition-colors"
              >
                {isPlaying ? (
                  <span className="font-bold text-xs bg-brand-gold/15 text-brand-gold px-3 py-1 rounded">PAUSE FEED</span>
                ) : (
                  <span className="font-bold text-xs bg-brand-gold text-[#0a0010] px-3 py-1 rounded">PLAY FEED</span>
                )}
              </button>
              
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-brand-gold" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-16 h-1 bg-white/20 appearance-none cursor-pointer accent-brand-gold rounded"
                />
              </div>
            </div>

            <div className="text-white/80 font-serif italic text-xs md:text-sm truncate max-w-[150px] md:max-w-xs pl-2">
              Sunday Morning Service (Est. 10,000 Capacity)
            </div>

            <button className="text-white hover:text-brand-gold transition-colors">
              <Maximize className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Chat Sidebar */}
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-white/10 bg-[#120526] flex flex-col h-1/2 lg:h-full justify-between">
          
          {/* Sidebar Header */}
          <div className="p-4 border-b border-white/10 bg-brand-purple-dark/50 flex items-center gap-2.5">
            <MessageSquare className="w-4 h-4 text-brand-gold" />
            <h4 className="text-white font-bold text-sm tracking-wide">
              Live Stream Fellowship Chat
            </h4>
          </div>

          {/* Scrolling Messages container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin">
            {comments.map((comm) => (
              <div key={comm.id} className="text-left">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-xs text-brand-gold-light">{comm.name}</span>
                  <span className="text-[0.62rem] text-white/40 uppercase tracking-widest bg-white/5 px-1.5 py-0.5 rounded">
                    {comm.location}
                  </span>
                </div>
                <p className="text-white/85 text-xs leading-relaxed mt-0.5 font-light">
                  {comm.message}
                </p>
              </div>
            ))}
          </div>

          {/* Input field */}
          <form onSubmit={handleSendChat} className="p-4 border-t border-white/10 flex gap-2">
            <input
              type="text"
              placeholder="Send message to church..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 bg-[#180836] border border-white/10 rounded-lg px-3 py-2 text-white text-xs outline-none focus:border-brand-gold"
            />
            <button
              type="submit"
              className="bg-brand-gold text-black p-2 rounded-lg hover:bg-brand-gold-light transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
