# Analysis Files

## Data Files

- `ground-truth.json` - Expected values extracted from Level 0
- `metrics-by-category.json` - All measurements (470 data points)
- `missed-items.json` - Items lost at each obfuscation level
- `cross-model-consistency.json` - Coefficient of variation across models
- `detection-cliffs.json` - Points where recall drops below 50%
- `effect-sizes.json` - Cohen's d for L0→L4 degradation

## Scripts

- `validate-robustness.ts` - Main analysis script (generates all JSON files)

## Usage

```bash
deno run --allow-read --allow-write analysis/validate-robustness.ts
```

## Ground Truth

Extracted from Level 0 consensus:
- Metadata: 4 items
- Permissions: 3 items  
- Components: 12 items
- Workflows: 7 items
- Privacy: 7 items
- Code Signals: 8 items

Total: 5 levels × 3 models × 10 categories = 470 measurements

## Results

Overall degradation L0→L4: 0.7%

Structural categories (Metadata, Permissions, Components): 100% retention  
Workflows: 88.9% retention  
Privacy: Model-dependent (GPT: -67%, Claude: +33%, Gemini: 0%)
