import React, { useState } from "react";
import { StrategySetupItem, TopperProfile } from "../../types";
import { Search, Sparkles, BookOpen, UserCircle2 } from "lucide-react";

interface TopperStrategySetupTabProps {
  strategies: StrategySetupItem[];
  toppers: TopperProfile[];
}

export const TopperStrategySetupTab: React.FC<TopperStrategySetupTabProps> = ({
  strategies,
  toppers,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopperId, setSelectedTopperId] = useState<string>(
    toppers.length > 0 ? toppers[0].id : ""
  );
  const [activeStrategyPaper, setActiveStrategyPaper] = useState<
    "gs1" | "gs2" | "gs3" | "gs4" | "essay" | "optional" | "prelims" | "csat"
  >("gs1");

  const filteredStrategies = strategies.filter((s) => {
    const query = searchQuery.toLowerCase();
    return (
      s.title.toLowerCase().includes(query) ||
      s.content.toLowerCase().includes(query)
    );
  });

  const selectedTopper = toppers.find((t) => t.id === selectedTopperId);

  return (
    <div className="space-y-8">
      {/* Subject-Wise Blueprint Section */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span>Subject-Wise Blueprint</span>
          </h4>
          
          {/* Topper Selector */}
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 shadow-sm w-full sm:w-auto">
            <UserCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
            <select
              value={selectedTopperId}
              onChange={(e) => setSelectedTopperId(e.target.value)}
              className="bg-transparent text-slate-800 text-xs font-bold outline-none cursor-pointer flex-1 min-w-[150px]"
            >
              {toppers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedTopper ? (
          <div className="space-y-4">
            {/* Pill Navigation */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-1">
              {[
                { key: "gs1", label: "GS1" },
                { key: "gs2", label: "GS2" },
                { key: "gs3", label: "GS3" },
                { key: "gs4", label: "GS4" },
                { key: "essay", label: "Essay" },
                {
                  key: "optional",
                  label: `Optional (${selectedTopper.optional || 'Subject'})`,
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

            {/* Strategy Content Panel */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
              {activeStrategyPaper === "gs1" && (
                <div>
                  <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">
                    GS1 Strategy (History, Geography, Society)
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700 font-medium whitespace-pre-wrap">
                    {selectedTopper.gsStrategy.gs1 || "No strategy available."}
                  </p>
                </div>
              )}
              {activeStrategyPaper === "gs2" && (
                <div>
                  <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">
                    GS2 Strategy (Polity, Governance, IR)
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700 font-medium whitespace-pre-wrap">
                    {selectedTopper.gsStrategy.gs2 || "No strategy available."}
                  </p>
                </div>
              )}
              {activeStrategyPaper === "gs3" && (
                <div>
                  <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">
                    GS3 Strategy (Economy, Sci-Tech, Environment)
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700 font-medium whitespace-pre-wrap">
                    {selectedTopper.gsStrategy.gs3 || "No strategy available."}
                  </p>
                </div>
              )}
              {activeStrategyPaper === "gs4" && (
                <div>
                  <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">
                    GS4 Strategy (Ethics, Case Studies)
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700 font-medium whitespace-pre-wrap">
                    {selectedTopper.gsStrategy.gs4 || "No strategy available."}
                  </p>
                </div>
              )}
              {activeStrategyPaper === "essay" && (
                <div>
                  <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">
                    Essay Writing Methodology
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700 font-medium whitespace-pre-wrap">
                    {selectedTopper.essayStrategy || "No strategy available."}
                  </p>
                </div>
              )}
              {activeStrategyPaper === "optional" && (
                <div>
                  <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">
                    Optional Strategy
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700 font-medium whitespace-pre-wrap">
                    {selectedTopper.optionalStrategy || "No strategy available."}
                  </p>
                </div>
              )}
              {activeStrategyPaper === "prelims" && (
                <div>
                  <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">
                    Prelims GS Paper 1 Strategy
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700 font-medium whitespace-pre-wrap">
                    {selectedTopper.prelimsStrategy || "No strategy available."}
                  </p>
                </div>
              )}
              {activeStrategyPaper === "csat" && (
                <div>
                  <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">
                    CSAT Strategy
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700 font-medium whitespace-pre-wrap">
                    {selectedTopper.csatStrategy || "No strategy available."}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-sm text-slate-500 italic p-4 bg-slate-50 rounded-xl">
            Select a topper to view their blueprint.
          </div>
        )}
      </div>

      <hr className="border-slate-200 border-2 rounded-full" />

      {/* Existing Strategy Cards */}
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span>Master Strategies</span>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md ml-2">
              {filteredStrategies.length}
            </span>
          </h3>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search strategy..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStrategies.map((strategy) => (
            <div
              key={strategy.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full group relative"
            >
              <div className="p-4 flex-1 flex flex-col gap-3">
                <h4 className="font-bold text-sm text-slate-900 leading-tight">
                  {strategy.title}
                </h4>
                
                <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap flex-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {strategy.content}
                </div>

                {strategy.extraData && Object.keys(strategy.extraData).length > 0 && (
                  <div className="bg-indigo-50/50 p-3.5 rounded-xl border border-indigo-100 space-y-2 mt-2">
                    <div className="text-[11px] font-bold text-indigo-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Additional Info</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {Object.entries(strategy.extraData).map(([key, value]) => (
                        <div key={key} className="text-xs text-slate-700 flex flex-col gap-0.5 border-b border-indigo-100/50 pb-1.5 last:border-0 last:pb-0">
                          <span className="font-bold text-indigo-900">{key}</span>
                          <span className="whitespace-pre-wrap">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredStrategies.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white border border-slate-200 rounded-2xl border-dashed">
            <BookOpen className="w-12 h-12 text-slate-300 mb-3" />
            <h3 className="text-base font-bold text-slate-700 mb-1">
              No strategies found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm">
              We couldn't find any strategies matching your search criteria. Try a different search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
