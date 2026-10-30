/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 628 AEROSPACE — MICROGRAVITY FIRE INTELLIGENCE
 * Dedicated Scientific Experiment Profile Drawer & Telemetry Inspector
 */

import React from 'react';
import { ExperimentRecord } from '../../types/research';
import { ScientificPlot } from '../common/ScientificPlot';
import { 
  X, 
  ExternalLink, 
  GitCompare, 
  Sparkles, 
  FileText, 
  AlertTriangle,
  Flame,
  CheckCircle2
} from 'lucide-react';

interface ExperimentDetailModalProps {
  experiment: ExperimentRecord | null;
  onClose: () => void;
  onSendToComparison: (exp: ExperimentRecord) => void;
  onAskAiAboutExperiment: (exp: ExperimentRecord) => void;
}

export const ExperimentDetailModal: React.FC<ExperimentDetailModalProps> = ({
  experiment,
  onClose,
  onSendToComparison,
  onAskAiAboutExperiment
}) => {
  if (!experiment) return null;

  const renderValueOrUnavailable = (val: any, unit?: string) => {
    if (val === null || val === undefined || val === '') {
      return (
        <span className="text-[#8793A3]/60 italic font-mono text-xs">
          Not available in source data
        </span>
      );
    }
    return (
      <span className="text-[#E8EDF3] font-mono text-xs font-semibold tabular-nums">
        {val} {unit ? <span className="text-[#8793A3] font-normal">{unit}</span> : ''}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="bg-[#080B10] border border-[#1E2736] rounded w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 bg-[#10151D] border-b border-[#1E2736] flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#8793A3] mb-1">
              <span className="text-[#00D9FF] font-semibold">{experiment.id}</span>
              <span>·</span>
              <span>{experiment.programme}</span>
              <span>·</span>
              <span className="text-[#64E8D2]">{experiment.gravityEnvironment}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#E8EDF3]">
              {experiment.name}
            </h2>
            <p className="text-xs text-[#8793A3] mt-0.5">
              {experiment.fullTitle} (Conducted: {experiment.yearConducted})
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onSendToComparison(experiment)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#151C26] hover:bg-[#1E2736] text-[#E8EDF3] border border-[#1E2736] rounded text-xs font-mono transition-colors"
              title="Add this experiment to Comparison Lab"
            >
              <GitCompare className="w-3.5 h-3.5 text-[#00D9FF]" />
              <span className="hidden sm:inline">Compare</span>
            </button>
            <button
              onClick={() => onAskAiAboutExperiment(experiment)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00D9FF] hover:bg-[#64E8D2] text-[#080B10] font-semibold rounded text-xs font-mono transition-colors shadow-sm"
              title="Query AI regarding this experiment"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Analyze with AI</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#8793A3] hover:text-[#E8EDF3] hover:bg-[#151C26] rounded transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs text-[#E8EDF3]">
          {/* Cool Flame Alert if present */}
          {experiment.measurements.coolFlameObserved && (
            <div className="bg-[#151C26] border border-[#64E8D2]/40 p-3.5 rounded flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#64E8D2] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-mono font-bold text-[#64E8D2] uppercase tracking-wide">
                  Quasi-Steady Cool Flame Phenomenon Observed
                </div>
                <p className="text-xs text-[#E8EDF3] mt-0.5">
                  Second-stage low-temperature (T ≈ {experiment.measurements.coolFlameTemperatureK ?? 780} K) combustion detected following visible flame radiative extinction. Zero visible emission; ongoing fuel consumption.
                </p>
              </div>
            </div>
          )}

          {/* 1. Experimental Conditions Matrix */}
          <div>
            <h3 className="text-xs font-mono text-[#00D9FF] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <span>01. EXPERIMENTAL CONDITIONS & ATMOSPHERE</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#10151D] border border-[#1E2736] p-4 rounded">
              <div>
                <div className="text-[10px] font-mono text-[#8793A3]">FUEL NAME & FORM</div>
                <div className="font-semibold text-[#E8EDF3] text-xs mt-0.5">{experiment.conditions.fuelName}</div>
                <div className="text-[10px] text-[#8793A3]">{experiment.conditions.fuelForm}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#8793A3]">OXYGEN CONCENTRATION</div>
                <div className="mt-0.5">{renderValueOrUnavailable(experiment.conditions.oxygenConcentrationPct, '% vol')}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#8793A3]">AMBIENT PRESSURE</div>
                <div className="mt-0.5">{renderValueOrUnavailable(experiment.conditions.ambientPressureKPa, 'kPa')}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#8793A3]">FORCED AIRFLOW VELOCITY</div>
                <div className="mt-0.5">
                  {experiment.conditions.forcedAirflowVelocityCmS !== null 
                    ? renderValueOrUnavailable(experiment.conditions.forcedAirflowVelocityCmS, 'cm/s')
                    : <span className="text-[#64E8D2] font-mono">Quiescent (0.0 cm/s)</span>}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#8793A3]">AMBIENT ATMOSPHERE</div>
                <div className="text-xs font-mono text-[#E8EDF3] mt-0.5">{experiment.conditions.ambientAtmosphere}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#8793A3]">IGNITION PROTOCOL</div>
                <div className="text-xs text-[#E8EDF3] mt-0.5">{experiment.conditions.ignitionMethod || 'Standard'}</div>
              </div>
            </div>
          </div>

          {/* 2. Scientific Measurements Matrix */}
          <div>
            <h3 className="text-xs font-mono text-[#00D9FF] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <span>02. SCIENTIFIC MEASUREMENTS & BOUNDARIES</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#10151D] border border-[#1E2736] p-4 rounded">
              <div>
                <div className="text-[10px] font-mono text-[#8793A3]">FLAME LENGTH</div>
                <div className="mt-0.5">{renderValueOrUnavailable(experiment.measurements.flameLengthMm, 'mm')}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#8793A3]">STANDOFF DISTANCE</div>
                <div className="mt-0.5">{renderValueOrUnavailable(experiment.measurements.standoffDistanceMm, 'mm')}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#8793A3]">BURNING / SPREAD RATE</div>
                <div className="mt-0.5">{renderValueOrUnavailable(experiment.measurements.burningRateMmPerSec, 'mm/s')}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#8793A3]">PEAK FLAME TEMP</div>
                <div className="mt-0.5">{renderValueOrUnavailable(experiment.measurements.peakFlameTemperatureK, 'K')}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#8793A3]">LIMITING O2 INDEX (LOI)</div>
                <div className="mt-0.5">{renderValueOrUnavailable(experiment.measurements.limitingOxygenIndexLOI, '% O2')}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#8793A3]">RADIATIVE HEAT FLUX</div>
                <div className="mt-0.5">{renderValueOrUnavailable(experiment.measurements.radiativeHeatFluxKWm2, 'kW/m²')}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#8793A3]">EXTINCTION AIRFLOW</div>
                <div className="mt-0.5">{renderValueOrUnavailable(experiment.measurements.extinctionAirflowVelocityCmS, 'cm/s')}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#8793A3]">DATASET PROVENANCE</div>
                <div className="text-[11px] font-mono text-[#64E8D2] mt-0.5">{experiment.datasetAvailability}</div>
              </div>
            </div>
          </div>

          {/* 3. Interactive Plot (if series is available) */}
          {experiment.plotSeries && experiment.plotSeries.length > 0 && (
            <div>
              <h3 className="text-xs font-mono text-[#00D9FF] uppercase tracking-wider mb-2.5">
                03. EXPERIMENTAL TELEMETRY & MEASURED CURVES
              </h3>
              <ScientificPlot
                title={experiment.plotSeries[0].seriesName}
                subtitle={`Measured values from ${experiment.name} (${experiment.investigationId})`}
                series={experiment.plotSeries}
                height={280}
                sourceAttribution={`NASA Technical Report ${experiment.ntrsAccessionNumber || ''}`}
              />
            </div>
          )}

          {/* 4. Empirical Observations & Findings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#10151D] border border-[#1E2736] p-4 rounded space-y-2">
              <div className="text-[11px] font-mono text-[#00D9FF] uppercase tracking-wider">
                EMPIRICAL OBSERVATIONS
              </div>
              <ul className="space-y-2 text-xs text-[#E8EDF3]">
                {experiment.observations.map((obs, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#00D9FF] font-mono shrink-0">▪</span>
                    <span>{obs}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#10151D] border border-[#1E2736] p-4 rounded space-y-2">
              <div className="text-[11px] font-mono text-[#64E8D2] uppercase tracking-wider">
                SAFETY & RESEARCH FINDINGS
              </div>
              <ul className="space-y-2 text-xs text-[#E8EDF3]">
                {experiment.keyFindings.map((finding, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#64E8D2] font-mono shrink-0">▪</span>
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 5. Citation & Provenance Links */}
          <div className="bg-[#10151D] border border-[#1E2736] p-4 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#8793A3]">
            <div>
              <span className="text-[#E8EDF3]">PRINCIPAL INVESTIGATOR:</span> {experiment.principalInvestigator} ({experiment.leadInstitution})
              {experiment.ntrsAccessionNumber && (
                <div className="text-[11px] text-[#8793A3] mt-0.5">
                  NASA NTRS Accession: #{experiment.ntrsAccessionNumber}
                </div>
              )}
            </div>

            {experiment.doi && (
              <a
                href={`https://doi.org/${experiment.doi}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#151C26] text-[#00D9FF] border border-[#1E2736] hover:border-[#00D9FF]/40 transition-colors whitespace-nowrap"
              >
                <span>View DOI Publication</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
