/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 628 AEROSPACE — MICROGRAVITY FIRE INTELLIGENCE
 * Evidence-Based Spacecraft Fire Safety Insights and Transparent Ranking Engine
 */

import { SafetyInsight } from '../types/research';

export const SAFETY_INSIGHTS: SafetyInsight[] = [
  {
    id: "INSIGHT-01",
    rank: 1,
    title: "Forced Ventilation Dependency & The Low-Flow Flammability Window",
    category: "Ventilation Dynamics",
    observedResult: "In BASS and Saffire flight trials, flames self-extinguished in quiescent air due to product suffocation, but airflow as low as 1.0 to 5.0 cm/s dramatically broadened flammability limits and maintained steady fire propagation without buoyant dissipation.",
    scientificInterpretation: "Without gravity, natural convection is zero ($Gr \\approx 0$). Forced airflow provides the sole convective mechanism supplying fresh oxidizer. Low-speed flow supplies oxygen while exerting negligible convective cooling strain, creating a highly hazardous optimum for steady combustion.",
    potentialSafetyImplication: "Spacecraft cabin ventilation loops (typically 5-20 cm/s for astronaut air circulation) are the primary lifelines sustaining fires. Emergency fire response doctrine must immediately isolate local air ventilation sectors before attempting active suppression.",
    evidenceStrength: "High (Multiple Flight Trials)",
    confidenceScorePct: 98,
    supportingExperimentIds: ["EXP-SAFFIRE-01", "EXP-BASS-01", "EXP-ACME-BRE-01"],
    supportingSourceIds: ["DOC-NASA-SAFFIRE-2020", "DOC-NASA-BASS-2016"],
    applicableMissions: ["ISS", "Artemis Gateway", "Lunar Surface Habitat", "Mars Transit", "Commercial LEO"],
    rankingRationale: "Ranked #1 because ventilation control directly dictates whether a solid material fire continues to burn or starves to extinction across all space vehicle architectures.",
    severityGrade: "CRITICAL HAZARD"
  },
  {
    id: "INSIGHT-02",
    rank: 2,
    title: "Invisible Cool Flame Persistence After Radiative Extinction",
    category: "Cool Flame Hazards",
    observedResult: "During FLEX droplet experiments in the CIR, liquid hydrocarbon fuel continued to evaporate and burn vigorously at 600-900 K for over 15 seconds after the visible hot flame (1500 K) extinguished radiatively.",
    scientificInterpretation: "In zero-g, reduced convective dissipation allows low-temperature alkylperoxy chemical reaction chains to achieve steady equilibrium without visible soot radiation, generating sustained low-temperature 'cool flames'.",
    potentialSafetyImplication: "Crew and automated safety systems may declare a fire extinguished based on visual darkness and standard optical smoke sensors, while invisible cool flames continue to consume fuel, overheat bulkheads, and emit deadly carbon monoxide.",
    evidenceStrength: "High (Multiple Flight Trials)",
    confidenceScorePct: 94,
    supportingExperimentIds: ["EXP-FLEX-01", "EXP-FLEX-02"],
    supportingSourceIds: ["DOC-NASA-FLEX-COOL-2014"],
    applicableMissions: ["ISS", "Artemis Gateway", "Mars Transit"],
    rankingRationale: "Ranked #2 due to extreme sensor blind spots: existing spacecraft fire detectors do not monitor low-temperature infrared chemiluminescence bands.",
    severityGrade: "CRITICAL HAZARD"
  },
  {
    id: "INSIGHT-03",
    rank: 3,
    title: "Exploration Atmosphere (34% O2, 8.2 psia) Flammability Acceleration",
    category: "Exploration Atmospheres",
    observedResult: "Saffire-IV tests in 34% O2 at 56.5 kPa showed a 42% increase in solid polymer regression rate, an increase in flame temperature of +190 K, and a shorter flame standoff distance compared to sea-level 21% O2 air.",
    scientificInterpretation: "Higher oxygen mole fractions increase the local chemical reaction rate and reduce flame standoff, which sharply intensifies conductive heat feedback from the flame sheet back into the virgin solid fuel surface.",
    potentialSafetyImplication: "The planned baseline cabin atmosphere for Artemis Lunar Gateway and lunar landers significantly reduces safety margins. Materials tested and passed for ISS (21% O2) may burn violently under exploration cabin conditions.",
    evidenceStrength: "High (Multiple Flight Trials)",
    confidenceScorePct: 95,
    supportingExperimentIds: ["EXP-SAFFIRE-04", "EXP-SOFIE-01"],
    supportingSourceIds: ["DOC-NASA-LPEO-2023", "DOC-NASA-SAFFIRE-2020"],
    applicableMissions: ["Artemis Gateway", "Lunar Surface Habitat", "Mars Transit"],
    rankingRationale: "Ranked #3 because all future NASA lunar and Mars human exploration vehicles are adopting the 34% O2 / 8.2 psia atmosphere to avoid EVA decompression sickness.",
    severityGrade: "CRITICAL HAZARD"
  },
  {
    id: "INSIGHT-04",
    rank: 4,
    title: "Smoldering Combustion Persistence & Abrupt Flashover on Ventilation Restoration",
    category: "Smoldering & Detection",
    observedResult: "Polyurethane foam in MGM and drop tower tests smoldered steadily at oxygen concentrations down to 12.5% with zero visible light, and instantly transitioned to open flaming upon a small increase in airflow.",
    scientificInterpretation: "Smoldering is governed by heterogeneous surface oxidation rather than gas-phase kinetics, requiring far less oxygen and releasing high concentrations of toxic pyrolysis gases (CO, HCN, aldehydes) in quiescent microgravity.",
    potentialSafetyImplication: "Suspected electrical overheating within electronics racks must not be followed by hasty air-purging or ventilation resumption. Re-introducing airflow without complete temperature verification triggers rapid flaming flashover.",
    evidenceStrength: "Medium (Dedicated Single Mission)",
    confidenceScorePct: 90,
    supportingExperimentIds: ["EXP-MGM-01", "EXP-SOFIE-01"],
    supportingSourceIds: ["DOC-NASA-SMOLDER-2021"],
    applicableMissions: ["ISS", "Artemis Gateway", "Lunar Surface Habitat", "Mars Transit"],
    rankingRationale: "Ranked #4 due to high frequency of historical micro-smolder events in space electrical wire harnesses and avionics bays.",
    severityGrade: "HIGH HAZARD"
  },
  {
    id: "INSIGHT-05",
    rank: 5,
    title: "Non-Conservatism of Terrestrial NASA STD-6001B Flammability Screening",
    category: "Material Flammability Standards",
    observedResult: "Multiple materials rated 'self-extinguishing' in NASA-STD-6001 Test 1 (upward burn in 1g) sustained continuous flame spread in microgravity when subjected to low-speed airflow in Saffire-I and Saffire-II.",
    scientificInterpretation: "On Earth, buoyant plumes accelerate hot air upward rapidly, cooling the flame base and stretching the reaction zone. In microgravity without buoyant cooling, heat stays localized on the fuel surface, allowing ignition at lower incident fluxes.",
    potentialSafetyImplication: "Spacecraft material manifests approved exclusively via terrestrial 1g test standards may introduce unrecognized fire hazards into orbital and lunar habitats under low cabin airflow conditions.",
    evidenceStrength: "High (Multiple Flight Trials)",
    confidenceScorePct: 92,
    supportingExperimentIds: ["EXP-SAFFIRE-01", "EXP-SAFFIRE-04", "EXP-BASS-02"],
    supportingSourceIds: ["DOC-NASA-STD6001-REV-2022", "DOC-NASA-SAFFIRE-2020"],
    applicableMissions: ["ISS", "Artemis Gateway", "Lunar Surface Habitat", "Mars Transit", "Commercial LEO"],
    rankingRationale: "Ranked #5 because material qualification standards are the foundation of pre-flight aerospace fire protection.",
    severityGrade: "TESTING LIMITATION"
  },
  {
    id: "INSIGHT-06",
    rank: 6,
    title: "Water Mist Superiority Over Gaseous CO2 Total-Flooding Suppression",
    category: "Fire Suppression",
    observedResult: "MIST drop tower trials proved that 20-45 μm fine water mist droplets remain suspended without settling in microgravity, quenching diffusion flames in < 0.5s with 70% less agent mass than gaseous suppressants.",
    scientificInterpretation: "In microgravity, water mist droplets follow airflow streamlines into the inner reaction zone without gravitational runoff, extracting heat through high latent heat of vaporization ($2260\\text{ kJ/kg}$) rather than solely displacing oxidizer.",
    potentialSafetyImplication: "Replacing heavy CO2 or Halon cylinders with ultra-fine water mist dispensers saves critical payload mass while preventing toxic cabin atmospheres that endanger crew respiration during emergency egress.",
    evidenceStrength: "Medium (Dedicated Single Mission)",
    confidenceScorePct: 86,
    supportingExperimentIds: ["EXP-MIST-01"],
    supportingSourceIds: ["DOC-NASA-MIST-2018"],
    applicableMissions: ["Artemis Gateway", "Lunar Surface Habitat", "Mars Transit"],
    rankingRationale: "Ranked #6 as a high-impact operational suppression doctrine for long-duration deep-space habitats with mass constraints.",
    severityGrade: "OPERATIONAL PROTOCOL"
  },
  {
    id: "INSIGHT-07",
    rank: 7,
    title: "Higher Inert Diluent Thresholds for Gas Diffusion Flame Extinction",
    category: "Fire Suppression",
    observedResult: "ACME CFI data demonstrated that microgravity gaseous flames remain viable at lower oxygen concentrations (LOI ~13.2% vs 14.8% in 1g) when low-speed coflow minimizes hydrodynamic strain.",
    scientificInterpretation: "The absence of buoyant buoyant strain reduces flame stretch ($K = \\nabla \\cdot v_t$), allowing weaker chemical reaction kinetics to survive lower oxygen levels before quenching occurs.",
    potentialSafetyImplication: "Automated nitrogen or argon inerting systems must inject significantly more inert agent to reach extinction concentrations in space than standard terrestrial NFPA codes require.",
    evidenceStrength: "High (Multiple Flight Trials)",
    confidenceScorePct: 91,
    supportingExperimentIds: ["EXP-ACME-CFI-01", "EXP-ACME-BRE-01"],
    supportingSourceIds: ["DOC-NASA-CFI-ACME-2019"],
    applicableMissions: ["ISS", "Artemis Gateway", "Mars Transit"],
    rankingRationale: "Ranked #7 for engineering calibration of fixed spacecraft fire-suppression bottle sizing.",
    severityGrade: "OPERATIONAL PROTOCOL"
  }
];
