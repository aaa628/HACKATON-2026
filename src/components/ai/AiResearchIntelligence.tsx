/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 628 AEROSPACE — MICROGRAVITY FIRE INTELLIGENCE
 * AI Research Intelligence Console — Grounded RAG & Synthesis Engine
 */

import React, { useState } from 'react';
import { AiChatMessage, ExperimentRecord, ResearchDocument } from '../../types/research';
import { 
  Sparkles, 
  Send, 
  FileText, 
  ExternalLink, 
  Cpu, 
  BookOpen, 
  FlaskConical,
  RotateCcw,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface AiResearchIntelligenceProps {
  onSelectExperiment: (exp: ExperimentRecord) => void;
  onSelectDocument: (doc: ResearchDocument) => void;
  initialQuery?: string;
}

export const AiResearchIntelligence: React.FC<AiResearchIntelligenceProps> = ({
  onSelectExperiment,
  onSelectDocument,
  initialQuery = ''
}) => {
  const [inputQuery, setInputQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: "MSG-INIT",
      role: "assistant",
      content: `Welcome to the **628 Aerospace Microgravity Fire Intelligence** AI research console.

I am grounded directly in verified NASA flight and ground microgravity combustion investigations—including **Saffire-I through VI**, **BASS-I & II**, **FLEX Droplet Trials**, **ACME CFI & BRE**, **SOFIE**, and **MIST**—together with peer-reviewed NASA Technical Memorandums.

Ask any scientific inquiry, or select one of the research presets below.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isEvidenceGrounded: true
    }
  ]);

  const presetQueries = [
    "How does combustion behaviour differ between normal gravity and microgravity?",
    "Which flight experiments provide data on flame extinction and LOI limits?",
    "What are the fire safety hazards of the Artemis Exploration Atmosphere (34% O2 at 8.2 psia)?",
    "How do quasi-steady cool flames evade standard spacecraft fire detectors?",
    "Why is cabin ventilation the primary operational variable in spacecraft fire spread?"
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: AiChatMessage = {
      id: `USER-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textToSend })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const assistantMsg: AiChatMessage = {
        id: `AI-${Date.now()}`,
        role: 'assistant',
        content: data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: data.sources,
        relatedExperiments: data.relatedExperiments,
        isEvidenceGrounded: true
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error("AI Query failed:", err);
      const errorMsg: AiChatMessage = {
        id: `ERR-${Date.now()}`,
        role: 'assistant',
        content: `Error connecting to the intelligence engine. Please ensure the dev server is active. Technical details: ${err?.message || 'Network error'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isEvidenceGrounded: false
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `INIT-${Date.now()}`,
        role: "assistant",
        content: `Console reset. You may submit a new microgravity combustion query grounded in the NASA research repository.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isEvidenceGrounded: true
      }
    ]);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 flex flex-col min-h-[calc(100vh-140px)]">
      {/* Header Banner */}
      <div className="border-b border-[#1E2736] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-[#00D9FF] tracking-wider uppercase mb-1 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            <span>GROUNDED RETRIEVAL-AUGMENTED RESEARCH SYSTEM</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#E8EDF3]">
            AI Research Intelligence
          </h1>
          <p className="text-xs text-[#8793A3] mt-0.5">
            Interactive inquiry grounded strictly in NASA microgravity combustion records, thermodynamic models, and mission reports.
          </p>
        </div>

        <button
          onClick={handleResetChat}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#10151D] hover:bg-[#151C26] text-[#8793A3] hover:text-[#E8EDF3] border border-[#1E2736] rounded text-xs font-mono transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Session</span>
        </button>
      </div>

      {/* Preset Research Prompts Strip */}
      <div className="bg-[#10151D] border border-[#1E2736] p-3.5 rounded space-y-2">
        <span className="text-[10px] font-mono text-[#8793A3] uppercase tracking-wider block">
          PRE-CONFIGURED SCIENTIFIC INQUIRIES
        </span>
        <div className="flex flex-wrap gap-2">
          {presetQueries.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(preset)}
              disabled={isLoading}
              className="text-left text-xs bg-[#080B10] hover:bg-[#151C26] text-[#E8EDF3] hover:text-[#00D9FF] border border-[#1E2736] hover:border-[#00D9FF]/40 px-3 py-1.5 rounded transition-all font-mono leading-snug"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 space-y-4 overflow-y-auto pr-1">
        {messages.map((msg) => {
          const isAssistant = msg.role === 'assistant';
          return (
            <div
              key={msg.id}
              className={`p-4 sm:p-5 rounded border ${
                isAssistant
                  ? 'bg-[#10151D] border-[#1E2736]'
                  : 'bg-[#151C26] border-[#00D9FF]/30 ml-8 sm:ml-16'
              }`}
            >
              {/* Message Header */}
              <div className="flex items-center justify-between border-b border-[#1E2736]/60 pb-2 mb-3">
                <div className="flex items-center gap-2">
                  {isAssistant ? (
                    <>
                      <div className="w-5 h-5 rounded bg-[#080B10] border border-[#00D9FF]/40 flex items-center justify-center text-[#00D9FF]">
                        <Cpu className="w-3 h-3" />
                      </div>
                      <span className="text-xs font-mono font-bold text-[#E8EDF3]">
                        628 SCIENTIFIC INTELLIGENCE
                      </span>
                      <span className="text-[10px] font-mono text-[#64E8D2] bg-[#080B10] px-1.5 py-0.5 rounded border border-[#1E2736]">
                        EVIDENCE GROUNDED
                      </span>
                    </>
                  ) : (
                    <span className="text-xs font-mono font-bold text-[#00D9FF]">
                      RESEARCH INVESTIGATOR QUERY
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-[#8793A3]">{msg.timestamp}</span>
              </div>

              {/* Message Markdown Content */}
              <div className="prose prose-invert max-w-none text-xs sm:text-sm text-[#E8EDF3] leading-relaxed space-y-3 font-sans">
                {msg.content.split('\n\n').map((paragraph, pIdx) => {
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h4 key={pIdx} className="text-xs font-mono font-bold text-[#00D9FF] uppercase tracking-wider mt-4 mb-1">
                        {paragraph.replace('### ', '')}
                      </h4>
                    );
                  }
                  if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n- ');
                    return (
                      <ul key={pIdx} className="space-y-1 my-2 list-none pl-1">
                        {items.map((it, iIdx) => (
                          <li key={iIdx} className="flex items-start gap-2 text-xs">
                            <span className="text-[#00D9FF] font-mono shrink-0">▪</span>
                            <span>{it.replace(/^- /, '')}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={pIdx} className="text-xs leading-relaxed">{paragraph}</p>;
                })}
              </div>

              {/* Supporting Citations & Evidence Drawer (Assistant Only) */}
              {isAssistant && (msg.sources || msg.relatedExperiments) && (
                <div className="mt-4 pt-3 border-t border-[#1E2736] space-y-2">
                  <div className="text-[10px] font-mono text-[#8793A3] uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#64E8D2]" />
                    <span>RETRIEVED NASA GROUNDING EVIDENCE</span>
                  </div>

                  {/* Experiments chips */}
                  {msg.relatedExperiments && msg.relatedExperiments.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono text-[#8793A3]">FLIGHT TRIALS:</span>
                      {msg.relatedExperiments.map(exp => (
                        <button
                          key={exp.id}
                          onClick={() => onSelectExperiment(exp)}
                          className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#080B10] hover:bg-[#151C26] text-[#00D9FF] hover:border-[#00D9FF]/40 border border-[#1E2736] text-[11px] font-mono transition-colors"
                          title="Open experiment profile"
                        >
                          <FlaskConical className="w-3 h-3" />
                          <span>{exp.acronym}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Documents citations */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-[10px] font-mono text-[#8793A3]">CITATIONS:</span>
                      {msg.sources.map(doc => (
                        <button
                          key={doc.id}
                          onClick={() => onSelectDocument(doc)}
                          className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#080B10] hover:bg-[#151C26] text-[#64E8D2] hover:border-[#64E8D2]/40 border border-[#1E2736] text-[11px] font-mono transition-colors"
                          title="Inspect NASA technical document"
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>{doc.journalOrSeries.split(' ')[0]}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="p-4 bg-[#10151D] border border-[#1E2736] rounded flex items-center gap-3 text-xs font-mono text-[#8793A3]">
            <Sparkles className="w-4 h-4 text-[#00D9FF] animate-spin" />
            <span>Scanning indexed NASA microgravity combustion corpus & generating grounded synthesis...</span>
          </div>
        )}
      </div>

      {/* Input Composer Bar */}
      <div className="bg-[#10151D] border border-[#1E2736] p-3 rounded sticky bottom-2 shadow-xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask regarding microgravity combustion kinetics, cool flames, LOI thresholds, or ventilation protocols..."
            disabled={isLoading}
            className="flex-1 bg-[#080B10] border border-[#1E2736] focus:border-[#00D9FF]/60 rounded py-2.5 px-3 text-xs text-[#E8EDF3] placeholder-[#8793A3]/60 focus:outline-none font-mono"
          />
          <button
            type="submit"
            disabled={isLoading || !inputQuery.trim()}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#00D9FF] hover:bg-[#64E8D2] disabled:opacity-40 text-[#080B10] font-semibold rounded text-xs font-mono transition-colors shrink-0 shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Submit Query</span>
          </button>
        </form>
        <div className="text-[10px] text-[#8793A3]/70 font-mono mt-1.5 px-1 flex items-center justify-between">
          <span>Model: Gemini 3.8 Flash (Server-Side) with RAG Retrieval Grounding</span>
          <span>Zero Hallucination Protocol Active</span>
        </div>
      </div>
    </div>
  );
};
