import React, { useState } from "react";
import { Cloud, ShieldCheck, X, LogIn, Mail, Lock, UserPlus, Send } from "lucide-react";
import { signInWithGoogle, loginWithEmail, resetPassword } from "../../lib/authService";

interface LoginPromptModalProps {
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

export const LoginPromptModal: React.FC<LoginPromptModalProps> = ({ onClose, onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // UI State for Email/Password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const sanitizedEmail = email.replace(/\s+/g, '');
      const user = await loginWithEmail(sanitizedEmail, password);
      if (user) {
        onLoginSuccess(user);
      }
    } catch (err: any) {
      setError(err.message || "Invalid Email or Password.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address first.");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const sanitizedEmail = email.replace(/\s+/g, '');
      await resetPassword(sanitizedEmail);
      setSuccess("Password reset link sent to your email!");
    } catch (err: any) {
      setError(err.message || "Failed to send reset email.");
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
        
        {/* Header Section */}
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 text-center relative overflow-hidden pb-12">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-lg">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight mb-2">
              Welcome Back!
            </h2>
            <p className="text-indigo-100 text-sm font-medium">
              Secure your preparation data to the cloud.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="px-6 pb-6 bg-slate-50 relative -mt-6 rounded-t-3xl border-t border-slate-100">
          
          {error && (
            <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold rounded-xl text-center flex justify-between items-center">
              <span>{error}</span>
              <button onClick={() => setError(null)}><X className="w-4 h-4 hover:text-rose-800" /></button>
            </div>
          )}

          {success && (
            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-bold rounded-xl text-center flex justify-between items-center">
              <span>{success}</span>
              <button onClick={() => setSuccess(null)}><X className="w-4 h-4 hover:text-emerald-800" /></button>
            </div>
          )}

          <form onSubmit={handleEmailAuth} className="mt-6 space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border-2 border-slate-200 text-slate-800 text-sm font-bold rounded-xl focus:ring-0 focus:border-indigo-500 block pl-10 p-3 transition-colors outline-none"
                  placeholder="aspirant@lbsnaa.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5 ml-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Password</label>
                <button 
                  type="button" 
                  onClick={handleForgotPassword}
                  className="text-[10px] font-bold text-indigo-500 hover:text-indigo-700 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border-2 border-slate-200 text-slate-800 text-sm font-bold rounded-xl focus:ring-0 focus:border-indigo-500 block pl-10 p-3 transition-colors outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><LogIn className="w-5 h-5" /> Log In securely</>
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-slate-50 text-slate-400 font-bold uppercase tracking-wider">Or</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border-2 border-slate-200 hover:border-slate-300 rounded-xl transition-all shadow-sm group"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
              <span className="font-bold text-slate-600 text-sm">
                Continue with Google
              </span>
            </button>

            <button
              onClick={onClose}
              type="button"
              className="w-full py-3 text-slate-400 font-bold text-xs hover:bg-slate-200/50 rounded-xl transition-colors cursor-pointer"
            >
              Skip (Use Offline Mode)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
