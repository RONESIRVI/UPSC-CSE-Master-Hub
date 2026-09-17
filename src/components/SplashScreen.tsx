import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Compass, Sparkles, GraduationCap } from "lucide-react";

export function SplashScreen() {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 5; // increment by 5-15%
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
      {/* Background Animated Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDelay: "1s" }} />

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
          <div className="relative flex items-center justify-center w-24 h-24 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden mb-6 bg-white p-1 border border-slate-100">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 translate-x-[-100%] animate-[shimmer_2s_infinite] z-20" />
            <img src="/icon.png" alt="LBSNAA" className="w-full h-full object-contain rounded-2xl z-10" />
          </div>
          {/* Floating Sparkles */}
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
          className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-white to-purple-200 mb-3 tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          UPSC & RAS 
          <br className="sm:hidden" /> Master Hub
        </motion.h1>
        
        <motion.p 
          className="text-indigo-200/70 text-sm sm:text-base font-medium max-w-xs flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <GraduationCap className="w-4 h-4" /> Smart Preparation Tracker
        </motion.p>
      </motion.div>

      {/* Loading Progress Bar */}
      <motion.div 
        className="absolute bottom-16 left-0 right-0 px-12 sm:px-32 max-w-md mx-auto w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="flex justify-between items-end mb-2 px-1">
          <span className="text-[10px] font-bold text-indigo-300/60 uppercase tracking-widest">
            {loadingProgress < 100 ? "Initializing Engines..." : "Ready to Launch"}
          </span>
          <span className="text-xs font-bold text-white">{Math.min(loadingProgress, 100)}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50 relative">
          <motion.div
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${Math.min(loadingProgress, 100)}%` }}
            transition={{ ease: "easeOut", duration: 0.2 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
