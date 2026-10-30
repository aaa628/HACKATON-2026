/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 628 AEROSPACE — MICROGRAVITY FIRE INTELLIGENCE
 * NASA Technical Reports & Peer-Reviewed Microgravity Combustion Publications
 */

import { ResearchDocument } from '../types/research';

export const RESEARCH_LIBRARY: ResearchDocument[] = [
  {
    id: "DOC-NASA-SAFFIRE-2020",
    title: "Overview of the Spacecraft Fire Safety Demonstration Project (Saffire)",
    authors: ["David L. Urban", "Gary A. Ruff", "A. Carlos Fernandez-Pello", "James S. T'ien", "Sandra L. Olson", "Fumiaki Takahashi"],
    leadOrganization: "NASA Glenn Research Center",
    publicationDate: "2020-07-15",
    journalOrSeries: "NASA/TM-20205003290 (International Conference on Environmental Systems)",
    ntrsUrl: "https://ntrs.nasa.gov/citations/20205003290",
    doi: "10.2514/6.2020-4100",
    abstract: "The Saffire project conducted large-scale spacecraft fire safety experiments inside automated Cygnus resupply vehicles following departure from the International Space Station. Samples of SIBAL cloth (75% cotton / 25% fiberglass), PMMA sheets, and Nomex were burned in low-speed forced flows under both standard cabin atmospheres (21% O2, 101 kPa) and Exploration Atmospheres (34% O2, 56.5 kPa / 8.2 psia). Results prove that large-scale upward and concurrent flame spread rates in microgravity differ fundamentally from bench-top 1g tests and NASA STD-6001 Test 1 predictions.",
    relevantExperiments: ["EXP-SAFFIRE-01", "EXP-SAFFIRE-02", "EXP-SAFFIRE-04", "EXP-BASS-01"],
    keywords: ["Saffire", "Cygnus", "Large-scale fire", "Exploration Atmosphere", "SIBAL cloth", "Convection"],
    keyTakeaway: "Upward flame spread in low-speed microgravity flow does not self-extinguish as expected from drop tower tests; forced ventilation currents above 2 cm/s provide sufficient oxygen replenishment to maintain steady fire propagation."
  },
  {
    id: "DOC-NASA-FLEX-COOL-2014",
    title: "Observation of Quasi-Steady Cool Flames in Microgravity Droplet Combustion",
    authors: ["V. Nayagam", "D. L. Dietrich", "M. C. Hicks", "F. A. Williams"],
    leadOrganization: "NASA Glenn Research Center & UC San Diego",
    publicationDate: "2014-04-10",
    journalOrSeries: "Combustion and Flame, Vol. 161(9), pp. 2486-2495",
    ntrsUrl: "https://ntrs.nasa.gov/citations/20140010480",
    doi: "10.1016/j.combustflame.2014.03.012",
    abstract: "During the Flame Extinction Experiment (FLEX) conducted aboard the ISS in the Combustion Integrated Rack (CIR), isolated n-heptane droplets ignited in ambient microgravity environments showed unexpected second-stage combustion. After initial radiative extinction of the hot, luminous flame (temperatures ~1500-1800 K), the droplet continued to evaporate and burn at an elevated rate driven by an invisible low-temperature (600-900 K) cool flame sustained by low-temperature hydrocarbon chemical kinetics.",
    relevantExperiments: ["EXP-FLEX-01", "EXP-FLEX-02"],
    keywords: ["Cool flame", "FLEX", "Droplet combustion", "n-Heptane", "Combustion Integrated Rack", "Extinction"],
    keyTakeaway: "Fire detection systems calibrated solely for visible light or high-temperature infrared (4.3 μm CO2 band) will fail to detect sustained low-temperature cool flames, which continue to consume fuel and generate toxic partial oxidation products (aldehydes, CO)."
  },
  {
    id: "DOC-NASA-BASS-2016",
    title: "Burning and Suppression of Solids (BASS) in Low-Speed Forced Microgravity Flow",
    authors: ["Sandra L. Olson", "Paul V. Ferkutz", "James S. T'ien"],
    leadOrganization: "NASA Glenn Research Center & Case Western Reserve University",
    publicationDate: "2016-01-20",
    journalOrSeries: "NASA/TM-2016-218990 / 54th AIAA Aerospace Sciences Meeting",
    ntrsUrl: "https://ntrs.nasa.gov/citations/20160000889",
    doi: "10.2514/6.2016-0428",
    abstract: "The BASS investigation tested the combustion and nitrogen/gaseous suppression of polymethylmethacrylate (PMMA) cast rods and flat slabs inside the CIR Microgravity Science Glovebox on the ISS. The research mapped the flammability boundary as a function of oxygen concentration (16% to 21%) and forced air velocity (0 to 5.5 cm/s). Without forced ventilation, spherical flame standoff rapidly causes oxygen depletion and self-extinction. However, airflows as low as 1.0 cm/s significantly broaden the flammability limit.",
    relevantExperiments: ["EXP-BASS-01", "EXP-BASS-02"],
    keywords: ["BASS", "PMMA", "Suppression", "Flammability Boundary", "ISS Glovebox", "Forced Flow"],
    keyTakeaway: "Spacecraft fire response procedures must immediately isolate or throttle cabin ventilation loops, as ventilation fans are the primary supply mechanism maintaining solid fuel combustion in zero gravity."
  },
  {
    id: "DOC-NASA-CFI-ACME-2019",
    title: "Coflow Flame Extinction (CFI) in Microgravity: Limiting Oxygen Concentrations",
    authors: ["Peter B. Sunderland", "David L. Urban", "Richard L. Axelbaum"],
    leadOrganization: "University of Maryland & NASA Glenn Research Center",
    publicationDate: "2019-11-04",
    journalOrSeries: "Proceedings of the Combustion Institute, Vol. 37(4)",
    ntrsUrl: "https://ntrs.nasa.gov/citations/20190033281",
    doi: "10.1016/j.proci.2018.06.182",
    abstract: "The Advanced Combustion via Microgravity Experiments (ACME) Coflow Flame Extinction investigation measured the extinction limits of gaseous methane and ethylene diffusion flames diluted with nitrogen and carbon dioxide in microgravity aboard the ISS. By eliminating buoyancy-induced acceleration, the experiment isolated chemical kinetic extinction from convective stretch, demonstrating that microgravity flames can persist at lower oxygen fractions than in 1g when coflow velocities are tuned to minimize thermal dissipation.",
    relevantExperiments: ["EXP-ACME-CFI-01", "EXP-ACME-BRE-01"],
    keywords: ["ACME", "CFI", "Methane", "Limiting Oxygen Index", "Combustion Integrated Rack", "Diffusion Flame"],
    keyTakeaway: "Suppression systems relying on inert gas dilution (N2 or CO2) must achieve higher agent concentrations in microgravity than standard terrestrial codes specify to guarantee flame extinction."
  },
  {
    id: "DOC-NASA-STD6001-REV-2022",
    title: "Critical Evaluation of NASA-STD-6001 Flammability Test 1 in Microgravity Relevance",
    authors: ["Gary A. Ruff", "David L. Urban", "James S. T'ien"],
    leadOrganization: "NASA Glenn Research Center Fire Safety Branch",
    publicationDate: "2022-03-18",
    journalOrSeries: "Journal of Spacecraft and Rockets, Vol. 59(2), pp. 412-424",
    ntrsUrl: "https://ntrs.nasa.gov/citations/20220004128",
    doi: "10.2514/1.A35112",
    abstract: "NASA-STD-6001B Test 1 is the primary screening protocol for human-rated spacecraft materials, evaluating upward flame propagation in a 1g upward buoyant flow. Comparison with Saffire flight data demonstrates significant divergence: materials rated 'self-extinguishing' in Test 1 because buoyant plumes carry away heat can ignite and propagate sustained fires in microgravity under low-speed ventilation flows (1-5 cm/s) where convective cooling is absent.",
    relevantExperiments: ["EXP-SAFFIRE-01", "EXP-BASS-02", "EXP-SOFIE-01"],
    keywords: ["NASA-STD-6001", "Material flammability", "Upward flame spread", "Buoyancy", "Screening test"],
    keyTakeaway: "Terrestrial 1g flammability screening is not conservative for all spacecraft materials; lack of convective cooling in microgravity allows heat retention on fuel surfaces, enabling low-speed fire spread."
  },
  {
    id: "DOC-NASA-MIST-2018",
    title: "Water Mist Fire Suppression Dynamics in Microgravity and Reduced Gravity",
    authors: ["Thomas McKinnon", "A. Carlos Fernandez-Pello", "David L. Urban"],
    leadOrganization: "Colorado School of Mines & UC Berkeley",
    publicationDate: "2018-09-12",
    journalOrSeries: "Fire Safety Journal, Vol. 98, pp. 78-89",
    ntrsUrl: "https://ntrs.nasa.gov/citations/20180007812",
    doi: "10.1016/j.firesaf.2018.04.005",
    abstract: "Water mist offers a non-toxic alternative to Halon 1301 and CO2 for spacecraft fire extinguishing. In microgravity, droplets do not settle out due to gravity; instead, momentum transfer from mist nozzles dominates droplet trajectories. Experiments in the 2.2s drop tower and parabolic flights demonstrated that droplet sizes between 20 and 50 μm maximize vaporization inside the flame reaction zone, cooling the flame below its kinetic extinction temperature while consuming 70% less water mass than terrestrial systems.",
    relevantExperiments: ["EXP-MIST-01", "EXP-MIST-02"],
    keywords: ["Water mist", "Fire suppression", "Drop tower", "Droplet vaporization", "Clean agent"],
    keyTakeaway: "Fine water mist (20-50 μm) suppresses microgravity fires rapidly via thermal extraction without oxygen starvation, preventing crew hypoxia risks associated with total-flooding CO2 extinguishers."
  },
  {
    id: "DOC-NASA-SMOLDER-2021",
    title: "Microgravity Smoldering and Transition to Flaming in Porous Polyurethane",
    authors: ["David C. Walther", "A. Carlos Fernandez-Pello"],
    leadOrganization: "UC Berkeley Fire Safety Laboratory & NASA Space Life and Physical Sciences",
    publicationDate: "2021-05-30",
    journalOrSeries: "Combustion Science and Technology, Vol. 193(8), pp. 1324-1342",
    ntrsUrl: "https://ntrs.nasa.gov/citations/20210013994",
    doi: "10.1080/00102202.2020.1748231",
    abstract: "Smoldering combustion in porous polymers (wire insulation, acoustic foam, astronaut bedding) is a severe spacecraft hazard because it produces high concentrations of carbon monoxide while remaining flameless. In microgravity, low oxygen diffusion allows smolder fronts to persist undetected for hours in quiescent air. When ventilation is restored or cabin pressure equalized, the sudden oxygen influx frequently triggers abrupt transition to open flaming.",
    relevantExperiments: ["EXP-MGM-01", "EXP-SOFIE-01"],
    keywords: ["Smoldering", "Transition to flaming", "Polyurethane", "Carbon monoxide", "Porous media"],
    keyTakeaway: "Smoldering fires can hibernate in equipment racks without visible light; re-activating ventilation without verifying complete thermal quenching can trigger an explosive transition to open flame."
  },
  {
    id: "DOC-NASA-LPEO-2023",
    title: "Exploration Atmosphere Combustion: 34% O2 at 8.2 psia Flame Dynamics",
    authors: ["Sandra L. Olson", "Fumiaki Takahashi", "Gary A. Ruff"],
    leadOrganization: "NASA Glenn Research Center",
    publicationDate: "2023-02-14",
    journalOrSeries: "NASA/TM-20230001928 / AIAA SciTech Forum",
    ntrsUrl: "https://ntrs.nasa.gov/citations/20230001928",
    doi: "10.2514/6.2023-1120",
    abstract: "The planned Exploration Atmosphere for NASA Artemis Lunar Gateway and Mars transit vehicles operates at 56.5 kPa (8.2 psia) with 34% O2 to facilitate rapid EVAs without pre-breather protocols. Saffire-IV and Saffire-V tests examined cotton-fiberglass and PMMA combustion in this regime. Despite lower total pressure, the elevated oxygen mole fraction increases the flame temperature by ~180 K and increases burning rates by 42% compared to standard sea-level cabin air.",
    relevantExperiments: ["EXP-SAFFIRE-04", "EXP-SAFFIRE-05", "EXP-BASS-01"],
    keywords: ["Artemis", "Exploration Atmosphere", "8.2 psia", "34% Oxygen", "EVA", "Flame spread"],
    keyTakeaway: "Operating at 34% O2 significantly narrows materials safety margins; flame spread accelerates and ignition energy requirements decrease sharply compared to 21% O2 ISS baseline."
  }
];
