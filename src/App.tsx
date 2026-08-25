import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navbar } from "./components/Navbar";
import { GlobalSearchModal } from "./components/GlobalSearchModal";
import { HomeSection } from "./components/home/HomeSection";
import { ToppersSection } from "./components/toppers/ToppersSection";
import { PrepSection } from "./components/prep/PrepSection";
import { AnalyticsSection } from "./components/analytics/AnalyticsSection";
import { AIMentorModal } from "./components/ai/AIMentorModal";
import { SplashScreen } from "./components/SplashScreen";
import {
  Home,
  Trophy,
  BookOpen,
  BarChart3,
  Sparkles,
  Search,
  Flame,
} from "lucide-react";

import { TOPPER_BOOKS, TOPPERS_PROFILES } from "./data/toppersData";
import { DEFAULT_SYLLABUS, DEFAULT_STUDY_PLAN } from "./data/syllabusData";
import {
  DEFAULT_REVISION_QUEUE,
  DEFAULT_MOCK_LOGS,
  DEFAULT_WEAK_AREAS,
} from "./data/analyticsDefaults";
import { PYQ_DATABASE } from "./data/pyqData";
import {
  MainTab,
  TopperSubTab,
  PrepSubTab,
  AnalyticsSubTab,
  BookItem,
  SyllabusTopic,
  StudyPlanPhase,
  StudySessionLog,
  RevisionItem,
  MockTestLog,
  WeakAreaItem,
  TopperRoutine,
  PYQQuestion,
  FocusTimerConfig,
  TimerPhase,
  TimerMode,
  DailyTask,
  PreparationHealth,
  TopperProfile,
} from "./types";
import { playTimerChime } from "./utils/audioAlert";
import { triggerTimerEndNotification } from "./utils/browserNotifications";

const DEFAULT_TIMER_CONFIG: FocusTimerConfig = {
  mode: "pomodoro_25",
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  cyclesBeforeLongBreak: 4,
  autoStartBreaks: false,
  autoStartNextFocus: false,
  soundAlertsEnabled: true,
  nativeNotificationsEnabled: true,
};

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<MainTab>("home");
  const [topperSubTab, setTopperSubTab] = useState<TopperSubTab>("strategy");
  const [prepSubTab, setPrepSubTab] = useState<PrepSubTab>("syllabus");
  const [analyticsSubTab, setAnalyticsSubTab] =
    useState<AnalyticsSubTab>("progress");

  // Splash Screen State
  const [showSplash, setShowSplash] = useState<boolean>(true);

  // App Level Forms State (Lifted from Timer)
  const [currentStudySession, setCurrentStudySession] = useState<{
    subject: string;
    topic: string;
    taskType: "study" | "revision" | "pyq" | "notes" | "answer_writing";
  }>({
    subject: "Indian Polity",
    topic: "",
    taskType: "study",
  });

  // Core Data States with LocalStorage Hydration
  const [books, setBooks] = useState<BookItem[]>(() => {
    const saved = localStorage.getItem("upsc_books");
    return saved ? JSON.parse(saved) : TOPPER_BOOKS;
  });

  const [toppers, setToppers] = useState<TopperProfile[]>(() => {
    const saved = localStorage.getItem("upsc_toppers");
    return saved ? JSON.parse(saved) : TOPPERS_PROFILES;
  });

  const [syllabus, setSyllabus] = useState<SyllabusTopic[]>(() => {
    const saved = localStorage.getItem("upsc_syllabus");
    return saved ? JSON.parse(saved) : DEFAULT_SYLLABUS;
  });

  const [studyPlanPhases, setStudyPlanPhases] = useState<StudyPlanPhase[]>(
    () => {
      const saved = localStorage.getItem("upsc_study_plan");
      return saved ? JSON.parse(saved) : DEFAULT_STUDY_PLAN;
    }
  );

  const [sessionLogs, setSessionLogs] = useState<StudySessionLog[]>(() => {
    const saved = localStorage.getItem("upsc_study_logs");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: "init-1",
            date: new Date().toISOString().split("T")[0],
            subject: "Indian Polity",
            paper: "Prelims GS1",
            durationMinutes: 120,
            topicCovered: "Preamble & Fundamental Rights Articles 14-18",
            qualityRating: 5,
            notes: "Revised landmark case laws (Maneka Gandhi, Kesavananda)",
          },
          {
            id: "init-2",
            date: new Date().toISOString().split("T")[0],
            subject: "Current Affairs",
            paper: "Prelims GS1",
            durationMinutes: 60,
            topicCovered:
              "The Hindu Editorial: India-US Trade & Semiconductor Mission",
            qualityRating: 4,
          },
        ];
  });

  const [mockLogs, setMockLogs] = useState<MockTestLog[]>(() => {
    const saved = localStorage.getItem("upsc_mock_logs");
    return saved ? JSON.parse(saved) : DEFAULT_MOCK_LOGS;
  });

  const [revisionQueue, setRevisionQueue] = useState<RevisionItem[]>(() => {
    const saved = localStorage.getItem("upsc_revision_queue");
    return saved ? JSON.parse(saved) : DEFAULT_REVISION_QUEUE;
  });

  const [pyqs, setPyqs] = useState<PYQQuestion[]>(() => {
    const saved = localStorage.getItem("upsc_pyqs");
    return saved ? JSON.parse(saved) : PYQ_DATABASE;
  });

  const [weakAreas, setWeakAreas] =
    useState<WeakAreaItem[]>(DEFAULT_WEAK_AREAS);

  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>([
    {
      id: "t1",
      title: "Polity (Parliament)",
      completed: true,
      type: "study",
      timeSlot: "07:00-09:00",
      subject: "Polity",
    },
    {
      id: "t2",
      title: "Optional",
      completed: true,
      type: "study",
      timeSlot: "09:30-11:30",
      subject: "Optional",
    },
    {
      id: "t3",
      title: "PYQ Practice",
      completed: false,
      type: "pyq",
      timeSlot: "12:00-13:00",
      subject: "Polity",
    },
    {
      id: "t4",
      title: "Economy",
      completed: false,
      type: "study",
      timeSlot: "14:30-15:30",
      subject: "Economy",
    },
    {
      id: "t5",
      title: "Answer Writing",
      completed: false,
      type: "answer_writing",
      timeSlot: "16:00-17:00",
    },
    {
      id: "t6",
      title: "Revision",
      completed: false,
      type: "revision",
      timeSlot: "19:00-20:30",
    },
  ]);

  // Focus Timer State & Configurations
  const [timerConfig, setTimerConfig] = useState<FocusTimerConfig>(() => {
    const saved = localStorage.getItem("upsc_timer_config");
    return saved ? JSON.parse(saved) : DEFAULT_TIMER_CONFIG;
  });
  const [timerPhase, setTimerPhase] = useState<TimerPhase>("focus");
  const [currentCycle, setCurrentCycle] = useState<number>(1);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [studyStreak, setStudyStreak] = useState<number>(14);
  const [dailyGoalHours, setDailyGoalHours] = useState<number>(8);

  // Modals State
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);
  const [aiModalInitialMode, setAiModalInitialMode] = useState<
    "evaluate" | "strategy" | "explain"
  >("evaluate");
  const [aiModalQuestion, setAiModalQuestion] = useState<string>("");
  const [aiModalTopic, setAiModalTopic] = useState<string>("");

  // Sync to LocalStorage
  useEffect(() => {
    // Hide splash screen after 3 seconds
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);
    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    localStorage.setItem("upsc_books", JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem("upsc_toppers", JSON.stringify(toppers));
  }, [toppers]);

  useEffect(() => {
    localStorage.setItem("upsc_syllabus", JSON.stringify(syllabus));
  }, [syllabus]);

  useEffect(() => {
    localStorage.setItem("upsc_study_plan", JSON.stringify(studyPlanPhases));
  }, [studyPlanPhases]);

  useEffect(() => {
    localStorage.setItem("upsc_study_logs", JSON.stringify(sessionLogs));
  }, [sessionLogs]);

  useEffect(() => {
    localStorage.setItem("upsc_mock_logs", JSON.stringify(mockLogs));
  }, [mockLogs]);

  useEffect(() => {
    localStorage.setItem("upsc_revision_queue", JSON.stringify(revisionQueue));
  }, [revisionQueue]);

  useEffect(() => {
    localStorage.setItem("upsc_pyqs", JSON.stringify(pyqs));
  }, [pyqs]);

  useEffect(() => {
    localStorage.setItem("upsc_timer_config", JSON.stringify(timerConfig));
  }, [timerConfig]);

  // Timer Tick Engine with Smart Interval Automation & Sounds
  useEffect(() => {
    let interval: any = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prevSeconds) => {
          // If continuous stopwatch mode, simple count up
          if (timerConfig.mode === "stopwatch_continuous") {
            return prevSeconds + 1;
          }

          const targetMins =
            timerPhase === "focus"
              ? timerConfig.focusMinutes
              : timerPhase === "short_break"
              ? timerConfig.shortBreakMinutes
              : timerConfig.longBreakMinutes;

          const targetSecs = Math.max(targetMins * 60, 1);

          if (prevSeconds + 1 >= targetSecs) {
            // Trigger browser-native notification + audio chime + background tab alert
            if (timerConfig.nativeNotificationsEnabled !== false) {
              triggerTimerEndNotification({
                phase: timerPhase,
                cycle: currentCycle,
                playSound: timerConfig.soundAlertsEnabled !== false,
              });
            } else if (timerConfig.soundAlertsEnabled) {
              playTimerChime(
                timerPhase === "focus" ? "focus_end" : "break_end"
              );
            }

            if (timerPhase === "focus") {
              if (currentCycle >= timerConfig.cyclesBeforeLongBreak) {
                setTimerPhase("long_break");
                setCurrentCycle(1);
              } else {
                setTimerPhase("short_break");
                setCurrentCycle((c) => c + 1);
              }
              if (!timerConfig.autoStartBreaks) {
                setTimerRunning(false);
              }
            } else {
              setTimerPhase("focus");
              if (!timerConfig.autoStartNextFocus) {
                setTimerRunning(false);
              }
            }
            return 0;
          }

          return prevSeconds + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerConfig, timerPhase, currentCycle]);

  // Skip Current Interval Handler
  const handleSkipInterval = () => {
    if (timerPhase === "focus") {
      if (currentCycle >= timerConfig.cyclesBeforeLongBreak) {
        setTimerPhase("long_break");
        setCurrentCycle(1);
      } else {
        setTimerPhase("short_break");
        setCurrentCycle((c) => c + 1);
      }
    } else {
      setTimerPhase("focus");
    }
    setTimerSeconds(0);
  };

  const handleResetTimer = () => {
    setTimerRunning(false);
    setTimerSeconds(0);
  };

  // Keyboard shortcut for Global Search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handlers for Topper Books
  const handleToggleBookStatus = (bookId: string) => {
    setBooks((prev) =>
      prev.map((b) => {
        if (b.id !== bookId) return b;
        let nextStatus: BookItem["status"] = "reading";
        if (b.status === "reading") nextStatus = "completed";
        else if (b.status === "completed") nextStatus = "not_started";
        return { ...b, status: nextStatus };
      })
    );
  };

  // Handlers for Syllabus
  const handleUpdateTopicStatus = (
    topicId: string,
    nextStatus: SyllabusTopic["status"]
  ) => {
    setSyllabus((prev) =>
      prev.map((t) => {
        if (t.id === topicId) {
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const handleAddTopic = (newTopic: SyllabusTopic) => {
    setSyllabus((prev) => [newTopic, ...prev]);
  };

  const handleDeleteTopic = (topicId: string) => {
    setSyllabus((prev) => prev.filter((t) => t.id !== topicId));
  };

  const handleResetDefaultSyllabus = () => {
    setSyllabus(DEFAULT_SYLLABUS);
    localStorage.setItem("upsc_syllabus", JSON.stringify(DEFAULT_SYLLABUS));
  };

  // Handlers for Study Plan Milestones
  const handleToggleMilestone = (phaseId: string, milestoneId: string) => {
    setStudyPlanPhases((prev) =>
      prev.map((p) => {
        if (p.id !== phaseId) return p;
        return {
          ...p,
          milestones: p.milestones.map((m) => {
            if (m.id !== milestoneId) return m;
            return { ...m, completed: !m.completed };
          }),
        };
      })
    );
  };

  const handleAddMilestone = (
    phaseId: string,
    title: string,
    targetDate: string
  ) => {
    setStudyPlanPhases((prev) =>
      prev.map((p) => {
        if (p.id === phaseId) {
          return {
            ...p,
            milestones: [
              ...p.milestones,
              {
                id: `milestone-${Date.now()}`,
                title,
                targetDate: targetDate || "Upcoming",
                completed: false,
              },
            ],
          };
        }
        return p;
      })
    );
  };

  const handleDeleteMilestone = (phaseId: string, milestoneId: string) => {
    setStudyPlanPhases((prev) =>
      prev.map((p) => {
        if (p.id === phaseId) {
          return {
            ...p,
            milestones: p.milestones.filter((m) => m.id !== milestoneId),
          };
        }
        return p;
      })
    );
  };

  const handleResetDefaultStudyPlan = () => {
    setStudyPlanPhases(DEFAULT_STUDY_PLAN);
    localStorage.setItem("upsc_study_plan", JSON.stringify(DEFAULT_STUDY_PLAN));
  };

  // Handlers for Study Session Logs
  const handleAddSessionLog = (log: StudySessionLog) => {
    setSessionLogs((prev) => [log, ...prev]);
  };

  const handleDeleteSessionLog = (id: string) => {
    setSessionLogs((prev) => prev.filter((l) => l.id !== id));
  };

  const handleResetDefaultSessionLogs = () => {
    const defaults: StudySessionLog[] = [
      {
        id: "init-1",
        date: new Date().toISOString().split("T")[0],
        subject: "Indian Polity",
        paper: "Prelims GS1",
        durationMinutes: 120,
        topicCovered: "Preamble & Fundamental Rights Articles 14-18",
        qualityRating: 5,
        notes: "Revised landmark case laws (Maneka Gandhi, Kesavananda)",
      },
      {
        id: "init-2",
        date: new Date().toISOString().split("T")[0],
        subject: "Current Affairs",
        paper: "Prelims GS1",
        durationMinutes: 60,
        topicCovered:
          "The Hindu Editorial: India-US Trade & Semiconductor Mission",
        qualityRating: 4,
      },
    ];
    setSessionLogs(defaults);
    localStorage.setItem("upsc_study_logs", JSON.stringify(defaults));
  };

  // Handlers for Mock Test Logs
  const handleAddMockLog = (log: MockTestLog) => {
    setMockLogs((prev) => [log, ...prev]);
  };

  const handleDeleteMockLog = (id: string) => {
    setMockLogs((prev) => prev.filter((m) => m.id !== id));
  };

  // Handlers for Spaced Revision Queue
  const handleCompleteRevision = (itemId: string) => {
    setRevisionQueue((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleAddRevisionItem = (item: RevisionItem) => {
    setRevisionQueue((prev) => [item, ...prev]);
  };

  const handleDeleteRevisionItem = (itemId: string) => {
    setRevisionQueue((prev) => prev.filter((r) => r.id !== itemId));
  };

  const handleResetDefaultRevisionQueue = () => {
    setRevisionQueue(DEFAULT_REVISION_QUEUE);
    localStorage.setItem(
      "upsc_revision_queue",
      JSON.stringify(DEFAULT_REVISION_QUEUE)
    );
  };

  // Handlers for PYQs
  const handleAddPYQ = (newPyq: PYQQuestion) => {
    setPyqs((prev) => [newPyq, ...prev]);
  };

  const handleDeletePYQ = (id: string) => {
    setPyqs((prev) => prev.filter((q) => q.id !== id));
  };

  const handleResetDefaultPYQs = () => {
    setPyqs(PYQ_DATABASE);
    localStorage.setItem("upsc_pyqs", JSON.stringify(PYQ_DATABASE));
  };

  // Handlers for AI Modal Launchers
  const handleOpenAIEvaluator = (question: string) => {
    setAiModalInitialMode("evaluate");
    setAiModalQuestion(question);
    setAiModalOpen(true);
  };

  const handleOpenTopicAI = (topic: SyllabusTopic) => {
    setAiModalInitialMode("explain");
    setAiModalTopic(topic.title);
    setAiModalOpen(true);
  };

  const handleOpenExplainTopic = (topicName: string) => {
    setAiModalInitialMode("explain");
    setAiModalTopic(topicName);
    setAiModalOpen(true);
  };

  const handleOpenAIStrategy = () => {
    setAiModalInitialMode("strategy");
    setAiModalOpen(true);
  };

  const handleAdoptRoutine = (routine: TopperRoutine) => {
    setActiveTab("prep");
    setPrepSubTab("tracker");
  };

  const handleGlobalNavigate = (tab: MainTab, subTab?: string) => {
    setActiveTab(tab);
    if (tab === "toppers" && subTab) setTopperSubTab(subTab as TopperSubTab);
    if (tab === "prep" && subTab) setPrepSubTab(subTab as PrepSubTab);
    if (tab === "analytics" && subTab)
      setAnalyticsSubTab(subTab as AnalyticsSubTab);
  };

  return (
    <>
      <AnimatePresence>{showSplash && <SplashScreen />}</AnimatePresence>

      <div
        className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-indigo-500 selection:text-white flex flex-col justify-between"
        style={{ backgroundColor: "#f8fafc" }}
      >
        {/* Main Top Navigation Header */}
        <div>
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenSearch={() => setSearchOpen(true)}
            onOpenAIMentor={() => {
              setAiModalInitialMode("evaluate");
              setAiModalOpen(true);
            }}
            studyStreak={studyStreak}
            timerRunning={timerRunning}
            timerSeconds={timerSeconds}
            onToggleTimer={() => setTimerRunning((prev) => !prev)}
          />

          {/* Core Content Canvas */}
          <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 pb-24 lg:pb-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                {/* Pillar 0: HOME / COMMAND CENTER */}
                {activeTab === "home" && (
                  <HomeSection
                    setActiveTab={setActiveTab}
                    dailyTasks={dailyTasks}
                    setDailyTasks={setDailyTasks}
                    sessionLogs={sessionLogs}
                    syllabus={syllabus}
                    dailyGoalHours={dailyGoalHours}
                    studyStreak={studyStreak}
                    weakAreas={weakAreas}
                    revisionQueue={revisionQueue}
                    studyPlanPhases={studyPlanPhases}
                    currentStudySession={currentStudySession}
                    setCurrentStudySession={setCurrentStudySession}
                  />
                )}

                {/* Pillar 1: TOPPERS */}
                {activeTab === "toppers" && (
                  <ToppersSection
                    activeSubTab={topperSubTab}
                    setActiveSubTab={setTopperSubTab}
                    books={books}
                    onToggleBookStatus={handleToggleBookStatus}
                    onAdoptRoutine={handleAdoptRoutine}
                    toppers={toppers}
                    setToppers={setToppers}
                  />
                )}

                {/* Pillar 2: PREPARATION */}
                {activeTab === "prep" && (
                  <PrepSection
                    activeSubTab={prepSubTab}
                    setActiveSubTab={setPrepSubTab}
                    syllabus={syllabus}
                    onUpdateTopicStatus={handleUpdateTopicStatus}
                    onOpenTopicAI={handleOpenTopicAI}
                    onAddTopic={handleAddTopic}
                    onDeleteTopic={handleDeleteTopic}
                    onResetDefaultSyllabus={handleResetDefaultSyllabus}
                    phases={studyPlanPhases}
                    onToggleMilestone={handleToggleMilestone}
                    onOpenAIStrategy={handleOpenAIStrategy}
                    onAddMilestone={handleAddMilestone}
                    onDeleteMilestone={handleDeleteMilestone}
                    onResetDefaultStudyPlan={handleResetDefaultStudyPlan}
                    sessionLogs={sessionLogs}
                    onAddSessionLog={handleAddSessionLog}
                    onDeleteSessionLog={handleDeleteSessionLog}
                    onResetDefaultSessionLogs={handleResetDefaultSessionLogs}
                    timerRunning={timerRunning}
                    timerSeconds={timerSeconds}
                    onToggleTimer={() => setTimerRunning((prev) => !prev)}
                    onResetTimer={handleResetTimer}
                    dailyGoalHours={dailyGoalHours}
                    onUpdateDailyGoal={setDailyGoalHours}
                    timerConfig={timerConfig}
                    onUpdateTimerConfig={setTimerConfig}
                    timerPhase={timerPhase}
                    currentCycle={currentCycle}
                    onSkipInterval={handleSkipInterval}
                    onSetTimerPhase={setTimerPhase}
                    revisionQueue={revisionQueue}
                    onCompleteRevision={handleCompleteRevision}
                    onAddRevisionItem={handleAddRevisionItem}
                    onDeleteRevisionItem={handleDeleteRevisionItem}
                    onResetDefaultRevisionQueue={
                      handleResetDefaultRevisionQueue
                    }
                    pyqs={pyqs}
                    onAddPYQ={handleAddPYQ}
                    onDeletePYQ={handleDeletePYQ}
                    onResetDefaultPYQs={handleResetDefaultPYQs}
                    onOpenAIEvaluator={handleOpenAIEvaluator}
                    currentStudySession={currentStudySession}
                  />
                )}

                {/* Pillar 3: ANALYTICS */}
                {activeTab === "analytics" && (
                  <AnalyticsSection
                    activeSubTab={analyticsSubTab}
                    setActiveSubTab={setAnalyticsSubTab}
                    syllabus={syllabus}
                    sessionLogs={sessionLogs}
                    studyStreak={studyStreak}
                    mockLogs={mockLogs}
                    onAddMockLog={handleAddMockLog}
                    onDeleteMockLog={handleDeleteMockLog}
                    weakAreas={weakAreas}
                    onOpenExplainTopic={handleOpenExplainTopic}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {/* Mobile Floating Bottom App Bar (Native Android App Experience) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-xl safe-bottom px-2 py-1.5 flex items-center justify-around">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition cursor-pointer ${
              activeTab === "home"
                ? "text-indigo-600 font-bold bg-indigo-50/80"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Home
              className={`w-5 h-5 mb-0.5 ${
                activeTab === "home" ? "text-indigo-600" : "text-slate-500"
              }`}
            />
            <span className="text-[10px] tracking-tight">Home</span>
          </button>

          <button
            onClick={() => setActiveTab("toppers")}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition cursor-pointer ${
              activeTab === "toppers"
                ? "text-indigo-600 font-bold bg-indigo-50/80"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Trophy
              className={`w-5 h-5 mb-0.5 ${
                activeTab === "toppers" ? "text-indigo-600" : "text-slate-500"
              }`}
            />
            <span className="text-[10px] tracking-tight">Toppers</span>
          </button>

          <button
            onClick={() => setActiveTab("prep")}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition cursor-pointer ${
              activeTab === "prep"
                ? "text-indigo-600 font-bold bg-indigo-50/80"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <BookOpen
              className={`w-5 h-5 mb-0.5 ${
                activeTab === "prep" ? "text-indigo-600" : "text-slate-500"
              }`}
            />
            <span className="text-[10px] tracking-tight">Prep</span>
          </button>

          <button
            onClick={() => {
              setAiModalInitialMode("evaluate");
              setAiModalOpen(true);
            }}
            className="flex flex-col items-center justify-center -mt-4 bg-indigo-600 text-white rounded-2xl w-12 h-12 shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition cursor-pointer active:scale-95"
            title="Open AI Mentor"
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-[9px] font-bold">AI</span>
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition cursor-pointer ${
              activeTab === "analytics"
                ? "text-indigo-600 font-bold bg-indigo-50/80"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <BarChart3
              className={`w-5 h-5 mb-0.5 ${
                activeTab === "analytics" ? "text-indigo-600" : "text-slate-500"
              }`}
            />
            <span className="text-[10px] tracking-tight">Analytics</span>
          </button>

          <button
            onClick={() => setSearchOpen(true)}
            className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-500 hover:text-slate-800 transition cursor-pointer"
          >
            <Search className="w-5 h-5 mb-0.5 text-slate-500" />
            <span className="text-[10px] tracking-tight">Search</span>
          </button>
        </div>

        {/* Global Search Modal */}
        <GlobalSearchModal
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          onNavigate={handleGlobalNavigate}
        />

        {/* AI Mains Mentor & Evaluator Modal */}
        <AIMentorModal
          isOpen={aiModalOpen}
          onClose={() => setAiModalOpen(false)}
          initialMode={aiModalInitialMode}
          initialQuestion={aiModalQuestion}
          initialTopic={aiModalTopic}
        />

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white py-6 text-slate-500 text-xs text-center mt-12 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px]">
                U
              </span>
              <span className="font-semibold text-slate-700">
                UPSC CONQUEST Master Hub
              </span>
              <span>• Bento Grid Preparation Suite</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-slate-500">
              <span>Union Public Service Commission (CSE)</span>
              <span className="text-indigo-600 font-bold">
                • 100% Offline-Safe Storage
              </span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
