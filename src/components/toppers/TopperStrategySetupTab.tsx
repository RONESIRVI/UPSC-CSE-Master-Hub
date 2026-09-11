import React, { useState } from "react";
import { StrategySetupItem } from "../../types";
import { Search, Sparkles, BookOpen } from "lucide-react";

interface TopperStrategySetupTabProps {
  strategies: StrategySetupItem[];
}

export const TopperStrategySetupTab: React.FC<TopperStrategySetupTabProps> = ({
  strategies,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStrategies = strategies.filter((s) => {
    const query = searchQuery.toLowerCase();
    return (
      s.title.toLowerCase().includes(query) ||
      s.content.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span>Master Strategies</span>
          </h3>
          <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
            {filteredStrategies.length} Total
          </div>
        </div>

        <div className="relative">
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

      {/* Strategy Cards Grid */}
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

              {/* Dynamic Extra Data */}
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
  );
};
