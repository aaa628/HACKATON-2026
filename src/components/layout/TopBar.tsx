/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 628 AEROSPACE — MICROGRAVITY FIRE INTELLIGENCE
 * Top Navigation Bar adhering to the Top Bar Contract
 */

import React from 'react';
import { ActiveTab } from './Sidebar';
import { Search, Menu, Sparkles } from 'lucide-react';

interface TopBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenMobileMenu: () => void;
  onOpenQuickQuery: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onTabChange,
  onOpenMobileMenu,
  onOpenQuickQuery,
  searchQuery,
  onSearchChange
}) => {
  return (
    <header className="h-14 bg-[#080B10] border-b border-[#1E2736] px-4 md:px-6 flex items-center justify-between gap-8 sticky top-0 z-30">
      {/* Zone 1: Brand Wordmark (Single text element) */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-1.5 text-[#8793A3] hover:text-[#E8EDF3] border border-[#1E2736] rounded"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-4 h-4" />
        </button>
        <span className="text-sm font-bold tracking-wider text-[#E8EDF3] whitespace-nowrap font-mono shrink-0">
          628 AEROSPACE <span className="text-[#00D9FF] font-normal">/</span> FIRE INTELLIGENCE
        </span>
      </div>

      {/* Zone 2: Navigation Links / Fast Switcher */}
      <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-[#8793A3]">
        <button
          onClick={() => onTabChange('overview')}
          className={`hover:text-[#E8EDF3] transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'overview' ? 'text-[#00D9FF] font-semibold' : ''
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => onTabChange('experiments')}
          className={`hover:text-[#E8EDF3] transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'experiments' ? 'text-[#00D9FF] font-semibold' : ''
          }`}
        >
          Experiments
        </button>
        <button
          onClick={() => onTabChange('comparison')}
          className={`hover:text-[#E8EDF3] transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'comparison' ? 'text-[#00D9FF] font-semibold' : ''
          }`}
        >
          Comparison Lab
        </button>
        <button
          onClick={() => onTabChange('safety-insights')}
          className={`hover:text-[#E8EDF3] transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'safety-insights' ? 'text-[#00D9FF] font-semibold' : ''
          }`}
        >
          Safety Insights
        </button>
        <button
          onClick={() => onTabChange('library')}
          className={`hover:text-[#E8EDF3] transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'library' ? 'text-[#00D9FF] font-semibold' : ''
          }`}
        >
          Library
        </button>
      </nav>

      {/* Zone 3: 1 Primary Action & Context Search */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Quick Search */}
        <div className="relative hidden sm:block">
          <Search className="w-3.5 h-3.5 text-[#8793A3] absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search experiments, fuels..."
            className="w-48 xl:w-64 bg-[#10151D] border border-[#1E2736] focus:border-[#00D9FF]/60 rounded py-1 pl-8 pr-3 text-xs text-[#E8EDF3] placeholder-[#8793A3]/60 focus:outline-none font-mono"
          />
        </div>

        {/* 1 Primary Action: Launch AI Intelligence Query */}
        <button
          onClick={onOpenQuickQuery}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#080B10] bg-[#00D9FF] hover:bg-[#64E8D2] rounded transition-colors whitespace-nowrap font-mono shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#080B10]" />
          <span>Ask AI Research</span>
        </button>
      </div>
    </header>
  );
};
