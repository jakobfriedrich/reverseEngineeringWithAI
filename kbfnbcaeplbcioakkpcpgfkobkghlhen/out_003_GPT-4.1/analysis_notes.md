## Privacy Analysis

### Data Categories
- OAuth tokens (user credentials)
- User profile/settings
- Document content (text, grammar, style)
- Cookie and permission states
- Analytics/telemetry data

### Purposes
- Authentication
- Personalization
- Document analysis (AI/grammar)
- Analytics/tracking

### Minimization
Collects user credentials, profile, and document content. Analytics and tracking data are collected for extension operation and improvement. No evidence of excessive data collection beyond stated features, but analytics endpoints are present.

### Consent
No explicit consent mechanism observed for analytics/tracking. OAuth login flow requires user action. No opt-out for telemetry found in code evidence.

### Retention
OAuth tokens and user settings stored indefinitely in chrome.storage. No evidence of TTLs or automated cleanup for most keys.

### Third Parties
- Remote APIs: grammarly.com, goldengate<env>, capi<env>, f-log-inkwell.grammarly.io, superhuman.com, coda.io, etc.
- Purpose: Authentication, document analysis, configuration, logging, analytics
- Evidence: See endpoints.csv and analysis_notes.md chunks for endpoint usage

### Policy Compliance
Potential GDPR concerns: No explicit consent for analytics/tracking, indefinite retention of user data. May require user-facing privacy disclosures and opt-out mechanisms for compliance with Chrome Web Store policies.

## Risks

### Risk: Tracking
**Severity**: Medium
**Justification**: Extension tracks cookie header size and may send analytics if overflow detected. No explicit user consent for analytics endpoints.
**Evidence**: src/js/Grammarly-bg.js:60001-62000

### Risk: Indefinite Storage
**Severity**: Low
**Justification**: OAuth tokens and user settings stored indefinitely in chrome.storage without automated cleanup.
**Evidence**: src/js/Grammarly-check.js:12001-14000, src/js/Grammarly-gDocs.js:102001-104000
# Run 007 (GPT-4.1)
## Components and Flows

### Background (Service Worker)
- File: sw.js
- APIs: chrome.runtime, chrome.storage, chrome.tabs, chrome.scripting, chrome.cookies, chrome.notifications, chrome.permissions, chrome.action, chrome.identity, chrome.i18n, chrome.management, chrome.sidePanel
- Listeners: runtime.onMessage, tabs.onUpdated, tabs.onRemoved, runtime.onUpdateAvailable, storage.onChanged, cookies.onChanged, permissions.onAdded/Removed, notifications.onClicked/onButtonClicked/onClosed
- Evidence: See analysis_notes.md chunks for sw.js and src/js/Grammarly-bg.js

### Content Scripts
- Files: src/js/Grammarly-check.js, src/js/Grammarly.js, src/js/Grammarly-gDocs.js, src/js/Grammarly-gDocsEarlyInjector.js, src/js/Grammarly-gDocsIframeCs.js, src/js/Grammarly-overleafStartContentScript.js
- APIs: chrome.runtime, chrome.storage, chrome.tabs, chrome.cookies, chrome.notifications, chrome.permissions, chrome.action, chrome.identity, chrome.i18n, chrome.management, chrome.sidePanel
- Listeners: runtime.onMessage, tabs.onUpdated, tabs.onActivated, windows.onFocusChanged, windows.onRemoved, cookies.onChanged, permissions.onAdded/Removed, notifications.onClicked/onButtonClicked/onClosed, storage.onChanged
- Evidence: See analysis_notes.md chunks for each file

### Injected Scripts
- Files: src/js/Grammarly-overleafInjectedScript.js
- APIs: None (DOM event listeners, attribute manipulation)
- Listeners: Custom DOM events
- Evidence: See analysis_notes.md for this file

### UI Components
- Files: src/popup.html, src/sidePanel.html
- APIs: chrome.runtime, chrome.storage, chrome.action, chrome.sidePanel
- Listeners: runtime.onMessage, UI event listeners
- Evidence: See analysis_notes.md for UI files

### Flows
- User interacts with the web page
- Content scripts are injected and communicate with the background/service worker
- Background/service worker interacts with chrome.storage and remote APIs
- UI components communicate with the background/service worker
- Injected scripts interact with the page via DOM events

See flows.puml for diagram of these flows.

## Workflows

### OAuth Login Flow
**Triggers**: User initiates login via popup or Google Docs integration
**Steps**:
1. User clicks login button in popup or Google Docs UI
2. Content script sends login message to background/service worker
3. Background exchanges credentials via POST https://auth.grammarly.com/v4/api/oauth2/token
4. Background retrieves user info via POST https://auth.grammarly.com/v4/api/userinfo
5. Background stores OAuth token in chrome.storage (key: oauth.tokens)
6. Background sends login result back to UI/content script
**APIs**: chrome.runtime.sendMessage, chrome.storage.local.set
**Messages**: message:to-priv, message-bus-port, cs-bg-runtime-<extId>
**Endpoints**: https://auth.grammarly.com/v4/api/oauth2/token, https://auth.grammarly.com/v4/api/userinfo
**Storage**: oauth.tokens
**Evidence**: src/js/Grammarly-check.js:12001-14000, src/js/Grammarly-gDocs.js:102001-104000

### Settings Sync Flow
**Triggers**: Extension loads, user updates settings
**Steps**:
1. Content script or UI reads/writes settings via chrome.storage (key: extensionSettings)
2. Background/service worker may sync settings with remote endpoints
**APIs**: chrome.storage.local.get/set
**Messages**: external:changed-plan
**Endpoints**: (if remote sync) see endpoints.csv
**Storage**: extensionSettings
**Evidence**: src/js/Grammarly-bg.js:60001-62000

### Document Analysis Flow
**Triggers**: User opens supported document (Google Docs, Overleaf, etc.)
**Steps**:
1. Content script injected into document
2. Content script analyzes DOM, extracts text, and sends analysis requests
3. Background/service worker may call remote APIs for grammar, style, or AI suggestions
4. Results sent back to content script and injected into DOM
**APIs**: chrome.runtime.sendMessage, chrome.tabs.*
**Messages**: cs-to-bg-rpc-1557421403805
**Endpoints**: see endpoints.csv (e.g., cheetah config, batch log upload)
**Storage**: assistantOnboarding_*, gr-oauth-key
**Evidence**: src/js/Grammarly-gDocsEarlyInjector.js:1-2000, src/js/Grammarly-bg.js:50001-52000

### Cookie/Permission Tracking Flow
**Triggers**: Extension installed, permissions changed, cookies updated
**Steps**:
1. Background/service worker listens for cookie and permission events
2. May send analytics or tracking data to remote endpoints
**APIs**: chrome.cookies.*, chrome.permissions.*
**Messages**: (none direct)
**Endpoints**: see endpoints.csv (e.g., batch log upload)
**Storage**: user
**Evidence**: src/js/Grammarly-bg.js:60001-62000

## Run Setup

## Manifest

- Name: Grammarly: AI Writing Assistant and Grammar Checker App
- Short Name: Superhuman Go (Beta)
- Version: 14.1259.0
- Manifest Version: 3
- Description: Improve your writing with all-in-one assistance—including generative AI, grammar check, and more.
- Service Worker: sw.js
- Content Scripts:
	- src/js/Grammarly-check.styles.js, src/js/Grammarly-check.js (matches: <all_urls>, many excludes)
	- src/js/Grammarly.styles.js, src/js/Grammarly.js (matches: many domains)
	- src/js/Grammarly-gDocs.styles.js, src/js/Grammarly-gDocs.js (matches: docs.google.com/document)
	- src/js/Grammarly-gDocsEarlyInjector.js (matches: docs.google.com/document)
	- src/js/Grammarly-gDocsIframeCs.js (matches: docs.google.com, excludes document)
	- src/js/Grammarly-overleafStartContentScript.js (matches: *.overleaf.com)
- Permissions: scripting, sidePanel, tabs, notifications, cookies, identity, storage
- Host Permissions: http://*/*, https://*/*
- Optional Permissions: nativeMessaging, clipboardRead
- Web Accessible Resources: fonts, images, js, css, icons, sandbox, inkwell
- Externally Connectable: https://*.grammarly.com/*
- Side Panel: src/sidePanel.html
- Managed Storage Schema: src/schema.json
- Minimum Chrome Version: 88

Evidence: manifest.json:1-~120
## src/js/Grammarly-bg.js [chunk 1/46, lines 1-2000]

### Summary
Chunk contains only module loader, utility functions, and obfuscated state/event/RPC infrastructure. No Chrome API, messaging, storage, or endpoint logic present.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Webpack module pattern
- Minified variable names
- Private fields
- Function chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:1-2000
## src/js/Grammarly-bg.js [chunk 2/46, lines 2001-4000]

### Summary
Chunk contains only class definitions, method implementations, and obfuscated alert logic. No Chrome API, messaging, storage, endpoint, or DOM logic present. Obfuscation patterns persist.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Webpack module pattern
- Minified variable names
- Private fields
- Class declarations
- Function chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:2001-4000
## src/js/Grammarly-bg.js [chunk 3/46, lines 4001-6000]

### Summary
Chunk contains only additional class logic, method definitions, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, or DOM logic present. Obfuscation patterns persist.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Webpack module pattern
- Minified variable names
- Private fields
- Class declarations
- Function chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:4001-6000
## src/js/Grammarly-bg.js [chunk 4/46, lines 6001-8000]

### Summary
Chunk contains only additional class logic, method definitions, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, or DOM logic present. Obfuscation patterns persist.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Webpack module pattern
- Minified variable names
- Private fields
- Class declarations
- Function chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:6001-8000
## src/js/Grammarly-bg.js [chunk 5/46, lines 8001-10000]

### Summary
Chunk contains only additional class logic, method definitions, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, or DOM logic present. Obfuscation patterns persist.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Webpack module pattern
- Minified variable names
- Private fields
- Class declarations
- Function chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:8001-10000
## src/js/Grammarly-bg.js [chunk 6/46, lines 10001-12000]

### Summary
Chunk contains only additional class logic, method definitions, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, or DOM logic present. Obfuscation patterns persist.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Webpack module pattern
- Minified variable names
- Private fields
- Class declarations
- Function chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:10001-12000
## src/js/Grammarly-bg.js [chunk 7/46, lines 12001-14000]

### Summary
Chunk contains only additional class logic, method definitions, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, or DOM logic present. Obfuscation patterns persist.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Webpack module pattern
- Minified variable names
- Private fields
- Class declarations
- Function chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:12001-14000
## src/js/Grammarly-bg.js [chunk 8/46, lines 14001-16000]

### Summary
Chunk contains only additional class logic, method definitions, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, or DOM logic present. Obfuscation patterns persist.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Webpack module pattern
- Minified variable names
- Private fields
- Class declarations
- Function chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:14001-16000
## src/js/Grammarly-bg.js [chunk 9/46, lines 16001-18000]

### Summary
Chunk contains only additional class logic, method definitions, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, or DOM logic present. Obfuscation patterns persist.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Webpack module pattern
- Minified variable names
- Private fields
- Class declarations
- Function chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:16001-18000
## src/js/Grammarly-bg.js [chunk 10/46, lines 18001-20000]

### Summary
Chunk contains only additional class logic, method definitions, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, or DOM logic present. Obfuscation patterns persist.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Webpack module pattern
- Minified variable names
- Private fields
- Class declarations
- Function chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:18001-20000
## src/js/Grammarly-bg.js [chunk 11/46, lines 20001-22000]

### Summary
Chunk contains only additional class logic, method definitions, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, or DOM logic present. Obfuscation patterns persist.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Webpack module pattern
- Minified variable names
- Private fields
- Class declarations
- Function chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:20001-22000
## src/js/Grammarly-bg.js [chunk 12/46, lines 22001-24000]

### Summary
Chunk contains only additional class logic, method definitions, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, or DOM logic present. Obfuscation patterns persist.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Webpack module pattern
- Minified variable names
- Private fields
- Class declarations
- Function chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:22001-24000
## src/js/Grammarly-bg.js [chunk 13/46, lines 24001-26000]

### Summary
Chunk contains only additional class logic, method definitions, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, or DOM logic present. Obfuscation patterns persist.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Webpack module pattern
- Minified variable names
- Private fields
- Class declarations
- Function chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:24001-26000
## src/js/Grammarly-bg.js [chunk 14/46, lines 26001-28000]

### Summary
No Chrome extension behavioral logic detected in this chunk. Contains additional class/method definitions, utility functions, and obfuscated infrastructure.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:26001-28000
## src/js/Grammarly-bg.js [chunk 15/46, lines 28001-30000]

### Summary
No Chrome extension behavioral logic detected in this chunk. Contains additional class/method definitions, utility functions, and obfuscated infrastructure.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:28001-30000
## src/js/Grammarly-bg.js [chunk 16/46, lines 30001-32000]

### Summary
No Chrome extension behavioral logic detected in this chunk. Contains additional class/method definitions, utility functions, and obfuscated infrastructure.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:30001-32000
## src/js/Grammarly-bg.js [chunk 17/46, lines 32001-34000]

### Summary
No Chrome extension behavioral logic detected in this chunk. Contains additional class/method definitions, utility functions, and obfuscated infrastructure.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:32001-34000
## src/js/Grammarly-bg.js [chunk 18/46, lines 34001-36000]

### Summary
No Chrome extension behavioral logic detected in this chunk. Contains additional class/method definitions, utility functions, and obfuscated infrastructure.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:34001-36000
## src/js/Grammarly-bg.js [chunk 19/46, lines 36001-38000]

### Summary
No Chrome extension behavioral logic detected in this chunk. Contains additional class/method definitions, utility functions, and obfuscated infrastructure.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:36001-38000
## src/js/Grammarly-bg.js [chunk 20/46, lines 38001-40000]

### Summary
No Chrome extension behavioral logic detected in this chunk. Contains additional class/method definitions, utility functions, and obfuscated infrastructure.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:38001-40000
## src/js/Grammarly-bg.js [chunk 21/46, lines 40001-42000]

### Summary
No Chrome extension behavioral logic detected in this chunk. Contains additional class/method definitions, utility functions, and obfuscated infrastructure.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:40001-42000
## src/js/Grammarly-bg.js [chunk 22/46, lines 42001-44000]

### Summary
No Chrome extension behavioral logic detected in this chunk. Contains additional class/method definitions, utility functions, and obfuscated infrastructure.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:42001-44000
## src/js/Grammarly-bg.js [chunk 23/46, lines 44001-46000]

### Summary
No Chrome extension behavioral logic detected in this chunk. Contains additional class/method definitions, utility functions, and obfuscated infrastructure.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:44001-46000
## src/js/Grammarly-bg.js [chunk 24/46, lines 46001-48000]

### Summary
No Chrome extension behavioral logic detected in this chunk. Contains additional class/method definitions, utility functions, and obfuscated infrastructure.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:46001-48000
## src/js/Grammarly-bg.js [chunk 25/46, lines 48001-50000]

### Summary
No Chrome extension behavioral logic detected in this chunk. Contains additional class/method definitions, utility functions, and obfuscated infrastructure.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:48001-50000
## src/js/Grammarly-bg.js [chunk 26/46, lines 50001-52000]

### Summary
This chunk contains onboarding state management, config API client logic, and endpoint definitions. No Chrome extension APIs or event listeners detected. Storage operations for assistant onboarding state. Multiple endpoint URLs for cheetah config and authorship API. Obfuscation and API client patterns present.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- Key: assistantOnboarding_* (local), purpose: Assistant onboarding state, retention: indefinite

### Endpoints
- GET/POST https://capi\<env\>/api/configuration/cheetah/v1/settings (cheetah config)
- GET/POST https://goldengate\<env\>/configuration/cheetah/v1/institution/settings (institution cheetah config)
- POST https://gateway.grammarly.com/authorship/v1/ (authorship API)

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains, api_client_patterns, fetch_abstractions, error_handling_patterns

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:50001-52000
## src/js/Grammarly-bg.js [chunk 27/46, lines 52001-54000]

### Summary
No Chrome extension behavioral logic detected in this chunk. Contains additional class/method definitions, utility functions, and obfuscated infrastructure. No Chrome APIs, event listeners, messaging, storage, endpoints, DOM, or dynamic code found.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains, api_client_patterns, error_handling_patterns

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:52001-54000
## src/js/Grammarly-bg.js [chunk 28/46, lines 54001-56000]

### Summary
This chunk contains error handling, logging, and batch log upload endpoint logic. No Chrome extension APIs, event listeners, messaging, or storage operations detected. Obfuscation and API client patterns present.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- POST https://f-log-inkwell.grammarly.io/batch/log (batch log upload)

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains, api_client_patterns, error_handling_patterns

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:54001-56000
## src/js/Grammarly-bg.js [chunk 29/46, lines 56001-58000]

### Summary
This chunk contains IndexedDB storage operations for service availability metrics, multiple API client classes for Knowledge Hub and Settings Registry, and batch log upload endpoint logic. No Chrome extension APIs, event listeners, messaging, or DOM manipulation detected. Obfuscation and API client patterns present.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- Key: duration_service_availability_metrics_db_v1, type: indexeddb, op: get|put|clear|delete (service availability metrics)

### Endpoints
- GET/POST/PATCH/DELETE https://goldengate\<env\>/knowledge-hub/v1/institution (Knowledge Hub API)
- GET/POST/PUT/PATCH/DELETE https://goldengate\<env\>/settings-registry/v1 (Settings Registry API)
- POST https://f-log-inkwell.grammarly.io/batch/log (batch log upload)

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains, api_client_patterns, error_handling_patterns

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:56001-58000
## src/js/Grammarly-bg.js [chunk 30/46, lines 58001-60000]

### Summary
This chunk contains additional API client logic, error handling, and configuration constants. No Chrome extension APIs, event listeners, messaging, storage, endpoints, or DOM manipulation detected. Obfuscation and API client patterns present.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains, api_client_patterns, error_handling_patterns

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:58001-60000
## src/js/Grammarly-bg.js [chunk 31/46, lines 60001-62000]

### Summary
This chunk contains Chrome extension update logic, tab management, event listeners, and cookie tracking. Chrome APIs for runtime, tabs, and content scripts are used. Storage keys for user and extension settings are accessed. Endpoints for superhuman domains are referenced. Obfuscation and API client patterns present. Medium tracking risk due to cookie analytics.

### Chrome APIs
- chrome.runtime.onUpdateAvailable.addListener
- chrome.runtime.reload
- chrome.runtime.requestUpdateCheck
- chrome.runtime.getManifest
- chrome.tabs.reload
- chrome.tabs.focusTab
- chrome.tabs.closeCurrentTab
- chrome.tabs.getAllTabs
- chrome.tabs.getActiveTabUrl
- chrome.tabs.executeScript
- chrome.tabs.insertCSS

### Event Listeners
- runtime.onUpdateAvailable.addListener

### Messaging
- Channel: "external:changed-plan", direction: other, keys: []

### Storage
- Key: "user", type: local, purpose: User profile and settings
- Key: "extensionSettings", type: local, purpose: Extension configuration

### Endpoints
- GET https://superhuman.com
- GET https://pp-sh.io
- GET https://staging-superhuman.com

### DOM/Sinks
- addEventListener
- removeEventListener

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains, api_client_patterns, error_handling_patterns

### Risks
- Tracking: Tracks cookie header size and may send analytics if overflow detected. (Medium)

### Evidence
- src/js/Grammarly-bg.js:60001-62000
## src/js/Grammarly-bg.js [chunk 32/46, lines 62001-64000]

### Summary
This chunk contains agent directory logic, API client patterns, and endpoint references for Coda and Grammarly services. No Chrome extension APIs, event listeners, messaging, storage, or DOM manipulation detected. Obfuscation and API client patterns present.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- GET https://coda.io
- GET https://staging.coda.io
- GET https://head.coda.io
- GET https://dev.coda.io:8080
- GET https://coda.grammarly.com
- GET https://coda.ppgr.io
- GET https://coda.qagr.io
- GET https://coda-local.ppgr.io:8080

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains, api_client_patterns, error_handling_patterns

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:62001-64000
## src/js/Grammarly-bg.js [chunk 33/46, lines 64001-66000]

### Summary
This chunk contains TypeScript-generated enums, UI constants, and schema definitions for Grammarly features. No Chrome extension APIs, event listeners, messaging, storage, endpoints, or DOM manipulation detected. Obfuscation and API client patterns present.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains, typescript_generated_enums, api_client_patterns

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:64001-66000
## src/js/Grammarly-bg.js [chunk 34/46, lines 66001-68000]

### Summary
This chunk contains utility functions, schema logic, and DLP regex patterns for sensitive data detection. No Chrome extension APIs, event listeners, messaging, storage, endpoints, or DOM manipulation detected. Obfuscation and API client patterns present.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains, typescript_generated_enums, api_client_patterns

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:66001-68000
## src/js/Grammarly-bg.js [chunk 35/46, lines 68001-70000]

### Summary
This chunk contains DLP sanitization logic, WebSocket handler classes, and FSM (finite state machine) infrastructure for Grammarly services. No Chrome extension APIs, event listeners, messaging, storage, endpoints, or DOM manipulation detected. Obfuscation and API client patterns present.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains, typescript_generated_enums, api_client_patterns

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:68001-70000
## src/js/Grammarly-bg.js [chunk 36/46, lines 70001-72000]

### Summary
This chunk contains logic for launching and managing authentication flows using Chrome tabs API, including creating tabs, listening for tab updates and removals, and closing tabs. No messaging, storage, endpoints, or DOM manipulation detected. Obfuscation and API client patterns present.

### Chrome APIs
- chrome.tabs.create
- chrome.tabs.onUpdated.addListener
- chrome.tabs.onRemoved.addListener
- chrome.tabs.remove

### Event Listeners
- tabs.onUpdated.addListener
- tabs.onRemoved.addListener

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains, typescript_generated_enums, api_client_patterns

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:70001-72000
## src/js/Grammarly-bg.js [chunk 37/46, lines 72001-74000]

### Summary
This chunk contains logic for permissions checks and requests, notification creation, and tab management using Chrome APIs. No messaging, storage, endpoints, or DOM manipulation detected. Obfuscation and API client patterns present.

### Chrome APIs
- chrome.permissions.contains
- chrome.permissions.request
- chrome.notifications.create
- chrome.tabs.getAllTabs
- chrome.tabs.reload

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains, typescript_generated_enums, api_client_patterns

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:72001-74000
## src/js/Grammarly-bg.js [chunk 38/46, lines 74001-76000]

### Summary
No Chrome API, messaging, storage, endpoints, or DOM logic detected. This chunk contains obfuscated infrastructure, config mapping, and API client patterns.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains, typescript_generated_enums, api_client_patterns

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:74001-76000
## src/js/Grammarly-bg.js [chunk 39/46, lines 76001-78000]

### Summary
No Chrome API, messaging, storage, endpoints, or DOM logic detected. This chunk contains UI config, event mapping, and obfuscated infrastructure.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains, typescript_generated_enums, api_client_patterns

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:76001-78000
## src/js/Grammarly-bg.js [chunk 40/46, lines 78001-80000]

### Summary
No Chrome API, messaging, storage, endpoints, or DOM logic detected. This chunk contains schema definitions, event mapping, and obfuscated infrastructure.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains, typescript_generated_enums, api_client_patterns

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:78001-80000
## src/js/Grammarly-bg.js [chunk 41/46, lines 80001-82000]

### Summary
No Chrome API, messaging, endpoints, or DOM logic detected. This chunk contains config schemas, blocklist metadata storage, and obfuscated infrastructure.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- Key: "blocklistConfigMetadata", type: local, purpose: Store blocklist config metadata, retention: unknown

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains, typescript_generated_enums, api_client_patterns

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:80001-82000
## src/js/Grammarly-bg.js [chunk 42/46, lines 82001-84000]

### Summary
No Chrome API, messaging, storage, endpoints, or DOM logic detected. This chunk contains config decorators, page config logic, and obfuscated infrastructure.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains, typescript_generated_enums, api_client_patterns

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:82001-84000
## src/js/Grammarly-bg.js [chunk 43/46, lines 84001-86000]

### Summary
No Chrome API, messaging, storage, endpoints, or DOM logic detected. This chunk contains metrics logging, context management, and obfuscated infrastructure.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains, typescript_generated_enums, api_client_patterns

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:84001-86000
## src/js/Grammarly-bg.js [chunk 44/46, lines 86001-88000]

### Summary
No Chrome API, messaging, storage, endpoints, or DOM logic detected. This chunk contains further metrics/event tracking and obfuscated infrastructure.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains, typescript_generated_enums, api_client_patterns

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:86001-88000
## src/js/Grammarly-bg.js [chunk 45/46, lines 88001-90439]

### Summary
No Chrome API, messaging, storage, endpoints, or DOM logic detected. This final chunk contains more metrics/event tracking and obfuscated infrastructure.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains, typescript_generated_enums, api_client_patterns

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-bg.js:88001-90439
## src/js/Grammarly-check.js [chunk 1/8, lines 1-2000]

### Summary
Chunk contains module loader, config logic, experiment client, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, or DOM logic detected.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-check.js:1-2000
## src/js/Grammarly-check.js [chunk 2/8, lines 2001-4000]

### Summary
Chunk contains endpoint configuration logic, obfuscated infrastructure, and static asset references. No Chrome API, messaging, storage, or DOM logic detected. Numerous endpoint URLs are constructed for extension services and third-party integrations.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- https://data.$\{n\}
- https://auth.$\{n\}/v3
- https://auth.$\{n\}/v4
- https://auth.$\{n\}/v5
- https://capi.$\{n\}/api/configuration/cheetah/v1/settings
- https://gateway.$\{n\}/skills
- https://capi.$\{n\}
- https://coda.$\{n\}
- wss://capi.${n}/freews
- wss://capi.${n}/gdocs
- https://dox.$\{n\}/documents
- https://gateway.$\{n\}/passport/api/v1/passport
- https://gateway.$\{n\}/snippets/v1/snippets
- https://gateway.$\{n\}/knowledge-hub/v1/institution
- https://gateway.$\{n\}/settings-registry/v1
- https://gateway.$\{n\}/institution/api/institution/admin
- https://subscription.$\{n\}/api/v1
- https://support.$\{n\}/hc/en-us/requests/new\#/
- https://in-product.report.grammarly.io/v1/report
- https://superhuman.com/superhuman-go-intro
- https://superhuman.com/superhuman-go-intro\?genesisLaunch\=true
- https://accounts.google.com
- https://www.facebook.com/login
- https://appleid.apple.com/auth

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-check.js:2001-4000
## src/js/Grammarly-check.js [chunk 3/8, lines 4001-6000]

### Summary
Chunk contains extensive error handling, logging, and telemetry logic for extension components (side panel, popup, check script, gdocs, etc). No Chrome API, messaging, storage, endpoint, or DOM logic detected. Obfuscation patterns persist.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-check.js:4001-6000
## src/js/Grammarly-check.js [chunk 4/8, lines 6001-8000]

### Summary
Chunk contains advanced error handling, logging, and telemetry logic for extension components (side panel, popup, check script, gdocs, etc). No Chrome API, messaging, storage, endpoint, or DOM logic detected. Obfuscation patterns persist.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-check.js:6001-8000
## src/js/Grammarly-check.js [chunk 5/8, lines 8001-10000]

### Summary
Chunk contains advanced error handling, logging, and telemetry logic for extension components (side panel, popup, check script, gdocs, etc). No Chrome API, messaging, storage, endpoint, or DOM logic detected. Obfuscation patterns persist.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-check.js:8001-10000
## src/js/Grammarly-check.js [chunk 6/8, lines 10001-12000]

### Summary
Chunk contains advanced error handling, logging, and telemetry logic for extension components (side panel, popup, check script, gdocs, etc). No Chrome API, messaging, storage, endpoint, or DOM logic detected. Obfuscation patterns persist.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-check.js:10001-12000
## src/js/Grammarly-check.js [chunk 7/8, lines 12001-14000]

### Summary
Chunk contains Chrome API usage for tabs, storage, cookies, notifications, permissions, and messaging. Event listeners for tab/window/cookie/notification/permission changes. OAuth token exchange and user info endpoints detected. DOM manipulation for content script UI and event handling. Obfuscation patterns persist. No direct risks detected in this chunk.

### Chrome APIs
- chrome.runtime.connect
- chrome.runtime.sendMessage
- chrome.storage.managed.get
- chrome.storage.session.get
- chrome.storage.session.set
- chrome.storage.session.remove
- chrome.storage.session.clear
- chrome.tabs.query
- chrome.tabs.create
- chrome.tabs.remove
- chrome.tabs.update
- chrome.tabs.get
- chrome.tabs.getZoom
- chrome.tabs.reload
- chrome.tabs.sendMessage
- chrome.windows.getCurrent
- chrome.windows.onFocusChanged
- chrome.windows.onRemoved
- chrome.notifications.create
- chrome.notifications.clear
- chrome.cookies.get
- chrome.cookies.remove
- chrome.cookies.getAll
- chrome.cookies.set
- chrome.cookies.onChanged
- chrome.permissions.getAll
- chrome.permissions.request
- chrome.action.setBadgeText
- chrome.action.setIcon
- chrome.action.setTitle
- chrome.action.setBadgeBackgroundColor
- chrome.management.uninstallSelf

### Event Listeners
- chrome.tabs.onActivated.addListener
- chrome.tabs.onUpdated.addListener
- chrome.windows.onFocusChanged.addListener
- chrome.windows.onRemoved.addListener
- chrome.cookies.onChanged.addListener
- chrome.permissions.onAdded.addListener
- chrome.permissions.onRemoved.addListener
- chrome.notifications.onClicked.addListener
- chrome.notifications.onButtonClicked.addListener
- chrome.notifications.onClosed.addListener

### Messaging
- Channel: "message:to-priv", direction: content->background, keys: ["type", "callid", "content"]
- Channel: "message-bus-port", direction: content->background, keys: ["type", "callid", "content"]
- Channel: "cs-bg-runtime-<extId>", direction: background->content, keys: ["data"]

### Storage
- Key: "oauth.tokens", type: session, purpose: OAuth token storage, retention: session
- Key: "extensionDictionaryEvent", type: local, purpose: Dictionary event tracking, retention: unknown

### Endpoints
- POST https://auth.grammarly.com/v4/api/oauth2/token
- POST https://auth.grammarly.com/v4/api/userinfo

### DOM/Sinks
- document.createElement
- document.body.appendChild
- document.querySelector
- document.querySelectorAll
- document.getSelection
- document.activeElement
- document.body.dataset

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-check.js:12001-14000
## src/js/Grammarly-check.js [chunk 8/8, lines 14001-14264]

### Summary
Final chunk contains Chrome API usage for permissions, uninstall URL, reload, side panel, popup, i18n, identity, and local storage. Event listener for storage changes. DOM access for UI and event handling. No endpoints, messaging, or direct risks detected. Obfuscation patterns persist.

### Chrome APIs
- chrome.permissions.contains
- chrome.runtime.setUninstallURL
- chrome.runtime.reload
- chrome.sidePanel.open
- chrome.action.openPopup
- chrome.i18n.detectLanguage
- chrome.i18n.getUILanguage
- chrome.i18n.getAcceptLanguages
- chrome.identity
- chrome.storage.local.get
- chrome.storage.local.set
- chrome.storage.local.remove
- chrome.storage.local.clear
- chrome.storage.local.getAll
- chrome.storage.local.removeAll
- chrome.storage.onChanged.addListener

### Event Listeners
- chrome.storage.onChanged.addListener

### Messaging
- None in this chunk

### Storage
- Key: "oauth.tokens", type: session, purpose: OAuth token storage, retention: session
- Key: "extensionDictionaryEvent", type: local, purpose: Dictionary event tracking, retention: unknown

### Endpoints
- None in this chunk

### DOM/Sinks
- document.getElementById
- document.body.dataset

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-check.js:14001-14264
## src/js/Grammarly.js [chunk 1/48, lines 1-2000]

### Summary
Chunk 1/48 contains only module loader, color constants, and utility function definitions. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Webpack and minified variable patterns present.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:1-2000
## src/js/Grammarly.js [chunk 2/48, lines 2001-4000]

### Summary
Chunk 2/48 contains only class and utility function definitions, enums, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Webpack, minified variable, and TypeScript enum patterns present.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:2001-4000
## src/js/Grammarly.js [chunk 3/48, lines 4001-6000]

### Summary
Chunk 3/48 contains only class logic, enums, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Webpack, minified variable, and TypeScript enum patterns present.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:4001-6000
## src/js/Grammarly.js [chunk 4/48, lines 6001-8000]

### Summary
Chunk 4/48 contains only class logic, enums, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Webpack, minified variable, and TypeScript enum patterns present.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:6001-8000
## src/js/Grammarly.js [chunk 5/48, lines 8001-10000]

### Summary
Chunk 5/48 contains only class logic, enums, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Webpack, minified variable, and TypeScript enum patterns present.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:8001-10000
## src/js/Grammarly.js [chunk 6/48, lines 10001-12000]

### Summary
Chunk 6/48 contains only class logic, enums, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Webpack, minified variable, and TypeScript enum patterns present.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:10001-12000
## src/js/Grammarly.js [chunk 7/48, lines 12001-14000]

### Summary
Chunk 7/48 contains only class logic, enums, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Webpack, minified variable, and TypeScript enum patterns present.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:12001-14000
## src/js/Grammarly.js [chunk 8/48, lines 14001-16000]

### Summary
Chunk 8/48 contains only class logic, enums, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Webpack, minified variable, and TypeScript enum patterns present.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:14001-16000
## src/js/Grammarly.js [chunk 9/48, lines 16001-18000]

### Summary
Chunk 9/48 contains only class logic, enums, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Webpack, minified variable, and TypeScript enum patterns present.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:16001-18000
## src/js/Grammarly.js [chunk 10/48, lines 18001-20000]

### Summary
Chunk 10/48 contains only class logic, enums, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Webpack, minified variable, and TypeScript enum patterns present.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:18001-20000
## src/js/Grammarly.js [chunk 11/48, lines 20001-22000]

### Summary
Chunk 11/48 contains only class logic, enums, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Webpack, minified variable, and TypeScript enum patterns present.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:20001-22000
## src/js/Grammarly.js [chunk 12/48, lines 22001-24000]

### Summary
Chunk 12/48 contains only class logic, feature flag checks, assistant integration, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Webpack, minified variable, and TypeScript enum patterns present.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:22001-24000
## src/js/Grammarly.js [chunk 13/48, lines 24001-26000]

### Summary
Chunk 13/48 contains only class logic, feature flag checks, onboarding logic, performance metrics, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Webpack, minified variable, and TypeScript enum patterns present.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:24001-26000
## src/js/Grammarly.js [chunk 14/48, lines 26001-28000]

### Summary
Chunk 14/48 contains only class logic, feature flag checks, onboarding logic, telemetry, performance metrics, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Webpack, minified variable, and TypeScript enum patterns present.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:26001-28000
## src/js/Grammarly.js [chunk 15/48, lines 28001-30000]

### Summary
Chunk 15/48 contains only class logic, feature flag checks, onboarding logic, telemetry, performance metrics, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Webpack, minified variable, and TypeScript enum patterns present.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:28001-30000
## src/js/Grammarly.js [chunk 16/48, lines 30001-32000]

### Summary
Chunk 16/48 contains only class logic, feature flag checks, onboarding logic, telemetry, performance metrics, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Webpack, minified variable, and TypeScript enum patterns present.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:30001-32000
## src/js/Grammarly.js [chunk 17/48, lines 32001-34000]

### Summary
Chunk 17/48 contains only class logic, feature flag checks, onboarding logic, telemetry, performance metrics, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Webpack, minified variable, and TypeScript enum patterns present.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:32001-34000
## src/js/Grammarly.js [chunk 18/48, lines 34001-36000]

### Summary
Chunk 18/48 contains only class logic, feature flag checks, onboarding logic, telemetry, performance metrics, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Webpack, minified variable, and TypeScript enum patterns present.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:34001-36000
## src/js/Grammarly.js [chunk 19/48, lines 36001-38000]

### Summary
Chunk 19/48 contains only class logic for feedback, session management, and RPC messaging. No Chrome API, messaging, storage, endpoint, or DOM logic detected. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:36001-38000
## src/js/Grammarly.js [chunk 20/48, lines 38001-40000]

### Summary
Chunk 20/48 contains only class logic for popup management, notification services, UI state, and feedback actions. No Chrome API, messaging, storage, endpoint, or DOM logic detected. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:38001-40000
## src/js/Grammarly.js [chunk 21/48, lines 40001-42000]

### Summary
Chunk 21/48 contains class/service logic for popup management, onboarding flows, notification services, session timeout, highlight geometry, and UI state. No Chrome API, messaging, endpoint, or DOM logic detected. UI state is persisted to localStorage (gdocs_peak_collabs_dismissed). Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- localStorage.setItem("gdocs_peak_collabs_dismissed", "true") (line ~41700)

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:40001-42000
## src/js/Grammarly.js [chunk 22/48, lines 42001-44000]

### Summary
Chunk 22/48 contains class/service logic for UI layout, geometry, positioning, and highlight management. Extensive use of DOM geometry APIs for UI overlays and popups (getBoundingClientRect, scrollBy, insertAdjacentElement). No Chrome API, messaging, storage, endpoint, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- getBoundingClientRect
- scrollBy
- insertAdjacentElement

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:42001-44000
## src/js/Grammarly.js [chunk 23/48, lines 44001-46000]

### Summary
Chunk 23/48 contains class/service logic for text replacement, formatting, and selection management in editable fields. Uses DOM APIs for text manipulation and selection (execCommand, dispatchEvent, getSelection, insertAtCurrentSelection). No Chrome API, messaging, storage, endpoint, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- execCommand
- dispatchEvent
- getSelection
- insertAtCurrentSelection

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:44001-46000
## src/js/Grammarly.js [chunk 24/48, lines 46001-48000]

### Summary
Chunk 24/48 defines generic integration logic for multiple rich text editors (CKEditor, DraftJS, CLEditor, ProseMirror, QuillJS, SlateJS). Implements selection and mutation management for editable fields and textareas. No Chrome API, messaging, storage, endpoint, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- getSelection
- setSelection
- ownerDocument.getSelection
- setSelectionRange
- MutationObserver

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:46001-48000
## src/js/Grammarly.js [chunk 25/48, lines 48001-50000]

### Summary
Chunk 25/48 defines logic for parsing style attributes and mapping them to formatting options (bold, italic, underline, color, font size, etc.). Implements block/inline node filtering and formatting for editable fields. No Chrome API, messaging, storage, endpoint, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- getAttribute
- setAttribute
- node traversal
- text extraction

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:48001-50000
## src/js/Grammarly.js [chunk 26/48, lines 50001-52000]

### Summary
Chunk 26/48 contains integration rules, context management, UI actions, event subscriptions, and obfuscated infrastructure. No Chrome API, messaging, storage, endpoint, or dynamic code detected. DOM logic for manipulating attributes, handling events, and UI positioning. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- getAttribute
- setAttribute
- node traversal
- event subscription
- UI positioning

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:50001-52000
## src/js/Grammarly.js [chunk 27/48, lines 52001-54000]

### Summary
Chunk 27/48 contains UI component definitions for suggestion cards, popovers, tooltips, and event handling logic. No Chrome API, messaging, storage, endpoint, or dynamic code detected. DOM logic for event handling, attribute manipulation, and UI rendering. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- event handling
- attribute manipulation
- UI rendering

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:52001-54000
## src/js/Grammarly.js [chunk 28/48, lines 54001-56000]

### Summary
Chunk 28/48 contains logic for rendering highlights, color management, UI effects, and event handling for Grammarly suggestions. No Chrome API, messaging, storage, endpoint, or dynamic code detected. DOM logic for style manipulation, event listeners, and UI overlays. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- style manipulation
- event listeners
- UI overlays

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:54001-56000
## src/js/Grammarly.js [chunk 29/48, lines 56001-58000]

### Summary
Chunk 29/48 contains logic for UI overlays, notification rendering, DOM event listeners, and style manipulation. No Chrome API, messaging, storage, endpoint, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- addEventListener

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- style manipulation
- UI overlays
- event listeners

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:56001-58000
## src/js/Grammarly.js [chunk 30/48, lines 58001-60000]

### Summary
Chunk 30/48 contains logic for card actions, authentication flows, dictionary management, and UI rendering. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:58001-60000
## src/js/Grammarly.js [chunk 31/48, lines 60001-62000]

### Summary
Chunk 31/48 contains logic for extension settings, environment, authentication, and connection management. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:60001-62000
## src/js/Grammarly.js [chunk 32/48, lines 62001-64000]

### Summary
Chunk 32/48 contains telemetry, error handling, logging, and metrics logic for extension features (side panel, popup, check script, GDocs, Gmail, auto-fix, assistant, etc.). No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:62001-64000
## src/js/Grammarly.js [chunk 33/48, lines 64001-66000]

### Summary
Chunk 33/48 contains additional telemetry, error handling, metrics, and integration logic for extension features (cookies, replacement, gOS, inkwell, connector, service availability, treatments, page integration, etc.). No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:64001-66000
## src/js/Grammarly.js [chunk 34/48, lines 66001-68000]

### Summary
Chunk 34/48 contains additional utility, class, and infrastructure logic. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:66001-68000
## src/js/Grammarly.js [chunk 35/48, lines 68001-70000]

### Summary
Chunk 35/48 contains additional infrastructure, utility, and class logic. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:68001-70000
## src/js/Grammarly.js [chunk 36/48, lines 70001-72000]

### Summary
Chunk 36/48 contains additional infrastructure, utility, and class logic. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:70001-72000
## src/js/Grammarly.js [chunk 37/48, lines 72001-74000]

### Summary
Chunk 37/48 contains additional infrastructure, utility, and class logic. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:72001-74000
## src/js/Grammarly.js [chunk 38/48, lines 74001-76000]

### Summary
Chunk 38/48 contains additional infrastructure, utility, and class logic. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:74001-76000
## src/js/Grammarly.js [chunk 39/48, lines 76001-78000]

### Summary
Chunk 39/48 contains additional infrastructure, utility, and class logic. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:76001-78000
## src/js/Grammarly.js [chunk 40/48, lines 78001-80000]

### Summary
Chunk 40/48 contains additional infrastructure, utility, and class logic. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:78001-80000
## src/js/Grammarly.js [chunk 41/48, lines 80001-82000]

### Summary
Chunk 41/48 contains additional infrastructure, utility, and class logic. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:80001-82000
## src/js/Grammarly.js [chunk 42/48, lines 82001-84000]

### Summary
Chunk 42/48 contains additional infrastructure, utility, and class logic. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:82001-84000
## src/js/Grammarly.js [chunk 43/48, lines 84001-86000]

### Summary
Chunk 43/48 contains additional infrastructure, utility, and class logic. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:84001-86000
## src/js/Grammarly.js [chunk 44/48, lines 86001-88000]

### Summary
Chunk 44/48 contains additional infrastructure, utility, and class logic. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:86001-88000
## src/js/Grammarly.js [chunk 45/48, lines 88001-90000]

### Summary
Chunk 45/48 contains additional infrastructure, utility, and class logic. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:88001-90000
## src/js/Grammarly.js [chunk 46/48, lines 90001-92000]

### Summary
Chunk 46/48 contains additional infrastructure, utility, and class logic. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:90001-92000
## src/js/Grammarly.js [chunk 47/48, lines 92001-94000]

### Summary
Chunk 47/48 contains OAuth token management, error handling, base64 decoding, and utility functions. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, typescript_generated_enums, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:92001-94000
## src/js/Grammarly.js [chunk 48/48, lines 94001-94238]

### Summary
Chunk 48/48 contains webpack module loader logic, dynamic CSS chunk loading, and runtime code splitting infrastructure. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected (apart from webpack loader infrastructure). Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly.js:94001-94238
## src/js/Grammarly-gDocsEarlyInjector.js [whole-file, lines 1-2000]

### Summary
Injects accessibility div and shadow DOM, patches Google Docs initialization, loads additional script, uses Chrome extension APIs, posts messages to background for tracking. No direct storage or endpoint logic. Obfuscation hints: minified_vars, function_chains.

### Chrome APIs
- chrome.runtime.id
- chrome.runtime.getURL
- chrome.runtime.connect
- chrome.runtime.onMessage
- chrome.runtime.sendMessage

### Event Listeners
- None in this chunk

### Messaging
- Channel: "cs-to-bg-rpc-1557421403805", direction: content->background, keys: ["tracking/RPC", "sendFelogEvent", "sendToFemetrics"]

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- document.createElement
- document.querySelector
- document.documentElement
- appendChild
- setAttribute

### Dynamic Code/Obfuscation
- script injection
- Obfuscation hints: minified_vars, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-gDocsEarlyInjector.js:1-2000
## src/js/Grammarly-gDocsIframeCs.js [chunk 1/5, lines 1-2000]

### Summary
Chunk 1/5 contains webpack module loader, polyfills, and utility functions for browser/device/OS detection. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-gDocsIframeCs.js:1-2000
## src/js/Grammarly-gDocsIframeCs.js [chunk 2/5, lines 2001-4000]

### Summary
Chunk 2/5 contains utility functions, error handling, browser/OS detection, configuration factories, and logging infrastructure. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-gDocsIframeCs.js:2001-4000
## src/js/Grammarly-gDocsIframeCs.js [chunk 3/5, lines 4001-6000]

### Summary
Chunk 3/5 contains typing tracking, integration state, editor detection, cross-script shared storage, safe promise wrappers, observable RPC client infrastructure, and extensive telemetry/error reporting logic. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-gDocsIframeCs.js:4001-6000
## src/js/Grammarly-gDocsIframeCs.js [chunk 4/5, lines 6001-8000]

### Summary
Chunk 4/5 contains telemetry, error reporting, metrics logic, message/event handling, port connection logic, and Chrome API wrappers for tabs, scripting, storage, and windows. No direct Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, function_chains.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-gDocsIframeCs.js:6001-8000
## src/js/Grammarly-gDocsIframeCs.js [chunk 5/5, lines 8001-8331]

### Summary
Chunk 5/5 contains Chrome API wrappers for tabs, notifications, cookies, management, permissions, runtime, sidePanel, action, i18n, identity, and storage. No direct event listeners, messaging, endpoints, or DOM manipulation. Obfuscation hints: webpack_modules, minified_vars, function_chains. No risks identified.

### Chrome APIs
- chrome.tabs.*
- chrome.notifications.*
- chrome.cookies.*
- chrome.management.*
- chrome.permissions.*
- chrome.runtime.*
- chrome.sidePanel.*
- chrome.action.*
- chrome.i18n.*
- chrome.identity
- chrome.storage.local
- chrome.storage.session
- chrome.storage.onChanged
- chrome.runtime.setUninstallURL
- chrome.runtime.reload
- chrome.runtime.sendMessage
- chrome.runtime.onMessage
- chrome.indexedDB

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- local: get/set/remove/clear
- session: get/set/remove/clear

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-gDocsIframeCs.js:8001-8331
## src/js/Grammarly-gDocs.js [chunk 1/53, lines 1-2000]

### Summary
Chunk 1/53 contains module loader, color constants, utility functions, and enums. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars. No risks identified.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-gDocs.js:1-2000
## src/js/Grammarly-gDocs.js [chunk 2/53, lines 2001-4000]

### Summary
Chunk 2/53 contains additional module loader logic, enums, utility functions, and class definitions for alert management, range handling, and UI components. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, class_declarations. No risks identified.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, class_declarations

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-gDocs.js:2001-4000
## src/js/Grammarly-gDocs.js [chunk 3/53, lines 4001-6000]

### Summary
Chunk 3/53 continues with enums, utility functions, alert and lens management logic, grouping, and range/diff handling. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains

### Risks
- None in this chunk

### Evidence
- src/js/Grammarly-gDocs.js:4001-6000
## src/js/Grammarly-gDocs.js [chunk 4/53, lines 6001-8000]

### Summary
Chunk 4/53 continues with enums, utility functions, alert and lens management, grouping, range/diff handling, DLP regex patterns, sanitization logic, experiment and gate management, and HTTP client setup. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected in this chunk. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

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
- None detected

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:6001-8000
## src/js/Grammarly-gDocs.js [chunk 5/53, lines 8001-10000]

### Summary
Chunk 5/53 continues with HTTP client response parsing, experiment and gate management, properties client logic, experience/group name utilities, treatment validation, and observable/atom state management. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected in this chunk. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

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
- None detected

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:8001-10000
## src/js/Grammarly-gDocs.js [chunk 6/53, lines 10001-12000]

### Summary
Chunk 6/53 continues with module imports, observable utilities, metrics/timers/counters, logging infrastructure, rate limiting, buffer management, and error/context handling. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected in this chunk. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

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
- None detected

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:10001-12000
## src/js/Grammarly-gDocs.js [chunk 7/53, lines 12001-14000]

### Summary
Chunk 7/53 continues with module imports, observable utilities, metrics/timers/counters, logging infrastructure, rate limiting, buffer management, and error/context handling. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

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
- None detected

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:12001-14000
## src/js/Grammarly-gDocs.js [chunk 8/53, lines 14001-16000]

### Summary
Chunk 8/53 continues with module loader, observable utilities, metrics/timers/counters, logging infrastructure, buffer management, and error/context handling. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

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
- None detected

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:14001-16000
## src/js/Grammarly-gDocs.js [chunk 9/53, lines 16001-18000]

### Summary
Chunk 9/53 continues with module loader, observable utilities, metrics/timers/counters, logging infrastructure, buffer management, and error/context handling. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

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
- None detected

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:16001-18000
## src/js/Grammarly-gDocs.js [chunk 10/53, lines 18001-20000]

### Summary
Chunk 10/53 continues with module loader, observable utilities, metrics/timers/counters, logging infrastructure, buffer management, error/context handling, and integration logic for Google Docs and desktop extension. No Chrome API, messaging, storage, endpoint, DOM, or dynamic code detected. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

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
- None detected

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:18001-20000
## src/js/Grammarly-gDocs.js [chunk 11/53, lines 20001-22000]

### Summary
Chunk 11/53 continues with Chrome extension API wrappers for storage, tabs, notifications, cookies, permissions, and runtime messaging. Includes logic for Google Docs integration, desktop extension, telemetry, and error handling. Chrome APIs detected: chrome.storage.managed, chrome.storage.session, chrome.scripting.executeScript, chrome.tabs, chrome.notifications, chrome.cookies, chrome.permissions, chrome.runtime, chrome.action, chrome.browserAction, chrome.sidePanel, chrome.identity, chrome.i18n, chrome.management, chrome.runtime.setUninstallURL, chrome.runtime.reload, chrome.indexedDB. No messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

### Chrome APIs
- chrome.storage.managed
- chrome.storage.session
- chrome.scripting.executeScript
- chrome.tabs
- chrome.notifications
- chrome.cookies
- chrome.permissions
- chrome.runtime
- chrome.action
- chrome.browserAction
- chrome.sidePanel
- chrome.identity
- chrome.i18n
- chrome.management
- chrome.runtime.setUninstallURL
- chrome.runtime.reload
- chrome.indexedDB

### Event Listeners
- None detected

### Messaging
- None detected

### Storage
- None detected

### Endpoints
- None detected

### DOM/Sinks
- None detected

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:20001-22000
## src/js/Grammarly-gDocs.js [chunk 12/53, lines 22001-24000]

### Summary
Chunk 12/53 continues with advanced logic for field integration, text replacement, highlights, and popups in Google Docs. This segment includes:
- Rich integration rules for contentEditable, textarea, iframe, CKEditor, ProseMirror, QuillJS, SlateJS, CLEditor, and legacy fields.
- Complex logic for highlights, selection, and geometry tracking.
- Popup rendering for sign-in and 'Stand With Ukraine' flows.
- Integration buffer management, retry logic, and disposal routines.
- No direct Chrome extension API calls, messaging, storage, endpoints, or DOM manipulation detected in this chunk.
- Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains.
- No risks identified in this chunk.

### Chrome APIs
- None detected in this chunk

### Event Listeners
- None detected in this chunk

### Messaging
- None detected in this chunk

### Storage
- None detected in this chunk

### Endpoints
- None detected in this chunk

### DOM/Sinks
- None detected in this chunk

### Dynamic Code/Obfuscation
- webpack_modules
- minified_vars
- class_declarations
- function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:22001-24000
## src/js/Grammarly-gDocs.js [chunk 13/53, lines 24001-26000]

### Summary
Chunk 13/53 contains logic for CAPI session management, feedback, survey, and integration state for Google Docs. This segment includes:
- CAPI session and connection management, including reconnect, close, and dispose routines.
- Feedback, survey, and alert handling for document editing and assistant features.
- Integration rules for Google Docs comments, feedback forms, and canvas focus.
- Chrome extension API usage detected: chrome.storage.local (get, set, remove, clear, onChanged), chrome.runtime.connect, chrome.runtime.onMessage, chrome.runtime.sendMessage.
- No messaging channels, storage keys, endpoints, or direct DOM manipulation detected in this chunk.
- Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains.
- No risks identified in this chunk.

### Chrome APIs
- chrome.storage.local.get
- chrome.storage.local.set
- chrome.storage.local.remove
- chrome.storage.local.clear
- chrome.storage.local.onChanged
- chrome.runtime.connect
- chrome.runtime.onMessage
- chrome.runtime.sendMessage

### Event Listeners
- chrome.storage.onChanged
- chrome.runtime.onMessage

### Messaging
- None detected in this chunk

### Storage
- None detected in this chunk

### Endpoints
- None detected in this chunk

### DOM/Sinks
- None detected in this chunk

### Dynamic Code/Obfuscation
- webpack_modules
- minified_vars
- class_declarations
- function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:24001-26000
## src/js/Grammarly-gDocs.js [chunk 14/53, lines 26001-28000]

### Summary
Chunk 14/53 contains logic for Google Docs assistant UI, session management, feature flag evaluation, and integration with document context and selection. Chrome extension API usage is present for sessionStorage operations, background RPC, and experiment client gates. No direct messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

### Chrome APIs
- chrome.storage.local.sessionStorage (get, set)
- chrome.runtime.connect
- chrome.runtime.sendMessage

### Event Listeners
- None detected in this chunk

### Messaging
- None detected in this chunk

### Storage
- None detected in this chunk

### Endpoints
- None detected in this chunk

### DOM/Sinks
- None detected in this chunk

### Dynamic Code/Obfuscation
- webpack_modules
- minified_vars
- class_declarations
- function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:26001-28000
## src/js/Grammarly-gDocs.js [chunk 15/53, lines 28001-30000]

### Summary
Chunk 15/53 contains logic for KnowledgeHub card handling, document visibility tracking, performance metrics, and session statistics reporting for Google Docs integration. Chrome extension API usage is present for sessionStorage, background RPC, and experiment client gates. No direct messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

### Chrome APIs
- chrome.storage.local.sessionStorage (get, set)
- chrome.runtime.connect
- chrome.runtime.sendMessage

### Event Listeners
- None detected in this chunk

### Messaging
- None detected in this chunk

### Storage
- None detected in this chunk

### Endpoints
- None detected in this chunk

### DOM/Sinks
- None detected in this chunk

### Dynamic Code/Obfuscation
- webpack_modules
- minified_vars
- class_declarations
- function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:28001-30000
## src/js/Grammarly-gDocs.js [chunk 16/53, lines 30001-32000]

### Summary
Chunk 16/53 contains logic for session statistics reporting, alert processing, autocorrect and auto-apply features, and card UI handling for Google Docs integration. Chrome extension APIs are used for session management, background RPC, and experiment gates. No direct messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

### Chrome APIs
- chrome.storage.local.sessionStorage.get
- chrome.storage.local.sessionStorage.set
- chrome.runtime.connect
- chrome.runtime.sendMessage

### Event Listeners
- None detected

### Messaging
- None detected

### Storage
- None detected

### Endpoints
- None detected

### DOM/Sinks
- None detected

### Dynamic Code/Obfuscation
- webpack_modules
- minified_vars
- class_declarations
- function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:30001-32000
## src/js/Grammarly-gDocs.js [chunk 17/53, lines 32001-34000]

### Summary
Chunk 17/53 contains logic for card UI controllers, alert state management, feature toggling, delayed unlock, and session statistics for Google Docs integration. Chrome extension APIs are used for session management, background RPC, and experiment gates. No direct messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

### Chrome APIs
- chrome.storage.local.sessionStorage.get
- chrome.storage.local.sessionStorage.set
- chrome.runtime.connect
- chrome.runtime.sendMessage

### Event Listeners
- None detected

### Messaging
- None detected

### Storage
- None detected

### Endpoints
- None detected

### DOM/Sinks
- None detected

### Dynamic Code/Obfuscation
- webpack_modules
- minified_vars
- class_declarations
- function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:32001-34000
## src/js/Grammarly-gDocs.js [chunk 18/53, lines 34001-36000]

### Summary
Chunk 18/53 contains advanced UI controller logic, card management, alert state handling, feature toggling, session statistics, and integration setup for Google Docs. The code manages card controllers for various alert types (capi, autocorrect, touch typist, revert auto apply, snippets template), initializes survey and session tracking services, and wires up assistant and sidebar features. Chrome extension APIs are used for session management, background RPC, and experiment gates. No direct messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

### Chrome APIs
- chrome.storage.local.sessionStorage.get
- chrome.storage.local.sessionStorage.set
- chrome.runtime.connect
- chrome.runtime.sendMessage

### Event Listeners
- None detected in this chunk

### Messaging
- None detected in this chunk

### Storage
- None detected in this chunk

### Endpoints
- None detected in this chunk

### DOM/Sinks
- None detected in this chunk

### Dynamic Code/Obfuscation
- webpack_modules
- minified_vars
- class_declarations
- function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:34001-36000
## src/js/Grammarly-gDocs.js [chunk 19/53, lines 36001-38000]

### Summary
Chunk 19/53 contains logic for alert event processing, UI attribute maintenance, highlight management, and assistant popup rendering for Google Docs integration. The code manages alert application/ignore events, session state, and popup UI components. Chrome extension APIs are used for session management, background RPC, and experiment gates. No direct messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

### Chrome APIs
- chrome.storage.local.sessionStorage.get
- chrome.storage.local.sessionStorage.set
- chrome.runtime.connect
- chrome.runtime.sendMessage

### Event Listeners
- None detected in this chunk

### Messaging
- None detected in this chunk

### Storage
- None detected in this chunk

### Endpoints
- None detected in this chunk

### DOM/Sinks
- None detected in this chunk

### Dynamic Code/Obfuscation
- webpack_modules
- minified_vars
- class_declarations
- function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:36001-38000
## src/js/Grammarly-gDocs.js [chunk 20/53, lines 38001-40000]

### Summary
Chunk 20/53 contains feedback reporting logic for various Grammarly features, including alerts, synonyms, emotions, mute states, assistant actions, and batch operations. The code handles feedback dispatch to the checking service, with multiple switch-case branches for different feedback types. Chrome extension APIs are not directly invoked in this chunk; logic is focused on internal state management and feedback routing. No messaging channels, storage keys, endpoints, or direct DOM manipulation detected. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

### Chrome APIs
- None detected in this chunk

### Event Listeners
- None detected in this chunk

### Messaging
- None detected in this chunk

### Storage
- None detected in this chunk

### Endpoints
- None detected in this chunk

### DOM/Sinks
- None detected in this chunk

### Dynamic Code/Obfuscation
- webpack_modules
- minified_vars
- class_declarations
- function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:38001-40000
## src/js/Grammarly-gDocs.js [chunk 21/53, lines 40001-42000]

### Summary
Chunk 21/53 contains logic for popup controllers, notification services, and UI state management for Google Docs integration. The code manages permission popups, account migration, payment notifications, tone detection, recap popups, and banner services. It coordinates UI updates, event subscriptions, and feedback actions, but does not directly invoke Chrome extension APIs. No messaging channels, storage keys, endpoints, or direct DOM manipulation detected. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

### Chrome APIs
- None detected in this chunk

### Event Listeners
- None detected in this chunk

### Messaging
- None detected in this chunk

### Storage
- None detected in this chunk

### Endpoints
- None detected in this chunk

### DOM/Sinks
- None detected in this chunk

### Dynamic Code/Obfuscation
- webpack_modules
- minified_vars
- class_declarations
- function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:40001-42000
## src/js/Grammarly-gDocs.js [chunk 22/53, lines 42001-44000]

### Summary
Chunk 22/53 continues logic for popup controllers, notification services, and UI state management for Google Docs integration. This segment includes session timeout popups, StandWithUkraine banner logic, highlight geometry management, and in-app messaging infrastructure (Iterable). The code manages UI updates, event subscriptions, and feedback actions, but does not directly invoke Chrome extension APIs. No messaging channels, storage keys, endpoints, or direct DOM manipulation detected. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- webpack_modules
- minified_vars
- class_declarations
- function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:42001-44000
## src/js/Grammarly-gDocs.js [chunk 23/53, lines 44001-46000]

### Summary
Chunk 23/53 continues infrastructure for UI geometry, highlight management, and event handling in Google Docs integration. This segment includes logic for color blending, border/padding calculations, scroll/position conversion, mouse/touch event mapping, and clipboard/paste event simulation. No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- webpack_modules
- minified_vars
- class_declarations
- function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:44001-46000
## src/js/Grammarly-gDocs.js [chunk 24/53, lines 46001-48000]

### Summary
Chunk 24/53 continues infrastructure for Google Docs integration, focusing on advanced text replacement, formatting preservation, and validation logic. This segment includes:
- Input event simulation and dispatch
- Formatting transformation helpers
- Replacement validation and tracking
- Batch replacement logic
- Error/status enums and middleware
- Utility functions for document and field handling
No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk.

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
- None detected

### Dynamic Code/Obfuscation
- Webpack module pattern
- Minified variable names
- Class declarations
- Function chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:46001-48000
## src/js/Grammarly-gDocs.js [chunk 25/53, lines 48001-50000]

### Summary
Chunk 25/53 continues infrastructure for Google Docs integration, focusing on text change buffering, block mapping, whitespace normalization, revision management, and document field utilities. This segment includes:
- Text change buffer logic
- Block map construction and traversal
- Whitespace and formatting normalization
- Revision tracking and management
- Document field and node utilities
No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk.

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
- None detected

### Dynamic Code/Obfuscation
- Webpack module pattern
- Minified variable names
- Class declarations
- Function chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:48001-50000
## src/js/Grammarly-gDocs.js [chunk 26/53, lines 50001-52000]

### Summary
Chunk 26/53 continues infrastructure for Google Docs integration, focusing on sidebar logic, UI state management, popup handling, document mapping, and parser utilities. This segment includes:
- Sidebar and popup state logic
- UI flag/context management
- Document mapping and field utilities
- Parser combinators and error handling
- Font metrics and text fragment utilities
No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk.

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
- None detected

### Dynamic Code/Obfuscation
- Webpack module pattern
- Minified variable names
- Class declarations
- Function chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:50001-52000
## src/js/Grammarly-gDocs.js [chunk 27/53, lines 52001-54000]

### Summary
Chunk 27/53 continues Google Docs integration infrastructure, focusing on advanced text fragment mapping, table parsing, anchor logic, and rendering utilities. Includes combinator parser logic, table/row/cell mapping, anchor extraction, fragment combinators, and React-based debug panel UI components. No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

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
- None detected

### Dynamic Code/Obfuscation
- webpack_modules
- minified_vars
- class_declarations
- function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:52001-54000
## src/js/Grammarly-gDocs.js [chunk 28/53, lines 54001-56000]

### Summary
Chunk 28/53 continues Google Docs integration infrastructure, focusing on fragment filtering, rendering logic, advanced selection, and replacement services. Includes fragment deduplication, geometry/layout utilities, rendering pipeline, selection/cursor management, batch replacement logic, and error handling. No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

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
- None detected

### Dynamic Code/Obfuscation
- webpack_modules
- minified_vars
- class_declarations
- function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:54001-56000
## src/js/Grammarly-gDocs.js [chunk 29/53, lines 56001-58000]

### Summary
Chunk 29/53 continues Google Docs integration infrastructure, focusing on text mapping, fragment utilities, format helpers, and observer logic. Includes advanced text mapping, fragment iteration, format extraction, rich text generation, geometry/layout helpers, and observer classes for document changes. No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

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
- None detected

### Dynamic Code/Obfuscation
- webpack_modules
- minified_vars
- class_declarations
- function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:56001-58000
## src/js/Grammarly-gDocs.js [chunk 30/53, lines 58001-60000]

### Summary
Chunk 30/53 continues Google Docs integration infrastructure, focusing on advanced text mapping, fragment utilities, format helpers, observer logic, and geometry/layout helpers. This segment includes fragment iteration, rich text generation, observer classes for document changes, and utility functions for geometry and layout. No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk.

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
- None detected

### Dynamic Code/Obfuscation
- Webpack module pattern
- Minified variable names
- Class declarations
- Function chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:58001-60000
## src/js/Grammarly-gDocs.js [chunk 31/53, lines 60001-62000]

### Summary
Chunk 31/53 continues Google Docs integration infrastructure, focusing on UI component rendering, card logic, popover menus, and tooltip infrastructure. This segment includes React context, card rendering, popover logic, tooltip management, and UI utility functions. No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk.

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
- None detected

### Dynamic Code/Obfuscation
- Webpack module pattern
- Minified variable names
- Class declarations
- Function chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:60001-62000
## src/js/Grammarly-gDocs.js [chunk 32/53, lines 62001-64000]

### Summary
Chunk 32/53 continues Google Docs integration infrastructure, focusing on tooltip rendering, highlight logic, UI utility functions, and configuration management. This segment includes tooltip view logic, highlight rendering, color management, and configuration utilities. No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk.

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
- None detected

### Dynamic Code/Obfuscation
- Webpack module pattern
- Minified variable names
- Class declarations
- Function chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:62001-64000
## src/js/Grammarly-gDocs.js [chunk 33/53, lines 64001-66000]

### Summary
Chunk 33/53 continues Google Docs integration infrastructure, focusing on endpoint constant definitions, feature flag configuration, notification logic, and UI popup rendering. No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

### Chrome APIs
- None detected in this chunk

### Event Listeners
- None detected in this chunk

### Messaging
- None detected in this chunk

### Storage
- None detected in this chunk

### Endpoints
- None detected in this chunk

### DOM/Sinks
- None detected in this chunk

### Dynamic Code/Obfuscation
- webpack_modules
- minified_vars
- class_declarations
- function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:64001-66000
## src/js/Grammarly-gDocs.js [chunk 34/53, lines 66001-68000]

### Summary
Chunk 34/53 continues Google Docs integration infrastructure, focusing on UI card rendering, authentication logic, feature flag checks, and notification handling. No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

### Chrome APIs
- None detected in this chunk

### Event Listeners
- None detected in this chunk

### Messaging
- None detected in this chunk

### Storage
- None detected in this chunk

### Endpoints
- None detected in this chunk

### DOM/Sinks
- None detected in this chunk

### Dynamic Code/Obfuscation
- webpack_modules
- minified_vars
- class_declarations
- function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:66001-68000
## src/js/Grammarly-gDocs.js [chunk 35/53, lines 68001-70000]

### Summary
Chunk 35/53 continues Google Docs integration infrastructure, focusing on observable transport logic, RPC server/client setup, and feature toggling utilities. No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

### Chrome APIs
- None detected in this chunk

### Event Listeners
- None detected in this chunk

### Messaging
- None detected in this chunk

### Storage
- None detected in this chunk

### Endpoints
- None detected in this chunk

### DOM/Sinks
- None detected in this chunk

### Dynamic Code/Obfuscation
- webpack_modules
- minified_vars
- class_declarations
- function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:68001-70000
## src/js/Grammarly-gDocs.js [chunk 36/53, lines 70001-72000]

### Summary
Chunk 36/53 continues Google Docs integration infrastructure, focusing on telemetry, error handling, feature toggling, and metrics logging utilities. No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- webpack_modules
- minified_vars
- class_declarations
- function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:70001-72000
## src/js/Grammarly-gDocs.js [chunk 37/53, lines 72001-74000]

### Summary
Chunk 37/53 continues Google Docs integration infrastructure, focusing on metrics, feature toggling, error handling, and integration lifecycle utilities. No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- webpack_modules
- minified_vars
- class_declarations
- function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:72001-74000
## src/js/Grammarly-gDocs.js [chunk 38/53, lines 74001-76000]

### Summary
Chunk 38/53 continues Google Docs integration infrastructure. This segment contains advanced DOM sanitization logic, attribute validation, and diffing algorithms for document content. No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

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
- None detected

### Dynamic Code/Obfuscation
- Webpack module pattern
- Minified variable names
- Class declarations
- Function chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:74001-76000
## src/js/Grammarly-gDocs.js [chunk 39/53, lines 76001-78000]

### Summary
Chunk 39/53 continues Google Docs integration infrastructure. This segment contains additional module loader logic, functional programming utilities, and advanced data structure operations (maps, sets, arrays). No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

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
- None detected

### Dynamic Code/Obfuscation
- Webpack module pattern
- Minified variable names
- Class declarations
- Function chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:76001-78000
## src/js/Grammarly-gDocs.js [chunk 40/53, lines 78001-80000]

### Summary
Chunk 40/53 continues Google Docs integration infrastructure. This segment contains more functional programming utilities, advanced record and map operations, and additional module loader logic. No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

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
- None detected

### Dynamic Code/Obfuscation
- Webpack module pattern
- Minified variable names
- Class declarations
- Function chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:78001-80000
## src/js/Grammarly-gDocs.js [chunk 41/53, lines 80001-82000]

### Summary
Chunk 41/53 continues Google Docs integration infrastructure. This segment contains additional functional programming utilities, advanced record/map operations, and module loader logic. No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk.

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
- None detected

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains

### Risks
- No risks identified

### Evidence
- src/js/Grammarly-gDocs.js:80001-82000
## src/js/Grammarly-gDocs.js [chunk 42/53, lines 82001-84000]

### Summary
Chunk 42/53 continues Google Docs integration infrastructure. This segment contains further functional programming utilities, advanced record/map operations, and module loader logic. No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk.

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
- None detected

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains

### Risks
- No risks identified

### Evidence
- src/js/Grammarly-gDocs.js:82001-84000
## src/js/Grammarly-gDocs.js [chunk 43/53, lines 84001-86000]

### Summary
Chunk 43/53 continues Google Docs integration infrastructure. This segment contains hashing utilities, advanced record/map operations, and module loader logic. No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk.

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
- None detected

### Dynamic Code/Obfuscation
- Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains

### Risks
- No risks identified

### Evidence
- src/js/Grammarly-gDocs.js:84001-86000
## src/js/Grammarly-gDocs.js [chunk 44/53, lines 86001-88000]

### Summary
Chunk 44/53 continues Google Docs integration infrastructure. This segment contains advanced event handling, React synthetic event logic, and reconciliation routines. No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

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
- None detected

### Dynamic Code/Obfuscation
- webpack_modules
- minified_vars
- class_declarations
- function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:86001-88000
## src/js/Grammarly-gDocs.js [chunk 45/53, lines 88001-90000]

### Summary
Chunk 45/53 continues Google Docs integration infrastructure. This segment contains advanced React reconciliation routines, DOM node management, and error handling logic. No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk. Obfuscation hints: webpack_modules, minified_vars, class_declarations, function_chains. No risks identified.

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
- None detected

### Dynamic Code/Obfuscation
- webpack_modules
- minified_vars
- class_declarations
- function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:88001-90000
## src/js/Grammarly-gDocs.js [chunk 46/53, lines 90001-92000]

### Summary
Chunk 46/53 continues Google Docs integration infrastructure. This segment contains React DOM reconciliation logic, error handling, and module export routines. No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk.

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
- None detected

### Dynamic Code/Obfuscation
- Webpack module loader patterns
- Minified variable names
- Class declarations
- Function chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:90001-92000
## src/js/Grammarly-gDocs.js [chunk 47/53, lines 92001-94000]

### Summary
Chunk 47/53 continues Google Docs integration infrastructure. This segment contains module export logic, event subscription utilities, and observable stream routines. No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk.

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
- None detected

### Dynamic Code/Obfuscation
- Webpack module loader patterns
- Minified variable names
- Class declarations
- Function chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:92001-94000
## src/js/Grammarly-gDocs.js [chunk 48/53, lines 94001-96000]

### Summary
Chunk 48/53 continues Google Docs integration infrastructure. This segment contains observable stream utilities, event handling logic, and module export routines. No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk.

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
- None detected

### Dynamic Code/Obfuscation
- Webpack module loader patterns
- Minified variable names
- Class declarations
- Function chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:94001-96000
## src/js/Grammarly-gDocs.js [chunk 49/53, lines 96001-98000]

### Summary
Chunk 49/53 continues Google Docs integration infrastructure. This segment contains observable stream utilities, event handling logic, module export routines, and obfuscated infrastructure. No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk.

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
- None detected

### Dynamic Code/Obfuscation
- Webpack module pattern
- Minified variable names
- Class declarations
- Function chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:96001-98000
## src/js/Grammarly-gDocs.js [chunk 50/53, lines 98001-100000]

### Summary
Chunk 50/53 continues Google Docs integration infrastructure. This segment contains SVG icon logic, React component definitions, event handling, and obfuscated infrastructure. No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk.

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
- None detected

### Dynamic Code/Obfuscation
- Webpack module pattern
- Minified variable names
- Class declarations
- Function chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:98001-100000
## src/js/Grammarly-gDocs.js [chunk 51/53, lines 100001-102000]

### Summary
Chunk 51/53 continues Google Docs integration infrastructure. This segment contains additional SVG icon logic, color constant definitions, utility functions, error handling, and obfuscated infrastructure. No direct Chrome extension APIs, messaging channels, storage keys, endpoints, or DOM manipulation detected in this chunk.

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
- None detected

### Dynamic Code/Obfuscation
- Webpack module pattern
- Minified variable names
- Class declarations
- Function chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:100001-102000
## src/js/Grammarly-gDocs.js [chunk 52/53, lines 102001-104000]

### Summary
This chunk continues the implementation of OAuth authentication, token management, and error handling for Grammarly's Google Docs integration. It includes logic for handling various OAuth grant types (authorization code, refresh, anonymous, token exchange), token validation, storage operations, and network requests to endpoints such as https://auth.grammarly.com/v4/api/oauth2/authorize, https://auth.grammarly.com/v4/api/oauth2/token, and related URLs for different environments (prod, preprod, QA). The code also defines error classes, utility functions for base64 decoding, and retry logic for network operations.
No direct Chrome extension APIs, messaging channels, or DOM manipulation are present in this chunk.
Obfuscation hints include: webpack_modules, minified_vars, class_declarations, function_chains.
No explicit risks identified in this chunk.

### Chrome APIs
- None detected

### Event Listeners
- None detected

### Messaging
- None detected

### Storage
- Custom storage logic for OAuth tokens (e.g., "gr-oauth-key", "oauth.tokens")

### Endpoints
- https://auth.grammarly.com/v4/api/oauth2/authorize
- https://auth.grammarly.com/v4/api/oauth2/token
- https://auth.grammarly.com/v4/api/oauth2/exchange
- https://auth.grammarly.com/v4/api/revoke-by-refresh-token
- https://auth.grammarly.com/v4/api/userinfo
- Preprod/QA variants

### DOM/Sinks
- None detected

### Dynamic Code/Obfuscation
- webpack_modules, minified_vars, class_declarations, function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:102001-104000
## src/js/Grammarly-gDocs.js [chunk 53/53, lines 104001-105030]

### Summary
This final chunk contains the tail end of the module loader and runtime infrastructure for the Google Docs integration. It includes logic for dynamic chunk loading, CSS injection, and error handling for Webpack modules. The code manages asynchronous loading of JavaScript and CSS chunks, sets up global variables, and handles chunk load errors.
No direct Chrome extension APIs, messaging channels, storage operations, endpoints, or DOM manipulation are present in this chunk.
Obfuscation hints include: webpack_modules, minified_vars, function_chains.
No explicit risks identified in this chunk.

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
- None detected

### Dynamic Code/Obfuscation
- Dynamic chunk loading via Webpack infrastructure
- webpack_modules, minified_vars, function_chains

### Risks
- None identified

### Evidence
- src/js/Grammarly-gDocs.js:104001-105030
## src/js/Grammarly-overleafStartContentScript.js [whole-file, lines 1-18]

### Summary
This file is a content script for Overleaf, responsible for injecting another script (Grammarly-overleafInjectedScript.js) into the page. It uses chrome.runtime.getURL to resolve the script path and chrome.runtime.id for extension identification. The script is injected by creating a <script> element and prepending it to the document. Preloading via <link rel="preload"> is supported if the c flag is set.
No direct Chrome extension APIs (other than chrome.runtime.getURL and chrome.runtime.id), messaging, storage, endpoints, or DOM manipulation beyond script injection are present.
Obfuscation hints: None.
No explicit risks identified.

### Chrome APIs
- chrome.runtime.getURL
- chrome.runtime.id

### Event Listeners
- None detected

### Messaging
- None detected

### Storage
- None detected

### Endpoints
- None detected

### DOM/Sinks
- Script injection via document.createElement("script") and document.documentElement.prepend()

### Dynamic Code/Obfuscation
- None

### Risks
- None identified

### Evidence
- src/js/Grammarly-overleafStartContentScript.js:1-18
## src/js/Grammarly-overleafInjectedScript.js [whole-file, lines 1-22]

### Summary
This injected script listens for two custom events in the Overleaf environment:
- "UNSTABLE_editor:extensions" (on self): Extracts CodeMirror's EditorView and adds an update listener that copies the editor's text content to a data-grammarly-text attribute on the DOM. The update listener is pushed to the editor's extensions array.
- "GrammarlyAssistantOverleafScrollEvent" (on document): Finds the CodeMirror editor DOM node and dispatches a selection/scroll event to bring a specific anchor into view.
No direct Chrome extension APIs, messaging, storage, endpoints, or dynamic code execution are present.
Obfuscation hints: None.
No explicit risks identified.

### Chrome APIs
- None detected

### Event Listeners
- self.addEventListener("UNSTABLE_editor:extensions", ...)
- document.addEventListener("GrammarlyAssistantOverleafScrollEvent", ...)

### Messaging
- None detected

### Storage
- None detected

### Endpoints
- None detected

### DOM/Sinks
- Manipulates CodeMirror editor DOM (.cm-content)
- Sets data-grammarly-text attribute
- Dispatches selection/scroll events

### Dynamic Code/Obfuscation
- None

### Risks
- None identified

### Evidence
- src/js/Grammarly-overleafInjectedScript.js:1-22
## src/js/Grammarly-check.styles.js [whole-file, lines 1-2]

### Summary
This file sets two global variables:
- window.GR_RESOURCE_ROOT: Uses chrome.runtime.getURL("") to resolve the extension's resource root.
- window.GR_INLINE_STYLES: Contains a string of CSS styles for Grammarly UI elements, including a hidden element and an animated underline effect.
No direct Chrome extension APIs other than chrome.runtime.getURL, no messaging, storage, endpoints, or DOM manipulation beyond setting global variables.
Obfuscation hints: None.
No explicit risks identified.

### Chrome APIs
- chrome.runtime.getURL

### Event Listeners
- None detected

### Messaging
- None detected

### Storage
- None detected

### Endpoints
- None detected

### DOM/Sinks
- Sets global style string for UI elements

### Dynamic Code/Obfuscation
- None

### Risks
- None identified

### Evidence
- src/js/Grammarly-check.styles.js:1-2
## src/js/Grammarly.styles.js [whole-file]

### Summary
Sets global resource root and inline CSS styles for Grammarly UI overlays. Uses chrome.runtime.getURL to resolve resource paths for images and SVGs. Contains only style definitions, CSS variables, and animation keyframes for Grammarly UI components. No messaging, storage, endpoints, or DOM manipulation detected. No dynamic code or obfuscation patterns present. No risks identified in this file.

### Chrome APIs
- chrome.runtime.getURL (line 1)

### Event Listeners
- None

### Messaging
- None

### Storage
- None

### Endpoints
- None

### DOM/Sinks
- None

### Dynamic Code/Obfuscation
- None detected

### Risks
- None identified

### Evidence
- src/js/Grammarly.styles.js:1-1
## src/js/Grammarly-gDocs.styles.js [whole-file, lines 1-1]

### Summary
Sets global resource root and inline CSS styles for Grammarly overlays in Google Docs. No behavioral logic, Chrome APIs (except getURL for resource root), messaging, storage, endpoints, DOM manipulation, dynamic code, or risks detected.

### Chrome APIs
- chrome.runtime.getURL (line 1)

### Event Listeners
- None

### Messaging
- None

### Storage
- None

### Endpoints
- None

### DOM/Sinks
- None

### Dynamic Code/Obfuscation
- None

### Risks
- None

### Evidence
- src/js/Grammarly-gDocs.styles.js:1-1
# Validation

Schema validation: PASSED
- All required fields present
- Evidence included for all claims
- Enum values valid
