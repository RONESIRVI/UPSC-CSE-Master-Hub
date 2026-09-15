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
import { SpacedRevisionTab } from "./SpacedRevisionTab";
import { RevisionNotesTab } from "./RevisionNotesTab";
import { PYQTab } from "./PYQTab";


import {
  BookOpen,
  Flag,
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
  Clock,
  Play,
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
  onUpdateMicroTopicStatus?: (
    topicId: string,
    subtopicIndex: number,
    nextStatus: SyllabusTopic["status"]
  ) => void;
  onAddTopic?: (topic: SyllabusTopic) => void;
  onDeleteTopic?: (topicId: string) => void;
  onResetDefaultSyllabus?: () => void;
  phases: StudyPlanPhase[];
  onToggleMilestone: (phaseId: string, milestoneId: string) => void;
  onAddMilestone?: (phaseId: string, title: string, targetDate: string) => void;
  onDeleteMilestone?: (phaseId: string, milestoneId: string) => void;
  onResetDefaultStudyPlan?: () => void;
  sessionLogs: StudySessionLog[];
  onAddSessionLog: (log: StudySessionLog) => void;
  onDeleteSessionLog: (id: string) => void;
  onResetDefaultSessionLogs?: () => void;
  revisionQueue: RevisionItem[];
  onCompleteRevision: (itemId: string) => void;
  onAddRevisionItem?: (item: RevisionItem) => void;
  onDeleteRevisionItem?: (itemId: string) => void;
  onResetDefaultRevisionQueue?: () => void;
  pyqs?: PYQQuestion[];
  onAddPYQ?: (pyq: PYQQuestion) => void;
  onDeletePYQ?: (id: string) => void;
  onResetDefaultPYQs?: () => void;
  currentStudySession?: any;
  setCurrentStudySession?: React.Dispatch<React.SetStateAction<any>>;
  onStartTimer?: () => void;
}

export const PrepSection: React.FC<PrepSectionProps> = ({
  activeSubTab,
  setActiveSubTab,
  syllabus,
  setSyllabus,
  onUpdateTopicStatus,
  onUpdateMicroTopicStatus,
  onAddTopic,
  onDeleteTopic,
  onResetDefaultSyllabus,
  phases,
  onToggleMilestone,
  onAddMilestone,
  onDeleteMilestone,
  onResetDefaultStudyPlan,
  sessionLogs,
  onAddSessionLog,
  onDeleteSessionLog,
  onResetDefaultSessionLogs,
  revisionQueue,
  onCompleteRevision,
  onAddRevisionItem,
  onDeleteRevisionItem,
  onResetDefaultRevisionQueue,
  pyqs,
  onAddPYQ,
  onDeletePYQ,
  onResetDefaultPYQs,
  currentStudySession,
  setCurrentStudySession,
  onStartTimer,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);


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
      key: "revision",
      label: "Spaced Repetition Queue",
      description: "Active recall flashcards on 1-3-7-15-30 cycles",
      icon: RotateCcw,
      badge: `${revisionQueue.length} Due`,
      color: "bg-teal-50 text-teal-600 border-teal-200",
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
          onUpdateMicroTopicStatus={onUpdateMicroTopicStatus}
          onAddTopic={onAddTopic}
          onDeleteTopic={onDeleteTopic}
          onResetDefaultSyllabus={onResetDefaultSyllabus}
          onNavigateToNotes={() => setActiveSubTab("notes")}
        />
      )}

      {activeSubTab === "notes" && (
        <RevisionNotesTab syllabus={syllabus} />
      )}

      {activeSubTab === "study-plan" && (
        <StudyPlanTab
          phases={phases}
          onToggleMilestone={onToggleMilestone}

          onAddMilestone={onAddMilestone}
          onDeleteMilestone={onDeleteMilestone}
          onResetDefaultStudyPlan={onResetDefaultStudyPlan}
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



      {setSyllabus && (
        <SyllabusEditorModal
          isOpen={isSyllabusEditorOpen}
          onClose={() => setIsSyllabusEditorOpen(false)}
          syllabus={syllabus}
          setSyllabus={setSyllabus}
        />
      )}

      {currentStudySession?.triggerTimerStart && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-indigo-50/50">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-800 tracking-tight">Select Topic to Study</h3>
              </div>
              <button 
                onClick={() => setCurrentStudySession && setCurrentStudySession({...currentStudySession, triggerTimerStart: false})}
                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-5 max-h-[60vh] overflow-y-auto space-y-3">
              <p className="text-sm font-medium text-slate-500 mb-2">
                Choose a specific topic from <strong className="text-indigo-600">{currentStudySession.subject}</strong> to start your session.
              </p>
              
              {syllabus.filter(s => s.subject === currentStudySession.subject).map(topic => {
                let statusColor = "bg-slate-100 text-slate-500 border-slate-200";
                let statusText = "Not Started";
                if (topic.status === "in_progress") { statusColor = "bg-amber-100 text-amber-700 border-amber-200"; statusText = "In Process"; }
                if (topic.status === "revised_1x") { statusColor = "bg-blue-100 text-blue-700 border-blue-200"; statusText = "Revise 1x"; }
                if (topic.status === "revised_2x") { statusColor = "bg-indigo-100 text-indigo-700 border-indigo-200"; statusText = "Revise 2x"; }
                if (topic.status === "revised_3x") { statusColor = "bg-purple-100 text-purple-700 border-purple-200"; statusText = "Revise 3x"; }
                if (topic.status === "revised_4x") { statusColor = "bg-pink-100 text-pink-700 border-pink-200"; statusText = "Revise 4x"; }
                if (topic.status === "mastered") { statusColor = "bg-emerald-100 text-emerald-700 border-emerald-200"; statusText = "Mastered"; }

                return (
                  <button
                    key={topic.id}
                    onClick={() => {
                      if (setCurrentStudySession) {
                        setCurrentStudySession({...currentStudySession, topic: topic.title, triggerTimerStart: false});
                      }
                      if (onStartTimer) onStartTimer();
                    }}
                    className="w-full text-left p-3 rounded-2xl border-2 border-slate-100 hover:border-indigo-400 hover:bg-indigo-50/50 hover:shadow-md transition-all group flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="font-bold text-sm text-slate-700 group-hover:text-indigo-900 leading-snug pr-2">{topic.title}</span>
                      <Play className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 fill-current shrink-0" />
                    </div>
                    <div className={`self-start px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${statusColor}`}>
                      {statusText}
                    </div>
                  </button>
                );
              })}

              {syllabus.filter(s => s.subject === currentStudySession.subject).length === 0 && (
                <div className="text-center p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                   <p className="text-slate-500 text-sm font-medium mb-4">No specific topics found for this subject.</p>
                   <button
                     onClick={() => {
                        if (setCurrentStudySession) setCurrentStudySession({...currentStudySession, triggerTimerStart: false});
                        if (onStartTimer) onStartTimer();
                     }}
                     className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2"
                   >
                     <Play className="w-4 h-4 fill-white" />
                     Start General Session
                   </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
