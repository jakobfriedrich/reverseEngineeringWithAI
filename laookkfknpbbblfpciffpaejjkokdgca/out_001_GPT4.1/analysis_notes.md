# Run 002 (GPT4.1)

## serviceWorker.js [chunk 1/3, lines 1-2000]

### Summary
Initializes service worker context, sets up IndexedDB via Dexie.js, configures request/response logic, error logging, and configuration fetch. Implements custom key-value DB, logging to Datadog, and message handler setup. Prepares background infrastructure for request queue, notifications, and tab management.

### Chrome APIs
- chrome.runtime (context, sendMessage)
- chrome.storage.local (get, set)
- chrome.tabs (query)

### Event Listeners
- self.addEventListener("message")
- self.addEventListener("error")

### Messaging
- Message handler setup for runtime.onMessage
- Custom bus for inter-component communication

### Storage
- IndexedDB: misc, config
- chrome.storage.local: userPrefs

### Endpoints
- https://api.momentumdash.com/config (GET)
- https://browser-http-intake.logs.datadoghq.com/v1/input/pub18ef9128dd80db1a80dfc3f9180b55b5 (POST)

### DOM/Sinks
- None in this chunk (service worker context)

### Dynamic Code/Obfuscation
- Minified variable names
- Webpack module pattern
- No eval/new Function detected

### Risks
- Tracking: Sends extension and tab data to Datadog logging endpoint
- PII: Potential user/account data in config fetch

### Evidence
- serviceWorker.js:1-2000
## serviceWorker.js [chunk 2/3, lines 2001-4000]

### Summary
Extensive IndexedDB and Dexie.js usage for request queue management, notification scheduling, and analytics event batching. Handles Chrome alarms, notifications, tab events, and background messaging. Implements request queue with retry, mutation, and error handling. Integrates with remote endpoints for user/account, analytics, and notifications. Uses custom message bus for inter-component communication.

### Chrome APIs
- chrome.alarms (onAlarm, create, clear)
- chrome.notifications (onClicked, onButtonClicked, create, clear)
- chrome.runtime (onMessage, sendMessage, getURL, getContexts)
- chrome.tabs (create, update, query, onRemoved, onUpdated)
- chrome.action/browserAction (onClicked)

### Event Listeners
- self.addEventListener("fetch")
- self.addEventListener("install")
- self.addEventListener("activate")
- self.addEventListener("error")
- chrome.runtime.onMessage.addListener
- chrome.alarms.onAlarm.addListener
- chrome.notifications.onClicked.addListener
- chrome.notifications.onButtonClicked.addListener
- chrome.tabs.onRemoved.addListener
- chrome.tabs.onUpdated.addListener

### Messaging
- Channel: "notificationClick", direction: background->tabs
- Channel: "flashMessage", direction: background->tabs
- Channel: "legacyUserMigration", direction: content->background
- Channel: "momentum:authState", direction: content->background
- Channel: "momentum:checkUserId", direction: content->background
- Channel: "momentum:getUserId", direction: content->background
- Channel: "momentum:openNew", direction: content->background

### Storage
- IndexedDB databases: notificationsQueue, analyticsQueue, xhrQueue, idMap, timestamp, misc
- chrome.storage.local: installDate, releaseUpdateModalCheck, calculateUnregisteredDashboardExperiment
- localStorage: token, token_uuid, unregistered, client_uuid, momentum-customization-1

### Endpoints
- https://api.momentumdash.com/ (user/account, notifications, migration)
- https://browser-http-intake.logs.datadoghq.com/v1/input/pub18ef9128dd80db1a80dfc3f9180b55b5 (logging)
- https://modash.blob.core.windows.net/ (photo cache)
- https://posthog.momentumdash.com/e/ (analytics)
- https://account.momentumdash.com/
- https://www.momentumdash.com/

### DOM/Sinks
- None in this chunk (service worker context)

### Dynamic Code/Obfuscation
- Custom message bus and request queue patterns
- Minified variable names
- Dexie.js/IndexedDB abstraction
- No eval/new Function detected

### Risks
- Tracking: Analytics events batched and sent to remote endpoint (posthog)
- PII: User/account migration and token handling
- Insecure storage: Tokens in localStorage
- Excessive permissions: Broad tab and notification access

### Evidence
- serviceWorker.js:2001-4000
## serviceWorker.js [chunk 3/3, lines 4001-5360]

### Summary
Implements notification queue, alarm scheduling, tab event listeners, and background fetch handling. Manages analytics batching, offscreen document creation, and legacy user migration. Handles Chrome runtime, notifications, tabs, and service worker lifecycle events. Integrates with multiple remote endpoints for user/account, analytics, and notifications. Uses Dexie.js for IndexedDB management and custom request queue logic.

### Chrome APIs
- chrome.notifications (onClicked, onButtonClicked, create, clear)
- chrome.alarms (onAlarm, create, clear)
- chrome.runtime (onMessage, sendMessage, getContexts, getURL, onInstalled, setUninstallURL)
- chrome.tabs (create, update, query, get, onRemoved, onUpdated)
- chrome.offscreen (createDocument)

### Event Listeners
- self.addEventListener("fetch")
- self.addEventListener("install")
- self.addEventListener("activate")
- self.registration.addEventListener("updatefound")
- chrome.runtime.onMessage.addListener
- chrome.runtime.onInstalled.addListener
- chrome.notifications.onClicked.addListener
- chrome.notifications.onButtonClicked.addListener
- chrome.alarms.onAlarm.addListener
- chrome.tabs.onRemoved.addListener
- chrome.tabs.onUpdated.addListener

### Messaging
- Channel: "notificationClick", direction: background->tabs
- Channel: "flashMessage", direction: background->tabs
- Channel: "legacyUserMigration", direction: content->background
- Channel: "momentum:authState", direction: content->background
- Channel: "momentum:checkUserId", direction: content->background
- Channel: "momentum:getUserId", direction: content->background
- Channel: "momentum:openNew", direction: content->background

### Storage
- IndexedDB databases: notificationsQueue, analyticsQueue, xhrQueue, idMap, timestamp, misc
- chrome.storage.local: installDate, releaseUpdateModalCheck, calculateUnregisteredDashboardExperiment
- localStorage: token, token_uuid, unregistered, client_uuid, momentum-customization-1

### Endpoints
- https://api.momentumdash.com/ (user/account, notifications, migration)
- https://browser-http-intake.logs.datadoghq.com/v1/input/pub18ef9128dd80db1a80dfc3f9180b55b5 (logging)
- https://modash.blob.core.windows.net/ (photo cache)
- https://posthog.momentumdash.com/e/ (analytics)
- https://account.momentumdash.com/
- https://www.momentumdash.com/

### DOM/Sinks
- None in this chunk (service worker context)

### Dynamic Code/Obfuscation
- Custom request queue and notification logic
- Minified variable names
- Dexie.js/IndexedDB abstraction
- No eval/new Function detected

### Risks
- Tracking: Analytics events sent to remote endpoint (posthog)
- PII: User/account migration and token handling
- Insecure storage: Tokens in localStorage
- Excessive permissions: Broad tab, notification, and offscreen access

### Evidence
- serviceWorker.js:4001-5360
## content-scripts/momoSiteInterop.js [whole-file, lines 1-54]

### Summary
Initializes extension interop for Momentum site. Injects hidden input fields for platform/version, requests userId from background, and sets up message passing for login, auth state, userId check, and opening new tabs. Relies on chrome.runtime messaging and window.postMessage for communication between content and background.

### Chrome APIs
- chrome.runtime.getURL (line 8)
- chrome.runtime.getManifest (line 13)
- chrome.runtime.sendMessage (lines 15, 22, 27, 34, 41)
- chrome.extension.inIncognitoContext (line 11)

### Event Listeners
- window.addEventListener('message') (line 22)

### Messaging
- Channel: "momentum:getUserId", direction: content->background, keys: []
- Channel: "momentum:oneTimeLogin", direction: content->background, keys: [payload, legacy, updateSenderTab]
- Channel: "momentum:authState", direction: content->background, keys: [type, payload]
- Channel: "momentum:checkUserId", direction: content->background, keys: [payload]
- Channel: "momentum:openNew", direction: content->background, keys: [type, payload]

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- Injects hidden input fields into document.body (lines 4, 14, 18)

### Dynamic Code/Obfuscation
- Minified variable names detected

### Risks
- None significant in this chunk

### Evidence
- content-scripts/momoSiteInterop.js:1-54
## content-scripts/siteBlocker.js [whole-file, lines 1-54]

### Summary
Injects a shadow DOM dialog with an iframe pointing to site-blocker.html, passing hostname, site name, meta title, and document title as query parameters. Listens for window messages to show/dismiss the intervention dialog. Uses MutationObserver to wait for DOM readiness if needed. No direct Chrome API calls except chrome.runtime.getURL. No messaging to background detected. No storage or network endpoints in this chunk.

### Chrome APIs
- chrome.runtime.getURL (line 18)

### Event Listeners
- window.addEventListener('message') (line 38)

### Messaging
- Channel: "momentum-intervention:show", direction: content->ui, keys: []
- Channel: "momentum-intervention:dismiss", direction: content->ui, keys: []

### Storage
- None in this chunk

### Endpoints
- Loads iframe: chrome-extension://<id>/site-blocker.html?hostname=...&sitename=...&metatitle=...&documenttitle=... (line 18)

### DOM/Sinks
- Injects dialog and style into document.body (lines 8, 36)
- Uses MutationObserver for DOM readiness (lines 48-53)

### Dynamic Code/Obfuscation
- Minified variable names detected

### Risks
- None significant in this chunk

### Evidence
- content-scripts/siteBlocker.js:1-54
## Components

### Background (Service Worker)
- Files: serviceWorker.js
- APIs: chrome.runtime, chrome.storage.local, chrome.tabs, chrome.alarms, chrome.notifications, chrome.offscreen
- Listeners: self.addEventListener('message'), self.addEventListener('error'), self.addEventListener('fetch'), self.addEventListener('install'), self.addEventListener('activate'), self.registration.addEventListener('updatefound'), chrome.runtime.onMessage, chrome.runtime.onInstalled, chrome.alarms.onAlarm, chrome.notifications.onClicked, chrome.notifications.onButtonClicked, chrome.tabs.onRemoved, chrome.tabs.onUpdated
- Evidence: serviceWorker.js:1-5360

### Content Scripts
- Files: content-scripts/momoSiteInterop.js, content-scripts/siteBlocker.js
- APIs: chrome.runtime.getURL, chrome.runtime.getManifest, chrome.runtime.sendMessage, chrome.extension.inIncognitoContext
- Listeners: window.addEventListener('message')
- Evidence: content-scripts/momoSiteInterop.js:1-54, content-scripts/siteBlocker.js:1-54

### Flows
- Content → Background: "momentum:getUserId", "momentum:oneTimeLogin", "momentum:authState", "momentum:checkUserId", "momentum:openNew"
- Background → Tabs: "notificationClick", "flashMessage"
- Background → Remote: POST https://browser-http-intake.logs.datadoghq.com/v1/input/pub18ef9128dd80db1a80dfc3f9180b55b5, POST https://posthog.momentumdash.com/e/
- Background → Storage: IndexedDB (notificationsQueue, analyticsQueue, xhrQueue, idMap, timestamp, misc), localStorage (token, token_uuid, unregistered, client_uuid, momentum-customization-1)
- Content → UI: "momentum-intervention:show", "momentum-intervention:dismiss"

### Evidence
- serviceWorker.js:1-5360
- content-scripts/momoSiteInterop.js:1-54
- content-scripts/siteBlocker.js:1-54
## Workflows

### User Authentication and Migration
**Triggers**: Content script loaded, user login attempt, legacy migration event
**Steps**:
1. Content script requests userId from background ("momentum:getUserId")
2. Content script sends one-time login message ("momentum:oneTimeLogin")
3. Service worker validates credentials, migrates legacy user if needed
4. Service worker stores tokens and user info in localStorage/IndexedDB
5. Service worker sends response back to content script
**APIs**: chrome.runtime.sendMessage, chrome.storage.local, IndexedDB
**Messages**: momentum:getUserId, momentum:oneTimeLogin, legacyUserMigration
**Endpoints**: https://api.momentumdash.com/, https://account.momentumdash.com/
**Storage**: token, token_uuid, client_uuid, notificationsQueue
**Evidence**: content-scripts/momoSiteInterop.js:15-54, serviceWorker.js:2001-5360

### Analytics and Tracking
**Triggers**: Extension events, tab updates, notification events
**Steps**:
1. Service worker batches analytics events in IndexedDB
2. Service worker sends analytics to remote endpoints (Datadog, Posthog)
3. Service worker logs config and tab data
**APIs**: chrome.alarms, chrome.notifications, chrome.runtime, IndexedDB
**Messages**: flashMessage, notificationClick
**Endpoints**: https://browser-http-intake.logs.datadoghq.com/v1/input/pub18ef9128dd80db1a80dfc3f9180b55b5, https://posthog.momentumdash.com/e/
**Storage**: analyticsQueue, notificationsQueue
**Evidence**: serviceWorker.js:1-5360

### Site Blocker Intervention
**Triggers**: Blocked site detected, content script loaded
**Steps**:
1. Content script injects intervention dialog with iframe
2. Content script listens for show/dismiss messages
3. User interacts with dialog UI
**APIs**: chrome.runtime.getURL
**Messages**: momentum-intervention:show, momentum-intervention:dismiss
**Endpoints**: chrome-extension://<id>/site-blocker.html
**Storage**: None
**Evidence**: content-scripts/siteBlocker.js:8-44
## Privacy Analysis

### Data Categories
- User credentials (tokens, userId)
- Analytics/telemetry (extension events, tab data)
- Legacy migration data

### Purposes
- Authentication and user migration
- Analytics and usage tracking
- Site blocking intervention

### Minimization
Collects user tokens, userId, and analytics data. Data collection is focused on extension functionality and analytics, but includes legacy migration and broad tab data.

### Consent
No explicit consent mechanism observed. Data collection and analytics appear automatic upon extension use.

### Retention
Indefinite storage in IndexedDB and localStorage. No evidence of data expiration or cleanup.

### Third Parties
- api.momentumdash.com: Core extension API (Evidence: serviceWorker.js:2001-5360)
- account.momentumdash.com: User account management (Evidence: serviceWorker.js:2001-5360)
- browser-http-intake.logs.datadoghq.com: Analytics/telemetry (Evidence: serviceWorker.js:1-5360)
- posthog.momentumdash.com: Analytics/telemetry (Evidence: serviceWorker.js:1-5360)

### Policy Compliance
Potential GDPR concerns: lacks explicit consent and data retention policy. May violate Chrome Web Store policy regarding user data disclosure.

## Risks

### Risk: Tracking
**Severity**: Medium
**Justification**: Extension sends analytics and tab data to third-party endpoints (Datadog, Posthog) without explicit user consent
**Evidence**: serviceWorker.js:1-5360

### Risk: PII Exfiltration
**Severity**: Medium
**Justification**: User tokens and userId are sent to remote endpoints and stored indefinitely
**Evidence**: serviceWorker.js:2001-5360

### Risk: Insecure Storage
**Severity**: Low
**Justification**: Tokens and user identifiers stored in localStorage without encryption
**Evidence**: serviceWorker.js:2001-5360

### Risk: Excessive Permissions
**Severity**: Low
**Justification**: Extension requests broad tab, notification, and offscreen access
**Evidence**: manifest.json:1-25, serviceWorker.js:1-5360
