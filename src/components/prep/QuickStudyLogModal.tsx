import React, { useState } from "react";
import { StudySessionLog, SyllabusTopic } from "../../types";
import {
  Clock,
  X,
  Check,
  Sparkles,
  BookOpen,
  Star,
  Layers,
  CheckCircle2,
  Calendar,
  Zap,
} from "lucide-react";

interface QuickStudyLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSessionLog: (log: StudySessionLog) => void;
  syllabus?: SyllabusTopic[];
}

export const QuickStudyLogModal: React.FC<QuickStudyLogModalProps> = ({
  isOpen,
  onClose,
  onAddSessionLog,
  syllabus = [],
}) => {
  const todayStr = new Date().toISOString().split("T")[0];

  const [subject, setSubject] = useState<string>("Indian Polity");
  const [paper, setPaper] = useState<string>("Prelims GS1");
  const [topicCovered, setTopicCovered] = useState<string>("");
  const [durationMinutes, setDurationMinutes] = useState<number>(45);
  const [qualityRating, setQualityRating] = useState<1 | 2 | 3 | 4 | 5>(4);
  const [notes, setNotes] = useState<string>("");
  const [date, setDate] = useState<string>(todayStr);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const quickDurations = [15, 25, 45, 60, 90, 120, 180];

  const standardSubjects = [
    "Indian Polity",
    "Modern Indian History",
    "Indian Economy",
    "Environment & Ecology",
    "Physical & Indian Geography",
    "CSAT Paper II",
    "Ethics (GS4)",
    "Optional Subject",
    "Current Affairs",
    "Mains Answer Writing",
    "Science & Technology",
    "Art & Culture",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicCovered.trim()) return;

    const newLog: StudySessionLog = {
      id: `log-${Date.now()}`,
      date: date || todayStr,
      subject,
      paper,
      durationMinutes: Math.max(Number(durationMinutes) || 15, 1),
      topicCovered: topicCovered.trim(),
      qualityRating,
      notes: notes.trim() || undefined,
    };

    onAddSessionLog(newLog);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      // Reset form
      setTopicCovered("");
      setNotes("");
    }, 550);
  };

  // Filter topics for quick suggestions based on chosen subject
  const suggestedTopics = syllabus
    .filter(
      (s) =>
        s.subject.toLowerCase().includes(subject.toLowerCase().slice(0, 5)) ||
        subject.toLowerCase().includes(s.subject.toLowerCase().slice(0, 5))
    )
    .slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 relative max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 shadow-2xs">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                  Instant Log Mode
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Updates Daily Progress
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                Quick Study Session Log
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            title="Close log modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Feedback Overlay */}
        {showSuccess ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-3 text-center animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border-2 border-emerald-300 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-slate-900">
              Study Session Logged!
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              +{durationMinutes} mins added to today's study telemetry and
              streak tracking.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Subject & Paper Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Subject Category <span className="text-rose-500">*</span>
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 outline-none font-bold focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  {standardSubjects.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Target Paper
                </label>
                <select
                  value={paper}
                  onChange={(e) => setPaper(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 outline-none font-bold focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="Prelims GS1">Prelims GS1</option>
                  <option value="Prelims CSAT">Prelims CSAT</option>
                  <option value="Mains GS1">Mains GS1</option>
                  <option value="Mains GS2">Mains GS2</option>
                  <option value="Mains GS3">Mains GS3</option>
                  <option value="Mains GS4">Mains GS4</option>
                  <option value="Mains Essay">Mains Essay</option>
                  <option value="Optional Subject">Optional Subject</option>
                </select>
              </div>
            </div>

            {/* Topic Input */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Topic / Chapter Studied{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <span className="text-[10px] text-slate-400 font-mono">
                  e.g. Fundamental Rights Art 19-22
                </span>
              </div>
              <input
                type="text"
                required
                placeholder="e.g. Directive Principles of State Policy or Fiscal Deficit Calculation"
                value={topicCovered}
                onChange={(e) => setTopicCovered(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 outline-none font-bold focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400 placeholder:font-normal"
              />

              {/* Quick Topic Chips from Syllabus */}
              {suggestedTopics.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    Quick Pick:
                  </span>
                  {suggestedTopics.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTopicCovered(t.title)}
                      className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 border border-slate-200 transition cursor-pointer truncate max-w-[200px]"
                      title={t.title}
                    >
                      {t.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Duration Selector */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Duration Invested
                </label>
                <span className="text-xs font-mono font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-100">
                  {durationMinutes} Minutes ({(durationMinutes / 60).toFixed(1)}{" "}
                  hrs)
                </span>
              </div>

              {/* Quick Preset Buttons */}
              <div className="grid grid-cols-7 gap-1.5 mb-2">
                {quickDurations.map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setDurationMinutes(mins)}
                    className={`py-1.5 px-1 rounded-xl text-xs font-bold text-center border transition cursor-pointer ${
                      durationMinutes === mins
                        ? "bg-indigo-600 text-white border-indigo-700 shadow-2xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>

              {/* Custom Duration Range Slider & Manual Input */}
              <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <input
                  type="range"
                  min="5"
                  max="360"
                  step="5"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <input
                  type="number"
                  min="1"
                  max="720"
                  value={durationMinutes}
                  onChange={(e) =>
                    setDurationMinutes(Math.max(1, Number(e.target.value)))
                  }
                  className="w-16 bg-white border border-slate-200 text-slate-900 text-xs font-mono font-bold rounded-lg px-2 py-1 text-center outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <span className="text-xs text-slate-500 font-bold">mins</span>
              </div>
            </div>

            {/* Quality Rating & Date Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Focus Quality Rating
                </label>
                <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-200">
                  {([1, 2, 3, 4, 5] as const).map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setQualityRating(star)}
                      className={`p-1.5 rounded-lg transition cursor-pointer ${
                        qualityRating >= star
                          ? "text-amber-500 hover:scale-110"
                          : "text-slate-300 hover:text-slate-400"
                      }`}
                      title={`${star} Star${star > 1 ? "s" : ""}`}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          qualityRating >= star ? "fill-amber-400" : ""
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-[11px] font-mono font-bold text-slate-600 ml-auto mr-1">
                    {qualityRating}/5
                  </span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Session Date
                </label>
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-transparent text-xs font-mono font-bold text-slate-800 outline-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Key Notes / Takeaways (Optional) */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Key Takeaways / Revise Next Time (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Key landmark cases, pages read, formulas, or questions attempted..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl p-3 outline-none font-medium focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400 resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition border border-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!topicCovered.trim()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold shadow-sm transition cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Save Study Session</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
