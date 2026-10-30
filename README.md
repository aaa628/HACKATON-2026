# 628 AEROSPACE — MICROGRAVITY FIRE INTELLIGENCE (MARK 1)

### NASA Space Apps Challenge 2026
**Challenge Category:** *Flame in Freefall: AI-Powered Fire Safety Insights from Microgravity Combustion Data*  
**Project ID:** 628-AERO-MFI-MK1  
**Team / Brand:** 628 Aerospace  
**Target Environment:** Artemis Lunar Gateway, Lunar Surface Habitats, Mars Transit Vehicles, Commercial LEO

---

## 1. Executive Summary

Combustion in orbital microgravity ($10^{-5}\text{ g}$) behaves counter-intuitively compared to terrestrial fire. The total absence of buoyancy-driven natural convection ($Gr \approx 0$) eliminates upward chimney drafts, altering oxidizer transport to molecular diffusion and forced cabin ventilation streams.

**628 Aerospace Microgravity Fire Intelligence** is a scientific research and mission-analysis platform that indexes, visualizes, cross-compares, and AI-synthesizes decades of NASA microgravity combustion flight experiments—including **Saffire-I through VI** (Cygnus resupply craft), **BASS-I & II** (ISS CIR), **FLEX-1 & 2** (droplet cool flames), **ACME CFI & BRE** (ISS gaseous diffusion flames), **SOFIE** (radiant ignition), **MGM** (smoldering polyurethane), and **MIST** (fine water droplet suppression).

The platform extracts actionable spacecraft fire-safety insights to prevent catastrophic loss of vehicle and crew in future deep-space exploration.

---

## 2. Platform Architecture & Primary Modules

```
                    ┌────────────────────────────────────────────────────────┐
                    │               628 AEROSPACE WEB CONSOLE                │
                    │   React 19 · TypeScript · Tailwind CSS · Precision SVG  │
                    └───────────────────────────┬────────────────────────────┘
                                                │
                     HTTP / JSON REST API       ▼       Server-Side Proxy
                    ┌────────────────────────────────────────────────────────┐
                    │                   NODE / TSX BACKEND                   │
                    │           Express.js · Port 3000 · Middleware          │
                    └───────────────┬─────────────────────────┬──────────────┘
                                    │                         │
                  Semantic RAG Retrieval       Grounding      ▼
                                    ▼                         Google Gemini 3.8 Flash
                    ┌─────────────────────────┐     (Strict Zero-Hallucination Prompt)
                    │  VERIFIED NASA CORPUS   │
                    ├─────────────────────────┤
                    │ • Flight Experiments    │
                    │ • NASA Technical Papers │
                    │ • Fluid Dynamics Models │
                    │ • Safety Insights       │
                    └─────────────────────────┘
```

### Primary Sections
1. **Overview Dashboard**: Rationale, prototype dataset metrics, 1g vs. microgravity thermodynamic comparison, dimensionless numbers reference table ($Gr, Ra, Fr, Pe, Da$), and featured flight investigations.
2. **Experiment Explorer**: Multi-filter searchable database supporting filtering by fuel category, flight programme, gravity regime, oxygen concentration, and cool-flame presence, with table and card view toggles.
3. **Scientific Experiment Profile**: In-depth modal with verified experimental conditions, scientific measurements with units (and explicit *"Not available in source data"* labels), empirical observations, interactive SVG telemetry charts, and academic DOI citations.
4. **Comparison Laboratory**: Multi-slot slot comparison tool with an **Experimental Compatibility Engine** that warns when conditions (e.g. pressure, phase, gravity) diverge, interactive comparative curves (LOI vs. forced flow U-curve, flame spread), and variable alignment matrix.
5. **AI Research Intelligence**: Full-stack query console powered by server-side `gemini-3.8-flash` with retrieval-augmented generation (RAG). Delivers citations to flight trials and research documents, with deterministic grounded fallback.
6. **Fire Safety Insights**: Transparent 3-tier evidence-based ranking prioritizing findings by operational consequence to crew safety across ISS, Artemis Gateway, Lunar Surface Habitats, and Mars Transit.
7. **Research Library**: Searchable scientific repository indexing NASA Technical Reports (NTRS) and peer-reviewed journal papers with direct links and academic citation copy.
8. **Methodology & Data Architecture**: Technical documentation, data provenance, and disclaimer.

---

## 3. Installation & Local Execution

### Prerequisites
- Node.js >= 20.x
- npm >= 10.x

### Quickstart Commands
```bash
# 1. Install dependencies
npm install

# 2. Configure environment (optional: API key automatically injected in AI Studio)
cp .env.example .env
# Set GEMINI_API_KEY="your-gemini-api-key"

# 3. Launch full-stack development server
npm run dev
```

The application will start on `http://localhost:3000`.

### Production Build
```bash
npm run build
npm start
```

### Verification & Testing
```bash
# Verify TypeScript typing and syntax
npm run lint

# Verify compilation
npm run build
```

---

## 4. Key Scientific Insights

1. **Forced Ventilation Sensitivity (Rank #1 Hazard)**: Microgravity fires self-extinguish in quiescent air due to product suffocation, but airflow as low as $1.0\text{–}5.0\text{ cm/s}$ broadens flammability limits and maintains steady flame spread without buoyant convective cooling.
2. **Invisible Cool Flames (Rank #2 Hazard)**: Liquid hydrocarbon fuels (FLEX) exhibit sustained low-temperature ($600\text{–}900\text{ K}$) combustion after the visible hot flame extinguishes radiatively, evading standard optical flame detectors.
3. **Exploration Atmosphere Acceleration (Rank #3 Hazard)**: Artemis $34\%\text{ O}_2$ at $56.5\text{ kPa}$ ($8.2\text{ psia}$) increases solid polymer regression rates by $42\%$ and flame temperatures by $+190\text{ K}$, reducing flammability safety margins.
4. **Non-Conservatism of NASA-STD-6001B**: 1g terrestrial flammability tests carry away heat via upward buoyant convection. Materials rated "self-extinguishing" in 1g have sustained continuous burning in microgravity under low-speed ventilation.

---

## 5. Scientific Disclaimer & Attribution

*628 Aerospace Microgravity Fire Intelligence (Mark 1)* is an independent research platform developed for the 2026 NASA Space Apps Challenge. It is not an official NASA product and does not imply NASA endorsement. All data is grounded in public NASA technical reports, NTRS records, and peer-reviewed literature.
