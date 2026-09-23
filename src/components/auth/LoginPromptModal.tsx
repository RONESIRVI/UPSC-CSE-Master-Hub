import React, { useState } from "react";
import { Cloud, ShieldCheck, X, LogIn } from "lucide-react";
import { signInWithGoogle } from "../../lib/authService";

interface LoginPromptModalProps {
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

export const LoginPromptModal: React.FC<LoginPromptModalProps> = ({ onClose, onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await signInWithGoogle();
      if (user) {
        onLoginSuccess(user);
      }
    } catch (err: any) {
      setError(err.message || "Failed to log in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          
          <div className="relative z-10">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-lg">
              <Cloud className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight mb-2">
              Secure Your Progress
            </h2>
            <p className="text-indigo-100 text-sm font-medium">
              Save your study data to the cloud so you never lose it, even if you uninstall the app.
            </p>
          </div>
        </div>

        <div className="p-6 space-y-4 bg-slate-50">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-bold rounded-xl text-center">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white border-2 border-slate-200 hover:border-indigo-500 rounded-xl transition-all shadow-sm group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              <span className="font-bold text-slate-700 group-hover:text-indigo-700">
                {loading ? "Signing in..." : "Continue with Google"}
              </span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-200 mt-4">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <p className="text-[10px] text-slate-500 font-medium">
                Offline Mode Supported. Your progress is stored locally when internet is disconnected.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 text-slate-500 font-bold text-sm hover:bg-slate-200/50 rounded-xl transition-colors"
            >
              Skip (Use Offline Mode)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
