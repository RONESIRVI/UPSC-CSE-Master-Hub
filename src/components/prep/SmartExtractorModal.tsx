import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  UploadCloud,
  ScanSearch,
  Layout,
  Image as ImageIcon,
  FileText,
  Download,
  Settings,
  CheckSquare,
  Square,
  Crop,
  Layers,
  Sparkles
} from "lucide-react";

interface SmartExtractorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SmartExtractorModal: React.FC<SmartExtractorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeRightTab, setActiveRightTab] = useState<"text" | "visuals">("text");
  const [showExportSettings, setShowExportSettings] = useState(false);
  
  const [exportSettings, setExportSettings] = useState({
    preserveText: true,
    preserveDiagrams: true,
    preserveTables: true,
    preserveOriginalPositions: true,
  });

  const [detectedVisuals, setDetectedVisuals] = useState([
    { id: 1, type: "Diagram", name: "Diagram 1", selected: true },
    { id: 2, type: "Flowchart", name: "Flowchart 1", selected: true },
    { id: 3, type: "Map", name: "Map 1", selected: true },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        simulateProcessing();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateProcessing = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 2500);
  };

  const toggleVisualSelection = (id: number) => {
    setDetectedVisuals(prev => prev.map(v => v.id === id ? { ...v, selected: !v.selected } : v));
  };

  const handleSaveSelectedVisuals = (format: 'png' | 'jpg') => {
    alert(`Saving selected visuals as ${format.toUpperCase()}... (Simulated)`);
  };

  const handleKeepLayoutExport = () => {
    alert("Exporting document preserving layout... (Simulated)");
    setShowExportSettings(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[90vh] sm:h-[85vh] border border-slate-200"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-600/20">
                <ScanSearch className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  Smart OCR & Diagram Extractor
                  <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] uppercase tracking-wider font-bold">Pro</span>
                </h2>
                <p className="text-xs text-slate-500 font-medium">Detect Text, Tables, Diagrams, and Layouts automatically</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowExportSettings(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                disabled={!uploadedImage || isProcessing}
              >
                <Settings className="w-4 h-4" /> Keep Layout
              </button>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-slate-100/50">
            
            {/* Left Panel: Image Workspace */}
            <div className="flex-1 border-b lg:border-b-0 lg:border-r border-slate-200 p-4 flex flex-col bg-slate-50/50">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> Original Document
                </h3>
                {uploadedImage && !isProcessing && (
                  <button onClick={() => fileInputRef.current?.click()} className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Upload New</button>
                )}
              </div>

              <div className="flex-1 bg-white rounded-xl border border-slate-200 overflow-hidden relative shadow-sm flex items-center justify-center">
                {!uploadedImage ? (
                  <div className="text-center p-8">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      ref={fileInputRef} 
                      onChange={handleImageUpload} 
                    />
                    <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-indigo-100 border-dashed">
                      <UploadCloud className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">Upload Scanned Notes</h3>
                    <p className="text-sm text-slate-500 mb-4 max-w-xs mx-auto">Supports JPG, PNG images of your handwritten notes, Aristotle flowcharts, maps, etc.</p>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-md active:scale-95"
                    >
                      Browse Files
                    </button>
                  </div>
                ) : isProcessing ? (
                  <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 text-white">
                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <h3 className="text-lg font-bold flex items-center gap-2"><Sparkles className="w-5 h-5 text-indigo-400" /> Analyzing Layout...</h3>
                    <p className="text-sm text-indigo-200 mt-1">Separating Handwriting & Diagrams</p>
                  </div>
                ) : (
                  <div className="relative w-full h-full p-4 overflow-auto flex justify-center items-center group">
                    {/* Simulated Image with Bounding Boxes */}
                    <img src={uploadedImage} alt="Scanned Document" className="max-w-full max-h-full object-contain shadow-sm border border-slate-200" />
                    
                    {/* Simulated Overlays */}
                    <div className="absolute top-10 left-10 w-48 h-32 border-2 border-emerald-500 bg-emerald-500/10 rounded cursor-pointer group-hover:opacity-100 opacity-70 transition-opacity">
                      <span className="absolute -top-6 left-0 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-t">Visual Area (Map)</span>
                    </div>
                    <div className="absolute bottom-20 right-10 w-64 h-48 border-2 border-indigo-500 bg-indigo-500/10 rounded cursor-pointer group-hover:opacity-100 opacity-70 transition-opacity">
                      <span className="absolute -top-6 left-0 bg-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-t">Text Area (OCR)</span>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg">
                      <Crop className="w-3.5 h-3.5 text-indigo-400" />
                      Tip: Drag to manually select missed diagrams
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel: Extraction Results */}
            <div className="w-full lg:w-96 flex flex-col bg-white shrink-0">
              {/* Right Panel Tabs */}
              <div className="flex border-b border-slate-200 shrink-0">
                <button
                  onClick={() => setActiveRightTab("text")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-colors ${activeRightTab === "text" ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30" : "text-slate-500 hover:bg-slate-50"}`}
                >
                  <FileText className="w-4 h-4" /> OCR Text
                </button>
                <button
                  onClick={() => setActiveRightTab("visuals")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-colors ${activeRightTab === "text" ? "text-slate-500 hover:bg-slate-50" : "text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/30"}`}
                >
                  <ImageIcon className="w-4 h-4" /> Visual Elements
                  {!isProcessing && uploadedImage && (
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] px-1.5 py-0.5 rounded-full">{detectedVisuals.length}</span>
                  )}
                </button>
              </div>

              {/* Panel Content */}
              <div className="flex-1 overflow-y-auto p-4 bg-slate-50/30">
                {!uploadedImage ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400">
                    <Layout className="w-10 h-10 mb-2 opacity-20" />
                    <p className="text-sm font-medium">Upload an image to see results</p>
                  </div>
                ) : isProcessing ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                    <div className="space-y-2 w-full max-w-[200px]">
                      <div className="h-2 bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-2 bg-slate-200 rounded animate-pulse w-5/6"></div>
                      <div className="h-2 bg-slate-200 rounded animate-pulse w-4/6"></div>
                    </div>
                  </div>
                ) : activeRightTab === "text" ? (
                  <div className="space-y-4 h-full flex flex-col">
                    <textarea 
                      className="w-full flex-1 bg-white border border-slate-200 rounded-xl p-3 text-sm text-slate-700 font-mono resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
                      defaultValue={`Aristotle\nVirtue Ethics...\n\nGolden Mean - Avoid Extremes\n\nThe fundamental principle revolves around finding balance between deficiency and excess. As shown in the diagram...`}
                    />
                    <button className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-sm active:scale-95">
                      Copy Text
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 h-full flex flex-col">
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <p className="text-xs text-emerald-800 font-medium">
                        <strong>{detectedVisuals.length} visual elements detected.</strong> You can save them as separate images.
                      </p>
                    </div>

                    <div className="space-y-2 flex-1">
                      {detectedVisuals.map((visual) => (
                        <div key={visual.id} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:border-emerald-300 transition-colors cursor-pointer" onClick={() => toggleVisualSelection(visual.id)}>
                          <div className="flex items-center gap-3">
                            <button className={`text-slate-400 ${visual.selected ? 'text-emerald-500' : ''}`}>
                              {visual.selected ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                            </button>
                            <span className="text-sm font-bold text-slate-700">{visual.name}</span>
                          </div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">{visual.type}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-2 shrink-0">
                      <button 
                        onClick={() => handleSaveSelectedVisuals('png')}
                        className="py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <Download className="w-4 h-4" /> Save PNG
                      </button>
                      <button 
                        onClick={() => handleSaveSelectedVisuals('jpg')}
                        className="py-2.5 bg-emerald-500 text-white rounded-xl font-bold text-sm hover:bg-emerald-600 transition-colors shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <Download className="w-4 h-4" /> Save JPG
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Export Settings Modal (Keep Layout) */}
      {showExportSettings && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-600" /> Keep Layout Export
              </h3>
              <button onClick={() => setShowExportSettings(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-xs text-slate-500">Select what to preserve while reconstructing the document structure.</p>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={exportSettings.preserveText} onChange={() => setExportSettings(s => ({...s, preserveText: !s.preserveText}))} className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300" />
                  <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">Preserve OCR Text</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={exportSettings.preserveDiagrams} onChange={() => setExportSettings(s => ({...s, preserveDiagrams: !s.preserveDiagrams}))} className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300" />
                  <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">Preserve Diagrams</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={exportSettings.preserveTables} onChange={() => setExportSettings(s => ({...s, preserveTables: !s.preserveTables}))} className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300" />
                  <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">Preserve Tables & Maps</span>
                </label>
                <div className="h-px w-full bg-slate-100 my-2"></div>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={exportSettings.preserveOriginalPositions} onChange={() => setExportSettings(s => ({...s, preserveOriginalPositions: !s.preserveOriginalPositions}))} className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300" />
                  <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">Preserve Original Positions</span>
                </label>
              </div>

              <button 
                onClick={handleKeepLayoutExport}
                className="w-full mt-2 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Export Document (JPG)
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
