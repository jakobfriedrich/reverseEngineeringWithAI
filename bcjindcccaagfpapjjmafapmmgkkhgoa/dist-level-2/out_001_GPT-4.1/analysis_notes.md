# Run 001 (GPT-4.1)

## Manifest

- Name: JSON Formatter
- Version: 0.8.0
- Manifest Version: 3
- Description: Makes JSON easy to read. Open source.
- Homepage: https://github.com/callumlocke/json-formatter
- Minimum Chrome Version: 88
- Icons: icons/128.png, icons/32.png
- Content Scripts:
  - content.js (matches: <all_urls>, run_at: document_end)
  - set-json-global.js (matches: <all_urls>, run_at: document_idle, world: MAIN)
- Permissions: storage
- Host Permissions: *://*/*, <all_urls>
- Options UI: options/options.html

Evidence: manifest.json:1-32

## content.js [whole-file, lines 1-end]

### Summary
Obfuscated/minified logic for JSON formatting and UI. Uses Chrome storage API to read theme settings and applies dynamic styles. Sets up DOM manipulation for parsed/pretty JSON and raw view toggling. No messaging or network calls detected. Contains event listeners for UI buttons and mouse events. Evidence of obfuscation: minified variable names, function chains.

### Chrome APIs
- chrome.storage.local.get (themeOverride)

### Event Listeners
- addEventListener (mousedown, button click)

### Messaging
- None detected

### Storage
- Key: themeOverride, type: local, op: get

### Endpoints
- None detected

### DOM/Sinks
- document.createElement, appendChild, removeChild, querySelector, getElementsByClassName, style manipulation

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Control flow flattening

### Risks
- None significant in this chunk

### Evidence
- content.js:1-end
## options/options.js [whole-file, lines 1-end]

### Summary
Obfuscated/minified logic for options UI. Reads and sets themeOverride in chrome.storage.local. Syncs radio button state with storage and updates storage on change. Registers event listeners for UI changes. No messaging or network calls detected. Evidence of obfuscation: minified variable names, function chains.

### Chrome APIs
- chrome.storage.local.get (themeOverride)
- chrome.storage.local.set (themeOverride)
- chrome.storage.onChanged.addListener

### Event Listeners
- addEventListener (change)
- chrome.storage.onChanged.addListener

### Messaging
- None detected

### Storage
- Key: themeOverride, type: local, op: get/set

### Endpoints
- None detected

### DOM/Sinks
- document.querySelectorAll, radio button manipulation

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains

### Risks
- None significant in this chunk

### Evidence
- options/options.js:1-end
## set-json-global.js [whole-file, lines 1-end]

### Summary
Obfuscated/minified logic. Reads raw JSON from DOM, parses it, and exposes as a global variable `json` on `window`. Uses Object.defineProperty for secure assignment. Logs success or error to console. No Chrome API, messaging, storage, or network calls detected. DOM access and mutation present. Evidence of obfuscation: minified variable names, function chains.

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
- document.getElementById, querySelector, setTimeout, Object.defineProperty

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains

### Risks
- None significant in this chunk

### Evidence
- set-json-global.js:1-end
## Components

### Content Scripts
- Files: content.js, set-json-global.js
- APIs: chrome.storage.local.get
- Listeners: addEventListener (mousedown, button click)
- Evidence: manifest.json:10-20, content.js:1-end

### UI (Options Page)
- Files: options/options.js
- APIs: chrome.storage.local.get, chrome.storage.local.set, chrome.storage.onChanged.addListener
- Listeners: addEventListener (change), chrome.storage.onChanged.addListener
- Evidence: options/options.js:1-end

### Flows
- Content script reads theme from storage and applies styles
- Options page allows user to select theme, updates storage
## Workflows

### Theme Selection and Application
**Triggers**: User opens options page, changes theme selection, or content script loads
**Steps**:
1. Options page loads and reads themeOverride from chrome.storage.local
2. User selects a theme (system, force_light, force_dark) via radio buttons
3. Options page updates themeOverride in chrome.storage.local
4. Content script reads themeOverride from chrome.storage.local and applies corresponding styles

**APIs**: chrome.storage.local.get, chrome.storage.local.set
**Messages**: None
**Endpoints**: None
**Storage**: themeOverride
**Evidence**: options/options.js:1-end, content.js:1-end
## Privacy Analysis

### Data Categories
- User preferences/settings (themeOverride)

### Purposes
- Feature personalization (theme selection)

### Minimization
Collects only minimal necessary data for stated purpose (theme preference).

### Consent
No explicit consent mechanism observed; theme selection is user-driven and local.

### Retention
Indefinite storage in chrome.storage.local; no expiration or cleanup observed.

### Third Parties
- None detected

### Policy Compliance
No evidence of policy violations or privacy risks in analyzed code.

## Risks

### Risk: None detected
No significant privacy or security risks identified in analyzed files.

### Evidence
- options/options.js:1-end
- content.js:1-end
- set-json-global.js:1-end
## Validation

Schema validation: PASSED
- All required fields present
- Evidence included for all claims
- Enum values valid
