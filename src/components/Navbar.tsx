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
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-xs shrink-0">
              U
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight whitespace-nowrap">
                  UPSC CONQUEST
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 whitespace-nowrap">
                  Bento Suite
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-widest hidden md:block">
                IAS Preparation • Topper Blueprints • Deep Analytics
              </p>
            </div>
          </div>

          {/* Center Main Pillars Tabs (Bento Segmented Controller) */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 shadow-inner">
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
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Bento Countdown Card */}
            <div className="hidden xl:flex bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs flex-col items-end shrink-0">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider whitespace-nowrap">
                Prelims Countdown
              </span>
              <span className="text-sm font-mono font-bold text-indigo-600 whitespace-nowrap">
                {daysToPrelims} Days
              </span>
            </div>

            {/* Quick Stopwatch Pill */}
            <button
              id="header-timer-btn"
              onClick={onToggleTimer}
              title={timerRunning ? "Pause Study Session" : "Start Study Timer"}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-semibold shadow-xs transition-all cursor-pointer shrink-0 ${
                timerRunning
                  ? "bg-emerald-50 border-emerald-300 text-emerald-700 animate-pulse"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
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
                  timerRunning ? "bg-emerald-500" : "bg-slate-400"
                }`}
              />
            </button>

            {/* Streak Counter */}
            <div
              id="study-streak-badge"
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-xs text-orange-700 font-bold shadow-xs shrink-0 whitespace-nowrap"
              title="Daily Active Study Streak"
            >
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-orange-500 text-orange-500 shrink-0" />
              <span>{studyStreak}d</span>
            </div>

            {/* Global Search Button */}
            <button
              id="global-search-btn"
              onClick={onOpenSearch}
              className="p-1.5 sm:p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-xs transition cursor-pointer shrink-0"
              title="Search Toppers, Syllabus, Books, PYQs (Ctrl+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* AI Mains Mentor & Evaluator Button */}
            <button
              id="ai-mentor-btn"
              onClick={onOpenAIMentor}
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer shrink-0 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">AI UPSC Mentor</span>
              <span className="sm:hidden">AI Mentor</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
