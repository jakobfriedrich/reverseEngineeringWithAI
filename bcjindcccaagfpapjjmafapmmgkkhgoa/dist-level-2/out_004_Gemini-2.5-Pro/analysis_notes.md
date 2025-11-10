# Run 004 (Gemini-2.5-Pro)

## Manifest

- Name: JSON Formatter
- Version: 0.8.0
- Manifest Version: 3
- Service Worker: null
- Content Scripts: 
  - content.js (matches: <all_urls>)
  - set-json-global.js (matches: <all_urls>)
- Permissions: storage
- Host Permissions: *://*/*, <all_urls>

Evidence: manifest.json:1-36

## content.js [chunk whole-file, lines 1-438]

### Summary
This file is the core content script for formatting JSON. It finds JSON in a <pre> tag, parses it, and renders it as a collapsible tree. It uses chrome.storage to get theme preferences. The code is obfuscated.

### Chrome APIs
- chrome.storage.local.get (line 322)

### Event Listeners
- document.addEventListener('mousedown', ...) (line 420)

### Messaging
- None

### Storage
- Key: "themeOverride", type: local, op: get (line 322)

### Endpoints
- None

### DOM/Sinks
- Extensive DOM manipulation to build the formatted JSON view.
- getElementsByClassName, createElement, appendChild, etc.

### Dynamic Code/Obfuscation
- Minified variable names detected.
- Heavy use of a string array and a resolver function, a common obfuscation pattern.

### Risks
- None identified in this chunk.

### Evidence
- content.js:320-331
- content.js:402-434

## set-json-global.js [chunk whole-file, lines 1-38]

### Summary
This script exposes the raw JSON data to the main world as a global variable named `json`. This is a developer convenience feature. The code is obfuscated.

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
- `document.getElementById('jsonFormatterRaw')`
- `element.querySelector('pre')`
- `element.innerText`

### Dynamic Code/Obfuscation
- `Object.defineProperty(window, 'json', ...)`
- Minified variable names detected.

### Risks
- None identified in this chunk.

### Evidence
- set-json-global.js:28-37

## options/options.js [chunk whole-file, lines 1-56]

### Summary
This script handles the logic for the extension's options page. It saves the user's theme preference to chrome.storage.local. The code is obfuscated.

### Chrome APIs
- chrome.storage.local.get (line 42)
- chrome.storage.local.set (line 49)
- chrome.storage.onChanged.addListener (line 53)

### Event Listeners
- addEventListener('change', ...) on theme radio buttons (line 46)
- chrome.storage.onChanged.addListener (line 53)

### Messaging
- None

### Storage
- Key: "themeOverride", type: local, op: get/set

### Endpoints
- None

### DOM/Sinks
- document.querySelectorAll

### Dynamic Code/Obfuscation
- Minified variable names detected.

### Risks
- None identified in this chunk.

### Evidence
- options/options.js:38-55

## Components

### Content Scripts
- **Files**: content.js, set-json-global.js
- **APIs**: chrome.storage.local
- **Listeners**: DOMContentLoaded, mousedown
- **Purpose**: `content.js` is the main script that finds and formats JSON on a page. `set-json-global.js` exposes the parsed JSON as a global variable `json` for developers.
- **Evidence**: manifest.json:13-27

### UI (Options)
- **Files**: options/options.html, options/options.js
- **APIs**: chrome.storage.local
- **Listeners**: change on radio buttons, chrome.storage.onChanged
- **Purpose**: Provides a UI for the user to select a theme preference, which is saved to storage.
- **Evidence**: manifest.json:31-34, options/options.js:38-55

## Flows
- **JSON Formatting**: Page Load -> `content.js` runs -> Reads `pre` tag content -> Renders formatted JSON.
- **Theme Selection**: User opens Options -> `options.js` loads -> User selects theme -> `options.js` saves theme to `chrome.storage.local` -> `content.js` reads theme on next format.
- **Developer Feature**: Page Load -> `set-json-global.js` runs -> Exposes parsed JSON as `window.json`.
- **Evidence**: flows.puml

## Privacy Analysis

### Data Categories
- User preferences (theme)

### Purposes
- Personalization

### Minimization
Collects only the theme preference, which is minimal and necessary for the feature.

### Consent
Implicit consent is given when the user changes the theme in the options page.

### Retention
Indefinite. The theme setting is stored until changed or the extension is removed.

### Third Parties
- None

### Policy Compliance
- No compliance issues found.

## Risks
- None identified.

## Validation

Schema validation: PASSED
- All required fields present
- Evidence included for all claims
- Enum values valid
