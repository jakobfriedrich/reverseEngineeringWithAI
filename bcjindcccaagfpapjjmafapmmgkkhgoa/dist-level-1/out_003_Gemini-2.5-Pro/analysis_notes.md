## content.js [chunk 1/1, lines 1-134]

### Summary
This file is the main content script. It finds JSON in a <pre> tag, parses it, and replaces it with a formatted, interactive view. It is heavily obfuscated.

### Chrome APIs
- chrome.storage.local.get (line 44)

### Event Listeners
- addEventListener (line 100)

### DOM/Sinks
- createElement
- appendChild
- getElementById
- getElementsByClassName
- createTextNode
- prepend
- remove
- cloneNode
- insertAdjacentHTML

### Dynamic Code/Obfuscation
- JSON.parse
- Minified variable names detected
- Obfuscated function chains

### Evidence
- content.js:20-130

## set-json-global.js [chunk 1/1, lines 1-10]

### Summary
This script runs in the MAIN world and exposes the parsed JSON object as a global variable `window.json` for inspection in the DevTools console.

### DOM/Sinks
- getElementById
- querySelector

### Dynamic Code/Obfuscation
- JSON.parse
- Minified variable names detected
- Obfuscated function chains

### Evidence
- set-json-global.js:9-9

## options/options.js [chunk 1/1, lines 1-23]

### Summary
This script handles the options page. It allows the user to select a theme (system, light, or dark) and saves the preference to `chrome.storage.local`.

### Chrome APIs
- chrome.storage.local.get
- chrome.storage.local.set
- chrome.storage.onChanged.addListener

### Event Listeners
- addEventListener

### Storage
- Key: "themeOverride", type: local, op: get
- Key: "themeOverride", type: local, op: set

### DOM/Sinks
- querySelectorAll

### Evidence
- options/options.js:13-22
