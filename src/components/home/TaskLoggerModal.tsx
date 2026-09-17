import React, { useState, useEffect } from "react";
import { DailyTask, StudySessionLog, SyllabusTopic } from "../../types";
import { X, Save, BookOpen, Clock, Layers, Type } from "lucide-react";

interface TaskLoggerModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: DailyTask | null;
  syllabus: SyllabusTopic[];
  onSave: (log: StudySessionLog) => void;
}

export const TaskLoggerModal: React.FC<TaskLoggerModalProps> = ({
  isOpen,
  onClose,
  task,
  syllabus,
  onSave,
}) => {
  const [paper, setPaper] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [amountStudied, setAmountStudied] = useState("");
  const [durationMinutes, setDurationMinutes] = useState<number>(60);

  // Extract unique papers, subjects, and topics from syllabus
  const uniquePapers = Array.from(new Set(syllabus.map((s) => s.paper))).filter(Boolean);
  
  const subjectsForPaper = Array.from(
    new Set(syllabus.filter((s) => !paper || s.paper === paper).map((s) => s.subject))
  ).filter(Boolean);
  
  const topicsForSubject = Array.from(
    new Set(
      syllabus
        .filter((s) => (!paper || s.paper === paper) && (!subject || s.subject === subject))
        .map((s) => s.title)
    )
  ).filter(Boolean);

  useEffect(() => {
    if (task) {
      // Try to match task info to prefill the form
      let matchedSubject = task.subject || "";
      let matchedPaper = "";
      
      if (matchedSubject) {
        const match = syllabus.find(s => s.subject === matchedSubject);
        if (match) matchedPaper = match.paper;
      } else {
        const match = syllabus.find(s => s.title === task.title);
        if (match) {
          matchedSubject = match.subject;
          matchedPaper = match.paper;
        }
      }
      
      setPaper(matchedPaper);
      setSubject(matchedSubject);
      setTopic(task.title || "");
      
      // Auto duration based on timeSlot if possible
      setDurationMinutes(60); // default
      setAmountStudied("");
    }
  }, [task, syllabus]);

  if (!isOpen || !task) return null;

  const handleSave = () => {
    const newLog: StudySessionLog = {
      id: `log-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      subject: subject || task.subject || "General",
      paper: paper || "General",
      durationMinutes: durationMinutes,
      topicCovered: topic || task.title || "Study Session",
      taskType: task.type === "revision" ? "revision" : "study",
      qualityRating: 4, // Default
      notes: amountStudied ? `Amount Read: ${amountStudied}` : undefined,
    };
    onSave(newLog);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-800">Log Study Session</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl mb-2">
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block mb-1">Task Selected</span>
            <span className="text-sm font-bold text-indigo-900">{task.timeSlot} • {task.title}</span>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 uppercase flex items-center gap-1.5 mb-1">
              <Layers className="w-3.5 h-3.5" /> Paper
            </label>
            <select
              value={paper}
              onChange={(e) => {
                setPaper(e.target.value);
                setSubject("");
                setTopic("");
              }}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-3 py-2"
            >
              <option value="">-- Select Paper --</option>
              {uniquePapers.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 uppercase flex items-center gap-1.5 mb-1">
              <BookOpen className="w-3.5 h-3.5" /> Subject
            </label>
            <select
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setTopic("");
              }}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-3 py-2"
            >
              <option value="">-- Select Subject --</option>
              {subjectsForPaper.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 uppercase flex items-center gap-1.5 mb-1">
              <Type className="w-3.5 h-3.5" /> Topic / Subtopic
            </label>
            {topicsForSubject.length > 0 ? (
               <select
                 value={topic}
                 onChange={(e) => setTopic(e.target.value)}
                 className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-3 py-2"
               >
                 <option value="">-- Select Topic --</option>
                 {topicsForSubject.map(t => <option key={t} value={t}>{t}</option>)}
               </select>
            ) : (
               <input
                 type="text"
                 value={topic}
                 onChange={(e) => setTopic(e.target.value)}
                 placeholder="Enter topic manually..."
                 className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-3 py-2"
               />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="text-xs font-bold text-slate-600 uppercase flex items-center gap-1.5 mb-1">
                 Amount Studied
               </label>
               <input
                 type="text"
                 value={amountStudied}
                 onChange={(e) => setAmountStudied(e.target.value)}
                 placeholder="e.g. 15 Pages, Ch-3"
                 className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-3 py-2"
               />
             </div>
             <div>
               <label className="text-xs font-bold text-slate-600 uppercase flex items-center gap-1.5 mb-1">
                 <Clock className="w-3.5 h-3.5" /> Duration (mins)
               </label>
               <input
                 type="number"
                 min="1"
                 value={durationMinutes}
                 onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 0)}
                 className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-3 py-2"
               />
             </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={handleSave}
            disabled={durationMinutes <= 0 || !subject || !topic}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold transition shadow-sm"
          >
            <Save className="w-4 h-4" /> Save Session
          </button>
        </div>
      </div>
    </div>
  );
};
