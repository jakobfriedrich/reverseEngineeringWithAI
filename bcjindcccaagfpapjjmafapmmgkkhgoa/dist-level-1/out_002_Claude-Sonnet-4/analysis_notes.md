# Run 002 (Claude-Sonnet-4)

## Manifest

- Name: JSON Formatter
- Version: 0.8.0
- Manifest Version: 3
- Description: Makes JSON easy to read. Open source.
- Homepage: https://github.com/callumlocke/json-formatter
- No Background/Service Worker
- Content Scripts: 
  - content.js (matches: <all_urls>, run_at: document_end)
  - set-json-global.js (matches: <all_urls>, run_at: document_idle, world: MAIN)
- Options UI: options/options.html
- Permissions: storage
- Host Permissions: *://*/*, <all_urls>

Evidence: manifest.json:1-25
## content.js [whole-file, lines 1-1]

### Summary
Main content script for JSON formatting functionality. Heavily obfuscated/minified code that implements the core JSON visualization features.

### Chrome APIs
- chrome.storage.local.get (accessing themeOverride setting)

### Event Listeners
- document.addEventListener (mousedown events for expand/collapse)

### Storage
- Key: "themeOverride", type: local, op: get (theme preference retrieval)

### DOM/UI
- Extensive DOM manipulation for JSON tree visualization
- createElement, createTextNode, appendChild operations
- Dynamic CSS theme injection based on storage setting
- Button creation for Raw/Formatted toggle
- Performance timing with window.__jsonFormatterStartTime

### Obfuscation
- Heavy minification with encoded variable names
- String table obfuscation pattern
- Function chaining and webpack-style module wrapping

Evidence: content.js:1-1

## set-json-global.js [whole-file, lines 1-1]

### Summary
Secondary script that runs in MAIN world context to expose parsed JSON as global variable.

### Chrome APIs
- None

### DOM/JavaScript
- document.getElementById, querySelector for finding JSON content
- Object.defineProperty to safely expose window.json
- JSON.parse for processing raw content
- setTimeout for deferred execution
- console.log/error for debugging

### Purpose
Bridges between extension context and page context by exposing the parsed JSON data as window.json for developer inspection.

Evidence: set-json-global.js:1-1

## options/options.js [whole-file, lines 1-1]

### Summary
Options page script for managing theme preferences.

### Chrome APIs
- chrome.storage.local.get (retrieve theme setting)
- chrome.storage.local.set (save theme setting)  
- chrome.storage.onChanged.addListener (listen for setting changes)

### Event Listeners
- element.addEventListener (change events on radio buttons)

### Storage
- Key: "themeOverride", type: local, ops: get/set (theme preference management)
- Supported values: "system", "force_light", "force_dark"

### DOM/UI
- document.querySelectorAll for finding theme radio buttons
- Element manipulation for updating checked states
- Array.find for locating specific radio button values

Evidence: options/options.js:1-1

## Discovered Items

### Storage Keys
- themeOverride: Theme preference setting with values system/force_light/force_dark

### Chrome APIs Used
- chrome.storage.local.get
- chrome.storage.local.set  
- chrome.storage.onChanged.addListener

### No Network Endpoints Detected
### No Message Passing Detected
### No Dynamic Code Execution Detected

## Components

### Content Scripts
- Files: content.js, set-json-global.js
- APIs: chrome.storage.local (content.js only)
- Purpose: JSON detection, formatting, and theme application
- Context: content.js runs in ISOLATED world, set-json-global.js runs in MAIN world
- Listeners: document.addEventListener (mousedown for UI interactions)
- Evidence: manifest.json:8-17, content.js:1-1, set-json-global.js:1-1

### UI (Options Page)
- Files: options/options.html, options/options.js
- APIs: chrome.storage.local (get/set/onChanged)
- Purpose: Theme preference management
- Listeners: element.addEventListener (change events on radio buttons)
- Evidence: manifest.json:20-23, options/options.js:1-1

### No Background/Service Worker
This extension operates purely through content scripts and options page.

### No Injected Scripts
Beyond the manifest-declared content scripts, no dynamic script injection detected.

### No Page Scripts
The set-json-global.js runs in MAIN world but is still a content script, not a page-accessible resource.

## Flows

### JSON Processing Flow
1. Content script detects JSON in <pre> elements
2. Retrieves theme preference from chrome.storage.local
3. Removes original content, creates formatted JSON tree
4. Injects appropriate CSS based on theme setting
5. Main world script exposes parsed JSON as window.json

### Theme Management Flow
1. User opens options page
2. Options script loads current theme from storage
3. User selects new theme preference
4. Options script saves to chrome.storage.local
5. Storage change event triggers content script update
6. Content script applies new theme CSS

### User Interaction Flow
1. User can expand/collapse JSON tree nodes via click
2. User can toggle between Raw and Formatted views
3. All interactions handled through DOM event listeners

Evidence: All files analyzed, flows.puml generated

## Workflows

### JSON Auto-Formatting Workflow
**Triggers**: User visits page containing JSON in <pre> elements
**Steps**:
1. Content script detects page load and scans for <pre> elements
2. Validates content starts with { or [ (JSON detection regex)
3. Checks content length is under limit (3MB)
4. Retrieves theme preference from chrome.storage.local
5. Parses JSON content and creates formatted tree structure
6. Injects CSS theme styles based on storage setting
7. Replaces original <pre> with formatted JSON tree
8. Adds Raw/Formatted toggle buttons
9. Sets up expand/collapse interaction handlers

**APIs**: chrome.storage.local.get
**Storage**: themeOverride (read)
**DOM**: Extensive tree creation and manipulation
**Evidence**: content.js:1-1

### Global JSON Exposure Workflow  
**Triggers**: After JSON formatting is complete
**Steps**:
1. Main world script locates #jsonFormatterRaw element
2. Extracts innerText content from the element
3. Parses content using JSON.parse()
4. Exposes parsed object as window.json using Object.defineProperty
5. Logs success/error messages to console

**APIs**: None
**Storage**: None
**DOM**: getElementById, querySelector, Object.defineProperty
**Evidence**: set-json-global.js:1-1

### Theme Configuration Workflow
**Triggers**: User opens extension options page
**Steps**:
1. Options page loads current theme setting from chrome.storage.local
2. Updates radio button states to reflect current setting
3. User selects new theme preference (system/force_light/force_dark)
4. Change event handler saves new preference to chrome.storage.local
5. Storage change listener in content script receives update
6. Content script applies new theme CSS to formatted JSON

**APIs**: chrome.storage.local.get, chrome.storage.local.set, chrome.storage.onChanged.addListener
**Storage**: themeOverride (read/write)
**DOM**: Radio button manipulation and event handling
**Evidence**: options/options.js:1-1, content.js:1-1

### JSON Tree Interaction Workflow
**Triggers**: User clicks expand/collapse controls in formatted JSON
**Steps**:
1. User clicks on expand/collapse button (element with className 'e')
2. Mousedown event handler captures the interaction
3. Script determines current collapse state of parent element
4. Toggles 'collapsed' class on target element(s)
5. Supports Ctrl/Meta+click for expanding/collapsing all children
6. Visual state updates immediately through CSS class changes

**APIs**: None
**Storage**: None
**DOM**: Event handling, CSS class manipulation
**Evidence**: content.js:1-1

### View Toggle Workflow
**Triggers**: User clicks Raw or Formatted buttons
**Steps**:
1. User clicks either Raw or Formatted button
2. Click event handler switches active view
3. Updates hidden state of #jsonFormatterRaw vs #jsonFormatterParsed elements
4. Updates 'selected' class on appropriate button
5. Maintains toggle state for user preference

**APIs**: None
**Storage**: None  
**DOM**: Element visibility toggling, button state management
**Evidence**: content.js:1-1

## Privacy Analysis

### Data Categories
- User preferences (theme settings: system/force_light/force_dark)
- Page content (JSON data from visited pages for formatting)
- No browsing history collection
- No personally identifiable information (PII) collection
- No tracking or analytics data

### Purposes
- JSON visualization and formatting (core functionality)
- Theme preference persistence (user experience)
- Developer tool enhancement (exposing window.json for inspection)

### Minimization
Collects minimal necessary data. Only stores user's theme preference setting. JSON content is processed locally without storage or transmission.

### Consent
No explicit consent mechanism observed, but data collection is minimal and directly related to stated functionality. Theme preference is only stored when user actively configures it.

### Retention
Theme preference stored indefinitely in chrome.storage.local until user changes or removes extension. No automatic cleanup observed. JSON content is processed transiently without persistence.

### Third Parties
No third-party data sharing detected. No external network requests. All processing occurs locally within the extension context.

### Policy Compliance
Appears compliant with privacy requirements:
- No unexpected data collection
- No external data transmission  
- Minimal storage (only user preferences)
- Purpose limitation respected
- User control over theme preferences

Evidence: All files analyzed, no external communications found

## Risks

### Risk: None Significant
**Severity**: Low
**Justification**: Extension processes JSON content locally without storage or transmission. Only persistence is user's theme preference. No security-sensitive operations detected.
**Evidence**: All source files analyzed

### Obfuscation Analysis
**Finding**: Heavy code obfuscation present but appears to be standard minification
**Justification**: String table obfuscation and variable name mangling consistent with build-time optimization rather than malicious intent. Functionality matches stated purpose.
**Severity**: Low
**Evidence**: content.js:1-1, set-json-global.js:1-1, options/options.js:1-1

## Security Analysis

### Permissions Assessment
**Declared Permissions**: storage, *://*/*
**Justification**: 
- `storage` permission used appropriately for theme preferences
- Host permissions (`*://*/*`) required for content script injection on all pages for JSON detection
- Permissions align with stated functionality

### Content Security
- No remote code execution detected
- No eval() or Function() constructor usage
- No external script loading
- JSON parsing uses native JSON.parse() (safe)

### Injection Safety
- Content scripts run in isolated world (content.js)
- Main world script (set-json-global.js) safely exposes read-only global
- No innerHTML usage that could create XSS vulnerabilities
- DOM manipulation uses safe methods (createElement, textContent)

### Storage Security
- Only non-sensitive theme preference stored
- No credential or token storage
- chrome.storage.local provides appropriate isolation

Evidence: All source files analyzed, no security vulnerabilities identified
