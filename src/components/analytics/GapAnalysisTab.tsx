import React from "react";
import { GAP_ANALYSIS_METRICS } from "../../data/analyticsDefaults";
import {
  Layers,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  Scale,
  Download,
  BookOpen,
} from "lucide-react";

interface GapAnalysisTabProps {
  onOpenExportReport?: () => void;
}

export const GapAnalysisTab: React.FC<GapAnalysisTabProps> = ({
  onOpenExportReport,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-indigo-600" /> ROI Optimizer
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100">
              RAS/RPSC 2026 — Based on Excel Priority & MCQ Data
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            RAS Effort Gap Analysis
          </h2>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed mt-1">
            आपके अध्ययन समय की तुलना RPSC पेपर के subject-wise MCQ weightage से की गई है।
            ★★★★★ priority वाले subjects पर ध्यान दें — ये RAS Prelims में सबसे ज़्यादा MCQ लाते हैं।
          </p>
        </div>

        {onOpenExportReport && (
          <button
            onClick={onOpenExportReport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition cursor-pointer shrink-0"
            title="Export Gap Analysis as PDF/PNG"
          >
            <Download className="w-4 h-4 text-white" />
            <span>Export Report</span>
          </button>
        )}
      </div>

      {/* Priority Legend */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          RAS Priority Scale (Excel से derived)
        </p>
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-800 border border-rose-200">
            <span>★★★★★</span>
            <span>Ultra High — 20+ MCQ expected</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
            <span>★★★★☆</span>
            <span>High — 10–20 MCQ expected</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
            <span>★★★☆☆</span>
            <span>Medium — 5–10 MCQ expected</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
            <span>★★☆☆☆</span>
            <span>Low — 1–5 MCQ expected</span>
          </div>
        </div>
      </div>

      {/* Gap Analysis Cards */}
      <div className="space-y-4">
        {GAP_ANALYSIS_METRICS.map((gap, index) => {
          const isUnderAllocated = gap.status === "Under-Allocated";
          const isOverAllocated = gap.status === "Over-Allocated";
          const isBalanced = gap.status === "Balanced";

          return (
            <div
              key={index}
              className={`bg-white border-2 rounded-2xl p-6 shadow-sm space-y-4 transition ${
                isUnderAllocated
                  ? "border-rose-300"
                  : isOverAllocated
                  ? "border-amber-300"
                  : "border-emerald-300"
              }`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  {isUnderAllocated ? (
                    <TrendingDown className="w-4 h-4 text-rose-500 shrink-0" />
                  ) : isOverAllocated ? (
                    <TrendingUp className="w-4 h-4 text-amber-500 shrink-0" />
                  ) : (
                    <Minus className="w-4 h-4 text-emerald-500 shrink-0" />
                  )}
                  <h3 className="text-base font-bold text-slate-900">
                    {gap.subject}
                  </h3>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-md text-xs font-bold border self-start sm:self-auto ${
                    isUnderAllocated
                      ? "bg-rose-50 text-rose-700 border-rose-200"
                      : isOverAllocated
                      ? "bg-amber-50 text-amber-800 border-amber-200"
                      : "bg-emerald-50 text-emerald-700 border-emerald-200"
                  }`}
                >
                  {gap.status} (
                  {gap.deltaPercent > 0
                    ? `+${gap.deltaPercent}%`
                    : `${gap.deltaPercent}%`}{" "}
                  Gap)
                </span>
              </div>

              {/* Dual Visual Bars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Time Bar */}
                <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200 shadow-xs">
                  <div className="flex justify-between font-bold text-slate-700">
                    <span>आपका अध्ययन समय</span>
                    <span className="font-mono text-amber-700 font-bold">
                      {gap.actualTimePercent}% of Total Hours
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(gap.actualTimePercent * 3, 100)}%` }}
                    />
                  </div>
                </div>

                {/* RAS Weightage Bar */}
                <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200 shadow-xs">
                  <div className="flex justify-between font-bold text-slate-700">
                    <span>RPSC पेपर वेटेज (अनुमानित MCQ)</span>
                    <span className="font-mono text-indigo-600 font-bold">
                      {gap.idealWeightagePercent}% of Total Marks
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(gap.idealWeightagePercent * 3, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Recommendation with क्या करें */}
              <div
                className={`p-3.5 rounded-xl border text-xs text-slate-700 flex items-start gap-2.5 font-medium ${
                  isUnderAllocated
                    ? "bg-rose-50 border-rose-200"
                    : isOverAllocated
                    ? "bg-amber-50 border-amber-200"
                    : "bg-emerald-50 border-emerald-200"
                }`}
              >
                <BookOpen
                  className={`w-4 h-4 shrink-0 mt-0.5 ${
                    isUnderAllocated
                      ? "text-rose-600"
                      : isOverAllocated
                      ? "text-amber-600"
                      : "text-emerald-600"
                  }`}
                />
                <div>
                  <strong className="text-slate-900 font-bold block mb-0.5">
                    {isUnderAllocated
                      ? "⚠️ कम समय दे रहे हैं — बढ़ाएं:"
                      : isOverAllocated
                      ? "📉 ज़्यादा समय दे रहे हैं — Rebalance करें:"
                      : "✅ Balanced — Maintain करें:"}
                  </strong>
                  <span>{gap.recommendation}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Box */}
      <div className="bg-gradient-to-r from-indigo-50 to-slate-50 border-2 border-indigo-200 rounded-2xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-indigo-900 flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-indigo-600" />
          RAS Prelims Priority Summary — Excel Based
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-xs">
          {[
            { label: "राज्यव्यवस्था", stars: "★★★★★", mcq: "~25", color: "bg-rose-100 text-rose-800" },
            { label: "विज्ञान", stars: "★★★★★", mcq: "~20", color: "bg-rose-100 text-rose-800" },
            { label: "भूगोल", stars: "★★★★★", mcq: "~25", color: "bg-rose-100 text-rose-800" },
            { label: "राजस्थान GK", stars: "★★★★☆", mcq: "~30", color: "bg-amber-100 text-amber-800" },
            { label: "तर्कशक्ति", stars: "★★★★★", mcq: "~25", color: "bg-rose-100 text-rose-800" },
            { label: "अर्थव्यवस्था", stars: "★★★★★", mcq: "~12", color: "bg-rose-100 text-rose-800" },
            { label: "भारत इतिहास", stars: "★★★★☆", mcq: "~18", color: "bg-amber-100 text-amber-800" },
            { label: "समसामयिक", stars: "★★★★★", mcq: "~7", color: "bg-rose-100 text-rose-800" },
          ].map((item, i) => (
            <div key={i} className={`p-2 rounded-lg ${item.color} font-semibold`}>
              <div className="text-[10px] opacity-75">{item.stars} · {item.mcq} MCQ</div>
              <div>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
