import React, { useState, useEffect } from "react";
import { MainTab, UserProfile } from "../types";
import {
  Home,
  Trophy,
  BookOpen,
  BarChart3,
  Sparkles,
  Search,
  Flame,
  Clock,
  Compass,
  Camera,
  Crown,
  Settings,
} from "lucide-react";

interface NavbarProps {
  userProfile?: UserProfile;
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
  onOpenSearch: () => void;
  studyStreak: number;
  timerRunning: boolean;
  timerSeconds: number;
  onToggleTimer: () => void;
  hasUpdate?: boolean;
  onOpenUpdateModal?: () => void;
  onOpenSettings?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  userProfile,
  activeTab,
  setActiveTab,
  onOpenSearch,
  studyStreak,
  timerRunning,
  timerSeconds,
  onToggleTimer,
  hasUpdate,
  onOpenUpdateModal,
  onOpenSettings,
}) => {
  const [daysToPrelims, setDaysToPrelims] = useState<number>(0);

  useEffect(() => {
    // Target UPSC Prelims date (e.g. May 24, 2026)
    const targetDate = new Date("2026-05-24T09:30:00");
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysToPrelims(diffDays > 0 ? diffDays : 270);
  }, []);

  // Live Time state for Time Card
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <header
      id="main-header"
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 text-slate-900 shadow-xs safe-top"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15 sm:h-18">
          {/* Brand Logo & Name - Premium VIP Redesign */}
          <div className="flex items-center gap-3 shrink-0 group cursor-pointer">
            <div className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden transform transition-all duration-300 group-hover:scale-105 group-hover:-rotate-3 shrink-0 bg-white border border-slate-100 p-0.5">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 z-20" />
              <img src="/icon.png" alt="LBSNAA" className="w-full h-full object-contain rounded-xl z-10" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-2xl font-black tracking-tighter whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 drop-shadow-sm">
                  CSE PREP
                </h1>
                <span className="hidden sm:inline-block px-2.5 py-0.5 text-[9px] uppercase font-black tracking-widest rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200/60 shadow-sm whitespace-nowrap">
                  VIP Suite
                </span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] hidden md:block mt-0.5">
                Hi, {userProfile?.name || "Aspirant"}
              </p>
            </div>
          </div>

          {/* Center Main Pillars Tabs (Bento Segmented Controller) - Premium Pro UI */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-50/80 backdrop-blur-md p-1.5 rounded-[20px] border border-slate-200 shadow-sm relative z-20">
            {hasUpdate && (
              <div className="flex items-center mr-1">
                <button
                  onClick={onOpenUpdateModal}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-[14px] bg-green-50 text-green-600 hover:bg-green-100 transition-all border border-green-200 font-bold text-[10px] uppercase tracking-widest cursor-pointer"
                >
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </div>
                  Sync
                </button>
              </div>
            )}

            {[
              { id: "home", label: "HOME", icon: Home },
              { id: "toppers", label: "TOPPERS", icon: Trophy },
              { id: "prep", label: "PREP", icon: BookOpen },
              { id: "analytics", label: "ANALYTICS", icon: BarChart3 },
              { id: "ocr", label: "OCR", icon: Camera }
            ].map((tab) => (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id as MainTab)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-[14px] text-[11px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap cursor-pointer overflow-hidden group ${
                  activeTab === tab.id
                    ? "text-rose-600 border border-rose-200 bg-white shadow-[0_4px_15px_rgba(225,29,72,0.1)] transform -translate-y-[1px]"
                    : "text-slate-500 hover:text-slate-800 hover:bg-white hover:border-slate-200 border border-transparent"
                }`}
              >
                {activeTab === tab.id && (
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-orange-50/50 pointer-events-none" />
                )}
                <tab.icon className={`w-4 h-4 relative z-10 transition-transform duration-300 ${activeTab === tab.id ? 'scale-110 drop-shadow-sm text-rose-500' : 'group-hover:scale-110 text-slate-400 group-hover:text-rose-400'}`} />
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Bento Countdown Card - Premium VIP Alert */}
            <div className="hidden xl:flex bg-gradient-to-br from-rose-50 to-red-50 px-3.5 py-1.5 rounded-xl border border-red-200/80 shadow-sm flex-col items-end shrink-0">
              <span className="text-[9px] text-red-500 font-black uppercase tracking-widest whitespace-nowrap">
                TARGET PRELIMS
              </span>
              <span className="text-sm font-mono font-black text-red-700 whitespace-nowrap tracking-tight">
                {daysToPrelims} DAYS LEFT
              </span>
            </div>
            
            {/* Live Time Card - Moved to Right Corner and Enlarged */}
            <div className="flex items-center">
              <div className="flex flex-col items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] border border-slate-700/80 group-hover:border-indigo-500/50 transition-colors min-w-[100px]">
                <span className="text-sm sm:text-base font-mono font-black text-emerald-400 tracking-widest leading-none drop-shadow-[0_0_10px_rgba(52,211,153,0.4)]">
                  {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
                <span className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mt-1.5 leading-none">
                  {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
