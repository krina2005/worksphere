"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  Compass,
  Layers,
  Heart,
  User,
  Search,
  ExternalLink,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Laptop,
  Globe,
  Award,
  ChevronRight,
  Filter,
  UserCheck,
  Trash2,
  Info,
  X,
  Mic,
  Smartphone,
  Check
} from "lucide-react";

// Platform Type
interface Platform {
  id: string;
  name: string;
  description: string;
  logoColor: string;
  logoSvg: React.ReactNode;
  tags: string[];
  category: "internships" | "remote" | "freshers" | "freelancing" | "startup" | "corporate";
  url: string;
  rating: number;
  established: string;
  isPopular?: boolean;
}

// Wallpaper Type
interface Wallpaper {
  id: string;
  name: string;
  bgClass: string;
  lineColor: string;
  isDark: boolean;
  textColor: string;
  subTextColor: string;
  cardBg: string;
  accentColor: string;
  glowColor: string;
}

export default function WorkshereHome() {
  // Wallpaper Gallery Themes
  const wallpapers: Wallpaper[] = [
    {
      id: "mint-wave",
      name: "Mint Wave",
      bgClass: "from-[#dcefe3] via-[#ccead3] to-[#bde5c5]",
      lineColor: "rgba(255, 255, 255, 0.45)",
      isDark: false,
      textColor: "text-[#1b3d26]",
      subTextColor: "text-[#2e5d3c]/85",
      cardBg: "bg-white/55 border-white/50 shadow-emerald-950/5 text-[#1b3d26]",
      accentColor: "#10b981",
      glowColor: "rgba(16, 185, 129, 0.12)"
    },
    {
      id: "midnight-aurora",
      name: "Midnight Aurora",
      bgClass: "from-[#080614] via-[#0d0922] to-[#160d36]",
      lineColor: "rgba(99, 102, 241, 0.15)",
      isDark: true,
      textColor: "text-zinc-100",
      subTextColor: "text-zinc-400",
      cardBg: "bg-[#140e2d]/60 border-indigo-500/10 shadow-black/40 text-zinc-100",
      accentColor: "#6366f1",
      glowColor: "rgba(99, 102, 241, 0.12)"
    },
    {
      id: "cyber-glow",
      name: "Cyber Glow",
      bgClass: "from-[#030008] via-[#0a0216] to-[#160025]",
      lineColor: "rgba(236, 72, 153, 0.15)",
      isDark: true,
      textColor: "text-zinc-100",
      subTextColor: "text-zinc-400",
      cardBg: "bg-purple-950/20 border-purple-500/10 shadow-black/60 text-zinc-100",
      accentColor: "#d946ef",
      glowColor: "rgba(217, 70, 239, 0.12)"
    },
    {
      id: "sunset-glow",
      name: "Sunset Glow",
      bgClass: "from-[#fff3eb] via-[#ffe0cc] to-[#ffd0b3]",
      lineColor: "rgba(255, 255, 255, 0.55)",
      isDark: false,
      textColor: "text-[#4a1d00]",
      subTextColor: "text-[#6e3713]/85",
      cardBg: "bg-white/60 border-white/60 shadow-orange-950/5 text-[#4a1d00]",
      accentColor: "#f97316",
      glowColor: "rgba(249, 115, 22, 0.12)"
    }
  ];

  const [activeTab, setActiveTab] = useState<"home" | "discover" | "categories" | "favorites" | "profile">("home");
  const [activeWallpaper, setActiveWallpaper] = useState<Wallpaper>(wallpapers[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [swipeIndex, setSwipeIndex] = useState(0);
  const [swipeLikes, setSwipeLikes] = useState<Record<string, boolean>>({});
  const [hiddenPlatforms, setHiddenPlatforms] = useState<string[]>([]);

  // Selected Platform Details Modal
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);

  // Questionnaire Modal State
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState<"intro" | "role" | "type" | "results">("intro");
  const [userRole, setUserRole] = useState<"student" | "fresher" | "experienced" | "">("");
  const [userJobType, setUserJobType] = useState<"internship" | "fulltime" | "freelance" | "remote" | "">("");
  const [recommendedPlatforms, setRecommendedPlatforms] = useState<Platform[]>([]);

  // Static list of platforms with custom SVG logos
  const platforms: Platform[] = [
    {
      id: "linkedin",
      name: "LinkedIn",
      description: "The world's largest professional network. Excellent for corporate jobs, direct outreach, networking, and thought leadership.",
      logoColor: "from-blue-600 to-blue-800",
      logoSvg: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-white">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      tags: ["Networking", "Global Jobs", "Experienced"],
      category: "corporate",
      url: "https://www.linkedin.com",
      rating: 4.8,
      established: "2003",
      isPopular: true
    },
    {
      id: "internshala",
      name: "Internshala",
      description: "India's premier portal for internships and entry-level jobs. Features verified stipends, remote/in-office projects, and skill training.",
      logoColor: "from-orange-500 to-amber-600",
      logoSvg: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2 text-white">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      ),
      tags: ["Internships", "Freshers", "Student-friendly"],
      category: "internships",
      url: "https://internshala.com",
      rating: 4.5,
      established: "2010",
      isPopular: true
    },
    {
      id: "wellfound",
      name: "Wellfound",
      description: "Formerly AngelList Talent. The best place to find high-growth startup opportunities, equity-based compensation, and remote tech jobs.",
      logoColor: "from-zinc-900 to-zinc-950 border border-zinc-800",
      logoSvg: (
        <span className="text-white font-black text-lg tracking-tighter">W</span>
      ),
      tags: ["Startup Jobs", "Equity", "Tech", "Remote"],
      category: "startup",
      url: "https://wellfound.com",
      rating: 4.6,
      established: "2013"
    },
    {
      id: "unstop",
      name: "Unstop",
      description: "A dynamic playground for early-career talents. Discover top hackathons, corporate challenges, university competitions, and recruitment tests.",
      logoColor: "from-blue-500 to-indigo-600",
      logoSvg: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-white">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
      ),
      tags: ["Hackathons", "Freshers", "Competitions"],
      category: "freshers",
      url: "https://unstop.com",
      rating: 4.4,
      established: "2017",
      isPopular: true
    },
    {
      id: "naukri",
      name: "Naukri",
      description: "India's largest corporate resume aggregation engine. Highly recommended for standard IT, sales, operations, and experienced positions.",
      logoColor: "from-sky-700 to-blue-900",
      logoSvg: (
        <span className="text-white font-extrabold text-sm font-mono">N</span>
      ),
      tags: ["Corporate Jobs", "Resume Search", "All Sectors"],
      category: "corporate",
      url: "https://www.naukri.com",
      rating: 4.2,
      established: "1997"
    },
    {
      id: "indeed",
      name: "Indeed",
      description: "A lightweight, super-fast global job search aggregator. Crawls corporate sites, agencies, and career boards into a clean search screen.",
      logoColor: "from-blue-600 to-cyan-600",
      logoSvg: (
        <span className="text-white font-black text-lg">i</span>
      ),
      tags: ["Aggregator", "Global", "Easy Apply"],
      category: "corporate",
      url: "https://www.indeed.com",
      rating: 4.3,
      established: "2004"
    },
    {
      id: "fiverr",
      name: "Fiverr",
      description: "A popular, gig-based services marketplace. Package your digital design, copywriting, coding, or video projects into fixed-price 'gigs'.",
      logoColor: "from-emerald-500 to-green-600",
      logoSvg: (
        <span className="text-white font-bold text-sm">fi</span>
      ),
      tags: ["Freelancing", "Gig Market", "Creative"],
      category: "freelancing",
      url: "https://www.fiverr.com",
      rating: 4.4,
      established: "2010"
    },
    {
      id: "upwork",
      name: "Upwork",
      description: "The world's premium freelancing workspace. Bid on long-term client contracts, find project-based gigs, and secure escrow payments.",
      logoColor: "from-green-600 to-emerald-700",
      logoSvg: (
        <span className="text-white font-black text-sm">up</span>
      ),
      tags: ["Freelancing", "Contracts", "Hourly Rates"],
      category: "freelancing",
      url: "https://www.upwork.com",
      rating: 4.7,
      established: "2015",
      isPopular: true
    },
    {
      id: "freelancer",
      name: "Freelancer",
      description: "A global marketplace for custom project bidding, contests, and technical micro-tasks across software, design, writing, and marketing.",
      logoColor: "from-sky-500 to-indigo-500",
      logoSvg: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-white">
          <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.784 1.4 8.167L12 18.896l-7.334 3.865 1.4-8.167L.133 9.21l8.2-1.192z" />
        </svg>
      ),
      tags: ["Bidding", "Contests", "Micro-tasks"],
      category: "freelancing",
      url: "https://www.freelancer.com",
      rating: 4.0,
      established: "2009"
    },
    {
      id: "remoteok",
      name: "Remote OK",
      description: "A leading international hub for remote work. Browse verified software development, design, customer support, and writing roles worldwide.",
      logoColor: "from-rose-500 to-orange-600",
      logoSvg: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-white">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      ),
      tags: ["Remote Work", "Tech Roles", "Global Hires"],
      category: "remote",
      url: "https://remoteok.com",
      rating: 4.6,
      established: "2015",
      isPopular: true
    }
  ];

  // Synthesized sounds using Web Audio API for soft UI click sounds
  const playSound = (type: "click" | "success" | "pop") => {
    if (typeof window === "undefined") return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "click") {
        osc.frequency.setValueAtTime(450, ctx.currentTime);
        gain.gain.setValueAtTime(0.015, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      } else if (type === "success") {
        const now = ctx.currentTime;
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
        osc.start();
        osc.stop(now + 0.35);
      } else if (type === "pop") {
        osc.frequency.setValueAtTime(580, ctx.currentTime);
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch (e) {
      console.warn("Audio Context blocked or not supported", e);
    }
  };

  // Load favorites & wallpaper from local storage
  useEffect(() => {
    setIsMounted(true);
    const storedFavs = localStorage.getItem("workshere_favorites");
    if (storedFavs) {
      setFavorites(JSON.parse(storedFavs));
    }
    const storedWallpaper = localStorage.getItem("workshere_wallpaper");
    if (storedWallpaper) {
      const found = wallpapers.find((w) => w.id === storedWallpaper);
      if (found) setActiveWallpaper(found);
    }
  }, []);

  const toggleFavorite = (id: string) => {
    playSound("click");
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter((fav) => fav !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem("workshere_favorites", JSON.stringify(updated));
  };

  const changeWallpaper = (wallpaper: Wallpaper) => {
    playSound("pop");
    setActiveWallpaper(wallpaper);
    localStorage.setItem("workshere_wallpaper", wallpaper.id);
  };

  // Recommendations Matching Algorithm
  const runRecommendationQuiz = () => {
    playSound("success");
    let scores = platforms.map((platform) => {
      let score = 0;
      
      // Match Role Level
      if (userRole === "student") {
        if (platform.tags.includes("Student-friendly") || platform.category === "internships") score += 5;
      } else if (userRole === "fresher") {
        if (platform.tags.includes("Freshers") || platform.category === "internships") score += 4;
      } else if (userRole === "experienced") {
        if (platform.category === "corporate" || platform.category === "startup") score += 4;
      }

      // Match Work Preference Type
      if (userJobType === "internship") {
        if (platform.category === "internships") score += 6;
      } else if (userJobType === "freelance") {
        if (platform.category === "freelancing") score += 6;
      } else if (userJobType === "remote") {
        if (platform.category === "remote" || platform.tags.includes("Remote")) score += 6;
      } else if (userJobType === "fulltime") {
        if (platform.category === "corporate" || platform.category === "startup") score += 5;
      }

      return { platform, score };
    });

    const sortedMatches = scores
      .filter((s) => s.score > 2)
      .sort((a, b) => b.score - a.score)
      .map((s) => s.platform);

    setRecommendedPlatforms(sortedMatches.slice(0, 4));
    setQuizStep("results");
  };

  // Filtering platforms based on Search Query
  const filteredPlatforms = platforms.filter((p) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tags.some((t) => t.toLowerCase().includes(query));

    if (selectedCategoryFilter === "all") return matchesSearch;
    return matchesSearch && p.category === selectedCategoryFilter;
  });

  // Filter out hidden platforms from the Discover swiper deck
  const discoverDeckPlatforms = platforms.filter((p) => !hiddenPlatforms.includes(p.id));

  // Render Honor-style background curves and lines
  const renderSpiralBackground = (color: string) => {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
        <g stroke={color} strokeWidth="1.2" fill="none" opacity="0.7">
          {Array.from({ length: 30 }).map((_, i) => {
            const rx = 180 + i * 16;
            const ry = 300 + i * 10;
            const cx = 500 + Math.sin(i * 0.08) * 60;
            const cy = 680 - i * 12;
            return (
              <ellipse
                key={i}
                cx={cx}
                cy={cy}
                rx={rx}
                ry={ry}
                transform={`rotate(${30 + i * 1.8} ${cx} ${cy})`}
                className="transition-all duration-700"
              />
            );
          })}
        </g>
      </svg>
    );
  };

  if (!isMounted) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#06040d]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
          <p className="text-zinc-500 font-mono text-sm">Booting Workshere Launcher...</p>
        </div>
      </div>
    );
  }

  // AI Suggestions Folder Platforms (Matches 4 top platforms)
  const aiSuggestions = platforms.slice(0, 4);

  // Dock Platforms (Row of 4 icons at bottom of launcher)
  const dockPlatforms = [
    platforms[0], // LinkedIn
    platforms[1], // Internshala
    platforms[7], // Upwork
    platforms[9]  // Remote OK
  ];

  return (
    <div className="w-full h-dvh bg-[#07060f] flex items-center justify-center overflow-hidden font-sans select-none relative">
      
      {/* Background glow behind phone screen */}
      <div
        className="absolute inset-0 filter blur-[150px] opacity-15 pointer-events-none transition-all duration-1000"
        style={{ backgroundColor: activeWallpaper.accentColor }}
      ></div>

      {/* Main mockup device frame container (centered on desktop, full-screen on mobile) */}
      <div className={`relative w-full h-full md:max-w-[420px] md:h-[840px] md:rounded-[40px] md:border-[10px] md:border-zinc-900 md:shadow-2xl overflow-hidden flex flex-col bg-gradient-to-b ${activeWallpaper.bgClass} transition-all duration-700`}>
        
        {/* Draw the visual wavy Honor swirl lines in the background */}
        {renderSpiralBackground(activeWallpaper.lineColor)}

        {/* Mobile Header Bar */}
        <header className={`p-4 pb-2 flex items-center justify-between z-30 shrink-0 ${activeWallpaper.isDark ? "text-zinc-100" : "text-emerald-950"}`}>
          <div className="flex items-center gap-1.5">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-md">
              <Compass className="h-4 w-4 text-white" />
            </div>
            <span className="font-sans font-black tracking-tight text-sm uppercase">
              workshere
            </span>
          </div>
        </header>

        {/* Tab Contents Frame */}
        <div className="flex-grow overflow-y-auto px-4 pb-28 pt-2 z-20 scrollbar-none">
          
          {/* TAB 1: SMARTPHONE HOME SCREEN LANUCHER */}
          {activeTab === "home" && (
            <div className="space-y-6 animate-slide-up">
              
              {/* Google style Search Widget */}
              <div className="relative flex items-center w-full px-4.5 py-3 rounded-full bg-white/70 border border-white/80 shadow-md focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                {/* Google-like colored G letter */}
                <div className="flex items-center justify-center font-black text-sm shrink-0 mr-3">
                  <span className="text-blue-500">G</span>
                  <span className="text-red-500">o</span>
                  <span className="text-yellow-500">o</span>
                  <span className="text-blue-500">g</span>
                  <span className="text-green-500">l</span>
                  <span className="text-red-500">e</span>
                </div>
                <input
                  type="text"
                  placeholder="Search career apps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-xs font-semibold text-emerald-950 placeholder-emerald-900/50 focus:outline-none"
                />
                <div className="flex items-center gap-2 text-emerald-900/60 shrink-0 ml-2">
                  <Mic className="h-4 w-4" />
                </div>
              </div>

              {/* Search suggestions tags */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mt-3 px-1 scrollbar-none text-[9px] font-semibold opacity-90">
                <span className="opacity-50 shrink-0">Quick suggestions:</span>
                {[
                  { tag: "remote", label: "Remote" },
                  { tag: "intern", label: "Internships" },
                  { tag: "startup", label: "Startups" },
                  { tag: "upwork", label: "Upwork" }
                ].map((item) => (
                  <button
                    key={`search-tag-${item.tag}`}
                    onClick={() => { playSound("click"); setSearchQuery(item.tag); }}
                    className="px-2.5 py-0.5 bg-white/30 border border-white/45 rounded-full text-emerald-950 hover:bg-white/50 transition-colors shrink-0"
                  >
                    {item.label}
                  </button>
                ))}
                {searchQuery && (
                  <button
                    onClick={() => { playSound("pop"); setSearchQuery(""); }}
                    className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 shrink-0 font-bold"
                  >
                    Clear x
                  </button>
                )}
              </div>

              {/* AI Suggestions Folder (Similar to the image folder) */}
              <div className={`${activeWallpaper.cardBg} backdrop-blur-xl p-4 rounded-3xl border shadow-lg space-y-3`}>
                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                    AI Suggestions
                  </span>
                  <button
                    onClick={() => { playSound("click"); setQuizStep("intro"); setIsQuizOpen(true); }}
                    className="text-[9px] font-extrabold flex items-center gap-1 text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full"
                  >
                    <Sparkles className="h-3 w-3" /> Matchmaker
                  </button>
                </div>
                
                {/* 4x2 or 4x1 App folder grid */}
                <div className="grid grid-cols-4 gap-3 text-center">
                  {aiSuggestions.map((plat) => (
                    <button
                      key={`suggest-${plat.id}`}
                      onClick={() => { playSound("click"); setSelectedPlatform(plat); }}
                      className="flex flex-col items-center gap-1.5 focus:outline-none group"
                    >
                      <div className={`h-11 w-11 rounded-2xl bg-gradient-to-tr ${plat.logoColor} flex items-center justify-center shadow-md transform transition-transform group-hover:scale-105 active:scale-95 duration-150`}>
                        {plat.logoSvg}
                      </div>
                      <span className="text-[10px] font-bold truncate w-14 tracking-tight">
                        {plat.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Home Screen App Grid launcher list */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 px-1">
                  Career Apps Grid
                </span>

                <div className="grid grid-cols-4 gap-x-3 gap-y-5 text-center py-2">
                  
                  {/* Specialized Matchmaker app icon */}
                  <button
                    onClick={() => { playSound("pop"); setQuizStep("intro"); setIsQuizOpen(true); }}
                    className="flex flex-col items-center gap-1.5 focus:outline-none group"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center shadow-md shadow-purple-950/20 transform transition-transform group-hover:scale-105 active:scale-95 duration-150 relative">
                      <Sparkles className="h-6 w-6 text-white animate-pulse" />
                      <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-red-500 rounded-full border-2 border-[#ccead3] flex items-center justify-center text-[7px] text-white font-bold">1</span>
                    </div>
                    <span className="text-[10px] font-bold truncate w-14 tracking-tight">
                      Matchmaker
                    </span>
                  </button>

                  {/* Dynamic apps */}
                  {filteredPlatforms.map((plat) => (
                    <button
                      key={`app-icon-${plat.id}`}
                      onClick={() => { playSound("click"); setSelectedPlatform(plat); }}
                      className="flex flex-col items-center gap-1.5 focus:outline-none group"
                    >
                      <div className={`h-12 w-12 rounded-2xl bg-gradient-to-tr ${plat.logoColor} flex items-center justify-center shadow-md transform transition-transform group-hover:scale-105 active:scale-95 duration-150`}>
                        {plat.logoSvg}
                      </div>
                      <span className="text-[10px] font-bold truncate w-14 tracking-tight">
                        {plat.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Launcher Bottom Dock (Visual mockup container just like the phone screenshot) */}
              <div className="pt-4 border-t border-black/5">
                <div className="w-full bg-white/35 backdrop-blur-xl p-3.5 rounded-3xl border border-white/40 shadow-lg flex justify-around items-center">
                  {dockPlatforms.map((plat) => (
                    <button
                      key={`dock-${plat.id}`}
                      onClick={() => { playSound("click"); setSelectedPlatform(plat); }}
                      className="flex flex-col items-center gap-1 focus:outline-none group"
                    >
                      <div className={`h-11 w-11 rounded-2xl bg-gradient-to-tr ${plat.logoColor} flex items-center justify-center shadow-md transform transition-transform group-hover:scale-105 active:scale-95 duration-150`}>
                        {plat.logoSvg}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: DISCOVER PLATFORM ZONE */}
          {activeTab === "discover" && (
            <div className="space-y-5 animate-slide-up">
              
              <div className="space-y-1">
                <h3 className="text-xl font-black">Discover Deck</h3>
                <p className="text-xs opacity-75">Swipe card shuffle matching career opportunities.</p>
              </div>

              {/* Platform of the Day */}
              <div className={`${activeWallpaper.cardBg} backdrop-blur-xl p-5 rounded-3xl border shadow-md space-y-4`}>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-bold uppercase tracking-wider">
                  <Sparkles className="h-3 w-3" /> Platform of the Day
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-orange-500 flex items-center justify-center shrink-0 shadow-lg">
                    {platforms[9].logoSvg} {/* Remote OK */}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-sm">{platforms[9].name}</h4>
                    <p className="text-xs opacity-80 leading-relaxed">
                      If you're seeking international remote jobs in development, design, copy or support, Remote OK matches you to globally verified vacancies.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono opacity-50">Est. {platforms[9].established}</span>
                  <button
                    onClick={() => { playSound("click"); setSelectedPlatform(platforms[9]); }}
                    className="px-3.5 py-1.5 bg-primary text-white text-[10px] font-bold rounded-xl flex items-center gap-1 shadow-md shadow-primary/25"
                  >
                    Open Platform
                  </button>
                </div>
              </div>

              {/* Bouncy Platform Swipe card */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 px-1">
                  Platform Card Shuffle
                </span>
                
                {discoverDeckPlatforms.length > 0 ? (
                  <div className={`${activeWallpaper.cardBg} backdrop-blur-xl p-5 rounded-3xl border shadow-md text-center space-y-4 animate-scale-in relative`}>
                    <div className="flex justify-between items-center text-[10px] font-mono opacity-50">
                      <span>Card {platforms.length - discoverDeckPlatforms.length + 1} of {platforms.length}</span>
                      <span>Rating: ⭐ {discoverDeckPlatforms[0].rating}</span>
                    </div>

                    <div className="flex flex-col items-center space-y-2.5">
                      <div className={`h-13 w-13 rounded-2xl bg-gradient-to-tr ${discoverDeckPlatforms[0].logoColor} flex items-center justify-center shadow-lg`}>
                        {discoverDeckPlatforms[0].logoSvg}
                      </div>
                      <h4 className="font-extrabold text-base">{discoverDeckPlatforms[0].name}</h4>
                      <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary">
                        {discoverDeckPlatforms[0].category}
                      </span>
                      <p className="text-xs opacity-80 leading-relaxed max-w-xs">
                        {discoverDeckPlatforms[0].description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => {
                          playSound("click");
                          setHiddenPlatforms(prev => [...prev, discoverDeckPlatforms[0].id]);
                        }}
                        className="flex-1 py-2.5 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-xs font-bold rounded-xl text-red-500 flex items-center justify-center gap-1.5"
                      >
                        <Trash2 className="h-4 w-4" /> Skip / Delete
                      </button>
                      <button
                        onClick={() => {
                          playSound("success");
                          if (!favorites.includes(discoverDeckPlatforms[0].id)) {
                            const updated = [...favorites, discoverDeckPlatforms[0].id];
                            setFavorites(updated);
                            localStorage.setItem("workshere_favorites", JSON.stringify(updated));
                          }
                          setHiddenPlatforms(prev => [...prev, discoverDeckPlatforms[0].id]);
                        }}
                        className="flex-grow py-2.5 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-1.5"
                      >
                        <Heart className="h-4 w-4 fill-current text-white animate-pulse" /> Like & Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={`${activeWallpaper.cardBg} backdrop-blur-xl p-6 rounded-3xl border shadow-md text-center space-y-3`}>
                    <Compass className="h-8 w-8 text-primary mx-auto opacity-75 animate-spin" style={{ animationDuration: "12s" }} />
                    <p className="text-xs font-semibold">You've shuffled all cards!</p>
                    <button
                      onClick={() => { playSound("pop"); setHiddenPlatforms([]); }}
                      className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-md"
                    >
                      Reshuffle Deck
                    </button>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: CATEGORIES LIST */}
          {activeTab === "categories" && (
            <div className="space-y-5 animate-slide-up">
              
              <div className="space-y-1">
                <h3 className="text-xl font-black">Categories</h3>
                <p className="text-xs opacity-75">Filter career apps based on your work preference.</p>
              </div>

              {/* Category pills list */}
              <div className="flex gap-2 overflow-x-auto pb-2 border-b border-black/5 -mx-5 px-5">
                {[
                  { id: "all", label: "All Apps" },
                  { id: "internships", label: "Internships" },
                  { id: "remote", label: "Remote" },
                  { id: "freelancing", label: "Freelance" },
                  { id: "startup", label: "Startups" },
                  { id: "corporate", label: "Corporate" }
                ].map((tabItem) => (
                  <button
                    key={tabItem.id}
                    onClick={() => setSelectedCategoryFilter(tabItem.id)}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold shrink-0 transition-all border ${
                      selectedCategoryFilter === tabItem.id
                        ? "bg-primary text-white border-primary"
                        : "bg-white/40 text-emerald-950/80 border-white/50 hover:bg-white/60"
                    }`}
                  >
                    {tabItem.label}
                  </button>
                ))}
              </div>

              {/* Grid of icons belonging to selected category */}
              <div className="grid grid-cols-4 gap-x-3 gap-y-5 text-center py-2">
                {filteredPlatforms.length === 0 ? (
                  <div className="col-span-4 py-8 text-center text-xs font-mono opacity-50">
                    No apps in this category.
                  </div>
                ) : (
                  filteredPlatforms.map((plat) => (
                    <button
                      key={`cat-grid-${plat.id}`}
                      onClick={() => { playSound("click"); setSelectedPlatform(plat); }}
                      className="flex flex-col items-center gap-1.5 focus:outline-none group animate-scale-in"
                    >
                      <div className={`h-11 w-11 rounded-2xl bg-gradient-to-tr ${plat.logoColor} flex items-center justify-center shadow-md transform transition-transform group-hover:scale-105 active:scale-95 duration-150`}>
                        {plat.logoSvg}
                      </div>
                      <span className="text-[10px] font-bold truncate w-14 tracking-tight">
                        {plat.name}
                      </span>
                    </button>
                  ))
                )}
              </div>

            </div>
          )}

          {/* TAB 4: FAVORITES HUB */}
          {activeTab === "favorites" && (
            <div className="space-y-5 animate-slide-up">
              
              <div className="space-y-1 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black">Favorites</h3>
                  <p className="text-xs opacity-75">Your shortlisted platform nodes.</p>
                </div>
                {favorites.length > 0 && (
                  <button
                    onClick={() => {
                      playSound("pop");
                      setFavorites([]);
                      localStorage.removeItem("workshere_favorites");
                    }}
                    className="p-2.5 text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-colors shadow-sm"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                )}
              </div>

              {/* Grid or List of Favorites */}
              <div className="space-y-3">
                {favorites.length === 0 ? (
                  <div className={`${activeWallpaper.cardBg} backdrop-blur-xl p-8 rounded-3xl border text-center space-y-3.5`}>
                    <Heart className="h-9 w-9 text-red-500 mx-auto opacity-35" />
                    <p className="text-xs font-semibold">No favorites selected yet.</p>
                    <p className="text-[10px] opacity-75 px-6 leading-relaxed">
                      Browse platform app icons on the Home screen launcher, tap them, and toggle the heart icon to shortlist.
                    </p>
                    <button
                      onClick={() => setActiveTab("home")}
                      className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-md"
                    >
                      Browse App Icons
                    </button>
                  </div>
                ) : (
                  platforms
                    .filter((p) => favorites.includes(p.id))
                    .map((plat) => (
                      <div
                        key={`fav-card-${plat.id}`}
                        className={`${activeWallpaper.cardBg} backdrop-blur-xl p-3.5 rounded-2xl border shadow-sm flex items-center justify-between gap-3`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className={`h-10 w-10 rounded-2xl bg-gradient-to-tr ${plat.logoColor} flex items-center justify-center shrink-0`}>
                            {plat.logoSvg}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-xs">{plat.name}</h4>
                            <p className="text-[10px] opacity-75 truncate max-w-[170px]">{plat.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => toggleFavorite(plat.id)}
                            className="p-2 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20"
                          >
                            <Heart className="h-4 w-4 fill-current" />
                          </button>
                          <button
                            onClick={() => { playSound("click"); setSelectedPlatform(plat); }}
                            className="p-2 bg-primary/10 text-primary border border-primary/20 rounded-xl"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))
                )}
              </div>

            </div>
          )}

          {/* TAB 5: PROFILE & WALLPAPER SETTINGS */}
          {activeTab === "profile" && (
            <div className="space-y-5 animate-slide-up">
              
              <div className="space-y-1">
                <h3 className="text-xl font-black">Launcher Settings</h3>
                <p className="text-xs opacity-75">Change wallpapers and reset app configurations.</p>
              </div>

              {/* Profile Card */}
              <div className={`${activeWallpaper.cardBg} backdrop-blur-xl p-5 rounded-3xl border shadow-sm flex items-center gap-4`}>
                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-primary/25">
                  OP
                </div>
                <div>
                  <h4 className="font-extrabold text-sm">Active Member</h4>
                  <p className="text-[10px] opacity-60 font-mono mt-0.5">Favorites Shortlisted: {favorites.length}</p>
                </div>
              </div>

              {/* Wallpaper Gallery Selection Section (requested by user) */}
              <div className={`${activeWallpaper.cardBg} backdrop-blur-xl p-5 rounded-3xl border shadow-sm space-y-3.5`}>
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 flex items-center gap-1.5">
                  <Smartphone className="h-4 w-4" /> Wallpaper Gallery
                </span>
                
                <div className="grid grid-cols-2 gap-3.5">
                  {wallpapers.map((wp) => (
                    <button
                      key={wp.id}
                      onClick={() => changeWallpaper(wp)}
                      className={`flex flex-col p-3 rounded-2xl border text-left transition-all ${
                        activeWallpaper.id === wp.id
                          ? "bg-primary/15 border-primary shadow-sm"
                          : "bg-white/20 border-black/5 hover:border-black/10"
                      }`}
                    >
                      <div className={`h-16 w-full rounded-xl bg-gradient-to-br ${wp.bgClass} border border-black/5 mb-2 relative overflow-hidden flex items-center justify-center`}>
                        {/* Swirl Line Indicator preview */}
                        <div className="absolute inset-0 opacity-50 overflow-hidden scale-75">
                          {renderSpiralBackground(wp.lineColor)}
                        </div>
                        {activeWallpaper.id === wp.id && (
                          <div className="absolute h-5 w-5 rounded-full bg-primary flex items-center justify-center text-white">
                            <Check className="h-3.5 w-3.5" />
                          </div>
                        )}
                      </div>
                      <span className="text-[11px] font-bold">{wp.name}</span>
                      <span className="text-[8px] opacity-50 mt-0.5">{wp.isDark ? "Dark Theme" : "Light Theme"}</span>
                    </button>
                  ))}
                </div>
              </div>



            </div>
          )}

        </div>

        {/* Floating Bottom Navigation Bar (Fixed relative to the app-frame container) */}
        <nav className="absolute bottom-4 left-4 right-4 h-18 rounded-3xl floating-bottom-nav flex items-center justify-around px-2 z-40 bg-zinc-950/85 backdrop-blur-xl border border-white/10 shadow-xl">
          
          <button
            onClick={() => { playSound("click"); setActiveTab("home"); }}
            className={`flex flex-col items-center gap-1.5 py-2.5 px-3.5 rounded-2xl transition-all ${
              activeTab === "home" ? "text-primary scale-110" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Home className="h-6 w-6" />
            <span className="text-[9px] font-bold font-sans">Home</span>
          </button>

          <button
            onClick={() => { playSound("click"); setActiveTab("discover"); }}
            className={`flex flex-col items-center gap-1.5 py-2.5 px-3.5 rounded-2xl transition-all ${
              activeTab === "discover" ? "text-primary scale-110" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Compass className="h-6 w-6" />
            <span className="text-[9px] font-bold font-sans">Discover</span>
          </button>

          <button
            onClick={() => { playSound("click"); setActiveTab("categories"); }}
            className={`flex flex-col items-center gap-1.5 py-2.5 px-3.5 rounded-2xl transition-all ${
              activeTab === "categories" ? "text-primary scale-110" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Layers className="h-6 w-6" />
            <span className="text-[9px] font-bold font-sans">Categories</span>
          </button>

          <button
            onClick={() => { playSound("click"); setActiveTab("favorites"); }}
            className={`flex flex-col items-center gap-1.5 py-2.5 px-3.5 rounded-2xl transition-all ${
              activeTab === "favorites" ? "text-accent scale-110" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Heart className="h-6 w-6" />
            <span className="text-[9px] font-bold font-sans">Favorites</span>
          </button>

          <button
            onClick={() => { playSound("click"); setActiveTab("profile"); }}
            className={`flex flex-col items-center gap-1.5 py-2.5 px-3.5 rounded-2xl transition-all ${
              activeTab === "profile" ? "text-primary scale-110" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <User className="h-6 w-6" />
            <span className="text-[9px] font-bold font-sans">Wallpapers</span>
          </button>

        </nav>

      {/* OVERLAY MODAL 1: PLATFORM DETAILS NODE (NATIVE-LOOKING SLIDE-UP SHEET) */}
      {selectedPlatform && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center p-0 transition-opacity">
          <div className="w-full max-w-[480px] bg-zinc-950 border-t border-white/10 rounded-t-[32px] p-6 space-y-5 animate-slide-up shadow-2xl relative">
            
            {/* Close button */}
            <button
              onClick={() => setSelectedPlatform(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className={`h-14 w-14 rounded-2xl bg-gradient-to-tr ${selectedPlatform.logoColor} flex items-center justify-center shrink-0 shadow-lg`}>
                {selectedPlatform.logoSvg}
              </div>
              <div className="space-y-0.5">
                <h3 className="font-extrabold text-lg text-white">{selectedPlatform.name}</h3>
                <span className="text-[10px] font-mono text-primary uppercase font-bold bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
                  {selectedPlatform.category}
                </span>
              </div>
            </div>

            <p className="text-zinc-300 text-xs leading-relaxed">
              {selectedPlatform.description}
            </p>

            {/* Platform Metrics */}
            <div className="grid grid-cols-2 gap-3 py-1 text-center font-mono">
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                <span className="text-[9px] text-zinc-500 uppercase block">Platform Rating</span>
                <span className="text-sm font-bold text-yellow-400 mt-1 block">⭐ {selectedPlatform.rating} / 5</span>
              </div>
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                <span className="text-[9px] text-zinc-500 uppercase block">Established</span>
                <span className="text-sm font-bold text-zinc-300 mt-1 block">{selectedPlatform.established}</span>
              </div>
            </div>

            {/* Tags list */}
            <div className="flex flex-wrap gap-1.5">
              {selectedPlatform.tags.map((tag) => (
                <span
                  key={`modal-tag-${tag}`}
                  className="text-[9px] font-mono text-zinc-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Row */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => toggleFavorite(selectedPlatform.id)}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-center shrink-0 ${
                  favorites.includes(selectedPlatform.id)
                    ? "bg-red-500/10 text-red-500 border-red-500/30"
                    : "bg-white/5 text-zinc-400 border-white/10 hover:text-zinc-200"
                }`}
              >
                <Heart className={`h-5.5 w-5.5 ${favorites.includes(selectedPlatform.id) && "fill-current"}`} />
              </button>
              
              <a
                href={selectedPlatform.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound("click")}
                className="flex-grow py-3.5 bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white text-xs font-bold rounded-2xl text-center shadow-lg shadow-primary/20 flex items-center justify-center gap-1.5"
              >
                Open Platform <ExternalLink className="h-4 w-4" />
              </a>
            </div>

          </div>
        </div>
      )}

      {/* OVERLAY MODAL 2: MATCHMAKER WIDGET OVERLAY */}
      {isQuizOpen && (
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-end justify-center p-0">
          <div className="w-full max-w-[480px] bg-zinc-950 border-t border-white/10 rounded-t-[32px] p-6 space-y-5 animate-slide-up shadow-2xl relative max-h-[90%] overflow-y-auto">
            
            <button
              onClick={() => { playSound("click"); setIsQuizOpen(false); }}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-extrabold text-base text-white">Platform Matchmaker</h3>
            </div>

            {/* Intro View */}
            {quizStep === "intro" && (
              <div className="space-y-4 text-center py-4">
                <p className="text-xs text-zinc-400 leading-relaxed px-4">
                  Finding career platforms shouldn't be tedious. Answer 2 simple questions to find stipend-backed internships, remote nodes, or freelance portals tailored to you.
                </p>
                <button
                  onClick={() => { playSound("click"); setQuizStep("role"); }}
                  className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-full shadow-lg shadow-primary/20 inline-flex items-center gap-1.5"
                >
                  Start Matching <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Step 1: User Role */}
            {quizStep === "role" && (
              <div className="space-y-4">
                <span className="text-[10px] font-mono uppercase text-primary font-bold">Step 1 of 2</span>
                <h4 className="font-extrabold text-zinc-100 text-sm">Tell us, what is your current profile status?</h4>
                <div className="flex flex-col gap-2">
                  {[
                    { val: "student", label: "Student / College Student", icon: <GraduationCap className="h-4.5 w-4.5 text-orange-400" /> },
                    { val: "fresher", label: "Fresher / Looking for Entry-Level", icon: <Award className="h-4.5 w-4.5 text-sky-400" /> },
                    { val: "experienced", label: "Experienced Professional", icon: <UserCheck className="h-4.5 w-4.5 text-emerald-400" /> }
                  ].map((item) => (
                    <button
                      key={item.val}
                      onClick={() => {
                        playSound("click");
                        setUserRole(item.val as any);
                        setQuizStep("type");
                      }}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left text-xs font-bold transition-all ${
                        userRole === item.val
                          ? "bg-primary/10 border-primary text-primary"
                          : "bg-white/5 border-white/10 text-zinc-300 hover:border-white/20"
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Job Type */}
            {quizStep === "type" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono uppercase text-primary font-bold">Step 2 of 2</span>
                  <button onClick={() => { playSound("click"); setQuizStep("role"); }} className="text-zinc-500 hover:text-zinc-300 text-xs font-semibold">Back</button>
                </div>
                <h4 className="font-extrabold text-zinc-100 text-sm">What kind of opportunities are you seeking?</h4>
                <div className="flex flex-col gap-2">
                  {[
                    { val: "internship", label: "Internships & Traineeships", icon: <GraduationCap className="h-4.5 w-4.5 text-orange-400" /> },
                    { val: "fulltime", label: "Full-Time Corporate Jobs", icon: <Briefcase className="h-4.5 w-4.5 text-blue-400" /> },
                    { val: "freelance", label: "Freelancing & Client Gigs", icon: <Globe className="h-4.5 w-4.5 text-emerald-400" /> },
                    { val: "remote", label: "Remote Jobs / Work From Anywhere", icon: <Laptop className="h-4.5 w-4.5 text-rose-400" /> }
                  ].map((item) => (
                    <button
                      key={item.val}
                      onClick={() => {
                        playSound("click");
                        setUserJobType(item.val as any);
                      }}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left text-xs font-bold transition-all ${
                        userJobType === item.val
                          ? "bg-primary/10 border-primary text-primary"
                          : "bg-white/5 border-white/10 text-zinc-300 hover:border-white/20"
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={runRecommendationQuiz}
                  disabled={!userJobType}
                  className="w-full mt-3 py-3.5 bg-gradient-to-r from-primary to-accent disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold rounded-2xl shadow-lg"
                >
                  Generate Matches
                </button>
              </div>
            )}

            {/* Results View */}
            {quizStep === "results" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono uppercase text-emerald-500 font-bold flex items-center gap-1">
                    <Check className="h-4 w-4" /> Recommendation Results
                  </span>
                  <button
                    onClick={() => {
                      playSound("click");
                      setQuizStep("intro");
                      setUserRole("");
                      setUserJobType("");
                    }}
                    className="text-zinc-500 hover:text-zinc-300 text-xs font-semibold"
                  >
                    Reset Quiz
                  </button>
                </div>

                <div className="space-y-2.5">
                  {recommendedPlatforms.length === 0 ? (
                    <p className="text-zinc-500 text-xs py-4 text-center">No platform matched perfectly. Reset and try other options!</p>
                  ) : (
                    recommendedPlatforms.map((plat) => (
                      <div
                        key={`quiz-rec-${plat.id}`}
                        className="p-3 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`h-8 w-8 rounded-lg bg-gradient-to-tr ${plat.logoColor} flex items-center justify-center shrink-0`}>
                            {plat.logoSvg}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-white text-xs truncate">{plat.name}</h4>
                            <p className="text-[9px] text-zinc-500 truncate">{plat.description}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => { playSound("click"); setIsQuizOpen(false); setSelectedPlatform(plat); }}
                          className="px-2.5 py-1.5 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold rounded-lg shrink-0"
                        >
                          View
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <button
                  onClick={() => { playSound("click"); setIsQuizOpen(false); }}
                  className="w-full mt-2 py-3 bg-white/5 text-zinc-300 hover:text-white text-xs font-bold rounded-xl border border-white/5"
                >
                  Done
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      </div>
    </div>
  );
}
