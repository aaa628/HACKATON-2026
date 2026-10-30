/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 628 AEROSPACE — MICROGRAVITY FIRE INTELLIGENCE (MARK 1)
 * NASA Space Apps Challenge 2026 — Flame in Freefall
 * Main Application Orchestrator
 */

import React, { useState, useEffect } from 'react';
import { Sidebar, ActiveTab } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { OverviewDashboard } from './components/overview/OverviewDashboard';
import { ExperimentExplorer } from './components/experiments/ExperimentExplorer';
import { ExperimentDetailModal } from './components/experiments/ExperimentDetailModal';
import { ComparisonLab } from './components/comparison/ComparisonLab';
import { AiResearchIntelligence } from './components/ai/AiResearchIntelligence';
import { SafetyInsightsView } from './components/safety/SafetyInsightsView';
import { ResearchLibrary } from './components/library/ResearchLibrary';
import { AboutView } from './components/about/AboutView';
import { NASA_EXPERIMENTS } from './data/nasaExperiments';
import { RESEARCH_LIBRARY } from './data/researchLibrary';
import { SAFETY_INSIGHTS } from './data/safetyInsights';
import { ExperimentRecord, ResearchDocument, SafetyInsight } from './types/research';
import { X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [selectedExperiment, setSelectedExperiment] = useState<ExperimentRecord | null>(null);
  const [comparisonList, setComparisonList] = useState<ExperimentRecord[]>([
    NASA_EXPERIMENTS[0], // Saffire-I
    NASA_EXPERIMENTS[1]  // Saffire-IV
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aiPresetQuery, setAiPresetQuery] = useState('');
  const [focusedDocId, setFocusedDocId] = useState<string | null>(null);

  const datasetStats = {
    indexedExperiments: NASA_EXPERIMENTS.length,
    researchDocuments: RESEARCH_LIBRARY.length,
    safetyInsights: SAFETY_INSIGHTS.length
  };

  // Switch to search results if user starts typing in topbar
  const handleTopBarSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0 && activeTab !== 'experiments') {
      setActiveTab('experiments');
    }
  };

  // Add experiment to comparison
  const handleAddToComparison = (exp: ExperimentRecord) => {
    if (!comparisonList.some(c => c.id === exp.id)) {
      if (comparisonList.length >= 3) {
        setComparisonList([comparisonList[1], comparisonList[2], exp]);
      } else {
        setComparisonList([...comparisonList, exp]);
      }
    }
    setActiveTab('comparison');
    setSelectedExperiment(null);
  };

  // Remove from comparison
  const handleRemoveFromComparison = (id: string) => {
    setComparisonList(prev => prev.filter(c => c.id !== id));
  };

  // Clear comparison
  const handleClearComparison = () => {
    setComparisonList([]);
  };

  // Ask AI about an experiment
  const handleAskAiAboutExperiment = (exp: ExperimentRecord) => {
    setAiPresetQuery(`Provide a detailed combustion physics breakdown of NASA experiment ${exp.name} (${exp.investigationId}), focusing on its fuel behavior (${exp.conditions.fuelName}), flame standoff distance, and spacecraft fire safety implications.`);
    setActiveTab('ai-intelligence');
    setSelectedExperiment(null);
  };

  // Ask AI about an insight
  const handleAskAiAboutInsight = (insight: SafetyInsight) => {
    setAiPresetQuery(`Explain in depth the scientific basis for Fire Safety Insight #${insight.rank}: "${insight.title}". What thermodynamic mechanisms drive this hazard, and what operational fire suppression doctrines should future Moon and Mars habitats implement?`);
    setActiveTab('ai-intelligence');
  };

  // Ask AI about multiple compared experiments
  const handleAskAiComparison = (exps: ExperimentRecord[]) => {
    const names = exps.map(e => `${e.name} (${e.id})`).join(' vs ');
    setAiPresetQuery(`Compare the microgravity combustion regimes between: ${names}. Highlight differences in flame standoff, regression rate, limiting oxygen index, and atmospheric pressure effects.`);
    setActiveTab('ai-intelligence');
  };

  // Open a specific document in library
  const handleSelectDocument = (doc: ResearchDocument) => {
    setFocusedDocId(doc.id);
    setActiveTab('library');
  };

  // Ask AI about a document
  const handleAskAiAboutDoc = (doc: ResearchDocument) => {
    setAiPresetQuery(`Summarize the core experimental findings of NASA Technical Report "${doc.title}" (${doc.journalOrSeries}). Explain how this research impacts human spaceflight fire safety.`);
    setActiveTab('ai-intelligence');
  };

  // Export full JSON database
  const handleExportData = () => {
    const data = {
      platform: "628 Aerospace Microgravity Fire Intelligence (Mark 1)",
      challenge: "NASA Space Apps Challenge 2026 — Flame in Freefall",
      exportTimestamp: new Date().toISOString(),
      experiments: NASA_EXPERIMENTS,
      technicalDocuments: RESEARCH_LIBRARY,
      rankedSafetyInsights: SAFETY_INSIGHTS
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `628_aerospace_microgravity_dataset_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#080B10] text-[#E8EDF3] flex flex-col font-sans antialiased">
      {/* Top Header */}
      <TopBar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
        onOpenQuickQuery={() => setActiveTab('ai-intelligence')}
        searchQuery={searchQuery}
        onSearchChange={handleTopBarSearch}
      />

      {/* Main Body with Persistent Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            datasetStats={datasetStats}
            onExportData={handleExportData}
          />
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden bg-black/80 backdrop-blur-sm">
            <div className="w-72 bg-[#080B10] border-r border-[#1E2736] h-full flex flex-col justify-between">
              <div className="p-4 border-b border-[#1E2736] flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#00D9FF]">628 AEROSPACE</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#8793A3] hover:text-[#E8EDF3]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <Sidebar
                  activeTab={activeTab}
                  onTabChange={(tab) => {
                    setActiveTab(tab);
                    setMobileMenuOpen(false);
                  }}
                  datasetStats={datasetStats}
                  onExportData={handleExportData}
                />
              </div>
            </div>
          </div>
        )}

        {/* Central Viewport Stage */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#080B10]">
          {activeTab === 'overview' && (
            <OverviewDashboard
              onSelectExperiment={(exp) => setSelectedExperiment(exp)}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'experiments' && (
            <ExperimentExplorer
              onSelectExperiment={(exp) => setSelectedExperiment(exp)}
              onSendToComparison={handleAddToComparison}
              onAskAiAboutExperiment={handleAskAiAboutExperiment}
              comparisonList={comparisonList}
              initialSearchQuery={searchQuery}
            />
          )}

          {activeTab === 'comparison' && (
            <ComparisonLab
              selectedExperiments={comparisonList}
              onAddExperiment={handleAddToComparison}
              onRemoveExperiment={handleRemoveFromComparison}
              onClearComparison={handleClearComparison}
              onAskAiComparison={handleAskAiComparison}
            />
          )}

          {activeTab === 'ai-intelligence' && (
            <AiResearchIntelligence
              onSelectExperiment={(exp) => setSelectedExperiment(exp)}
              onSelectDocument={handleSelectDocument}
              initialQuery={aiPresetQuery}
            />
          )}

          {activeTab === 'safety-insights' && (
            <SafetyInsightsView
              onSelectExperiment={(exp) => setSelectedExperiment(exp)}
              onSelectDocument={handleSelectDocument}
              onAskAiAboutInsight={handleAskAiAboutInsight}
            />
          )}

          {activeTab === 'library' && (
            <ResearchLibrary
              onSelectExperiment={(exp) => setSelectedExperiment(exp)}
              onAskAiAboutDoc={handleAskAiAboutDoc}
              selectedDocId={focusedDocId}
            />
          )}

          {activeTab === 'methodology' && (
            <AboutView />
          )}
        </main>
      </div>

      {/* Experiment Detail Profile Modal */}
      {selectedExperiment && (
        <ExperimentDetailModal
          experiment={selectedExperiment}
          onClose={() => setSelectedExperiment(null)}
          onSendToComparison={handleAddToComparison}
          onAskAiAboutExperiment={handleAskAiAboutExperiment}
        />
      )}
    </div>
  );
}
