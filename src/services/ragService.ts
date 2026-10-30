/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 628 AEROSPACE — MICROGRAVITY FIRE INTELLIGENCE
 * Scientific Retrieval-Augmented Generation (RAG) Corpus & Query Matcher
 */

import { NASA_EXPERIMENTS } from '../data/nasaExperiments';
import { RESEARCH_LIBRARY } from '../data/researchLibrary';
import { SAFETY_INSIGHTS } from '../data/safetyInsights';
import { DIMENSIONLESS_NUMBERS, REGIME_COMPARISONS } from '../data/physicsComparison';
import { ExperimentRecord, ResearchDocument, SafetyInsight } from '../types/research';

export interface RetrievalResult {
  experiments: ExperimentRecord[];
  documents: ResearchDocument[];
  insights: SafetyInsight[];
  relevantPhysics: {
    numbers: typeof DIMENSIONLESS_NUMBERS;
    regimes: typeof REGIME_COMPARISONS;
  };
  contextString: string;
}

/**
 * Searches the verified NASA microgravity combustion corpus
 * and formats grounded scientific context for the AI engine.
 */
export function retrieveRelevantCorpus(query: string): RetrievalResult {
  const normalizedQuery = query.toLowerCase();
  const queryTokens = normalizedQuery.split(/\W+/).filter(t => t.length > 2);

  // Score experiments
  const scoredExperiments = NASA_EXPERIMENTS.map(exp => {
    let score = 0;
    const searchTarget = `
      ${exp.name} ${exp.acronym} ${exp.fullTitle} ${exp.category} ${exp.conditions.fuelName} 
      ${exp.conditions.ambientAtmosphere} ${exp.programme} ${exp.observations.join(' ')} 
      ${exp.keyFindings.join(' ')} ${exp.measurements.coolFlameObserved ? 'cool flame' : ''}
    `.toLowerCase();

    for (const token of queryTokens) {
      if (searchTarget.includes(token)) {
        score += 3;
      }
    }
    // High-value domain keywords
    if (normalizedQuery.includes('cool flame') && exp.measurements.coolFlameObserved) score += 10;
    if (normalizedQuery.includes('saffire') && exp.id.includes('SAFFIRE')) score += 10;
    if (normalizedQuery.includes('bass') && exp.id.includes('BASS')) score += 10;
    if (normalizedQuery.includes('flex') && exp.id.includes('FLEX')) score += 10;
    if (normalizedQuery.includes('ventilation') && exp.conditions.forcedAirflowVelocityCmS !== null) score += 6;
    if (normalizedQuery.includes('droplet') && exp.category === 'Liquid Hydrocarbon Droplet') score += 8;
    if (normalizedQuery.includes('smolder') && exp.id.includes('MGM')) score += 10;
    if (normalizedQuery.includes('water mist') && exp.id.includes('MIST')) score += 10;
    if (normalizedQuery.includes('34%') || normalizedQuery.includes('exploration atmosphere') || normalizedQuery.includes('artemis')) {
      if (exp.conditions.oxygenConcentrationPct === 34) score += 10;
    }

    return { exp, score };
  })
  .filter(item => item.score > 0)
  .sort((a, b) => b.score - a.score)
  .map(item => item.exp);

  // Fallback to top experiments if query is broad
  const topExperiments = scoredExperiments.length > 0 
    ? scoredExperiments.slice(0, 4) 
    : NASA_EXPERIMENTS.slice(0, 3);

  // Score documents
  const scoredDocs = RESEARCH_LIBRARY.map(doc => {
    let score = 0;
    const docTarget = `
      ${doc.title} ${doc.abstract} ${doc.keywords.join(' ')} ${doc.keyTakeaway} ${doc.leadOrganization}
    `.toLowerCase();

    for (const token of queryTokens) {
      if (docTarget.includes(token)) {
        score += 3;
      }
    }
    if (normalizedQuery.includes('cool flame') && doc.keywords.includes('Cool flame')) score += 10;
    if (normalizedQuery.includes('saffire') && doc.keywords.includes('Saffire')) score += 10;
    if (normalizedQuery.includes('std-6001') || normalizedQuery.includes('standard') || normalizedQuery.includes('test 1')) {
      if (doc.id.includes('STD6001')) score += 12;
    }
    if (normalizedQuery.includes('ventilation') || normalizedQuery.includes('airflow')) {
      if (doc.keywords.includes('Forced Flow') || doc.keywords.includes('Convection')) score += 8;
    }

    return { doc, score };
  })
  .filter(item => item.score > 0)
  .sort((a, b) => b.score - a.score)
  .map(item => item.doc);

  const topDocs = scoredDocs.length > 0 
    ? scoredDocs.slice(0, 4) 
    : RESEARCH_LIBRARY.slice(0, 3);

  // Relevant Safety Insights
  const topInsights = SAFETY_INSIGHTS.filter(insight => {
    const text = `${insight.title} ${insight.observedResult} ${insight.scientificInterpretation} ${insight.potentialSafetyImplication}`.toLowerCase();
    return queryTokens.some(t => text.includes(t)) || insight.rank <= 3;
  }).slice(0, 3);

  // Build grounded context string
  let context = `--- BEGIN VERIFIED NASA RESEARCH RETRIEVAL CONTEXT ---\n\n`;

  context += `[INDEXED FLIGHT & GROUND EXPERIMENTS]\n`;
  for (const exp of topExperiments) {
    context += `Experiment: ${exp.name} (${exp.investigationId})\n`;
    context += `- Programme: ${exp.programme} (Year: ${exp.yearConducted})\n`;
    context += `- Fuel: ${exp.conditions.fuelName} (${exp.conditions.fuelForm})\n`;
    context += `- Conditions: O2=${exp.conditions.oxygenConcentrationPct ?? 'N/A'}%, Pressure=${exp.conditions.ambientPressureKPa ?? 'N/A'} kPa, Forced Airflow=${exp.conditions.forcedAirflowVelocityCmS ?? 'Quiescent'} cm/s\n`;
    context += `- Measurements: Flame Length=${exp.measurements.flameLengthMm ?? 'N/A'} mm, Burning Rate=${exp.measurements.burningRateMmPerSec ?? 'N/A'} mm/s, Peak Temp=${exp.measurements.peakFlameTemperatureK ?? 'N/A'} K, Cool Flame Observed=${exp.measurements.coolFlameObserved ? 'YES (' + exp.measurements.coolFlameTemperatureK + ' K)' : 'NO'}\n`;
    context += `- Key Findings: ${exp.keyFindings.join('; ')}\n\n`;
  }

  context += `[INDEXED SCIENTIFIC DOCUMENTS & TECHNICAL MEMORANDUMS]\n`;
  for (const doc of topDocs) {
    context += `Document ID: ${doc.id}\n`;
    context += `- Title: "${doc.title}"\n`;
    context += `- Authors: ${doc.authors.join(', ')} (${doc.leadOrganization}, ${doc.publicationDate})\n`;
    context += `- Series/DOI: ${doc.journalOrSeries} / NTRS: ${doc.ntrsUrl || 'N/A'}\n`;
    context += `- Abstract Excerpt: ${doc.abstract.slice(0, 260)}...\n`;
    context += `- Key Takeaway: ${doc.keyTakeaway}\n\n`;
  }

  context += `[ESTABLISHED SPACECRAFT FIRE SAFETY INSIGHTS]\n`;
  for (const ins of topInsights) {
    context += `Safety Insight #${ins.rank}: ${ins.title} [${ins.severityGrade}]\n`;
    context += `- OBSERVED RESULT: ${ins.observedResult}\n`;
    context += `- SCIENTIFIC INTERPRETATION: ${ins.scientificInterpretation}\n`;
    context += `- POTENTIAL SAFETY IMPLICATION: ${ins.potentialSafetyImplication}\n\n`;
  }

  context += `--- END VERIFIED NASA RESEARCH RETRIEVAL CONTEXT ---`;

  return {
    experiments: topExperiments,
    documents: topDocs,
    insights: topInsights,
    relevantPhysics: {
      numbers: DIMENSIONLESS_NUMBERS,
      regimes: REGIME_COMPARISONS
    },
    contextString: context
  };
}
