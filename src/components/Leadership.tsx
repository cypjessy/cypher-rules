interface Leader {
  initials: string;
  avatarBg: string;
  title: string;
  name: string;
  roles: string[];
}

const founders: Leader[] = [
  {
    initials: "JW",
    avatarBg: "from-brand-gold to-[#a07820]",
    title: "Founder & Senior Pastor",
    name: "Apostle John Kimani William",
    roles: [
      "Founder & Senior Pastor, Kingdom Seekers Fellowship",
      "Apostolic Overseer, KSF Global Network (20+ Branches)",
      "Director, MBCI Television & Radio network",
      "Founding Director, Heaven's Gate Prayer Mountain",
      "Pioneer of holistic discipleship and social empowerment programs in Nakuru",
    ],
  },
  {
    initials: "NK",
    avatarBg: "from-brand-gold-light to-[#8a6010]",
    title: "Co-Founder & First Lady",
    name: "Rev. Naomi Kimani",
    roles: [
      "Co-Founder, Kingdom Seekers Fellowship",
      "Women's Ministry Director, KSF Global Women Fellowship",
      "Pillar of prayer, compassion, and charitable outreaches at KSF",
      "Anointed speaker, writer, and mentor to women of grace across East Africa",
      "Ardent advocate for children's holistic faith education",
    ],
  },
];

export default function Leadership() {
  return (
    <section id="leadership" className="py-24 px-3 md:px-12 bg-gradient-to-b from-[#100020] via-brand-purple-dark to-[#100020]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-brand-gold text-[0.72rem] tracking-[3px] uppercase font-bold mb-4 block">
            Our Founders
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            Visionary <span className="text-brand-gold">Leadership</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-gold to-transparent mb-8 rounded-full" />
          <p className="text-brand-grey text-base md:text-lg leading-[1.8] font-light">
            Under anointed apostolic leadership, Kingdom Seekers Fellowship has grown from a pioneering local vision into one of Kenya's most impactful christian movements — touching nations with the pure, uncompromised power of the Gospel.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {founders.map((leader, index) => (
            <div
              key={leader.name}
              className="group relative border border-brand-gold/15 bg-gradient-to-br from-brand-purple/20 to-brand-purple-dark/60 rounded-2xl p-8 md:p-12 transition-all duration-350 overflow-hidden hover:border-brand-gold/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60"
            >
              {/* Subtle spotlight effect inside card */}
              <div
                className={`absolute w-[200px] h-[200px] rounded-full bg-radial from-brand-gold/10 to-transparent pointer-events-none select-none ${
                  index === 0 ? "top-[-60px] right-[-60px]" : "top-[-60px] left-[-60px]"
                }`}
              />

              {/* Avatar circle */}
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${leader.avatarBg} border-3 border-brand-gold/40 flex items-center justify-center font-serif text-3xl font-bold text-black shadow-lg shadow-brand-gold/20 mb-8`}>
                {leader.initials}
              </div>

              {/* Title & Name */}
              <span className="text-brand-gold text-xs font-semibold uppercase tracking-[2px] mb-2 block">
                {leader.title}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-6">
                {leader.name}
              </h3>

              {/* Roles list */}
              <ul className="flex flex-col gap-4 text-left">
                {leader.roles.map((role, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/70 text-[0.92rem] leading-relaxed">
                    <span className="text-brand-gold text-[0.62rem] mt-1.5 flex-shrink-0">◆</span>
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
