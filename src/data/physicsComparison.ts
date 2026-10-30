/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 628 AEROSPACE — MICROGRAVITY FIRE INTELLIGENCE
 * Microgravity vs. Terrestrial Combustion Physics Model
 */

export interface PhysicsParameterComparison {
  parameterName: string;
  symbol: string;
  formula: string;
  earthValue1g: string;
  microgravityValue: string;
  physicalSignificance: string;
}

export interface CombustionRegimeComparison {
  dimension: string;
  normalGravity1g: {
    regime: string;
    description: string;
    primaryDriver: string;
    typicalVelocity: string;
    characteristicTime: string;
  };
  microgravity0g: {
    regime: string;
    description: string;
    primaryDriver: string;
    typicalVelocity: string;
    characteristicTime: string;
  };
  spacecraftSafetyRelevance: string;
}

export const DIMENSIONLESS_NUMBERS: PhysicsParameterComparison[] = [
  {
    parameterName: "Grashof Number",
    symbol: "Gr",
    formula: "Gr = (g · β · ΔT · L³) / ν²",
    earthValue1g: "10⁴ — 10⁶ (Strong buoyant acceleration)",
    microgravityValue: "≈ 0 (10⁻⁴ — 10⁻⁵, Negligible buoyancy)",
    physicalSignificance: "Ratio of buoyancy forces to viscous forces. In 1g, Gr dominates momentum transport. In microgravity, buoyancy completely vanishes."
  },
  {
    parameterName: "Rayleigh Number",
    symbol: "Ra",
    formula: "Ra = Gr · Pr",
    earthValue1g: "10⁴ — 10⁷ (Turbulent / buoyant plume)",
    microgravityValue: "< 1 (Conduction & diffusion dominate)",
    physicalSignificance: "Governs natural convective heat transfer. Zero Ra eliminates upward convective chimney effect entirely."
  },
  {
    parameterName: "Froude Number",
    symbol: "Fr",
    formula: "Fr = u² / (g · L)",
    earthValue1g: "0.1 — 1.0 (Buoyancy rivals forced flow)",
    microgravityValue: "Fr → ∞ (Forced flow governs completely)",
    physicalSignificance: "Ratio of inertial forces to gravitational forces. Any small cabin ventilation draft (u > 1 cm/s) fully commands flame shape."
  },
  {
    parameterName: "Peclet Number",
    symbol: "Pe",
    formula: "Pe = (u · L) / D",
    earthValue1g: "10² — 10³ (Convective mass transport)",
    microgravityValue: "0.1 — 10 (Diffusion rate comparable to flow)",
    physicalSignificance: "Ratio of advective to diffusive transport. Microgravity flames are largely diffusion-limited with thick boundary layers."
  },
  {
    parameterName: "Damköhler Number",
    symbol: "Da",
    formula: "Da = τ_flow / τ_chem",
    earthValue1g: "High in flame core, low at base (strain)",
    microgravityValue: "High (Slow flow grants ample reaction time)",
    physicalSignificance: "Chemical reaction rate relative to fluid transit rate. Low flow in zero-g allows slow cool-flame chemical kinetics to complete."
  }
];

export const REGIME_COMPARISONS: CombustionRegimeComparison[] = [
  {
    dimension: "Flame Geometry & Morphology",
    normalGravity1g: {
      regime: "Elongated Teardrop",
      description: "Buoyant gas acceleration stretches the flame vertically into a tapered cusp with narrow base.",
      primaryDriver: "Density differential (ρ_hot ≪ ρ_cold) creates buoyant updraft chimney.",
      typicalVelocity: "1.0 — 3.0 m/s buoyant plume velocity",
      characteristicTime: "Milliseconds residence time in flame sheet"
    },
    microgravity0g: {
      regime: "Spherical or Hemispherical Envelope",
      description: "Without upward acceleration, molecular diffusion expands isotropically in all directions.",
      primaryDriver: "Pure molecular species diffusion and weak forced flow streamlines.",
      typicalVelocity: "0.0 — 0.05 m/s (diffusion only or low ventilation)",
      characteristicTime: "Seconds (order of magnitude longer residence time)"
    },
    spacecraftSafetyRelevance: "Microgravity flames envelope solid wires and fuel rods completely, causing uniform 360° thermal degradation rather than directional burning."
  },
  {
    dimension: "Oxidizer Transport & Burning Rate",
    normalGravity1g: {
      regime: "Buoyant Self-Ventilating",
      description: "Hot combustion products rise rapidly, pulling fresh cold air inward to fuel the flame base.",
      primaryDriver: "Natural chimney draft continuously feeds fresh O2 to reaction zone.",
      typicalVelocity: "Induced flow > 100 cm/s",
      characteristicTime: "Fast mass consumption rate"
    },
    microgravity0g: {
      regime: "Diffusion-Starved / Draft-Dependent",
      description: "Products accumulate around the flame, forming an expanding CO2 and H2O blanket unless forced flow exists.",
      primaryDriver: "Fick's law molecular diffusion: j = -D ∇C, or forced cabin airflow.",
      typicalVelocity: "Diffusion speed ~ 1 cm/s",
      characteristicTime: "Slow quiescent burning, highly sensitive to fan drafts"
    },
    spacecraftSafetyRelevance: "Cutting cabin ventilation deprives zero-g fires of their sole oxidizer replenishment route, prompting self-extinction."
  },
  {
    dimension: "Soot & Radiative Heat Transfer",
    normalGravity1g: {
      regime: "Upward Soot Jet & Convective Cooling",
      description: "Soot particles are swept up by the buoyant draft, oxidizing or escaping at the tip. Convective cooling dominates.",
      primaryDriver: "Buoyant convection carries 70-85% of total combustion enthalpy away.",
      typicalVelocity: "High upward particle velocity",
      characteristicTime: "Short soot growth window"
    },
    microgravity0g: {
      regime: "Soot Aggregate Trap & Radiative Dominance",
      description: "Long residence time causes soot particles to agglomerate into massive filaments trapped inside flame boundary.",
      primaryDriver: "Radiative heat loss to cold cabin walls represents 30-50% of total enthalpy balance.",
      typicalVelocity: "Nearly stationary soot cloud",
      characteristicTime: "Long soot agglomeration time"
    },
    spacecraftSafetyRelevance: "Radiative emission cools the flame below kinetic viability at zero flow, but radiates intense thermal flux onto adjacent spacecraft avionics."
  },
  {
    dimension: "Extinction Mechanism",
    normalGravity1g: {
      regime: "Convective Blow-Off & Flame Strain",
      description: "Excess airflow or buoyant shear stretches the flame base until reaction zone temperature drops below ignition.",
      primaryDriver: "Hydrodynamic shear strain and turbulent quenching.",
      typicalVelocity: "Blow-off occurs at high airflows (u > 2-5 m/s)",
      characteristicTime: "Rapid detachment"
    },
    microgravity0g: {
      regime: "Dual Extinction: Suffocation (Low Flow) vs Strain (High Flow)",
      description: "Non-monotonic flammability U-curve: Extinguishes at zero flow (suffocation) AND at high flow (convective blowoff).",
      primaryDriver: "Radiative cooling & product accumulation at low flow; aerodynamic stretch at high flow.",
      typicalVelocity: "Low-speed flammability optimum at 1.0 - 5.0 cm/s",
      characteristicTime: "Gradual cooling or sudden cool-flame transition"
    },
    spacecraftSafetyRelevance: "Conventional terrestrial fire tactics that rely on natural convective cooling or high-velocity fans will worsen zero-g fire propagation."
  }
];
