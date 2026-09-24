import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Compass, Sparkles, GraduationCap, Settings2, Palette } from "lucide-react";

const AuroraBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-600/30 blur-[100px] mix-blend-screen" animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
    <motion.div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-purple-600/30 blur-[120px] mix-blend-screen" animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
    <motion.div className="absolute top-[30%] right-[30%] w-[40vw] h-[40vw] rounded-full bg-blue-500/20 blur-[80px] mix-blend-screen" animate={{ x: [0, -40, 0], y: [0, 80, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
  </div>
);

const WarpSpeed = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center perspective-[1000px]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_70%)] z-10" />
    {Array.from({ length: 60 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-0.5 bg-gradient-to-t from-white to-transparent"
        style={{ 
          rotate: `${(i * 360) / 60}deg`, 
          originY: '1000px', // Creates the radial shooting effect
          height: Math.random() * 100 + 50 + 'px'
        }}
        animate={{ 
          opacity: [0, 1, 0], 
          scaleY: [0, 2, 0],
          y: [0, -1000] 
        }}
        transition={{ 
          duration: Math.random() * 1 + 0.5, 
          repeat: Infinity, 
          delay: Math.random() * 2, 
          ease: "easeIn" 
        }}
      />
    ))}
  </div>
);

const GoldenRings = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 blur-[100px] rounded-full animate-pulse" />
    {[1, 2, 3, 4, 5].map((i) => (
      <motion.div
        key={i}
        className="absolute rounded-full border border-[#D4AF37]/20 border-dashed"
        style={{ width: `${i * 120}px`, height: `${i * 120}px` }}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: i * 8, 
          repeat: Infinity, 
          ease: "linear", 
          direction: i % 2 === 0 ? "reverse" : "normal" 
        }}
      />
    ))}
  </div>
);

const NeuralNetwork = () => {
  const nodes = Array.from({ length: 20 }).map((_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100, duration: Math.random() * 15 + 10
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-[#020617]" />
      {nodes.map(node => (
        <motion.div
          key={node.id}
          className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full blur-[1px] shadow-[0_0_10px_cyan]"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          animate={{ 
            x: [0, (Math.random() - 0.5) * 100, 0], 
            y: [0, (Math.random() - 0.5) * 100, 0] 
          }}
          transition={{ duration: node.duration, repeat: Infinity, ease: "linear" }}
        />
      ))}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        {nodes.map((node, i) => (
           nodes.slice(i+1, i+3).map(target => (
             <motion.line 
               key={`${node.id}-${target.id}`} 
               x1={`${node.x}%`} y1={`${node.y}%`} 
               x2={`${target.x}%`} y2={`${target.y}%`} 
               stroke="#22d3ee" strokeWidth="1" 
             />
           ))
        ))}
      </svg>
    </div>
  )
};

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [effectType, setEffectType] = useState<"aurora" | "warp" | "rings" | "neural">("aurora");

  const effects = [
    { id: "aurora", name: "Aurora Liquid" },
    { id: "warp", name: "Warp Speed" },
    { id: "rings", name: "Golden Rings" },
    { id: "neural", name: "Neural AI" },
  ];

  useEffect(() => {
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

  const cycleEffect = () => {
    const currentIndex = effects.findIndex(e => e.id === effectType);
    const nextIndex = (currentIndex + 1) % effects.length;
    setEffectType(effects[nextIndex].id as any);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      {/* Background Effect Engine */}
      {effectType === "aurora" && <AuroraBackground />}
      {effectType === "warp" && <WarpSpeed />}
      {effectType === "rings" && <GoldenRings />}
      {effectType === "neural" && <NeuralNetwork />}

      {/* Effect Switcher (For User Testing) */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest bg-black/20 px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-md">
          {effects.find(e => e.id === effectType)?.name}
        </span>
        <button 
          onClick={cycleEffect}
          className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md border border-white/10 transition-all hover:rotate-180"
          title="Change Animation Effect"
        >
          <Palette className="w-5 h-5" />
        </button>
      </div>

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
