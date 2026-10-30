/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 628 AEROSPACE — MICROGRAVITY FIRE INTELLIGENCE
 * Fire Safety Insights & Transparent Evidence-Based Ranking Engine
 */

import React, { useState } from 'react';
import { SAFETY_INSIGHTS } from '../../data/safetyInsights';
import { SafetyInsight, ExperimentRecord, ResearchDocument } from '../../types/research';
import { NASA_EXPERIMENTS } from '../../data/nasaExperiments';
import { RESEARCH_LIBRARY } from '../../data/researchLibrary';
import { 
  ShieldAlert, 
  HelpCircle, 
  Filter, 
  CheckCircle2, 
  FlaskConical, 
  BookOpen, 
  Flame, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface SafetyInsightsViewProps {
  onSelectExperiment: (exp: ExperimentRecord) => void;
  onSelectDocument: (doc: ResearchDocument) => void;
  onAskAiAboutInsight: (insight: SafetyInsight) => void;
}

export const SafetyInsightsView: React.FC<SafetyInsightsViewProps> = ({
  onSelectExperiment,
  onSelectDocument,
  onAskAiAboutInsight
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [methodologyOpen, setMethodologyOpen] = useState(false);

  const categories = [
    'Ventilation Dynamics',
    'Cool Flame Hazards',
    'Exploration Atmospheres',
    'Smoldering & Detection',
    'Fire Suppression',
    'Material Flammability Standards'
  ];

  const filteredInsights = SAFETY_INSIGHTS.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (selectedSeverity !== 'all' && item.severityGrade !== selectedSeverity) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="border-b border-[#1E2736] pb-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-[#00D9FF] tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>SPACECRAFT SAFETY ANALYSIS</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#E8EDF3]">
              Fire Safety Insights & Evidence Ranking
            </h1>
            <p className="text-xs text-[#8793A3] mt-1 max-w-3xl">
              Systematic ranking of microgravity combustion findings prioritized by operational consequence to crew safety across Artemis, Lunar Surface Habitats, and Mars transit.
            </p>
          </div>

          <button
            onClick={() => setMethodologyOpen(!methodologyOpen)}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#10151D] hover:bg-[#151C26] text-[#8793A3] hover:text-[#00D9FF] border border-[#1E2736] rounded text-xs font-mono transition-colors self-start md:self-auto shrink-0"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#00D9FF]" />
            <span>{methodologyOpen ? "Hide Ranking Methodology" : "Inspect Ranking Methodology"}</span>
          </button>
        </div>
      </div>

      {/* Methodology Explainer Box */}
      {methodologyOpen && (
        <div className="bg-[#10151D] border border-[#00D9FF]/30 p-5 rounded space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-[#1E2736] pb-2">
            <span className="text-xs font-mono text-[#00D9FF] uppercase font-bold tracking-wider">
              Transparent Scientific Ranking Methodology
            </span>
            <span className="text-[10px] font-mono text-[#64E8D2]">Formula v1.2</span>
          </div>

          <p className="text-xs text-[#8793A3] leading-relaxed">
            The ranking index synthesizes three orthogonal empirical dimensions to prevent arbitrary scoring:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
            <div className="bg-[#080B10] p-3 rounded border border-[#1E2736]">
              <div className="text-[#00D9FF] font-semibold">1. Evidence Strength (40%)</div>
              <div className="text-[#8793A3] text-[11px] mt-1">
                Flight trials in orbital microgravity (ISS CIR, Cygnus Saffire) receive maximum weight. Ground drop tower data is categorized as preliminary.
              </div>
            </div>
            <div className="bg-[#080B10] p-3 rounded border border-[#1E2736]">
              <div className="text-[#64E8D2] font-semibold">2. Crew Hazard Severity (35%)</div>
              <div className="text-[#8793A3] text-[11px] mt-1">
                Evaluates life support system compromise, sensor blindness (cool flames), rapid toxic gas release (CO &gt; 1000 ppm), and structural bulkhead heating.
              </div>
            </div>
            <div className="bg-[#080B10] p-3 rounded border border-[#1E2736]">
              <div className="text-[#FFB800] font-semibold">3. Exploration Urgency (25%)</div>
              <div className="text-[#8793A3] text-[11px] mt-1">
                Relevance to near-term Artemis Lunar Gateway and Mars transit architectures (specifically 34% O₂ / 8.2 psia exploration atmosphere protocols).
              </div>
            </div>
          </div>

          <div className="text-[11px] text-[#8793A3] italic border-t border-[#1E2736]/60 pt-2">
            Important distinction: An experimental observation is not presented as an operational flight rule until validated across multiple vehicle design iterations.
          </div>
        </div>
      )}

      {/* Filter Strip */}
      <div className="bg-[#10151D] border border-[#1E2736] p-3.5 rounded flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-[#8793A3]">
            <Filter className="w-3.5 h-3.5" />
            <span>CATEGORY:</span>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#080B10] border border-[#1E2736] rounded py-1 px-2 text-[#E8EDF3] focus:outline-none focus:border-[#00D9FF]/60"
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <div className="flex items-center gap-1.5 text-[#8793A3] ml-2">
            <span>SEVERITY:</span>
          </div>
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="bg-[#080B10] border border-[#1E2736] rounded py-1 px-2 text-[#E8EDF3] focus:outline-none focus:border-[#00D9FF]/60"
          >
            <option value="all">All Severities</option>
            <option value="CRITICAL HAZARD">Critical Hazard</option>
            <option value="HIGH HAZARD">High Hazard</option>
            <option value="OPERATIONAL PROTOCOL">Operational Protocol</option>
            <option value="TESTING LIMITATION">Testing Limitation</option>
          </select>
        </div>

        <div className="text-[11px] text-[#8793A3]">
          SHOWING <span className="text-[#E8EDF3] font-bold">{filteredInsights.length}</span> RANKED INSIGHTS
        </div>
      </div>

      {/* Ranked Insights List */}
      <div className="space-y-5">
        {filteredInsights.map(insight => {
          const supportingExperiments = NASA_EXPERIMENTS.filter(e => insight.supportingExperimentIds.includes(e.id));
          const supportingDocs = RESEARCH_LIBRARY.filter(d => insight.supportingSourceIds.includes(d.id));

          const severityColor = 
            insight.severityGrade === 'CRITICAL HAZARD' ? '#FF5C5C' :
            insight.severityGrade === 'HIGH HAZARD' ? '#FFB800' :
            insight.severityGrade === 'OPERATIONAL PROTOCOL' ? '#00D9FF' : '#64E8D2';

          return (
            <div
              key={insight.id}
              className="bg-[#10151D] border border-[#1E2736] hover:border-[#2A364A] rounded p-5 space-y-4 transition-colors"
            >
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E2736] pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#080B10] border border-[#1E2736] flex items-center justify-center font-mono font-bold text-sm text-[#00D9FF] shrink-0">
                    #{insight.rank}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-mono">
                      <span className="text-[#8793A3]">{insight.category}</span>
                      <span>·</span>
                      <span className="text-[#64E8D2] font-semibold">{insight.evidenceStrength}</span>
                    </div>
                    <h2 className="text-base font-bold text-[#E8EDF3]">
                      {insight.title}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  <span 
                    className="text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-wider font-bold"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      color: severityColor,
                      border: `1px solid ${severityColor}40`
                    }}
                  >
                    {insight.severityGrade}
                  </span>
                  <span className="text-[11px] font-mono text-[#8793A3] bg-[#080B10] px-2 py-0.5 rounded border border-[#1E2736]">
                    Conf: {insight.confidenceScorePct}%
                  </span>
                </div>
              </div>

              {/* Strict Scientific Dissection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* 1. OBSERVED RESULT */}
                <div className="bg-[#080B10] border border-[#1E2736] p-3.5 rounded space-y-1.5">
                  <div className="text-[10px] font-mono text-[#00D9FF] uppercase tracking-wider font-semibold">
                    OBSERVED FLIGHT RESULT
                  </div>
                  <p className="text-xs text-[#E8EDF3] leading-relaxed">
                    {insight.observedResult}
                  </p>
                </div>

                {/* 2. SCIENTIFIC INTERPRETATION */}
                <div className="bg-[#080B10] border border-[#1E2736] p-3.5 rounded space-y-1.5">
                  <div className="text-[10px] font-mono text-[#64E8D2] uppercase tracking-wider font-semibold">
                    SCIENTIFIC INTERPRETATION
                  </div>
                  <p className="text-xs text-[#E8EDF3] leading-relaxed">
                    {insight.scientificInterpretation}
                  </p>
                </div>

                {/* 3. POTENTIAL SAFETY IMPLICATION */}
                <div className="bg-[#080B10] border border-[#1E2736] p-3.5 rounded space-y-1.5">
                  <div className="text-[10px] font-mono text-[#FFB800] uppercase tracking-wider font-semibold">
                    POTENTIAL SAFETY IMPLICATION
                  </div>
                  <p className="text-xs text-[#E8EDF3] leading-relaxed">
                    {insight.potentialSafetyImplication}
                  </p>
                </div>
              </div>

              {/* Missions Applicable & Ranking Rationale */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#8793A3] pt-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[#8793A3]">APPLICABLE MISSIONS:</span>
                  {insight.applicableMissions.map((m, mIdx) => (
                    <span key={mIdx} className="text-[#E8EDF3] bg-[#151C26] px-1.5 py-0.5 rounded border border-[#1E2736] text-[10px]">
                      {m}
                    </span>
                  ))}
                </div>

                <div className="text-[11px] text-[#8793A3]/80 italic">
                  Rationale: {insight.rankingRationale}
                </div>
              </div>

              {/* Grounding Source Attribution Strip */}
              <div className="border-t border-[#1E2736]/70 pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono text-[#8793A3]">SUPPORTING DATA:</span>
                  {supportingExperiments.map(exp => (
                    <button
                      key={exp.id}
                      onClick={() => onSelectExperiment(exp)}
                      className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#080B10] hover:bg-[#151C26] text-[#00D9FF] text-[11px] font-mono border border-[#1E2736] transition-colors"
                      title="Inspect supporting flight experiment"
                    >
                      <FlaskConical className="w-3 h-3" />
                      <span>{exp.acronym}</span>
                    </button>
                  ))}
                  {supportingDocs.map(doc => (
                    <button
                      key={doc.id}
                      onClick={() => onSelectDocument(doc)}
                      className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#080B10] hover:bg-[#151C26] text-[#64E8D2] text-[11px] font-mono border border-[#1E2736] transition-colors"
                      title="Open technical paper"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>{doc.journalOrSeries.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => onAskAiAboutInsight(insight)}
                  className="flex items-center gap-1.5 px-3 py-1 bg-[#151C26] hover:bg-[#1E2736] text-[#00D9FF] border border-[#1E2736] hover:border-[#00D9FF]/40 rounded text-xs font-mono transition-colors self-start sm:self-auto shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask AI to Expand</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
