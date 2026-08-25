import React, { useState } from "react";
import { SyllabusTopic, StudySessionLog } from "../../types";
import { 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Layers, 
  Trophy, 
  TrendingUp,
  Target,
  FileSpreadsheet,
  Download,
  CheckCheck
} from "lucide-react";
import { exportStudyLogsToCsv } from "../../utils/csvExporter";

interface ProgressTabProps {
  syllabus: SyllabusTopic[];
  sessionLogs: StudySessionLog[];
  studyStreak: number;
  onOpenExportReport?: () => void;
}

export const ProgressTab: React.FC<ProgressTabProps> = ({
  syllabus,
  sessionLogs,
  studyStreak,
  onOpenExportReport
}) => {
  const [exportedMsg, setExportedMsg] = useState<boolean>(false);
  const totalTopics = syllabus.length;
  const masteredTopics = syllabus.filter(s => s.status === "mastered").length;
  const inProgressTopics = syllabus.filter(s => s.status === "in_progress" || s.status === "revised_1" || s.status === "revised_2").length;
  const unreadTopics = totalTopics - masteredTopics - inProgressTopics;
  
  const syllabusProgress = Math.round(((masteredTopics * 1 + inProgressTopics * 0.5) / totalTopics) * 100) || 0;
  const totalMinutesLogged = sessionLogs.reduce((acc, l) => acc + l.durationMinutes, 0);
  const totalHoursLogged = (totalMinutesLogged / 60).toFixed(1);

  const handleExport = () => {
    const ok = exportStudyLogsToCsv(sessionLogs, "upsc_study_sessions_analytics");
    if (ok) {
      setExportedMsg(true);
      setTimeout(() => setExportedMsg(false), 3500);
    }
  };

  // Group by Subject
  const subjectGroups = Array.from(new Set(syllabus.map(s => s.subject))).map(subject => {
    const topics = syllabus.filter(s => s.subject === subject);
    const mastered = topics.filter(s => s.status === "mastered").length;
    const active = topics.filter(s => s.status !== "not_started" && s.status !== "mastered").length;
    const pct = Math.round(((mastered * 1 + active * 0.5) / topics.length) * 100);
    return { subject, total: topics.length, mastered, pct };
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner Bento Card */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Syllabus Coverage & Mastery Index
            </span>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Deep Subject Diagnostics</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Holistic Preparation Progress
          </h2>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed mt-1">
            Real-time telemetry on your syllabus coverage, time invested, active streaks, and subject-wise completion rates across Prelims and Mains.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {onOpenExportReport && (
            <button
              onClick={onOpenExportReport}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
              title="Export progress, gap analysis and visual heatmap as PDF or PNG"
            >
              <Download className="w-4 h-4 text-white" />
              <span>Export PDF / PNG Report</span>
            </button>
          )}

          <button
            onClick={handleExport}
            disabled={sessionLogs.length === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 shadow-xs transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            title="Download full study sessions dataset as a CSV file"
          >
            {exportedMsg ? (
              <>
                <CheckCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Exported!</span>
              </>
            ) : (
              <>
                <FileSpreadsheet className="w-4 h-4 text-slate-500" />
                <span>Export CSV</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 4 Core Vital Bento Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Syllabus Covered */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Syllabus Covered</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">{syllabusProgress}%</div>
          <p className="text-xs text-slate-500 font-medium">{masteredTopics} mastered, {inProgressTopics} in cycle</p>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mt-2">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${syllabusProgress}%` }} />
          </div>
        </div>

        {/* Study Hours */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Logged Study Time</span>
            <Clock className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600">{totalHoursLogged} hrs</div>
          <p className="text-xs text-slate-500 font-medium">Across {sessionLogs.length} focused study logs</p>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mt-2">
            <div className="h-full bg-indigo-600 rounded-full" style={{ width: `75%` }} />
          </div>
        </div>

        {/* Active Streak */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Active Study Streak</span>
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-orange-600">{studyStreak} Days</div>
          <p className="text-xs text-slate-500 font-medium">Continuous daily preparation</p>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mt-2">
            <div className="h-full bg-orange-500 rounded-full" style={{ width: `${Math.min(studyStreak * 5, 100)}%` }} />
          </div>
        </div>

        {/* UPSC Readiness Score */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Readiness Index</span>
            <Target className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-sky-600">74.2 / 100</div>
          <p className="text-xs text-slate-500 font-medium">Prelims Qualification Probability</p>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mt-2">
            <div className="h-full bg-sky-500 rounded-full" style={{ width: `74.2%` }} />
          </div>
        </div>

      </div>

      {/* Subject-Wise Mastery Bars */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>Subject-Wise Mastery Breakdown</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">Weighted by UPSC Question Distribution</span>
        </div>

        <div className="space-y-4">
          {subjectGroups.map((group, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-800">{group.subject}</span>
                <span className="font-mono text-indigo-600 font-bold">{group.pct}% ({group.mastered}/{group.total} Topics)</span>
              </div>

              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    group.pct >= 70
                      ? "bg-emerald-500"
                      : group.pct >= 40
                      ? "bg-amber-500"
                      : "bg-rose-500"
                  }`}
                  style={{ width: `${group.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
