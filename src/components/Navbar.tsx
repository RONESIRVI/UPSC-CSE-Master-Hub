import React, { useState, useEffect } from "react";
import { MainTab } from "../types";
import {
  Home,
  Trophy,
  BookOpen,
  BarChart3,
  Sparkles,
  Search,
  Flame,
  Clock,
  Calendar,
  Compass,
  ScanSearch,
  Crown,
} from "lucide-react";

interface NavbarProps {
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
  onOpenSearch: () => void;
  onOpenAIMentor: () => void;
  studyStreak: number;
  timerRunning: boolean;
  timerSeconds: number;
  onToggleTimer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenAIMentor,
  studyStreak,
  timerRunning,
  timerSeconds,
  onToggleTimer,
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
            <div className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-600 shadow-lg shadow-amber-500/30 overflow-hidden transform transition-all duration-300 group-hover:scale-105 group-hover:-rotate-3 shrink-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Crown className="w-6 h-6 text-white drop-shadow-md z-10" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-2xl font-black tracking-tighter whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 drop-shadow-sm">
                  UPSC CONQUEST
                </h1>
                <span className="hidden sm:inline-block px-2.5 py-0.5 text-[9px] uppercase font-black tracking-widest rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200/60 shadow-sm whitespace-nowrap">
                  VIP Suite
                </span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] hidden md:block mt-0.5">
                Elite Preparation Ecosystem
              </p>
            </div>
          </div>

          {/* Center Main Pillars Tabs (Bento Segmented Controller) */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 shadow-inner">
            <div className="flex items-center gap-2">
              <button
                onClick={() => (window as any).testUpdateModal?.()}
                className="hidden md:flex items-center justify-center w-8 h-8 rounded-xl bg-orange-100 text-orange-600 hover:bg-orange-200 transition"
                title="Test Update Modal"
              >
                <div className="w-4 h-4 rounded-full bg-orange-500 animate-pulse" />
              </button>
            </div>
            <button
              id="tab-btn-home"
              onClick={() => setActiveTab("home")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "home"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
              }`}
            >
              <Home className="w-3.5 h-3.5 shrink-0" />
              <span>HOME</span>
            </button>

            <button
              id="tab-btn-toppers"
              onClick={() => setActiveTab("toppers")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "toppers"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
              }`}
            >
              <Trophy className="w-3.5 h-3.5 shrink-0" />
              <span>TOPPERS</span>
            </button>

            <button
              id="tab-btn-prep"
              onClick={() => setActiveTab("prep")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "prep"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span>PREPARATION</span>
            </button>

            <button
              id="tab-btn-analytics"
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "analytics"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 shrink-0" />
              <span>ANALYTICS</span>
            </button>
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

            {/* Quick Stopwatch Pill */}
            <button
              id="header-timer-btn"
              onClick={onToggleTimer}
              title={timerRunning ? "Pause Study Session" : "Start Study Timer"}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-semibold shadow-sm transition-all cursor-pointer shrink-0 ${
                timerRunning
                  ? "bg-emerald-50 border-emerald-300 text-emerald-700 animate-pulse"
                  : "bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Clock
                className={`w-3.5 h-3.5 shrink-0 ${
                  timerRunning ? "text-emerald-600" : "text-slate-500"
                }`}
              />
              <span className="font-mono font-bold text-xs whitespace-nowrap">
                {formatTimer(timerSeconds)}
              </span>
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  timerRunning ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" : "bg-slate-300"
                }`}
              />
            </button>

            {/* Streak Counter - Premium VIP Look */}
            <div
              id="study-streak-badge"
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200/80 text-xs text-orange-700 font-black shadow-sm shrink-0 whitespace-nowrap"
              title="Daily Active Study Streak"
            >
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-orange-500 text-orange-500 shrink-0 drop-shadow-sm" />
              <span>{studyStreak}d</span>
            </div>

            {/* Global Search Button -> OCR Tool */}
            <button
              id="global-ocr-btn"
              onClick={() => setActiveTab("ocr")}
              className={`p-1.5 sm:p-2 rounded-xl border text-slate-600 shadow-sm transition-all cursor-pointer shrink-0 ${
                activeTab === "ocr" 
                  ? "bg-indigo-50 border-indigo-200 text-indigo-700 font-bold" 
                  : "bg-white border-slate-200/80 hover:text-indigo-600 hover:bg-indigo-50"
              }`}
              title="Smart OCR Scanner"
            >
              <ScanSearch className="w-4 h-4" />
            </button>

            {/* AI Mains Mentor & Evaluator Button - Premium Glowing VIP Look */}
            <button
              id="ai-mentor-btn"
              onClick={onOpenAIMentor}
              className="group relative flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-black text-[10px] sm:text-xs shadow-lg shadow-indigo-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer shrink-0 whitespace-nowrap overflow-hidden bg-[length:200%_auto] hover:bg-right"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-300 drop-shadow-md animate-pulse" />
              <span className="hidden sm:inline drop-shadow-md tracking-wider">AI UPSC MENTOR</span>
              <span className="sm:hidden drop-shadow-md tracking-wider">AI MENTOR</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
