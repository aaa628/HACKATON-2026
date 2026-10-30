/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 628 AEROSPACE — MICROGRAVITY FIRE INTELLIGENCE
 * Core Scientific Research Data Types & Schemas
 */

export type GravityEnvironment = 
  | 'Microgravity (ISS ~10⁻⁵ g)'
  | 'Low-Earth Orbit (~10⁻⁴ g)'
  | 'Lunar Gravity (0.16 g)'
  | 'Martian Gravity (0.38 g)'
  | 'Normal Gravity (1.0 g Earth Baseline)'
  | 'Drop Tower (2.2s / 5.18s zero-g)';

export type FuelCategory = 
  | 'Solid Polymer'
  | 'Liquid Hydrocarbon Droplet'
  | 'Gaseous Hydrocarbon'
  | 'Spacecraft Fabric & Textile'
  | 'Composite Material';

export type FlameRegime = 
  | 'Diffusion Flame'
  | 'Premixed Flame'
  | 'Quasi-Steady Cool Flame'
  | 'Smoldering Combustion'
  | 'Radiative Extinction'
  | 'Convective Blow-Off';

export type FlightPlatform = 
  | 'ISS CIR (Combustion Integrated Rack)'
  | 'Cygnus Spacecraft (Saffire Flights)'
  | 'NASA Glenn 2.2s Drop Tower'
  | 'NASA Glenn Zero-G Facility (5.18s)'
  | 'KC-135 / DC-9 Parabolic Flight'
  | 'Space Shuttle (STS Missions)';

export interface DataPoint {
  x: number;
  y: number;
  label?: string;
  uncertainty?: number;
}

export interface MetricSeries {
  seriesName: string;
  xLabel: string;
  xUnit: string;
  yLabel: string;
  yUnit: string;
  data: DataPoint[];
  color?: string;
  isBaseline1g?: boolean;
}

export interface ExperimentalConditions {
  fuelName: string;
  fuelForm: string; // e.g. "Cylindrical rod (12.7 mm dia)", "0.8 mm suspended droplet", "Flat sheet 0.4 m x 1.0 m"
  fuelChemicalFormula?: string;
  oxygenConcentrationPct?: number; // vol %
  ambientPressureKPa?: number; // kPa (or psia)
  ambientAtmosphere?: string; // e.g. "21% O2 / 79% N2", "34% O2 / 66% N2"
  forcedAirflowVelocityCmS?: number | null; // cm/s (null = quiescent)
  ambientTemperatureK?: number;
  ignitionMethod?: string;
  diluentGas?: string;
}

export interface ScientificMeasurements {
  flameLengthMm?: number | null;
  flameWidthMm?: number | null;
  standoffDistanceMm?: number | null;
  burningRateMmPerSec?: number | null; // or regression rate
  massLossRateGPerSec?: number | null;
  peakFlameTemperatureK?: number | null;
  surfaceTemperatureK?: number | null;
  limitingOxygenIndexLOI?: number | null; // % O2 at extinction
  extinctionAirflowVelocityCmS?: number | null;
  radiativeHeatFluxKWm2?: number | null;
  sootYieldFraction?: number | null;
  coolFlameObserved: boolean;
  coolFlameTemperatureK?: number | null;
}

export interface ExperimentRecord {
  id: string; // e.g. "EXP-BASS-01"
  name: string;
  acronym: string;
  fullTitle: string;
  programme: FlightPlatform;
  investigationId: string; // e.g. "NASA-CIR-BASS-II"
  principalInvestigator: string;
  leadInstitution: string;
  yearConducted: number;
  category: FuelCategory;
  gravityEnvironment: GravityEnvironment;
  conditions: ExperimentalConditions;
  measurements: ScientificMeasurements;
  observations: string[];
  keyFindings: string[];
  primarySourceId: string;
  ntrsAccessionNumber?: string;
  doi?: string;
  datasetAvailability: 'Available (Full Telemetry)' | 'Extracted from Published Literature' | 'Digitized Curves';
  plotSeries?: MetricSeries[];
}

export interface SafetyInsight {
  id: string;
  rank: number;
  title: string;
  category: 'Ventilation Dynamics' | 'Cool Flame Hazards' | 'Exploration Atmospheres' | 'Smoldering & Detection' | 'Fire Suppression' | 'Material Flammability Standards';
  observedResult: string;
  scientificInterpretation: string;
  potentialSafetyImplication: string;
  evidenceStrength: 'High (Multiple Flight Trials)' | 'Medium (Dedicated Single Mission)' | 'Preliminary (Limited Drop Tower Data)';
  confidenceScorePct: number; // calculated from evidence criteria
  supportingExperimentIds: string[];
  supportingSourceIds: string[];
  applicableMissions: ('ISS' | 'Artemis Gateway' | 'Lunar Surface Habitat' | 'Mars Transit' | 'Commercial LEO')[];
  rankingRationale: string;
  severityGrade: 'CRITICAL HAZARD' | 'HIGH HAZARD' | 'OPERATIONAL PROTOCOL' | 'TESTING LIMITATION';
}

export interface ResearchDocument {
  id: string;
  title: string;
  authors: string[];
  leadOrganization: string;
  publicationDate: string;
  journalOrSeries: string; // e.g. "NASA/TM-20210014285", "Combustion and Flame"
  ntrsUrl?: string;
  doi?: string;
  abstract: string;
  relevantExperiments: string[];
  keywords: string[];
  keyTakeaway: string;
}

export interface AiChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: ResearchDocument[];
  relatedExperiments?: ExperimentRecord[];
  isEvidenceGrounded?: boolean;
  categoryTags?: string[];
}
