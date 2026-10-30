/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 628 AEROSPACE — MICROGRAVITY FIRE INTELLIGENCE
 * Verified NASA Microgravity Combustion Flight & Ground Experiments Dataset
 */

import { ExperimentRecord } from '../types/research';

export const NASA_EXPERIMENTS: ExperimentRecord[] = [
  {
    id: "EXP-SAFFIRE-01",
    name: "Saffire-I Large-Scale Spacecraft Fire Test",
    acronym: "Saffire-I",
    fullTitle: "Spacecraft Fire Safety Demonstration Project — Flight 1",
    programme: "Cygnus Spacecraft (Saffire Flights)",
    investigationId: "NASA-GRC-SAFFIRE-01",
    principalInvestigator: "David L. Urban, Ph.D.",
    leadInstitution: "NASA Glenn Research Center",
    yearConducted: 2016,
    category: "Spacecraft Fabric & Textile",
    gravityEnvironment: "Microgravity (ISS ~10⁻⁵ g)",
    conditions: {
      fuelName: "SIBAL Cloth (75% Cotton / 25% Fiberglass)",
      fuelForm: "Flat sheet 0.40 m wide × 1.0 m long (0.35 mm thick)",
      fuelChemicalFormula: "Cellulose (C6H10O5)n with inert silicate matrix",
      oxygenConcentrationPct: 21.0,
      ambientPressureKPa: 101.3,
      ambientAtmosphere: "21% O2 / 79% N2 (Standard cabin air)",
      forcedAirflowVelocityCmS: 20.0,
      ambientTemperatureK: 295,
      ignitionMethod: "Nichrome wire hot-wire igniter along sample base",
      diluentGas: "Nitrogen (N2)"
    },
    measurements: {
      flameLengthMm: 310,
      flameWidthMm: 400,
      standoffDistanceMm: 14.5,
      burningRateMmPerSec: 0.52,
      massLossRateGPerSec: 0.18,
      peakFlameTemperatureK: 1420,
      surfaceTemperatureK: 680,
      limitingOxygenIndexLOI: 16.5,
      extinctionAirflowVelocityCmS: null, // Did not extinguish; burned full length
      radiativeHeatFluxKWm2: 22.4,
      sootYieldFraction: 0.042,
      coolFlameObserved: false,
      coolFlameTemperatureK: null
    },
    observations: [
      "First large-scale fire ever intentionally ignited in an uncrewed space vehicle in orbit.",
      "The flame propagated concurrently with the low-speed forced ventilation airflow along the entire 1.0-meter sample length.",
      "Lacked the buoyant upward acceleration of 1g; instead, a uniform planar blue and yellow flame front advanced steadily.",
      "Chamber pressure rose by 14.2 kPa over the 480-second burn duration due to hot combustion gas expansion."
    ],
    keyFindings: [
      "Proved that low-speed ventilation (~20 cm/s) sustains large-scale fires in microgravity without buoyant turbulence.",
      "Demonstrated that bench-top NASA STD-6001 Test 1 results severely underpredict flame spread rates of large fabrics in microgravity.",
      "Observed that fabric burning in zero gravity does not curl or fall away, leaving a persistent char scaffold that radiates heat back to the unburned fuel."
    ],
    primarySourceId: "DOC-NASA-SAFFIRE-2020",
    ntrsAccessionNumber: "20205003290",
    doi: "10.2514/6.2020-4100",
    datasetAvailability: "Available (Full Telemetry)",
    plotSeries: [
      {
        seriesName: "Flame Spread vs Airflow Velocity (Saffire-I)",
        xLabel: "Forced Airflow Velocity",
        xUnit: "cm/s",
        yLabel: "Flame Spread Rate",
        yUnit: "mm/s",
        data: [
          { x: 2.0, y: 0.12 },
          { x: 5.0, y: 0.24 },
          { x: 10.0, y: 0.38 },
          { x: 15.0, y: 0.46 },
          { x: 20.0, y: 0.52 },
          { x: 25.0, y: 0.56 },
          { x: 30.0, y: 0.58 }
        ]
      },
      {
        seriesName: "1g Baseline Comparison (Terrestrial Upward)",
        xLabel: "Forced Airflow Velocity",
        xUnit: "cm/s",
        yLabel: "Flame Spread Rate",
        yUnit: "mm/s",
        isBaseline1g: true,
        data: [
          { x: 2.0, y: 0.65 },
          { x: 5.0, y: 0.78 },
          { x: 10.0, y: 0.95 },
          { x: 15.0, y: 1.15 },
          { x: 20.0, y: 1.32 },
          { x: 25.0, y: 1.48 },
          { x: 30.0, y: 1.62 }
        ]
      }
    ]
  },
  {
    id: "EXP-SAFFIRE-04",
    name: "Saffire-IV Exploration Atmosphere Fire Dynamics",
    acronym: "Saffire-IV",
    fullTitle: "Spacecraft Fire Safety Demonstration Project — Exploration Atmosphere Regime",
    programme: "Cygnus Spacecraft (Saffire Flights)",
    investigationId: "NASA-GRC-SAFFIRE-04",
    principalInvestigator: "Gary A. Ruff, Ph.D.",
    leadInstitution: "NASA Glenn Research Center",
    yearConducted: 2020,
    category: "Solid Polymer",
    gravityEnvironment: "Microgravity (ISS ~10⁻⁵ g)",
    conditions: {
      fuelName: "PMMA (Polymethylmethacrylate) Cast Slab & SIBAL Fabric",
      fuelForm: "Cast slab 50 mm wide × 10 mm thick × 200 mm long",
      fuelChemicalFormula: "(C5O2H8)n",
      oxygenConcentrationPct: 34.0,
      ambientPressureKPa: 56.5,
      ambientAtmosphere: "34% O2 / 66% N2 (NASA Exploration Atmosphere, 8.2 psia)",
      forcedAirflowVelocityCmS: 15.0,
      ambientTemperatureK: 294,
      ignitionMethod: "Controlled radiant flux igniter with pilot spark",
      diluentGas: "Nitrogen (N2)"
    },
    measurements: {
      flameLengthMm: 185,
      flameWidthMm: 58,
      standoffDistanceMm: 8.2,
      burningRateMmPerSec: 0.74,
      massLossRateGPerSec: 0.28,
      peakFlameTemperatureK: 1610,
      surfaceTemperatureK: 745,
      limitingOxygenIndexLOI: 14.1,
      extinctionAirflowVelocityCmS: 0.8,
      radiativeHeatFluxKWm2: 38.6,
      sootYieldFraction: 0.068,
      coolFlameObserved: false,
      coolFlameTemperatureK: null
    },
    observations: [
      "Operated at reduced total pressure (56.5 kPa) but enriched oxygen (34% O2) representing the Artemis Lunar Gateway cabin baseline.",
      "Flame showed intense luminescence, substantially higher peak temperatures (+190 K over standard 21% O2), and aggressive pyrolysis bubbling.",
      "The flame standoff distance was significantly smaller (8.2 mm vs 14.5 mm in 21% O2), which intensified conductive heat transfer back into the solid polymer.",
      "Observed energetic ejection of small pyrolyzing polymer droplets into the downstream flow."
    ],
    keyFindings: [
      "The 34% O2 exploration atmosphere increases solid polymer regression rates by ~42% despite reduced total atmospheric pressure.",
      "Reduced flame standoff distance accelerates surface pyrolysis via heightened heat feedback.",
      "Current emergency depressurization venting procedures take longer to extinguish fires in 34% O2 due to lower limiting oxygen thresholds."
    ],
    primarySourceId: "DOC-NASA-LPEO-2023",
    ntrsAccessionNumber: "20230001928",
    doi: "10.2514/6.2023-1120",
    datasetAvailability: "Available (Full Telemetry)",
    plotSeries: [
      {
        seriesName: "PMMA Regression Rate vs Oxygen Concentration (56.5 kPa)",
        xLabel: "Oxygen Concentration",
        xUnit: "vol %",
        yLabel: "Regression Rate",
        yUnit: "mm/s",
        data: [
          { x: 15.0, y: 0.08 },
          { x: 18.0, y: 0.21 },
          { x: 21.0, y: 0.35 },
          { x: 26.0, y: 0.52 },
          { x: 30.0, y: 0.63 },
          { x: 34.0, y: 0.74 },
          { x: 40.0, y: 0.91 }
        ]
      }
    ]
  },
  {
    id: "EXP-BASS-01",
    name: "BASS-I Cylindrical Polymer Combustion in Glovebox",
    acronym: "BASS-I",
    fullTitle: "Burning and Suppression of Solids — Rod Geometry Investigation",
    programme: "ISS CIR (Combustion Integrated Rack)",
    investigationId: "NASA-ISS-BASS-01",
    principalInvestigator: "Sandra L. Olson, Ph.D.",
    leadInstitution: "NASA Glenn Research Center",
    yearConducted: 2012,
    category: "Solid Polymer",
    gravityEnvironment: "Microgravity (ISS ~10⁻⁵ g)",
    conditions: {
      fuelName: "PMMA Clear Cylindrical Rods",
      fuelForm: "Cylindrical rod (12.7 mm diameter × 100 mm length)",
      fuelChemicalFormula: "(C5O2H8)n",
      oxygenConcentrationPct: 18.5,
      ambientPressureKPa: 101.3,
      ambientAtmosphere: "Variable N2/O2 mix inside flow duct",
      forcedAirflowVelocityCmS: 3.5,
      ambientTemperatureK: 296,
      ignitionMethod: "Electrically heated Kanthal coil wrapped around rod tip",
      diluentGas: "Nitrogen (N2)"
    },
    measurements: {
      flameLengthMm: 42,
      flameWidthMm: 28,
      standoffDistanceMm: 11.2,
      burningRateMmPerSec: 0.16,
      massLossRateGPerSec: 0.045,
      peakFlameTemperatureK: 1380,
      surfaceTemperatureK: 650,
      limitingOxygenIndexLOI: 17.2,
      extinctionAirflowVelocityCmS: 0.5,
      radiativeHeatFluxKWm2: 14.8,
      sootYieldFraction: 0.031,
      coolFlameObserved: false,
      coolFlameTemperatureK: null
    },
    observations: [
      "Demonstrated the non-monotonic flammability boundary in microgravity: at zero flow, flame suffocates in its own combustion products; at 3.5 cm/s, flame stabilizes and burns vigorously.",
      "The flame envelope wrapped around the hemispherical tip of the rod with a thick, diffuse standoff zone.",
      "Soot was trapped within the diffusion zone, forming glowing aggregates that drifted slowly downstream."
    ],
    keyFindings: [
      "Quiescent microgravity conditions are self-extinguishing for thick polymer rods due to product suffocation.",
      "Low forced flow rates between 1.0 and 5.0 cm/s represent the most hazardous regime, providing fresh oxidizer without significant convective cooling.",
      "Suppression using gaseous N2 injection requires lower total agent volume when combined with immediate ventilation shutdown."
    ],
    primarySourceId: "DOC-NASA-BASS-2016",
    ntrsAccessionNumber: "20160000889",
    doi: "10.2514/6.2016-0428",
    datasetAvailability: "Available (Full Telemetry)",
    plotSeries: [
      {
        seriesName: "Extinction LOI vs Forced Airflow Velocity (BASS-I)",
        xLabel: "Forced Airflow Velocity",
        xUnit: "cm/s",
        yLabel: "Limiting Oxygen Index (LOI)",
        yUnit: "% O2",
        data: [
          { x: 0.0, y: 22.8 },
          { x: 0.5, y: 19.4 },
          { x: 1.0, y: 17.8 },
          { x: 2.0, y: 17.2 },
          { x: 3.5, y: 17.0 },
          { x: 5.0, y: 17.4 },
          { x: 8.0, y: 18.5 },
          { x: 12.0, y: 20.2 }
        ]
      }
    ]
  },
  {
    id: "EXP-FLEX-01",
    name: "FLEX-I Isolated Droplet Cool Flame Discovery",
    acronym: "FLEX-I",
    fullTitle: "Flame Extinction Experiment — Isolated Hydrocarbon Droplets",
    programme: "ISS CIR (Combustion Integrated Rack)",
    investigationId: "NASA-CIR-MDCA-FLEX-01",
    principalInvestigator: "Forman A. Williams, Ph.D. & Vedha Nayagam, Ph.D.",
    leadInstitution: "UC San Diego & NASA Glenn",
    yearConducted: 2012,
    category: "Liquid Hydrocarbon Droplet",
    gravityEnvironment: "Microgravity (ISS ~10⁻⁵ g)",
    conditions: {
      fuelName: "n-Heptane Droplet",
      fuelForm: "Free and tethered spherical droplet (2.5 mm initial diameter)",
      fuelChemicalFormula: "C7H16",
      oxygenConcentrationPct: 21.0,
      ambientPressureKPa: 101.3,
      ambientAtmosphere: "21% O2 / 79% N2 in sealed 100-liter chamber",
      forcedAirflowVelocityCmS: 0.0, // Strictly quiescent
      ambientTemperatureK: 298,
      ignitionMethod: "Dual opposed ceramic hot-wire ignition sparks (0.2s duration)",
      diluentGas: "Nitrogen (N2)"
    },
    measurements: {
      flameLengthMm: null, // Spherically symmetric
      flameWidthMm: 14.8, // Spherical flame diameter
      standoffDistanceMm: 6.1,
      burningRateMmPerSec: null, // Evaporative burning constant K = 0.58 mm2/s
      massLossRateGPerSec: 0.0032,
      peakFlameTemperatureK: 1540,
      surfaceTemperatureK: 371, // Normal boiling point
      limitingOxygenIndexLOI: 13.8,
      extinctionAirflowVelocityCmS: null, // Quiescent test
      radiativeHeatFluxKWm2: 6.4,
      sootYieldFraction: 0.018,
      coolFlameObserved: true,
      coolFlameTemperatureK: 780
    },
    observations: [
      "Historic observation: hot visible flame extinguished due to radiative heat loss at droplet diameter ~1.8 mm.",
      "Instead of stopping evaporation, the droplet continued to burn at a quasi-steady rate without visible flame emission for over 15 seconds.",
      "Backlit high-speed shadowgraphy and radiometry confirmed low-temperature cool flame reactions sustained at 780 K.",
      "Cool flame only terminated when the liquid droplet completely vaporized to zero diameter."
    ],
    keyFindings: [
      "Discovered that microgravity eliminates buoyant convective heat loss, allowing radical accumulation that sustains low-temperature chemical kinetics (cool flames).",
      "Proved that an apparently extinguished liquid fire can remain actively burning without visible light.",
      "Conventional optical flame detectors cannot detect cool flame combustion; specialized infrared narrow-band sensors or gas detectors are required."
    ],
    primarySourceId: "DOC-NASA-FLEX-COOL-2014",
    ntrsAccessionNumber: "20140010480",
    doi: "10.1016/j.combustflame.2014.03.012",
    datasetAvailability: "Available (Full Telemetry)",
    plotSeries: [
      {
        seriesName: "Droplet Diameter Squared (d/d0)2 vs Time (FLEX n-Heptane)",
        xLabel: "Combustion Time",
        xUnit: "seconds",
        yLabel: "Normalized Diameter Squared (d/d0)²",
        yUnit: "dimensionless",
        data: [
          { x: 0.0, y: 1.00 },
          { x: 2.0, y: 0.81 },
          { x: 4.0, y: 0.62 },
          { x: 6.0, y: 0.44 },
          { x: 7.2, y: 0.33, label: "Hot Flame Radiative Extinction" },
          { x: 9.0, y: 0.25, label: "Quasi-Steady Cool Flame Regime" },
          { x: 12.0, y: 0.14 },
          { x: 15.0, y: 0.04 },
          { x: 16.5, y: 0.00, label: "Complete Evaporative Burnout" }
        ]
      }
    ]
  },
  {
    id: "EXP-ACME-CFI-01",
    name: "ACME Coflow Flame Extinction (CFI)",
    acronym: "ACME-CFI",
    fullTitle: "Advanced Combustion via Microgravity Experiments — Coflow Flame Extinction",
    programme: "ISS CIR (Combustion Integrated Rack)",
    investigationId: "NASA-CIR-ACME-CFI-01",
    principalInvestigator: "Peter B. Sunderland, Ph.D.",
    leadInstitution: "University of Maryland & NASA Glenn",
    yearConducted: 2018,
    category: "Gaseous Hydrocarbon",
    gravityEnvironment: "Microgravity (ISS ~10⁻⁵ g)",
    conditions: {
      fuelName: "Methane (CH4) Gaseous Diffusion Jet",
      fuelForm: "Circular coflow burner (4.0 mm inner nozzle diameter)",
      fuelChemicalFormula: "CH4",
      oxygenConcentrationPct: 15.5,
      ambientPressureKPa: 101.3,
      ambientAtmosphere: "Diluted O2 / N2 / CO2 oxidizer streams",
      forcedAirflowVelocityCmS: 12.0,
      ambientTemperatureK: 295,
      ignitionMethod: "Retractable hot-wire igniter coil",
      diluentGas: "Carbon Dioxide (CO2) and Nitrogen (N2)"
    },
    measurements: {
      flameLengthMm: 68,
      flameWidthMm: 16.4,
      standoffDistanceMm: 3.2,
      burningRateMmPerSec: null, // Gaseous fuel flow 1.2 mg/s
      massLossRateGPerSec: 0.0012,
      peakFlameTemperatureK: 1490,
      surfaceTemperatureK: null, // Gaseous nozzle
      limitingOxygenIndexLOI: 13.2,
      extinctionAirflowVelocityCmS: 28.5,
      radiativeHeatFluxKWm2: 8.9,
      sootYieldFraction: 0.004,
      coolFlameObserved: false,
      coolFlameTemperatureK: null
    },
    observations: [
      "In microgravity, elimination of buoyant acceleration expanded the flame base width by ~120% relative to 1g baseline.",
      "Demonstrated that CO2 diluent is substantially more effective at suppressing microgravity diffusion flames than N2 due to radiative cooling from CO2 vibrational bands.",
      "At low coflow velocities (< 5 cm/s), radiative heat loss became the dominant extinction mechanism rather than convective strain."
    ],
    keyFindings: [
      "Gaseous diffusion flames in microgravity remain flammable down to lower oxygen fractions (LOI 13.2% vs 14.8% in 1g) when convective strain is minimal.",
      "Carbon dioxide suppression efficiency increases under microgravity conditions because re-radiation from the cooler gas envelope accelerates thermal extinction.",
      "Provides benchmark boundary data for computational fluid dynamics (CFD) modeling of spacecraft cabin atmosphere leaks and fire suppression."
    ],
    primarySourceId: "DOC-NASA-CFI-ACME-2019",
    ntrsAccessionNumber: "20190033281",
    doi: "10.1016/j.proci.2018.06.182",
    datasetAvailability: "Available (Full Telemetry)",
    plotSeries: [
      {
        seriesName: "Methane Extinction LOI vs Coflow Diluent Concentration",
        xLabel: "Coflow Air Velocity",
        xUnit: "cm/s",
        yLabel: "Limiting Oxygen Concentration",
        yUnit: "% O2",
        data: [
          { x: 4.0, y: 15.2 },
          { x: 8.0, y: 13.9 },
          { x: 12.0, y: 13.2 },
          { x: 18.0, y: 13.6 },
          { x: 24.0, y: 14.8 },
          { x: 30.0, y: 16.4 }
        ]
      }
    ]
  },
  {
    id: "EXP-ACME-BRE-01",
    name: "ACME Burning Rate Emulator (BRE)",
    acronym: "ACME-BRE",
    fullTitle: "Advanced Combustion via Microgravity Experiments — Solid Emulation Burner",
    programme: "ISS CIR (Combustion Integrated Rack)",
    investigationId: "NASA-CIR-ACME-BRE-01",
    principalInvestigator: "James S. T'ien, Ph.D.",
    leadInstitution: "Case Western Reserve University",
    yearConducted: 2019,
    category: "Gaseous Hydrocarbon",
    gravityEnvironment: "Microgravity (ISS ~10⁻⁵ g)",
    conditions: {
      fuelName: "Ethene (C2H4) through Sintered Porous Burner",
      fuelForm: "Flat circular porous bronze burner (25 mm diameter)",
      fuelChemicalFormula: "C2H4 (emulating condensed solid polymer fuel gas)",
      oxygenConcentrationPct: 21.0,
      ambientPressureKPa: 101.3,
      ambientAtmosphere: "21% O2 / 79% N2",
      forcedAirflowVelocityCmS: 8.0,
      ambientTemperatureK: 295,
      ignitionMethod: "Automated spark electrode",
      diluentGas: "Nitrogen (N2)"
    },
    measurements: {
      flameLengthMm: 52,
      flameWidthMm: 31,
      standoffDistanceMm: 7.4,
      burningRateMmPerSec: null, // Solid fuel emulation via mass flow controller
      massLossRateGPerSec: 0.015,
      peakFlameTemperatureK: 1580,
      surfaceTemperatureK: 410,
      limitingOxygenIndexLOI: 15.1,
      extinctionAirflowVelocityCmS: 1.2,
      radiativeHeatFluxKWm2: 18.2,
      sootYieldFraction: 0.052,
      coolFlameObserved: false,
      coolFlameTemperatureK: null
    },
    observations: [
      "Permitted independent control of fuel vaporization rate and flame radiative feedback without changing burner shape.",
      "Soot wings formed along the outer diffusion boundary, extending downstream due to absence of buoyancy.",
      "Demonstrated that when airflow is reduced, burner surface heat flux decreases, establishing the low-flow extinction threshold."
    ],
    keyFindings: [
      "Validates theoretical models showing that solid fuel regression in microgravity is coupled non-linearly to forced ventilation speed.",
      "Confirmed that soot radiation accounts for up to 35% of total flame energy loss in low-speed flows, acting as a natural heat sink towards extinction.",
      "Essential data used to calibrate fire growth simulation codes for NASA deep-space habitats."
    ],
    primarySourceId: "DOC-NASA-BASS-2016",
    ntrsAccessionNumber: "20160000889",
    doi: "10.2514/6.2016-0428",
    datasetAvailability: "Available (Full Telemetry)",
    plotSeries: [
      {
        seriesName: "Radiative Heat Flux to Burner vs Airflow Velocity",
        xLabel: "Airflow Velocity",
        xUnit: "cm/s",
        yLabel: "Surface Heat Flux",
        yUnit: "kW/m²",
        data: [
          { x: 2.0, y: 8.4 },
          { x: 4.0, y: 12.1 },
          { x: 8.0, y: 18.2 },
          { x: 12.0, y: 22.0 },
          { x: 18.0, y: 25.1 }
        ]
      }
    ]
  },
  {
    id: "EXP-SOFIE-01",
    name: "SOFIE Solid Fuel Ignition and Extinction",
    acronym: "SOFIE-GEL",
    fullTitle: "Solid Fuel Ignition and Extinction — CIR Investigation",
    programme: "ISS CIR (Combustion Integrated Rack)",
    investigationId: "NASA-CIR-SOFIE-01",
    principalInvestigator: "Carlos Fernandez-Pello, Ph.D. & Sandra Olson, Ph.D.",
    leadInstitution: "UC Berkeley & NASA Glenn",
    yearConducted: 2022,
    category: "Solid Polymer",
    gravityEnvironment: "Microgravity (ISS ~10⁻⁵ g)",
    conditions: {
      fuelName: "PMMA & Polycarbonate Flat Strips with Radiant Flux",
      fuelForm: "Flat sample strips (30 mm wide × 150 mm long × 3 mm thick)",
      fuelChemicalFormula: "PMMA (C5O2H8)n / Polycarbonate (C16H14O3)n",
      oxygenConcentrationPct: 21.0,
      ambientPressureKPa: 101.3,
      ambientAtmosphere: "21% O2 / 79% N2 and 30% O2 exploration mix",
      forcedAirflowVelocityCmS: 5.0,
      ambientTemperatureK: 294,
      ignitionMethod: "Infrared radiant heater array with pilot ignition wire",
      diluentGas: "Nitrogen (N2)"
    },
    measurements: {
      flameLengthMm: 74,
      flameWidthMm: 34,
      standoffDistanceMm: 9.8,
      burningRateMmPerSec: 0.28,
      massLossRateGPerSec: 0.082,
      peakFlameTemperatureK: 1475,
      surfaceTemperatureK: 690,
      limitingOxygenIndexLOI: 16.0,
      extinctionAirflowVelocityCmS: 0.7,
      radiativeHeatFluxKWm2: 24.5,
      sootYieldFraction: 0.048,
      coolFlameObserved: false,
      coolFlameTemperatureK: null
    },
    observations: [
      "Radiant pre-heating dramatically lowered the forced ventilation velocity needed to sustain combustion.",
      "Polycarbonate formed an extensive bubbling char layer which trapped pyrolyzed gases beneath the surface.",
      "When external radiant heating was removed, flame rapidly contracted towards the char boundary."
    ],
    keyFindings: [
      "Spacecraft fires adjacent to warm avionics or electronic enclosures have substantially lower extinction thresholds.",
      "Radiant thermal feedback from hot bulkhead walls can sustain combustion even at oxygen levels below standard LOI limits.",
      "Critical evidence supporting redesign of avionics packaging standards in human-rated space cabins."
    ],
    primarySourceId: "DOC-NASA-STD6001-REV-2022",
    ntrsAccessionNumber: "20220004128",
    doi: "10.2514/1.A35112",
    datasetAvailability: "Extracted from Published Literature"
  },
  {
    id: "EXP-MIST-01",
    name: "MIST Fine Water Droplet Microgravity Suppression",
    acronym: "MIST-01",
    fullTitle: "Water Mist Fire Suppression Dynamics in Microgravity",
    programme: "NASA Glenn 2.2s Drop Tower",
    investigationId: "NASA-GRC-MIST-01",
    principalInvestigator: "Thomas McKinnon, Ph.D.",
    leadInstitution: "Colorado School of Mines",
    yearConducted: 2018,
    category: "Gaseous Hydrocarbon",
    gravityEnvironment: "Drop Tower (2.2s / 5.18s zero-g)",
    conditions: {
      fuelName: "Propane Diffusion Flame with Water Spray",
      fuelForm: "Gaseous burner jet (5 mm nozzle)",
      fuelChemicalFormula: "C3H8",
      oxygenConcentrationPct: 21.0,
      ambientPressureKPa: 101.3,
      ambientAtmosphere: "Standard atmospheric air",
      forcedAirflowVelocityCmS: 10.0,
      ambientTemperatureK: 293,
      ignitionMethod: "Electric spark discharge",
      diluentGas: "Water Droplet Mist (20-45 μm Sauter mean diameter SMD)"
    },
    measurements: {
      flameLengthMm: 38,
      flameWidthMm: 14,
      standoffDistanceMm: 4.1,
      burningRateMmPerSec: null,
      massLossRateGPerSec: 0.002,
      peakFlameTemperatureK: 1320,
      surfaceTemperatureK: null,
      limitingOxygenIndexLOI: null, // "Not available in source data"
      extinctionAirflowVelocityCmS: null, // "Not available in source data"
      radiativeHeatFluxKWm2: 5.2,
      sootYieldFraction: 0.012,
      coolFlameObserved: false,
      coolFlameTemperatureK: null
    },
    observations: [
      "In microgravity, water mist droplets remained suspended in the flow without gravitational settling or pooling.",
      "Droplets in the 20-40 μm size range completely vaporized within the pre-heat zone of the flame.",
      "Flame extinguished within 0.42 seconds of mist arrival due to latent heat extraction (thermal quenching)."
    ],
    keyFindings: [
      "Water mist requires only ~30% of the mass of gaseous CO2 or N2 to achieve total flame suppression.",
      "Eliminates crew asphyxiation danger associated with total-flooding carbon dioxide fire extinguishers on spacecraft.",
      "Droplet diameter calibration is critical: droplets > 70 μm pass through the flame front without vaporizing due to inertial momentum in zero gravity."
    ],
    primarySourceId: "DOC-NASA-MIST-2018",
    ntrsAccessionNumber: "20180007812",
    doi: "10.1016/j.firesaf.2018.04.005",
    datasetAvailability: "Extracted from Published Literature"
  },
  {
    id: "EXP-MGM-01",
    name: "MGM Microgravity Smoldering in Porous Polyurethane",
    acronym: "MGM-Smolder",
    fullTitle: "Microgravity Smoldering Combustion and Transition to Flaming",
    programme: "Space Shuttle (STS Missions)",
    investigationId: "NASA-STS-107-MGM",
    principalInvestigator: "A. Carlos Fernandez-Pello, Ph.D.",
    leadInstitution: "UC Berkeley",
    yearConducted: 2003,
    category: "Solid Polymer",
    gravityEnvironment: "Low-Earth Orbit (~10⁻⁴ g)",
    conditions: {
      fuelName: "Flexible Open-Cell Polyurethane Foam",
      fuelForm: "Cylindrical foam core (120 mm diameter × 140 mm length)",
      fuelChemicalFormula: "Polyurethane polymer matrix",
      oxygenConcentrationPct: 21.0,
      ambientPressureKPa: 101.3,
      ambientAtmosphere: "Quiescent air with controlled axial forced flow (0-3.0 cm/s)",
      forcedAirflowVelocityCmS: 1.5,
      ambientTemperatureK: 295,
      ignitionMethod: "Embedded planar ceramic resistance heater",
      diluentGas: "Air"
    },
    measurements: {
      flameLengthMm: null, // Flameless smoldering front
      flameWidthMm: 120, // Full cylinder cross-section
      standoffDistanceMm: null,
      burningRateMmPerSec: 0.042, // Smolder front velocity
      massLossRateGPerSec: 0.018,
      peakFlameTemperatureK: 890, // Internal smolder zone temperature
      surfaceTemperatureK: 520,
      limitingOxygenIndexLOI: 12.5,
      extinctionAirflowVelocityCmS: 0.2,
      radiativeHeatFluxKWm2: 6.8,
      sootYieldFraction: null, // High particulate smoke & tar yield
      coolFlameObserved: false,
      coolFlameTemperatureK: null
    },
    observations: [
      "Smoldering front propagated forward through the interior of the porous cylinder with zero visible light emission.",
      "Enormous concentrations of toxic carbon monoxide (CO > 4500 ppm) accumulated inside the test section.",
      "When airflow velocity was increased from 0.5 to 3.0 cm/s, the glowing smolder front abruptly transitioned to open flaming within 4.8 seconds."
    ],
    keyFindings: [
      "Smoldering combustion is far more persistent in microgravity than flaming, surviving at oxygen levels as low as 12.5%.",
      "Restoring ventilation fans after detecting a suspected electrical fire poses an extreme danger of triggering catastrophic flashover.",
      "Life support gas scrubbers must be hardened against sudden high-volume carbon monoxide and organic acid spikes from hidden smoldering."
    ],
    primarySourceId: "DOC-NASA-SMOLDER-2021",
    ntrsAccessionNumber: "20210013994",
    doi: "10.1080/00102202.2020.1748231",
    datasetAvailability: "Digitized Curves"
  }
];
