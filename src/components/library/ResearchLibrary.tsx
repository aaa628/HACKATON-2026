/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 628 AEROSPACE — MICROGRAVITY FIRE INTELLIGENCE
 * Research Library — NASA Technical Reports & Literature Index
 */

import React, { useState, useMemo } from 'react';
import { RESEARCH_LIBRARY } from '../../data/researchLibrary';
import { ResearchDocument, ExperimentRecord } from '../../types/research';
import { NASA_EXPERIMENTS } from '../../data/nasaExperiments';
import { 
  BookOpen, 
  Search, 
  ExternalLink, 
  FileText, 
  FlaskConical, 
  Sparkles, 
  Copy, 
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ResearchLibraryProps {
  onSelectExperiment: (exp: ExperimentRecord) => void;
  onAskAiAboutDoc: (doc: ResearchDocument) => void;
  selectedDocId?: string | null;
}

export const ResearchLibrary: React.FC<ResearchLibraryProps> = ({
  onSelectExperiment,
  onAskAiAboutDoc,
  selectedDocId = null
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKeyword, setSelectedKeyword] = useState<string>('all');
  const [expandedDocIds, setExpandedDocIds] = useState<string[]>(
    selectedDocId ? [selectedDocId] : ['DOC-NASA-SAFFIRE-2020']
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Extract all unique keywords
  const allKeywords = useMemo(() => {
    const set = new Set<string>();
    RESEARCH_LIBRARY.forEach(doc => {
      doc.keywords.forEach(k => set.add(k));
    });
    return Array.from(set).sort();
  }, []);

  // Filtered documents
  const filteredDocs = useMemo(() => {
    return RESEARCH_LIBRARY.filter(doc => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = doc.title.toLowerCase().includes(q);
        const matchesAuthors = doc.authors.some(a => a.toLowerCase().includes(q));
        const matchesAbstract = doc.abstract.toLowerCase().includes(q);
        const matchesSeries = doc.journalOrSeries.toLowerCase().includes(q);
        if (!matchesTitle && !matchesAuthors && !matchesAbstract && !matchesSeries) return false;
      }

      if (selectedKeyword !== 'all' && !doc.keywords.includes(selectedKeyword)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedKeyword]);

  const toggleExpand = (id: string) => {
    setExpandedDocIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const copyCitation = (doc: ResearchDocument) => {
    const citation = `${doc.authors.join(', ')} (${doc.publicationDate.slice(0, 4)}). "${doc.title}". ${doc.journalOrSeries}. ${doc.doi ? `https://doi.org/${doc.doi}` : doc.ntrsUrl || ''}`;
    navigator.clipboard.writeText(citation);
    setCopiedId(doc.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="border-b border-[#1E2736] pb-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-[#00D9FF] tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>NASA & PEER-REVIEWED LITERATURE REPOSITORY</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#E8EDF3]">
              Research Document Library
            </h1>
            <p className="text-xs text-[#8793A3] mt-1 max-w-3xl">
              Indexed collection of NASA Technical Reports (NTRS), flight investigation mission reports, and combustion science journal publications.
            </p>
          </div>

          <div className="text-xs font-mono text-[#8793A3] bg-[#10151D] border border-[#1E2736] px-3 py-2 rounded">
            <span>{RESEARCH_LIBRARY.length} Primary Documents Indexed</span>
          </div>
        </div>
      </div>

      {/* Search and Keyword Toolbar */}
      <div className="bg-[#10151D] border border-[#1E2736] p-4 rounded space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8793A3] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by publication title, author, NASA TM series, or keywords..."
              className="w-full bg-[#080B10] border border-[#1E2736] focus:border-[#00D9FF]/60 rounded py-2 pl-9 pr-3 text-xs text-[#E8EDF3] placeholder-[#8793A3]/60 focus:outline-none font-mono"
            />
          </div>

          {/* Keyword filter dropdown */}
          <div className="sm:w-64">
            <select
              value={selectedKeyword}
              onChange={(e) => setSelectedKeyword(e.target.value)}
              className="w-full bg-[#080B10] border border-[#1E2736] rounded py-2 px-3 text-xs text-[#E8EDF3] focus:outline-none focus:border-[#00D9FF]/60 font-mono"
            >
              <option value="all">All Scientific Keywords</option>
              {allKeywords.map(k => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-[11px] font-mono text-[#8793A3] pt-1 flex items-center justify-between">
          <span>SHOWING {filteredDocs.length} OF {RESEARCH_LIBRARY.length} PUBLICATIONS</span>
          {selectedKeyword !== 'all' && (
            <button
              onClick={() => setSelectedKeyword('all')}
              className="text-[#00D9FF] hover:underline"
            >
              Clear keyword filter
            </button>
          )}
        </div>
      </div>

      {/* Document List */}
      <div className="space-y-4">
        {filteredDocs.map(doc => {
          const isExpanded = expandedDocIds.includes(doc.id);
          const isCopied = copiedId === doc.id;
          const associatedExperiments = NASA_EXPERIMENTS.filter(e => doc.relevantExperiments.includes(e.id));

          return (
            <div
              key={doc.id}
              className="bg-[#10151D] border border-[#1E2736] hover:border-[#2A364A] rounded p-5 space-y-3 transition-colors"
            >
              {/* Top metadata row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#8793A3]">
                    <span className="text-[#00D9FF] font-semibold">{doc.id}</span>
                    <span>·</span>
                    <span className="text-[#64E8D2]">{doc.journalOrSeries}</span>
                    <span>·</span>
                    <span>{doc.publicationDate}</span>
                  </div>
                  <h2 className="text-base font-bold text-[#E8EDF3]">
                    {doc.title}
                  </h2>
                  <div className="text-xs text-[#8793A3]">
                    Authors: <span className="text-[#E8EDF3]">{doc.authors.join(', ')}</span> ({doc.leadOrganization})
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                  <button
                    onClick={() => copyCitation(doc)}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-[#080B10] hover:bg-[#151C26] text-[#8793A3] hover:text-[#E8EDF3] border border-[#1E2736] rounded text-xs font-mono transition-colors"
                    title="Copy standard academic citation"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-[#64E8D2]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? "Copied" : "Cite"}</span>
                  </button>

                  <button
                    onClick={() => onAskAiAboutDoc(doc)}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-[#151C26] hover:bg-[#1E2736] text-[#00D9FF] border border-[#1E2736] hover:border-[#00D9FF]/40 rounded text-xs font-mono transition-colors"
                    title="Analyze with AI"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Deep Dive</span>
                  </button>

                  {doc.ntrsUrl && (
                    <a
                      href={doc.ntrsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 px-2.5 py-1.5 bg-[#080B10] hover:bg-[#151C26] text-[#64E8D2] border border-[#1E2736] rounded text-xs font-mono transition-colors"
                      title="Open NASA Technical Reports Server page"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>NASA NTRS</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Key Takeaway Callout */}
              <div className="bg-[#151C26] border border-[#1E2736] p-3 rounded text-xs text-[#E8EDF3]">
                <span className="text-[#00D9FF] font-mono font-semibold uppercase tracking-wide mr-2">
                  Executive Research Takeaway:
                </span>
                <span>{doc.keyTakeaway}</span>
              </div>

              {/* Collapsible Abstract & Body */}
              <div>
                <button
                  onClick={() => toggleExpand(doc.id)}
                  className="flex items-center gap-1.5 text-xs font-mono text-[#8793A3] hover:text-[#E8EDF3] py-1 transition-colors"
                >
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  <span>{isExpanded ? "Hide Full Abstract & Metadata" : "Show Full Abstract & Metadata"}</span>
                </button>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-[#1E2736] space-y-3 animate-in fade-in duration-100">
                    <div>
                      <div className="text-[10px] font-mono text-[#8793A3] uppercase tracking-wider mb-1">
                        SCIENTIFIC ABSTRACT
                      </div>
                      <p className="text-xs text-[#E8EDF3] leading-relaxed bg-[#080B10] p-3 rounded border border-[#1E2736]">
                        {doc.abstract}
                      </p>
                    </div>

                    {/* Associated flight experiments */}
                    {associatedExperiments.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono">
                        <span className="text-[#8793A3]">ASSOCIATED FLIGHT EXPERIMENTS:</span>
                        {associatedExperiments.map(exp => (
                          <button
                            key={exp.id}
                            onClick={() => onSelectExperiment(exp)}
                            className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#080B10] text-[#00D9FF] hover:bg-[#151C26] border border-[#1E2736] transition-colors"
                          >
                            <FlaskConical className="w-3 h-3" />
                            <span>{exp.name} ({exp.id})</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Keywords list */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] font-mono text-[#8793A3]">
                      <span>KEYWORDS:</span>
                      {doc.keywords.map((k, ki) => (
                        <span key={ki} className="text-[#8793A3] bg-[#080B10] px-2 py-0.5 rounded border border-[#1E2736]">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
