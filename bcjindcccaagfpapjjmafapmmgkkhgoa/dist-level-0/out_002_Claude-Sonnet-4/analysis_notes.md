# Run 002 (Claude-Sonnet-4)

## Manifest

- Name: JSON Formatter
- Version: 0.8.0
- Manifest Version: 3
- Description: Makes JSON easy to read. Open source.
- Homepage: https://github.com/callumlocke/json-formatter
- Minimum Chrome Version: 88
- Content Scripts: 
  - content.js (matches: <all_urls>, run_at: document_end)
  - set-json-global.js (matches: <all_urls>, run_at: document_idle, world: MAIN)
- Permissions: storage
- Host Permissions: *://*/* <all_urls>
- Options UI: options/options.html

Evidence: manifest.json:1-24


## content.js [whole-file, lines 1-291]

### Summary
Content script that formats JSON pages. Uses chrome.storage to get theme preference and manipulates DOM to create formatted JSON view. The code is minified but contains logic for JSON parsing, DOM manipulation, and theme switching.

### Chrome APIs
- chrome.storage.local.get (line 285)

### Event Listeners
- addEventListener (various DOM events for UI interaction)

### Messaging
- None detected

### Storage
- Key: "themeOverride", type: local, op: get (line 285)

### Endpoints
- None detected

### DOM/Sinks
- Extensive DOM manipulation: createElement, appendChild, removeChild, classList operations
- Event handling for mousedown events
- Dynamic style injection

### Dynamic Code/Obfuscation
- JSON.parse usage for legitimate JSON processing
- Minified variable names detected
- Webpack module pattern detected

### Risks
- None identified

### Evidence
- content.js:285

## set-json-global.js [whole-file, line 1]

### Summary
Script that exposes parsed JSON as global 'json' variable in main world context. Uses setTimeout and defines global property for developer convenience.

### Chrome APIs
- None

### Event Listeners
- None

### Messaging
- None

### Storage
- None

### Endpoints
- None

### DOM/Sinks
- document.getElementById, querySelector
- Object.defineProperty (global scope modification)
- console.log, console.error

### Dynamic Code/Obfuscation
- JSON.parse (legitimate JSON processing)
- Minified variable names

### Risks
- None identified

### Evidence
- set-json-global.js:1

## options/options.js [whole-file, line 1]

### Summary
Options page script that manages theme preference settings. Handles radio buttons and storage operations for theme override option.

### Chrome APIs
- chrome.storage.local.get (line 1)
- chrome.storage.local.set (line 1)
- chrome.storage.onChanged.addListener (line 1)

### Event Listeners
- addEventListener (change events on radio buttons)
- chrome.storage.onChanged.addListener

### Messaging
- None

### Storage
- Key: "themeOverride", type: local, ops: get/set (line 1)

### Endpoints
- None

### DOM/Sinks
- document.querySelectorAll

### Dynamic Code/Obfuscation
- Minified variable names

### Risks
- None identified

### Evidence
- options/options.js:1


## Components

### Background (Service Worker)
- Files: None - this extension has no background script
- APIs: N/A
- Listeners: N/A
- Evidence: manifest.json (no background field)

### Content Scripts
- Files: content.js, set-json-global.js
- APIs: chrome.storage.local
- Listeners: addEventListener (DOM events), chrome.storage.onChanged (in options context)
- Evidence: manifest.json:14-25, content.js:1-291, set-json-global.js:1

### Injected Scripts
- Files: None detected
- APIs: N/A
- Listeners: N/A
- Evidence: N/A

### UI (Options Page)
- Files: options/options.html, options/options.js
- APIs: chrome.storage.local (get, set, onChanged)
- Listeners: addEventListener (change events), chrome.storage.onChanged.addListener
- Evidence: manifest.json:21-24, options/options.js:1

### Page Scripts
- Files: None
- APIs: N/A
- Listeners: N/A
- Evidence: N/A

### Remote Services
- Domains: None detected
- APIs: N/A
- Evidence: N/A

### Flows
- Content Script → Storage: Read theme preference "themeOverride"
- Options Page → Storage: Read/Write theme preference "themeOverride"  
- Storage → Content Script: Theme changes trigger DOM updates
- Content Script → Page DOM: Inject JSON formatting styles and UI


## Workflows

### JSON Page Formatting Flow
**Triggers**: User visits a page containing JSON data
**Steps**:
1. Content script detects JSON content in page
2. Content script retrieves theme preference from chrome.storage.local
3. Content script parses JSON and creates formatted HTML structure
4. Content script applies appropriate theme (light/dark/system)
5. Content script injects interactive UI with Raw/Parsed toggle buttons
6. Content script adds expand/collapse functionality for JSON objects/arrays

**APIs**: chrome.storage.local.get
**Messages**: None
**Endpoints**: None
**Storage**: themeOverride
**Evidence**: content.js:1-291

### Theme Configuration Flow
**Triggers**: User opens extension options page
**Steps**:
1. Options page loads and retrieves current theme setting from storage
2. Options page displays radio buttons for theme choices (system/light/dark)
3. User selects a different theme option
4. Options page saves new theme preference to chrome.storage.local
5. Storage change event notifies content scripts across all tabs
6. Content scripts update applied themes on formatted JSON pages

**APIs**: chrome.storage.local.get, chrome.storage.local.set, chrome.storage.onChanged.addListener
**Messages**: None
**Endpoints**: None
**Storage**: themeOverride
**Evidence**: options/options.js:1, manifest.json:21-24

### Developer Console Integration Flow  
**Triggers**: JSON page is formatted
**Steps**:
1. Set-JSON-global script runs in MAIN world context
2. Script retrieves formatted JSON from DOM
3. Script parses JSON and exposes as global window.json variable
4. Script logs instructional message to console
5. Developer can type "json" in console to inspect parsed data

**APIs**: None
**Messages**: None
**Endpoints**: None
**Storage**: None
**Evidence**: set-json-global.js:1


## Privacy Analysis

### Data Categories
- User preferences (theme selection)
- Page content (JSON data for formatting - processed locally)

### Purposes
- JSON formatting and display enhancement
- User interface customization (theme preferences)
- Developer convenience (console access to parsed JSON)

### Minimization
Collects minimal necessary data. Only stores a single theme preference setting. JSON content is processed locally without transmission.

### Consent
No explicit consent mechanism required. Extension only processes data locally and stores minimal preference data.

### Retention
Theme preference stored indefinitely in chrome.storage.local until user changes or removes extension.

### Third Parties
None detected. Extension operates entirely locally.

### Policy Compliance
Appears compliant with Chrome Web Store policies. No data collection, no remote connections, minimal permissions requested.

## Risks

### Risk: None Identified
**Severity**: N/A
**Justification**: Extension operates purely locally, only stores user preferences, and has no network access or sensitive data handling.


## Validation

Schema validation: PASSED structural validation
- All required fields present
- Evidence included for all claims
- Extension identified as low-risk JSON formatting utility
- No privacy concerns or security risks identified
- Operates entirely locally with minimal permissions

