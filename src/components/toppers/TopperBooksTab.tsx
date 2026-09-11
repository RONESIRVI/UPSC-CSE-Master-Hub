import React, { useState } from "react";
import { BookItem } from "../../types";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Bookmark,
  Search,
  Star,
  Sparkles,
  Layers,
  ChevronDown,
} from "lucide-react";

interface TopperBooksTabProps {
  books: BookItem[];
  onToggleBookStatus: (bookId: string) => void;
}

export const TopperBooksTab: React.FC<TopperBooksTabProps> = ({
  books,
  onToggleBookStatus,
}) => {
  const [selectedPaper, setSelectedPaper] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("All");

  const papers = [
    "All",
    "Prelims GS1",
    "CSAT",
    "Mains GS1",
    "Mains GS2",
    "Mains GS3",
    "Mains GS4",
    "Essay",
    "Optional",
  ];

  const filteredBooks = books.filter((b) => {
    if (selectedPaper !== "All" && b.paper !== selectedPaper) return false;
    if (priorityFilter !== "All" && b.priority !== priorityFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        b.title.toLowerCase().includes(q) ||
        b.subject.toLowerCase().includes(q) ||
        b.authorOrPublication.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const completedCount = books.filter((b) => b.status === "completed").length;
  const readingCount = books.filter((b) => b.status === "reading").length;
  const totalCount = books.length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats Bento Card */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" /> Standard
                Topper Booklist
              </span>
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Strictly Consolidated (Zero Redundancy)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Standard Books & High-Yield Reading Order
            </h2>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed mt-1">
              The non-negotiable standard reading list recommended uniformly by
              all UPSC toppers. Keep your sources strictly limited to these core
              texts and revise each book 5+ times.
            </p>
          </div>

          {/* Reading Progress Tracker Widget Bento Tile */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shrink-0 min-w-[220px] shadow-sm">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
              <span>Booklist Progress</span>
              <span className="text-indigo-600 font-extrabold">
                {progressPct}%
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-500 mt-2 font-medium">
              <span>{completedCount} Completed</span>
              <span>{readingCount} Reading</span>
              <span>{totalCount - completedCount - readingCount} Unread</span>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search book title, subject, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>

          {/* Paper and Priority Selectors */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <select
              value={selectedPaper}
              onChange={(e) => setSelectedPaper(e.target.value)}
              className="bg-white border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2 outline-none font-bold focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-xs"
            >
              {papers.map((p) => (
                <option key={p} value={p}>
                  {p === "All" ? "All Papers" : p}
                </option>
              ))}
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-white border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2 outline-none font-bold focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-xs"
            >
              <option value="All">All Priorities</option>
              <option value="Must Read / Core">Must Read / Core</option>
              <option value="High Yield Reference">High Yield Reference</option>
              <option value="Supplementary / Skim">Supplementary / Skim</option>
            </select>
          </div>
        </div>
      </div>

      {/* Book Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBooks.map((book) => {
          const isCompleted = book.status === "completed";
          const isReading = book.status === "reading";

          return (
            <div
              key={book.id}
              className={`rounded-2xl p-5 border-2 transition-all flex flex-col justify-between ${
                isCompleted
                  ? "bg-white border-emerald-300 shadow-sm"
                  : isReading
                  ? "bg-white border-indigo-400 shadow-sm ring-1 ring-indigo-400/30"
                  : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              <div className="space-y-3">
                {/* Header with paper badge and priority */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold text-[11px] border border-indigo-100">
                      {book.paper}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px]">
                      {book.subject}
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      book.priority === "Must Read / Core"
                        ? "bg-rose-50 text-rose-700 border border-rose-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {book.priority}
                  </span>
                </div>

                {/* Title & Author */}
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {book.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Author/Publisher:{" "}
                    <span className="text-slate-800 font-semibold">
                      {book.authorOrPublication}
                    </span>
                  </p>
                </div>

                {/* Recommended By */}
                <div className="flex items-center gap-1.5 text-xs text-amber-700 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0" />
                  <span>Endorsed by: {book.recommendedBy.join(", ")}</span>
                </div>

                {/* Key Chapters Highlight Bento Tile */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Key High-Yield Chapters</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {book.keyChapters.map((chap, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span>{chap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Topper Reading Tip Bento Box */}
                <div className="text-xs text-slate-700 italic bg-amber-50/60 p-3 rounded-xl border border-amber-200/80">
                  <span className="font-bold text-amber-800 not-italic">
                    Topper Tip:{" "}
                  </span>
                  {book.tipsForReading}
                </div>

                {/* Dynamic Extra Data */}
                {book.extraData && Object.keys(book.extraData).length > 0 && (
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 mt-2">
                    <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Additional Info</span>
                    </div>
                    {Object.entries(book.extraData).map(([key, value]) => (
                      <div key={key} className="text-xs text-slate-600 flex flex-col gap-0.5 border-b border-slate-200 pb-1.5 last:border-0 last:pb-0">
                        <span className="font-bold text-slate-800">{key}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Status Action Bar */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  Status:{" "}
                  <span
                    className={`font-bold ${
                      isCompleted
                        ? "text-emerald-600"
                        : isReading
                        ? "text-indigo-600"
                        : "text-slate-500"
                    }`}
                  >
                    {isCompleted
                      ? "Completed"
                      : isReading
                      ? "Currently Reading"
                      : "Not Started"}
                  </span>
                </span>

                <button
                  onClick={() => onToggleBookStatus(book.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-xs ${
                    isCompleted
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                      : isReading
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    {isCompleted
                      ? "Mark as Not Started"
                      : isReading
                      ? "Mark as Completed"
                      : "Start Reading"}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
