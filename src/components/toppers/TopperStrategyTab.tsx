import React, { useState } from "react";
import { TOPPERS_PROFILES } from "../../data/toppersData";
import { TopperProfile } from "../../types";
import { 
  Trophy, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  Flame, 
  GraduationCap,
  Filter
} from "lucide-react";

export const TopperStrategyTab: React.FC = () => {
  const [selectedTopper, setSelectedTopper] = useState<TopperProfile>(TOPPERS_PROFILES[0]);
  const [activeStrategyPaper, setActiveStrategyPaper] = useState<"gs1" | "gs2" | "gs3" | "gs4" | "essay" | "optional" | "prelims" | "csat">("gs1");
  const [optionalFilter, setOptionalFilter] = useState<string>("All");

  const optionals = ["All", ...Array.from(new Set(TOPPERS_PROFILES.map(t => t.optional)))];

  const filteredToppers = TOPPERS_PROFILES.filter(t => {
    if (optionalFilter === "All") return true;
    return t.optional === optionalFilter;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner / Philosophy Bento Header */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-indigo-600" /> Rank 1 Blueprint
            </span>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Decoded UPSC Scoring Strategies</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Topper Strategy & Subject Masterclass
          </h2>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Analyze the exact micro-strategies, answer presentation frameworks, notes methodology, and optional subject tactics that propelled rank holders to the top of the Civil Services Examination.
          </p>
        </div>

        {/* Optional Filter Bento Widget */}
        <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 self-start md:self-auto shrink-0 shadow-sm">
          <Filter className="w-4 h-4 text-indigo-600" />
          <label className="text-xs text-slate-600 font-bold">Optional:</label>
          <select
            value={optionalFilter}
            onChange={(e) => setOptionalFilter(e.target.value)}
            className="bg-white border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-1.5 font-bold focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
          >
            {optionals.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Toppers Cards Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredToppers.map((topper) => {
          const isSelected = selectedTopper.id === topper.id;
          return (
            <div
              key={topper.id}
              onClick={() => setSelectedTopper(topper)}
              className={`cursor-pointer rounded-2xl p-5 transition-all relative border-2 ${
                isSelected
                  ? "bg-white border-indigo-600 shadow-md ring-2 ring-indigo-500/20"
                  : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              <div className="flex items-start gap-3">
                <img
                  src={topper.avatar}
                  alt={topper.name}
                  className="w-14 h-14 rounded-xl object-cover border-2 border-indigo-100 shrink-0 shadow-sm"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-base truncate">{topper.name}</span>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white font-extrabold text-xs shadow-sm">
                      AIR {topper.rank}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">CSE {topper.year} • Attempt #{topper.attempt}</p>
                  <p className="text-xs text-indigo-600 font-bold truncate mt-1 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 shrink-0" /> {topper.optional}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 italic line-clamp-2">
                "{topper.quote}"
              </div>

              {isSelected && (
                <div className="mt-3 flex items-center justify-end text-xs font-bold text-indigo-600 gap-1">
                  <span>Viewing Strategy</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* In-Depth Profile Breakdown for Selected Topper (Bento Large Card) */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        
        {/* Selected Topper Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <img
              src={selectedTopper.avatar}
              alt={selectedTopper.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-200 shadow-md shrink-0"
            />
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-slate-900">{selectedTopper.name}</h3>
                <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold text-xs border border-indigo-100">
                  AIR {selectedTopper.rank} (UPSC CSE {selectedTopper.year})
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-0.5">
                Background: <span className="text-slate-800 font-semibold">{selectedTopper.background}</span> • Optional: <span className="text-indigo-600 font-bold">{selectedTopper.optional}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-auto">
            {selectedTopper.mainsScore && (
              <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center shadow-sm">
                <div className="text-[10px] uppercase font-bold text-slate-400">Mains Score</div>
                <div className="text-base font-extrabold text-indigo-600">{selectedTopper.mainsScore} / 1750</div>
              </div>
            )}
            {selectedTopper.interviewScore && (
              <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center shadow-sm">
                <div className="text-[10px] uppercase font-bold text-slate-400">Interview Score</div>
                <div className="text-base font-extrabold text-emerald-600">{selectedTopper.interviewScore} / 275</div>
              </div>
            )}
          </div>
        </div>

        {/* Golden Rules Bento Box */}
        <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-5">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-800 flex items-center gap-1.5 mb-3">
            <Flame className="w-4 h-4 text-indigo-600 fill-indigo-600" />
            <span>Core Golden Rules by {selectedTopper.name}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedTopper.goldenRules.map((rule, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-3 rounded-lg border border-indigo-100 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Paper-Wise Strategy Bento Area */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Subject-Wise Blueprint</span>
            </h4>
          </div>

          {/* Sub-tab pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-1">
            {[
              { key: "gs1", label: "GS1 (History & Geo)" },
              { key: "gs2", label: "GS2 (Polity & IR)" },
              { key: "gs3", label: "GS3 (Economy & Tech)" },
              { key: "gs4", label: "GS4 (Ethics)" },
              { key: "essay", label: "Essay Paper" },
              { key: "optional", label: `Optional (${selectedTopper.optional})` },
              { key: "prelims", label: "Prelims GS1" },
              { key: "csat", label: "CSAT Strategy" },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveStrategyPaper(tab.key as any)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                  activeStrategyPaper === tab.key
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Strategy Content Box */}
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
            {activeStrategyPaper === "gs1" && (
              <div>
                <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">General Studies 1 Strategy (Heritage, History, Geography, Society)</div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-medium">{selectedTopper.gsStrategy.gs1}</p>
              </div>
            )}
            {activeStrategyPaper === "gs2" && (
              <div>
                <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">General Studies 2 Strategy (Polity, Governance, Constitution & IR)</div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-medium">{selectedTopper.gsStrategy.gs2}</p>
              </div>
            )}
            {activeStrategyPaper === "gs3" && (
              <div>
                <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">General Studies 3 Strategy (Economy, Sci-Tech, Environment & Security)</div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-medium">{selectedTopper.gsStrategy.gs3}</p>
              </div>
            )}
            {activeStrategyPaper === "gs4" && (
              <div>
                <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">General Studies 4 Strategy (Ethics, Integrity, Aptitude & Case Studies)</div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-medium">{selectedTopper.gsStrategy.gs4}</p>
              </div>
            )}
            {activeStrategyPaper === "essay" && (
              <div>
                <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">Essay Writing Methodology & Structure</div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-medium">{selectedTopper.essayStrategy}</p>
              </div>
            )}
            {activeStrategyPaper === "optional" && (
              <div>
                <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">Optional Subject Strategy ({selectedTopper.optional})</div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-medium">{selectedTopper.optionalStrategy}</p>
              </div>
            )}
            {activeStrategyPaper === "prelims" && (
              <div>
                <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">Prelims GS Paper 1 Elimination & Scoring Hacks</div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-medium">{selectedTopper.prelimsStrategy}</p>
              </div>
            )}
            {activeStrategyPaper === "csat" && (
              <div>
                <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">CSAT Paper 2 Qualifying Strategy</div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-medium">{selectedTopper.csatStrategy}</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
