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

Evidence: manifest.json:1-34
## content.js [chunk 1/1, lines 1-553]

### Summary
This script is heavily obfuscated. It seems to be responsible for formatting JSON content on the page. It reads configuration from `chrome.storage.local`, creates a formatted view of the JSON, and injects it into the page. It also adds controls to switch between raw and formatted views.

### Chrome APIs
- `chrome.storage.local.get` (line 478)

### Event Listeners
- `addEventListener` (lines 510, 513, 520)

### DOM/Sinks
- `createElement`
- `appendChild`
- `cloneNode`
- `removeChild`
- `insertAdjacentHTML`

### Dynamic Code/Obfuscation
- Minified variable names detected.
- Use of a large string array and a decoder function, a common obfuscation technique.
- Control flow flattening at the beginning of the script.

### Risks
- No significant risks identified in this chunk. The code appears to be focused on formatting and displaying JSON.

### Evidence
- content.beautified.js:478
- content.beautified.js:510-520
- content.beautified.js:288-460
## set-json-global.js [chunk 1/1, lines 1-53]

### Summary
This script is also obfuscated. It finds the raw JSON content within the `jsonFormatterRaw` element, parses it, and then exposes the parsed object as a global variable named `json` on the `window` object. This is likely for the convenience of developers who want to inspect the JSON data from the console.

### Chrome APIs
- None

### Event Listeners
- None

### DOM/Sinks
- `getElementById`
- `querySelector`
- `innerText`

### Dynamic Code/Obfuscation
- Minified variable names detected.
- Use of a large string array and a decoder function.
- Control flow flattening.

### Risks
- No risks identified.

### Evidence
- set-json-global.beautified.js:42-51
## options/options.js [chunk 1/1, lines 1-68]

### Summary
This script manages the extension's options page. It's responsible for loading the current theme setting from `chrome.storage.local` and displaying it. It also saves the user's selection back to storage when they change the theme. The script is obfuscated.

### Chrome APIs
- `chrome.storage.local.get`
- `chrome.storage.local.set`
- `chrome.storage.onChanged.addListener`

### Event Listeners
- `addEventListener`

### DOM/Sinks
- `querySelectorAll`

### Dynamic Code/Obfuscation
- Minified variable names detected.
- Use of a large string array and a decoder function.
- Control flow flattening.

### Risks
- No risks identified.

### Evidence
- options/options.beautified.js:49-68
