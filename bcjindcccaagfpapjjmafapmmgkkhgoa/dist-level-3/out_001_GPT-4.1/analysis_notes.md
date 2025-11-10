# Manifest

- Name: JSON Formatter
- Version: 0.8.0
- Manifest Version: 3
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

## content.js [whole-file, lines 1-2000]

### Summary
Obfuscated/minified content script for JSON formatting. Main logic parses and renders JSON, manages theme, and UI toggles. Uses Chrome storage API for theme settings. No network calls, messaging, or dynamic code execution detected in this chunk.

### Chrome APIs
- chrome.storage.local.get (line: approx 300, obfuscated)

### Event Listeners
- addEventListener (DOM, various UI elements)

### Messaging
- None detected

### Storage
- Key: themeOverride, type: local, op: get (line: approx 300, obfuscated)

### Endpoints
- None detected

### DOM/Sinks
- Extensive DOM manipulation for JSON rendering and theme switching

### Dynamic Code/Obfuscation
- Minified variable names
- Control flow flattening (IIFE, numeric switch)

### Risks
- None significant in this chunk

### Evidence
- content.js:1-2000

## set-json-global.js [whole-file, lines 1-2000]

### Summary
Obfuscated/minified content script. Reads JSON from DOM and exposes it as a global variable `json` on the window object for inspection. No Chrome API usage, messaging, network, or dynamic code execution detected in this chunk.

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
- Reads from DOM (body > pre#jsonFormatterRaw)
- Sets window property

### Dynamic Code/Obfuscation
- Minified variable names
- Control flow flattening (IIFE)

### Risks
- None significant in this chunk

### Evidence
- set-json-global.js:1-2000

## options/options.js [whole-file, lines 1-2000]

### Summary
Obfuscated/minified options page script. Handles theme selection UI and persists user choice in Chrome storage. Registers event listeners for radio buttons and updates storage. No network calls, messaging, or dynamic code execution detected in this chunk.

### Chrome APIs
- chrome.storage.local.get
- chrome.storage.local.set
- chrome.storage.onChanged.addListener

### Event Listeners
- addEventListener (change on radio buttons)
- chrome.storage.onChanged.addListener

### Messaging
- None detected

### Storage
- Key: themeOverride, type: local, op: get/set

### Endpoints
- None detected

### DOM/Sinks
- Manipulates DOM for theme selection UI

### Dynamic Code/Obfuscation
- Minified variable names
- Control flow flattening (IIFE)

### Risks
- None significant in this chunk

### Evidence
- options/options.js:1-2000

## Discovered items

### Storage Keys
- themeOverride (chrome.storage.local, used in content.js and options/options.js)

### Event Listeners
- addEventListener (DOM, content.js, options/options.js)
- chrome.storage.onChanged.addListener (options/options.js)

### Chrome APIs
- chrome.storage.local.get (content.js, options/options.js)
- chrome.storage.local.set (options/options.js)

### Evidence
- content.js:1-2000
- options/options.js:1-2000

## Workflows

### Theme Selection Flow
**Triggers**: User selects theme in options UI
**Steps**:
1. User selects theme radio button in options page
2. Options UI saves themeOverride to chrome.storage.local
3. Content script reads themeOverride from chrome.storage.local
4. Content script applies theme to JSON view

**APIs**: chrome.storage.local.get, chrome.storage.local.set
**Messages**: None
**Endpoints**: None
**Storage**: themeOverride
**Evidence**: options/options.js:1-2000, content.js:1-2000

## Privacy Analysis

### Data Categories
- User preferences/settings (themeOverride)

### Purposes
- Personalization (theme selection)

### Minimization
Collects only minimal data required for stated purpose (theme setting).

### Consent
No explicit consent mechanism observed; theme selection is user-driven.

### Retention
Indefinite storage in chrome.storage.local; no expiration or cleanup observed.

### Third Parties
- None detected

### Policy Compliance
No privacy or policy risks detected. No PII, tracking, or remote code execution.

### Evidence
- content.js:1-2000
- options/options.js:1-2000

## Risks

### Risk: None detected
**Severity**: None
**Justification**: No tracking, PII, excessive permissions, remote code, or insecure storage observed. Only user-driven theme preference is stored locally.
**Evidence**: content.js:1-2000, options/options.js:1-2000

## Validation

Schema validation: PASSED
- All required fields present
- Evidence included for all claims
- Enum values valid
