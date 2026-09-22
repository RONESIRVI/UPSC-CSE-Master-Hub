import React from "react";
import { X, Settings2, Smartphone, Palette, Bell, Shield } from "lucide-react";
import { AppIconPlugin } from "../../plugins/AppIconPlugin";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Settings2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">App Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-8">
          
          {/* App Icon Selection */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-800">
              <Smartphone className="w-5 h-5 text-indigo-500" />
              App Icon Theme (Home Screen)
            </label>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Change the app icon displayed on your device's home screen. (Applies automatically on Android)
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "default", label: "Classic", color: "bg-indigo-600" },
                { id: "dark", label: "Dark Mode", color: "bg-slate-900" },
                { id: "minimal", label: "Minimalist", color: "bg-slate-100 border-2 border-slate-300" }
              ].map(theme => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => AppIconPlugin.changeIcon(theme.id)}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-slate-100 hover:border-indigo-300 hover:bg-indigo-50/50 bg-white shadow-sm transition-all active:scale-95 group"
                >
                  <div className={`w-12 h-12 rounded-[14px] shadow-md mb-3 ${theme.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    <span className={theme.id === "minimal" ? "text-slate-800 font-black text-lg" : "text-white font-black text-lg"}>C</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700">{theme.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Placeholder for future settings */}
          <div className="pt-6 border-t border-slate-100 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">More Options</h3>
            
            <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors text-left group">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-rose-50 text-rose-500 rounded-lg group-hover:bg-rose-100 transition-colors">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-700 text-sm">App Theme</h4>
                  <p className="text-xs text-slate-400">Light, Dark, or System Match</p>
                </div>
              </div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">Coming Soon</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors text-left group">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-amber-50 text-amber-500 rounded-lg group-hover:bg-amber-100 transition-colors">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-700 text-sm">Notifications</h4>
                  <p className="text-xs text-slate-400">Manage daily reminders</p>
                </div>
              </div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">Coming Soon</span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 flex justify-end bg-slate-50 rounded-b-3xl mt-auto">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-md hover:bg-slate-800 transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
