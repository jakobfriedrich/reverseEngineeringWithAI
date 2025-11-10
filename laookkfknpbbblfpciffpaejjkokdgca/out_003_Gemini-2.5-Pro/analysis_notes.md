# Run 004 (Gemini-2.5-Pro)

## Manifest

- Name: Momentum
- Version: 2.25.3
- Manifest Version: 3
- Service Worker: serviceWorker.js
- Content Scripts: content-scripts/momoSiteInterop.js (matches: https://*.momentumdash.com/*)
- Permissions: offscreen, unlimitedStorage, idle
- Optional Permissions: bookmarks, tabs, sessions, topSites, favicon, scripting, alarms, notifications, tabGroups, search
- Host Permissions: None
- Optional Host Permissions: file:///*, *://*/*

Evidence: manifest.json:1-62

## serviceWorker.js [chunk 1/3, lines 1-2000]

### Summary
This chunk contains the initial setup for the service worker. It includes utility functions for date formatting, UUID generation, and object property access. It defines a `KeyValueDb` class, which is a wrapper around IndexedDB for key-value storage. It also sets up a configuration manager that fetches settings from an API endpoint and falls back to local storage. A significant portion of the code is dedicated to a custom logging utility that sends logs to DataDog, including sample rate configuration. It also includes a comprehensive Promise implementation (Dexie.js) and message handling between the service worker and other parts of the extension.

### Chrome APIs
- `chrome.storage.local.get`
- `chrome.storage.local.set`
- `chrome.tabs.query`
- `chrome.scripting.executeScript`
- `chrome.runtime.onMessage.addListener`

### Event Listeners
- `runtime.onMessage.addListener`

### Messaging
- The service worker listens for messages, but the specific message names and directions are not clear in this chunk.

### Storage
- **Type**: IndexedDB (via `KeyValueDb` wrapper)
- **Keys**: `config` (used by the config manager)
- **Operations**: `get`, `set`

### Endpoints
- `GET https://api.momentumdash.com/config`
- `POST https://browser-http-intake.logs.datadoghq.com/v1/input/pub18ef9128dd80db1a80dfc3f9180b55b5?ddsource=browser&ddtags=env:production,service:extension,version:2.25.3`

### DOM/Sinks
- None in this chunk.

### Dynamic Code/Obfuscation
- Minified variable names are present.
- Webpack module patterns are used.

### Risks
- None identified in this chunk.

### Evidence
- serviceWorker.beautified.js:1-2000

## serviceWorker.js [chunk 2/3, lines 2001-4000]

### Summary
This chunk continues the implementation of the Dexie.js IndexedDB wrapper. It defines the `Collection`, `WhereClause`, `Transaction`, and `Version` classes, which provide a comprehensive API for database interactions such as querying, filtering, and updating data. The code also includes several middleware implementations for virtual indexes, hooks, caching, and observability, which enhance the core database functionality.

### Chrome APIs
- None in this chunk.

### Event Listeners
- None in this chunk.

### Messaging
- None in this chunk.

### Storage
- This chunk is heavily focused on IndexedDB operations through the Dexie.js wrapper, but no specific keys or operations are initiated here.

### Endpoints
- None in this chunk.

### DOM/Sinks
- None in this chunk.

### Dynamic Code/Obfuscation
- Minified variable names are present.
- Webpack module patterns are used.

### Risks
- None identified in this chunk.

### Evidence
- serviceWorker.beautified.js:2001-4000

## serviceWorker.js [chunk 3/3, lines 4001-5360]

### Summary
This final chunk of the service worker contains the core extension logic. It sets up listeners for browser events like `onInstalled`, `onClicked` for the browser action, and a comprehensive `onMessage` listener to handle communication from other parts of the extension. This includes logic for one-time logins, managing authentication state, handling legacy user migration via an offscreen document, and opening new tabs. It also includes a robust request queue implementation to handle API calls, with retry logic and queuing for offline scenarios. The chunk also manages notifications and alarms, and reports analytics to PostHog.

### Chrome APIs
- `chrome.runtime.getURL`
- `chrome.runtime.getContexts`
- `chrome.offscreen.createDocument`
- `chrome.runtime.onInstalled.addListener`
- `chrome.runtime.setUninstallURL`
- `chrome.tabs.create`
- `chrome.action.onClicked`
- `chrome.browserAction.onClicked`
- `chrome.runtime.onMessage.addListener`
- `chrome.tabs.update`
- `chrome.notifications.create`
- `chrome.notifications.clear`
- `chrome.alarms.create`
- `chrome.alarms.clear`
- `chrome.alarms.get`
- `chrome.alarms.onAlarm.addListener`
- `chrome.notifications.onClicked.addListener`
- `chrome.notifications.onButtonClicked.addListener`
- `chrome.tabs.onRemoved.addListener`
- `chrome.tabs.onUpdated.addListener`
- `chrome.runtime.sendMessage`

### Event Listeners
- `chrome.runtime.onInstalled.addListener`
- `chrome.action.onClicked`
- `chrome.browserAction.onClicked`
- `chrome.runtime.onMessage.addListener`
- `chrome.alarms.onAlarm.addListener`
- `chrome.notifications.onClicked.addListener`
- `chrome.notifications.onButtonClicked.addListener`
- `chrome.tabs.onRemoved.addListener`
- `chrome.tabs.onUpdated.addListener`
- `self.addEventListener('fetch')`
- `self.addEventListener('install')`
- `self.addEventListener('activate')`
- `self.registration.addEventListener('updatefound')`

### Messaging
- **oneTimeLogin**: Handles one-time login requests.
- **momentum:authState**: Manages authentication state.
- **momentum:checkUserId**: Checks the current user's ID.
- **momentum:getUserId**: Retrieves the current user's ID.
- **momentum:openNew**: Opens a new Momentum tab.
- **legacyUserMigration**: Handles migration for legacy users.
- **legacyUserMigration:triggerOffscreenDocumentRequest**: Triggers a request in the offscreen document.
- **notificationClick**: Handles notification clicks.
- **flashMessage**: Sends a message to be displayed to the user.
- **activateNewWorker**: Activates a new service worker.

### Storage
- **Type**: IndexedDB (via `KeyValueDb` wrapper)
  - **Keys**: `installDate`, `calculateUnregisteredDashboardExperiment`, `releaseUpdateModalCheck`, `authState`
  - **Operations**: `set`, `patch`
- **Type**: localStorage
  - **Keys**: `momentum-customization-1`, `client_uuid`, `token`, `token_uuid`, `unregistered`
  - **Operations**: `getObject`, `getItem`, `setItem`

### Endpoints
- `POST https://api.momentumdash.com/user:migrateLegacy?canceled=true`
- `https://momentumdash.com/uninstall`
- `GET https://modash.blob.core.windows.net/`
- `POST posthog.momentumdash.com/e/`
- `POST .posthog.com/e/`

### DOM/Sinks
- None in this chunk.

### Dynamic Code/Obfuscation
- Minified variable names are present.
- Webpack module patterns are used.

### Risks
- None identified in this chunk.

### Evidence
- serviceWorker.beautified.js:4001-5360

## content-scripts/momoSiteInterop.js [whole-file, lines 1-55]

### Summary
This content script acts as a bridge between the Momentum dashboard website and the extension's service worker. It injects hidden input fields into the page to share the extension's platform and version. It also sets up a message listener to proxy messages between the web page and the service worker for actions like one-time login, authentication state changes, and opening new tabs.

### Chrome APIs
- `chrome.runtime.getURL`
- `chrome.runtime.getManifest`
- `chrome.runtime.sendMessage`

### Event Listeners
- `window.addEventListener('message')`

### Messaging
- **momentum:getUserId**: Retrieves the user ID from the service worker.
- **momentum:oneTimeLogin**: Initiates a one-time login flow.
- **momentum:authState**: Sends authentication state changes to the service worker.
- **momentum:checkUserId**: Checks the user ID with the service worker.
- **momentum:openNew**: Requests to open a new Momentum tab.
- **momentum:callback:oneTimeLogin**: Receives a callback for the one-time login.
- **momentum:callback:checkUserId**: Receives a callback for the user ID check.
- **momentum:callback:openNew**: Receives a callback for opening a new tab.

### Storage
- None.

### Endpoints
- None.

### DOM/Sinks
- Creates and appends hidden `<input>` elements to the `<body>`.

### Dynamic Code/Obfuscation
- None.

### Risks
- None identified.

### Evidence
- content-scripts/momoSiteInterop.beautified.js:1-55

## content-scripts/siteBlocker.js [whole-file, lines 1-66]

### Summary
This content script is responsible for blocking specified websites. It injects a dialog element (`<dialog>`) with an iframe into the page. The iframe's source is `site-blocker.html`, and it receives information about the blocked site via URL parameters. The script uses a MutationObserver to ensure it runs even if the body and head are not immediately available. The visibility of the blocking dialog is controlled by `window.postMessage` events (`momentum-intervention:show` and `momentum-intervention:dismiss`).

### Chrome APIs
- `chrome.runtime.getURL`

### Event Listeners
- `window.addEventListener('message')`

### Messaging
- **momentum-intervention:show**: Shows the site blocker dialog.
- **momentum-intervention:dismiss**: Hides the site blocker dialog.

### Storage
- None.

### Endpoints
- None.

### DOM/Sinks
- Creates a `<momentum-extension-intervention-dialog>` custom element.
- Attaches a shadow DOM to the custom element.
- Injects an `<iframe>` and `<style>` tags into the shadow DOM.
- Prepends the custom element and a style element to `document.body`.
- Uses `MutationObserver` to wait for `document.body` and `document.head`.

### Dynamic Code/Obfuscation
- None.

### Risks
- None identified.

### Evidence
- content-scripts/siteBlocker.beautified.js:1-66
