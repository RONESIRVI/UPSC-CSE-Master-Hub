import React, { useMemo } from "react";
import {
  MainTab,
  DailyTask,
  StudySessionLog,
  SyllabusTopic,
  WeakAreaItem,
  RevisionItem,
  StudyPlanPhase,
  SmartRecommendation,
  PreparationHealth,
} from "../../types";
import { CommandCenter } from "./CommandCenter";
import { SmartAlerts } from "./SmartAlerts";
import { SmartRecommendationCard } from "./SmartRecommendation";
import { PreparationHealthScore } from "./PreparationHealth";
import { PersonalizedPlan } from "./PersonalizedPlan";

interface HomeSectionProps {
  setActiveTab: (tab: MainTab) => void;
  dailyTasks: DailyTask[];
  setDailyTasks: React.Dispatch<React.SetStateAction<DailyTask[]>>;
  sessionLogs: StudySessionLog[];
  syllabus: SyllabusTopic[];
  dailyGoalHours: number;
  studyStreak: number;
  weakAreas: WeakAreaItem[];
  revisionQueue: RevisionItem[];
  studyPlanPhases: StudyPlanPhase[];
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  setActiveTab,
  dailyTasks,
  setDailyTasks,
  sessionLogs,
  syllabus,
  dailyGoalHours,
  studyStreak,
  weakAreas,
  revisionQueue,
}) => {
  // Calculate total study time today
  const totalStudyTimeToday = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return sessionLogs
      .filter((log) => log.date === today)
      .reduce((sum, log) => sum + log.durationMinutes * 60, 0); // Convert mins to seconds for consistency
  }, [sessionLogs]);

  const completedTasksCount = dailyTasks.filter((t) => t.completed).length;

  // Compute Health Score
  const healthScore = useMemo<PreparationHealth>(() => {
    // Dummy calculation for demonstration - you can make this deeply analytical
    const studyHoursScore =
      Math.min(
        100,
        Math.round((totalStudyTimeToday / 3600 / dailyGoalHours) * 100)
      ) || 0;
    const pyqScore = 82; // Static for demo
    const revisionScore = 70;
    const testsScore = 68;
    const answersScore = 75;

    const completedSyllabus = syllabus.filter(
      (s) => s.status === "mastered" || s.status === "revised_2"
    ).length;
    const syllabusScore = Math.min(
      100,
      Math.round((completedSyllabus / Math.max(syllabus.length, 1)) * 100)
    );

    const overallScore = Math.round(
      (studyHoursScore +
        pyqScore +
        revisionScore +
        testsScore +
        answersScore +
        syllabusScore) /
        6
    );

    return {
      overallScore,
      metrics: {
        studyHours: studyHoursScore,
        pyq: pyqScore,
        revision: revisionScore,
        tests: testsScore,
        answers: answersScore,
        syllabus: syllabusScore,
      },
    };
  }, [totalStudyTimeToday, dailyGoalHours, syllabus]);

  // Generate Smart Recommendation
  const currentRecommendation = useMemo<SmartRecommendation>(() => {
    if (weakAreas.length > 0) {
      return {
        subject: weakAreas[0].subject,
        topic: weakAreas[0].topic,
        reason: "Critical Weak Area identified from recent Mock Tests",
        tags: ["Weak Area", "High PYQ Frequency", "Revision Due"],
      };
    }
    return {
      subject: "Polity",
      topic: "Parliament",
      reason: "Scheduled in your Daily Plan",
      tags: ["Daily Plan", "High Yield"],
    };
  }, [weakAreas]);

  const handleToggleTask = (taskId: string) => {
    setDailyTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const overdueRevisions = revisionQueue.filter((r) => r.isOverdue);
  const criticalWeakAreas = weakAreas.filter((w) => w.severity === "Critical");
  const weeklyGoalRemaining = Math.max(
    0,
    40 - Math.floor(totalStudyTimeToday / 3600)
  ); // Assuming 40h weekly goal

  return (
    <div className="space-y-6">
      {/* Top Main Command Center */}
      <CommandCenter
        studyStreak={studyStreak}
        dailyGoalHours={dailyGoalHours}
        totalStudyTime={totalStudyTimeToday}
        completedTasks={completedTasksCount}
        totalTasks={dailyTasks.length}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column (Main Content) */}
        <div className="xl:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SmartRecommendationCard
              recommendation={currentRecommendation}
              onStartStudy={() => setActiveTab("prep")}
            />
            <SmartAlerts
              overdueRevisions={overdueRevisions}
              criticalWeakAreas={criticalWeakAreas}
              weeklyGoalRemaining={weeklyGoalRemaining}
            />
          </div>

          <PreparationHealthScore health={healthScore} />
        </div>

        {/* Right Column (Side Panel) */}
        <div className="xl:col-span-1">
          <PersonalizedPlan
            tasks={dailyTasks}
            onToggleTask={handleToggleTask}
            onNavigateToTracker={() => setActiveTab("prep")}
          />
        </div>
      </div>
    </div>
  );
};
