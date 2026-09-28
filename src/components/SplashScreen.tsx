import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Compass, Sparkles, GraduationCap, Settings2, X, Target, PenTool, BookOpen } from "lucide-react";

const RadarSweep = ({ stats }: { stats?: { mocks: number, avgScore: number, dDays: number } }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center bg-[#020617]">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:40px_40px] rounded-full [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
    {[1, 2, 3].map(i => (
      <div key={i} className="absolute rounded-full border border-teal-500/20" style={{ width: `${i*150}px`, height: `${i*150}px` }} />
    ))}
    <motion.div 
      className="absolute w-[400px] h-[400px] rounded-full"
      style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(20, 184, 166, 0.4) 100%)' }}
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [activeModal, setActiveModal] = useState<"dday" | "mocks" | "syllabus" | null>(null);
  const [appStats, setAppStats] = useState({ mocks: 0, avgScore: 0, dDays: 0 });

  useEffect(() => {
    // Load actual user stats from localStorage for the radar
    try {
      const mockLogs = JSON.parse(localStorage.getItem("ras_mock_logs_v2") || localStorage.getItem("ras_mock_logs") || "[]");
      const dDays = JSON.parse(localStorage.getItem("d_day_projects") || "[]");
      
      let totalMocks = 0;
      let totalScore = 0;
      if (Array.isArray(mockLogs)) {
        totalMocks = mockLogs.length;
        totalScore = mockLogs.reduce((acc, log) => acc + (Number(log.score) || 0), 0);
      }
      
      setAppStats({
        mocks: totalMocks,
        avgScore: totalMocks > 0 ? Math.round(totalScore / totalMocks) : 0,
        dDays: Array.isArray(dDays) ? dDays.length : 0
      });
    } catch (e) {
      console.error("Failed to load stats for splash screen", e);
    }

    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 2; 
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      {/* Background Effect Engine */}
      <RadarSweep stats={appStats} />

      {/* Top Stats Cards */}
      <motion.div 
        className="absolute top-8 left-0 right-0 px-4 w-full z-50 flex flex-wrap justify-center gap-2 sm:gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div onClick={() => setActiveModal("dday")} className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-full px-3 py-1.5 flex items-center gap-2 shadow-[0_4px_10px_rgba(0,0,0,0.2)] hover:bg-white/10 transition-colors cursor-pointer active:scale-95">
          <span className="text-amber-400 text-[8px] sm:text-[9px] font-bold tracking-widest uppercase">Target D-Day</span>
          <div className="bg-white/10 px-1.5 py-0.5 rounded-md flex items-center justify-center">
            <span className="text-[10px] sm:text-xs font-black text-white leading-none">{appStats.dDays || 0}</span>
          </div>
        </div>

        <div onClick={() => setActiveModal("mocks")} className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-full px-3 py-1.5 flex items-center gap-2 shadow-[0_4px_10px_rgba(0,0,0,0.2)] hover:bg-white/10 transition-colors cursor-pointer active:scale-95">
          <span className="text-teal-400 text-[8px] sm:text-[9px] font-bold tracking-widest uppercase">Mock Tests</span>
          <div className="bg-white/10 px-1.5 py-0.5 rounded-md flex items-center justify-center gap-1">
            <span className="text-[10px] sm:text-xs font-black text-white leading-none">{appStats.mocks || 0}</span>
            <span className="text-[7px] sm:text-[8px] text-white/50 leading-none border-l border-white/20 pl-1">Avg {appStats.avgScore || 0}</span>
          </div>
        </div>

        <div onClick={() => setActiveModal("syllabus")} className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-full px-3 py-1.5 flex items-center gap-2 shadow-[0_4px_10px_rgba(0,0,0,0.2)] hover:bg-white/10 transition-colors cursor-pointer active:scale-95">
          <span className="text-indigo-400 text-[8px] sm:text-[9px] font-bold tracking-widest uppercase">Syllabus</span>
          <div className="bg-white/10 px-1.5 py-0.5 rounded-md flex items-center justify-center">
            <span className="text-[10px] sm:text-xs font-bold text-white/80 leading-none">Active</span>
          </div>
        </div>
      </motion.div>

      {/* Modal Popup */}
      {activeModal && (
        <div 
          className="absolute inset-0 z-[10000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm cursor-pointer"
          onClick={() => setActiveModal(null)}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-[#111827] border border-white/10 rounded-3xl p-6 w-full max-w-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Glow */}
            <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-20 pointer-events-none ${
              activeModal === 'dday' ? 'bg-amber-500' : activeModal === 'mocks' ? 'bg-teal-500' : 'bg-indigo-500'
            }`} />
            
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors z-50 cursor-pointer"
            >
              <X className="w-4 h-4 pointer-events-none" />
            </button>

            <div className="flex flex-col relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-2xl ${
                  activeModal === 'dday' ? 'bg-amber-500/20 text-amber-400' : 
                  activeModal === 'mocks' ? 'bg-teal-500/20 text-teal-400' : 'bg-indigo-500/20 text-indigo-400'
                }`}>
                  {activeModal === 'dday' && <Target className="w-6 h-6" />}
                  {activeModal === 'mocks' && <PenTool className="w-6 h-6" />}
                  {activeModal === 'syllabus' && <BookOpen className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">
                    {activeModal === 'dday' ? 'Target D-Days' : activeModal === 'mocks' ? 'Mock Test Logs' : 'Core Syllabus'}
                  </h3>
                  <p className="text-xs text-white/50 font-medium tracking-wide">
                    {activeModal === 'dday' ? 'Your upcoming exam deadlines' : activeModal === 'mocks' ? 'Recent test performances' : 'Subjects actively tracked'}
                  </p>
                </div>
              </div>

              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {activeModal === 'dday' && (
                  <>
                    {JSON.parse(localStorage.getItem("d_day_projects") || "[]").map((d: any, idx: number) => (
                      <div key={idx} className="p-3 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center">
                        <span className="text-sm font-bold text-slate-200">{d.name}</span>
                        <span className="text-xs font-black text-amber-400">{new Date(d.targetDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</span>
                      </div>
                    ))}
                    {JSON.parse(localStorage.getItem("d_day_projects") || "[]").length === 0 && (
                       <p className="text-sm text-white/40 text-center py-4">No targets set yet.</p>
                    )}
                  </>
                )}
                {activeModal === 'mocks' && (
                  <>
                    {JSON.parse(localStorage.getItem("ras_mock_logs_v2") || localStorage.getItem("ras_mock_logs") || "[]").slice(0, 5).map((m: any, idx: number) => (
                      <div key={idx} className="p-3 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-200">{m.testName || `Test ${idx+1}`}</span>
                          <span className="text-[10px] text-white/40">{m.date}</span>
                        </div>
                        <span className="text-sm font-black text-teal-400">Score: {m.score}</span>
                      </div>
                    ))}
                    {JSON.parse(localStorage.getItem("ras_mock_logs_v2") || localStorage.getItem("ras_mock_logs") || "[]").length === 0 && (
                       <p className="text-sm text-white/40 text-center py-4">No mocks attempted yet.</p>
                    )}
                  </>
                )}
                {activeModal === 'syllabus' && (
                  <>
                    {['Polity & Governance', 'History & Art', 'Geography & Environment', 'Economy', 'Science & Tech'].map((sub, idx) => (
                      <div key={idx} className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-indigo-500" />
                        <span className="text-sm font-bold text-slate-200">{sub}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Animated Logo Icon */}
        <div className="relative mb-8">
          <motion.div 
            className="absolute inset-0 bg-indigo-500 rounded-full blur-[30px] opacity-40"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-3xl shadow-[0_0_30px_rgba(99,102,241,0.3)] overflow-hidden mb-6">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] animate-[shimmer_2s_infinite] z-20" />
            <img src="/icon.png" alt="LBSNAA" className="w-full h-full object-contain z-10 drop-shadow-2xl" />
          </div>
          <motion.div 
            className="absolute -top-3 -right-3 text-amber-300"
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>
        </div>

        {/* Typography */}
        <motion.h1 
          className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-3 tracking-tight drop-shadow-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          CSE PREP
        </motion.h1>
        
        <motion.p 
          className="text-slate-300/80 text-sm sm:text-base font-medium max-w-xs flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <GraduationCap className="w-4 h-4" /> Smart Preparation Tracker
        </motion.p>
      </motion.div>

      {/* Loading Progress Bar or Launch Button */}
      <motion.div 
        className="absolute bottom-16 left-0 right-0 px-12 sm:px-32 max-w-md mx-auto w-full z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {loadingProgress < 100 ? (
          <>
            <div className="flex justify-between items-end mb-2 px-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Initializing Engines...
              </span>
              <span className="text-xs font-bold text-white">{Math.min(loadingProgress, 100)}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50 relative">
              <motion.div
                className="absolute top-0 left-0 bottom-0 bg-white rounded-full shadow-[0_0_10px_white]"
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(loadingProgress, 100)}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
              />
            </div>
          </>
        ) : (
          <motion.button
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-full py-4 bg-white text-[#020617] font-black text-sm uppercase tracking-widest rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all flex items-center justify-center gap-2 group cursor-pointer overflow-hidden border border-white/20"
            onClick={onComplete}
          >
            <div className="absolute inset-0 bg-black/5 translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative z-10">Ready to Launch</span>
            <Sparkles className="w-5 h-5 relative z-10 group-hover:rotate-12 group-hover:scale-125 transition-all text-amber-500" />
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}
