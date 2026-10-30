# Scientific Methodology & Safety Ranking Document
## Project 628 Aerospace — Microgravity Fire Intelligence (Mark 1)

### 1. The Three-Category Distinction Mandate
To ensure high scientific integrity and avoid presenting preliminary drop-tower or single-sample observations as proven operational spacecraft safety doctrines, all insights are partitioned into three distinct levels:

1. **OBSERVED FLIGHT RESULT**:
   Empirical, verifiable measurements recorded by sensors (thermocouples, radiometers, Schlieren optics, gas chromatographs) during spaceflight or drop tests.
2. **SCIENTIFIC INTERPRETATION**:
   Governing physical and chemical mechanisms (e.g. Grashof number collapse, molecular diffusion boundary layer thickness, low-temperature alkylperoxy chemical kinetics, radiant soot emission).
3. **POTENTIAL SAFETY IMPLICATION**:
   Actionable engineering takeaways for spacecraft environmental control and life support systems (ECLSS), fire suppression bottle sizing, materials screening, or astronaut emergency response procedures.

---

### 2. Transparent Fire Safety Ranking Algorithm
The platform ranks microgravity combustion findings using an objective, multi-criteria evaluation model:

$$\text{Hazard Rank Score} = W_E \cdot E + W_S \cdot S + W_U \cdot U$$

Where:
- **$E$ (Evidence Strength, $W_E = 0.40$)**:
  - $1.0$: Multiple orbital flight trials (e.g. Saffire-I through VI, BASS repeated rod burns).
  - $0.7$: Dedicated single orbital mission or flight glovebox trial (e.g. MGM on STS-107).
  - $0.4$: Ground drop-tower or parabolic flight trial ($< 5.2\text{ s}$ duration).
- **$S$ (Crew Hazard Severity, $W_S = 0.35$)**:
  - $1.0$: Sensor blindness (invisible cool flames), rapid flashover, toxic CO $> 1000\text{ ppm}$.
  - $0.7$: Accelerated flame propagation or increased solid pyrolysis rate.
  - $0.4$: Operational suppression doctrine optimization (e.g. water mist mass reduction).
- **$U$ (Exploration Urgency, $W_U = 0.25$)**:
  - $1.0$: Directly impacts Artemis Lunar Gateway and Mars transit cabin baseline ($34\%\text{ O}_2$ at $8.2\text{ psia}$).
  - $0.7$: Impacts current ISS and commercial LEO operational protocols.
  - $0.4$: Long-term advanced propulsion or testing standard modification.

---

### 3. Experimental Compatibility Warnings Engine
In the **Comparison Lab**, comparing disparate scientific trials without accounting for boundary conditions creates misleading conclusions. The platform enforces automatic compatibility checks:

- **Fuel Phase Incompatibility**: Alerts when comparing solid polymers (surface regression) with liquid droplets ($d^2$ evaporative law) or gaseous diffusion jets.
- **Ambient Pressure Incompatibility**: Warns when comparing standard sea-level cabin air ($101.3\text{ kPa}$) with low-pressure exploration regimes ($56.5\text{ kPa}$), as reduced total pressure thickens reaction zones and alters flame standoff distance.
- **Gravity Incompatibility**: Distinguishes orbital microgravity ($10^{-5}\text{ g}$, unconstrained test time) from drop tower tests ($2.2\text{ s}$ or $5.18\text{ s}$, transient boundary layers).
