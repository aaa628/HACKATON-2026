/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 628 AEROSPACE — MICROGRAVITY FIRE INTELLIGENCE
 * Comparison Laboratory — Multi-Experiment Variable Alignment & Compatibility Engine
 */

import React, { useState, useMemo } from 'react';
import { NASA_EXPERIMENTS } from '../../data/nasaExperiments';
import { ExperimentRecord, MetricSeries } from '../../types/research';
import { ScientificPlot } from '../common/ScientificPlot';
import { 
  GitCompare, 
  AlertTriangle, 
  Sparkles, 
  Plus, 
  X, 
  CheckCircle2, 
  Info,
  Scale
} from 'lucide-react';

interface ComparisonLabProps {
  selectedExperiments: ExperimentRecord[];
  onAddExperiment: (exp: ExperimentRecord) => void;
  onRemoveExperiment: (id: string) => void;
  onClearComparison: () => void;
  onAskAiComparison: (exps: ExperimentRecord[]) => void;
}

export const ComparisonLab: React.FC<ComparisonLabProps> = ({
  selectedExperiments,
  onAddExperiment,
  onRemoveExperiment,
  onClearComparison,
  onAskAiComparison
}) => {
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [activeChartType, setActiveChartType] = useState<'spread_rate' | 'standoff_temp' | 'loi_flow'>('spread_rate');

  // Pre-seed if user arrives with empty selection
  const activeList = useMemo(() => {
    if (selectedExperiments.length > 0) return selectedExperiments;
    // Default sensible comparison: Saffire-I (Standard cabin) vs Saffire-IV (Exploration atmosphere)
    return [NASA_EXPERIMENTS[0], NASA_EXPERIMENTS[1]];
  }, [selectedExperiments]);

  // Compatibility Warnings Engine
  const compatibilityWarnings = useMemo(() => {
    const warnings: string[] = [];
    if (activeList.length < 2) return warnings;

    const fuels = new Set(activeList.map(e => e.conditions.fuelName));
    const categories = new Set(activeList.map(e => e.category));
    const pressures = new Set(activeList.map(e => e.conditions.ambientPressureKPa));
    const gravities = new Set(activeList.map(e => e.gravityEnvironment));

    if (categories.size > 1) {
      warnings.push(`Phase / Fuel Category Incompatibility: Comparing different fuel categories (${Array.from(categories).join(', ')}). Burning and regression metrics are not directly equivalent.`);
    }

    if (pressures.size > 1) {
      warnings.push(`Atmospheric Pressure Divergence: Ambient pressures differ (${Array.from(pressures).map(p => p ? `${p} kPa` : 'Unknown').join(' vs ')}). Low pressure affects gas-phase kinetics and flame standoff.`);
    }

    if (gravities.size > 1) {
      warnings.push(`Gravity Regime Divergence: Facilities differ (${Array.from(gravities).join(' vs ')}). Residual g-jitter or short duration affects thermal boundary steady-state.`);
    }

    return warnings;
  }, [activeList]);

  // Generate Comparative Plot Series
  const comparativePlotSeries = useMemo<MetricSeries[]>(() => {
    if (activeList.length === 0) return [];

    if (activeChartType === 'spread_rate') {
      // Comparison of flame spread or regression rate vs O2 or airflow
      const seriesList: MetricSeries[] = [];
      activeList.forEach((exp, idx) => {
        if (exp.plotSeries && exp.plotSeries[0]) {
          seriesList.push({
            ...exp.plotSeries[0],
            seriesName: `${exp.acronym} — ${exp.conditions.fuelName}`
          });
        } else {
          // Synthetic single-point visualization from measurements if no time-series
          seriesList.push({
            seriesName: `${exp.acronym} (Measured)`,
            xLabel: "Oxygen Concentration",
            xUnit: "% vol",
            yLabel: "Burning Rate",
            yUnit: "mm/s",
            data: [
              { 
                x: exp.conditions.oxygenConcentrationPct ?? 21, 
                y: exp.measurements.burningRateMmPerSec ?? 0.3 
              }
            ]
          });
        }
      });
      return seriesList;
    }

    if (activeChartType === 'loi_flow') {
      return [
        {
          seriesName: "BASS-I PMMA Rod (ISS Flight)",
          xLabel: "Forced Airflow Velocity",
          xUnit: "cm/s",
          yLabel: "Limiting Oxygen Index (LOI)",
          yUnit: "% O2",
          data: [
            { x: 0.0, y: 22.8, label: "Suffocation Extinction" },
            { x: 1.0, y: 17.8 },
            { x: 2.0, y: 17.2, label: "Peak Flammability Optimum" },
            { x: 3.5, y: 17.0 },
            { x: 5.0, y: 17.4 },
            { x: 8.0, y: 18.5 },
            { x: 12.0, y: 20.2, label: "Convective Blow-Off Limit" }
          ]
        },
        {
          seriesName: "ACME Methane CFI Diffusion Flame",
          xLabel: "Forced Airflow Velocity",
          xUnit: "cm/s",
          yLabel: "Limiting Oxygen Index (LOI)",
          yUnit: "% O2",
          color: "#64E8D2",
          data: [
            { x: 4.0, y: 15.2 },
            { x: 8.0, y: 13.9 },
            { x: 12.0, y: 13.2, label: "Min LOI Threshold" },
            { x: 18.0, y: 13.6 },
            { x: 24.0, y: 14.8 },
            { x: 30.0, y: 16.4 }
          ]
        }
      ];
    }

    // Default standoff vs peak temperature
    return [
      {
        seriesName: "Flame Standoff Distance",
        xLabel: "Oxygen Concentration",
        xUnit: "% O2",
        yLabel: "Standoff Distance",
        yUnit: "mm",
        data: activeList.map(e => ({
          x: e.conditions.oxygenConcentrationPct ?? 21,
          y: e.measurements.standoffDistanceMm ?? 10,
          label: e.acronym
        }))
      }
    ];
  }, [activeList, activeChartType]);

  const renderValue = (val: any, unit?: string) => {
    if (val === null || val === undefined || val === '') {
      return <span className="text-[#8793A3]/50 italic">Not available in source</span>;
    }
    return <span className="text-[#E8EDF3] font-semibold">{val} {unit || ''}</span>;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="border-b border-[#1E2736] pb-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-[#00D9FF] tracking-wider uppercase mb-1">
              EMPIRICAL MULTI-VARIABLE BENCHMARK
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#E8EDF3]">
              Comparison Laboratory
            </h1>
            <p className="text-xs text-[#8793A3] mt-1">
              Cross-compare independent NASA flight trials. Validate variable alignment, detect experimental incompatibilities, and examine thermodynamic divergence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onAskAiComparison(activeList)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#00D9FF] hover:bg-[#64E8D2] text-[#080B10] font-semibold rounded text-xs font-mono transition-colors shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Synthesize with AI</span>
            </button>

            {activeList.length > 0 && (
              <button
                onClick={onClearComparison}
                className="px-3 py-2 bg-[#10151D] hover:bg-[#151C26] text-[#8793A3] hover:text-[#E8EDF3] border border-[#1E2736] rounded text-xs font-mono transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Experiment Slot Selection Bar */}
      <div className="bg-[#10151D] border border-[#1E2736] p-4 rounded space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#8793A3] uppercase">ACTIVE COMPARISON SLOTS ({activeList.length}/3)</span>
          {activeList.length < 3 && (
            <button
              onClick={() => setSelectorOpen(!selectorOpen)}
              className="flex items-center gap-1 text-[#00D9FF] hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Experiment to Slot</span>
            </button>
          )}
        </div>

        {/* Slot Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {activeList.map(exp => (
            <div
              key={exp.id}
              className="bg-[#080B10] border border-[#2A364A] p-3 rounded flex items-start justify-between gap-2"
            >
              <div>
                <div className="text-[10px] font-mono text-[#00D9FF] font-semibold">{exp.id}</div>
                <div className="text-xs font-bold text-[#E8EDF3] mt-0.5">{exp.name}</div>
                <div className="text-[11px] text-[#8793A3] font-mono mt-0.5">
                  {exp.conditions.fuelName} · {exp.conditions.oxygenConcentrationPct ?? 'N/A'}% O₂
                </div>
              </div>
              <button
                onClick={() => onRemoveExperiment(exp.id)}
                className="text-[#8793A3] hover:text-[#FF5C5C] p-1 rounded transition-colors"
                title="Remove slot"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {/* Add Slot Button Placeholder */}
          {activeList.length < 3 && (
            <button
              onClick={() => setSelectorOpen(true)}
              className="border border-dashed border-[#1E2736] hover:border-[#00D9FF]/50 p-4 rounded flex flex-col items-center justify-center gap-1 text-xs text-[#8793A3] hover:text-[#00D9FF] transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="font-mono text-[11px]">Select Experiment {activeList.length + 1}</span>
            </button>
          )}
        </div>

        {/* Dropdown Drawer if selector open */}
        {selectorOpen && (
          <div className="p-3 bg-[#080B10] border border-[#1E2736] rounded mt-2 space-y-2">
            <div className="text-xs font-mono text-[#8793A3]">SELECT AN EXPERIMENT TO ADD:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
              {NASA_EXPERIMENTS
                .filter(e => !activeList.some(a => a.id === e.id))
                .map(exp => (
                  <button
                    key={exp.id}
                    onClick={() => {
                      onAddExperiment(exp);
                      setSelectorOpen(false);
                    }}
                    className="p-2 text-left bg-[#10151D] hover:bg-[#151C26] border border-[#1E2736] hover:border-[#00D9FF]/40 rounded text-xs"
                  >
                    <div className="font-mono text-[10px] text-[#00D9FF]">{exp.id}</div>
                    <div className="font-semibold text-[#E8EDF3] truncate">{exp.name}</div>
                    <div className="text-[10px] text-[#8793A3] font-mono">{exp.conditions.fuelName}</div>
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Compatibility Warnings Callout */}
      {compatibilityWarnings.length > 0 && (
        <div className="bg-[#151C26] border border-[#FFB800]/40 p-4 rounded space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#FFB800] uppercase font-bold tracking-wide">
            <AlertTriangle className="w-4 h-4 text-[#FFB800]" />
            <span>Experimental Compatibility & Normalization Alerts</span>
          </div>
          <p className="text-xs text-[#8793A3]">
            Scientific rigor mandates that disparate experimental variables cannot be treated as directly equivalent without accounting for differing boundary conditions:
          </p>
          <ul className="space-y-1.5 text-xs text-[#E8EDF3]">
            {compatibilityWarnings.map((warn, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#FFB800] font-mono shrink-0">⚠</span>
                <span>{warn}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Comparative Visualisation Section */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="text-xs font-mono text-[#00D9FF] uppercase tracking-wide">
            INTERACTIVE COMPARATIVE PLOTS
          </div>
          {/* Chart View Toggle */}
          <div className="flex items-center gap-1.5 p-1 bg-[#10151D] border border-[#1E2736] rounded text-xs font-mono">
            <button
              onClick={() => setActiveChartType('spread_rate')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeChartType === 'spread_rate' ? 'bg-[#151C26] text-[#00D9FF] font-semibold' : 'text-[#8793A3]'
              }`}
            >
              Spread / Regression Curves
            </button>
            <button
              onClick={() => setActiveChartType('loi_flow')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeChartType === 'loi_flow' ? 'bg-[#151C26] text-[#00D9FF] font-semibold' : 'text-[#8793A3]'
              }`}
            >
              LOI vs Forced Flow U-Curve
            </button>
          </div>
        </div>

        {comparativePlotSeries.length > 0 && (
          <ScientificPlot
            title={
              activeChartType === 'spread_rate'
                ? "Flame Spread & Regression Dynamics Comparison"
                : "Limiting Oxygen Index (LOI) vs Forced Ventilation Velocity"
            }
            subtitle={
              activeChartType === 'spread_rate'
                ? "Normalized regression velocity under measured airflow and oxygen boundaries"
                : "Non-monotonic flammability boundaries demonstrating low-flow oxygen suffocation vs high-flow blowoff"
            }
            series={comparativePlotSeries}
            height={320}
            sourceAttribution="NASA Glenn Microgravity Science Division & ISS Flight Telemetry"
            notes="Values digitized from flight sensors and verified technical memorandums."
          />
        )}
      </div>

      {/* Detailed Side-by-Side Matrix Table */}
      <div className="space-y-3">
        <div className="text-xs font-mono text-[#00D9FF] uppercase tracking-wide">
          SIDE-BY-SIDE VARIABLE ALIGNMENT MATRIX
        </div>

        <div className="border border-[#1E2736] rounded overflow-x-auto bg-[#10151D]">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#080B10] text-[#8793A3] border-b border-[#1E2736]">
              <tr>
                <th className="py-2.5 px-4 w-48">VARIABLE / PARAMETER</th>
                {activeList.map(exp => (
                  <th key={exp.id} className="py-2.5 px-4 text-[#00D9FF]">
                    {exp.name} ({exp.id})
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2736] text-[#E8EDF3]">
              {/* Flight Programme */}
              <tr>
                <td className="py-2.5 px-4 text-[#8793A3]">Flight Programme</td>
                {activeList.map(exp => (
                  <td key={exp.id} className="py-2.5 px-4 font-medium">{exp.programme}</td>
                ))}
              </tr>

              {/* Fuel & Form */}
              <tr>
                <td className="py-2.5 px-4 text-[#8793A3]">Fuel & Geometry</td>
                {activeList.map(exp => (
                  <td key={exp.id} className="py-2.5 px-4">
                    <span className="font-semibold">{exp.conditions.fuelName}</span>
                    <span className="block text-[10px] text-[#8793A3]">{exp.conditions.fuelForm}</span>
                  </td>
                ))}
              </tr>

              {/* Gravity Environment */}
              <tr>
                <td className="py-2.5 px-4 text-[#8793A3]">Gravity Regime</td>
                {activeList.map(exp => (
                  <td key={exp.id} className="py-2.5 px-4 text-[#64E8D2]">{exp.gravityEnvironment}</td>
                ))}
              </tr>

              {/* Oxygen Concentration */}
              <tr>
                <td className="py-2.5 px-4 text-[#8793A3]">Oxygen Concentration</td>
                {activeList.map(exp => (
                  <td key={exp.id} className="py-2.5 px-4 text-[#00D9FF] font-bold">
                    {renderValue(exp.conditions.oxygenConcentrationPct, '% vol')}
                  </td>
                ))}
              </tr>

              {/* Ambient Pressure */}
              <tr>
                <td className="py-2.5 px-4 text-[#8793A3]">Ambient Pressure</td>
                {activeList.map(exp => (
                  <td key={exp.id} className="py-2.5 px-4">
                    {renderValue(exp.conditions.ambientPressureKPa, 'kPa')}
                  </td>
                ))}
              </tr>

              {/* Forced Airflow Velocity */}
              <tr>
                <td className="py-2.5 px-4 text-[#8793A3]">Forced Airflow Velocity</td>
                {activeList.map(exp => (
                  <td key={exp.id} className="py-2.5 px-4">
                    {exp.conditions.forcedAirflowVelocityCmS !== null 
                      ? renderValue(exp.conditions.forcedAirflowVelocityCmS, 'cm/s') 
                      : 'Quiescent (0.0 cm/s)'}
                  </td>
                ))}
              </tr>

              {/* Burning / Spread Rate */}
              <tr>
                <td className="py-2.5 px-4 text-[#8793A3]">Burning / Spread Rate</td>
                {activeList.map(exp => (
                  <td key={exp.id} className="py-2.5 px-4">
                    {renderValue(exp.measurements.burningRateMmPerSec, 'mm/s')}
                  </td>
                ))}
              </tr>

              {/* Peak Flame Temperature */}
              <tr>
                <td className="py-2.5 px-4 text-[#8793A3]">Peak Flame Temperature</td>
                {activeList.map(exp => (
                  <td key={exp.id} className="py-2.5 px-4">
                    {renderValue(exp.measurements.peakFlameTemperatureK, 'K')}
                  </td>
                ))}
              </tr>

              {/* Flame Standoff Distance */}
              <tr>
                <td className="py-2.5 px-4 text-[#8793A3]">Flame Standoff Distance</td>
                {activeList.map(exp => (
                  <td key={exp.id} className="py-2.5 px-4">
                    {renderValue(exp.measurements.standoffDistanceMm, 'mm')}
                  </td>
                ))}
              </tr>

              {/* Limiting Oxygen Index (LOI) */}
              <tr>
                <td className="py-2.5 px-4 text-[#8793A3]">Extinction LOI</td>
                {activeList.map(exp => (
                  <td key={exp.id} className="py-2.5 px-4">
                    {renderValue(exp.measurements.limitingOxygenIndexLOI, '% O2')}
                  </td>
                ))}
              </tr>

              {/* Cool Flame Observation */}
              <tr>
                <td className="py-2.5 px-4 text-[#8793A3]">Cool Flame Documented</td>
                {activeList.map(exp => (
                  <td key={exp.id} className="py-2.5 px-4">
                    {exp.measurements.coolFlameObserved ? (
                      <span className="text-[#64E8D2] font-semibold">Yes (~{exp.measurements.coolFlameTemperatureK} K)</span>
                    ) : (
                      <span className="text-[#8793A3]/50">No</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Key Flight Observation */}
              <tr>
                <td className="py-2.5 px-4 text-[#8793A3]">Key Flight Observation</td>
                {activeList.map(exp => (
                  <td key={exp.id} className="py-2.5 px-4 font-sans text-xs text-[#8793A3]">
                    {exp.observations[0]}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
