# Run 003 (Gemini-2.5-Pro)

## Manifest

- Name: JSON Formatter
- Version: 0.8.0
- Manifest Version: 3
- Description: Makes JSON easy to read. Open source.
- Content Scripts: 
  - content.js (matches: <all_urls>, run_at: document_end)
  - set-json-global.js (matches: <all_urls>, run_at: document_idle, world: MAIN)
- Permissions: storage
- Host Permissions: *://*/*, <all_urls>
- Options UI: options/options.html

Evidence: manifest.json:1-25

