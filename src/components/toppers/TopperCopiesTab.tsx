import React, { useState, useEffect } from "react";
import { FileText, ExternalLink, RefreshCw, FolderTree, AlertCircle, X, Maximize2 } from "lucide-react";

// The hardcoded Live Link for PDFs
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbytEMFu6Fgw_rJZ0mmJMAXkPyj3m7MwQ-bBS_RsxDNLBsLb23zt0rW3xZq9JaqtSfYJ/exec";
const MASTER_FOLDER_ID = "1R0BL-zLX4lcaYwtlJxX46OENzhWv6yNN";

interface DriveDocument {
  id: string;
  name: string;
}

interface TopicFolder {
  id: string;
  topic: string;
  documents: DriveDocument[];
}

export const TopperCopiesTab: React.FC = () => {
  const [topics, setTopics] = useState<TopicFolder[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<string>("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedPdfId, setSelectedPdfId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(SCRIPT_URL, { redirect: 'follow' });
      const result = await res.json();
      
      if (result.status === "error") {
        throw new Error(result.message || "Failed to load data from script.");
      }
      
      const fetchedTopics = result.data || [];
      setTopics(fetchedTopics);
      
      if (fetchedTopics.length > 0 && !selectedTopicId) {
        setSelectedTopicId(fetchedTopics[0].id);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch PDFs. Make sure your Script Link is correct and the folder exists.");
    } finally {
      setLoading(false);
    }
  };

  const getPdfEmbedUrl = (fileId: string) => {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  };

  const currentTopic = topics.find(t => t.id === selectedTopicId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 border-2 border-slate-200 rounded-3xl shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-600" />
            Topper Copies (PDFs)
          </h2>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              Live Sync Active
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <a
            href={`https://drive.google.com/drive/folders/${MASTER_FOLDER_ID}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 md:flex-none px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <FolderTree className="w-4 h-4" />
            Open Drive Folder
          </a>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold rounded-xl hover:bg-indigo-100 transition-colors cursor-pointer flex items-center gap-2"
            title="Refresh Sync"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Sync Now
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
              {topic.topic} ({topic.documents.length})
            </button>
          ))}
        </div>
      )}

      {/* Documents Grid */}
      {!error && (
        loading ? (
          <div className="py-20 flex justify-center items-center">
            <div className="animate-spin w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full"></div>
          </div>
        ) : (!currentTopic || currentTopic.documents.length === 0) ? (
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No PDFs in this Topic</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Upload PDF files inside this subfolder in your Google Drive and hit refresh.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentTopic.documents.map((file) => (
              <div 
                key={file.id} 
                onClick={() => setSelectedPdfId(file.id)}
                className="bg-white rounded-2xl p-5 border-2 border-slate-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col items-center text-center gap-4 relative overflow-hidden"
              >
                {/* PDF Icon styling */}
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                  <FileText className="w-8 h-8" />
                </div>
                
                <h3 className="text-sm font-bold text-slate-800 leading-snug break-words w-full line-clamp-3">
                  {file.name.replace(/\.[^/.]+$/, "")}
                </h3>

                <div className="absolute top-3 right-3 text-slate-300 group-hover:text-indigo-500 transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* Full Screen PDF Lightbox */}
      {selectedPdfId && (
        <div className="fixed inset-0 z-[200] bg-slate-900/95 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
          <div className="flex justify-end p-4">
            <button 
              onClick={() => setSelectedPdfId(null)}
              className="text-white/50 bg-black/20 hover:bg-black/40 hover:text-white px-4 py-2 rounded-xl backdrop-blur-md transition-all cursor-pointer font-bold flex items-center gap-2"
            >
              <X className="w-5 h-5" /> Close PDF
            </button>
          </div>
          <div className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 pt-0">
            <iframe 
              src={getPdfEmbedUrl(selectedPdfId)}
              className="w-full h-full rounded-2xl shadow-2xl bg-white"
              allow="autoplay"
              title="PDF Viewer"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};
