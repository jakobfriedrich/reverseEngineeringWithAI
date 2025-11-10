# Browser Extension Reverse Engineering with AI

Results from a master's thesis evaluating AI-assisted reverse engineering of browser extensions.

## Research Questions

**RQ1: Do different LLMs perform equally well in reverse engineering tasks?**  
Evaluated using the Honey extension, comparing GPT-4.1, Claude-Sonnet-4, and Gemini-2.5-Pro.

**RQ2: Can the approach generalize to other browser extensions?**  
Tested with Momentum and Grammarly extensions to assess cross-extension applicability.

**RQ3: How do LLMs perform against code obfuscation?**  
Analyzed using the JSON Formatter extension across five obfuscation levels.

## Extensions Analyzed

| Extension | ID | Research Question |
|-----------|-----|-------------------|
| [Honey](bmnlcjabgnpnenekpadlanbbkooimhnj/) | `bmnlcjabgnpnenekpadlanbbkooimhnj` | RQ1 - Model Comparison |
| [Momentum](laookkfknpbbblfpciffpaejjkokdgca/) | `laookkfknpbbblfpciffpaejjkokdgca` | RQ2 - Generalization |
| [Grammarly](kbfnbcaeplbcioakkpcpgfkobkghlhen/) | `kbfnbcaeplbcioakkpcpgfkobkghlhen` | RQ2 - Generalization |
| [JSON Formatter](bcjindcccaagfpapjjmafapmmgkkhgoa/) | `bcjindcccaagfpapjjmafapmmgkkhgoa` | RQ3 - Obfuscation Robustness |

## Documentation

- **RQ1 (Model Comparison)**: See [Honey README](bmnlcjabgnpnenekpadlanbbkooimhnj/README.md)
- **RQ2 (Generalization)**: See [Momentum README](laookkfknpbbblfpciffpaejjkokdgca/README.md) and [Grammarly README](kbfnbcaeplbcioakkpcpgfkobkghlhen/README.md)
- **RQ3 (Obfuscation Robustness)**: See [JSON Formatter Analysis](bcjindcccaagfpapjjmafapmmgkkhgoa/ANALYSIS_README.md)