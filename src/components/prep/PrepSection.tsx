import React, { useState, useRef, useEffect } from "react";
import {
  PrepSubTab,
  SyllabusTopic,
  StudyPlanPhase,
  StudySessionLog,
  RevisionItem,
  PYQQuestion,
} from "../../types";
import { SyllabusTab } from "./SyllabusTab";
import { StudyPlanTab } from "./StudyPlanTab";
import { StudyTrackerTab } from "./StudyTrackerTab";
import { SpacedRevisionTab } from "./SpacedRevisionTab";
import { RevisionNotesTab } from "./RevisionNotesTab";
import { PYQTab } from "./PYQTab";
import { QuickStudyLogModal } from "./QuickStudyLogModal";
import { QuickThoughtsModal } from "./QuickThoughtsModal";
import {
  BookOpen,
  Flag,
  Clock,
  RotateCcw,
  HelpCircle,
  StickyNote,
  ChevronDown,
  Check,
  Sparkles,
  Layers,
  Plus,
  Lightbulb,
  Edit2,
} from "lucide-react";
import { SyllabusEditorModal } from "./SyllabusEditorModal";

interface PrepSectionProps {
  activeSubTab: PrepSubTab;
  setActiveSubTab: (subTab: PrepSubTab) => void;
  syllabus: SyllabusTopic[];
  setSyllabus?: React.Dispatch<React.SetStateAction<SyllabusTopic[]>>;
  onUpdateTopicStatus: (
    topicId: string,
    nextStatus: SyllabusTopic["status"]
  ) => void;
  onOpenTopicAI: (topic: SyllabusTopic) => void;
  onAddTopic?: (topic: SyllabusTopic) => void;
  onDeleteTopic?: (topicId: string) => void;
  onResetDefaultSyllabus?: () => void;
  phases: StudyPlanPhase[];
  onToggleMilestone: (phaseId: string, milestoneId: string) => void;
  onOpenAIStrategy: () => void;
  onAddMilestone?: (phaseId: string, title: string, targetDate: string) => void;
  onDeleteMilestone?: (phaseId: string, milestoneId: string) => void;
  onResetDefaultStudyPlan?: () => void;
  sessionLogs: StudySessionLog[];
  onAddSessionLog: (log: StudySessionLog) => void;
  onDeleteSessionLog: (id: string) => void;
  onResetDefaultSessionLogs?: () => void;
  timerRunning: boolean;
  timerSeconds: number;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  dailyGoalHours: number;
  onUpdateDailyGoal: (hours: number) => void;
  revisionQueue: RevisionItem[];
  onCompleteRevision: (itemId: string) => void;
  onAddRevisionItem?: (item: RevisionItem) => void;
  onDeleteRevisionItem?: (itemId: string) => void;
  onResetDefaultRevisionQueue?: () => void;
  pyqs?: PYQQuestion[];
  onAddPYQ?: (pyq: PYQQuestion) => void;
  onDeletePYQ?: (id: string) => void;
  onResetDefaultPYQs?: () => void;
  onOpenAIEvaluator: (question: string) => void;
  timerConfig?: import("../../types").FocusTimerConfig;
  onUpdateTimerConfig?: (
    config: import("../../types").FocusTimerConfig
  ) => void;
  timerPhase?: import("../../types").TimerPhase;
  currentCycle?: number;
  onSkipInterval?: () => void;
  onSetTimerPhase?: (phase: import("../../types").TimerPhase) => void;
}

export const PrepSection: React.FC<PrepSectionProps> = ({
  activeSubTab,
  setActiveSubTab,
  syllabus,
  setSyllabus,
  onUpdateTopicStatus,
  onOpenTopicAI,
  onAddTopic,
  onDeleteTopic,
  onResetDefaultSyllabus,
  phases,
  onToggleMilestone,
  onOpenAIStrategy,
  onAddMilestone,
  onDeleteMilestone,
  onResetDefaultStudyPlan,
  sessionLogs,
  onAddSessionLog,
  onDeleteSessionLog,
  onResetDefaultSessionLogs,
  timerRunning,
  timerSeconds,
  onToggleTimer,
  onResetTimer,
  dailyGoalHours,
  onUpdateDailyGoal,
  revisionQueue,
  onCompleteRevision,
  onAddRevisionItem,
  onDeleteRevisionItem,
  onResetDefaultRevisionQueue,
  pyqs,
  onAddPYQ,
  onDeletePYQ,
  onResetDefaultPYQs,
  onOpenAIEvaluator,
  timerConfig,
  onUpdateTimerConfig,
  timerPhase,
  currentCycle,
  onSkipInterval,
  onSetTimerPhase,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [showQuickLogModal, setShowQuickLogModal] = useState<boolean>(false);
  const [showQuickThoughtsModal, setShowQuickThoughtsModal] =
    useState<boolean>(false);
  const [isSyllabusEditorOpen, setIsSyllabusEditorOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const subTabOptions: {
    key: PrepSubTab;
    label: string;
    description: string;
    icon: any;
    badge: string;
    color: string;
  }[] = [
    {
      key: "syllabus",
      label: "Syllabus Tracker",
      description: "Micro-topic checklist & progress tracker",
      icon: BookOpen,
      badge: `${syllabus.length} Topics`,
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      key: "notes",
      label: "Quick Revision Notes",
      description: "Local high-yield fact cards & key points binder",
      icon: StickyNote,
      badge: "Binder",
      color: "bg-amber-50 text-amber-600 border-amber-200",
    },
    {
      key: "study-plan",
      label: "Study Plan & Milestones",
      description: "Phase-wise roadmap & strategic timeline",
      icon: Flag,
      badge: "4 Phases",
      color: "bg-indigo-50 text-indigo-600 border-indigo-200",
    },
    {
      key: "tracker",
      label: "Study Tracker & Focus Timer",
      description: "Live focus stopwatch & daily session analytics",
      icon: Clock,
      badge: "Live Focus",
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
    {
      key: "revision",
      label: "Spaced Repetition Queue",
      description: "Active recall flashcards on 1-3-7-15-30 cycles",
      icon: RotateCcw,
      badge: `${revisionQueue.length} Due`,
      color: "bg-teal-50 text-teal-600 border-teal-200",
    },
    {
      key: "pyq",
      label: "PYQs & Model Keys",
      description: "Past year Prelims MCQs & Mains model answers",
      icon: HelpCircle,
      badge: "Exam Vault",
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
  ];

  const currentOption =
    subTabOptions.find((t) => t.key === activeSubTab) || subTabOptions[0];
  const CurrentIcon = currentOption.icon;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-3 rounded-2xl border-2 border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md" ref={dropdownRef}>
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-indigo-600" />
              <span>Select Prep Module Dropdown:</span>
            </label>

            <button
              id="prep-module-dropdown-button"
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border-2 border-slate-300 hover:border-indigo-500 text-slate-900 font-bold text-xs transition cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`p-1.5 rounded-lg border ${currentOption.color} shrink-0`}
                >
                  <CurrentIcon className="w-4 h-4" />
                </div>
                <div className="text-left truncate">
                  <div className="text-xs font-extrabold text-slate-900 truncate flex items-center gap-2">
                    <span>{currentOption.label}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 font-mono font-bold border border-indigo-100">
                      {currentOption.badge}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-normal truncate hidden sm:block">
                    {currentOption.description}
                  </div>
                </div>
              </div>

              <ChevronDown
                className={`w-4 h-4 text-slate-500 transition-transform shrink-0 ${
                  dropdownOpen ? "rotate-180 text-indigo-600" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white rounded-2xl border-2 border-slate-200 shadow-2xl p-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                {subTabOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = activeSubTab === option.key;
                  return (
                    <button
                      key={option.key}
                      onClick={() => {
                        setActiveSubTab(option.key);
                        setDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between gap-3 p-2.5 rounded-xl text-left transition cursor-pointer ${
                        isSelected
                          ? "bg-indigo-50/80 border border-indigo-200 text-indigo-950 shadow-2xs font-bold"
                          : "hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-2 rounded-lg border ${option.color} shrink-0 shadow-2xs`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold truncate flex items-center gap-2">
                            <span>{option.label}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              id="prep-header-quick-jot-btn"
              type="button"
              onClick={() => setShowQuickThoughtsModal(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition shadow-2xs cursor-pointer"
            >
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="hidden sm:inline">Jot Thought</span>
            </button>

            {activeSubTab === "syllabus" && setSyllabus && (
              <button
                onClick={() => setIsSyllabusEditorOpen(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold text-xs transition border border-indigo-200 shadow-sm"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {activeSubTab === "syllabus" && (
        <SyllabusTab
          syllabus={syllabus}
          onUpdateTopicStatus={onUpdateTopicStatus}
          onOpenTopicAI={onOpenTopicAI}
          onAddTopic={onAddTopic}
          onDeleteTopic={onDeleteTopic}
          onResetDefaultSyllabus={onResetDefaultSyllabus}
          onNavigateToNotes={() => setActiveSubTab("notes")}
        />
      )}

      {activeSubTab === "notes" && (
        <RevisionNotesTab syllabus={syllabus} onOpenTopicAI={onOpenTopicAI} />
      )}

      {activeSubTab === "study-plan" && (
        <StudyPlanTab
          phases={phases}
          onToggleMilestone={onToggleMilestone}
          onOpenAIStrategy={onOpenAIStrategy}
          onAddMilestone={onAddMilestone}
          onDeleteMilestone={onDeleteMilestone}
          onResetDefaultStudyPlan={onResetDefaultStudyPlan}
        />
      )}

      {activeSubTab === "tracker" && (
        <StudyTrackerTab
          sessionLogs={sessionLogs}
          onAddSessionLog={onAddSessionLog}
          onDeleteSessionLog={onDeleteSessionLog}
          onResetDefaultSessionLogs={onResetDefaultSessionLogs}
          timerRunning={timerRunning}
          timerSeconds={timerSeconds}
          onToggleTimer={onToggleTimer}
          onResetTimer={onResetTimer}
          dailyGoalHours={dailyGoalHours}
          onUpdateDailyGoal={onUpdateDailyGoal}
          timerConfig={timerConfig}
          onUpdateTimerConfig={onUpdateTimerConfig}
          timerPhase={timerPhase}
          currentCycle={currentCycle}
          onSkipInterval={onSkipInterval}
          onSetTimerPhase={onSetTimerPhase}
          syllabus={syllabus}
        />
      )}

      {activeSubTab === "revision" && (
        <SpacedRevisionTab
          revisionQueue={revisionQueue}
          onCompleteRevision={onCompleteRevision}
          onAddRevisionItem={onAddRevisionItem}
          onDeleteRevisionItem={onDeleteRevisionItem}
          onResetDefaultRevisionQueue={onResetDefaultRevisionQueue}
        />
      )}

      {activeSubTab === "pyq" && (
        <PYQTab
          pyqs={pyqs}
          onOpenAIEvaluator={onOpenAIEvaluator}
          onAddPYQ={onAddPYQ}
          onDeletePYQ={onDeletePYQ}
          onResetDefaultPYQs={onResetDefaultPYQs}
        />
      )}

      {setSyllabus && (
        <SyllabusEditorModal
          isOpen={isSyllabusEditorOpen}
          onClose={() => setIsSyllabusEditorOpen(false)}
          syllabus={syllabus}
          setSyllabus={setSyllabus}
        />
      )}

      <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2 sm:gap-2.5 animate-in slide-in-from-bottom-5 duration-300">
        <button
          id="fab-quick-thought-btn"
          type="button"
          onClick={() => setShowQuickThoughtsModal(true)}
          className="group flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-amber-500/25 border-2 border-amber-300/40 transition-all cursor-pointer hover:shadow-2xl"
          title="Jot down a fleeting thought or doubt as a Markdown revision item"
        >
          <div className="p-1 rounded-lg bg-amber-600/80 group-hover:scale-110 transition">
            <Lightbulb className="w-4 h-4 text-white stroke-[2.5]" />
          </div>
          <span className="tracking-wide hidden sm:inline">Jot Thought</span>
          <span className="sm:hidden text-xs">Note</span>
        </button>

        {/* FAB 2: Quick Study Session Log */}
        <button
          id="fab-quick-log-btn"
          type="button"
          onClick={() => setShowQuickLogModal(true)}
          className="group flex items-center gap-2 px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 border-2 border-indigo-400/40 transition-all cursor-pointer hover:shadow-2xl"
          title="Quickly log a study session from any tab without losing your view"
        >
          <div className="p-1 rounded-lg bg-indigo-500/80 group-hover:scale-110 transition">
            <Plus className="w-4 h-4 text-white stroke-[3]" />
          </div>
          <span className="tracking-wide">Quick Log</span>
          <span className="hidden sm:inline-flex items-center justify-center text-[10px] px-1.5 py-0.5 rounded-md bg-indigo-700/80 text-indigo-100 font-mono font-bold">
            +Study
          </span>
        </button>
      </div>

      {/* Quick Study Log Mini-Modal */}
      <QuickStudyLogModal
        isOpen={showQuickLogModal}
        onClose={() => setShowQuickLogModal(false)}
        onAddSessionLog={onAddSessionLog}
        syllabus={syllabus}
      />

      {/* Quick Fleeting Thoughts & Doubts Scratchpad Mini-Modal */}
      <QuickThoughtsModal
        isOpen={showQuickThoughtsModal}
        onClose={() => setShowQuickThoughtsModal(false)}
        syllabus={syllabus}
        onAddToSpacedRevision={onAddRevisionItem}
      />
    </div>
  );
};
