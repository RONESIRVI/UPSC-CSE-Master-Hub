import React, { useState, useEffect } from "react";
import { X, Plus, ChevronLeft, Calendar, Trash2 } from "lucide-react";
import { User } from "firebase/auth";
import { backupUserData } from "../../lib/cloudSync";

export interface DDayProject {
  id: string;
  name: string;
  startDate?: string | null;
  targetDate: string;
  goals?: string | null;
  isMain: boolean;
}

interface DDayManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: User | null;
}

const PremiumDatePicker = ({ value, onChange, placeholder, theme = 'default' }: { value: string, onChange: (d: string) => void, placeholder: string, theme?: 'default' | 'rose' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => value ? new Date(value) : new Date());

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleSelectDate = (day: number) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const yyyy = selected.getFullYear();
    const mm = String(selected.getMonth() + 1).padStart(2, '0');
    const dd = String(selected.getDate()).padStart(2, '0');
    onChange(`${yyyy}-${mm}-${dd}`);
    setIsOpen(false);
  };

  const isSelected = (day: number) => {
    if (!value) return false;
    const vDate = new Date(value);
    return vDate.getDate() === day && vDate.getMonth() === currentMonth.getMonth() && vDate.getFullYear() === currentMonth.getFullYear();
  };

  return (
    <div className="relative group">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center gap-2 transition-all p-4 rounded-2xl font-semibold shadow-sm cursor-pointer relative z-10 ${
          theme === 'rose' 
            ? 'bg-rose-50/50 border border-rose-200 hover:border-rose-300 hover:bg-rose-50 hover:shadow-[0_4px_15px_rgba(225,29,72,0.08)] text-rose-600'
            : 'bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600'
        }`}
      >
        <Calendar className={`w-5 h-5 ${theme === 'rose' ? 'text-rose-500' : 'text-slate-400 group-hover:text-slate-600 transition-colors'}`} />
        <span className={theme === 'rose' ? 'font-black text-[13px]' : 'text-[13px]'}>
          {value ? new Date(value).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : placeholder}
        </span>
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 p-5 w-[280px] bg-white/95 backdrop-blur-xl border border-rose-100 shadow-[0_20px_60px_rgba(225,29,72,0.15)] rounded-3xl z-50 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <button onClick={handlePrevMonth} className="p-2 bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-xl transition-colors cursor-pointer border border-slate-100 hover:border-rose-200">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <h4 className="font-black text-slate-800 text-sm">
                {monthNames[currentMonth.getMonth()]} <span className="text-rose-500">{currentMonth.getFullYear()}</span>
              </h4>
              <button onClick={handleNextMonth} className="p-2 bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-xl transition-colors rotate-180 cursor-pointer border border-slate-100 hover:border-rose-200">
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map(d => (
                <div key={d} className="text-center text-[9px] font-black text-slate-400 uppercase tracking-widest py-1">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const selected = isSelected(day);
                return (
                  <button
                    key={day}
                    onClick={() => handleSelectDate(day)}
                    className={`w-full aspect-square flex items-center justify-center text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      selected 
                        ? 'bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-[0_4px_10px_rgba(225,29,72,0.4)] scale-110 z-10 relative'
                        : 'text-slate-700 hover:bg-rose-50 hover:text-rose-600 hover:scale-110 z-0 relative'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export const DDayManagerModal: React.FC<DDayManagerModalProps> = ({ isOpen, onClose, currentUser }) => {
  const [projects, setProjects] = useState<DDayProject[]>([]);
  const [view, setView] = useState<"list" | "form">("list");
  const [editingProject, setEditingProject] = useState<DDayProject | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [goals, setGoals] = useState("");
  const [isMain, setIsMain] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isOpen) {
      const stored = localStorage.getItem("d_day_projects");
      if (stored && stored !== "null") {
        try {
          const parsed = JSON.parse(stored);
          setProjects(Array.isArray(parsed) ? parsed : []);
        } catch (e) {
          setProjects([]);
        }
      } else {
        // Migration from old single target_d_day
        const oldTarget = localStorage.getItem("target_d_day");
        if (oldTarget) {
          const legacyProject: DDayProject = {
            id: Date.now().toString(),
            name: "Mission D-Day",
            targetDate: oldTarget,
            isMain: true,
          };
          setProjects([legacyProject]);
          localStorage.setItem("d_day_projects", JSON.stringify([legacyProject]));
        }
      }
    }
  }, [isOpen]);

  const saveProjects = (newProjects: DDayProject[]) => {
    setProjects(newProjects);
    localStorage.setItem("d_day_projects", JSON.stringify(newProjects));
    // Dispatch event so ProfileCard3D can update immediately
    window.dispatchEvent(new Event("d_day_updated"));
    
    // Backup to Firebase
    if (currentUser) {
      backupUserData(currentUser.uid, { dDays: newProjects });
    }
  };

  const handleAddClick = () => {
    setEditingProject(null);
    setName("");
    setStartDate("");
    setTargetDate("");
    setGoals("");
    setErrorMsg("");
    setIsMain(projects.length === 0); // Default to main if first project
    setView("form");
  };

  const handleEditClick = (p: DDayProject) => {
    setEditingProject(p);
    setName(p.name);
    setStartDate(p.startDate || "");
    setTargetDate(p.targetDate);
    setGoals(p.goals || "");
    setErrorMsg("");
    setIsMain(p.isMain);
    setView("form");
  };

  const handleDelete = (id: string) => {
    // Direct deletion to avoid Capacitor window.confirm bugs
    const updated = projects.filter((p) => p.id !== id);
    // if we deleted the main, and there are others, make the first one main
    if (updated.length > 0 && !updated.some(p => p.isMain)) {
      updated[0].isMain = true;
    }
    saveProjects(updated);
  };

  const handleSaveForm = () => {
    if (!name.trim() || !targetDate) {
      setErrorMsg("Name and Target Date are required!");
      return;
    }

    let updatedList = [...projects];

    // If this is set as main, unset others
    if (isMain) {
      updatedList = updatedList.map((p) => ({ ...p, isMain: false }));
    }

    const payload: DDayProject = {
      id: editingProject ? editingProject.id : Date.now().toString(),
      name: name.trim(),
      startDate: startDate || null,
      targetDate,
      goals: goals || null,
      isMain,
    };

    if (editingProject) {
      updatedList = updatedList.map((p) => (p.id === payload.id ? payload : p));
    } else {
      updatedList.push(payload);
    }

    // Ensure at least one is main if any exist
    if (updatedList.length > 0 && !updatedList.some((p) => p.isMain)) {
      updatedList[0].isMain = true;
    }

    saveProjects(updatedList);
    setView("list");
  };

  const calculateDaysLeft = (targetDateStr: string) => {
    const targetDateObj = new Date(targetDateStr);
    const today = new Date();
    targetDateObj.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diff = targetDateObj.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-md sm:overflow-y-auto">
      <div className="bg-white/95 w-full h-full sm:h-[650px] sm:max-w-md sm:rounded-[32px] shadow-[0_20px_60px_rgba(225,29,72,0.15)] flex flex-col relative overflow-hidden text-slate-800 border border-white">
        
        {/* Background Glow */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-rose-500/10 to-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-indigo-500/5 to-transparent rounded-full blur-[80px] pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-6 border-b border-rose-50/50 bg-white/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            {view === "form" ? (
              <button onClick={() => setView("list")} className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-full transition-colors shadow-sm border border-slate-100 cursor-pointer">
                <ChevronLeft className="w-5 h-5" />
              </button>
            ) : (
              <button onClick={onClose} className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-full transition-colors shadow-sm border border-slate-100 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            )}
            <div>
              <h2 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-orange-500 tracking-wide">
                {view === "list" ? "Project D-Day Pro" : editingProject ? "Edit Mission" : "New Mission"}
              </h2>
            </div>
          </div>
          {view === "form" ? (
            <button onClick={handleSaveForm} className="px-5 py-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:shadow-[0_4px_15px_rgba(225,29,72,0.3)] hover:scale-105 transition-all cursor-pointer">
              Save
            </button>
          ) : (
            <button onClick={handleAddClick} className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:shadow-[0_4px_15px_rgba(225,29,72,0.3)] hover:scale-105 transition-all cursor-pointer">
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 overflow-y-auto p-5 pb-24 custom-scrollbar">
          {view === "list" && (
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-rose-500/70 uppercase tracking-[0.2em] px-2 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> Active Missions
              </h3>
              
              {projects.length === 0 ? (
                <div className="text-center py-16 px-4 bg-slate-50 border border-slate-100 rounded-3xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-200">
                    <Calendar className="w-8 h-8 text-rose-500" />
                  </div>
                  <p className="text-slate-700 font-black mb-1">No Missions Yet</p>
                  <p className="text-xs text-slate-500 font-medium">Create your first target date to begin tracking.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((p) => {
                    const daysLeft = calculateDaysLeft(p.targetDate);
                    return (
                      <div key={p.id} onClick={() => handleEditClick(p)} className={`relative p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer group overflow-hidden ${p.isMain ? 'border-rose-200 bg-gradient-to-br from-rose-50 to-orange-50/50 shadow-[0_4px_15px_rgba(225,29,72,0.08)] hover:shadow-[0_4px_15px_rgba(225,29,72,0.15)] hover:-translate-y-0.5' : 'border-slate-200 bg-white hover:bg-slate-50 hover:-translate-y-0.5'}`}>
                        {p.isMain && <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent pointer-events-none" />}
                        <div className="relative z-10 flex justify-between items-center">
                          <div className="flex-1 min-w-0 pr-3">
                            <div className="flex items-center gap-2 mb-0.5">
                              <h4 className="font-bold text-slate-800 text-sm truncate group-hover:text-rose-600 transition-colors">{p.name}</h4>
                              {p.isMain && <span className="px-1.5 py-0.5 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-[8px] font-black uppercase tracking-widest rounded shadow-sm">MAIN</span>}
                            </div>
                            <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1 mb-1">
                              <Calendar className="w-3 h-3 text-rose-500/60" /> 
                              {new Date(p.targetDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                            {p.goals && (
                              <p className="text-[10px] text-slate-600 line-clamp-1 italic">{p.goals}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-3 border-l border-slate-200 pl-3">
                            <div className="text-right min-w-[3rem]">
                              <span className={`text-lg font-black tracking-tighter ${daysLeft < 0 ? 'text-rose-500' : 'text-slate-800'}`}>
                                D{daysLeft < 0 ? '+' + Math.abs(daysLeft) : '-' + daysLeft}
                              </span>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); handleDelete(p.id); }} className="p-1.5 text-slate-300 hover:text-white hover:bg-rose-500 hover:shadow-md rounded-full transition-all cursor-pointer">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {view === "form" && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              
              {errorMsg && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-rose-600 text-xs font-bold tracking-wide">{errorMsg}</span>
                </div>
              )}

              <label className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-white hover:border-rose-200 transition-all group shadow-sm">
                <div>
                  <span className="block font-black text-slate-800 mb-0.5">Primary Mission</span>
                  <span className="text-[10px] text-slate-500 font-medium">Set as your main focus on the dashboard</span>
                </div>
                <div className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${isMain ? 'bg-rose-500' : 'bg-slate-300'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${isMain ? 'left-7 shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'left-1'}`} />
                </div>
                <input type="checkbox" checked={isMain} onChange={(e) => setIsMain(e.target.checked)} className="hidden" />
              </label>

              <div className="space-y-2">
                <span className="text-slate-500 font-black text-[10px] uppercase tracking-widest px-1">Mission Name</span>
                <input 
                  type="text" 
                  placeholder="e.g. UPSC CSE Prelims 2026" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-slate-200 text-slate-800 font-bold rounded-2xl p-4 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10 transition-all outline-none placeholder:text-slate-400 shadow-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-slate-500 font-black text-[10px] uppercase tracking-widest px-1">Start date</span>
                  <PremiumDatePicker 
                    value={startDate}
                    onChange={(d) => setStartDate(d)}
                    placeholder="Optional"
                    theme="default"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-rose-500 font-black text-[10px] uppercase tracking-widest px-1">Target D-Day</span>
                  <PremiumDatePicker 
                    value={targetDate}
                    onChange={(d) => setTargetDate(d)}
                    placeholder="Required"
                    theme="rose"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-slate-500 font-black text-[10px] uppercase tracking-widest px-1">Mission Goals / Motivation</span>
                <textarea 
                  placeholder="Why are you doing this? What's your target score?" 
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  rows={4}
                  className="w-full bg-white border border-slate-200 text-slate-700 font-medium text-sm rounded-2xl p-4 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10 transition-all outline-none resize-none placeholder:text-slate-400 custom-scrollbar shadow-sm"
                />
              </div>

            </div>
          )}
        </div>



      </div>
    </div>
  );
};
