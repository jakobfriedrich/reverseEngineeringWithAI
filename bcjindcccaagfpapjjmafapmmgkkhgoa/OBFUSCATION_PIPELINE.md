# Obfuscation Pipeline

Generates 5 progressive obfuscation levels of the JSON Formatter extension using javascript-obfuscator (v4.1.0).

## Obfuscation Levels

### Level 0: Original (Baseline)
- Unmodified source code
- No obfuscation applied

### Level 1: Minification
- Whitespace and comment removal
- Configuration: `compact: true, comments: false`

### Level 2: Identifier Renaming
- Variable and function names replaced with hexadecimal strings
- Configuration: Added `identifierNamesGenerator: "hexadecimal"`

### Level 3: Control Flow Obfuscation
- Control flow flattening (sequential statements → switch-based state machines)
- Configuration: Added `controlFlowFlattening: true`

### Level 4: String Encoding + Dead Code
- String literals encoded (base64/rotation)
- 20% dead code injection
- Configuration: Added `stringArray: true, rotateStringArray: true, deadCodeInjection: true, deadCodeInjectionThreshold: 0.2`

## Usage

```bash
npm run obfuscate
```

## Output

```
dist-level-0/          # Level 0: Original
dist-level-1/          # Level 1: Minification
dist-level-2/          # Level 2: Identifier Renaming  
dist-level-3/          # Level 3: Control Flow Obfuscation
dist-level-4/          # Level 4: String Encoding + Dead Code
```

Each directory contains a complete, loadable browser extension.

Statistics: `obfuscation-pipeline-stats.json`