import React, { useState, useEffect } from "react";
import { Image as ImageIcon, Link as LinkIcon, ExternalLink, RefreshCw, FolderTree, AlertCircle, X, ZoomIn, LogOut } from "lucide-react";

interface DriveImage {
  id: string;
  name: string;
}

interface TopicFolder {
  id: string;
  topic: string;
  images: DriveImage[];
}

export const MindmapsGalleryTab: React.FC = () => {
  const [scriptUrl, setScriptUrl] = useState<string>(() => localStorage.getItem("upsc_script_url") || "");
  const [inputUrl, setInputUrl] = useState("");
  
  const [topics, setTopics] = useState<TopicFolder[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<string>("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  useEffect(() => {
    if (scriptUrl) {
      fetchData();
    }
  }, [scriptUrl]);

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      localStorage.setItem("upsc_script_url", inputUrl.trim());
      setScriptUrl(inputUrl.trim());
    }
  };

  const handleClearUrl = () => {
    if (confirm("Are you sure you want to disconnect? You will need to paste the Live Link again.")) {
      localStorage.removeItem("upsc_script_url");
      setScriptUrl("");
      setTopics([]);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(scriptUrl);
      const result = await res.json();
      
      if (result.status === "error") {
        throw new Error(result.message || "Failed to load data from script.");
      }
      
      const fetchedTopics = result.data || [];
      setTopics(fetchedTopics);
      
      // Auto-select first topic if none is selected and topics exist
      if (fetchedTopics.length > 0 && !selectedTopicId) {
        setSelectedTopicId(fetchedTopics[0].id);
      }
    } catch (err: any) {
      setError("Failed to fetch. Make sure your Script Link is correct and published to 'Anyone'.");
    } finally {
      setLoading(false);
    }
  };

  const getDirectImageUrl = (fileId: string) => {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  };

  const currentTopic = topics.find(t => t.id === selectedTopicId);

  // -------------------------------------------------------------
  // SETUP SCREEN (If Script URL is missing)
  // -------------------------------------------------------------
  if (!scriptUrl) {
    return (
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm max-w-2xl mx-auto my-8">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
          <LinkIcon className="w-8 h-8" />
        </div>
        
        <h2 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Connect Live Folder</h2>
        <p className="text-slate-500 mb-8 leading-relaxed text-sm">
          To automatically sync mindmaps from your Google Drive folder, you need to create a <strong>Google Apps Script Web App</strong> (Live Link).
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-slate-800 text-sm mb-3">How to get your Live Link (2 Minutes):</h3>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-600 font-medium">
            <li>Go to <a href="https://script.google.com" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">script.google.com</a> and click <strong>New Project</strong>.</li>
            <li>Copy the code from the <code>drive_apps_script.js</code> file provided by the AI and paste it there.</li>
            <li>Click <strong>Deploy</strong> {'>'} <strong>New deployment</strong> in the top right.</li>
            <li>Select type: <strong>Web app</strong>.</li>
            <li>Under "Who has access", select <strong>Anyone</strong>.</li>
            <li>Click Deploy, authorize it, copy the <strong>Web app URL</strong>, and paste it below!</li>
          </ol>
        </div>

        <form onSubmit={handleSaveUrl} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
              Your Web App URL (Live Link)
            </label>
            <input
              type="url"
              required
              placeholder="https://script.google.com/macros/s/.../exec"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-md shadow-indigo-500/20 transition-all active:scale-95 cursor-pointer flex justify-center items-center gap-2"
          >
            Connect & Sync Drive
          </button>
        </form>
      </div>
    );
  }

  // -------------------------------------------------------------
  // GALLERY SCREEN
  // -------------------------------------------------------------
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 border-2 border-slate-200 rounded-3xl shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-indigo-600" />
            Mindmaps Gallery
          </h2>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              Live Sync Active (Apps Script)
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <a
            href={`https://drive.google.com/drive/folders/1TqXpQc1MPN5dgw41-X1rODhT3l71TeNB`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 md:flex-none px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <FolderTree className="w-4 h-4" />
            Open Drive Folder
          </a>
          <button
            onClick={fetchData}
            className="p-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-100 hover:text-indigo-600 transition-colors cursor-pointer"
            title="Refresh Sync"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleClearUrl}
            className="p-2 bg-slate-50 border border-slate-200 text-slate-400 rounded-xl hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors cursor-pointer"
            title="Disconnect Live Link"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-rose-900">Sync Error</h4>
            <p className="text-xs text-rose-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Topics (Subfolders) Tabs */}
      {!error && topics.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pb-2">
          {topics.map(topic => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedTopicId === topic.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {topic.topic} ({topic.images.length})
            </button>
          ))}
        </div>
      )}

      {/* Images Grid */}
      {!error && (
        loading ? (
          <div className="py-20 flex justify-center items-center">
            <div className="animate-spin w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full"></div>
          </div>
        ) : (!currentTopic || currentTopic.images.length === 0) ? (
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No Images in this Topic</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Upload images inside this subfolder in your Google Drive and hit refresh.
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {currentTopic.images.map((file) => (
              <div 
                key={file.id} 
                className="break-inside-avoid bg-white rounded-3xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 group relative overflow-hidden flex flex-col"
              >
                {/* Image Thumbnail */}
                <div 
                  className="relative aspect-auto rounded-2xl overflow-hidden cursor-zoom-in bg-slate-100 flex-1"
                  onClick={() => setSelectedImageId(file.id)}
                >
                  <img 
                    src={getDirectImageUrl(file.id)} 
                    alt={file.name}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/600x400/f8fafc/94a3b8?text=Loading+Failed";
                    }}
                  />
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-xl">
                      <ZoomIn className="w-5 h-5 text-slate-800" />
                    </div>
                  </div>
                </div>

                {/* Card Title */}
                <div className="p-3 pt-4">
                  <h3 className="text-xs font-bold text-slate-800 leading-snug break-words">
                    {file.name.replace(/\.[^/.]+$/, "")} {/* Remove extension */}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* Full Screen Lightbox */}
      {selectedImageId && (
        <div 
          className="fixed inset-0 z-[200] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in duration-200"
          onClick={() => setSelectedImageId(null)}
        >
          <img 
            src={getDirectImageUrl(selectedImageId)} 
            alt="Expanded view" 
            className="max-w-full max-h-[95vh] object-contain rounded-xl shadow-2xl"
          />
          <div className="absolute top-4 right-4 text-white/50 bg-black/20 hover:bg-black/40 hover:text-white p-2 rounded-full backdrop-blur-md transition-all cursor-pointer">
            <X className="w-6 h-6" />
          </div>
          <div className="absolute bottom-6 flex justify-center w-full pointer-events-none">
            <div className="bg-black/40 backdrop-blur-md text-white/90 text-[10px] font-bold px-4 py-2 rounded-full tracking-widest uppercase shadow-xl">
              Click anywhere to close
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
