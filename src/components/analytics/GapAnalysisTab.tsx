import React from "react";
import { GAP_ANALYSIS_METRICS } from "../../data/analyticsDefaults";
import { 
  Layers, 
  AlertCircle, 
  TrendingUp, 
  Sparkles, 
  ArrowRight,
  Scale,
  Download
} from "lucide-react";

interface GapAnalysisTabProps {
  onOpenExportReport?: () => void;
}

export const GapAnalysisTab: React.FC<GapAnalysisTabProps> = ({
  onOpenExportReport
}) => {
  return (
    <div className="space-y-6">
      
      {/* Top Banner Bento Card */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-indigo-600" /> ROI Optimizer
            </span>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Time Invested vs Exam Weightage</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Gap Analysis & Effort Allocation Deficit
          </h2>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed mt-1">
            Many aspirants over-invest in low-yield subtopics (e.g. Ancient & Medieval History) while neglecting high-yield game-changers (GS4 Ethics, CSAT, Essay, and Optional). Align your study time with marks return on investment.
          </p>
        </div>

        {onOpenExportReport && (
          <button
            onClick={onOpenExportReport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition cursor-pointer shrink-0"
            title="Export Gap Analysis and ROI metrics as PDF/PNG"
          >
            <Download className="w-4 h-4 text-white" />
            <span>Export Report</span>
          </button>
        )}
      </div>

      {/* Gap Analysis Visual Comparison Cards */}
      <div className="space-y-4">
        {GAP_ANALYSIS_METRICS.map((gap, index) => {
          const isUnderAllocated = gap.status === "Under-Allocated";
          const isOverAllocated = gap.status === "Over-Allocated";

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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">{gap.subject}</h3>
                </div>

                <span className={`px-2.5 py-1 rounded-md text-xs font-bold border self-start sm:self-auto ${
                  isUnderAllocated
                    ? "bg-rose-50 text-rose-700 border-rose-200"
                    : isOverAllocated
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                }`}>
                  {gap.status} ({gap.deltaPercent > 0 ? `+${gap.deltaPercent}%` : `${gap.deltaPercent}%`} Gap)
                </span>
              </div>

              {/* Dual Visual Bars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Time Invested Bar */}
                <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200 shadow-xs">
                  <div className="flex justify-between font-bold text-slate-700">
                    <span>Your Actual Time Allocation</span>
                    <span className="font-mono text-amber-700 font-bold">{gap.actualTimePercent}% of Total Hours</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${gap.actualTimePercent * 3}%` }}
                    />
                  </div>
                </div>

                {/* UPSC Weightage Bar */}
                <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200 shadow-xs">
                  <div className="flex justify-between font-bold text-slate-700">
                    <span>UPSC Exam Weightage Share</span>
                    <span className="font-mono text-indigo-600 font-bold">{gap.idealWeightagePercent}% of Total Marks</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${gap.idealWeightagePercent * 3}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Actionable Strategy Rebalancing */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5 font-medium">
                <AlertCircle className={`w-4 h-4 shrink-0 mt-0.5 ${isUnderAllocated ? "text-rose-600" : "text-amber-600"}`} />
                <div>
                  <strong className="text-slate-900 font-bold">Recommendation: </strong>
                  <span>{gap.recommendation}</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
