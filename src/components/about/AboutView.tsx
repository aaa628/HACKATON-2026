/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 628 AEROSPACE — MICROGRAVITY FIRE INTELLIGENCE
 * Platform Methodology, Provenance, and Technical Architecture
 */

import React from 'react';
import { 
  Layers, 
  Database, 
  Cpu, 
  ShieldCheck, 
  FileCode, 
  ExternalLink,
  Flame,
  CheckCircle2
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 font-sans">
      {/* Header Banner */}
      <div className="border-b border-[#1E2736] pb-5">
        <div className="text-xs font-mono text-[#00D9FF] tracking-wider uppercase mb-1">
          PROJECT 628 AEROSPACE · TECHNICAL SPECIFICATION
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#E8EDF3]">
          Platform Architecture & Scientific Provenance
        </h1>
        <p className="text-sm text-[#8793A3] mt-1 max-w-3xl">
          Mark 1 implementation details for the 2026 NASA Space Apps Challenge — "Flame in Freefall: AI-Powered Fire Safety Insights from Microgravity Combustion Data".
        </p>
      </div>

      {/* Mission Statement */}
      <div className="bg-[#10151D] border border-[#1E2736] p-6 rounded space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-[#00D9FF] uppercase tracking-wide">
          <Flame className="w-4 h-4" />
          <span>Core Mission & Challenge Brief</span>
        </div>
        <p className="text-sm text-[#E8EDF3] leading-relaxed">
          The mission of <span className="text-[#00D9FF] font-semibold">628 Aerospace Microgravity Fire Intelligence</span> is to transform decades of fragmented NASA microgravity combustion flight data—spanning the Space Shuttle, the ISS Combustion Integrated Rack (CIR), and the autonomous Saffire experiments aboard Cygnus resupply craft—into a unified, evidence-based fire-safety intelligence engine for human spaceflight.
        </p>
        <p className="text-xs text-[#8793A3] leading-relaxed">
          Terrestrial fire codes and standard flammability screening protocols (such as NASA-STD-6001B Test 1) are calibrated to 1g buoyancy-driven flows. In microgravity, where natural convection is zero, combustion behaves counter-intuitively: low-speed forced ventilation maintains steady flame spread, non-luminous cool flames burn at 600–900 K, and smoldering persists in low oxygen before flashover upon ventilation restoration. Mark 1 provides aerospace engineers with grounded, transparent tools to analyze these phenomena.
        </p>
      </div>

      {/* 3-Tier Technical Architecture */}
      <div className="space-y-4">
        <div className="text-xs font-mono text-[#00D9FF] uppercase tracking-wide flex items-center gap-1.5">
          <Layers className="w-4 h-4" />
          <span>Full-Stack System Architecture</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tier 1: Data Ingestion */}
          <div className="bg-[#10151D] border border-[#1E2736] p-4 rounded space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#64E8D2] font-semibold">
              <Database className="w-4 h-4" />
              <span>1. Data Provenance Layer</span>
            </div>
            <p className="text-xs text-[#8793A3] leading-relaxed">
              Maintains clean separation between raw verified NASA flight records (NTRS accession numbers, CIR telemetry) and derived analytical models. Missing variables are explicitly labeled as <span className="text-[#E8EDF3] font-mono">"Not available in source data"</span> to prevent synthetic hallucination.
            </p>
          </div>

          {/* Tier 2: AI & RAG Engine */}
          <div className="bg-[#10151D] border border-[#1E2736] p-4 rounded space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00D9FF] font-semibold">
              <Cpu className="w-4 h-4" />
              <span>2. Grounded AI RAG Engine</span>
            </div>
            <p className="text-xs text-[#8793A3] leading-relaxed">
              Server-side intelligence utilizing <span className="text-[#E8EDF3] font-mono">@google/genai</span> with <span className="text-[#00D9FF] font-mono">gemini-3.8-flash</span>. Retrieves relevant experiments and technical papers before synthesis. Enforces strict distinction between Observed Flight Result, Scientific Interpretation, and Safety Implication.
            </p>
          </div>

          {/* Tier 3: High-Precision Presentation */}
          <div className="bg-[#10151D] border border-[#1E2736] p-4 rounded space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#FFB800] font-semibold">
              <FileCode className="w-4 h-4" />
              <span>3. Scientific Presentation</span>
            </div>
            <p className="text-xs text-[#8793A3] leading-relaxed">
              Built on React 19, TypeScript, and a pure SVG scientific plotting engine with interactive hover crosshairs, curve toggling, and CSV export. Adheres strictly to the aerospace dark matte visual identity (#080B10, Inter/IBM Plex Sans, monospace tabular numerals).
            </p>
          </div>
        </div>
      </div>

      {/* Scientific Validation & Disclaimers */}
      <div className="bg-[#10151D] border border-[#1E2736] p-5 rounded space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-[#64E8D2] uppercase font-bold tracking-wide">
          <ShieldCheck className="w-4 h-4" />
          <span>Scientific Independence & Data Attribution Disclaimer</span>
        </div>
        <p className="text-xs text-[#8793A3] leading-relaxed">
          <strong className="text-[#E8EDF3]">628 Aerospace Microgravity Fire Intelligence (Mark 1)</strong> is an independent scientific research software application developed for the NASA Space Apps Challenge 2026. This platform is not endorsed by, officially sponsored by, or operated by the National Aeronautics and Space Administration (NASA).
        </p>
        <p className="text-xs text-[#8793A3] leading-relaxed">
          All experimental datasets, technical reports, and mission parameters are curated strictly from public scientific domain resources published by the NASA Technical Reports Server (NTRS), NASA Glenn Research Center Fire Safety Branch, and peer-reviewed combustion science journals (Combustion and Flame, Proceedings of the Combustion Institute, Fire Safety Journal).
        </p>
      </div>

      {/* Mark 1 Feature Matrix & Roadmap */}
      <div className="space-y-3">
        <div className="text-xs font-mono text-[#00D9FF] uppercase tracking-wide">
          MARK 1 FEATURE INVENTORY & VERIFICATION
        </div>

        <div className="bg-[#10151D] border border-[#1E2736] rounded divide-y divide-[#1E2736] text-xs font-mono">
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#64E8D2]" />
              <span className="text-[#E8EDF3]">NASA Flight Investigations Database (Saffire, BASS, FLEX, ACME, SOFIE, MGM, MIST)</span>
            </div>
            <span className="text-[#64E8D2] font-semibold">IMPLEMENTED</span>
          </div>
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#64E8D2]" />
              <span className="text-[#E8EDF3]">Dynamic Multi-Variable Comparison Lab with Incompatibility Warning Engine</span>
            </div>
            <span className="text-[#64E8D2] font-semibold">IMPLEMENTED</span>
          </div>
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#64E8D2]" />
              <span className="text-[#E8EDF3]">Interactive SVG Scientific Plotting Engine (LOI U-Curve, Flame Spread, Droplet d² Decay)</span>
            </div>
            <span className="text-[#64E8D2] font-semibold">IMPLEMENTED</span>
          </div>
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#64E8D2]" />
              <span className="text-[#E8EDF3]">Server-Side Gemini 3.8 Flash AI Research Intelligence with Grounded RAG Citations</span>
            </div>
            <span className="text-[#64E8D2] font-semibold">IMPLEMENTED</span>
          </div>
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#64E8D2]" />
              <span className="text-[#E8EDF3]">Transparent 3-Tier Spacecraft Fire Safety Insight Ranking Engine</span>
            </div>
            <span className="text-[#64E8D2] font-semibold">IMPLEMENTED</span>
          </div>
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#64E8D2]" />
              <span className="text-[#E8EDF3]">Searchable NASA NTRS & Academic Literature Library with BibTeX Export</span>
            </div>
            <span className="text-[#64E8D2] font-semibold">IMPLEMENTED</span>
          </div>
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#64E8D2]" />
              <span className="text-[#E8EDF3]">Full Research Database JSON Export Endpoint (/api/export)</span>
            </div>
            <span className="text-[#64E8D2] font-semibold">IMPLEMENTED</span>
          </div>
        </div>
      </div>
    </div>
  );
};
