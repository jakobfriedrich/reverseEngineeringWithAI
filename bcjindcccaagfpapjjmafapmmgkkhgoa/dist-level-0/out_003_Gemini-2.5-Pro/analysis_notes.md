# Run 003 (Gemini-2.5-Pro)

## Manifest

- Name: JSON Formatter
- Version: 0.8.0
- Manifest Version: 3
- Content Scripts: 
  - content.js (matches: <all_urls>)
  - set-json-global.js (matches: <all_urls>)
- Permissions: storage
- Host Permissions: *://*/*, <all_urls>

Evidence: manifest.json:1-33
## content.js [chunk 1/1, lines 1-538]

### Summary
This file handles the main JSON formatting logic. It finds the JSON content in a `<pre>` tag, parses it, and then replaces it with a formatted, interactive view. It also handles theme switching (light/dark) based on user preferences from `chrome.storage`.

### Chrome APIs
- `chrome.storage.local.get` (line 438)

### Event Listeners
- `mousedown` (line 508, 511, 515)

### DOM/Sinks
- `document.createElement`
- `document.body.children`
- `document.head.appendChild`
- `document.body.appendChild`
- `document.body.prepend`
- `element.remove`
- `element.append`

### Dynamic Code/Obfuscation
- Minified variable names detected

### Risks
- None in this chunk

### Evidence
- content.js:438-454
- content.js:525-537
## set-json-global.js [chunk 1/1, lines 1-16]

### Summary
This content script exposes the raw JSON as a global variable `window.json` for developer inspection.

### DOM/Sinks
- `document.getElementById`
- `querySelector`

### Dynamic Code/Obfuscation
- `Object.defineProperty`

### Risks
- None in this chunk

### Evidence
- set-json-global.js:3-15
## options/options.js [chunk 1/1, lines 1-27]

### Summary
This script manages the extension's options page. It allows the user to select a theme (system, light, or dark) and saves the preference to `chrome.storage.local`.

### Chrome APIs
- `chrome.storage.local.get` (line 9)
- `chrome.storage.local.set` (line 17)
- `chrome.storage.onChanged` (line 24)

### Event Listeners
- `change` (line 13)

### Storage
- Key: "themeOverride", type: local, op: get (line 9)
- Key: "themeOverride", type: local, op: set (line 17)

### DOM/Sinks
- `document.querySelectorAll`

### Risks
- None in this chunk

### Evidence
- options/options.js:1-27
