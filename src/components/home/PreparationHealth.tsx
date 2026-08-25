import React from "react";
import { Activity, ShieldAlert, CheckCircle2 } from "lucide-react";
import { PreparationHealth } from "../../types";

interface PreparationHealthProps {
  health: PreparationHealth;
}

export const PreparationHealthScore: React.FC<PreparationHealthProps> = ({
  health,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-emerald-50 border-emerald-200";
    if (score >= 60) return "bg-amber-50 border-amber-200";
    return "bg-red-50 border-red-200";
  };

  const metricsList = [
    { label: "Study Hours", value: health.metrics.studyHours },
    { label: "PYQ Accuracy", value: health.metrics.pyq },
    { label: "Revision", value: health.metrics.revision },
    { label: "Mock Tests", value: health.metrics.tests },
    { label: "Answer Writing", value: health.metrics.answers },
    { label: "Syllabus Progress", value: health.metrics.syllabus },
  ];

  return (
    <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-600" />
          My Preparation Health
        </h3>

        <div
          className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${getScoreBg(
            health.overallScore
          )}`}
        >
          <div className="text-[10px] uppercase font-bold text-slate-600">
            Health Score
          </div>
          <div
            className={`text-xl font-black ${getScoreColor(
              health.overallScore
            )}`}
          >
            {health.overallScore}{" "}
            <span className="text-xs text-slate-400 font-bold">/ 100</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {metricsList.map((metric) => (
          <div key={metric.label}>
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-slate-700">{metric.label}</span>
              <span className={getScoreColor(metric.value)}>
                {metric.value}%
              </span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  metric.value >= 80
                    ? "bg-emerald-500"
                    : metric.value >= 60
                    ? "bg-amber-400"
                    : "bg-red-500"
                }`}
                style={{ width: `${metric.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-start gap-2.5">
          {health.overallScore >= 75 ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
          )}
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            {health.overallScore >= 75
              ? "Your preparation is on track. Keep maintaining consistency across all parameters."
              : "Your revision and answer writing scores are pulling your health down. Allocate more time to these areas."}
          </p>
        </div>
      </div>
    </div>
  );
};
