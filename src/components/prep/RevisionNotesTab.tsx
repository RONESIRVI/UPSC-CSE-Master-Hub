import React, { useState, useEffect } from "react";
import { QuickRevisionNote, SyllabusTopic } from "../../types";
import { DEFAULT_QUICK_REVISION_NOTES } from "../../data/notesData";
import {
  StickyNote,
  Plus,
  Search,
  Trash2,
  Edit3,
  Copy,
  Check,
  Sparkles,
  Tag,
  BookOpen,
  RotateCcw,
  Download,
  Flame,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

interface RevisionNotesTabProps {
  syllabus: SyllabusTopic[];
  onOpenTopicAI: (topic: SyllabusTopic) => void;
  onOpenAIMentorWithPrompt?: (prompt: string) => void;
}

export const RevisionNotesTab: React.FC<RevisionNotesTabProps> = ({
  syllabus,
  onOpenTopicAI,
  onOpenAIMentorWithPrompt,
}) => {
  // LocalStorage state for notes
  const [notes, setNotes] = useState<QuickRevisionNote[]>(() => {
    try {
      const saved = localStorage.getItem("upsc_quick_notes");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to parse quick notes", e);
    }
    return DEFAULT_QUICK_REVISION_NOTES;
  });

  // Sync to localStorage & listen for quick thoughts updates
  useEffect(() => {
    try {
      localStorage.setItem("upsc_quick_notes", JSON.stringify(notes));
    } catch (e) {
      console.error("Failed to save quick notes to localStorage", e);
    }
  }, [notes]);

  // Listen to window focus, storage, or custom upsc_notes_updated event to refresh notes in real-time
  useEffect(() => {
    const handleRefresh = (e?: Event) => {
      try {
        if (
          e &&
          (e as CustomEvent).detail &&
          Array.isArray((e as CustomEvent).detail)
        ) {
          setNotes((e as CustomEvent).detail);
          return;
        }
        const saved = localStorage.getItem("upsc_quick_notes");
        if (saved) {
          setNotes(JSON.parse(saved));
        }
      } catch (err) {
        // ignore
      }
    };
    window.addEventListener("focus", handleRefresh);
    window.addEventListener("storage", handleRefresh);
    window.addEventListener("upsc_notes_updated", handleRefresh);
    return () => {
      window.removeEventListener("focus", handleRefresh);
      window.removeEventListener("storage", handleRefresh);
      window.removeEventListener("upsc_notes_updated", handleRefresh);
    };
  }, []);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPaper, setSelectedPaper] = useState("All");
  const [selectedImportance, setSelectedImportance] = useState("All");
  const [copiedNoteId, setCopiedNoteId] = useState<string | null>(null);

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [formTopicTitle, setFormTopicTitle] = useState("");
  const [formPaper, setFormPaper] = useState("Prelims GS1");
  const [formSubject, setFormSubject] = useState("Indian Polity & Governance");
  const [formImportance, setFormImportance] =
    useState<QuickRevisionNote["importance"]>("🔥 High Yield");
  const [formBulletsText, setFormBulletsText] = useState("");
  const [formTagsText, setFormTagsText] = useState("");
  const [selectedSyllabusId, setSelectedSyllabusId] = useState<string>("");

  // Quick Inline Bullet Add State
  const [inlinePointText, setInlinePointText] = useState<{
    [key: string]: string;
  }>({});

  const papers = [
    "All",
    "Prelims GS1",
    "Prelims CSAT",
    "Mains GS1",
    "Mains GS2",
    "Mains GS3",
    "Mains GS4",
    "Mains Essay",
    "Optional",
  ];

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setEditingNoteId(null);
    setFormTopicTitle("");
    setFormPaper("Prelims GS1");
    setFormSubject("Indian Polity & Governance");
    setFormImportance("🔥 High Yield");
    setFormBulletsText("");
    setFormTagsText("High Yield, Prelims Fact");
    setSelectedSyllabusId("");
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (note: QuickRevisionNote) => {
    setEditingNoteId(note.id);
    setFormTopicTitle(note.topicTitle);
    setFormPaper(note.paper);
    setFormSubject(note.subject);
    setFormImportance(note.importance);
    setFormBulletsText(note.bulletPoints.join("\n"));
    setFormTagsText(note.tags.join(", "));
    setSelectedSyllabusId(note.topicId || "");
    setIsModalOpen(true);
  };

  // Handle Select from Syllabus
  const handleSelectSyllabusTopic = (topicId: string) => {
    setSelectedSyllabusId(topicId);
    if (!topicId) return;
    const found = syllabus.find((s) => s.id === topicId);
    if (found) {
      setFormTopicTitle(found.title);
      setFormPaper(found.paper);
      setFormSubject(found.subject);
      if (found.yield) {
        setFormImportance(found.yield as any);
      }
      if (found.notes && !formBulletsText) {
        setFormBulletsText(found.notes);
      }
    }
  };

  // Save Note (Create or Update)
  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTopicTitle.trim()) return;

    const bulletPoints = formBulletsText
      .split("\n")
      .map((b) => b.trim())
      .filter(Boolean);

    const tags = formTagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const currentDate = new Date().toISOString().split("T")[0];

    if (editingNoteId) {
      // Update
      setNotes((prev) =>
        prev.map((note) => {
          if (note.id === editingNoteId) {
            return {
              ...note,
              topicId: selectedSyllabusId || undefined,
              topicTitle: formTopicTitle.trim(),
              paper: formPaper,
              subject: formSubject.trim() || "General Studies",
              importance: formImportance,
              bulletPoints:
                bulletPoints.length > 0
                  ? bulletPoints
                  : ["Key concept reviewed."],
              tags: tags.length > 0 ? tags : ["Revision"],
              updatedAt: currentDate,
            };
          }
          return note;
        })
      );
    } else {
      // Create New
      const newNote: QuickRevisionNote = {
        id: `quick-note-${Date.now()}`,
        topicId: selectedSyllabusId || undefined,
        topicTitle: formTopicTitle.trim(),
        paper: formPaper,
        subject: formSubject.trim() || "General Studies",
        importance: formImportance,
        bulletPoints:
          bulletPoints.length > 0 ? bulletPoints : ["Key concept reviewed."],
        tags: tags.length > 0 ? tags : ["Revision"],
        updatedAt: currentDate,
      };
      setNotes((prev) => [newNote, ...prev]);
    }

    setIsModalOpen(false);
  };

  // Delete Note
  const handleDeleteNote = (id: string) => {
    if (confirm("Delete this revision note?")) {
      setNotes((prev) => prev.filter((n) => n.id !== id));
    }
  };

  // Add Inline Point directly to a note card
  const handleAddInlinePoint = (noteId: string) => {
    const text = inlinePointText[noteId]?.trim();
    if (!text) return;

    setNotes((prev) =>
      prev.map((note) => {
        if (note.id === noteId) {
          return {
            ...note,
            bulletPoints: [...note.bulletPoints, text],
            updatedAt: new Date().toISOString().split("T")[0],
          };
        }
        return note;
      })
    );

    setInlinePointText((prev) => ({ ...prev, [noteId]: "" }));
  };

  // Copy Note Content
  const handleCopyNote = (note: QuickRevisionNote) => {
    const text =
      `📌 ${note.topicTitle} (${note.paper} - ${note.subject})\n` +
      note.bulletPoints.map((pt, i) => `${i + 1}. ${pt}`).join("\n") +
      `\nTags: #${note.tags.join(" #")}`;

    navigator.clipboard.writeText(text);
    setCopiedNoteId(note.id);
    setTimeout(() => setCopiedNoteId(null), 2000);
  };

  // Export All Notes
  const handleExportNotes = () => {
    const markdown =
      `# UPSC Conquest - Quick Revision Notes Binder\nGenerated on: ${new Date().toLocaleDateString()}\n\n` +
      notes
        .map(
          (note) =>
            `## ${note.topicTitle}\n` +
            `**Paper:** ${note.paper} | **Subject:** ${note.subject} | **Yield:** ${note.importance}\n\n` +
            note.bulletPoints.map((pt) => `- ${pt}`).join("\n") +
            `\n\n*Tags:* ${note.tags.map((t) => `#${t}`).join(" ")}\n\n---\n`
        )
        .join("\n");

    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `UPSC-Revision-Notes-${
      new Date().toISOString().split("T")[0]
    }.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filter notes
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.topicTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      note.bulletPoints.some((b) =>
        b.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesPaper =
      selectedPaper === "All" || note.paper === selectedPaper;
    const matchesImportance =
      selectedImportance === "All" || note.importance === selectedImportance;

    return matchesSearch && matchesPaper && matchesImportance;
  });

  return (
    <div className="space-y-6">
      {/* Header Bento Tile */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100 flex items-center gap-1.5">
                <StickyNote className="w-3.5 h-3.5 text-indigo-600 shrink-0" />{" "}
                Quick Revision Binder
              </span>
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Local Persistence
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Micro-Revision Points & Fact Cards
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed mt-1">
              Save high-yield mnemonics, landmark Supreme Court articles,
              environmental treaties, and economic formulas for rapid
              last-minute revision.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleOpenCreateModal}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition cursor-pointer"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span>New Revision Note</span>
            </button>

            <button
              onClick={handleExportNotes}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
              title="Export Notes as Markdown"
            >
              <Download className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Export</span>
            </button>

            <button
              onClick={() => {
                if (
                  confirm(
                    "Reset to sample high-yield revision notes? Your custom notes will be replaced."
                  )
                ) {
                  setNotes(DEFAULT_QUICK_REVISION_NOTES);
                }
              }}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition cursor-pointer"
              title="Restore Default Sample Notes"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notes by topic, article, case law, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <select
              value={selectedPaper}
              onChange={(e) => setSelectedPaper(e.target.value)}
              className="bg-white border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2 outline-none font-bold focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-xs whitespace-nowrap"
            >
              {papers.map((p) => (
                <option key={p} value={p}>
                  {p === "All" ? "All Papers" : p}
                </option>
              ))}
            </select>

            <select
              value={selectedImportance}
              onChange={(e) => setSelectedImportance(e.target.value)}
              className="bg-white border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2 outline-none font-bold focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-xs whitespace-nowrap"
            >
              <option value="All">All Priority Levels</option>
              <option value="🔥 High Yield">🔥 High Yield</option>
              <option value="⭐ Important">⭐ Important</option>
              <option value="📘 Standard">📘 Standard</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 text-center space-y-3">
          <StickyNote className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">
            No revision notes found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Create your first quick revision note card for any syllabus topic or
            keyword.
          </p>
          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition cursor-pointer"
          >
            Create Note Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotes.map((note) => {
            return (
              <div
                key={note.id}
                className="bg-white border-2 border-slate-200 hover:border-indigo-300 rounded-2xl p-5 shadow-xs transition-all flex flex-col justify-between space-y-4"
              >
                {/* Note Header */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold text-[11px] border border-indigo-100 whitespace-nowrap">
                        {note.paper}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {note.subject}
                      </span>
                      <span className="text-xs text-amber-700 font-bold whitespace-nowrap">
                        • {note.importance}
                      </span>
                    </div>

                    {/* Card Actions */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleCopyNote(note)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition cursor-pointer"
                        title="Copy points to clipboard"
                      >
                        {copiedNoteId === note.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        onClick={() => handleOpenEditModal(note)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                        title="Edit note"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                        title="Delete note"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {note.topicTitle}
                  </h3>
                </div>

                {/* Bullet Points List */}
                <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 space-y-2">
                  <ul className="space-y-2">
                    {note.bulletPoints.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed font-medium"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Inline Quick Add Point */}
                  <div className="pt-2 mt-2 border-t border-slate-200/70 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="+ Quick add a fact or article point..."
                      value={inlinePointText[note.id] || ""}
                      onChange={(e) =>
                        setInlinePointText({
                          ...inlinePointText,
                          [note.id]: e.target.value,
                        })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddInlinePoint(note.id);
                        }
                      }}
                      className="flex-1 bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-[11px] text-slate-900 outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                    />
                    <button
                      onClick={() => handleAddInlinePoint(note.id)}
                      className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold rounded-lg transition cursor-pointer shrink-0"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Note Footer & Tags */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {note.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono">
                    Updated: {note.updatedAt}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for Add / Edit Note */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 text-slate-900 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <StickyNote className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">
                  {editingNoteId
                    ? "Edit Revision Note"
                    : "Create Quick Revision Note"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNote} className="space-y-3.5">
              {/* Syllabus Link Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Link with Official Syllabus Topic (Optional)
                </label>
                <select
                  value={selectedSyllabusId}
                  onChange={(e) => handleSelectSyllabusTopic(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none font-bold"
                >
                  <option value="">
                    -- Select from Syllabus or enter custom below --
                  </option>
                  {syllabus.map((s) => (
                    <option key={s.id} value={s.id}>
                      [{s.paper}] {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Topic Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fundamental Rights (Art 12-35) & Writs"
                  value={formTopicTitle}
                  onChange={(e) => setFormTopicTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Paper
                  </label>
                  <select
                    value={formPaper}
                    onChange={(e) => setFormPaper(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none font-bold"
                  >
                    <option value="Prelims GS1">Prelims GS1</option>
                    <option value="Prelims CSAT">Prelims CSAT</option>
                    <option value="Mains GS1">Mains GS1</option>
                    <option value="Mains GS2">Mains GS2</option>
                    <option value="Mains GS3">Mains GS3</option>
                    <option value="Mains GS4">Mains GS4</option>
                    <option value="Mains Essay">Mains Essay</option>
                    <option value="Optional">Optional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Indian Polity, Economy, History"
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Yield Priority
                </label>
                <select
                  value={formImportance}
                  onChange={(e) => setFormImportance(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none font-bold"
                >
                  <option value="🔥 High Yield">🔥 High Yield</option>
                  <option value="⭐ Important">⭐ Important</option>
                  <option value="📘 Standard">📘 Standard</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Revision Bullet Points (One per line) *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="e.g.&#10;Habeas Corpus: 'To have the body' - applies against public and private bodies.&#10;Mandamus: 'We Command' - against public officials only.&#10;Article 32 is basic structure."
                  value={formBulletsText}
                  onChange={(e) => setFormBulletsText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500 font-medium leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Writs, Article 32, Case Law, Prelims Fact"
                  value={formTagsText}
                  onChange={(e) => setFormTagsText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition cursor-pointer"
                >
                  {editingNoteId ? "Update Note" : "Save Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
