import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Compass, Sparkles, GraduationCap } from "lucide-react";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
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

  // Generate random particles for the background
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 2,
  }));

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      {/* Animated Gradient Background */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-40"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, #3730a3 0%, transparent 40%)",
            "radial-gradient(circle at 80% 70%, #4c1d95 0%, transparent 40%)",
            "radial-gradient(circle at 50% 50%, #1e1b4b 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, #3730a3 0%, transparent 40%)",
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating Particles System */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute bg-white rounded-full blur-[1px]"
            style={{
              width: p.size + "px",
              height: p.size + "px",
              left: p.x + "%",
              top: p.y + "%",
            }}
            animate={{
              y: ["0%", "-500%"],
              x: ["0%", `${(Math.random() - 0.5) * 200}%`],
              opacity: [0, 0.8, 0],
              scale: [0, Math.random() * 2 + 1, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Deep Space Grid overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* Core Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full mix-blend-screen animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDelay: "1.5s" }} />

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
          CSE PREP
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

      {/* Loading Progress Bar or Launch Button */}
      <motion.div 
        className="absolute bottom-16 left-0 right-0 px-12 sm:px-32 max-w-md mx-auto w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {loadingProgress < 100 ? (
          <>
            <div className="flex justify-between items-end mb-2 px-1">
              <span className="text-[10px] font-bold text-indigo-300/60 uppercase tracking-widest">
                Initializing Engines...
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
          </>
        ) : (
          <motion.button
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all flex items-center justify-center gap-2 group cursor-pointer overflow-hidden border border-white/20"
            onClick={onComplete}
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative z-10">Ready to Launch</span>
            <Sparkles className="w-5 h-5 relative z-10 group-hover:rotate-12 group-hover:scale-125 transition-all" />
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}
