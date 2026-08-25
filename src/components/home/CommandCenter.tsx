import React from "react";
import { Flame, Clock, Target, CalendarDays, CheckCircle2 } from "lucide-react";

interface CommandCenterProps {
  studyStreak: number;
  dailyGoalHours: number;
  totalStudyTime: number; // in seconds
  completedTasks: number;
  totalTasks: number;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  studyStreak,
  dailyGoalHours,
  totalStudyTime,
  completedTasks,
  totalTasks,
}) => {
  const studyMins = Math.floor(totalStudyTime / 60);
  const studyHours = Math.floor(studyMins / 60);
  const remainingMins = studyMins % 60;

  const dailyGoalMins = dailyGoalHours * 60;
  const progressPercent =
    Math.min(100, Math.round((studyMins / dailyGoalMins) * 100)) || 0;

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg border border-indigo-700/50 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4 flex-1">
          <div>
            <h2 className="text-sm text-indigo-200 font-bold tracking-widest uppercase mb-1">
              Good Morning 👋
            </h2>
            <div className="text-3xl font-extrabold tracking-tight">
              UPSC CSE 2027
            </div>
            <div className="text-indigo-300 text-sm font-medium mt-1 flex items-center gap-2">
              <CalendarDays className="w-4 h-4" /> Day 82 / 365
            </div>
          </div>

          <div className="w-full max-w-sm mt-6">
            <div className="flex items-center justify-between text-sm font-bold mb-2">
              <span className="text-white">Today's Progress</span>
              <span className="text-indigo-300">{progressPercent}%</span>
            </div>
            <div className="h-2.5 w-full bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full transition-all duration-1000 relative"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute inset-0 bg-white/20 w-full animate-pulse"></div>
              </div>
            </div>
            <div className="mt-2 text-xs text-indigo-300 font-medium">
              Study Time:{" "}
              <span className="text-white font-bold">
                {studyHours}h {remainingMins}m
              </span>{" "}
              / {dailyGoalHours}h
            </div>
          </div>
        </div>

        <div className="flex flex-row md:flex-col gap-3 shrink-0">
          <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center min-w-[120px]">
            <div className="flex items-center gap-1.5 text-orange-400 font-bold mb-1">
              <Flame className="w-4 h-4 fill-orange-400" />
              <span className="text-sm">STREAK</span>
            </div>
            <div className="text-2xl font-black text-white">
              {studyStreak} Days
            </div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center min-w-[120px]">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1">
              <Target className="w-4 h-4" />
              <span className="text-sm">TASKS</span>
            </div>
            <div className="text-2xl font-black text-white">
              {completedTasks}{" "}
              <span className="text-base text-slate-400 font-bold">
                / {totalTasks}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
