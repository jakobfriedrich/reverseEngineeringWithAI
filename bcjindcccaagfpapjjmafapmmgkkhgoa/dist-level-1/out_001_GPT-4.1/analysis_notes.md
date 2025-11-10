# Manifest

- Name: JSON Formatter
- Version: 0.8.0
- Manifest Version: 3
- Description: Makes JSON easy to read. Open source.
- Homepage: https://github.com/callumlocke/json-formatter
- Content Scripts:
	- content.js (matches: <all_urls>, run_at: document_end)
	- set-json-global.js (matches: <all_urls>, run_at: document_idle, world: MAIN)
- Permissions: storage
- Host Permissions: *://*/*, <all_urls>
- Options UI: options/options.html
- Icons: icons/128.png, icons/32.png

Evidence: manifest.json:1-38
# Run 001 (GPT-4.1)

# content.js [whole-file, lines 1-296]

### Summary
Obfuscated/minified logic for JSON formatting and UI rendering. No direct Chrome API calls detected. Uses DOM manipulation and event listeners for UI. No message passing, network requests, or dynamic code execution observed. Storage references only in string tables, not as code operations.

### Chrome APIs
- None detected

### Event Listeners
- addEventListener (UI button, line ~228)

### Messaging
- None detected

### Storage
- No direct storage operations ("storage" only in string table)

### Endpoints
- None detected (string check for 'https://' and 'http://', line ~85)

### DOM/Sinks
- DOM manipulation via document.createElement, createTextNode, appendChild, innerText
- addEventListener for UI interaction

### Dynamic Code/Obfuscation
- Minified variable names
- Control flow flattening (switch/case)
- Function indirection
- No eval, Function(), import(), importScripts, atob, or WebAssembly
- Obfuscation hints: minified_vars, function_chains

### Risks
- None detected

### Evidence
- content.js:1-296
## set-json-global.js [whole-file, lines 1-29]

### Summary
Obfuscated/minified logic for exposing a global `json` object in the page context. No direct Chrome API calls, storage, messaging, or network operations. Uses DOM selectors (`querySelector`, `getElementById`, `innerText`) and `Object.defineProperty` to expose parsed JSON. No dynamic code execution, endpoints, or event listeners detected. Obfuscation via minified variable names and function indirection.

### Chrome APIs
- None detected

### Event Listeners
- None detected

### Messaging
- None detected

### Storage
- None detected

### Endpoints
- None detected

### DOM/Sinks
- querySelector, getElementById, innerText, Object.defineProperty

### Dynamic Code/Obfuscation
- Minified variable names
- Function indirection
- No eval, Function(), import(), importScripts, atob, or WebAssembly
- Obfuscation hints: minified_vars

### Risks
- None detected

### Evidence
- set-json-global.js:1-29
## options/options.js [whole-file, lines 1-38]

### Summary
Obfuscated/minified logic for options UI theme selection. No direct Chrome API calls, storage, messaging, or network operations. Uses DOM selectors (`querySelectorAll`) and event listeners (`addEventListener`, `addListener`) for UI interaction. Storage and Chrome API references only in string tables, not as code operations. No dynamic code execution, endpoints, or messaging detected. Obfuscation via minified variable names and function indirection.

### Chrome APIs
- None detected

### Event Listeners
- addEventListener (UI radio buttons)
- addListener (string table only)

### Messaging
- None detected

### Storage
- No direct storage operations ("storage", "local", "set", "get" only in string table)

### Endpoints
- None detected

### DOM/Sinks
- querySelectorAll, addEventListener

### Dynamic Code/Obfuscation
- Minified variable names
- Function indirection
- No eval, Function(), import(), importScripts, atob, or WebAssembly
- Obfuscation hints: minified_vars

### Risks
- None detected

### Evidence
- options/options.js:1-38
## Components

### Content Scripts
- Files: content.js, set-json-global.js
- APIs: None
- Listeners: addEventListener (UI only)
- Evidence: manifest.json:1-38, content.js:1-296, set-json-global.js:1-29

### UI
- Files: options/options.js
- APIs: None
- Listeners: addEventListener (UI only)
- Evidence: options/options.js:1-38

### Flows
- No messaging, background, or remote endpoints detected
- All logic is local to content scripts and UI
## Workflows

### Theme Selection Flow
**Triggers**: User opens options page
**Steps**:
1. User selects theme radio button
2. UI updates selection state
3. No messaging or storage operations

**APIs**: None
**Messages**: None
**Endpoints**: None
**Storage**: None
**Evidence**: options/options.js:1-38

### JSON Formatting Flow
**Triggers**: User loads a page with JSON
**Steps**:
1. Content script parses and formats JSON
2. UI renders formatted JSON
3. No messaging or storage operations

**APIs**: None
**Messages**: None
**Endpoints**: None
**Storage**: None
**Evidence**: content.js:1-296
## Privacy Analysis

### Data Categories
- None collected

### Purposes
- Local formatting and UI only

### Minimization
- No data collection

### Consent
- Not applicable (no data collection)

### Retention
- Not applicable

### Third Parties
- None

### Policy Compliance
- No privacy or security risks detected

## Risks

### Risk: None detected
**Severity**: None
**Justification**: No messaging, storage, network, or remote code operations found
**Evidence**: All analyzed files
## Validation

Schema validation: PASSED
- All required fields present
- Evidence included for all claims
- Enum values valid
