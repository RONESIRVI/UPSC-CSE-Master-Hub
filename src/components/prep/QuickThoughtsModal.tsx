import React, { useState, useEffect } from "react";
import { QuickRevisionNote, SyllabusTopic } from "../../types";
import {
  Lightbulb,
  X,
  Check,
  Sparkles,
  Tag,
  BookOpen,
  FileText,
  HelpCircle,
  Pin,
  CheckCircle2,
  List,
  Code,
  Flame,
  PenLine,
  RotateCcw,
  Bot,
} from "lucide-react";

interface QuickThoughtsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveNote?: (note: QuickRevisionNote) => void;
  onOpenAIMentorWithPrompt?: (prompt: string) => void;
  onAddToSpacedRevision?: (item: {
    title: string;
    paper: string;
    subject: string;
    keyPoints: string[];
  }) => void;
  syllabus?: SyllabusTopic[];
}

export const QuickThoughtsModal: React.FC<QuickThoughtsModalProps> = ({
  isOpen,
  onClose,
  onSaveNote,
  onOpenAIMentorWithPrompt,
  onAddToSpacedRevision,
  syllabus = [],
}) => {
  const [noteType, setNoteType] = useState<
    "fleeting_thought" | "doubt_question" | "key_concept" | "case_law"
  >("fleeting_thought");
  const [topicTitle, setTopicTitle] = useState("");
  const [subject, setSubject] = useState("Indian Polity");
  const [paper, setPaper] = useState("Prelims GS1");
  const [importance, setImportance] =
    useState<QuickRevisionNote["importance"]>("🔥 High Yield");
  const [markdownContent, setMarkdownContent] = useState("");
  const [tagsInput, setTagsInput] = useState("Thought, Fleeting Note");
  const [addToSpacedQueue, setAddToSpacedQueue] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedSyllabusId, setSelectedSyllabusId] = useState("");
  const [previewTab, setPreviewTab] = useState<"write" | "preview">("write");

  // Load draft from localStorage if available
  useEffect(() => {
    if (isOpen) {
      const draft = localStorage.getItem("upsc_fleeting_thought_draft");
      if (draft) {
        try {
          const parsed = JSON.parse(draft);
          if (parsed.topicTitle && !topicTitle)
            setTopicTitle(parsed.topicTitle);
          if (parsed.markdownContent && !markdownContent)
            setMarkdownContent(parsed.markdownContent);
          if (parsed.subject) setSubject(parsed.subject);
          if (parsed.paper) setPaper(parsed.paper);
          if (parsed.tagsInput) setTagsInput(parsed.tagsInput);
          if (parsed.noteType) setNoteType(parsed.noteType);
        } catch (e) {
          // ignore
        }
      }
    }
  }, [isOpen]);

  // Persist draft while typing
  useEffect(() => {
    if (isOpen && (topicTitle || markdownContent)) {
      localStorage.setItem(
        "upsc_fleeting_thought_draft",
        JSON.stringify({
          topicTitle,
          markdownContent,
          subject,
          paper,
          tagsInput,
          noteType,
        })
      );
    }
  }, [
    topicTitle,
    markdownContent,
    subject,
    paper,
    tagsInput,
    noteType,
    isOpen,
  ]);

  if (!isOpen) return null;

  const quickSubjects = [
    "Indian Polity",
    "Modern Indian History",
    "Indian Economy",
    "Environment & Ecology",
    "Physical & Indian Geography",
    "CSAT Paper II",
    "Ethics (GS4)",
    "Optional Subject",
    "Current Affairs",
    "Mains Answer Writing",
    "Science & Technology",
    "Art & Culture",
  ];

  const quickTemplates = [
    {
      title: "❓ Fleeting Doubt",
      type: "doubt_question" as const,
      tag: "Doubt, Revise Later",
      importance: "🔥 High Yield" as const,
      placeholderTitle:
        "Governor vs President Ordinance Promulgation (Art 213 vs 123)",
      sampleMarkdown:
        "- [ ] **Doubt Trigger**: Can the Governor promulgate an ordinance on matters requiring President's prior sanction under Art 213?\n- **Key Point**: Proviso to Article 213(1) mandates President's instructions in 3 specific cases.\n- **Action Needed**: Verify landmark case (DC Wadhwa vs State of Bihar on re-promulgation fraud).",
    },
    {
      title: "💡 Concept Insight",
      type: "fleeting_thought" as const,
      tag: "Insight, Conceptual Clarity",
      importance: "🔥 High Yield" as const,
      placeholderTitle:
        "Connecting ENSO, Indian Ocean Dipole (IOD) & Madden-Julian Oscillation",
      sampleMarkdown:
        "### Key Linkages:\n- **El Niño** suppresses Indian summer monsoon trough (drought tendency).\n- **Positive IOD** counteracts El Niño by warming the Western Indian Ocean.\n- **MJO Wave (Phase 2-3)** brings active rain bursts across Central India.",
    },
    {
      title: "🎯 Mains Value Addition",
      type: "key_concept" as const,
      tag: "Mains Value Add, Quotes & Data",
      importance: "🔥 High Yield" as const,
      placeholderTitle:
        "Data & Committee Quote for GS2 Urban Local Bodies (ULBs)",
      sampleMarkdown:
        "- **15th Finance Commission**: Recommended untied grants of ₹2.36 lakh crore to local bodies tied to audited accounts and property tax reforms.\n- **Quote (2nd ARC 6th Report)**: *'Local governance is not an agent of state government, but the third tier of Indian democracy.'*\n- **Key Stat**: Property tax collection in India is only 0.2% of GDP vs 0.6% in developing economies.",
    },
    {
      title: "⚖️ Landmark Case / Article",
      type: "case_law" as const,
      tag: "Polity, Landmark Judgment",
      importance: "🔥 High Yield" as const,
      placeholderTitle:
        "Kesavananda Bharati (1973) vs Minerva Mills (1980) Basic Structure",
      sampleMarkdown:
        "- **Kesavananda Bharati (1973)**: 13-judge bench established Basic Structure Doctrine; parliament cannot alter fundamental constitutional identity.\n- **Minerva Mills (1980)**: Struck down 42nd Amendment Art 368(4)-(5); held Judicial Review & balance between FRs and DPSPs are basic structure pillars.",
    },
  ];

  const handleApplyTemplate = (tmpl: (typeof quickTemplates)[0]) => {
    setNoteType(tmpl.type);
    setTopicTitle(tmpl.placeholderTitle);
    setMarkdownContent(tmpl.sampleMarkdown);
    setTagsInput(tmpl.tag);
    setImportance(tmpl.importance);
    if (tmpl.type === "doubt_question") {
      setAddToSpacedQueue(true);
    }
  };

  const handleSyllabusSelect = (syllabusId: string) => {
    setSelectedSyllabusId(syllabusId);
    const found = syllabus.find((s) => s.id === syllabusId);
    if (found) {
      setTopicTitle(found.title);
      setSubject(found.subject);
      setPaper(found.paper);
      setTagsInput(`${found.subject.split(" ")[0]}, ${found.paper}`);
    }
  };

  const handleAskAIMentor = () => {
    if (!topicTitle.trim() && !markdownContent.trim()) return;
    const promptText = `Explain and resolve this UPSC doubt/concept clearly:\nTopic: ${topicTitle}\nSubject: ${subject} (${paper})\nDetails:\n${markdownContent}`;
    if (onOpenAIMentorWithPrompt) {
      onOpenAIMentorWithPrompt(promptText);
      onClose();
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicTitle.trim() && !markdownContent.trim()) return;

    const finalTitle =
      topicTitle.trim() ||
      markdownContent.split("\n")[0]?.replace(/^[#\-* ]+/, "") ||
      "Untitled Fleeting Note";

    // Parse markdown into bullet points array
    const rawLines = markdownContent
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    const bullets = rawLines.length > 0 ? rawLines : [markdownContent.trim()];

    const parsedTags = tagsInput
      .split(/[,#]/)
      .map((t) => t.trim())
      .filter(Boolean);

    if (
      noteType === "doubt_question" &&
      !parsedTags.some((t) => t.toLowerCase() === "doubt")
    ) {
      parsedTags.unshift("Doubt");
    }

    const newNote: QuickRevisionNote = {
      id: `note-${Date.now()}`,
      topicId: selectedSyllabusId || undefined,
      topicTitle: finalTitle,
      paper: paper || "Prelims GS1",
      subject: subject || "Indian Polity",
      bulletPoints: bullets,
      tags:
        parsedTags.length > 0 ? parsedTags : ["Fleeting Thought", "Quick Note"],
      importance,
      updatedAt: new Date().toISOString().split("T")[0],
    };

    // Save directly to localStorage for notes tab state persistence
    try {
      const existing = localStorage.getItem("upsc_quick_notes");
      const currentNotes: QuickRevisionNote[] = existing
        ? JSON.parse(existing)
        : [];
      const updatedNotes = [
        newNote,
        ...currentNotes.filter((n) => n.id !== newNote.id),
      ];
      localStorage.setItem("upsc_quick_notes", JSON.stringify(updatedNotes));

      // Dispatch custom events so active tabs sync immediately without overwrite
      window.dispatchEvent(
        new CustomEvent("upsc_notes_updated", { detail: updatedNotes })
      );
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("Failed to save note to localStorage", err);
    }

    if (onSaveNote) {
      onSaveNote(newNote);
    }

    // Optionally add to spaced revision queue
    if (addToSpacedQueue) {
      try {
        const queueSaved = localStorage.getItem("upsc_revision_queue");
        const queue = queueSaved ? JSON.parse(queueSaved) : [];
        const newItem = {
          id: `rev-${Date.now()}`,
          topicTitle: finalTitle,
          paper,
          subject,
          stage: 1,
          nextReviewDate: new Date(Date.now() + 86400000)
            .toISOString()
            .split("T")[0],
          confidenceLevel: "medium" as const,
          intervalDays: 1,
          lastReviewed: new Date().toISOString().split("T")[0],
          keyPoints: bullets.slice(0, 5),
        };
        const updatedQueue = [newItem, ...queue];
        localStorage.setItem(
          "upsc_revision_queue",
          JSON.stringify(updatedQueue)
        );
        if (onAddToSpacedRevision) {
          onAddToSpacedRevision({
            title: finalTitle,
            paper,
            subject,
            keyPoints: bullets.slice(0, 5),
          });
        }
      } catch (e) {
        console.error("Failed to add to spaced repetition queue", e);
      }
    }

    // Clear draft
    localStorage.removeItem("upsc_fleeting_thought_draft");
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      // Reset form
      setTopicTitle("");
      setMarkdownContent("");
      setTagsInput("Thought, Fleeting Note");
      setAddToSpacedQueue(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 relative max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 shadow-2xs">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Instant Capture Scratchpad
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Saves to Revision Notes
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                Fleeting Thoughts & Doubts Scratchpad
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            title="Close scratchpad"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Template Starters */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Instant 1-Click Starters:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {quickTemplates.map((tmpl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyTemplate(tmpl)}
                className={`text-left p-2.5 rounded-xl border transition cursor-pointer group ${
                  noteType === tmpl.type
                    ? "bg-amber-50/80 border-amber-300 text-amber-900 shadow-2xs"
                    : "bg-slate-50 border-slate-200 hover:border-amber-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="text-xs font-bold truncate">{tmpl.title}</div>
                <div className="text-[10px] text-slate-400 group-hover:text-amber-700 truncate mt-0.5">
                  {tmpl.tag.split(",")[0]}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Success Feedback Overlay */}
        {showSuccess ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-3 text-center animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border-2 border-emerald-300 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-slate-900">
              Note Item Saved Successfully!
            </h4>
            <p className="text-xs text-slate-500 font-medium max-w-sm">
              Synced to your Quick Revision Notes binder{" "}
              {addToSpacedQueue ? "and added to Spaced Repetition Queue" : ""}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            {/* Note Title & Link to Syllabus */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Thought / Question / Concept Heading{" "}
                  <span className="text-rose-500">*</span>
                </label>
                {syllabus.length > 0 && (
                  <select
                    value={selectedSyllabusId}
                    onChange={(e) => handleSyllabusSelect(e.target.value)}
                    className="text-[10px] bg-slate-100 border border-slate-200 text-slate-700 rounded-lg px-2 py-0.5 font-bold outline-none cursor-pointer max-w-[200px] truncate"
                  >
                    <option value="">Link Syllabus Topic (Optional)</option>
                    {syllabus.slice(0, 30).map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <input
                type="text"
                required
                placeholder="e.g. Confusion on Article 356 vs 365 or Cash Reserve Ratio mechanism..."
                value={topicTitle}
                onChange={(e) => setTopicTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-slate-400 placeholder:font-normal"
              />
            </div>

            {/* Subject & Paper Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Subject Category
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl px-3 py-2 outline-none font-bold cursor-pointer focus:ring-2 focus:ring-amber-500"
                >
                  {quickSubjects.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Target Paper & Importance
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={paper}
                    onChange={(e) => setPaper(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl px-2.5 py-2 outline-none font-bold cursor-pointer"
                  >
                    <option value="Prelims GS1">Prelims GS1</option>
                    <option value="Prelims CSAT">Prelims CSAT</option>
                    <option value="Mains GS1">Mains GS1</option>
                    <option value="Mains GS2">Mains GS2</option>
                    <option value="Mains GS3">Mains GS3</option>
                    <option value="Mains GS4">Mains GS4</option>
                    <option value="Mains Essay">Mains Essay</option>
                    <option value="Optional Subject">Optional Subject</option>
                  </select>

                  <select
                    value={importance}
                    onChange={(e) => setImportance(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl px-2.5 py-2 outline-none font-bold cursor-pointer"
                  >
                    <option value="🔥 High Yield">🔥 High Yield</option>
                    <option value="⭐ Important">⭐ Important</option>
                    <option value="📘 Standard">📘 Standard</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Markdown Content / Scratchpad Editor */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <PenLine className="w-3.5 h-3.5 text-amber-600" />
                  <span>Markdown Thoughts / Key Points</span>
                </label>

                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => setPreviewTab("write")}
                    className={`px-2.5 py-0.5 rounded-md transition cursor-pointer ${
                      previewTab === "write"
                        ? "bg-white text-slate-900 shadow-2xs"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    Write (MD)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTab("preview")}
                    className={`px-2.5 py-0.5 rounded-md transition cursor-pointer ${
                      previewTab === "preview"
                        ? "bg-white text-slate-900 shadow-2xs"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    Preview
                  </button>
                </div>
              </div>

              {previewTab === "write" ? (
                <textarea
                  rows={5}
                  required
                  placeholder="Jot down quick thoughts, formulas, test doubts, or committee recommendations using Markdown syntax (- bullets, **bold**, `code`, etc)..."
                  value={markdownContent}
                  onChange={(e) => setMarkdownContent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-slate-400 placeholder:font-sans leading-relaxed resize-y"
                />
              ) : (
                <div className="w-full min-h-[120px] max-h-[220px] overflow-y-auto bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 space-y-1.5 font-sans leading-relaxed">
                  {markdownContent.split("\n").map((line, i) => {
                    if (line.startsWith("### ")) {
                      return (
                        <h4
                          key={i}
                          className="font-bold text-slate-900 text-sm mt-1"
                        >
                          {line.replace("### ", "")}
                        </h4>
                      );
                    }
                    if (line.startsWith("## ")) {
                      return (
                        <h3
                          key={i}
                          className="font-extrabold text-slate-900 text-sm mt-1"
                        >
                          {line.replace("## ", "")}
                        </h3>
                      );
                    }
                    if (
                      line.startsWith("- [ ] ") ||
                      line.startsWith("* [ ] ")
                    ) {
                      return (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-slate-700"
                        >
                          <input type="checkbox" disabled className="mt-0.5" />
                          <span>{line.replace(/^[-*] \[ \] /, "")}</span>
                        </div>
                      );
                    }
                    if (line.startsWith("- ") || line.startsWith("* ")) {
                      return (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-slate-700"
                        >
                          <span className="text-amber-500 font-bold">•</span>
                          <span>{line.replace(/^[-*] /, "")}</span>
                        </div>
                      );
                    }
                    return (
                      <p key={i} className="text-slate-600">
                        {line}
                      </p>
                    );
                  })}
                  {!markdownContent.trim() && (
                    <span className="text-slate-400 italic text-[11px]">
                      No notes entered yet to preview.
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Tags & Spaced Repetition Queue Checkbox */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
                <Tag className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Tags (comma-separated): e.g. Doubt, Case Law, Article 21, Prelims 2026"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>

              <label className="flex items-center gap-2 px-3 py-2 rounded-xl bg-teal-50/70 border border-teal-200/70 text-teal-900 text-xs font-bold cursor-pointer hover:bg-teal-100/60 transition">
                <input
                  type="checkbox"
                  checked={addToSpacedQueue}
                  onChange={(e) => setAddToSpacedQueue(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
                />
                <RotateCcw className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>
                  Also add to Spaced Repetition Queue (Active recall on
                  1-3-7-15-30 days)
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
              {/* Ask AI Mentor Button */}
              {onOpenAIMentorWithPrompt && (
                <button
                  type="button"
                  onClick={handleAskAIMentor}
                  disabled={!topicTitle.trim() && !markdownContent.trim()}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition cursor-pointer disabled:opacity-40"
                  title="Ask AI Mentor to clarify this doubt or concept immediately"
                >
                  <Bot className="w-4 h-4 text-purple-600" />
                  <span>Ask AI to Solve / Clarify</span>
                </button>
              )}

              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition border border-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!topicTitle.trim() && !markdownContent.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-xs font-bold shadow-sm transition cursor-pointer"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Save Note Item</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
