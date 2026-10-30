/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 628 AEROSPACE — MICROGRAVITY FIRE INTELLIGENCE
 * Navigation Sidebar & Platform Status Monitor
 */

import React from 'react';
import { 
  Flame, 
  FlaskConical, 
  GitCompare, 
  Cpu, 
  ShieldAlert, 
  BookOpen, 
  Layers, 
  FileDown
} from 'lucide-react';

export type ActiveTab = 
  | 'overview' 
  | 'experiments' 
  | 'comparison' 
  | 'ai-intelligence' 
  | 'safety-insights' 
  | 'library' 
  | 'methodology';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  datasetStats: {
    indexedExperiments: number;
    researchDocuments: number;
    safetyInsights: number;
  };
  onExportData: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  datasetStats,
  onExportData
}) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'overview', label: 'Overview', icon: <Flame className="w-4 h-4" /> },
    { id: 'experiments', label: 'Experiment Explorer', icon: <FlaskConical className="w-4 h-4" />, count: datasetStats.indexedExperiments },
    { id: 'comparison', label: 'Comparison Lab', icon: <GitCompare className="w-4 h-4" /> },
    { id: 'ai-intelligence', label: 'AI Intelligence', icon: <Cpu className="w-4 h-4" /> },
    { id: 'safety-insights', label: 'Fire Safety Insights', icon: <ShieldAlert className="w-4 h-4" />, count: datasetStats.safetyInsights },
    { id: 'library', label: 'Research Library', icon: <BookOpen className="w-4 h-4" />, count: datasetStats.researchDocuments },
    { id: 'methodology', label: 'Methodology & Data', icon: <Layers className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 bg-[#080B10] border-r border-[#1E2736] flex flex-col justify-between shrink-0 select-none min-h-screen">
      {/* Brand Zone */}
      <div className="p-5 border-b border-[#1E2736]">
        <div className="flex items-center gap-3">
          {/* Engineering geometric vector emblem */}
          <div className="w-8 h-8 rounded bg-[#10151D] border border-[#00D9FF]/40 flex items-center justify-center text-[#00D9FF] shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 2 22 22 22" />
              <circle cx="12" cy="14" r="3" fill="#00D9FF" fillOpacity="0.3" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wider text-[#E8EDF3] uppercase font-mono">
              628 AEROSPACE
            </div>
            <div className="text-[11px] text-[#8793A3] font-mono tracking-tight">
              FIRE INTELLIGENCE · MK 1
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#1E2736]/60 text-[11px] text-[#8793A3]">
          <span className="text-[#64E8D2] font-mono">NASA SPACE APPS 2026</span>
          <p className="text-[10px] text-[#8793A3]/80 mt-0.5 leading-tight">
            Challenge: Flame in Freefall
          </p>
        </div>
      </div>

      {/* Primary Navigation Menu */}
      <nav className="p-3 flex-1 flex flex-col gap-1 overflow-y-auto">
        <div className="text-[10px] font-mono text-[#8793A3]/70 uppercase tracking-widest px-3 py-1.5">
          Research Console
        </div>
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-xs font-medium transition-colors text-left ${
                isActive
                  ? 'bg-[#151C26] text-[#00D9FF] border border-[#00D9FF]/30 font-semibold'
                  : 'text-[#8793A3] hover:text-[#E8EDF3] hover:bg-[#10151D] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={isActive ? 'text-[#00D9FF]' : 'text-[#8793A3]'}>
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </div>
              {item.count !== undefined && (
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-[#080B10] text-[#00D9FF]' : 'bg-[#10151D] text-[#8793A3]'
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Dataset & System Status Console */}
      <div className="p-4 border-t border-[#1E2736] bg-[#0B0E14] flex flex-col gap-3">
        <div className="flex items-center justify-between text-[11px] font-mono">
          <span className="text-[#8793A3]">DATASET STATE:</span>
          <span className="text-[#64E8D2] font-medium">VERIFIED NASA</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-[#10151D] p-2 rounded border border-[#1E2736]">
          <div>
            <div className="text-[#8793A3]">FLIGHT TRIALS</div>
            <div className="text-[#E8EDF3] text-xs font-bold tabular-nums">
              {datasetStats.indexedExperiments} Indexed
            </div>
          </div>
          <div>
            <div className="text-[#8793A3]">DOCUMENTS</div>
            <div className="text-[#E8EDF3] text-xs font-bold tabular-nums">
              {datasetStats.researchDocuments} NASA TM
            </div>
          </div>
        </div>

        <button
          onClick={onExportData}
          className="w-full flex items-center justify-center gap-2 px-3 py-1.5 bg-[#10151D] hover:bg-[#151C26] text-[#E8EDF3] border border-[#1E2736] hover:border-[#2A364A] rounded text-[11px] font-mono transition-colors"
          title="Download the full verified dataset as JSON"
        >
          <FileDown className="w-3.5 h-3.5 text-[#00D9FF]" />
          <span>Export Research DB</span>
        </button>

        <div className="text-[10px] text-[#8793A3]/60 text-center font-mono">
          Mark 1 · Independent Aerospace Research
        </div>
      </div>
    </aside>
  );
};
