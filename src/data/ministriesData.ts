export interface MeetingTime {
  day: string;
  time: string;
  venue: string;
}

export interface MinistryPillar {
  title: string;
  desc: string;
}

export interface MinistryLeader {
  name: string;
  role: string;
  contact: string;
}

export interface MinistryDetail {
  id: string;
  emoji: string;
  title: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  meetingSchedule: MeetingTime[];
  pillars: MinistryPillar[];
  leader: MinistryLeader;
  keyVerses: string;
}

export const ministriesDetailedList: MinistryDetail[] = [
  {
    id: "mens-fellowship",
    emoji: "🦁",
    title: "Men's Fellowship",
    tagline: "Iron Sharpens Iron: Equipping Men to Lead with Integrity",
    shortDesc: "Building men of God — strong in character, rooted in faith, and leading their families and communities with honour.",
    fullDesc: "Our Men’s Fellowship is dedicated to empowering men to live out their divine calling as spiritual leaders in their homes, workplaces, and communities. Inspired by Proverbs 27:17, we provide an environment where men can forge genuine friendships, grow in spiritual maturity, and find support in navigating the unique challenges of modern life. Through weekly breakfasts, monthly seminars, and annual retreats, we build men who lead by example, stand on biblical truths, and leave a lasting godly legacy.",
    image: "https://i.postimg.cc/NjynRL9D/13.jpg",
    meetingSchedule: [
      {
        day: "Saturdays (Fortnightly)",
        time: "7:00 AM - 9:00 AM",
        venue: "Main Sanctuary Hall / KSF Offices"
      },
      {
        day: "Monthly Fellowship Breakfast",
        time: "6:30 AM - 8:30 AM",
        venue: "Grace Chapel Courtyard"
      }
    ],
    pillars: [
      {
        title: "Spiritual Leadership",
        desc: "Teaching men to guide their homes with prayer, love, and sacrificial servant leadership."
      },
      {
        title: "Brotherhood & Integrity",
        desc: "Creating a culture of honesty and accountability where men encourage and build one another up."
      },
      {
        title: "Community Impact",
        desc: "Engaging in hands-on mentorship, community outreach, and structural development of our region."
      }
    ],
    leader: {
      name: "Pastor David Koech",
      role: "Director, Men's Ministry",
      contact: "mensfellowship@ksfchurch.com"
    },
    keyVerses: "As iron sharpens iron, so one man sharpens another. — Proverbs 27:17"
  },
  {
    id: "womens-fellowship",
    emoji: "👑",
    title: "Women's Fellowship",
    tagline: "Daughters of Destiny: Grace, Purpose, and Influence",
    shortDesc: "Empowering women of grace to rise in their God-given purpose, gifts, and influence in home, church, and society.",
    fullDesc: "The KSF Women's Fellowship is a thriving sisterhood designed to uplift and equip women in every stage of life. Whether you are a student, career professional, mother, or grandmother, this ministry is a place of refreshment, discipleship, and spiritual empowerment. We study God's Word together, share life's joys and burdens, and actively engage in transforming our community. Through conferences, wellness talks, and prayer circles, we inspire every woman to walk in her royal identity and godly influence.",
    image: "https://i.postimg.cc/NjynRL9D/13.jpg",
    meetingSchedule: [
      {
        day: "Wednesdays",
        time: "5:30 PM - 7:00 PM",
        venue: "Grace Chapel / Zoom"
      },
      {
        day: "Annual Kesha (Overnight Prayer)",
        time: "9:00 PM - 5:00 AM (Last Friday of May)",
        venue: "Main Cathedral"
      }
    ],
    pillars: [
      {
        title: "Identity in Christ",
        desc: "Restoring and grounding women in their royal position as daughters of the King."
      },
      {
        title: "Family & Nurture",
        desc: "Equipping wives and mothers with practical biblical wisdom to raise godly generations."
      },
      {
        title: "Economic Empowerment",
        desc: "Conducting financial literacy workshops, business seminars, and self-help initiatives to foster self-reliance."
      }
    ],
    leader: {
      name: "Pastor Sarah Mwangi",
      role: "Lead Coordinator, Women's Ministry",
      contact: "womensoffice@ksfchurch.com"
    },
    keyVerses: "She is clothed with strength and dignity; she can laugh at the days to come. — Proverbs 31:25"
  },
  {
    id: "youth-ministry",
    emoji: "⚡",
    title: "Youth Ministry",
    tagline: "The Radical Generation: Burning Bright, Uncompromising",
    shortDesc: "Nurturing the next generation of Kingdom builders — raising radical, on-fire young people who will change the world.",
    fullDesc: "Impact Youth is more than just a weekly gathering; it is a movement of passionate, young, and radical disciples of Christ. We are committed to showing this generation that serving God is exciting, relevant, and powerful. We tackle contemporary issues head-on with raw honesty and biblical truth. Through creative arts, intense worship nights, sporting events, and small cell groups, we provide a vibrant hub where young people can find authentic community, heal from past wounds, and activate their unique spiritual callings.",
    image: "https://i.postimg.cc/vmX6M7bd/15.jpg",
    meetingSchedule: [
      {
        day: "Saturdays",
        time: "2:00 PM - 4:30 PM",
        venue: "Main Church Amphitheater"
      },
      {
        day: "Youth Night Hangouts",
        time: "6:00 PM - 8:30 PM (Bi-monthly)",
        venue: "Youth Lounge & Social Hall"
      }
    ],
    pillars: [
      {
        title: "Authentic Discipleship",
        desc: "Guiding youth through personal Bible studies, structured mentorship, and practical holiness."
      },
      {
        title: "Creative Expression",
        desc: "Harnessing music, drama, digital media, and spoken word to express faith and truth."
      },
      {
        title: "Peer Accountability",
        desc: "Providing safe small groups where teenagers and young adults can grow without fear of judgment."
      }
    ],
    leader: {
      name: "Evangelist John Gichuru",
      role: "Youth Pastor",
      contact: "youth@ksfchurch.com"
    },
    keyVerses: "Don’t let anyone look down on you because you are young, but set an example for the believers in speech, in conduct, in love, in faith and in purity. — 1 Timothy 4:12"
  },
  {
    id: "childrens-church",
    emoji: "🌟",
    title: "Children's Church",
    tagline: "Generations of Promise: Growing in Grace from the Roots Up",
    shortDesc: "A vibrant, safe, and faith-filled environment where children discover God's love and grow in His Word from an early age.",
    fullDesc: "At KSF Kids, we believe that children are not just the church of tomorrow — they are the church of today! Our Children’s Church is designed to make the Bible come alive through high-energy worship, creative drama, interactive storytelling, and age-appropriate small groups. Our certified volunteers and teachers are dedicated to providing a safe, joyful, and clean space where children can cultivate a personal relationship with Jesus, learn the value of prayer, and develop healthy character traits that will guide them for life.",
    image: "https://i.postimg.cc/y65JjYvv/16.jpg",
    meetingSchedule: [
      {
        day: "Sundays (First Service)",
        time: "10:00 AM - 11:15 AM",
        venue: "KSF Children's Center (Block A)"
      },
      {
        day: "Sundays (Second Service)",
        time: "11:30 AM - 1:00 PM",
        venue: "KSF Children's Center (Block B)"
      }
    ],
    pillars: [
      {
        title: "Word Foundations",
        desc: "Embedding solid biblical truths in young hearts through memorization and visual storytelling."
      },
      {
        title: "Worship & Joy",
        desc: "Encouraging authentic expressions of love for God through active dance, singing, and prayer."
      },
      {
        title: "Character Building",
        desc: "Fostering kindness, obedience, and sharing in children’s everyday peer interactions."
      }
    ],
    leader: {
      name: "Teacher Mary Atieno",
      role: "Director, Children's Ministry",
      contact: "kids@ksfchurch.com"
    },
    keyVerses: "Start children off on the way they should go, and even when they are old they will not turn from it. — Proverbs 22:6"
  },
  {
    id: "mbci-missions",
    emoji: "🌍",
    title: "MBCI Missions",
    tagline: "To the Ends of the Earth: Apostolic Church Planting and Discipleship",
    shortDesc: "Reaching every city and nation with the Gospel of the Kingdom. A mandate to plant churches and disciple nations.",
    fullDesc: "MBCI Missions is the heartbeat of KSF’s apostolic mandate. We believe that the Church exists to go out! Guided by the Great Commission, we aggressively coordinate local outreach, regional mission treks, and international missions to plant healthy, self-sustaining churches. We specialize in cross-cultural training, discipling native leaders, and establishing critical social infrastructure — such as clean water wells and schools — alongside spiritual church plants to holistically heal communities.",
    image: "https://i.postimg.cc/4N693RQD/17.jpg",
    meetingSchedule: [
      {
        day: "Monthly Prayer and Planning",
        time: "First Monday of the Month, 6:00 PM",
        venue: "Missions & Logistics Command Center"
      },
      {
        day: "Annual Missions Conference",
        time: "October 12th to 15th",
        venue: "Main Cathedral Complex"
      }
    ],
    pillars: [
      {
        title: "Apostolic Frontiers",
        desc: "Identifying unreached people groups and establishing new altars of worship where there are none."
      },
      {
        title: "Holistic Integration",
        desc: "Providing physical relief, education, and medical aid to support spiritual transformation."
      },
      {
        title: "Native Leadership Training",
        desc: "Discipling, equipping, and ordaining local community leaders to shepherd new church plants."
      }
    ],
    leader: {
      name: "Reverend Peter Kamau",
      role: "Missions & Outreach Director",
      contact: "missions@ksfchurch.com"
    },
    keyVerses: "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit. — Matthew 28:19"
  },
  {
    id: "heavens-gate",
    emoji: "⛰️",
    title: "Heaven's Gate Prayer Mountain",
    tagline: "Unceasing Prayer, Eternal Altars: Finding Sacred Rest and Encounter",
    shortDesc: "A sacred place of encounter, fasting, and divine breakthrough — 25km from Nakuru on the Nairobi Highway.",
    fullDesc: "Heaven's Gate Prayer Mountain is a dedicated physical sanctuary situated in the serene hills overlooking the Great Rift Valley. It is an internationally recognized focal point for seeking God's face in deep prayer and fasting. Tens of thousands of believers visit this mountain annually to withdraw from the noise of the world, fast, and receive divine breakthroughs. With 24/7 active prayer cabins, a main chapel, manicured quiet gardens, and secure accommodation, the mountain remains a burning altar of corporate and personal prayer.",
    image: "https://i.postimg.cc/ZnThFNXM/18.jpg",
    meetingSchedule: [
      {
        day: "Daily General Prayers",
        time: "Open 24/7 (All Year Round)",
        venue: "Gilgil Hills, Off Nakuru-Nairobi Highway"
      },
      {
        day: "Friday Night Vigil (Keshas)",
        time: "10:00 PM - 5:00 AM (Every Friday)",
        venue: "Main Mountain Pavilion"
      }
    ],
    pillars: [
      {
        title: "Intercession Altars",
        desc: "Maintaining constant, unbroken corporate prayers for national revival and global awakening."
      },
      {
        title: "Quiet Meditation Cabinets",
        desc: "Providing fully equipped private rooms for deep, personal fasting and scriptural retreats."
      },
      {
        title: "Deliverance & Spiritual Counsel",
        desc: "On-site pastors available daily to offer biblically sound counsel and deliverance prayers."
      }
    ],
    leader: {
      name: "Pastor Joseph Kipruto",
      role: "Resident Shepherd, Prayer Mountain",
      contact: "heavensgate@ksfchurch.com"
    },
    keyVerses: "For my house will be called a house of prayer for all nations. — Isaiah 56:7"
  },
  {
    id: "church-without-walls",
    emoji: "🎪",
    title: "Church Without Walls",
    tagline: "Sanctuary Unleashed: Streets, Marketplaces, and Untamed Horizons",
    shortDesc: "Taking the Gospel beyond sanctuary borders — reaching the streets, marketplaces, and remote communities with outdoor crusades and cell groups.",
    fullDesc: "We do not believe the church is a building; the church is a people on the move. Church Without Walls is our radical evangelistic engine that breaks through traditional structural barriers. Through open-air crusades, marketplace ministry, university campus invasions, and localized home-cell (Wema) networks, we actively take the healing and saving message of Jesus Christ directly to where people live, work, and gather. We go into the streets to restore the brokenhearted and welcome everyone into the family of God.",
    image: "https://i.postimg.cc/ncP6MNVw/19.jpg",
    meetingSchedule: [
      {
        day: "Thursday & Friday Outdoor Missions",
        time: "3:00 PM onwards (Outreach)",
        venue: "Various Outdoor Centers / Neighborhoods"
      },
      {
        day: "Wema Cell Fellowships",
        time: "Every Tuesday 6:00 PM - 7:30 PM",
        venue: "Localized Home Fellowships"
      }
    ],
    pillars: [
      {
        title: "Outdoor Evangelism",
        desc: "Hosting dynamic neighborhood outdoor crusades with music, sharing, and prayer."
      },
      {
        title: "Wema Cell Groups",
        desc: "Developing microscopic local home fellowship cells that meet weekly for sharing and mutual support."
      },
      {
        title: "Marketplace Invasions",
        desc: "Supporting and discipling working professionals to shine their light in their workplaces."
      }
    ],
    leader: {
      name: "Evangelist Luke Maina",
      role: "Outreach Evangelist Coordinator",
      contact: "cww@ksfchurch.com"
    },
    keyVerses: "Go out to the roads and country lanes and compel them to come in, so that my house will be full. — Luke 14:23"
  },
  {
    id: "media-ministry",
    emoji: "🎥",
    title: "Media Ministry",
    tagline: "Voice of the King: Broadcasting Truth and Life Globally",
    shortDesc: "Amplifying the prophetic voice globally through high-definition television (MBCI TV), online streaming, radio, and digital storytelling.",
    fullDesc: "MBCI Media Ministry is the broadcasting and digital arm of KSF. Operating MBCI TV and Radio, we leverage advanced broadcast technologies to reach millions of households across East Africa and globally via streaming platforms. From running soundboards during Sunday services to video production, scriptwriting, graphic design, and social media management, our media team ensures that the pure, uncompromised Word of God is delivered with highest artistic quality and technical excellence.",
    image: "https://i.postimg.cc/ZRbfwLKF/20.jpg",
    meetingSchedule: [
      {
        day: "Service Live Broadcasting",
        time: "Sundays 8:00 AM - 2:00 PM",
        venue: "MBCI Broadcasting Control Room"
      },
      {
        day: "Creative Production Meetings",
        time: "Every Thursday 2:00 PM - 4:00 PM",
        venue: "MBCI Media Hub"
      }
    ],
    pillars: [
      {
        title: "Technical Excellence",
        desc: "Harnessing latest professional audio, video, lighting, and streaming systems for maximum impact."
      },
      {
        title: "Prophetic Broadcasting",
        desc: "Producing clean, family-friendly talk shows, gospel music programs, and sound sermons."
      },
      {
        title: "Digital Discipleship",
        desc: "Curating easily accessible online video, audio podcasts, and encouraging social media devotionals."
      }
    ],
    leader: {
      name: "Director Daniel Githinji",
      role: "Chief Technical Officer & Producer",
      contact: "media@ksfchurch.com"
    },
    keyVerses: "And this gospel of the kingdom will be preached in the whole world as a testimony to all nations... — Matthew 24:14"
  },
  {
    id: "billboard-of-jesus",
    emoji: "📢",
    title: "Billboard of Jesus",
    tagline: "The Silent Evangelist: Uplifting Christ in the Public Eye",
    shortDesc: "Proclaiming Christ in the public square through inspiring, faith-stirring highway displays that lift high the name of Jesus to millions of commuters.",
    fullDesc: "The Billboard of Jesus is a unique, visionary ministry focused on transforming the visual landscape of our national highways. By erecting large, professionally designed, high-visibility billboards along major transit corridors, we present the beautiful, non-denominational message of Christ’s love and salvation directly to millions of travelers daily. These silent evangelists offer immediate hope to the weary, bring peace in stressful journeys, and serve as prominent constant reminders of God's presence on our roads.",
    image: "https://i.postimg.cc/VNKz5d3f/12.jpg",
    meetingSchedule: [
      {
        day: "Design & Campaign Reviews",
        time: "Quarterly Saturdays, 10:00 AM",
        venue: "Media Boardroom"
      },
      {
        day: "Partner & Intercession Prayer",
        time: "First Saturday of the Month, 4:00 PM",
        venue: "Grace Chapel"
      }
    ],
    pillars: [
      {
        title: "Visual Preaching",
        desc: "Designing simple, high-impact, gospel-centered messages that resonate with diverse audiences."
      },
      {
        title: "Strategic Placement",
        desc: "Securing billboard locations near high-traffic highway junctions and city entry points."
      },
      {
        title: "Prayer Coverage",
        desc: "Commissioning dedicated prayer groups to cover commuter routes and billboard coordinates daily."
      }
    ],
    leader: {
      name: "Elder Samuel Kiprop",
      role: "Project Director, Billboard Ministry",
      contact: "billboard@ksfchurch.com"
    },
    keyVerses: "And I, when I am lifted up from the earth, will draw all people to myself. — John 12:32"
  },
  {
    id: "mercy-ministry",
    emoji: "🤲",
    title: "Mercy Ministry",
    tagline: "Hands and Feet of Jesus: Extending Mercy, Restoring Dignity",
    shortDesc: "Demonstrating the compassion of Jesus by feeding the hungry, supporting orphans and widows, and extending relief to families in crisis.",
    fullDesc: "Mercy Ministry is the social action and relief division of KSF. We translate biblical faith into visible love. Through regular food drives, community soup kitchens, educational scholarships for orphans, widow support cooperatives, and emergency disaster relief, we step directly into the dark corners of poverty and suffering to bring light and practical dignity. Working closely with local governments and volunteers, we ensure that every contribution directly impacts the most vulnerable in our society.",
    image: "https://i.postimg.cc/ncP6MNVw/19.jpg",
    meetingSchedule: [
      {
        day: "Saturday Community Service",
        time: "8:30 AM - 1:00 PM (Every Saturday)",
        venue: "Mercy Distribution Depot (Block C)"
      },
      {
        day: "Widow Support Circle",
        time: "Thursdays 10:00 AM - 12:00 PM",
        venue: "Community Care Annex"
      }
    ],
    pillars: [
      {
        title: "Essential Relief",
        desc: "Providing raw food supplies, clean clothing, and sanitizers to impoverished households."
      },
      {
        title: "Widows & Orphans Care",
        desc: "Running active support groups, counseling, school sponsorship programs, and skill training."
      },
      {
        title: "Crisis Response",
        desc: "Mobilizing swift financial, material, and spiritual support for victims of fire, floods, or sudden loss."
      }
    ],
    leader: {
      name: "Deaconess Jane Waithera",
      role: "Mercy & Humanitarian Coordinator",
      contact: "mercy@ksfchurch.com"
    },
    keyVerses: "Religion that God our Father accepts as pure and faultless is this: to look after orphans and widows in their distress... — James 1:27"
  }
];
