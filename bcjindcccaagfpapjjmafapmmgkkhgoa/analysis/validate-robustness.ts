/**
 * Robustness Analysis Script for Reverse Engineering against Obfuscation
 * Analyzes how obfuscation levels affect AI model detection accuracy
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// Types
interface Evidence {
  file: string;
  start: number;
  end: number;
}

interface HoneySummary {
  metadata: {
    name: string;
    version: string;
    manifest_version: number;
    description: string;
    evidence?: Evidence[];
  };
  permissions: {
    api_permissions: string[];
    host_permissions: string[];
    optional_permissions: string[];
    evidence?: Evidence[];
  };
  components: {
    background: {
      files: string[];
      apis?: string[];
      listeners?: string[];
      evidence?: Evidence[];
    };
    content_scripts: Array<{
      files: string[];
      apis: string[];
      listeners: string[];
      evidence?: Evidence[];
    }>;
    injected_scripts?: any[];
    ui: Array<{
      files: string[];
      apis: string[];
      listeners: string[];
      evidence?: Evidence[];
    }>;
    web_accessible_resources?: any[];
  };
  network: {
    endpoints: string[];
  };
  messaging: {
    channels: string[];
  };
  storage: {
    keys: Array<{
      key: string;
      type: string;
      purpose: string;
      retention: string;
      evidence?: Evidence[];
    }> | string[];
  };
  workflows: Array<{
    name: string;
    triggers: string[];
    steps: string[];
    apis: string[];
    messages: string[];
    endpoints: string[];
    storage_keys: string[];
    evidence?: Evidence[];
  }> | string[];
  privacy: {
    data_categories: string[];
    purposes: string[];
    third_parties: string[];
    minimization?: string;
    consent?: string;
    retention?: string;
    policy_compliance?: string;
    evidence?: Evidence[];
  };
  risks: Array<{
    type: string;
    severity: string;
    justification: string;
    evidence?: Evidence[];
  }>;
  code_signals: {
    chrome_api_calls: string[];
    event_listeners: string[];
    dynamic_code: string[];
    wasm_modules: string[];
    third_party_libs: string[];
  };
}

interface GroundTruth {
  metadata: any;
  permissions: any;
  components: any;
  network: any;
  messaging: any;
  storage: any;
  workflows: any;
  privacy: any;
  risks: any;
  code_signals: any;
}

interface Metrics {
  true_positives: number;
  false_positives: number;
  false_negatives: number;
  precision: number;
  recall: number;
  f1_score: number;
}

interface CategoryMetrics {
  category: string;
  level: number;
  model: string;
  metrics: Metrics;
  detected_items: string[];
  missed_items: string[];
  false_items: string[];
}

interface MissedItem {
  item_name: string;
  category: string;
  level_first_missed: number;
  models_missing: string[];
  security_impact: 'Critical' | 'High' | 'Medium' | 'Low';
  obfuscation_cause: string;
}

interface DetectionCliff {
  model: string;
  category: string;
  cliff_level: number;
  recall_at_cliff: number;
  obfuscation_technique: string;
}

interface CrossModelConsistency {
  level: number;
  category: string;
  mean_recall: number;
  std_dev: number;
  coefficient_of_variation: number;
  convergent: boolean;
  model_recalls: Record<string, number>;
}

const LEVELS = [0, 1, 2, 3, 4];
const MODELS = ['GPT-4.1', 'Claude-Sonnet-4', 'Gemini-2.5-Pro'];
const MODEL_DIRS = ['out_001_GPT-4.1', 'out_002_Claude-Sonnet-4', 'out_003_Gemini-2.5-Pro'];

// Helper functions
function normalizeArray(arr: any): string[] {
  if (!arr) return [];
  if (Array.isArray(arr)) {
    if (arr.length === 0) return [];
    if (typeof arr[0] === 'string') return arr;
    if (typeof arr[0] === 'object') {
      // Handle various object formats
      return arr.map((item: any) => {
        if (item.key) return item.key;
        if (item.name) return item.name;
        if (item.type) return item.type;
        return JSON.stringify(item);
      });
    }
  }
  return [];
}

function calculateMetrics(detected: string[], groundTruth: string[]): Metrics {
  const detectedSet = new Set(detected.map(d => d.toLowerCase().trim()));
  const groundTruthSet = new Set(groundTruth.map(g => g.toLowerCase().trim()));
  
  const truePositives = new Set([...detectedSet].filter(x => groundTruthSet.has(x)));
  const falsePositives = new Set([...detectedSet].filter(x => !groundTruthSet.has(x)));
  const falseNegatives = new Set([...groundTruthSet].filter(x => !detectedSet.has(x)));
  
  const tp = truePositives.size;
  const fp = falsePositives.size;
  const fn = falseNegatives.size;
  
  const precision = tp + fp > 0 ? tp / (tp + fp) : 0;
  const recall = tp + fn > 0 ? tp / (tp + fn) : 0;
  const f1_score = precision + recall > 0 ? 2 * (precision * recall) / (precision + recall) : 0;
  
  return {
    true_positives: tp,
    false_positives: fp,
    false_negatives: fn,
    precision,
    recall,
    f1_score
  };
}

function loadHoneySummary(level: number, modelDir: string): HoneySummary | null {
  const path = join(process.cwd(), `dist-level-${level}`, modelDir, 'honey_summary.json');
  if (!existsSync(path)) {
    console.warn(`Missing: ${path}`);
    return null;
  }
  return JSON.parse(readFileSync(path, 'utf-8'));
}

function loadGroundTruth(): GroundTruth {
  const path = join(process.cwd(), 'analysis', 'ground-truth.json');
  return JSON.parse(readFileSync(path, 'utf-8'));
}

// Category extractors
function extractMetadata(summary: HoneySummary): string[] {
  return [
    summary.metadata.name,
    summary.metadata.version,
    summary.metadata.manifest_version.toString(),
    summary.metadata.description
  ].filter(Boolean);
}

function extractPermissions(summary: HoneySummary): string[] {
  return [
    ...normalizeArray(summary.permissions.api_permissions),
    ...normalizeArray(summary.permissions.host_permissions),
    ...normalizeArray(summary.permissions.optional_permissions)
  ];
}

function extractComponents(summary: HoneySummary): string[] {
  const items: string[] = [];
  
  if (summary.components.background?.files) {
    items.push(...normalizeArray(summary.components.background.files));
  }
  
  if (summary.components.content_scripts) {
    summary.components.content_scripts.forEach(cs => {
      items.push(...normalizeArray(cs.files));
      items.push(...normalizeArray(cs.apis));
      items.push(...normalizeArray(cs.listeners));
    });
  }
  
  if (summary.components.ui) {
    summary.components.ui.forEach(ui => {
      items.push(...normalizeArray(ui.files));
      items.push(...normalizeArray(ui.apis));
      items.push(...normalizeArray(ui.listeners));
    });
  }
  
  return items;
}

function extractEndpoints(summary: HoneySummary): string[] {
  return normalizeArray(summary.network.endpoints);
}

function extractChannels(summary: HoneySummary): string[] {
  return normalizeArray(summary.messaging.channels);
}

function extractStorageKeys(summary: HoneySummary): string[] {
  if (Array.isArray(summary.storage.keys)) {
    if (summary.storage.keys.length === 0) return [];
    if (typeof summary.storage.keys[0] === 'string') {
      return summary.storage.keys as string[];
    }
    return (summary.storage.keys as any[]).map(k => k.key || k);
  }
  return [];
}

function extractWorkflows(summary: HoneySummary): string[] {
  if (Array.isArray(summary.workflows)) {
    if (summary.workflows.length === 0) return [];
    if (typeof summary.workflows[0] === 'string') {
      return summary.workflows as string[];
    }
    // Extract workflow names and key APIs/steps for matching
    return (summary.workflows as any[]).flatMap(w => {
      const items: string[] = [];
      if (w.name) items.push(w.name);
      // Also include key APIs used in workflow for better matching
      if (w.apis && Array.isArray(w.apis)) {
        items.push(...w.apis);
      }
      return items;
    });
  }
  return [];
}

function extractPrivacy(summary: HoneySummary): string[] {
  const items = [
    ...normalizeArray(summary.privacy.data_categories),
    ...normalizeArray(summary.privacy.purposes),
    ...normalizeArray(summary.privacy.third_parties)
  ];
  
  // Also check for privacy attributes
  if (summary.privacy.minimization) {
    const minVal: any = summary.privacy.minimization;
    if ((typeof minVal === 'string' && minVal.toLowerCase().includes('minimal')) ||
        minVal === true) {
      items.push('data_minimization');
    }
  }
  
  if (summary.privacy.consent) {
    items.push(`consent:${String(summary.privacy.consent).toLowerCase()}`);
  }
  
  if (summary.privacy.retention) {
    items.push(`retention:${String(summary.privacy.retention).toLowerCase()}`);
  }
  
  if (summary.privacy.policy_compliance) {
    if (typeof summary.privacy.policy_compliance === 'string' &&
        (summary.privacy.policy_compliance.toLowerCase().includes('compliant') ||
         summary.privacy.policy_compliance.toLowerCase().includes('no issues'))) {
      items.push('policy_compliant');
    }
  }
  
  return items;
}

function extractRisks(summary: HoneySummary): string[] {
  if (!summary.risks || summary.risks.length === 0) return [];
  return summary.risks.map(r => `${r.type}:${r.severity}`);
}

function extractCodeSignals(summary: HoneySummary): string[] {
  return [
    ...normalizeArray(summary.code_signals.chrome_api_calls),
    ...normalizeArray(summary.code_signals.event_listeners),
    ...normalizeArray(summary.code_signals.dynamic_code),
    ...normalizeArray(summary.code_signals.wasm_modules),
    ...normalizeArray(summary.code_signals.third_party_libs)
  ];
}

const CATEGORIES = {
  'Metadata': extractMetadata,
  'Permissions': extractPermissions,
  'Components': extractComponents,
  'Endpoints': extractEndpoints,
  'Channels': extractChannels,
  'Storage Keys': extractStorageKeys,
  'Workflows': extractWorkflows,
  'Privacy': extractPrivacy,
  'Risks': extractRisks,
  'Code Signals': extractCodeSignals
};

// Main analysis
function analyzeRobustness() {
  console.log('🔍 Starting Robustness Analysis...\n');
  
  const groundTruth = loadGroundTruth();
  const allMetrics: CategoryMetrics[] = [];
  const missedItems: MissedItem[] = [];
  const crossModelData: CrossModelConsistency[] = [];
  const detectionCliffs: DetectionCliff[] = [];
  
  // Extract ground truth for each category
  const groundTruthData: Record<string, string[]> = {};
  
  // Manually construct ground truth from the ground truth file
  const gt = groundTruth as any;
  
  groundTruthData['Metadata'] = [
    gt.metadata.name,
    gt.metadata.version,
    gt.metadata.manifest_version.toString(),
    gt.metadata.description
  ].filter(Boolean);
  
  groundTruthData['Permissions'] = [
    ...gt.permissions.api_permissions,
    ...gt.permissions.host_permissions,
    ...gt.permissions.optional_permissions
  ];
  
  groundTruthData['Components'] = [];
  if (gt.components.content_scripts) {
    gt.components.content_scripts.forEach((cs: any) => {
      groundTruthData['Components'].push(...cs.files);
      groundTruthData['Components'].push(...cs.apis);
      groundTruthData['Components'].push(...cs.listeners);
    });
  }
  if (gt.components.ui) {
    gt.components.ui.forEach((ui: any) => {
      groundTruthData['Components'].push(...ui.files);
      groundTruthData['Components'].push(...ui.apis);
      groundTruthData['Components'].push(...ui.listeners);
    });
  }
  
  groundTruthData['Endpoints'] = gt.network.endpoints || [];
  groundTruthData['Channels'] = gt.messaging.channels || [];
  groundTruthData['Storage Keys'] = gt.storage.keys || [];
  
  // Workflows: names and key APIs
  groundTruthData['Workflows'] = [];
  if (gt.workflows && Array.isArray(gt.workflows)) {
    gt.workflows.forEach((w: any) => {
      if (w.name) groundTruthData['Workflows'].push(w.name);
      if (w.apis) groundTruthData['Workflows'].push(...w.apis);
    });
  }
  
  // Privacy: categories, purposes, and attributes
  groundTruthData['Privacy'] = [
    ...gt.privacy.data_categories,
    ...gt.privacy.purposes
  ];
  if (gt.privacy.minimization) groundTruthData['Privacy'].push('data_minimization');
  if (gt.privacy.consent) groundTruthData['Privacy'].push(`consent:${gt.privacy.consent}`);
  if (gt.privacy.retention) groundTruthData['Privacy'].push(`retention:${gt.privacy.retention}`);
  if (gt.privacy.policy_compliance) groundTruthData['Privacy'].push('policy_compliant');
  
  groundTruthData['Risks'] = gt.risks || [];
  
  groundTruthData['Code Signals'] = [
    ...gt.code_signals.chrome_api_calls,
    ...gt.code_signals.event_listeners,
    ...gt.code_signals.dynamic_code,
    ...gt.code_signals.wasm_modules,
    ...gt.code_signals.third_party_libs
  ];
  
  console.log('📊 Ground Truth Summary:');
  for (const [category, items] of Object.entries(groundTruthData)) {
    console.log(`  ${category}: ${items.length} items`);
  }
  console.log();
  
  // Analyze each level
  for (const level of LEVELS) {
    console.log(`\n🔬 Analyzing Level ${level}...`);
    
    for (const [categoryName, extractor] of Object.entries(CATEGORIES)) {
      const modelRecalls: Record<string, number> = {};
      
      for (let i = 0; i < MODELS.length; i++) {
        const model = MODELS[i];
        const modelDir = MODEL_DIRS[i];
        
        const summary = loadHoneySummary(level, modelDir);
        if (!summary) continue;
        
        const detected = extractor(summary);
        const groundTruth = groundTruthData[categoryName];
        
        const metrics = calculateMetrics(detected, groundTruth);
        modelRecalls[model] = metrics.recall;
        
        const categoryMetric: CategoryMetrics = {
          category: categoryName,
          level,
          model,
          metrics,
          detected_items: detected,
          missed_items: [...new Set(groundTruth.filter(
            gt => !detected.map(d => d.toLowerCase().trim()).includes(gt.toLowerCase().trim())
          ))],
          false_items: [...new Set(detected.filter(
            d => !groundTruth.map(gt => gt.toLowerCase().trim()).includes(d.toLowerCase().trim())
          ))]
        };
        
        allMetrics.push(categoryMetric);
        
        // Track missed items for first occurrence
        if (level > 0) {
          for (const missed of categoryMetric.missed_items) {
            const existing = missedItems.find(
              m => m.item_name === missed && m.category === categoryName
            );
            
            if (!existing) {
              // Check if it was detected at L0
              const l0Summary = loadHoneySummary(0, modelDir);
              if (l0Summary) {
                const l0Detected = extractor(l0Summary);
                if (l0Detected.map(d => d.toLowerCase().trim()).includes(missed.toLowerCase().trim())) {
                  missedItems.push({
                    item_name: missed,
                    category: categoryName,
                    level_first_missed: level,
                    models_missing: [model],
                    security_impact: categorizeSecurityImpact(categoryName, missed),
                    obfuscation_cause: getObfuscationCause(level)
                  });
                }
              }
            } else {
              if (!existing.models_missing.includes(model)) {
                existing.models_missing.push(model);
              }
            }
          }
        }
      }
      
      // Cross-model consistency
      const recalls = Object.values(modelRecalls);
      if (recalls.length > 0) {
        const mean = recalls.reduce((a, b) => a + b, 0) / recalls.length;
        const variance = recalls.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / recalls.length;
        const stdDev = Math.sqrt(variance);
        const cv = mean > 0 ? stdDev / mean : 0;
        
        crossModelData.push({
          level,
          category: categoryName,
          mean_recall: mean,
          std_dev: stdDev,
          coefficient_of_variation: cv,
          convergent: cv < 0.1,
          model_recalls: modelRecalls
        });
        
        console.log(`  ${categoryName}: Mean Recall = ${(mean * 100).toFixed(1)}%, CV = ${cv.toFixed(3)} ${cv > 0.3 ? '⚠️ High variance' : cv < 0.1 ? '✓ Convergent' : ''}`);
      }
    }
  }
  
  // Detection cliffs
  for (const model of MODELS) {
    for (const category of Object.keys(CATEGORIES)) {
      const categoryMetrics = allMetrics.filter(
        m => m.model === model && m.category === category
      ).sort((a, b) => a.level - b.level);
      
      for (const metric of categoryMetrics) {
        if (metric.metrics.recall < 0.5) {
          detectionCliffs.push({
            model,
            category,
            cliff_level: metric.level,
            recall_at_cliff: metric.metrics.recall,
            obfuscation_technique: getObfuscationCause(metric.level)
          });
          break;
        }
      }
    }
  }
  
  // Calculate effect sizes (Cohen's d)
  const effectSizes: Record<string, number> = {};
  for (const category of Object.keys(CATEGORIES)) {
    const l0Recalls = allMetrics.filter(m => m.level === 0 && m.category === category).map(m => m.metrics.recall);
    const l4Recalls = allMetrics.filter(m => m.level === 4 && m.category === category).map(m => m.metrics.recall);
    
    if (l0Recalls.length > 0 && l4Recalls.length > 0) {
      const meanL0 = l0Recalls.reduce((a, b) => a + b, 0) / l0Recalls.length;
      const meanL4 = l4Recalls.reduce((a, b) => a + b, 0) / l4Recalls.length;
      
      const varL0 = l0Recalls.reduce((sum, r) => sum + Math.pow(r - meanL0, 2), 0) / l0Recalls.length;
      const varL4 = l4Recalls.reduce((sum, r) => sum + Math.pow(r - meanL4, 2), 0) / l4Recalls.length;
      
      const pooledSD = Math.sqrt((varL0 + varL4) / 2);
      const cohensD = pooledSD > 0 ? (meanL0 - meanL4) / pooledSD : 0;
      
      effectSizes[category] = cohensD;
    }
  }
  
  // Save results
  writeFileSync(
    join(process.cwd(), 'analysis', 'metrics-by-category.json'),
    JSON.stringify(allMetrics, null, 2)
  );
  
  writeFileSync(
    join(process.cwd(), 'analysis', 'missed-items.json'),
    JSON.stringify(missedItems, null, 2)
  );
  
  writeFileSync(
    join(process.cwd(), 'analysis', 'cross-model-consistency.json'),
    JSON.stringify(crossModelData, null, 2)
  );
  
  writeFileSync(
    join(process.cwd(), 'analysis', 'detection-cliffs.json'),
    JSON.stringify(detectionCliffs, null, 2)
  );
  
  writeFileSync(
    join(process.cwd(), 'analysis', 'effect-sizes.json'),
    JSON.stringify(effectSizes, null, 2)
  );
  
  // Generate summary report
  generateSummaryReport(allMetrics, missedItems, crossModelData, detectionCliffs, effectSizes);
  
  console.log('\n✅ Analysis complete! Results saved to analysis/ directory');
}

function categorizeSecurityImpact(category: string, item: string): 'Critical' | 'High' | 'Medium' | 'Low' {
  if (category === 'Endpoints') return 'Critical';
  if (category === 'Permissions' && item.includes('all_urls')) return 'High';
  if (category === 'Channels') return 'High';
  if (category === 'Components' && item.includes('background')) return 'High';
  if (category === 'Storage Keys') return 'Medium';
  if (category === 'Code Signals' && item.includes('eval')) return 'High';
  return 'Low';
}

function getObfuscationCause(level: number): string {
  const techniques: Record<number, string> = {
    0: 'none',
    1: 'minification',
    2: 'identifier_renaming',
    3: 'control_flow_flattening',
    4: 'string_encoding + dead_code'
  };
  return techniques[level] || 'unknown';
}

function generateSummaryReport(
  metrics: CategoryMetrics[],
  missedItems: MissedItem[],
  crossModel: CrossModelConsistency[],
  cliffs: DetectionCliff[],
  effectSizes: Record<string, number>
) {
  let report = '# Robustness Analysis Report\n\n';
  report += `Generated: ${new Date().toISOString()}\n\n`;
  
  // Executive Summary
  report += '## Executive Summary\n\n';
  
  const avgRecallByLevel: Record<number, number> = {};
  for (const level of LEVELS) {
    const levelMetrics = metrics.filter(m => m.level === level);
    const avgRecall = levelMetrics.reduce((sum, m) => sum + m.metrics.recall, 0) / levelMetrics.length;
    avgRecallByLevel[level] = avgRecall;
  }
  
  report += '### Average Recall by Obfuscation Level\n\n';
  report += '| Level | Technique | Avg Recall | Degradation from L0 |\n';
  report += '|-------|-----------|------------|---------------------|\n';
  for (const level of LEVELS) {
    const recall = avgRecallByLevel[level];
    const degradation = avgRecallByLevel[0] - recall;
    report += `| L${level} | ${getObfuscationCause(level)} | ${(recall * 100).toFixed(1)}% | ${(degradation * 100).toFixed(1)}% |\n`;
  }
  report += '\n';
  
  // Effect Sizes
  report += '### Effect Sizes (Cohen\'s d)\n\n';
  report += '| Category | Cohen\'s d | Interpretation |\n';
  report += '|----------|-----------|----------------|\n';
  for (const [category, d] of Object.entries(effectSizes)) {
    const interpretation = d > 0.8 ? 'Large effect ⚠️' : d > 0.5 ? 'Medium effect' : 'Small effect';
    report += `| ${category} | ${d.toFixed(3)} | ${interpretation} |\n`;
  }
  report += '\n';
  
  // Detection Cliffs
  report += '## Detection Cliffs (Recall < 50%)\n\n';
  report += '| Model | Category | Cliff Level | Recall at Cliff | Technique |\n';
  report += '|-------|----------|-------------|-----------------|------------|\n';
  for (const cliff of cliffs) {
    report += `| ${cliff.model} | ${cliff.category} | L${cliff.cliff_level} | ${(cliff.recall_at_cliff * 100).toFixed(1)}% | ${cliff.obfuscation_technique} |\n`;
  }
  report += '\n';
  
  // Cross-Model Consistency
  report += '## Cross-Model Consistency Analysis\n\n';
  
  const convergentCategories = crossModel.filter(c => c.convergent && c.level === 4);
  const divergentCategories = crossModel.filter(c => !c.convergent && c.coefficient_of_variation > 0.3 && c.level === 4);
  
  report += '### Convergent Degradation (CV < 0.1 at L4)\n\n';
  for (const cat of convergentCategories) {
    report += `- **${cat.category}**: All models converge to ${(cat.mean_recall * 100).toFixed(1)}% recall\n`;
    for (const [model, recall] of Object.entries(cat.model_recalls)) {
      report += `  - ${model}: ${(recall * 100).toFixed(1)}%\n`;
    }
  }
  report += '\n';
  
  report += '### Divergent Degradation (CV > 0.3 at L4)\n\n';
  for (const cat of divergentCategories) {
    report += `- **${cat.category}**: High variance (CV=${cat.coefficient_of_variation.toFixed(3)})\n`;
    for (const [model, recall] of Object.entries(cat.model_recalls)) {
      report += `  - ${model}: ${(recall * 100).toFixed(1)}%\n`;
    }
  }
  report += '\n';
  
  // Critical Missed Items
  report += '## Critical Security Implications\n\n';
  
  const criticalMissed = missedItems.filter(m => m.security_impact === 'Critical' || m.security_impact === 'High');
  
  report += '### High/Critical Items Missed\n\n';
  report += '| Item | Category | Level First Missed | Models Missing | Impact | Cause |\n';
  report += '|------|----------|-------------------|----------------|--------|-------|\n';
  for (const item of criticalMissed) {
    report += `| ${item.item_name} | ${item.category} | L${item.level_first_missed} | ${item.models_missing.join(', ')} | ${item.security_impact} | ${item.obfuscation_cause} |\n`;
  }
  report += '\n';
  
  // Model Comparison
  report += '## Model Performance Comparison\n\n';
  
  for (const model of MODELS) {
    const modelMetrics = metrics.filter(m => m.model === model);
    const avgRecall = modelMetrics.reduce((sum, m) => sum + m.metrics.recall, 0) / modelMetrics.length;
    const avgPrecision = modelMetrics.reduce((sum, m) => sum + m.metrics.precision, 0) / modelMetrics.length;
    const avgF1 = modelMetrics.reduce((sum, m) => sum + m.metrics.f1_score, 0) / modelMetrics.length;
    
    report += `### ${model}\n\n`;
    report += `- Average Recall: ${(avgRecall * 100).toFixed(1)}%\n`;
    report += `- Average Precision: ${(avgPrecision * 100).toFixed(1)}%\n`;
    report += `- Average F1 Score: ${(avgF1 * 100).toFixed(1)}%\n\n`;
  }
  
  writeFileSync(
    join(process.cwd(), 'analysis', 'ROBUSTNESS_REPORT.md'),
    report
  );
}

// Run analysis
analyzeRobustness();
