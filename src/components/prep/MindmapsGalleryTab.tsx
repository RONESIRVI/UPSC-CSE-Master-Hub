import React, { useState } from "react";
import { SyllabusTopic, Mindmap } from "../../types";
import { useMindmapsData } from "../../hooks/useMindmapsData";
import { Plus, Image as ImageIcon, ExternalLink, Trash2, X, ZoomIn } from "lucide-react";

interface MindmapsGalleryTabProps {
  syllabus: SyllabusTopic[];
}

export const MindmapsGalleryTab: React.FC<MindmapsGalleryTabProps> = ({ syllabus }) => {
  const { mindmaps, loading, addMindmap, deleteMindmap } = useMindmapsData();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [driveUrl, setDriveUrl] = useState("");
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to convert Google Drive share link to direct image link
  const getDirectImageUrl = (url: string) => {
    try {
      // Handle standard sharing link: https://drive.google.com/file/d/FILE_ID/view
      const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (fileIdMatch && fileIdMatch[1]) {
        return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
      }
      // Handle open link: https://drive.google.com/open?id=FILE_ID
      const openIdMatch = url.match(/id=([a-zA-Z0-9_-]+)/);
      if (openIdMatch && openIdMatch[1]) {
        return `https://drive.google.com/uc?export=view&id=${openIdMatch[1]}`;
      }
      return url; // fallback
    } catch {
      return url;
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subject || !driveUrl) return;
    
    setIsSubmitting(true);
    try {
      await addMindmap({
        title,
        subject,
        driveUrl,
        tags: tags.split(",").map(t => t.trim()).filter(Boolean)
      });
      setShowAddModal(false);
      setTitle("");
      setSubject("");
      setDriveUrl("");
      setTags("");
    } catch (error) {
      alert("Failed to save mindmap. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 border-2 border-slate-200 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-indigo-600" />
            Mindmaps Gallery
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Visual notes and mindmaps synced from Google Drive via Firebase.
          </p>
        </div>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          Add Mindmap
        </button>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <div className="animate-spin w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full"></div>
        </div>
      ) : mindmaps.length === 0 ? (
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3">
            <ImageIcon className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No Mindmaps Found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
            Upload your handwritten notes or mindmaps to Google Drive, then add the shareable link here to build your visual gallery.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 bg-indigo-50 text-indigo-700 text-sm font-bold rounded-xl hover:bg-indigo-100 transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add First Mindmap
          </button>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {mindmaps.map((mm) => (
            <div 
              key={mm.id} 
              className="break-inside-avoid bg-white rounded-3xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group relative overflow-hidden"
            >
              {/* Image Thumbnail */}
              <div 
                className="relative aspect-auto rounded-2xl overflow-hidden cursor-zoom-in bg-slate-100"
                onClick={() => setSelectedImage(getDirectImageUrl(mm.driveUrl))}
              >
                <img 
                  src={getDirectImageUrl(mm.driveUrl)} 
                  alt={mm.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback if image blocked by browser tracking protection
                    (e.target as HTMLImageElement).src = "https://placehold.co/600x400/f8fafc/94a3b8?text=Image+Unavailable";
                  }}
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                    <ZoomIn className="w-5 h-5 text-slate-800" />
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-3 pt-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-lg uppercase tracking-wider shrink-0">
                    {mm.subject}
                  </span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a 
                      href={mm.driveUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition cursor-pointer"
                      title="Open in Drive"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button 
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this mindmap?")) {
                          deleteMindmap(mm.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-tight mb-3">
                  {mm.title}
                </h3>
                {mm.tags && mm.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {mm.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-indigo-50/50">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-600" />
                Add New Mindmap
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 hover:bg-white rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Google Drive Link *</label>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/file/d/.../view"
                  value={driveUrl}
                  onChange={(e) => setDriveUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 transition-colors"
                />
                <p className="text-[10px] text-slate-500 mt-1.5">Ensure the link is set to "Anyone with the link can view".</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject *</label>
                <select
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                >
                  <option value="">Select Subject...</option>
                  {Array.from(new Set(syllabus.map(t => t.subject).filter(Boolean))).map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fundamental Rights Overview"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tags (Comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. polity, revision, mains"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl font-bold text-sm transition-colors cursor-pointer flex justify-center items-center"
                >
                  {isSubmitting ? "Saving..." : "Save Mindmap"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[200] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage} 
            alt="Expanded view" 
            className="max-w-full max-h-[95vh] object-contain rounded-xl shadow-2xl"
          />
          <div className="absolute top-4 right-4 text-white/50 bg-black/20 hover:bg-black/40 hover:text-white p-2 rounded-full backdrop-blur-md transition-all cursor-pointer">
            <X className="w-6 h-6" />
          </div>
        </div>
      )}
    </div>
  );
};
