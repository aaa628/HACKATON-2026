/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 628 AEROSPACE — MICROGRAVITY FIRE INTELLIGENCE
 * Overview Dashboard — Platform Rationale, Dataset Metrics & Combustion Physics
 */

import React, { useState } from 'react';
import { NASA_EXPERIMENTS } from '../../data/nasaExperiments';
import { RESEARCH_LIBRARY } from '../../data/researchLibrary';
import { SAFETY_INSIGHTS } from '../../data/safetyInsights';
import { DIMENSIONLESS_NUMBERS, REGIME_COMPARISONS } from '../../data/physicsComparison';
import { ExperimentRecord } from '../../types/research';
import { 
  Flame, 
  ArrowRight, 
  Layers, 
  Activity, 
  ExternalLink,
  Info
} from 'lucide-react';

interface OverviewDashboardProps {
  onSelectExperiment: (exp: ExperimentRecord) => void;
  onNavigateTab: (tab: any) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onSelectExperiment,
  onNavigateTab
}) => {
  const [activePhysicsDimension, setActivePhysicsDimension] = useState<number>(0);
  const featuredExperiments = NASA_EXPERIMENTS.slice(0, 4);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Platform Header */}
      <div className="border-b border-[#1E2736] pb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-[#00D9FF] tracking-wider uppercase mb-1">
              628 AEROSPACE · SCIENTIFIC RESEARCH INTELLIGENCE
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#E8EDF3]">
              MICROGRAVITY FIRE INTELLIGENCE
            </h1>
            <p className="text-sm text-[#8793A3] mt-1 max-w-3xl">
              Understanding combustion behaviour beyond Earth's gravity to engineer fail-safe spacecraft fire protection for Artemis, Lunar Surface Habitats, and deep-space missions.
            </p>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateTab('experiments')}
              className="flex items-center gap-2 px-3.5 py-2 bg-[#151C26] hover:bg-[#1E2736] text-[#E8EDF3] border border-[#1E2736] rounded text-xs font-mono transition-colors"
            >
              <span>Explore All Experiments</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#00D9FF]" />
            </button>
            <button
              onClick={() => onNavigateTab('safety-insights')}
              className="flex items-center gap-2 px-3.5 py-2 bg-[#00D9FF] hover:bg-[#64E8D2] text-[#080B10] font-semibold rounded text-xs font-mono transition-colors shadow-sm"
            >
              <span>View Ranked Safety Insights</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#080B10]" />
            </button>
          </div>
        </div>
      </div>

      {/* A. Platform Introduction & Rationale */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#10151D] border border-[#1E2736] p-5 rounded space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00D9FF] uppercase tracking-wide">
            <Flame className="w-3.5 h-3.5" />
            <span>The Physics Challenge: Flame in Freefall</span>
          </div>
          <p className="text-sm text-[#E8EDF3] leading-relaxed">
            On Earth, gravity creates natural buoyancy: hot, low-density combustion gases accelerate upward (1–3 m/s), creating the familiar elongated teardrop flame while dragging fresh oxidizer into the base.
          </p>
          <p className="text-xs text-[#8793A3] leading-relaxed">
            In orbital microgravity (10⁻⁵ g), buoyant convection vanishes completely (Gr ≈ 0). Without upward chimney drafts, combustion shifts from advection to molecular diffusion. Flames become spherical, soot agglomerates within the reaction zone, radiant cooling can trigger low-temperature <span className="text-[#64E8D2] font-semibold">cool flames</span> (600–900 K), and fires become critically dependent on cabin forced ventilation loops (1–5 cm/s). Terrestrial flammability standards such as NASA-STD-6001B fail to capture these zero-buoyancy survival regimes.
          </p>
        </div>

        {/* B. Research Statistics (Explicit Prototype Dataset Labels) */}
        <div className="bg-[#10151D] border border-[#1E2736] p-5 rounded flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#8793A3] uppercase tracking-wide">Prototype Dataset</span>
              <span className="text-[10px] font-mono text-[#64E8D2] bg-[#151C26] px-2 py-0.5 rounded border border-[#1E2736]">VERIFIED NASA</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <div className="text-2xl font-mono font-bold text-[#E8EDF3] tabular-nums">
                  {NASA_EXPERIMENTS.length}
                </div>
                <div className="text-[11px] text-[#8793A3] mt-0.5">Flight & Drop Tests</div>
              </div>
              <div>
                <div className="text-2xl font-mono font-bold text-[#00D9FF] tabular-nums">
                  {RESEARCH_LIBRARY.length}
                </div>
                <div className="text-[11px] text-[#8793A3] mt-0.5">NASA Technical Papers</div>
              </div>
              <div>
                <div className="text-2xl font-mono font-bold text-[#64E8D2] tabular-nums">
                  {SAFETY_INSIGHTS.length}
                </div>
                <div className="text-[11px] text-[#8793A3] mt-0.5">Ranked Fire Insights</div>
              </div>
              <div>
                <div className="text-2xl font-mono font-bold text-[#E8EDF3] tabular-nums">
                  4
                </div>
                <div className="text-[11px] text-[#8793A3] mt-0.5">Fuel Classes Analyzed</div>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#1E2736]/70 text-[10px] font-mono text-[#8793A3]/80">
            Source: NASA Technical Reports Server (NTRS) & CIR ISS Mission Logs
          </div>
        </div>
      </div>

      {/* D. Scientific Visualisation: 1g vs Microgravity Physics Comparison */}
      <section className="bg-[#10151D] border border-[#1E2736] p-6 rounded space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E2736] pb-4">
          <div>
            <div className="text-xs font-mono text-[#00D9FF] uppercase tracking-wide">
              EMPIRICAL THERMODYNAMICS
            </div>
            <h2 className="text-lg font-bold text-[#E8EDF3] tracking-tight">
              Combustion Regimes: 1.0g Earth Baseline vs. Microgravity (10⁻⁵ g)
            </h2>
          </div>
          <div className="text-xs font-mono text-[#8793A3]">
            Select parameter dimension:
          </div>
        </div>

        {/* Dimension Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {REGIME_COMPARISONS.map((comp, idx) => {
            const isActive = activePhysicsDimension === idx;
            return (
              <button
                key={idx}
                onClick={() => setActivePhysicsDimension(idx)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-colors border whitespace-nowrap ${
                  isActive
                    ? 'bg-[#151C26] text-[#00D9FF] border-[#00D9FF]/40 font-semibold'
                    : 'bg-[#080B10] text-[#8793A3] border-[#1E2736] hover:text-[#E8EDF3]'
                }`}
              >
                {comp.dimension}
              </button>
            );
          })}
        </div>

        {/* Active Dimension Comparison Cards */}
        {(() => {
          const comp = REGIME_COMPARISONS[activePhysicsDimension];
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1g Normal Gravity Card */}
                <div className="bg-[#080B10] border border-[#1E2736] p-4 rounded space-y-3">
                  <div className="flex items-center justify-between border-b border-[#1E2736] pb-2">
                    <span className="text-xs font-mono text-[#8793A3] uppercase">Terrestrial (1.0 g)</span>
                    <span className="text-xs font-mono text-[#FFB800]">{comp.normalGravity1g.regime}</span>
                  </div>
                  <p className="text-xs text-[#E8EDF3] leading-relaxed">
                    {comp.normalGravity1g.description}
                  </p>
                  <div className="text-[11px] font-mono space-y-1.5 pt-2 border-t border-[#1E2736]/60 text-[#8793A3]">
                    <div>PRIMARY DRIVER: <span className="text-[#E8EDF3]">{comp.normalGravity1g.primaryDriver}</span></div>
                    <div>VELOCITY: <span className="text-[#E8EDF3]">{comp.normalGravity1g.typicalVelocity}</span></div>
                    <div>TIMESCALE: <span className="text-[#E8EDF3]">{comp.normalGravity1g.characteristicTime}</span></div>
                  </div>
                </div>

                {/* 0g Microgravity Card */}
                <div className="bg-[#080B10] border border-[#00D9FF]/30 p-4 rounded space-y-3">
                  <div className="flex items-center justify-between border-b border-[#1E2736] pb-2">
                    <span className="text-xs font-mono text-[#00D9FF] uppercase">Microgravity (10⁻⁵ g)</span>
                    <span className="text-xs font-mono text-[#64E8D2] font-semibold">{comp.microgravity0g.regime}</span>
                  </div>
                  <p className="text-xs text-[#E8EDF3] leading-relaxed">
                    {comp.microgravity0g.description}
                  </p>
                  <div className="text-[11px] font-mono space-y-1.5 pt-2 border-t border-[#1E2736]/60 text-[#8793A3]">
                    <div>PRIMARY DRIVER: <span className="text-[#64E8D2]">{comp.microgravity0g.primaryDriver}</span></div>
                    <div>VELOCITY: <span className="text-[#64E8D2]">{comp.microgravity0g.typicalVelocity}</span></div>
                    <div>TIMESCALE: <span className="text-[#64E8D2]">{comp.microgravity0g.characteristicTime}</span></div>
                  </div>
                </div>
              </div>

              {/* Spacecraft Safety Implication Callout */}
              <div className="bg-[#151C26] border border-[#2A364A] p-3.5 rounded text-xs">
                <span className="text-[#00D9FF] font-mono font-semibold uppercase tracking-wide mr-2">
                  Spacecraft Safety Implication:
                </span>
                <span className="text-[#E8EDF3]">
                  {comp.spacecraftSafetyRelevance}
                </span>
              </div>
            </div>
          );
        })()}

        {/* Governing Dimensionless Numbers Table */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-[#8793A3] uppercase">Governing Dimensionless Fluid Mechanics Parameters</span>
            <span className="text-[10px] font-mono text-[#8793A3]">Scaling laws for zero-g</span>
          </div>
          <div className="overflow-x-auto border border-[#1E2736] rounded">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#080B10] text-[#8793A3] border-b border-[#1E2736]">
                <tr>
                  <th className="py-2.5 px-3">PARAMETER</th>
                  <th className="py-2.5 px-3">FORMULA</th>
                  <th className="py-2.5 px-3">1.0g BASELINE</th>
                  <th className="py-2.5 px-3">MICROGRAVITY (10⁻⁵ g)</th>
                  <th className="py-2.5 px-3">PHYSICAL SIGNIFICANCE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2736] text-[#E8EDF3] bg-[#10151D]">
                {DIMENSIONLESS_NUMBERS.map((dim, idx) => (
                  <tr key={idx} className="hover:bg-[#151C26] transition-colors">
                    <td className="py-2 px-3 font-semibold text-[#00D9FF] whitespace-nowrap">
                      {dim.parameterName} ({dim.symbol})
                    </td>
                    <td className="py-2 px-3 text-[#64E8D2] whitespace-nowrap">
                      {dim.formula}
                    </td>
                    <td className="py-2 px-3 text-[#8793A3] whitespace-nowrap">
                      {dim.earthValue1g}
                    </td>
                    <td className="py-2 px-3 text-[#E8EDF3] font-medium whitespace-nowrap">
                      {dim.microgravityValue}
                    </td>
                    <td className="py-2 px-3 text-xs font-sans text-[#8793A3]">
                      {dim.physicalSignificance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* C. Featured NASA Research Investigations */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-[#00D9FF] uppercase tracking-wide">
              CORE INVESTIGATIONS
            </div>
            <h2 className="text-lg font-bold text-[#E8EDF3]">
              Featured NASA Flight Combustion Experiments
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('experiments')}
            className="text-xs font-mono text-[#00D9FF] hover:underline flex items-center gap-1"
          >
            <span>View all {NASA_EXPERIMENTS.length}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredExperiments.map(exp => (
            <div
              key={exp.id}
              onClick={() => onSelectExperiment(exp)}
              className="bg-[#10151D] border border-[#1E2736] hover:border-[#00D9FF]/50 p-4 rounded transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono text-[#8793A3]">{exp.programme}</span>
                    <h3 className="text-sm font-semibold text-[#E8EDF3] group-hover:text-[#00D9FF] transition-colors mt-0.5">
                      {exp.name}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#151C26] text-[#64E8D2] border border-[#1E2736] shrink-0">
                    {exp.category}
                  </span>
                </div>

                <div className="text-xs text-[#8793A3] mt-2 line-clamp-2">
                  {exp.observations[0]}
                </div>

                {/* Experimental parameters strip */}
                <div className="grid grid-cols-3 gap-2 text-[10px] font-mono mt-3 pt-3 border-t border-[#1E2736] text-[#8793A3]">
                  <div>
                    <span>FUEL:</span> <span className="text-[#E8EDF3] block truncate">{exp.conditions.fuelName}</span>
                  </div>
                  <div>
                    <span>O₂ CONC:</span> <span className="text-[#00D9FF] block font-bold">{exp.conditions.oxygenConcentrationPct ?? 'N/A'}%</span>
                  </div>
                  <div>
                    <span>PRESSURE:</span> <span className="text-[#E8EDF3] block">{exp.conditions.ambientPressureKPa ?? 'N/A'} kPa</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono mt-3 pt-2 text-[#8793A3]">
                <span>PI: {exp.principalInvestigator}</span>
                <span className="text-[#00D9FF] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Inspect Profile →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* E. Latest Research Activity & Primary Literature */}
      <section className="bg-[#10151D] border border-[#1E2736] p-5 rounded space-y-4">
        <div className="flex items-center justify-between border-b border-[#1E2736] pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#64E8D2]" />
            <h3 className="text-sm font-semibold text-[#E8EDF3]">
              Recently Indexed NASA Technical Documents
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab('library')}
            className="text-xs font-mono text-[#00D9FF] hover:underline"
          >
            Open Library ({RESEARCH_LIBRARY.length})
          </button>
        </div>

        <div className="divide-y divide-[#1E2736]/60">
          {RESEARCH_LIBRARY.slice(0, 3).map(doc => (
            <div key={doc.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#8793A3]">
                  <span className="text-[#64E8D2]">{doc.journalOrSeries}</span>
                  <span>·</span>
                  <span>{doc.publicationDate}</span>
                </div>
                <div className="text-sm font-medium text-[#E8EDF3]">
                  {doc.title}
                </div>
                <div className="text-xs text-[#8793A3] line-clamp-1">
                  {doc.keyTakeaway}
                </div>
              </div>

              {doc.ntrsUrl && (
                <a
                  href={doc.ntrsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[11px] font-mono text-[#8793A3] hover:text-[#00D9FF] border border-[#1E2736] hover:border-[#2A364A] transition-colors"
                >
                  <span>NTRS Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
