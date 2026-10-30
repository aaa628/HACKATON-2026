# Technical Architecture Document
## Project 628 Aerospace — Microgravity Fire Intelligence (Mark 1)

### 1. Technology Stack Selection Rationale
- **Frontend Framework**: React 19 with TypeScript, utilizing functional components and hooks for state predictability and performance.
- **Styling Architecture**: Tailwind CSS v4 configured with a bespoke aerospace theme palette:
  - Deep obsidian canvas: `#080B10`
  - Structural panels: `#10151D`
  - Elevated surfaces: `#151C26`
  - High-precision telemetry accent: `#00D9FF` (Laser Cyan)
  - Secondary scientific accent: `#64E8D2` (Phosphor Mint)
  - Strict typography rules: IBM Plex Sans paired with tabular monospace numerals (`font-mono tabular-nums`).
- **Data Visualization**: Pure Vector SVG plotting engine (`src/components/common/ScientificPlot.tsx`) designed specifically to avoid third-party React 19 peer-dependency conflicts while delivering hairline crosshairs, hover coordinate probes, curve toggling, and instant CSV data export.
- **Backend Architecture**: Full-stack Node.js / Express server running with Vite development middlewares (`server.ts`). This provides a secure server-side proxy for Gemini 3.8 Flash, ensuring zero browser leakage of API keys.
- **AI RAG Pipeline**: In-memory semantic keyword indexing and relevance scoring over verified NASA flight records, generating structured prompts with strict grounding rules.

### 2. File Organization
```
├── server.ts                       # Express full-stack server + Gemini API proxy
├── src/
│   ├── App.tsx                     # Main layout orchestrator & tab routing
│   ├── index.css                   # Global Tailwind v4 aerospace theme styles
│   ├── main.tsx                    # React DOM entrypoint
│   ├── types/
│   │   └── research.ts             # Rigorous scientific data models
│   ├── data/
│   │   ├── nasaExperiments.ts      # Flight experiment database (Saffire, BASS, FLEX, etc.)
│   │   ├── researchLibrary.ts      # NASA Technical Reports & Academic papers
│   │   ├── safetyInsights.ts       # Transparent ranked spacecraft fire hazards
│   │   └── physicsComparison.ts    # 1g vs 0g thermodynamics and fluid mechanics
│   ├── services/
│   │   └── ragService.ts           # Semantic search and context grounding engine
│   └── components/
│       ├── layout/
│       │   ├── Sidebar.tsx         # Aerospace navigation sidebar & telemetry tray
│       │   └── TopBar.tsx          # 3-Zone header contract with search & AI trigger
│       ├── overview/
│       │   └── OverviewDashboard.tsx # Platform rationale & physics comparison
│       ├── experiments/
│       │   ├── ExperimentExplorer.tsx   # Filterable database (card/table modes)
│       │   └── ExperimentDetailModal.tsx # Scientific profile & telemetry charts
│       ├── comparison/
│       │   └── ComparisonLab.tsx   # Multi-experiment variable alignment & alerts
│       ├── ai/
│       │   └── AiResearchIntelligence.tsx # Grounded AI research assistant
│       ├── safety/
│       │   └── SafetyInsightsView.tsx  # Evidence-ranked safety insights
│       ├── library/
│       │   └── ResearchLibrary.tsx     # Searchable NASA NTRS literature index
│       ├── about/
│       │   └── AboutView.tsx           # Architecture and methodology specs
│       └── common/
│           └── ScientificPlot.tsx      # SVG chart engine with crosshairs & CSV export
```

### 3. Server-Side Gemini API Proxy Specification
- **Model**: `gemini-3.8-flash`
- **SDK**: `@google/genai` (version ^2.32.0)
- **Header Telemetry**: `httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }`
- **Zero API Key Leakage**: Keys remain exclusively on the server in `process.env.GEMINI_API_KEY`.
- **System Instruction**: Enforces strict grounding in the retrieved NASA corpus, structural output format (Summary, Observed Result, Scientific Interpretation, Safety Implication, Citations), and zero hallucination of unmeasured values.
- **Deterministic RAG Fallback**: If network or quota errors occur, the server falls back to an internal deterministic synthesizer that returns verified experiment values and citations.
