import React, { useState, useEffect } from "react";
import {
  Sparkles,
  X,
  Edit3,
  Compass,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Send,
  Layers,
  RotateCcw,
  Award,
} from "lucide-react";
import { AIEvaluationResult } from "../../types";

interface AIMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "evaluate" | "strategy" | "explain" | "chat";
  initialQuestion?: string;
  initialTopic?: string;
}

export const AIMentorModal: React.FC<AIMentorModalProps> = ({
  isOpen,
  onClose,
  initialMode = "evaluate",
  initialQuestion = "",
  initialTopic = "",
}) => {
  const [activeMode, setActiveMode] = useState<
    "evaluate" | "strategy" | "explain" | "chat"
  >(initialMode);

  // State for Mains Evaluator
  const [mainsQuestion, setMainsQuestion] = useState(initialQuestion);
  const [userAnswer, setUserAnswer] = useState("");
  const [targetMarks, setTargetMarks] = useState<10 | 15>(10);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalResult, setEvalResult] = useState<AIEvaluationResult | null>(null);
  const [evalError, setEvalError] = useState<string | null>(null);

  // State for AI Strategy Advisor
  const [aspirantBackground, setAspirantBackground] = useState("Engineering");
  const [selectedOptional, setSelectedOptional] = useState("PSIR");
  const [attemptNumber, setAttemptNumber] = useState(1);
  const [targetYear, setTargetYear] = useState(2026);
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [isWorkingProfessional, setIsWorkingProfessional] = useState(false);
  const [isGeneratingStrategy, setIsGeneratingStrategy] = useState(false);
  const [strategyResult, setStrategyResult] = useState<string | null>(null);

  // State for AI Topic Explainer
  const [topicName, setTopicName] = useState(initialTopic);
  const [topicPaper, setTopicPaper] = useState("GS2 Polity & Governance");
  const [isExplaining, setIsExplaining] = useState(false);
  const [explainResult, setExplainResult] = useState<string | null>(null);

  // State for AI General Doubt Solver / Chat
  const [chatQuestion, setChatQuestion] = useState("");
  const [isChatting, setIsChatting] = useState(false);
  const [chatResult, setChatResult] = useState<string | null>(null);

  // Settings / API Key State
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("UPSC_GEMINI_API_KEY") || "");
  const [isValidatingKey, setIsValidatingKey] = useState(false);
  const [keyError, setKeyError] = useState<string | null>(null);
  const [keySuccess, setKeySuccess] = useState<string | null>(null);

  const saveApiKey = async () => {
    if (!apiKey.trim()) {
      localStorage.removeItem("UPSC_GEMINI_API_KEY");
      setApiKey("");
      setKeySuccess(null);
      setKeyError(null);
      setShowSettings(false);
      return;
    }

    setIsValidatingKey(true);
    setKeyError(null);
    setKeySuccess(null);

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey.trim()}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: "hi" }] }],
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 400 && data.error?.message?.includes("API key not valid")) {
          throw new Error("Invalid API Key. Please ensure you copied it correctly.");
        }
        throw new Error(data.error?.message || "Invalid API Key");
      }

      // Success
      localStorage.setItem("UPSC_GEMINI_API_KEY", apiKey.trim());
      setKeySuccess("API Key verified and saved successfully! 🎉");
      setTimeout(() => {
        setShowSettings(false);
        setKeySuccess(null);
      }, 2500);
    } catch (err: any) {
      setKeyError(err.message || "Failed to verify API key.");
    } finally {
      setIsValidatingKey(false);
    }
  };

  // Helper to call Gemini REST API directly from browser
  const callGeminiDirectly = async (prompt: string, useSearch = false) => {
    if (!apiKey.trim()) throw new Error("NO_API_KEY");
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey.trim()}`;
    
    const body: any = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    };

    if (useSearch) {
      body.tools = [{ google_search: {} }];
    }

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) {
      if (res.status === 400 && data.error?.message?.includes("API key not valid")) {
        throw new Error("Invalid API Key. Please check your settings.");
      }
      throw new Error(data.error?.message || "Gemini API Error");
    }
    
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
  };

  useEffect(() => {
    if (initialMode) setActiveMode(initialMode);
    if (initialQuestion) setMainsQuestion(initialQuestion);
    if (initialTopic) setTopicName(initialTopic);
  }, [initialMode, initialQuestion, initialTopic]);

  if (!isOpen) return null;

  // Handle Mains Answer Evaluation
  const handleEvaluateAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mainsQuestion.trim() || !userAnswer.trim()) return;

    setIsEvaluating(true);
    setEvalError(null);
    setEvalResult(null);

    try {
      if (apiKey.trim()) {
        const prompt = `You are a senior UPSC CSE Mains copy evaluator and IAS mentor.
Evaluate the following Mains answer strictly according to UPSC standards.
Max Marks: ${targetMarks}
Question: "${mainsQuestion}"
Candidate Answer: "${userAnswer}"

Provide your evaluation in structured JSON format exactly like this:
{
  "estimatedScore": number (e.g. 5.5),
  "maxMarks": ${targetMarks},
  "scoreCategory": "Excellent" | "Good" | "Average" | "Needs Improvement",
  "rubricBreakdown": { "introduction": "...", "coreArguments": "...", "dataAndExamples": "...", "conclusion": "..." },
  "strengths": ["...", "..."],
  "missingElements": ["...", "..."],
  "topperUpgradeSuggestions": ["...", "..."],
  "modelAnswerOutline": "..."
}`;
        const rawRes = await callGeminiDirectly(prompt);
        const cleanRes = rawRes.replace(/```json/g, "").replace(/```/g, "").trim();
        setEvalResult(JSON.parse(cleanRes));
      } else {
        const res = await fetch("/api/ai/evaluate-answer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: mainsQuestion, answer: userAnswer, maxMarks: targetMarks }),
        });
        
        // Check if Vite served HTML instead of API JSON (404 fallback)
        const textData = await res.text();
        if (textData.trim().startsWith("<")) throw new Error("API route not found. Please set Gemini API Key in settings ⚙️.");
        
        const data = JSON.parse(textData);
        if (!res.ok) throw new Error(data.error || "Evaluation failed");
        setEvalResult(data);
      }
    } catch (err: any) {
      if (err.message === "NO_API_KEY") {
        setEvalError("Please set your Gemini API Key in settings ⚙️ to use AI Mentor on mobile/standalone.");
      } else {
        setEvalError(err.message || "Failed to evaluate answer. Please try again.");
      }
    } finally {
      setIsEvaluating(false);
    }
  };

  // Handle AI Strategy Advisor
  const handleGenerateStrategy = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingStrategy(true);
    setStrategyResult(null);

    try {
      if (apiKey.trim()) {
        const prompt = `You are a renowned UPSC CSE Strategy Coach and former IAS officer.
Create a personalized UPSC CSE Strategy for this aspirant:
Background: ${aspirantBackground}, Optional: ${selectedOptional}, Attempt: ${attemptNumber}, Year: ${targetYear}, Daily Hours: ${hoursPerDay}, Working Prof: ${isWorkingProfessional}

Provide a tactical 4-Phase Roadmap, Daily Routine, and Booklist. Keep it highly practical.`;
        const resText = await callGeminiDirectly(prompt);
        setStrategyResult(resText);
      } else {
        const res = await fetch("/api/ai/strategy-advisor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ background: aspirantBackground, optional: selectedOptional, attempt: attemptNumber, targetYear, hoursPerDay, isWorkingProfessional }),
        });
        
        const textData = await res.text();
        if (textData.trim().startsWith("<")) throw new Error("API route not found. Please set Gemini API Key in settings ⚙️.");
        
        const data = JSON.parse(textData);
        if (!res.ok) throw new Error(data.error || "Strategy generation failed");
        setStrategyResult(data.strategy);
      }
    } catch (err: any) {
      if (err.message === "NO_API_KEY") {
        setStrategyResult("Please set your Gemini API Key in settings ⚙️ to use AI Mentor.");
      } else {
        setStrategyResult("Strategy generation encountered an error: " + err.message);
      }
    } finally {
      setIsGeneratingStrategy(false);
    }
  };

  // Handle AI Topic Explainer
  const handleExplainTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicName.trim()) return;

    setIsExplaining(true);
    setExplainResult(null);

    try {
      if (apiKey.trim()) {
        const prompt = `Explain the topic "${topicName}" for UPSC CSE (${topicPaper}). Provide a high-yield, exam-oriented crisp note (200 words) formatted in markdown:
1. Core Conceptual Breakdown
2. Constitutional Articles / Landmark SC Judgements
3. Prelims Traps
4. Mains PESTLE dimensions
5. Way Forward`;
        const resText = await callGeminiDirectly(prompt);
        setExplainResult(resText);
      } else {
        const res = await fetch("/api/ai/explain-topic", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic: topicName, paper: topicPaper }),
        });

        const textData = await res.text();
        if (textData.trim().startsWith("<")) throw new Error("API route not found. Please set Gemini API Key in settings ⚙️.");
        
        const data = JSON.parse(textData);
        if (!res.ok) throw new Error(data.error || "Explanation failed");
        setExplainResult(data.explanation);
      }
    } catch (err: any) {
      if (err.message === "NO_API_KEY") {
        setExplainResult("Please set your Gemini API Key in settings ⚙️ to use AI Mentor.");
      } else {
        setExplainResult("Topic explainer encountered an error: " + err.message);
      }
    } finally {
      setIsExplaining(false);
    }
  };

  // Handle General Doubt Solver / Chat
  const handleAskChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuestion.trim()) return;

    setIsChatting(true);
    setChatResult(null);

    try {
      if (apiKey.trim()) {
        const prompt = `You are an expert UPSC CSE Mentor and General Doubt Solver. A student has asked: "${chatQuestion}". Provide a highly accurate, up-to-date answer from a UPSC perspective (factual or PESTLE structure).`;
        // Pass true to enable Google Search Grounding for real-time answers
        const resText = await callGeminiDirectly(prompt, true);
        setChatResult(resText);
      } else {
        const res = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: chatQuestion }),
        });

        const textData = await res.text();
        if (textData.trim().startsWith("<")) throw new Error("API route not found. Please set Gemini API Key in settings ⚙️.");
        
        const data = JSON.parse(textData);
        if (!res.ok) throw new Error(data.error || "Chat failed");
        setChatResult(data.answer);
      }
    } catch (err: any) {
      if (err.message === "NO_API_KEY") {
        setChatResult("Please set your Gemini API Key in settings ⚙️ to use AI Mentor.");
      } else {
        setChatResult("Doubt solver encountered an error: " + err.message);
      }
    } finally {
      setIsChatting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="w-full max-w-4xl bg-white border-2 border-slate-200 rounded-3xl shadow-2xl overflow-hidden text-slate-900 my-8">
        {/* Header Bar */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-sm sm:text-lg font-bold text-slate-900 leading-tight flex items-center gap-2">
                AI UPSC Mentor & Evaluator
                {!apiKey.trim() && (
                  <span className="bg-rose-100 text-rose-700 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase">
                    Setup Required
                  </span>
                )}
              </h2>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
                Topper Answer Rubrics & Evaluation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-1.5 rounded-lg transition cursor-pointer shrink-0 ${
                showSettings ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900"
              }`}
              title="API Key Settings"
            >
              <div className="w-5 h-5 flex items-center justify-center">⚙️</div>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* API Settings Panel */}
        {showSettings && (
          <div className="p-4 bg-indigo-50 border-b border-indigo-100 animate-fade-in">
            <label className="text-xs font-bold text-indigo-900 block mb-1">
              Gemini API Key (Required for Mobile App / Local Mode)
            </label>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1 bg-white border border-indigo-200 text-slate-900 text-xs rounded-xl p-2.5 outline-none focus:border-indigo-600"
              />
              <button
                onClick={saveApiKey}
                disabled={isValidatingKey}
                className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-700 disabled:opacity-50 transition cursor-pointer shrink-0 flex items-center justify-center min-w-[60px]"
              >
                {isValidatingKey ? <RotateCcw className="w-4 h-4 animate-spin" /> : "Save"}
              </button>
            </div>
            {keyError && (
              <div className="mt-3 p-3 bg-rose-100 border border-rose-300 rounded-xl flex items-start gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <p className="text-xs text-rose-800 font-bold">{keyError}</p>
              </div>
            )}
            {keySuccess && (
              <div className="mt-3 p-3 bg-emerald-100 border border-emerald-300 rounded-xl flex items-start gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-800 font-bold">{keySuccess}</p>
              </div>
            )}
            {!keyError && !keySuccess && (
              <p className="text-[10px] text-indigo-600 mt-2">
                Get a free API key from Google AI Studio. Your key is stored securely in your browser's local storage and is never sent to our servers.
              </p>
            )}
          </div>
        )}

        {/* 3 AI Modes Selector */}
        <div className="flex border-b border-slate-100 bg-slate-50/50 p-1.5 sm:p-2 gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveMode("evaluate")}
            className={`flex-1 min-w-[110px] py-2 sm:py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeMode === "evaluate"
                ? "bg-indigo-600 text-white shadow-xs font-extrabold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5 shrink-0" />
            <span>Mains Evaluator</span>
          </button>

          <button
            onClick={() => setActiveMode("strategy")}
            className={`flex-1 min-w-[110px] py-2 sm:py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeMode === "strategy"
                ? "bg-indigo-600 text-white shadow-xs font-extrabold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Compass className="w-3.5 h-3.5 shrink-0" />
            <span>Strategy Advisor</span>
          </button>

          <button
            onClick={() => setActiveMode("explain")}
            className={`flex-1 min-w-[110px] py-2 sm:py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeMode === "explain"
                ? "bg-indigo-600 text-white shadow-xs font-extrabold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span>Topic Explainer</span>
          </button>

          <button
            onClick={() => setActiveMode("chat")}
            className={`flex-1 min-w-[110px] py-2 sm:py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeMode === "chat"
                ? "bg-indigo-600 text-white shadow-xs font-extrabold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Layers className="w-3.5 h-3.5 shrink-0" />
            <span>Doubt Solver</span>
          </button>
        </div>

        {/* Modal Body Container */}
        <div className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto space-y-5 sm:space-y-6">
          {/* MODE 1: MAINS ANSWER EVALUATOR */}
          {activeMode === "evaluate" && (
            <div className="space-y-5">
              <form onSubmit={handleEvaluateAnswer} className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      UPSC Mains Question
                    </label>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-slate-500 font-semibold mr-1">
                        Marks:
                      </span>
                      {[10, 15].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setTargetMarks(m as any)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer transition ${
                            targetMarks === m
                              ? "bg-indigo-600 text-white"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {m} Marks ({m === 10 ? "150 words" : "250 words"})
                        </button>
                      ))}
                    </div>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Enter question (e.g. 'Critically examine the role of the Governor under Article 163...')"
                    value={mainsQuestion}
                    onChange={(e) => setMainsQuestion(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm rounded-xl p-3 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Your Written Answer
                    </label>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Word Count:{" "}
                      {userAnswer.trim()
                        ? userAnswer.trim().split(/\s+/).length
                        : 0}{" "}
                      words
                    </span>
                  </div>
                  <textarea
                    rows={7}
                    required
                    placeholder="Paste or type your answer with Introduction, Sub-headings, Bullet points, Examples/Committees, and Way Forward..."
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm rounded-xl p-3 outline-none font-mono focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 leading-relaxed"
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-2">
                  <span className="text-[11px] text-slate-500 italic">
                    Evaluates structure, intro, SC rulings, keywords, and tone.
                  </span>
                  <button
                    type="submit"
                    disabled={isEvaluating || !userAnswer.trim()}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm disabled:opacity-50 transition cursor-pointer"
                  >
                    {isEvaluating ? (
                      <>
                        <RotateCcw className="w-4 h-4 animate-spin" />
                        <span>Evaluating Answer Rubrics...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Evaluate My Answer</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Evaluation Error */}
              {evalError && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{evalError}</span>
                </div>
              )}

              {/* Evaluation Structured Result */}
              {evalResult && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-5 animate-fade-in shadow-xs">
                  {/* Score & Verdict Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500">
                        Score & Assessment
                      </span>
                      <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 mt-0.5">
                        {evalResult.estimatedScore}{" "}
                        <span className="text-base text-slate-500 font-normal">
                          / {evalResult.maxMarks} Marks
                        </span>
                      </div>
                    </div>

                    <div className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-left sm:text-right shadow-xs">
                      <span className="text-[10px] uppercase font-bold text-slate-500">
                        Readiness Category
                      </span>
                      <div className="text-sm font-extrabold text-emerald-700">
                        Topper League Standard
                      </div>
                    </div>
                  </div>

                  {/* Rubric Breakdown Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {Object.entries(evalResult.rubricBreakdown).map(
                      ([key, val]) => (
                        <div
                          key={key}
                          className="p-3 bg-white rounded-xl border border-slate-200 text-center shadow-xs"
                        >
                          <div className="text-[10px] font-bold text-slate-500 capitalize">
                            {key.replace(/([A-Z])/g, " $1")}
                          </div>
                          <div className="text-base font-extrabold text-indigo-600 mt-0.5">
                            {val}
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {/* Strengths & Missing Elements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 space-y-2">
                      <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Key Strengths Observed</span>
                      </div>
                      <ul className="text-xs text-slate-700 space-y-1.5 font-medium">
                        {evalResult.strengths.map((st, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">
                              •
                            </span>
                            <span>{st}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-rose-50/60 border border-rose-200 rounded-xl p-4 space-y-2">
                      <div className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                        <span>Missing Dimensions & Deficits</span>
                      </div>
                      <ul className="text-xs text-slate-700 space-y-1.5 font-medium">
                        {evalResult.missingElements.map((mi, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-rose-600 font-bold">•</span>
                            <span>{mi}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Topper Level Upgrades */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-xs">
                    <div className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-600" />
                      <span>
                        Topper-Level Upgrades (SC Judgments, Data, Case Laws)
                      </span>
                    </div>
                    <ul className="text-xs text-slate-700 space-y-1.5 font-medium">
                      {evalResult.topperUpgradeSuggestions.map((up, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{up}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Model Structure */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-1 shadow-xs">
                    <strong className="text-indigo-600 block font-bold">
                      Recommended Model Structure:{" "}
                    </strong>
                    <p className="font-medium">
                      {evalResult.modelAnswerOutline}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MODE 2: STRATEGY ADVISOR */}
          {activeMode === "strategy" && (
            <div className="space-y-5">
              <form onSubmit={handleGenerateStrategy} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Academic Background
                    </label>
                    <select
                      value={aspirantBackground}
                      onChange={(e) => setAspirantBackground(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl px-3 py-2 outline-none focus:border-indigo-600"
                    >
                      <option value="Engineering / Tech">
                        Engineering / Tech
                      </option>
                      <option value="Humanities / Arts">
                        Humanities / Arts
                      </option>
                      <option value="Commerce / CA / Finance">
                        Commerce / CA / Finance
                      </option>
                      <option value="Medical / Life Sciences">
                        Medical / Life Sciences
                      </option>
                      <option value="Law (LL.B)">Law (LL.B)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Optional Subject
                    </label>
                    <select
                      value={selectedOptional}
                      onChange={(e) => setSelectedOptional(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl px-3 py-2 outline-none focus:border-indigo-600"
                    >
                      <option value="PSIR">PSIR (Pol Science)</option>
                      <option value="Sociology">Sociology</option>
                      <option value="Geography">Geography</option>
                      <option value="History">History</option>
                      <option value="Anthropology">Anthropology</option>
                      <option value="Public Administration">
                        Public Administration
                      </option>
                      <option value="Electrical Engineering">
                        Electrical Engineering
                      </option>
                      <option value="Mathematics">Mathematics</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Target Examination Year
                    </label>
                    <select
                      value={targetYear}
                      onChange={(e) => setTargetYear(parseInt(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl px-3 py-2 outline-none focus:border-indigo-600"
                    >
                      <option value={2026}>CSE 2026</option>
                      <option value={2027}>CSE 2027</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <input
                      type="checkbox"
                      id="working-prof"
                      checked={isWorkingProfessional}
                      onChange={(e) =>
                        setIsWorkingProfessional(e.target.checked)
                      }
                      className="rounded accent-indigo-600 cursor-pointer"
                    />
                    <label htmlFor="working-prof" className="cursor-pointer">
                      I am a Working Professional (4-5 hrs/day constraint)
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isGeneratingStrategy}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 disabled:opacity-50 transition cursor-pointer shadow-sm"
                  >
                    {isGeneratingStrategy ? (
                      <RotateCcw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    <span>Generate Tailored Blueprint</span>
                  </button>
                </div>
              </form>

              {strategyResult && (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed animate-fade-in shadow-xs font-sans">
                  {strategyResult}
                </div>
              )}
            </div>
          )}

          {/* MODE 3: TOPIC EXPLAINER */}
          {activeMode === "explain" && (
            <div className="space-y-5">
              <form onSubmit={handleExplainTopic} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Concept / Topic Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Basic Structure Doctrine, Uniform Civil Code, PM Gati Shakti"
                      value={topicName}
                      onChange={(e) => setTopicName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm rounded-xl p-3 outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      GS Paper Context
                    </label>
                    <select
                      value={topicPaper}
                      onChange={(e) => setTopicPaper(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm rounded-xl p-3 outline-none focus:border-indigo-600"
                    >
                      <option value="GS1 Heritage, History, Geography, Society">
                        GS1 (Hist, Geo, Society)
                      </option>
                      <option value="GS2 Polity, Governance, Constitution, IR">
                        GS2 (Polity, Gov, IR)
                      </option>
                      <option value="GS3 Economy, Environment, Sci-Tech, Security">
                        GS3 (Economy, Env, Sec)
                      </option>
                      <option value="GS4 Ethics, Integrity and Aptitude">
                        GS4 (Ethics, Case Studies)
                      </option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isExplaining || !topicName.trim()}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 disabled:opacity-50 transition cursor-pointer shadow-sm"
                  >
                    {isExplaining ? (
                      <RotateCcw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    <span>Generate 150-Word UPSC Note & Mindmap</span>
                  </button>
                </div>
              </form>

              {explainResult && (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed animate-fade-in shadow-xs font-sans">
                  {explainResult}
                </div>
              )}
            </div>
          )}

          {/* MODE 4: DOUBT SOLVER / GENERAL CHAT */}
          {activeMode === "chat" && (
            <div className="space-y-5">
              <form onSubmit={handleAskChat} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Ask any UPSC related doubt or question
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="e.g. How to manage time between Optional and GS? or What is the difference between Judicial Review and Judicial Activism?"
                    value={chatQuestion}
                    onChange={(e) => setChatQuestion(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm rounded-xl p-3 outline-none focus:border-indigo-600"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isChatting || !chatQuestion.trim()}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 disabled:opacity-50 transition cursor-pointer shadow-sm"
                  >
                    {isChatting ? (
                      <RotateCcw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    <span>Ask AI Mentor</span>
                  </button>
                </div>
              </form>

              {chatResult && (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed animate-fade-in shadow-xs font-sans">
                  {chatResult}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
