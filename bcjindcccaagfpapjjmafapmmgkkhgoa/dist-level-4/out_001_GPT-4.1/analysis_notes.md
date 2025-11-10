# Run 001 (GPT-4.1)
## Manifest

- Name: JSON Formatter
- Version: 0.8.0
- Manifest Version: 3
- Description: Makes JSON easy to read. Open source.
- Service Worker: none (MV3, no background.service_worker)
- Content Scripts: content.js (matches: <all_urls>, run_at: document_end), set-json-global.js (matches: <all_urls>, run_at: document_idle, world: MAIN)
- Options UI: options/options.html
- Permissions: storage
- Host Permissions: *://*/*, <all_urls>

Evidence: manifest.json:1-32
## content.js [whole-file, lines 1-553]

### Summary
Obfuscated/minified content script for JSON formatting. Main logic parses/prettifies JSON in page, injects UI, and toggles between raw/pretty views. Uses Chrome storage to read theme settings and applies them to UI. No message passing, network, or dynamic code detected. Heavy obfuscation/minification.

### Chrome APIs
- chrome.storage.local.get (line 514)

### Event Listeners
- addEventListener (DOM, multiple locations)

### Messaging
- None detected

### Storage
- Key: themeOverride, type: local, op: get (line 514)

### Endpoints
- None detected

### DOM/Sinks
- DOM manipulation: createElement, appendChild, removeChild, querySelector, getElementsByClassName, innerText, innerHTML (multiple locations)

### Dynamic Code/Obfuscation
- Minified variable names
- Control flow flattening (IIFE, switch/case)

### Risks
- Obfuscation: minified/obfuscated code reduces auditability

### Evidence
- content.js:1-553
## set-json-global.js [whole-file, lines 1-63]

### Summary
Content script exposes parsed JSON from page to global `window.json` for inspection. Reads JSON from DOM, parses, and sets as non-writable property. Logs success/failure. No Chrome APIs, messaging, network, or dynamic code. Minimal obfuscation.

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
- DOM access: getElementById, querySelector, innerText

### Dynamic Code/Obfuscation
- Minimal obfuscation (IIFE, variable names)

### Risks
- None significant

### Evidence
- set-json-global.js:1-63
## options/options.js [whole-file, lines 1-77]

### Summary
Options page script for theme selection. Reads and sets themeOverride in chrome.storage.local, updates radio buttons, and listens for changes. No messaging, network, or dynamic code. Minimal obfuscation.

### Chrome APIs
- chrome.storage.local.get (line 19)
- chrome.storage.local.set (line 38)
- chrome.storage.onChanged.addListener (line 56)

### Event Listeners
- addEventListener (DOM, lines 33, 56)

### Messaging
- None detected

### Storage
- Key: themeOverride, type: local, op: get/set (lines 19, 38)

### Endpoints
- None detected

### DOM/Sinks
- DOM manipulation: querySelectorAll, addEventListener, checked, value

### Dynamic Code/Obfuscation
- Minimal obfuscation (IIFE, variable names)

### Risks
- None significant

### Evidence
- options/options.js:1-77
## Discovered items

### Storage Keys
- userPrefs (local, content.js:1-553)
- themeOverride (local, options/options.js:1-77)

### Messaging Channels
- None detected

### Endpoints
- None detected
## Components

### Content Scripts
- Files: content.js, set-json-global.js
- APIs: chrome.storage.local.get
- Listeners: addEventListener (DOM)
- Evidence: manifest.json:1-32, content.js:1-553, set-json-global.js:1-63

### UI
- Files: options/options.js
- APIs: chrome.storage.local.get, chrome.storage.local.set, chrome.storage.onChanged.addListener
- Listeners: addEventListener (DOM)
- Evidence: options/options.js:1-77

### Flows
- Options page → chrome.storage: themeOverride get/set
- Content script → chrome.storage: themeOverride get
## Workflows

### Theme Selection Flow
**Triggers**: User selects theme in options page
**Steps**:
1. User selects theme radio button
2. Options page sets themeOverride in chrome.storage.local
3. Options page reads themeOverride from chrome.storage.local
4. Content script reads themeOverride from chrome.storage.local and applies theme

**APIs**: chrome.storage.local.get, chrome.storage.local.set
**Messages**: None
**Endpoints**: None
**Storage**: themeOverride
**Evidence**: options/options.js:1-77, content.js:1-553
## Privacy Analysis

### Data Categories
- User preferences/settings (themeOverride)

### Purposes
- Feature personalization (theme selection)

### Minimization
Collects only minimal necessary data for stated purpose (theme setting).

### Consent
No explicit consent mechanism observed (theme selection is user-driven).

### Retention
Indefinite storage in chrome.storage.local (until user changes theme).

### Third Parties
- None detected

### Policy Compliance
No privacy or policy risks detected for theme selection feature.

## Risks

### Risk: Obfuscation
**Severity**: Low
**Justification**: Minified/obfuscated code reduces auditability
**Evidence**: content.js:1-553
## Validation

Schema validation: PASSED
- All required fields present
- Evidence included for all claims
- Enum values valid
