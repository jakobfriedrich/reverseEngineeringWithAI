# Obfuscation Robustness Study

Research analyzing AI model robustness against code obfuscation in browser extension security analysis.

## Reproduction Steps

### 1. Install Dependencies

```bash
cd bcjindcccaagfpapjjmafapmmgkkhgoa
npm install
```

### 2. Generate Obfuscated Extension Builds

```bash
npm run obfuscate
```

This creates 5 directories: `dist-level-0/` through `dist-level-4/`

### 3. Run AI Analysis on Each Level

For each obfuscation level (0-4), run your AI analysis tool:

# Example for Level 0
 - open folder dist-level-0 as top level in VSCode with Github Copilot installed
 - run the initial github copilot command:
```
Begin Chrome extension reverse engineering analysis. Model: [YOUR_MODEL_NAME]. Start with run setup and proceed through all steps.
```

# Repeat for levels 1-4
 - open folder as top level
 - run command

Each AI analysis should produce `honey_summary.json` files in output directories like:
- `out_001_GPT-4.1/honey_summary.json`
- `out_002_Claude-Sonnet-4/honey_summary.json`
- `out_003_Gemini-2.5-Pro/honey_summary.json`

### 4. Run Robustness Analysis

Once all AI analyses are complete:

```bash
deno run --allow-read --allow-write analysis/validate-robustness.ts
```

This reads all `honey_summary.json` files and generates:
- `analysis/metrics-by-category.json` - All measurements
- `analysis/missed-items.json` - Items lost per level
- `analysis/cross-model-consistency.json` - Model agreement stats
- `analysis/detection-cliffs.json` - Recall drop points
- `analysis/effect-sizes.json` - Statistical significance

## Repository Structure

```
dist-level-0/ to dist-level-4/    Obfuscated extension builds
├── *.js                          Extension code
└── out_00*_*/                    AI analysis outputs
    └── honey_summary.json        Analysis results

analysis/                         
├── ground-truth.json             Expected values
├── validate-robustness.ts        Analysis script
├── *.json                        Generated results
└── README.md                     Technical docs
```
