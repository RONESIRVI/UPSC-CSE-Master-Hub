import React, { useState } from "react";
import { TOPPER_ROUTINES } from "../../data/toppersData";
import { TopperRoutine } from "../../types";
import { 
  Clock, 
  Sun, 
  Moon, 
  Coffee, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  Zap
} from "lucide-react";

interface TopperRoutineTabProps {
  onAdoptRoutine: (routine: TopperRoutine) => void;
}

export const TopperRoutineTab: React.FC<TopperRoutineTabProps> = ({ onAdoptRoutine }) => {
  const [selectedRoutine, setSelectedRoutine] = useState<TopperRoutine>(TOPPER_ROUTINES[0]);
  const [adoptedAlert, setAdoptedAlert] = useState<boolean>(false);

  const handleAdopt = () => {
    onAdoptRoutine(selectedRoutine);
    setAdoptedAlert(true);
    setTimeout(() => setAdoptedAlert(false), 3500);
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case "GS":
        return "bg-indigo-50 text-indigo-700 border-indigo-100";
      case "Optional":
        return "bg-purple-50 text-purple-700 border-purple-100";
      case "Current Affairs":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Answer Writing":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "CSAT / Revision":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Bento Card */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-600" /> Circadian Rhythm Mastery
              </span>
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Hour-by-Hour Breakdown</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Toppers' Daily Timetables & Routines
            </h2>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed mt-1">
              Examine how AIR 1 rankers balance static GS, optional papers, daily answer writing, newspaper editorials, and active spaced revision without experiencing cognitive burnout.
            </p>
          </div>

          {/* Routine Switcher Selector Bento Box */}
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 shrink-0 shadow-sm">
            <select
              value={selectedRoutine.id}
              onChange={(e) => {
                const found = TOPPER_ROUTINES.find(r => r.id === e.target.value);
                if (found) setSelectedRoutine(found);
              }}
              className="bg-transparent text-slate-900 text-xs font-bold outline-none cursor-pointer"
            >
              {TOPPER_ROUTINES.map(r => (
                <option key={r.id} value={r.id} className="bg-white text-slate-900 font-medium">{r.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Adopted alert message */}
        {adoptedAlert && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Success! Adopted "{selectedRoutine.title}" as your active daily tracking routine template in Preparation Tracker.</span>
          </div>
        )}
      </div>

      {/* Routine Overview Bento Box */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        
        {/* Header Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{selectedRoutine.type}</span>
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{selectedRoutine.title}</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Practiced by: <span className="text-slate-800 font-bold">{selectedRoutine.topperRef}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center shadow-xs">
              <div className="text-[10px] uppercase font-bold text-slate-400">Total Study Time</div>
              <div className="text-base font-extrabold text-indigo-600">{selectedRoutine.totalStudyHours} Hours / Day</div>
            </div>

            <button
              onClick={handleAdopt}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm active:scale-95 transition"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Adopt this Routine</span>
            </button>
          </div>
        </div>

        {/* Wake up and sleep markers Bento Row */}
        <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
          <div className="flex items-center gap-2 text-amber-700 font-bold">
            <Sun className="w-4 h-4 text-amber-500" />
            <span>Wake-up Time: <strong className="text-slate-900">{selectedRoutine.wakeUpTime}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-indigo-700 font-bold">
            <Moon className="w-4 h-4 text-indigo-600" />
            <span>Sleep Time: <strong className="text-slate-900">{selectedRoutine.sleepTime}</strong></span>
          </div>
        </div>

        {/* Timetable Schedule Grid */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            <span>Hourly Study & Revision Slots</span>
          </h4>

          <div className="space-y-2.5">
            {selectedRoutine.schedule.map((slot, index) => (
              <div
                key={index}
                className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition shadow-xs"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100 shrink-0">
                    {slot.time}
                  </span>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{slot.activity}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{slot.description}</div>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border self-start sm:self-auto shrink-0 ${getCategoryBadge(slot.category)}`}>
                  {slot.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Routine Success Tips Bento Box */}
        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-4 space-y-2">
          <div className="text-xs font-bold text-indigo-800 uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-indigo-600 fill-indigo-600" />
            <span>Execution Tips for this Routine</span>
          </div>
          <ul className="text-xs text-slate-700 space-y-1.5 font-medium">
            {selectedRoutine.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};
