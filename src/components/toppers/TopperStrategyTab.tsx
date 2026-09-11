import React, { useState } from "react";
import { TopperProfile } from "../../types";
import { TopperFormModal } from "./TopperFormModal";
import {
  Trophy,
  BookOpen,
  Award,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Flame,
  GraduationCap,
  Filter,
  Plus,
  Edit2,
} from "lucide-react";

interface TopperStrategyTabProps {
  toppers: TopperProfile[];
  setToppers: React.Dispatch<React.SetStateAction<TopperProfile[]>>;
}

export const TopperStrategyTab: React.FC<TopperStrategyTabProps> = ({
  toppers,
  setToppers,
}) => {
  const [selectedTopper, setSelectedTopper] = useState<TopperProfile>(
    toppers[0]
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTopper, setEditingTopper] = useState<TopperProfile | undefined>();
  const [activeStrategyPaper, setActiveStrategyPaper] = useState<
    "gs1" | "gs2" | "gs3" | "gs4" | "essay" | "optional" | "prelims" | "csat"
  >("gs1");
  const [optionalFilter, setOptionalFilter] = useState<string>("All");

  const optionals = [
    "All",
    ...Array.from(new Set(toppers.map((t) => t.optional))),
  ];

  const filteredToppers = toppers.filter((t) => {
    if (optionalFilter === "All") return true;
    return t.optional === optionalFilter;
  });

  const handleSaveTopper = (savedTopper: TopperProfile) => {
    if (editingTopper) {
      setToppers(prev => prev.map(t => t.id === savedTopper.id ? savedTopper : t));
      if (selectedTopper.id === savedTopper.id) setSelectedTopper(savedTopper);
    } else {
      setToppers(prev => [savedTopper, ...prev]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Philosophy Bento Header */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-indigo-600" /> Rank 1
              Blueprint
            </span>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Decoded UPSC Scoring Strategies
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Topper Strategy & Subject Masterclass
          </h2>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Analyze the exact micro-strategies, answer presentation frameworks,
            notes methodology, and optional subject tactics that propelled rank
            holders to the top of the Civil Services Examination.
          </p>
        </div>

        {/* Actions Area */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 self-start md:self-auto shrink-0">
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 shadow-sm w-full sm:w-auto">
            <Filter className="w-4 h-4 text-indigo-600" />
            <label className="text-xs text-slate-600 font-bold">Optional:</label>
            <select
              value={optionalFilter}
              onChange={(e) => setOptionalFilter(e.target.value)}
              className="bg-white border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-1.5 font-bold focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer flex-1"
            >
              {optionals.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => {
              setEditingTopper(undefined);
              setIsModalOpen(true);
            }}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md transition w-full sm:w-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Topper</span>
          </button>
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
                  ? "bg-white border-indigo-600 shadow-md ring-2 ring-indigo-500/20 col-span-1 sm:col-span-2 lg:col-span-4"
                  : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              <div className="flex items-start gap-3">
                <img
                  src={topper.avatar}
                  alt={topper.name}
                  className="w-14 h-14 rounded-xl object-cover border-2 border-indigo-100 shrink-0 shadow-sm"
                />
                <div className="min-w-0 flex-1 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-lg truncate">
                        {topper.name}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white font-extrabold text-xs shadow-sm whitespace-nowrap">
                        AIR {topper.rank}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      CSE {topper.year} • Attempt #{topper.attempt}
                    </p>
                    <p className="text-xs text-indigo-600 font-bold truncate mt-1 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 shrink-0" />{" "}
                      {topper.optional}
                    </p>
                  </div>

                  {isSelected && (
                    <div className="flex items-center gap-2 self-start">
                      {topper.mainsScore && (
                        <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-center shadow-sm">
                          <div className="text-[9px] uppercase font-bold text-slate-400">
                            Mains
                          </div>
                          <div className="text-sm font-extrabold text-indigo-600">
                            {topper.mainsScore}
                          </div>
                        </div>
                      )}
                      {topper.interviewScore && (
                        <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-center shadow-sm">
                          <div className="text-[9px] uppercase font-bold text-slate-400">
                            Interview
                          </div>
                          <div className="text-sm font-extrabold text-emerald-600">
                            {topper.interviewScore}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {isSelected && (
                     <button
                       onClick={(e) => {
                         e.stopPropagation();
                         setEditingTopper(topper);
                         setIsModalOpen(true);
                       }}
                       className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition self-start ml-2"
                       title="Edit Topper"
                     >
                       <Edit2 className="w-4 h-4" />
                     </button>
                  )}
                </div>
              </div>

              {!isSelected && (
                <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 italic line-clamp-2">
                  "{topper.quote}"
                </div>
              )}

              {!isSelected && (
                <div className="mt-3 flex items-center justify-end text-xs font-bold text-indigo-600 gap-1">
                  <span>View Strategy</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              )}

              {/* INLINE EXPANDED CONTENT */}
              {isSelected && (
                <div
                  className="mt-5 pt-5 border-t border-slate-200 cursor-default animate-in fade-in slide-in-from-top-2 duration-300 space-y-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="text-sm text-slate-600 italic font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    "{topper.quote}"
                  </p>

                  <div className="text-sm text-slate-700">
                    <span className="font-bold">Background:</span>{" "}
                    {topper.background}
                  </div>

                  {/* Golden Rules Bento Box */}
                  <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-5">
                    <div className="text-xs font-bold uppercase tracking-wider text-indigo-800 flex items-center gap-1.5 mb-3">
                      <Flame className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                      <span>Core Golden Rules by {topper.name}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {topper.goldenRules.map((rule, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-3 rounded-lg border border-indigo-100 shadow-xs"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed font-medium">
                            {rule}
                          </span>
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

                    <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-1">
                      {[
                        { key: "gs1", label: "GS1" },
                        { key: "gs2", label: "GS2" },
                        { key: "gs3", label: "GS3" },
                        { key: "gs4", label: "GS4" },
                        { key: "essay", label: "Essay" },
                        {
                          key: "optional",
                          label: `Optional (${topper.optional})`,
                        },
                        { key: "prelims", label: "Prelims GS1" },
                        { key: "csat", label: "CSAT" },
                      ].map((tab) => (
                        <button
                          key={tab.key}
                          onClick={() => setActiveStrategyPaper(tab.key as any)}
                          className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                            activeStrategyPaper === tab.key
                              ? "bg-indigo-600 text-white shadow-xs"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
                      {activeStrategyPaper === "gs1" && (
                        <div>
                          <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">
                            GS1 Strategy (History, Geography, Society)
                          </div>
                          <p className="text-sm leading-relaxed text-slate-700 font-medium">
                            {topper.gsStrategy.gs1}
                          </p>
                        </div>
                      )}
                      {activeStrategyPaper === "gs2" && (
                        <div>
                          <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">
                            GS2 Strategy (Polity, Governance, IR)
                          </div>
                          <p className="text-sm leading-relaxed text-slate-700 font-medium">
                            {topper.gsStrategy.gs2}
                          </p>
                        </div>
                      )}
                      {activeStrategyPaper === "gs3" && (
                        <div>
                          <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">
                            GS3 Strategy (Economy, Sci-Tech, Environment)
                          </div>
                          <p className="text-sm leading-relaxed text-slate-700 font-medium">
                            {topper.gsStrategy.gs3}
                          </p>
                        </div>
                      )}
                      {activeStrategyPaper === "gs4" && (
                        <div>
                          <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">
                            GS4 Strategy (Ethics, Case Studies)
                          </div>
                          <p className="text-sm leading-relaxed text-slate-700 font-medium">
                            {topper.gsStrategy.gs4}
                          </p>
                        </div>
                      )}
                      {activeStrategyPaper === "essay" && (
                        <div>
                          <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">
                            Essay Writing Methodology
                          </div>
                          <p className="text-sm leading-relaxed text-slate-700 font-medium">
                            {topper.essayStrategy}
                          </p>
                        </div>
                      )}
                      {activeStrategyPaper === "optional" && (
                        <div>
                          <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">
                            Optional Strategy
                          </div>
                          <p className="text-sm leading-relaxed text-slate-700 font-medium">
                            {topper.optionalStrategy}
                          </p>
                        </div>
                      )}
                      {activeStrategyPaper === "prelims" && (
                        <div>
                          <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">
                            Prelims GS Paper 1 Strategy
                          </div>
                          <p className="text-sm leading-relaxed text-slate-700 font-medium">
                            {topper.prelimsStrategy}
                          </p>
                        </div>
                      )}
                      {activeStrategyPaper === "csat" && (
                        <div>
                          <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">
                            CSAT Strategy
                          </div>
                          <p className="text-sm leading-relaxed text-slate-700 font-medium">
                            {topper.csatStrategy}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Dynamic Extra Data Rendering */}
                  {topper.extraData && Object.keys(topper.extraData).length > 0 && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mt-4">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 mb-4">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        <span>Additional Info</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {Object.entries(topper.extraData).map(([key, value]) => (
                          <div key={key} className="bg-white p-3 rounded-lg border border-slate-100">
                            <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">{key}</div>
                            <div className="text-sm font-medium text-slate-700 whitespace-pre-wrap">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <TopperFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTopper}
        editingTopper={editingTopper}
      />
    </div>
  );
};
