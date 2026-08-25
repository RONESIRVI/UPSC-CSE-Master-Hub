import React from "react";
import { motion } from "motion/react";

export function SplashScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#020617] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      {/* Subtle background glow effect */}
      <div className="absolute inset-0 bg-indigo-900/20 blur-[120px] rounded-full scale-150" />

      <motion.div
        className="relative z-10 w-full h-full max-w-2xl max-h-[100dvh] flex items-center justify-center p-4 sm:p-8"
        initial={{ scale: 0.85, opacity: 0, filter: "blur(10px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} // smooth spring-like easing
      >
        <motion.img
          src="/splash-image.jpeg"
          alt="UPSC Topper Intelligence App"
          className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-[0_0_80px_rgba(79,70,229,0.3)] ring-1 ring-white/10"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Loading indicator that fades in after a delay */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
