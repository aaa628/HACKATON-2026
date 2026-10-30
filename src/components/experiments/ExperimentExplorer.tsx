/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 628 AEROSPACE — MICROGRAVITY FIRE INTELLIGENCE
 * Experiment Explorer — Searchable & Filterable NASA Flight Combustion Database
 */

import React, { useState, useMemo } from 'react';
import { NASA_EXPERIMENTS } from '../../data/nasaExperiments';
import { ExperimentRecord, FuelCategory, FlightPlatform } from '../../types/research';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  LayoutGrid, 
  Table as TableIcon, 
  GitCompare, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  ArrowUpDown,
  RotateCcw
} from 'lucide-react';

interface ExperimentExplorerProps {
  onSelectExperiment: (exp: ExperimentRecord) => void;
  onSendToComparison: (exp: ExperimentRecord) => void;
  onAskAiAboutExperiment: (exp: ExperimentRecord) => void;
  comparisonList: ExperimentRecord[];
  initialSearchQuery?: string;
}

export const ExperimentExplorer: React.FC<ExperimentExplorerProps> = ({
  onSelectExperiment,
  onSendToComparison,
  onAskAiAboutExperiment,
  comparisonList,
  initialSearchQuery = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProgramme, setSelectedProgramme] = useState<string>('all');
  const [coolFlameOnly, setCoolFlameOnly] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [sortField, setSortField] = useState<'year' | 'name' | 'oxygen'>('year');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  // Available unique categories & programmes
  const categories: FuelCategory[] = [
    'Solid Polymer',
    'Liquid Hydrocarbon Droplet',
    'Gaseous Hydrocarbon',
    'Spacecraft Fabric & Textile'
  ];

  const programmes: FlightPlatform[] = [
    'ISS CIR (Combustion Integrated Rack)',
    'Cygnus Spacecraft (Saffire Flights)',
    'NASA Glenn 2.2s Drop Tower',
    'Space Shuttle (STS Missions)'
  ];

  // Filtered and sorted experiments
  const filteredExperiments = useMemo(() => {
    return NASA_EXPERIMENTS.filter(exp => {
      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = exp.name.toLowerCase().includes(q) || exp.acronym.toLowerCase().includes(q);
        const matchesFuel = exp.conditions.fuelName.toLowerCase().includes(q);
        const matchesId = exp.investigationId.toLowerCase().includes(q);
        const matchesFinding = exp.keyFindings.some(f => f.toLowerCase().includes(q));
        if (!matchesName && !matchesFuel && !matchesId && !matchesFinding) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && exp.category !== selectedCategory) {
        return false;
      }

      // Programme filter
      if (selectedProgramme !== 'all' && exp.programme !== selectedProgramme) {
        return false;
      }

      // Cool flame filter
      if (coolFlameOnly && !exp.measurements.coolFlameObserved) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      let result = 0;
      if (sortField === 'year') {
        result = a.yearConducted - b.yearConducted;
      } else if (sortField === 'name') {
        result = a.name.localeCompare(b.name);
      } else if (sortField === 'oxygen') {
        const oxA = a.conditions.oxygenConcentrationPct ?? 0;
        const oxB = b.conditions.oxygenConcentrationPct ?? 0;
        result = oxA - oxB;
      }
      return sortAsc ? result : -result;
    });
  }, [searchQuery, selectedCategory, selectedProgramme, coolFlameOnly, sortField, sortAsc]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedProgramme('all');
    setCoolFlameOnly(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Explorer Top Banner */}
      <div className="border-b border-[#1E2736] pb-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-[#00D9FF] tracking-wider uppercase mb-1">
              SEARCHABLE SCIENTIFIC REPOSITORY
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#E8EDF3]">
              Experiment Explorer
            </h1>
            <p className="text-xs text-[#8793A3] mt-1">
              Filter through verified NASA flight and ground microgravity combustion investigations. Inspect conditions, telemetry data, and physical observations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 p-1 bg-[#10151D] border border-[#1E2736] rounded">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  viewMode === 'cards' ? 'bg-[#151C26] text-[#00D9FF]' : 'text-[#8793A3] hover:text-[#E8EDF3]'
                }`}
                title="Cards view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  viewMode === 'table' ? 'bg-[#151C26] text-[#00D9FF]' : 'text-[#8793A3] hover:text-[#E8EDF3]'
                }`}
                title="Table view"
              >
                <TableIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Compare Quick Count Indicator */}
            {comparisonList.length > 0 && (
              <span className="text-xs font-mono text-[#64E8D2] bg-[#151C26] px-2.5 py-1.5 rounded border border-[#1E2736]">
                {comparisonList.length} in Comparison Lab
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Filter and Control Toolbar */}
      <div className="bg-[#10151D] border border-[#1E2736] p-4 rounded space-y-4">
        {/* Search Input & Reset */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8793A3] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search experiments by name, fuel, investigation ID, or findings..."
              className="w-full bg-[#080B10] border border-[#1E2736] focus:border-[#00D9FF]/60 rounded py-2 pl-9 pr-3 text-xs text-[#E8EDF3] placeholder-[#8793A3]/60 focus:outline-none font-mono"
            />
          </div>

          {/* Quick Clear */}
          {(searchQuery || selectedCategory !== 'all' || selectedProgramme !== 'all' || coolFlameOnly) && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#151C26] hover:bg-[#1E2736] text-[#8793A3] hover:text-[#E8EDF3] border border-[#1E2736] rounded text-xs font-mono transition-colors shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
          {/* Fuel Category Selector */}
          <div>
            <label className="text-[10px] text-[#8793A3] uppercase block mb-1">Fuel Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#080B10] border border-[#1E2736] rounded py-1.5 px-2.5 text-xs text-[#E8EDF3] focus:outline-none focus:border-[#00D9FF]/60"
            >
              <option value="all">All Categories</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Flight Programme Selector */}
          <div>
            <label className="text-[10px] text-[#8793A3] uppercase block mb-1">Flight Programme</label>
            <select
              value={selectedProgramme}
              onChange={(e) => setSelectedProgramme(e.target.value)}
              className="w-full bg-[#080B10] border border-[#1E2736] rounded py-1.5 px-2.5 text-xs text-[#E8EDF3] focus:outline-none focus:border-[#00D9FF]/60"
            >
              <option value="all">All Programmes</option>
              {programmes.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="text-[10px] text-[#8793A3] uppercase block mb-1">Sort Attribute</label>
            <div className="flex gap-1">
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value as any)}
                className="w-full bg-[#080B10] border border-[#1E2736] rounded py-1.5 px-2.5 text-xs text-[#E8EDF3] focus:outline-none focus:border-[#00D9FF]/60"
              >
                <option value="year">Year Conducted</option>
                <option value="name">Investigation Name</option>
                <option value="oxygen">O₂ Concentration</option>
              </select>
              <button
                onClick={() => setSortAsc(!sortAsc)}
                className="p-1.5 bg-[#080B10] border border-[#1E2736] text-[#8793A3] hover:text-[#E8EDF3] rounded"
                title="Toggle sort direction"
              >
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cool Flame Toggle */}
          <div className="flex items-end">
            <button
              onClick={() => setCoolFlameOnly(!coolFlameOnly)}
              className={`w-full py-1.5 px-3 rounded text-xs border transition-colors flex items-center justify-center gap-2 ${
                coolFlameOnly
                  ? 'bg-[#151C26] text-[#64E8D2] border-[#64E8D2]/40 font-semibold'
                  : 'bg-[#080B10] text-[#8793A3] border-[#1E2736] hover:text-[#E8EDF3]'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Cool Flame Trials Only</span>
            </button>
          </div>
        </div>

        {/* Results summary bar */}
        <div className="flex items-center justify-between text-[11px] font-mono text-[#8793A3] pt-2 border-t border-[#1E2736]/60">
          <div>
            SHOWING <span className="text-[#E8EDF3] font-bold">{filteredExperiments.length}</span> OF{' '}
            <span className="text-[#E8EDF3]">{NASA_EXPERIMENTS.length}</span> EXPERIMENTAL INVESTIGATIONS
          </div>
          {filteredExperiments.length === 0 && (
            <div className="text-[#FF5C5C]">No experiments match the selected criteria.</div>
          )}
        </div>
      </div>

      {/* Cards View Layout */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExperiments.map(exp => {
            const isCompared = comparisonList.some(c => c.id === exp.id);
            return (
              <div
                key={exp.id}
                className="bg-[#10151D] border border-[#1E2736] hover:border-[#00D9FF]/40 rounded p-4 flex flex-col justify-between transition-colors group"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono text-[#00D9FF] bg-[#151C26] px-2 py-0.5 rounded border border-[#1E2736]">
                      {exp.id}
                    </span>
                    <span className="text-[10px] font-mono text-[#8793A3]">
                      {exp.yearConducted}
                    </span>
                  </div>

                  <h3 
                    onClick={() => onSelectExperiment(exp)}
                    className="text-sm font-semibold text-[#E8EDF3] group-hover:text-[#00D9FF] transition-colors cursor-pointer"
                  >
                    {exp.name}
                  </h3>
                  <div className="text-[11px] font-mono text-[#8793A3] mt-0.5">
                    {exp.programme}
                  </div>

                  {/* Cool flame tag if applicable */}
                  {exp.measurements.coolFlameObserved && (
                    <div className="mt-2 text-[10px] font-mono text-[#64E8D2] flex items-center gap-1">
                      <Flame className="w-3 h-3 text-[#64E8D2]" />
                      <span>Cool Flame Documented (~{exp.measurements.coolFlameTemperatureK} K)</span>
                    </div>
                  )}

                  {/* Conditions Matrix */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mt-3 p-2.5 bg-[#080B10] rounded border border-[#1E2736]/70">
                    <div>
                      <span className="text-[#8793A3] block text-[10px]">FUEL:</span>
                      <span className="text-[#E8EDF3] truncate block">{exp.conditions.fuelName}</span>
                    </div>
                    <div>
                      <span className="text-[#8793A3] block text-[10px]">O₂ CONC:</span>
                      <span className="text-[#00D9FF] font-bold">
                        {exp.conditions.oxygenConcentrationPct ?? 'N/A'}%
                      </span>
                    </div>
                    <div>
                      <span className="text-[#8793A3] block text-[10px]">PRESSURE:</span>
                      <span className="text-[#E8EDF3]">
                        {exp.conditions.ambientPressureKPa ? `${exp.conditions.ambientPressureKPa} kPa` : 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#8793A3] block text-[10px]">AIRFLOW:</span>
                      <span className="text-[#E8EDF3]">
                        {exp.conditions.forcedAirflowVelocityCmS !== null ? `${exp.conditions.forcedAirflowVelocityCmS} cm/s` : 'Quiescent'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-[#1E2736] text-xs font-mono">
                  <button
                    onClick={() => onSelectExperiment(exp)}
                    className="text-[#00D9FF] hover:underline"
                  >
                    View Telemetry →
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onSendToComparison(exp)}
                      className={`p-1.5 rounded transition-colors border ${
                        isCompared
                          ? 'bg-[#151C26] text-[#64E8D2] border-[#64E8D2]/40'
                          : 'bg-[#080B10] text-[#8793A3] hover:text-[#E8EDF3] border-[#1E2736]'
                      }`}
                      title={isCompared ? 'Already in Comparison Lab' : 'Add to Comparison Lab'}
                    >
                      <GitCompare className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onAskAiAboutExperiment(exp)}
                      className="p-1.5 rounded bg-[#080B10] hover:bg-[#151C26] text-[#8793A3] hover:text-[#00D9FF] border border-[#1E2736] transition-colors"
                      title="Analyze with AI"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View Layout */}
      {viewMode === 'table' && (
        <div className="border border-[#1E2736] rounded overflow-x-auto bg-[#10151D]">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#080B10] text-[#8793A3] border-b border-[#1E2736]">
              <tr>
                <th className="py-2.5 px-3">INVESTIGATION ID</th>
                <th className="py-2.5 px-3">EXPERIMENT NAME</th>
                <th className="py-2.5 px-3">FUEL</th>
                <th className="py-2.5 px-3">CATEGORY</th>
                <th className="py-2.5 px-3">O₂ %</th>
                <th className="py-2.5 px-3">PRESSURE</th>
                <th className="py-2.5 px-3">AIRFLOW</th>
                <th className="py-2.5 px-3">COOL FLAME</th>
                <th className="py-2.5 px-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2736] text-[#E8EDF3]">
              {filteredExperiments.map(exp => (
                <tr key={exp.id} className="hover:bg-[#151C26] transition-colors">
                  <td className="py-2.5 px-3 text-[#00D9FF] font-semibold whitespace-nowrap">
                    {exp.id}
                  </td>
                  <td 
                    onClick={() => onSelectExperiment(exp)}
                    className="py-2.5 px-3 font-medium text-[#E8EDF3] hover:text-[#00D9FF] cursor-pointer whitespace-nowrap"
                  >
                    {exp.name}
                  </td>
                  <td className="py-2.5 px-3 text-[#8793A3] whitespace-nowrap">
                    {exp.conditions.fuelName}
                  </td>
                  <td className="py-2.5 px-3 text-[#8793A3] whitespace-nowrap">
                    {exp.category}
                  </td>
                  <td className="py-2.5 px-3 text-[#00D9FF] font-bold whitespace-nowrap">
                    {exp.conditions.oxygenConcentrationPct ?? 'N/A'}%
                  </td>
                  <td className="py-2.5 px-3 text-[#8793A3] whitespace-nowrap">
                    {exp.conditions.ambientPressureKPa ? `${exp.conditions.ambientPressureKPa} kPa` : 'N/A'}
                  </td>
                  <td className="py-2.5 px-3 text-[#8793A3] whitespace-nowrap">
                    {exp.conditions.forcedAirflowVelocityCmS !== null ? `${exp.conditions.forcedAirflowVelocityCmS} cm/s` : '0 cm/s'}
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    {exp.measurements.coolFlameObserved ? (
                      <span className="text-[#64E8D2] font-semibold">Yes (~{exp.measurements.coolFlameTemperatureK} K)</span>
                    ) : (
                      <span className="text-[#8793A3]/50">No</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onSelectExperiment(exp)}
                        className="px-2 py-1 bg-[#080B10] hover:bg-[#151C26] text-[#00D9FF] border border-[#1E2736] rounded text-[11px]"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => onSendToComparison(exp)}
                        className="p-1 bg-[#080B10] hover:bg-[#151C26] text-[#8793A3] hover:text-[#64E8D2] border border-[#1E2736] rounded"
                        title="Add to Comparison Lab"
                      >
                        <GitCompare className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
