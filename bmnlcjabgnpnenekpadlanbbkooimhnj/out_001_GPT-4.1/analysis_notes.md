# Run 001 (GPT-4.1)
## Manifest


Evidence: manifest.json:1-56


## h0.js [chunk 1/73, lines 1-2000]

### Summary
Webpack-bundled service worker core. Contains plugin/action registry, error handling, and platform abstraction. No direct Chrome API calls in this chunk, but foundational logic for plugin execution and state management. Heavy obfuscation/minification and module loader patterns detected.

### Chrome APIs
- None directly invoked in this chunk

### Event Listeners
- None directly invoked in this chunk

### Messaging
- None directly invoked in this chunk

### Storage
- None directly invoked in this chunk

### Endpoints
- None directly invoked in this chunk

### DOM/Sinks
- None directly invoked in this chunk

### Dynamic Code/Obfuscation
- Webpack module loader pattern
- Minified variable names

### Risks
- Obfuscation: code is heavily bundled/minified, making analysis difficult

### Evidence
- h0.js:1-2000
## h0.js [chunk 2/73, lines 2001-4000]

### Summary
This chunk contains a large set of store-specific DAC (Discount Application Component) plugin definitions, each implementing a `doDac` async function for coupon application and removal logic. The code interacts with many third-party e-commerce APIs (DSW, Expedia, Fitflop, Forever21, Gap, HM-CA, Hammacher Schlemmer, Home Depot, JcPenney, JCrew, Kohl's, Loft, Macy's, Office Depot, Old Navy, Orbitz, Papa John's, PrettyLittleThing, Puritans-Pride, Saks Fifth Avenue, Sephora, Shopify, Shutterstock, and more). Each plugin uses AJAX requests to apply/remove coupons, update DOM elements, and parse responses. The code is highly modular and obfuscated, with repeated patterns for network calls, DOM manipulation, and cookie/storage access.

### Chrome APIs
- None directly observed in this chunk (no `chrome.*` calls).

### Event Listeners
- No direct Chrome event listeners found.

### Messaging
- No direct Chrome extension messaging patterns found.

### Storage
- Accesses to `window.localStorage` (e.g., line 1231: `window.localStorage.getItem("aeotoken")`)
- Accesses to `window.sessionStorage` (e.g., line 1875: `window.sessionStorage.getItem("cvsbfp_v2")`)
- Multiple cookie reads (e.g., `document.cookie.match(...)`)

### Endpoints
- Numerous third-party endpoints for coupon application/removal, e.g.:
  - POST https://www.dsw.com/api/v1/coupons/claim
  - GET https://www.dsw.com/api/v1/cart/details
  - POST https://www.expedia.com/Checkout/applyCoupon
  - POST https://www.fitflop.com/us/en/cart/coupon
  - POST https://www.forever21.com/on/demandware.store/Sites-forever21-Site/en_US/Cart-AddCoupon
  - POST https://secure-www.gap.com/shopping-bag-xapi/apply-bag-promo/
  - POST https://www2.hm.com/en_ca/checkout/redeemVoucher
  - POST https://www.hammacher.com/shoppingcart/applypromocode
  - POST https://www.homedepot.com/mcc-checkout/v2/promo/add
  - POST https://order-api.jcpenney.com/order-api/v1/accounts/.../draft-order/adjustment/discounts
  - POST https://www.jcrew.com/checkout-api/graphql
  - POST https://www.kohls.com/cnc/applyCoupons
  - POST https://www.loft.com/cws/cart/claimCoupon.jsp
  - PUT https://www.macys.com/my-bag/.../promo\?promoCode\=...
  - POST https://www.officedepot.com/async/cart/addCoupon.do
  - POST https://secure-oldnavy.gap.com/shopping-bag-xapi/apply-bag-promo/
  - POST https://www.orbitz.com/Checkout/applyCoupon
  - GET https://www.papajohns.com/order/validate-promo
  - POST https://www.prettylittlething.fr/pltmobile/coupon/couponPost/
  - POST https://www.puritan.com/shoppingcart/applyCoupon
  - GET https://www.saksfifthavenue.com/cart-coupon-add
  - POST https://www.sephora.com/api/shopping-cart/basket/promotions
  - POST https://www.jcrew.com/checkout-api/graphql
  - PATCH https://www.shutterstock.com/papi/orders/...

### DOM/Sinks
- Frequent use of `document.querySelector`, `document.querySelectorAll`, and direct DOM updates (e.g., `.text(...)`, `.val(...)`, `.setAttribute(...)`, `.dispatchEvent(...)`, `.click()`).
- Use of `innerHTML` and manipulation of DOM elements to reflect coupon results.

### Dynamic Code/Obfuscation
- Highly modular, minified, and obfuscated code structure (webpack module patterns, single-letter variables, function chains).
- Many async functions and error handling wrappers.

### Risks
- Extensive third-party network communication (potential for tracking, PII exfiltration).
- Use of localStorage/sessionStorage/cookies for token and credential handling (potential insecure storage).
- No explicit consent or privacy controls observed in this chunk.

### Evidence
- h0.js:2001-4000
  - Endpoints: lines 2001-4000 (multiple POST/GET requests)
  - Storage: line 1231 (localStorage), line 1875 (sessionStorage), multiple cookie reads
  - DOM: lines 835, 851, 1007, 3888, 4178 (querySelector, innerHTML, etc.)
  - Obfuscation: minified variable names, webpack module patterns throughout
## h0.js [chunk 3/73, lines 4001-6000]

### Summary
This chunk contains additional DAC plugin definitions for stores such as Staples, TJ Maxx, Vimeo, Vitacost, Wish, and World Market. Each plugin implements coupon application/removal logic using AJAX requests to third-party endpoints, DOM manipulation, and error handling. The chunk also includes core framework and integration runner logic for orchestrating coupon workflows, mixin execution, and event bubbling. There is extensive use of obfuscated/minified patterns, modular plugin registration, and custom event dispatching.

### Chrome APIs
- None directly observed in this chunk.

### Event Listeners
- No direct Chrome event listeners found.

### Messaging
- No direct Chrome extension messaging patterns found.

### Storage
- Cookie access (e.g., `document.cookie.match("xsrf=([^;]*)")` for Wish).
- No direct use of `chrome.storage` or localStorage/sessionStorage in this chunk.

### Endpoints
- POST https://www.staples.com/cc/api/checkout/default/coupon
- POST https://tjmaxx.tjx.com/store/checkout/cart.jsp\?_DARGS\=/store/checkout/views/cart.jsp.promo
- POST https://www.vimeo.com/ (dynamic, uses window.location.href)
- POST https://www.vitacost.com/Checkout/ShoppingCart.aspx\?sce\=view
- POST https://www.wish.com/api/promo-code/apply
- GET https://www.worldmarket.com/on/demandware.store/Sites-World_Market-Site/en_US/Cart-ApplyCoupon
- GET https://www.worldmarket.com/on/demandware.store/Sites-World_Market-Site/en_US/Cart-RemoveCouponLineItem

### DOM/Sinks
- Frequent use of `document.querySelector`, `.text()`, `.val()`, `.setAttribute()`, `.dispatchEvent()`, `.click()`, and custom event dispatching.
- Manipulation of DOM elements to reflect coupon results and trigger UI updates.

### Dynamic Code/Obfuscation
- Highly modular, minified, and obfuscated code structure (webpack module patterns, single-letter variables, function chains).
- Custom event dispatching and mixin execution logic.

### Risks
- Extensive third-party network communication (potential for tracking, PII exfiltration).
- Use of cookies for token handling (potential insecure storage).
- No explicit consent or privacy controls observed in this chunk.

### Evidence
- h0.js:4001-6000
  - Endpoints: lines 4001-6000 (multiple POST/GET requests)
  - Storage: cookie access (line 46585 for Wish)
  - DOM: lines 4001-6000 (querySelector, innerHTML, etc.)
  - Obfuscation: minified variable names, webpack module patterns throughout
## h0.js [chunk 4/73, lines 6001-8000]

### Summary
This chunk implements the extension’s custom JavaScript interpreter and object model, including scope management, property access, marshalling between native and pseudo objects, and error handling. It defines classes for objects, primitives, and functions, and provides methods for property access, scope population, and exception handling. The code is highly modular and obfuscated, with extensive use of prototype chains and custom descriptors. No direct Chrome APIs, messaging, or network endpoints are present in this chunk.

### Chrome APIs
- None observed in this chunk.

### Event Listeners
- No direct Chrome event listeners found.

### Messaging
- No direct Chrome extension messaging patterns found.

### Storage
- No direct use of `chrome.storage`, localStorage, sessionStorage, or cookies in this chunk.

### Endpoints
- No network endpoints observed in this chunk.

### DOM/Sinks
- No direct DOM manipulation in this chunk; focus is on interpreter and object model logic.

### Dynamic Code/Obfuscation
- Highly modular, minified, and obfuscated code structure (custom interpreter, prototype chains, function chains).
- Infrastructure for executing plugin code and handling custom events.

### Risks
- No direct privacy or security risks observed in this chunk (infrastructure only).

### Evidence
- h0.js:6001-8000
  - Interpreter, object model, scope/property management, error handling.
  - No Chrome APIs, endpoints, or storage operations.
## h0.js [chunk 5/73, lines 8001-10000]

### Summary
This chunk continues the implementation of a custom JavaScript interpreter, including built-in object emulation (Array, Boolean, Date, Error, Function, Number, Object, RegExp, String), property management, and scope handling. No Chrome extension APIs, endpoints, messaging, or storage operations are present. The code is highly modular and obfuscated, with function chains and minified variable names.

### Chrome APIs
- None found

### Event Listeners
- None found

### Messaging
- None found

### Storage
- None found

### Endpoints
- None found

### DOM/Sinks
- None found

### Dynamic Code/Obfuscation
- Function chains
- Minified variable names

### Risks
- None found

### Evidence
- h0.js:8001-10000
## h0.js [chunk 6/73, lines 10001-12000]

### Summary
This chunk continues the implementation of custom DOM manipulation and emulation logic, including methods for element wrapping, insertion, removal, cloning, and traversal. The code mimics jQuery/Cheerio-like APIs for manipulating virtual DOM trees, but does not interact with the real browser DOM or Chrome extension APIs. No Chrome APIs, endpoints, messaging, or storage operations are present. The code remains highly modular and obfuscated, with function chains and minified variable names.

### Chrome APIs
- None found

### Event Listeners
- None found

### Messaging
- None found

### Storage
- None found

### Endpoints
- None found

### DOM/Sinks
- None found (virtual DOM only)

### Dynamic Code/Obfuscation
- Function chains
- Minified variable names

### Risks
- None found

### Evidence
- h0.js:10001-12000

## h0.js [chunk 7/73, lines 12001-14000]

### Summary
Chunk contains cryptographic primitives (MD5, SHA1, SHA256, SHA3, RIPEMD160, DES, TripleDES, Rabbit, RC4), block cipher modes, and selector engine logic (css-select). No Honey-specific logic, Chrome APIs, or extension behaviors detected. Bundled third-party libraries and minified variable names present.

### Chrome APIs
- None found in this chunk.

### Event Listeners
- None found in this chunk.

### Messaging
- None found in this chunk.

### Storage
- None found in this chunk.

### Endpoints
- None found in this chunk.

### DOM/Sinks
- None found in this chunk.

### Dynamic Code/Obfuscation
- Minified variable names
- Webpack module pattern
- Bundled third-party cryptography and selector libraries

### Risks
- None found in this chunk.

### Evidence
- h0.js:12001-14000
## h0.js [chunk 8/73, lines 14001-16000]

### Summary
Chunk contains CSS pseudo-class logic, DOM handler and node classes, HTML/XML encoding/decoding, SVG/MathML attribute adjustments, and feed parsing utilities. No Honey-specific logic, Chrome APIs, or extension behaviors detected. Bundled third-party libraries and minified variable names present.

### Chrome APIs
- None found in this chunk.

### Event Listeners
- None found in this chunk.

### Messaging
- None found in this chunk.

### Storage
- None found in this chunk.

### Endpoints
- None found in this chunk.

### DOM/Sinks
- None found in this chunk.

### Dynamic Code/Obfuscation
- Minified variable names
- Webpack module pattern
- Bundled third-party HTML/DOM libraries

### Risks
- None found in this chunk.

### Evidence
- h0.js:14001-16000
## h0.js [chunk 9/73, lines 16001-18000]

### Summary
Chunk contains HTML/XML parsing state machines, namespace/tag/attribute constants, and virtual DOM tree adapter logic. No Honey-specific or Chrome extension logic detected.

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
- None (virtual DOM only)

### Dynamic Code/Obfuscation
- Minified variable names detected
- Webpack module pattern
- Third-party library code

### Risks
- None in this chunk

### Evidence
- h0.js:16001-18000
## h0.js [chunk 10/73, lines 18001-20000]

### Summary
Chunk contains stack manipulation for virtual DOM, HTML serialization, and tokenizer state machine logic. No Honey-specific or Chrome extension logic detected.

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
- None (virtual DOM only)

### Dynamic Code/Obfuscation
- Minified variable names detected
- Webpack module pattern
- Third-party library code

### Risks
- None in this chunk

### Evidence
- h0.js:18001-20000
## h0.js [chunk 11/73, lines 20001-22000]

### Summary
This chunk contains bundled third-party libraries and Honey infrastructure code for experiment management, error handling, and feature flagging. It includes:
- Superagent AJAX client (browser version, no direct Chrome API usage)
- UUID generation and validation logic
- Honey experiment/feature flag manager (loads experiment definitions, tracks impressions, variant selection)
- Error class definitions and mappings for Honey-specific errors
- Semver parsing and comparison utilities
- Currency exchange rate API client and caching logic
- Heartbeat/telemetry logic for device health and storage usage reporting

No direct Chrome extension APIs, event listeners, messaging, or storage operations specific to extension behavior are present in this chunk. The code is primarily infrastructure and third-party library logic.

### Chrome APIs
- None detected

### Event Listeners
- None detected

### Messaging
- None detected

### Storage
- Indirect references to `localStorage` and custom storage abstraction for device heartbeat, but no direct Chrome storage API usage in this chunk.

### Endpoints
- "https://cdn.honey.io/experiments/extension-experiment.json" (experiment definitions)
- "https://history.paypal.com/targeting/set-plugin?src=honey" (heartbeat/telemetry)

### DOM/Sinks
- None detected

### Dynamic Code/Obfuscation
- Minified variable names
- Webpack module pattern
- Bundled third-party libraries (superagent, uuid, semver)

### Risks
- None detected in this chunk

### Evidence
- h0.js:20001-22000
## h0.js [chunk 12/73, lines 22001-24000]

### Summary
This chunk contains Honey extension infrastructure for:
- Heartbeat telemetry (PayPal and device health reporting, with storage in custom cache and localStorage)
- Session and screen view management (session IDs, screen view IDs, cache-backed)
- Store metadata and affiliate management (stand down logic, tagging, store cache, templated store data)
- Stand down rules fetched from `https://cdn.honey.io/standdown-rules.json`
- Affiliate tagging logic, outbound URL construction, and tagging in tabs/frames
- Gold activation logic (rewards, cashback, badge animation)
- Store repository and coupon management (GraphQL queries, cache, retry/backoff)
- Product observation and event reporting (to `https://s.joinhoney.com/evs`, `https://s.joinhoney.com/pr`, etc.)
- Savings stats and followed store stats (GraphQL endpoints)
- Error class definitions and utility functions

**Endpoints discovered:**
- https://cdn.honey.io/images/findsavings/coiny-dash-config.json
- https://cdn.honey.io/standdown-rules.json
- https://s.joinhoney.com/evs
- https://s.joinhoney.com/pr
- https://s.joinhoney.com/ext_obs
- https://s.joinhoney.com/ev/\{code\}
- https://o.honey.io/store/\{storeId\}/\{type\}
- https://s.joinhoney.com/ext_getUserFollow
- https://s.joinhoney.com/ext_getStoresByIds
- https://s.joinhoney.com/ext_getUserSavingsStats

### Chrome APIs
- None detected in this chunk

### Event Listeners
- None detected

### Messaging
- Internal extension messaging for stand down status, tagging, and event reporting (not Chrome messaging APIs)

### Storage
- Custom cache abstraction, localStorage, and session attributes (no direct Chrome storage API usage in this chunk)

### DOM/Sinks
- DOM manipulation for iframe creation (affiliate tagging in frame)

### Dynamic Code/Obfuscation
- Minified variable names
- Webpack module pattern
- Bundled third-party libraries

### Risks
- None detected in this chunk

### Evidence
- h0.js:22001-24000
## h0.js [chunk 13/73, lines 24001-26000]

### Summary
Chunk contains bundled cryptography libraries (AES, Blowfish, MD5, SHA1, SHA256, SHA3, SHA512, RIPEMD160, Rabbit, RC4), encoding/decoding utilities, and padding schemes. No direct Chrome APIs, event listeners, messaging, storage, endpoints, or DOM manipulation detected. Strong obfuscation signals present.

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
- Minified variable names detected
- Webpack module pattern
- Bundled third-party cryptography libraries

### Risks
- None in this chunk

### Evidence
- h0.js:24001-26000
## h0.js [chunk 14/73, lines 26001-28000]

### Summary
Contains bundled third-party libraries: DES/TripleDES cryptography, JSON parsing/stringifying, and Acorn JavaScript parser. No direct Chrome API calls, event listeners, messaging, storage, or network endpoints. This chunk is infrastructure code for cryptography and dynamic code analysis.

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
- Bundled third-party libraries (DES, TripleDES, Acorn)
- Minified variable names
- Webpack module pattern
- Function chains (large switch statements, string tables)

### Risks
- None directly observed in this chunk

### Evidence
- h0.js:26001-28000
## h0.js [chunk 15/73, lines 28001-30000]

### Summary
Continues with bundled infrastructure code: remainder of Acorn parser, utility functions, and extension template/enums definitions. No direct Chrome API calls, event listeners, messaging, storage, or network endpoints. Contains configuration objects for extension templates, not behavioral logic.

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
- Function chains

### Risks
- None directly observed in this chunk

### Evidence
- h0.js:28001-30000
## h0.js [chunk 16/73, lines 30001-32000]

### Summary
Extension infrastructure and template registry for product detection and checkout automation. Defines productFetcher and pageDetector templates for various merchant sites. No direct Chrome APIs, event listeners, messaging, or storage operations in this chunk.

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
- Function chains

### Risks
- None in this chunk

### Evidence
- h0.js:30001-32000
## h0.js [chunk 17/73, lines 32001-34000]

### Summary
Extension infrastructure and utility functions for product detection and checkout automation. Contains generic JS helpers, template rendering, and parameter extraction logic. No direct Chrome APIs, event listeners, messaging, or storage operations in this chunk.

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
- Function chains

### Risks
- None in this chunk

### Evidence
- h0.js:32001-34000
## h0.js [chunk 18/73, lines 34001-36000]

### Summary
Sentry instrumentation, tracing, and transaction management. Contains third-party library code and extension scaffolding. No direct Chrome API calls, event listeners, or behavioral logic in this chunk.

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
- Function chains

### Risks
- None in this chunk

### Evidence
- h0.js:34001-36000
## h0.js [chunk 19/73, lines 36001-38000]

### Summary
Sentry SDK setup, global error/rejection handlers, event instrumentation, and DOM snapshot/serialization utilities. Contains third-party library code and extension scaffolding. No direct Chrome API calls, event listeners, messaging, storage, or endpoints in this chunk.

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
- Function chains

### Risks
- None in this chunk

### Evidence
- h0.js:36001-38000
## h0.js [chunk 20/73, lines 38001-40000]

### Summary
Advanced DOM mutation tracking, event instrumentation, and snapshot logic. Contains rrweb/DOM recording infrastructure, mutation observers, input/scroll/mouse event handlers, and serialization logic for DOM nodes and stylesheets. No direct Chrome API calls, event listeners, messaging, storage, or endpoints in this chunk.

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
- Function chains

### Risks
- None in this chunk

### Evidence
- h0.js:38001-40000
## h0.js [chunk 21/73, lines 40001-42000]

### Summary
Session replay and event buffering logic for Sentry. Includes performance entry serialization, event buffer/compression worker management, session sampling/expiration, privacy/masking config, and replay event transmission. No direct Chrome APIs, messaging, storage, endpoints, or dynamic code in this chunk.

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
- Minified variable names detected
- Webpack module pattern
- Function chain patterns

### Risks
- None in this chunk

### Evidence
- h0.js:40001-42000
## h0.js [chunk 22/73, lines 42001-44000]

### Summary
Browser telemetry, tracing, and profiling logic for Sentry. Includes performance API usage, transaction/span management, HTTP request tracing, IndexedDB offline event queue, and profiling logic. No direct Chrome APIs, messaging, storage, endpoints, or dynamic code in this chunk.

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
- Minified variable names detected
- Webpack module pattern
- Function chain patterns

### Risks
- None in this chunk

### Evidence
- h0.js:42001-44000
## h0.js [chunk 23/73, lines 44001-46000]

### Summary
Bundled third-party libraries: accounting.js, base64 encoding/decoding, Bluebird Promise polyfill. No direct Chrome APIs, messaging, storage, endpoints, or dynamic code in this chunk. Infrastructure code only.

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
- Minified variable names detected
- Webpack module pattern
- Function chain patterns

### Risks
- None in this chunk

### Evidence
- h0.js:44001-46000
## h0.js [chunk 24/73, lines 46001-48000]

### Summary
Bundled third-party libraries: Bluebird Promise polyfill, browser Buffer implementation. No direct Chrome APIs, messaging, storage, endpoints, or dynamic code in this chunk. Infrastructure code only.

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
- Minified variable names detected
- Webpack module pattern
- Function chain patterns

### Risks
- None in this chunk

### Evidence
- h0.js:46001-48000
## h0.js [chunk 25/73, lines 48001-50000]

### Summary
Bundled cryptography and encoding libraries: Buffer methods, base64/hex encoding, AES, MD5, SHA1, SHA256, SHA3, RIPEMD160, Rabbit, RC4, and padding algorithms. No direct Chrome APIs, messaging, storage, endpoints, or dynamic code in this chunk. Infrastructure code only.

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
- Minified variable names detected
- Webpack module pattern
- Function chain patterns

### Risks
- None in this chunk

### Evidence
- h0.js:48001-50000
## h0.js [chunk 26/73, lines 50001-51999]

### Summary
This chunk contains additional bundled third-party libraries and infrastructure code, including cryptography algorithms (DES, TripleDES, SHA512), CSS selector parsing, date/time manipulation (dayjs, duration, relative time, localization), debugging/logging infrastructure, property definition helpers, and SVG element/attribute mapping. No direct Chrome API calls, event listeners, messaging, storage, endpoints, or DOM sinks are present. Obfuscation hints include minified variable names, function chains, and bundled modules.

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
- Minified variable names
- Function chains
- Bundled third-party modules

### Risks
- None in this chunk

### Evidence
- h0.js:50001-51999
## h0.js [chunk 27/73, lines 52000-53999]

### Summary
This chunk contains infrastructure and utility code for HTML/XML DOM parsing, rendering, and manipulation, including virtual DOM element types, node manipulation, attribute handling, feed parsing (RSS/Atom), document position/sorting helpers, and HTML entity encoding/decoding. No direct Chrome API calls, event listeners, messaging, storage, endpoints, or DOM sinks are present. Obfuscation hints include minified variable names, function chains, and bundled modules.

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
- Minified variable names
- Function chains
- Bundled third-party modules

### Risks
- None in this chunk

### Evidence
- h0.js:52000-53999
## h0.js [chunk 28/73, lines 54000-55999]

### Summary
Entity encoding/decoding, HTML encoding/decoding, event emitter infrastructure, object/array utilities, intrinsic property resolution, function binding polyfills. No Chrome APIs, event listeners, messaging, storage, endpoints, DOM sinks, dynamic code, or behavioral signals in this chunk.

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
- Minified variable names detected
- Webpack module pattern
- Function chain utilities

### Risks
- None in this chunk

### Evidence
- h0.js:54000-55999
## h0.js [chunk 29/73, lines 56000-57999]

### Summary
HTML parser/tokenizer infrastructure, DOM handler, feed parsing, DOM utilities, jQuery v3.7.1 library (minified). No Chrome APIs, event listeners, messaging, storage, endpoints, DOM sinks, dynamic code, or behavioral signals in this chunk.

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
- Minified variable names detected
- Webpack module pattern
- Function chain utilities
- Third-party library: jQuery v3.7.1

### Risks
- None in this chunk

### Evidence
- h0.js:56000-57999
## h0.js [chunk 30/73, lines 58000-59999]

### Summary
Continued jQuery v3.7.1 library: DOM manipulation, event handling, AJAX infrastructure, utility functions. No Chrome APIs or behavioral signals in this chunk.

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
- None

### Dynamic Code/Obfuscation
- Minified variable names detected
- Function chains
- Webpack module pattern
- Third-party library bundling

### Risks
- None in this chunk

### Evidence
- h0.js:58000-59999
## h0.js [chunk 31/73, lines 60000-61999]

### Summary
Continued third-party libraries: JSON.parse/stringify polyfills, Lodash core utilities. No Chrome APIs or behavioral signals in this chunk.

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
- None

### Dynamic Code/Obfuscation
- Minified variable names detected
- Function chains
- Webpack module pattern
- Third-party library bundling

### Risks
- None in this chunk

### Evidence
- h0.js:60000-61999
## h0.js [chunk 32/73, lines 62000-63999]

### Summary
Continued Lodash library: wrapper objects, hash/map/set polyfills, collection manipulation, type checking, functional helpers. No Chrome APIs or behavioral signals in this chunk.

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
- None

### Dynamic Code/Obfuscation
- Minified variable names detected
- Function chains
- Webpack module pattern
- Third-party library bundling

### Risks
- None in this chunk

### Evidence
- h0.js:62000-63999
## h0.js [chunk 33/73, lines 64000-65999]

### Summary
Continued Lodash library, Long.js, string manipulation, and cache/data structure helpers. No Chrome APIs or behavioral signals in this chunk.

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
- None

### Dynamic Code/Obfuscation
- Minified variable names detected
- Function chains
- Webpack module pattern
- Third-party library bundling

### Risks
- None in this chunk

### Evidence
- h0.js:64000-65999
## h0.js [chunk 34/34, lines 66000-67999]

### Summary
This chunk contains additional bundled third-party libraries and infrastructure code. It includes utility functions for object inspection, string manipulation, array operations, polyfills for Object.keys, a full circuit breaker implementation (class S), domain parsing and validation logic (trie-based, public suffix list), and CSS parsing/AST node classes. No direct Chrome API calls, event listeners, messaging, storage, network endpoints, or dynamic code execution detected. Obfuscation hints include minified variable names and bundled third-party modules.

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
- Minified variable names
- Bundled third-party modules
- Polyfills

### Risks
- None detected in this chunk

### Evidence
- h0.js:66000-67999
## h0.js [chunk 35/73, lines 68000-69999]

### Summary
This chunk contains code for CSS AST manipulation, parsing, stringification, and regular expression utilities. It includes PostCSS node classes, tokenizer logic, and regex minimization. No direct Chrome extension logic, Chrome API usage, messaging, storage, or network endpoints are present.

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
- Bundled third-party libraries (PostCSS, regex minimizer)
- Minified variable names

### Risks
- None in this chunk

### Evidence
- h0.js:68000-69999
## h0.js [chunk 36/73, lines 70000-71999]

### Summary
This chunk contains bundled third-party code for regular expression parsing, minimization, and optimization. It includes NFA/DFA logic, regex AST transforms, and character class utilities. No direct Chrome extension logic, Chrome API usage, messaging, storage, endpoints, or DOM manipulation is present.

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
- Bundled third-party libraries (regex parser/minimizer)
- Minified variable names

### Risks
- None in this chunk

### Evidence
- h0.js:70000-71999
## h0.js [chunk 37/73, lines 72000-73999]

### Summary
This chunk continues with bundled third-party code for regular expression parsing, tokenization, and AST construction. It includes logic for regex token matching, character class handling, quantifier validation, and Unicode property parsing. No direct Chrome extension logic, Chrome API usage, messaging, storage, endpoints, or DOM manipulation is present.

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
- Bundled third-party libraries (regex parser/tokenizer)
- Minified variable names

### Risks
- None in this chunk

### Evidence
- h0.js:72000-73999
## h0.js [chunk 38/73, lines 74000-75999]

### Summary
This chunk continues with bundled third-party libraries, focusing on semantic versioning (semver) parsing, comparison, and manipulation. It includes logic for version string parsing, comparator and range handling, and LRU cache implementation. No direct Chrome extension logic, Chrome API usage, messaging, storage, endpoints, or DOM manipulation is present.

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
- Bundled third-party libraries (semver, LRU cache)
- Minified variable names

### Risks
- None in this chunk

### Evidence
- h0.js:74000-75999
## h0.js [chunk 39/73, lines 76000-77999]

### Summary
This chunk continues with bundled third-party libraries and utility code. It includes semantic versioning (semver) logic for parsing, comparing, and manipulating version strings, LRU cache implementation, string manipulation, encoding/decoding, URL parsing, query string parsing/stringifying, and UUID generation. No direct Chrome extension logic, Chrome API usage, messaging, storage, endpoints, or DOM manipulation is present.

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
- Bundled third-party libraries (semver, LRU cache, querystring, uuid)
- Minified variable names

### Risks
- None in this chunk

### Evidence
- h0.js:76000-77999
## h0.js [chunk 40/73, lines 78000-79999]

### Summary
This chunk contains core extension background logic for affiliate/adblock management and messaging. It registers Chrome event listeners (`chrome.runtime.onConnect`, `chrome.runtime.onMessage`), handles custom port-based messaging for "adbbp:cs" and related channels, and manages cache/storage for adblock and affiliate state. API calls to `https://d.joinhoney.com/v2/stores/modules/list` and `https://d.joinhoney.com/v2/stores/module/{type}/{storeId}` are present. Domains for affiliate/adblock logic are referenced. Event listeners and error handlers for all URLs are registered. Minified variable names and webpack module patterns are present. Potential tracking/adblock circumvention logic detected.

### Chrome APIs
- chrome.runtime.onConnect.addListener
- chrome.runtime.onMessage.addListener

### Event Listeners
- chrome.runtime.onConnect.addListener
- chrome.runtime.onMessage.addListener
- Error listeners for all URLs

### Messaging
- Channels: "adbbp:cs", "adbBp:action", "acorns:action"
- Message types: getStoreAcorn, whitelistDetected, getState
- Payload keys: storeId, type, tabId, url, action, data, content
- Directions: content->background, background->content

### Storage
- Keys: adbBp:activeContexts, adbBp:messageListeners, adbBp:newContextListeners, resourceLastBlockedAt, whitelistCheckedAt, isTaggingBlocked, lastFiredAdblockCheck
- Operations: get, set

### Endpoints
- https://d.joinhoney.com/v2/stores/modules/list
- https://d.joinhoney.com/v2/stores/module/\{type\}/\{storeId\}

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Minified variable names
- Webpack module patterns

### Risks
- Tracking/adblock circumvention logic (medium severity)

### Evidence
- h0.js:78000-79999
## h0.js [chunk 41/73, lines 80000-81999]

### Summary
Contains Chrome alarms API wrappers, custom event listeners for utils and page load, and affiliate tagging logic. Fetches store config from Honey CDN. No new storage keys or direct DOM sinks. Regenerator runtime and minified variable names present.

### Chrome APIs
- chrome.alarms.onAlarm.addListener (line ~80050)
- chrome.alarms.clear (line ~80060)
- chrome.alarms.create (line ~80070)
- chrome.alarms.get (line ~80080)

### Event Listeners
- utils:action (custom, line ~80090)
- page:load (custom, line ~80150)
- affManager:tag (custom, line ~80030)

### Messaging
- Channel: "affManager:tag", direction: unknown, keys: [storeId, tabId, type, targetUrl, options]
- Channel: "utils:action", direction: unknown, keys: [action, data]

### Storage
- No new storage keys in this chunk

### Endpoints
- GET https://cdn-checkout.joinhoney.com/honey-checkout/stores.json (line ~81950)

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Regenerator runtime
- Minified variable names

### Risks
- None detected in this chunk

### Evidence
- h0.js:80000-81999
## h0.js [chunk 42/73, lines 82000-83999]

### Summary
Implements Honey Checkout config and PayPal session logic. Uses chrome.cookies API for set/get, local/sync storage for checkout config, and fetches version/branch info from Honey CDN. Handles internal checkout messaging and PayPal endpoints. No direct DOM sinks. Regenerator runtime and minified variable names present.

### Chrome APIs
- chrome.cookies.set (line ~83950)
- chrome.cookies.get (line ~83970)

### Event Listeners
- None new in this chunk (custom checkout/PayPal logic)

### Messaging
- Internal checkout actions: gqlQuery, gqlMutation, authFetch, fetch, getSettings, getSetting, setSetting, localStorageGetItem, localStorageSetItem, localStorageDeleteItem, reloadBg, getStoreConfig, getActiveDevBranches, getVersionConfig, getLatestCheckoutAppVersion, getAllFrameRequests, clearFrameRequestsForTab, executeHoneySPBContentScript, executeMerchantSPBContentScript, pl2goCreateCreditSession, pl2goGetCreditPresentment

### Storage
- checkoutDevToolsEnabled, local, Honey Checkout dev tools flag
- devToolsState, local, Honey Checkout dev tools state
- checkoutIFrameOriginUrl, local, Honey Checkout iframe origin URL
- checkoutIFrameOriginBranch, local, Honey Checkout iframe branch
- checkoutIFrameOriginVersion, local, Honey Checkout iframe version
- checkoutStoreConfigOverwrites, local, Honey Checkout store config overwrites
- useLatestCheckoutAppVersion, local, Use latest Honey Checkout app version
- staticPaypalButtonSelectorOverride, local, PayPal button selector override

### Endpoints
- GET https://cdn-checkout.joinhoney.com/honey-checkout/version_config.json (line ~82200)
- GET https://cdn-checkout-staging.joinhoney.com/honey-checkout/branches/branches.json (line ~82300)
- https://www.paypal.com/smart/button\?\* (line ~83900)
- https://www.paypal.com/smart/buttons\?\* (line ~83900)

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Regenerator runtime
- Minified variable names

### Risks
- None detected in this chunk

### Evidence
- h0.js:82000-83999
## h0.js [chunk 43/73, lines 84000-85999]

### Summary
Implements cookie management via chrome.runtime.onMessage for "cookies:cs" service, device heartbeat and device action listeners, and install/update reporting. Uses chrome.cookies.remove/getAll, chrome.tabs.get, and local/sync storage for device state. Installs uninstall URL and handles onboarding flows. No direct DOM sinks. Regenerator runtime and minified variable names present.

### Chrome APIs
- chrome.cookies.remove (line ~84010)
- chrome.cookies.getAll (line ~84030)
- chrome.runtime.onMessage.addListener (line ~84050)
- chrome.tabs.get (line ~84060)

### Event Listeners
- chrome.runtime.onMessage.addListener ("cookies:cs")
- device:heart (custom, heartbeat)
- device:action (custom, device actions)

### Messaging
- Channel: "cookies:cs", direction: background, keys: [service, type, url, name, domain, storeId]
- Channel: "device:heart", direction: background, keys: [action, data]
- Channel: "device:action", direction: background, keys: [action, data]

### Storage
- device:lastHeartbeat, local, Last heartbeat timestamp
- device:firstTime, local, First install flag
- device:firstTimeFS, local, First install FS flag
- device:firstTimeHG, local, First install HG flag
- device:firstTimeFSHG, local, First install FSHG flag
- device:firstTimeLaunchpad, local, First install Launchpad flag
- device:pendingInstallReport, local, Pending install report
- device:pendingUpdateReport, local, Pending update report
- device:repeatInstall, local, Repeat install flag
- device:primaryDeviceId, sync, Primary device ID
- device:deviceId, local, Device ID
- user:device-id, local, User device ID

### Endpoints
- POST https://d.joinhoney.com/extusers/install (install report)
- https://www.joinhoney.com/uninstall (uninstall URL)
- https://www.joinhoney.com/welcome (install/update welcome)
- https://www.joinhoney.com/explore\?onUpdate\=true (update explore)

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Regenerator runtime
- Minified variable names

### Risks
- None detected in this chunk

### Evidence
- h0.js:84000-85999
## h0.js [chunk 44/73, lines 86000-87999]

### Summary
Implements device settings management using local storage (get, set, update) with Promise-based async logic and regenerator runtime. No new Chrome API calls, event listeners, message channels, endpoints, or DOM sinks detected. Minified variable names present.

### Chrome APIs
- None detected in this chunk

### Event Listeners
- None detected in this chunk

### Messaging
- None detected in this chunk

### Storage
- device:settings, local, Device settings object

### Endpoints
- None detected in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Regenerator runtime
- Minified variable names

### Risks
- None detected in this chunk

### Evidence
- h0.js:86000-87999
## h0.js [chunk 45/73, lines 88000-89999]

### Summary
Handles Amazon cart saved-for-later item extraction using virtual DOM parsing and POST requests to https://www.amazon.com/cart/ref\=ox_sc_inf_saved-for-later. References several GraphQL endpoints by name, but no direct Chrome API calls, event listeners, or new storage keys. Regenerator runtime and minified variable names present. No new privacy/security risks detected.

### Chrome APIs
- None detected in this chunk

### Event Listeners
- None detected in this chunk

### Messaging
- None detected in this chunk

### Storage
- None detected in this chunk

### Endpoints
- POST https://www.amazon.com/cart/ref\=ox_sc_inf_saved-for-later (Amazon cart saved-for-later)

### DOM/Sinks
- Virtual DOM parsing for Amazon cart items

### Dynamic Code/Obfuscation
- Regenerator runtime
- Minified variable names

### Risks
- None detected in this chunk

### Evidence
- h0.js:88000-89999
## h0.js [chunk 46/73, lines 90000-91999]

### Summary
References multiple GraphQL endpoint names for droplist and product queries, but no direct Chrome API calls, event listeners, storage keys, or DOM sinks. Regenerator runtime and minified variable names present. No new privacy/security risks detected.

### Chrome APIs
- None detected in this chunk

### Event Listeners
- None detected in this chunk

### Messaging
- None detected in this chunk

### Storage
- None detected in this chunk

### Endpoints
- GraphQL endpoint names referenced: ext_getDroplistByUserId, ext_getDroplistAndDroplistCollectionsByUserId, getProductByIds, ext_getProductByIdSecondaryDetails

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Regenerator runtime
- Minified variable names

### Risks
- None detected in this chunk

### Evidence
- h0.js:90000-91999
## h0.js [chunk 47/73, lines 92000-93999]

### Summary
GraphQL endpoint references for droplist and product operations. Registers event listener for 'droplist:product:v3' with a large switch statement. No new Chrome APIs or storage operations.

### Chrome APIs
- None in this chunk

### Event Listeners
- droplist:product:v3 (switch statement for droplist actions)

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- GraphQL:endpoint:ext_getProductPriceHistory
- GraphQL:endpoint:ext_getProductByIdsWithOffer
- GraphQL:endpoint:ext_getProductByIdSecondaryDetails
- GraphQL:endpoint:ext_addNonCatalogItemToDroplist
- GraphQL:endpoint:ext_getDroplistByCanonicalUrl

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- regenerator-runtime polyfill
- Minified variable names detected

### Risks
- None in this chunk

### Evidence
- h0.js:92000-93999
## h0.js [chunk 48/73, lines 94000-95999]

### Summary
GraphQL endpoint references for droplist and product update/remove operations. Event reporting logic present. No new Chrome APIs or storage operations.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- GraphQL:endpoint:ext_updateNonCatalogItem
- GraphQL:endpoint:ext_removeDroplist
- GraphQL:endpoint:ext_removeProductFromCollections
- GraphQL:endpoint:ext_removeSmartDroplist
- GraphQL:endpoint:ext_updateDroplist

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- regenerator-runtime polyfill
- Minified variable names detected

### Risks
- None in this chunk

### Evidence
- h0.js:94000-95999
## h0.js [chunk 49/73, lines 96000-97999]

### Summary
Feature flag infrastructure and event listeners for feature actions and gold redemption. No new Chrome APIs or storage operations.

### Chrome APIs
- None in this chunk

### Event Listeners
- features:action (feature flag queries/overrides)
- gxp:actions (Gold/Points system actions)

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- GraphQL:endpoint:ext_instantPSBRedemption
- https://d.joinhoney.com/features/owner/extension-engineers

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- regenerator-runtime polyfill
- Minified variable names detected

### Risks
- None in this chunk

### Evidence
- h0.js:96000-97999
## h0.js [chunk 50/73, lines 98000-99999]

### Summary
Implements Honey Pay Now and Wallet eligibility logic, including async generator infrastructure and event listener registration. No direct Chrome API calls, storage, or endpoints detected. Obfuscation patterns present.

### Chrome APIs
- None in this chunk

### Event Listeners
- honey-pay-now:action:eligibility
- honey-pay-now:action:gql-query

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Minified variable names detected
- Function chains
- Webpack module pattern

### Risks
- None in this chunk

### Evidence
- h0.js:98000-99999
## h0.js [chunk 51/73, lines 100000-101999]

### Summary
Registers listeners for Honey Pay Now local storage and UI actions, badge experiments, container shown, and coupon suppression. Uses extension local storage for reminders, badge/teaser tracking, and coupon suppression. No direct Chrome API calls or endpoints detected.

### Chrome APIs
- None in this chunk

### Event Listeners
- honey-pay-now:action:local-storage
- honey-pay-now:action:ui
- honey-tip:badge-experiments
- honeyTips:containerShown

### Messaging
- honey-pay-now:action:ui (background->ui), keys: [SET_PAY_NOW_CARD_VISIBILITY, SET_PAY_NOW_MODAL_VISIBILITY, SHIFT_PAY_NOW_MODAL, OPEN_PAY_NOW_AUTOPOP, REMOVE_PAY_NOW_IFRAME, GOOGLE_PLACES_API_GET_ADDRESS_SUGGESTIONS, SET_REMINDER, GET_REMINDER]
- honey-pay-now:action:local-storage (background->content), keys: [GET_LOCAL_STORAGE_ITEM, SET_LOCAL_STORAGE_ITEM, REMOVE_LOCAL_STORAGE_ITEM]

### Storage
- giftcardsReminderMap (local): Store reminder state for gift cards
- badgeExperiments (local): Track badge/teaser seen state
- containerShown (local): Track container shown state
- couponSuppression (local): Track coupon autopop suppression

### Endpoints
- None in this chunk

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Minified variable names detected
- Function chains
- Webpack module pattern

### Risks
- None in this chunk

### Evidence
- h0.js:100000-101999
## h0.js [chunk 52/73, lines 102000-103999]

### Summary
Implements product inventory, canonicalization, and comparison shopping logic for Honey Tips features. Multiple internal GraphQL endpoints referenced. No direct Chrome API calls, event listeners, or storage operations detected.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- None in this chunk

### Endpoints
- tips_ext_getInventoryByStoreIdParentId (GraphQL): Get inventory by store and parent ID
- tips_getProductsCanonicalByClusterId (GraphQL): Get canonical products by cluster ID
- tips_getProductsForComparisonShopping (GraphQL): Get products for comparison shopping
- tips_getProductByIds (GraphQL): Get product details by IDs
- ext_getProductByIdSecondaryDetails (GraphQL): Get secondary product details by ID
- tips_getProductsByIds (GraphQL): Get multiple products by IDs

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Minified variable names detected
- Function chains
- Webpack module pattern

### Risks
- None in this chunk

### Evidence
- h0.js:102000-103999
## h0.js [chunk 53/73, lines 104000-105999]

### Summary
Honey Tips infrastructure: GraphQL query logic, async iterator helpers, custom event listener for 'honeyTips:tips', storage for launchpad and PDP autopop counts. No direct Chrome API calls or DOM manipulation.

### Chrome APIs
- None in this chunk

### Event Listeners
- honeyTips:tips (custom event channel)
- addListener (custom)

### Messaging
- Channel: "honeyTips:tips", direction: other, actions: TIPS_GET_CONFIG, TIPS_GET_TIPS, GET_STORE_DEALS, GET_STORE_SALES, TIPS_GET_STORES_BY_IDS, GET_PRODUCT, GET_PRODUCTS, GET_TIPS_SHOWN_BY_STORE_AND_CATEGORIES, GET_HAS_TIP_SHOWN_BY_STORE_AND_CATEGORY, INCREMENT_TIP_SHOWN, GET_LAUNCHPAD_TIP_SHOWN_BY_STORE, INCREMENT_TEASER_SHOWN_PER_PRODUCT_AND_TIP, GET_TEASER_SHOWN_PER_PRODUCT_AND_TIP, INCREMENT_TEASER_SHOWN_PER_STORE_AND_TIP, GET_TEASER_SHOWN_PER_STORE_AND_TIP, GET_TEASER_SHOWN_PER_STORE, INCREMENT_TEASER_SHOWN_PER_STORE, INCREMENT_LAUNCHPAD_TIP_SHOWN_BY_STORE, TIPS_GET_PDP_COUPON_AUTOPOP, TIPS_SET_PDP_COUPON_AUTOPOP, TIPS_GET_CONTAINER_SHOWN_FOR_PARENT_ID, TIPS_UPDATE_CONTAINER_SHOWN_FOR_PARENT_ID, TIPS_GET_WEB_PRICE_COMPARISON_VIEWED, TIPS_GET_WEB_PRICE_COMPARISON_VIEWED_BY_CLUSTER_IDS, TIPS_SET_WEB_PRICE_COMPARISON_VIEWED, TIPS_INCREMENT_PDP_AUTOPOP_COUNT, TIPS_GET_ALL_PDP_AUTOPOP_COUNTS, TIPS_GET_CANONICAL_PRODUCTS, TIPS_GET_BEST_MATCH_INVENTORY_PRODUCT

### Storage
- Key: launchpadShown, type: local, purpose: Track launchpad shown count, retention: indefinite
- Key: pdpAutopopCounts, type: local, purpose: Track PDP autopop counts, retention: indefinite

### Endpoints
- tips_getSortedDealsPublic (GraphQL Honey Tips deals)
- tips_getStoreSaleCategoriesByStoreId (GraphQL Honey Tips sale categories)
- TIPS_GET_STORES_BY_IDS (GraphQL Honey Tips stores by IDs)

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Minified variable names detected

### Risks
- None in this chunk

### Evidence
- h0.js:104000-105999
## h0.js [chunk 54/73, lines 106000-107999]

### Summary
Honey Tips infrastructure: teaser count tracking, configuration management, modular storage logic. No direct Chrome API calls, event listeners, or DOM manipulation.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- Key: honeyTips:teaserCountsPerTipAndProduct, type: local, purpose: Track teaser counts per tip/product, retention: indefinite
- Key: honeyTips:teaserCountsPerTipAndStore, type: local, purpose: Track teaser counts per tip/store, retention: indefinite
- Key: honeyTips:teasersCountPerStore, type: local, purpose: Track teaser counts per store, retention: indefinite
- Key: tips_getConfiguration, type: local, purpose: Honey Tips configuration, retention: indefinite
- Key: honeyTipsConfiguration_v4, type: local, purpose: Honey Tips configuration v4, retention: indefinite
- Key: TIPS_CONFIGURATION_CACHE, type: local, purpose: Tips configuration cache, retention: indefinite
- Key: honeyTips:tipsConfig:, type: local, purpose: Tips config per store, retention: indefinite

### Endpoints
- tips_getTipHits (GraphQL Honey Tips hits)

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Minified variable names detected

### Risks
- None in this chunk

### Evidence
- h0.js:106000-107999
## h0.js [chunk 55/73, lines 108000-109999]

### Summary
Honey Tips infrastructure: configuration retrieval, tip shown tracking, product formatting utilities. No direct Chrome API calls, event listeners, or DOM manipulation.

### Chrome APIs
- None in this chunk

### Event Listeners
- None in this chunk

### Messaging
- None in this chunk

### Storage
- Key: TIPS_CONFIGURATION_CACHE, type: local, purpose: Tips configuration cache, retention: indefinite
- Key: honeyTips:tipsShown, type: local, purpose: Track tips shown per store/category/tip, retention: indefinite

### Endpoints
- tips_getConfiguration (GraphQL Honey Tips configuration)

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Minified variable names detected

### Risks
- None in this chunk

### Evidence
- h0.js:108000-109999
## h0.js [chunk 56/73, lines 110000-111999]

### Summary
No direct Chrome API calls, event listeners, messaging, storage, endpoints, or DOM manipulation. Chunk contains generic utility logic and minified variable patterns.

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
- Minified variable names detected

### Risks
- None in this chunk

### Evidence
- h0.js:110000-111999
## h0.js [chunk 57/73, lines 112000-113999]

### Summary
Honey Offers infrastructure: product offer activation, GraphQL endpoints, custom extension listeners, local storage for offer/product data. No direct Chrome API calls or DOM manipulation.

### Chrome APIs
- None in this chunk

### Event Listeners
- offers:action
- optimuslru:access
- optimus:fetch:product

### Messaging
- None in this chunk

### Storage
- Key: offers:<userId>:<storeId>:activated, type: local, purpose: Track offer activations per user/store, retention: expires
- Key: offers:<userId>:<offerId>:details, type: local, purpose: Store offer details per user/offer, retention: expires
- Key: offers:product:<userId>:<storeId>:<parentId>:activated, type: local, purpose: Track product offer activations, retention: expires
- Key: offers:product:<userId>:<storeId>:<parentId>:details, type: local, purpose: Store product offer details, retention: expires
- Key: optimuslru:<key>, type: local, purpose: LRU cache for product data, retention: configurable

### Endpoints
- ext_triggerEmailMseLink (GraphQL: trigger email MSE link)
- ext_getProductOffer (GraphQL: get product offer)
- offers_activateProductOffer (GraphQL: activate product offer)
- offers_getProductOfferActivations (GraphQL: get product offer activations)
- ext_getStoreProductOffers (GraphQL: get store product offers)
- ext_optimus_getProductByIds (GraphQL: get product by IDs)
- ext_optimus_getProductByStoreIdVariantIds (GraphQL: get product by store/variant IDs)

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Minified variable names detected

### Risks
- None in this chunk

### Evidence
- h0.js:112000-113999
## h0.js [chunk 58/73, lines 114000-115999]

### Summary
Extension event listeners for PayPal, permissions, popover, product coupons, and product fetcher actions. GraphQL and remote endpoints for personalization, product enrichment, and coupon stats. No direct Chrome API calls or DOM manipulation.

### Chrome APIs
- None in this chunk

### Event Listeners
- paypal:action
- bg:permissions
- popover:bg
- product:coupons
- product_fetcher:action

### Messaging
- None in this chunk

### Storage
- Key: visitedProducts:<storeId>, type: local, purpose: Visited products cache per store, retention: indefinite
- Key: visitedProducts:<storeId>:<parentId>, type: local, purpose: Visited product details per store/parentId, retention: indefinite
- Key: honeyCornerIllustration, type: local, purpose: Track illustration shown for store, retention: indefinite

### Endpoints
- ext_getPayPalMessaging (GraphQL: PayPal personalization messaging)
- ext_getUserTransactions (GraphQL: get user transactions)
- ext_getCouponStatsByProduct (GraphQL: get coupon stats by product)
- ext_getProductByIds (GraphQL: get product by IDs)
- https://s.joinhoney.com/pe (Honey product enrichment endpoint)
- https://history.paypal.com/credit-presentment/honey (PayPal personalization endpoint)

### DOM/Sinks
- None in this chunk

### Dynamic Code/Obfuscation
- Minified variable names detected

### Risks
- None in this chunk

### Evidence
- h0.js:114000-115999
## h0.js [chunk 59/73, lines 116000-117999]

### Summary
Rokt Offers infrastructure: caching, eligibility, event reporting, GraphQL mutations, Chrome extension event listeners. Chrome API usage: onConnect listeners. Custom cache for find-savings. Minified/webpack patterns present.

### Chrome APIs
- chrome.runtime.onConnect.addListener (line ~116800)
- chrome.runtime.onConnect.removeListener (line ~116820)

### Event Listeners
- chrome.runtime.onConnect.addListener (line ~116800)
- rokt-offers:action (custom extension event, line ~116900)
- chrome.runtime.onConnect.removeListener (line ~116820)

### Messaging
- Channel: "rokt-offers:action", direction: content->background, keys: ["action", "data"]

### Storage
- Key: find-savings:<key>, type: local, op: get/set/del (line ~117900)

### Endpoints
- POST GraphQL: ext_sendRoktEvents (line ~117200)
- POST GraphQL: ext_getRoktOffers (line ~117100)

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Webpack module pattern

### Risks
- Tracking: Rokt Offers event reporting includes user/store identifiers
- Excessive permissions: Rokt Offers logic may be enabled for all users

### Evidence
- h0.js:116000-117999
## h0.js [chunk 60/73, lines 118000-119999]

### Summary
Extension event listeners for cache and stats, Sentry instrumentation, site support/coupon logic, storage wrappers, Atlas endpoint, Double Gold feature. PII and tracking risks present.

### Chrome APIs
- None directly in this chunk

### Event Listeners
- fs-cache:access (custom extension event)
- stats:action (custom extension event)
- site_support:startWatching (custom extension event)
- site_support:stopWatching (custom extension event)
- site_support:watchUGCRequest (custom extension event)
- site_support:checkUGCCoupon (custom extension event)

### Messaging
- Channel: "fs-cache:access", direction: content->background, keys: ["key", "val", "options", "action"]
- Channel: "stats:action", direction: content->background, keys: ["action", "data"]
- Channel: "site_support:startWatching", direction: content->background, keys: ["tabId", "store", "hasDac", "coupons"]
- Channel: "site_support:stopWatching", direction: content->background, keys: ["tabId", "cancelled"]
- Channel: "site_support:watchUGCRequest", direction: content->background, keys: ["tabId", "store", "hasDac"]
- Channel: "site_support:checkUGCCoupon", direction: content->background, keys: ["store", "code"]

### Storage
- Key: storage:lastWiped, type: local, op: get/set
- Key: user:id, type: local, op: get/set
- Key: user:device-id, type: local, op: get/set
- Key: amazon-optimus, type: local, op: get/set
- Key: install:synced, type: local, op: get/set
- Key: reviewed, type: local, op: get/set
- Key: stores:session, type: local, op: get/set

### Endpoints
- GET https://d.joinhoney.com/atlas\?q\=\<base64\> (line ~119200)
- POST GraphQL: ext_getAllActiveStoresBoostedCashbackOffers (line ~119800)

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Webpack module pattern

### Risks
- Tracking: Sentry and stats event reporting may include user/store identifiers
- PII exfiltration: Storage keys include user IDs and device IDs
- Tracking: Atlas endpoint receives encoded payloads

### Evidence
- h0.js:118000-119999
## h0.js [chunk 61/73, lines 120000-121999]

### Summary
Cart product HPID lookup, store/session management, product catalog allowlist, top stores, UGC mutation, Gold activation/deactivation, extension event listeners. PII and tracking risks present.

### Chrome APIs
- None directly in this chunk

### Event Listeners
- page:load (custom extension event)
- ui:interaction (custom extension event)
- stores:affiliate:tagged (custom extension event)
- stores:action (custom extension event)
- stores:session:started (custom extension event)
- stores:session:activated (custom extension event)

### Messaging
- Channel: "stores:action", direction: content->background, keys: ["action", "data"]
- Channel: "stores:session:started", direction: content->background, keys: ["storeId", "sessionId"]
- Channel: "stores:session:activated", direction: content->background, keys: ["storeId", "sessionId"]
- Channel: "page:load", direction: content->background, keys: ["url", "tabId"]
- Channel: "ui:interaction", direction: content->background, keys: ["store"]
- Channel: "stores:affiliate:tagged", direction: content->background, keys: ["storeId"]

### Storage
- Key: productCatalogAllowlist, type: local, op: get/set
- Key: topStoresByDomain, type: local, op: get/set
- Key: sessionAttributes:<storeId>, type: local, op: get/set

### Endpoints
- GET https://d.joinhoney.com/cmap\?q\=\<base64\> (line ~120100)
- POST GraphQL: ext_getStoreWhitelist (line ~120300)
- POST GraphQL: ext_getTopStores (line ~120500)
- POST GraphQL: ext_insertStoreUGC (line ~121200)
- POST GraphQL: ext_incrementUGCSuccess (line ~121300)
- POST GraphQL: external_v2_incrementUGCFailure (line ~121400)

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Webpack module pattern

### Risks
- Tracking: Store/session events and UGC mutations include user/store identifiers
- PII exfiltration: Session attributes and coupon submission may include user IDs
- Tracking: Cart product HPID lookup sends encoded payloads

### Evidence
- h0.js:120000-121999
## h0.js [chunk 62/73, lines 122000-123999]

### Summary
Gold activation logic, coupon code experiments, AB testing, coupon stats retrieval, store session management, event listeners, segmentation and NNA logic. PII and tracking risks present.

### Chrome APIs
- None directly in this chunk

### Event Listeners
- si:on (custom extension event)
- rewardsManager:action (custom extension event)
- standDown:store:status (custom extension event)
- page:load (custom extension event)
- standDown:store:ssd (custom extension event)

### Messaging
- Channel: "experiments:action", direction: content->background, keys: ["action", "data"]
- Channel: "stores:session:started", direction: content->background, keys: ["storeId", "sessionId"]
- Channel: "stores:session:activated", direction: content->background, keys: ["storeId", "sessionId"]
- Channel: "rewardsManager:action", direction: content->background, keys: ["action", "data"]
- Channel: "standDown:store:status", direction: content->background, keys: ["status", "store", "type"]
- Channel: "page:load", direction: content->background, keys: ["url", "tabId"]
- Channel: "standDown:store:ssd", direction: content->background, keys: ["state", "store"]

### Storage
- Key: storeDoubleGold:<userId>:<storeId>, type: local, op: get/set
- Key: storeNNA:<userId>:<storeId>, type: local, op: get/set
- Key: store-rewards:<storeId>:<userId>, type: local, op: get/set
- Key: sessionAttributes:<storeId>, type: local, op: get/set
- Key: couponStats, type: local, op: get/set
- Key: segmentationLists, type: local, op: get/set

### Endpoints
- POST GraphQL: ext_getFixedRateActivationByStoreAndUserId
- POST GraphQL: ext_getStoreWhitelist
- POST GraphQL: ext_getTopStores
- POST GraphQL: ext_insertStoreUGC
- POST GraphQL: ext_incrementUGCSuccess
- POST GraphQL: external_v2_incrementUGCFailure
- POST GraphQL: tips_ext_getStoreInsightsByIds
- POST GraphQL: ext_getAvgGoldEarnedByStoreId
- POST GraphQL: ext_storeSales
- POST GraphQL: ext_isValueInSegmentationListV2
- POST GraphQL: ext_getNnaStoreByStoreId
- POST GraphQL: ext_getNnaUserByUserId

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Webpack module pattern

### Risks
- Tracking: Store/session/coupon events and segmentation logic include user/store identifiers
- PII exfiltration: Segmentation and NNA logic may include user IDs
- Tracking: Segmentation and stats queries send encoded payloads

### Evidence
- h0.js:122000-123999
## h0.js [chunk 63/73, lines 124000-125999]

### Summary
Coupon stats retrieval, trending stores logic, supported domains and store ID matching, tab/store detection, event listeners, CDN and GraphQL endpoints. PII and tracking risks present.

### Chrome APIs
- None directly in this chunk

### Event Listeners
- tabs:action (custom extension event)
- tabs:activated (custom extension event)
- page:load (custom extension event)
- page:detect_store (custom extension event)
- page:detect_google (custom extension event)

### Messaging
- Channel: "tabs:action", direction: content->background, keys: ["action", "data"]
- Channel: "tabs:activated", direction: content->background, keys: ["tabId"]
- Channel: "page:load", direction: content->background, keys: ["url", "tabId"]
- Channel: "page:detect_store", direction: content->background, keys: ["url", "tabId"]
- Channel: "page:detect_google", direction: content->background, keys: ["action", "tabId"]

### Storage
- Key: trendingStores, type: local, op: get/set
- Key: supportedDomainsInMemoryList, type: local, op: get/set
- Key: sentShopifyMessage:<hostname>, type: local, op: get/set
- Key: currentActiveTabId, type: local, op: get/set
- Key: stoodup:<storeId>:<tabId>, type: local, op: get/set

### Endpoints
- POST GraphQL: ext_getCouponStatsByProduct
- POST GraphQL: ext_getSupportedDomains
- POST GraphQL: ext_getStorePartialsByDomain
- GET https://cdn.honey.io/extension/data/trending-stores-\<country\>.json

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Webpack module pattern

### Risks
- Tracking: Store/tab events and trending store fetches include storeId/tabId
- PII exfiltration: StoreId, tabId in events and cache
- Tracking: Trending stores and domain matching send encoded payloads

### Evidence
- h0.js:124000-125999
## h0.js [chunk 64/73, lines 126000-127999]

### Summary
Car rental coupon testing, cache management, user action listeners, localStorage tokens, GraphQL endpoints, regenerator runtime.

### Chrome APIs
- None in this chunk

### Event Listeners
- p.Z.addListener('car_rental:action') (handles extractRetailQuotes, checkCache, cleanup, quotes, setCache, tag, testOTACoupons)
- u.Z.addListener('user:action') (handles authentication, logout, profile updates, settings, cache operations)

### Messaging
- Channels: "car_rental:action", "user:action" (custom payloads for coupon testing, cache, tagging, user profile/settings)

### Storage
- localStorage: honey-access-audiences, honey-refresh-audiences (tokens)
- Cache item management: setCacheItem, getCacheItem, removeCacheItem, clearCache

### Endpoints
- https://d.joinhoney.com/extdata/ckdata (GET)
- GraphQL endpoints for user profile, store stats, coupon testing

### Dynamic Code/Obfuscation
- regenerator runtime, async generator infrastructure
- Minified variable names, function chains, webpack module patterns

### Risks
- Privacy: tokens and user data stored in localStorage
- Custom event listeners may expose sensitive actions if not properly secured

### Evidence
- h0.js:126000-127999
## h0.js [chunk 65/73, lines 128000-129999]

### Summary
User points, experiments, feature flags, VIM orchestration, event listeners, cache for user info/settings, endpoints for experiments and config.

### Chrome APIs
- None in this chunk

### Event Listeners
- l.Z.addListener('user:current:update')
- u.Z.addListener('vims:action')
- u.Z.addListener('page:detect_store')
- u.Z.addListener('tabs:removed')
- u.Z.addListener('tabs:updated')
- u.Z.addListener('pdp:debug')

### Messaging
- Channels: "vims:action", "user:current:update", "page:detect_store", "tabs:removed", "tabs:updated", "pdp:debug"
- Payloads for VIM orchestration, user updates, tab/page changes, product debug events

### Storage
- Cache: bg-experiments, bg-user-info, user:settings
- Functions: setCacheItem, getCacheItem, clearCache

### Endpoints
- https://cdn.honey.io/experiments.json (GET)
- https://cdn.honey.io/images/findsavings/coiny-dash-config.json (GET)
- GraphQL endpoints for user points, redeemable gold balance, user info, settings, store recipes

### Dynamic Code/Obfuscation
- regenerator runtime, async generator infrastructure
- Minified variable names, function chains, webpack module patterns

### Risks
- Privacy: user info and settings cached locally
- VIM orchestration and event listeners may expose sensitive actions if not properly secured

### Evidence
- h0.js:128000-129999
## h0.js [chunk 66/73, lines 130000-131999]

### Summary
Product observation, VIM event orchestration, product inventory, reporting, cache for VIM data and inventory, endpoints for product ID and VIM data.

### Chrome APIs
- None in this chunk

### Event Listeners
- VIM event handlers: announceAsEvent, result, runVimInContext, registerSetupSubVims, reportCleanedProduct, reportPageTypes, reportWhereAmI, reportOrderId, waitForPageUpdate, waitForVariantChange, watchVariants
- a.Z.send('current:product')

### Messaging
- Channels: "vims:action", "current:product", "vims:reportPageTypes", "vims:reportWhereAmI", "reportOrderId", "vims:waitForPageUpdate", "vim_event:<event>"
- Payloads for product details, variant changes, page types, order IDs, VIM orchestration

### Storage
- Cache: bg-vims, productObservation, inventoryCache
- Functions for product observation and inventory caching

### Endpoints
- https://d.joinhoney.com/hpid (POST)
- https://v.joinhoney.com/stores/\<storeId\>/\<vim\>\?engine\=4.4.4 (GET)
- https://v.joinhoney.com/recipe/stores/\<storeId\>\?full\=true (GET)
- https://v.joinhoney.com/framework/pageDetector (GET)

### Dynamic Code/Obfuscation
- regenerator runtime, async generator infrastructure
- Minified variable names, function chains, webpack module patterns

### Risks
- Privacy: product and inventory data cached locally
- VIM event orchestration and product reporting may expose sensitive product/user actions if not properly secured

### Evidence
- h0.js:130000-131999
## h0.js [chunk 67/73, lines 132000-133999]

### Summary
Utility functions for string/currency manipulation, DOM access, product/category ID formatting. Extensive Chrome API usage (action, runtime, tabs, windows, offscreen, storage). Messaging/event listeners for background/content/popover/tab, button click, tab/window activation, install/uninstall, offscreen document creation. Storage operations for local/sync/session. Endpoints for CDN, Sentry, Honey auth, Chrome webstore. Dynamic code (regenerator runtime). Obfuscation hints: minified vars, function chains, webpack modules. Risks: excessive permissions, insecure storage, remote code execution.

### Chrome APIs
- chrome.action.setIcon, setTitle, setBadgeText, setBadgeBackgroundColor, onClicked
- chrome.runtime.onMessage
- chrome.tabs.query, create, get, update, remove, onCreated, onUpdated, onActivated, onRemoved, onReplaced
- chrome.windows.get, update, create, getAll, onFocusChanged
- chrome.offscreen.hasDocument, createDocument
- chrome.storage.local/sync/session (get/set/remove/clear/getAll/getBytesInUse)

### Event Listeners
- chrome.action.onClicked
- chrome.runtime.onMessage
- chrome.tabs.onCreated, onUpdated, onActivated, onRemoved, onReplaced
- chrome.windows.onFocusChanged

### Messaging
- Channels: button:bg:clicked, button:cs, messages:bg, messages:cs, messages:popover, tabs:created, tabs:updated, tabs:activated, tabs:removed
- Payloads for tab actions, button info, content delivery, popover, tab/window events

### Storage
- chrome.storage.local, sync, session (get/set/remove/clear/getAll/getBytesInUse)

### Endpoints
- https://cdn.honey.io/css/honey-font.min.css\?v2 (GET)
- https://3b4bb33e1dfc432c9ccd9f9ce5a4bd25@o197999.ingest.sentry.io/6008007 (POST)
- https://www.joinhoney.com/auth\?mode\=... (GET)
- chrome.google.com/webstore/detail/honey/ (GET)

### DOM/Sinks
- document.documentElement.innerHTML
- document.body.removeChild
- document.querySelector
- document.createElement
- document.head.appendChild

### Dynamic Code/Obfuscation
- regenerator runtime, async generator infrastructure
- Minified variable names, function chains, webpack module patterns

### Risks
- Excessive permissions: extensive Chrome API and storage usage
- Insecure storage: sensitive data may be stored without encryption
- Remote code: dynamic script injection, remote endpoint usage

### Evidence
- h0.js:132000-133999
## h0.js [chunk 68/73, lines 134000-135999]

### Summary
Utility functions for tab/script management. Script injection via chrome.scripting.executeScript and tab updates via chrome.tabs.update. No direct messaging, storage, endpoints, or DOM manipulation in this chunk.

### Chrome APIs
- chrome.scripting.executeScript (lines 134000+)
- chrome.tabs.update (lines 134000+)

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
- Minified variable names
- Webpack module pattern

### Risks
- Remote code: Script injection into tabs via chrome.scripting.executeScript could be abused if not properly scoped

### Evidence
- h0.js:134000-135999
## h0.js [chunk 69/73, lines 136000-137999]

### Summary
Foundational infrastructure for DOM parsing, HTML entity handling, and rendering. No direct Chrome API, messaging, storage, or endpoints in this chunk.

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
- HTML entity decoding
- DOM parsing/rendering
- Tag/attribute handling
- DOM traversal utilities

### Dynamic Code/Obfuscation
- Minified variable names
- Webpack module pattern

### Risks
- None in this chunk

### Evidence
- h0.js:136000-137999
## h0.js [chunk 70/73, lines 138000-139999]

### Summary
Implements advanced DOM parsing, CSS selector logic, and HTML parsing state machines. Handles pseudo-classes, tag/attribute management, and error handling for HTML parsing. No direct Chrome API, messaging, storage, or network endpoints in this chunk.

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
- DOM parsing
- CSS selector logic
- HTML parsing state machine

### Dynamic Code/Obfuscation
- Function chains
- Object property chaining
- Minified variable names

### Risks
- None in this chunk

### Evidence
- h0.js:138000-139999
## h0.js [chunk 71/73, lines 140000-141999]

### Summary
Continues HTML parsing engine: state machine transitions for tags, attributes, comments, doctypes, CDATA, and entity references. Implements DOM tree construction, template/content handling, and foster parenting. No direct Chrome API, messaging, storage, or network endpoints in this chunk.

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
- HTML parsing state machine
- Tag/attribute/comment/doctype handling
- DOM tree construction
- Template/content management

### Dynamic Code/Obfuscation
- Function chains
- Object property chaining
- Minified variable names

### Risks
- None in this chunk

### Evidence
- h0.js:140000-141999
## h0.js [chunk 72/73, lines 142000-143999]

### Summary
Continues HTML parsing engine: state machine transitions for tags, attributes, comments, doctypes, CDATA, and entity references. Implements DOM tree construction, template/content handling, foster parenting, and parsing constants/enums. No direct Chrome API, messaging, storage, or network endpoints in this chunk.

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
- HTML parsing state machine
- Tag/attribute/comment/doctype handling
- DOM tree construction
- Template/content management

### Dynamic Code/Obfuscation
- Function chains
- Object property chaining
- Minified variable names

### Risks
- None in this chunk

### Evidence
- h0.js:142000-143999
## h0.js [chunk 73/73, lines 144000-144485]

### Summary
Completes HTML parsing engine: tag/element/attribute sets, parser class for DOM tree construction, utility functions for parsing and buffer management. No direct Chrome API, messaging, storage, or network endpoints in this chunk.

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
- Tag/element/attribute sets
- Parser class for DOM tree construction
- Utility functions for parsing/buffer management

### Dynamic Code/Obfuscation
- Function chains
- Object property chaining
- Minified variable names

### Risks
- None in this chunk

### Evidence
- h0.js:144000-144485
## h1-check.js [chunk 1/28, lines 1-2000]

### Summary
Module definitions, plugin/action registry setup, error classes, and utility functions. No direct Chrome API, event listeners, messaging, storage, network, or dynamic code in this chunk.

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
- None

### Dynamic Code/Obfuscation
- Minified variable names
- Object property chaining
- Function chains

### Risks
- None in this chunk

### Evidence
- h1-check.js:1-2000
## h1-check.js [chunk 2/28, lines 2001-4000]

### Summary
Store-specific coupon/discount logic for major e-commerce sites. Multiple hardcoded endpoints for coupon application. Frequent DOM updates to price fields. Potential privacy/tracking risk due to transmission of cart/order data to third-party endpoints.

### Chrome APIs
- None

### Event Listeners
- None

### Messaging
- None

### Storage
- None

### Endpoints
- https://www.dsw.com/api/v1/coupons/claim (POST)
- https://www.dsw.com/api/v1/cart/details (GET)
- https://cdn.joinhoney.com/dummy-store/api/ (GET)
- https://www.expedia.com/Checkout/applyCoupon (POST)
- https://www.expedia.com/Checkout/removeCoupon (POST)
- https://www.fitflop.com/us/en/cart/coupon (POST)
- https://www.forever21.com/on/demandware.store/Sites-forever21-Site/en_US/Cart-AddCoupon (POST)
- https://www.forever21.com/on/demandware.store/Sites-forever21-Site/en_US/Cart-RemoveCouponLineItem (GET)
- https://secure-www.gap.com/shopping-bag-xapi/apply-bag-promo/ (POST)
- https://www2.hm.com/en_ca/checkout/redeemVoucher (POST)
- https://www2.hm.com/en_ca/checkout/releaseVoucher (GET)
- https://www.hammacher.com/shoppingcart/applypromocode (POST)
- https://order-api.jcpenney.com/order-api/v1/accounts/ (POST)
- https://www.jcrew.com/checkout-api/graphql (POST)
- https://www.kohls.com/cnc/applyCoupons (POST)
- https://www.loft.com/cws/cart/claimCoupon.jsp (POST)
- https://www.loft.com/cws/cart/removeCoupon.jsp (POST)
- https://www.macys.com/my-bag/ (PUT)
- https://www.officedepot.com/async/cart/addCoupon.do (POST)
- https://www.officedepot.com/async/cart/removeCoupon.do (POST)
- https://secure-oldnavy.gap.com/shopping-bag-xapi/apply-bag-promo/ (POST)
- https://www.orbitz.com/Checkout/applyCoupon (POST)
- https://www.orbitz.com/Checkout/removeCoupon (POST)
- https://www.papajohns.com/order/validate-promo (GET)
- https://www.papajohns.com/order/apply-promo/ (GET)
- https://www.papajohns.com/order/view-cart (GET)
- https://www.prettylittlething.fr/pltmobile/coupon/couponPost/ (POST)
- https://checkout.prettylittlething.fr/checkout-api/coupon/set (POST)
- https://checkout.prettylittlething.fr/checkout-api/coupon (POST)
- https://www.prettylittlething.com/pltmobile/coupon/couponPost/ (POST)
- https://checkout.prettylittlething.com/checkout-api/coupon/set (POST)
- https://checkout.prettylittlething.com/checkout-api/coupon (POST)
- https://www.puritan.com/shoppingcart/applyCoupon (POST)
- https://www.saksfifthavenue.com/cart-coupon-add (GET)
- https://www.sephora.com/api/shopping-cart/basket/promotions (POST)
- https://www.sephora.com/api/shopping-cart/baskets/current/promotions (DELETE)
- https://www.shutterstock.com/papi/orders/ (PATCH)

### DOM/Sinks
- Frequent .text() updates to price fields

### Dynamic Code/Obfuscation
- Minified variable names
- Object property chaining
- Function chains

### Risks
- Tracking: Coupon application logic may transmit cart, order, and user data to third-party endpoints

### Evidence
- h1-check.js:2001-4000
## h1-check.js [chunk 3/28, lines 4001-6000]

### Summary
Store-specific coupon/discount logic for additional e-commerce sites. Multiple hardcoded endpoints for coupon application. Frequent DOM updates to price fields. Potential privacy/tracking risk due to transmission of cart/order data to third-party endpoints.

### Chrome APIs
- None

### Event Listeners
- None

### Messaging
- None

### Storage
- None

### Endpoints
- https://www.staples.com/cc/api/checkout/default/coupon (POST)
- https://tjmaxx.tjx.com/store/checkout/cart.jsp (POST)
- https://www.vitacost.com/Checkout/ShoppingCart.aspx (POST)
- https://www.wish.com/api/promo-code/apply (POST)
- https://www.worldmarket.com/on/demandware.store/Sites-World_Market-Site/en_US/Cart-ApplyCoupon (GET)
- https://www.worldmarket.com/on/demandware.store/Sites-World_Market-Site/en_US/Cart-RemoveCouponLineItem (GET)

### DOM/Sinks
- Frequent .text() updates to price fields

### Dynamic Code/Obfuscation
- Minified variable names
- Object property chaining
- Function chains

### Risks
- Tracking: Coupon application logic may transmit cart, order, and user data to third-party endpoints

### Evidence
- h1-check.js:4001-6000
## h1-check.js [chunk 4/28, lines 6001-8000]

### Summary
Advanced object/function emulation, DOM utility wrappers, and browser API abstractions. No direct Chrome API usage or endpoints. Heavy use of dynamic code and obfuscation patterns.

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
- jQuery-like wrappers
- XPath/CSS selectors
- Event simulation
- Price/currency parsing
- HTML sanitization
- Element visibility checks

### Dynamic Code/Obfuscation
- Custom function creation
- Object emulation
- Minified variable names
- Function chains
- Object property chaining

### Risks
- Remote code: Custom interpreter and dynamic code execution utilities may enable obfuscated behavioral flows

### Evidence
- h1-check.js:6001-8000
## h1-check.js [chunk 5/28, lines 8001-10000]

### Summary
Emulation of JS built-in types and control flow. No direct Chrome API usage or endpoints. Interpreter logic enables dynamic code execution and obfuscation.

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
- None

### Dynamic Code/Obfuscation
- Custom interpreter logic
- Dynamic function/object creation
- Prototype manipulation
- Minified variable names
- Function chains
- Object property chaining

### Risks
- Remote code: Interpreter logic enables dynamic code execution and complex behavioral flows, which may be used for obfuscation or remote code patterns

### Evidence
- h1-check.js:8001-10000
## h1-check.js [chunk 6/28, lines 10001-12000]

### Summary
This chunk continues the implementation of custom DOM manipulation and emulation logic, including methods for element wrapping, insertion, removal, and traversal. No direct Chrome API usage, endpoints, or messaging detected. The code is highly modular and minified, with function chains and prototype manipulation, supporting dynamic code execution and obfuscation.

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
- Custom DOM traversal and manipulation (wrapAll, after, insertAfter, before, insertBefore, remove, replaceWith, empty, html, text, clone)

### Dynamic Code/Obfuscation
- Custom DOM API emulation
- Dynamic function/object creation
- Prototype manipulation
- Minified variable names
- Function chains
- Object property chaining

### Risks
- Remote code: Interpreter and DOM emulation logic may enable dynamic code execution and obfuscation, increasing risk of remote code patterns

### Evidence
- h1-check.js:10001-12000
## h1-check.js [chunk 7/28, lines 12001-14000]

### Summary
This chunk contains implementations of cryptographic hash functions (MD5, SHA1, SHA256, SHA512, RIPEMD160, SHA3), block cipher modes (CBC, CFB, CTR, OFB, ECB), and padding schemes. These are likely bundled third-party libraries (e.g., CryptoJS) for cryptographic operations. No direct Chrome API usage, endpoints, messaging, or storage operations detected. The code is minified and modular, with function chains and object property chaining.

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
- None

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Object property chaining
- Bundled cryptographic libraries

### Risks
- Remote code: Inclusion of cryptographic primitives may support secure communication or obfuscation, but no direct evidence of misuse in this chunk

### Evidence
- h1-check.js:12001-14000
## h1-check.js [chunk 8/28, lines 14001-16000]

### Summary
Chunk contains selector engine logic, DOM parsing/serialization, and bundled libraries for HTML/XML entity handling (e.g., htmlparser2, domhandler, entities). No direct Chrome API, messaging, storage, or endpoint usage detected. Code is minified, modular, and exhibits function chains and object property chaining.

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
- None

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Object property chaining
- Webpack module pattern

### Risks
- Remote code: Bundled third-party DOM and entity libraries may support dynamic parsing or manipulation, but no direct evidence of misuse in this chunk

### Evidence
- h1-check.js:14001-16000
## h1-check.js [chunk 9/28, lines 16001-18000]

### Summary
Chunk contains HTML parsing state machines, element stack management, and namespace/tag/attribute constants. Implements robust HTML parsing logic (e.g., foster parenting, token handling, document modes) consistent with a bundled HTML parser library (e.g., parse5). No direct Chrome API, messaging, storage, or endpoint usage detected. Code is minified, modular, and exhibits function chains, object property chaining, and webpack module patterns.

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
- None

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Object property chaining
- Webpack module pattern

### Risks
- Remote code: Bundled HTML parser library may support dynamic parsing or manipulation, but no direct evidence of misuse in this chunk

### Evidence
- h1-check.js:16001-18000
## h1-check.js [chunk 10/28, lines 18001-20000]

### Summary
Chunk contains element stack management, HTML serialization routines, and a comprehensive HTML tokenizer state machine. Handles all HTML parsing states, character/entity decoding, error handling, and token emission. No direct Chrome API, messaging, storage, or endpoint usage detected. Code is minified, modular, and exhibits function chains, object property chaining, and webpack module patterns.

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
- None

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Object property chaining
- Webpack module pattern

### Risks
- Remote code: Bundled HTML parser and tokenizer may support dynamic parsing or manipulation, but no direct evidence of misuse in this chunk

### Evidence
- h1-check.js:18001-20000
## h1-check.js [chunk 11/28, lines 20001-22000]

### Summary
Chunk contains browser-compatible superagent HTTP client, error class definitions, status code mappings, and bundled cryptographic libraries (AES, Blowfish, MD5, HMAC). No direct Chrome API, messaging, storage, or endpoint usage detected. Code is minified, modular, and exhibits function chains, object property chaining, and webpack module patterns.

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
- None

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Object property chaining
- Webpack module pattern

### Risks
- Remote code: Bundled cryptographic libraries may support secure messaging or obfuscated data handling, but no direct evidence of misuse in this chunk

### Evidence
- h1-check.js:20001-22000
## h1-check.js [chunk 12/28, lines 22001-24000]

### Summary
Chunk contains bundled cryptographic and hash libraries (MD5, HMAC, RIPEMD160, SHA1, SHA224, SHA256, SHA3, SHA384, SHA512, DES, TripleDES, RC4, Rabbit, cipher modes, and padding schemes). No direct Chrome API, messaging, storage, or endpoint usage detected. Code is minified, modular, and exhibits function chains, object property chaining, and webpack module patterns.

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
- None

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Object property chaining
- Webpack module pattern

### Risks
- Remote code: Extensive bundled cryptographic primitives may support secure messaging, encrypted storage, or obfuscated data handling, but no direct evidence of misuse in this chunk

### Evidence
- h1-check.js:22001-24000
## h1-check.js [chunk 13/28, lines 24001-26000]

### Summary
Chunk contains bundled JS parser (Acorn), tokenizer, and regex validator. No direct Chrome API, messaging, storage, endpoint, or DOM usage detected. Code is minified, modular, and exhibits function chains, object property chaining, and webpack module patterns.

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
- None

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Object property chaining
- Webpack module pattern

### Risks
- Remote code: Bundled JS parser and regex validator could support dynamic code analysis or execution, but no direct evidence of misuse in this chunk

### Evidence
- h1-check.js:24001-26000
## h1-check.js [chunk 14/28, lines 26001-28000]

### Summary
Chunk contains modular templates and parameter validation for e-commerce platforms (Shopify, WooCommerce, Wix, Magento, BigCommerce, etc.). No direct Chrome API, messaging, storage, endpoint, or DOM usage detected. Code is minified, modular, and exhibits function chains, object property chaining, and webpack module patterns.

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
- None

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Object property chaining
- Webpack module pattern

### Risks
- Remote code: Bundled e-commerce logic for product/cart detection and dynamic selector mapping. Could support dynamic site adaptation or data extraction, but no direct evidence of misuse in this chunk

### Evidence
- h1-check.js:26001-28000
## h1-check.js [chunk 15/28, lines 28001-30000]

### Summary
Chunk contains modular templates and parameter validation for e-commerce platforms (Shopify, WooCommerce, Wix, Magento, BigCommerce, etc.). No direct Chrome API, messaging, storage, endpoint, or DOM usage detected. Code is minified, modular, and exhibits function chains, object property chaining, and webpack module patterns.

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
- None

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Object property chaining
- Webpack module pattern

### Risks
- Remote code: Bundled e-commerce logic for product/cart detection and dynamic selector mapping. Could support dynamic site adaptation or data extraction, but no direct evidence of misuse in this chunk

### Evidence
- h1-check.js:28001-30000
## h1-check.js [chunk 16/28, lines 30001-32000]

### Summary
Chunk contains modular templates and parameter validation for e-commerce platforms (Shopify, WooCommerce, Wix, Magento, BigCommerce, etc.). No direct Chrome API, messaging, storage, endpoint, or DOM usage detected. Code is minified, modular, and exhibits function chains, object property chaining, and webpack module patterns.

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
- None

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Object property chaining
- Webpack module pattern

### Risks
- Remote code: Bundled e-commerce logic for product/cart detection and dynamic selector mapping. Could support dynamic site adaptation or data extraction, but no direct evidence of misuse in this chunk

### Evidence
- h1-check.js:30001-32000
## h1-check.js [chunk 17/28, lines 32001-34000]

### Summary
Chunk contains Bluebird promise library and supporting modules for async control flow, error handling, and utility functions. No direct Chrome API, messaging, storage, endpoint, or DOM usage detected. Code is minified, modular, and exhibits function chains, object property chaining, and webpack module patterns.

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
- None

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Object property chaining
- Webpack module pattern

### Risks
- Remote code: Bundled third-party promise library (Bluebird) and async control flow utilities. No direct evidence of misuse in this chunk

### Evidence
- h1-check.js:32001-34000
## h1-check.js [chunk 18/28, lines 34001-36000]

### Summary
Chunk contains Node.js polyfills, Buffer implementations, encoding/decoding logic, string case conversion, deep cloning, and HTML/CSS selector parsing/rendering modules. No direct Chrome API, messaging, storage, endpoint, or DOM usage detected. Code is minified, modular, and exhibits function chains, object property chaining, and webpack module patterns.

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
- None

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Object property chaining
- Webpack module pattern

### Risks
- Remote code: Bundled Node.js polyfills, Buffer, encoding/decoding, string case conversion, deep cloning, and selector parsing/rendering modules. No direct evidence of misuse in this chunk

### Evidence
- h1-check.js:34001-36000
## h1-check.js [chunk 19/28, lines 36001-38000]

### Summary
Chunk contains HTML/CSS selector parsing, encoding/decoding, DOM emulation, and modular Node.js polyfills. No direct Chrome API, messaging, storage, endpoint, or DOM usage detected. Code is minified, modular, and exhibits function chains, object property chaining, and webpack module patterns.

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
- None

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Object property chaining
- Webpack module pattern

### Risks
- Remote code: Chunk contains HTML/CSS selector parsing, encoding/decoding, DOM emulation, and modular Node.js polyfills. No direct evidence of misuse in this chunk

### Evidence
- h1-check.js:36001-38000
## h1-check.js [chunk 20/28, lines 38001-40000]

### Summary
Chunk contains HTML entity encoding/decoding, parser logic, and modular Node.js polyfills. No direct Chrome API, messaging, storage, endpoint, or DOM usage detected. Code is minified, modular, and exhibits function chains, object property chaining, and webpack module patterns.

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
- None

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Object property chaining
- Webpack module pattern

### Risks
- Remote code: Chunk contains HTML entity encoding/decoding, parser logic, and modular Node.js polyfills. No direct evidence of misuse in this chunk

### Evidence
- h1-check.js:38001-40000
## h1-check.js [chunk 21/28, lines 40001-42000]

### Summary
Chunk contains HTML parser/tokenizer logic, modular Node.js polyfills, and bundled jQuery 3.7.1 library. No direct Chrome API, messaging, storage, endpoint, or DOM usage detected. Code is minified, modular, and exhibits function chains, object property chaining, webpack module patterns, and includes third-party library (jQuery).

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
- None

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Object property chaining
- Webpack module pattern
- Third-party library: jQuery 3.7.1

### Risks
- Remote code: Chunk contains HTML parser/tokenizer logic, modular Node.js polyfills, and bundled jQuery 3.7.1 library. No direct evidence of misuse in this chunk

### Evidence
- h1-check.js:40001-42000
## h1-check.js [chunk 22/28, lines 42001-44000]

### Summary
Chunk contains jQuery event handling, DOM manipulation, AJAX logic, and modular Node.js polyfills. No direct Chrome API, messaging, storage, or endpoint usage detected. Code is minified, modular, and exhibits function chains, object property chaining, webpack module patterns, and includes third-party library (jQuery).

### Chrome APIs
- None

### Event Listeners
- None (only jQuery event handling)

### Messaging
- None

### Storage
- None

### Endpoints
- None

### DOM/Sinks
- jQuery DOM manipulation, event handling, AJAX

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Object property chaining
- Webpack module pattern
- Third-party library: jQuery

### Risks
- Remote code: Chunk contains jQuery event handling, DOM manipulation, AJAX logic, and modular Node.js polyfills. No direct evidence of misuse in this chunk

### Evidence
- h1-check.js:42001-44000
## h1-check.js [chunk 23/28, lines 44001-46000]

### Summary
Chunk contains jQuery event handling, DOM manipulation, AJAX logic, and modular Node.js polyfills. No direct Chrome API, messaging, storage, or endpoint usage detected. Code is minified, modular, and exhibits function chains, object property chaining, webpack module patterns, and includes third-party library (jQuery).

### Chrome APIs
- None

### Event Listeners
- None (only jQuery event handling)

### Messaging
- None

### Storage
- None

### Endpoints
- None

### DOM/Sinks
- jQuery DOM manipulation, event handling, AJAX

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Object property chaining
- Webpack module pattern
- Third-party library: jQuery

### Risks
- Remote code: Chunk contains jQuery event handling, DOM manipulation, AJAX logic, and modular Node.js polyfills. No direct evidence of misuse in this chunk

### Evidence
- h1-check.js:44001-46000
## h1-check.js [chunk 24/28, lines 46001-48000]

### Summary
Chunk contains jQuery event handling, DOM manipulation, AJAX logic, and modular Node.js polyfills. No direct Chrome API, messaging, storage, or endpoint usage detected. Code is minified, modular, and exhibits function chains, object property chaining, webpack module patterns, and includes third-party library (jQuery).

### Chrome APIs
- None

### Event Listeners
- None (only jQuery event handling)

### Messaging
- None

### Storage
- None

### Endpoints
- None

### DOM/Sinks
- jQuery DOM manipulation, event handling, AJAX

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Object property chaining
- Webpack module pattern
- Third-party library: jQuery

### Risks
- Remote code: Chunk contains jQuery event handling, DOM manipulation, AJAX logic, and modular Node.js polyfills. No direct evidence of misuse in this chunk

### Evidence
- h1-check.js:46001-48000
## h1-check.js [chunk 25/28, lines 48001-50000]

### Summary
Chunk contains modular RegExp parsing, NFA/DFA interpreter logic, and AST transformations. No direct Chrome API, messaging, storage, or endpoint usage detected. Code is minified, modular, and exhibits function chains, object property chaining, webpack module patterns.

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
- None (internal RegExp logic only)

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Object property chaining
- Webpack module pattern

### Risks
- Remote code: Chunk contains modular RegExp parsing and AST transformation logic. No direct evidence of misuse in this chunk

### Evidence
- h1-check.js:48001-50000
## h1-check.js [chunk 26/28, lines 50001-52000]

### Summary
Chunk contains RegExp parsing, tokenization, and error handling logic. No direct Chrome API, messaging, storage, or endpoint usage detected. Code is minified, modular, and exhibits function chains, object property chaining, webpack module patterns.

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
- None (internal RegExp logic only)

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Object property chaining
- Webpack module pattern

### Risks
- Remote code: Chunk contains RegExp parsing, tokenization, and error handling logic. No direct evidence of misuse in this chunk

### Evidence
- h1-check.js:50001-52000
## h1-check.js [chunk 27/28, lines 52001-54000]

### Summary
Chunk contains RegExp parsing, Unicode property mapping, and AST traversal logic. No direct Chrome API, messaging, storage, or endpoint usage detected. Code is minified, modular, and exhibits function chains, object property chaining, webpack module patterns.

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
- None (internal RegExp/AST logic only)

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Object property chaining
- Webpack module pattern

### Risks
- Remote code: Chunk contains RegExp parsing, Unicode property mapping, and AST traversal logic. No direct evidence of misuse in this chunk

### Evidence
- h1-check.js:52001-54000
## h1-check.js [chunk 28/28, lines 54001-55418]

### Summary
Chunk contains utility functions, type checking, array/object manipulation, and ES5/ES6 polyfills. No direct Chrome API, messaging, storage, endpoint, or DOM usage detected. Code is minified, modular, and exhibits function chains, object property chaining, webpack module patterns.

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
- None (utility/polyfill logic only)

### Dynamic Code/Obfuscation
- Minified variable names
- Function chains
- Object property chaining
- Webpack module pattern

### Risks
- Remote code: Utility/polyfill logic only, no direct evidence of misuse in this chunk

### Evidence
- h1-check.js:54001-55418
## Components

### Background (Service Worker)
- Files: h0.js
- APIs: chrome.runtime, chrome.tabs, chrome.storage, chrome.cookies, chrome.alarms, chrome.scripting, etc.
- Listeners: runtime.onMessage, runtime.onConnect, alarms.onAlarm, tabs.onUpdated, action.onClicked
- Evidence: h0.js:1-144485

### Content Scripts
- Files: h1-check.js
- APIs: None
- Listeners: None
- Evidence: manifest.json, h1-check.js:1-55418

### Offscreen Document
- Files: h1-offscreen.js
- APIs: chrome.runtime.onMessage.addListener, chrome.runtime.sendMessage
- Listeners: "offscreen:tag" message
- Evidence: h1-offscreen.js:1-15

### Flows
- Service Worker ↔ Offscreen: "offscreen:tag" and "offscreen:tag:success" messages
- Service Worker ↔ Remote: Coupon, tracking, and GraphQL endpoints
- Service Worker ↔ Storage: chrome.storage.local operations
## Workflows

### Coupon Application Flow
**Triggers**: User visits supported e-commerce site, cart/checkout page loads
**Steps**:
1. Content script (`h1-check.js`) detects cart/checkout page
2. Applies coupon codes via hardcoded endpoints (e.g., POST https://www.dsw.com/api/v1/coupons/claim)
3. Updates DOM price fields to reflect discounts
4. No direct Chrome messaging; all logic is local to content script

**APIs**: None (content script)
**Messages**: None
**Endpoints**: Multiple store coupon endpoints (see outline.jsonl chunks 2-3)
**Storage**: None
**Evidence**: h1-check.js:2001-6000

### Affiliate Tagging & Tracking Flow
**Triggers**: Store session activation, user navigates to supported merchant
**Steps**:
1. Service worker (`h0.js`) listens for store/session events
2. Sends affiliate tagging requests to remote endpoints (e.g., https://d.joinhoney.com/v2/stores/modules/list)
3. Tracks session, coupon, and user identifiers
4. Reports events to Honey backend and third-party endpoints

**APIs**: chrome.runtime, chrome.tabs, chrome.storage, chrome.cookies
**Messages**: Multiple custom channels (see outline.jsonl chunk 40+)
**Endpoints**: Honey affiliate/tagging endpoints
**Storage**: Session attributes, user/device IDs
**Evidence**: h0.js:78000-79999, 120000-121999

### Offscreen Tagging Flow
**Triggers**: Service worker needs to perform DOM operations not allowed in background
**Steps**:
1. Service worker sends "offscreen:tag" message to offscreen document (`h1-offscreen.js`)
2. Offscreen document performs DOM tagging and responds with "offscreen:tag:success"
3. Service worker continues affiliate/session logic

**APIs**: chrome.runtime.onMessage, chrome.runtime.sendMessage
**Messages**: "offscreen:tag", "offscreen:tag:success"
**Endpoints**: None
**Storage**: None
**Evidence**: h1-offscreen.js:1-15

### Device/Install Reporting Flow
**Triggers**: Extension install/update, device heartbeat
**Steps**:
1. Service worker listens for install/update events
2. Reports install/update to Honey backend (e.g., POST https://d.joinhoney.com/extusers/install)
3. Sets device/user IDs in chrome.storage.local/sync
4. Handles onboarding and welcome flows

**APIs**: chrome.runtime, chrome.storage, chrome.cookies
**Messages**: "device:heart", "device:action"
**Endpoints**: https://d.joinhoney.com/extusers/install, https://www.joinhoney.com/welcome
**Storage**: device:lastHeartbeat, device:deviceId, user:device-id
**Evidence**: h0.js:84000-85999

### Gold/Rewards Activation Flow
**Triggers**: User activates Gold/rewards on supported store
**Steps**:
1. Service worker listens for rewardsManager:action, stores:session:activated
2. Activates Gold/rewards via GraphQL endpoints (e.g., ext_getFixedRateActivationByStoreAndUserId)
3. Updates local storage with activation state
4. Reports activation to backend

**APIs**: chrome.runtime, chrome.storage
**Messages**: "rewardsManager:action", "stores:session:activated"
**Endpoints**: GraphQL: ext_getFixedRateActivationByStoreAndUserId
**Storage**: storeDoubleGold:<userId>:<storeId>, store-rewards:<storeId>:<userId>
**Evidence**: h0.js:122000-123999
## Privacy Analysis

### Data Categories
- Cart and order data (coupon application)
- Session, device, and user identifiers (affiliate tracking, install reporting)
- Gold/rewards activation state

### Purposes
- Coupon/discount application
- Affiliate tracking and session management
- Device/install reporting
- Rewards activation and management

### Minimization
Collects cart/order data and user/session identifiers for core functionality. No evidence of excessive data collection beyond stated purposes in analyzed chunks.

### Consent
No explicit consent mechanism observed for coupon application, affiliate tracking, or install reporting. User is not directly informed of data collection or transmission to third-party endpoints.

### Retention
Session and device/user identifiers stored in chrome.storage.local/sync. No evidence of explicit retention limits or cleanup logic in analyzed chunks.

### Third Parties
- Multiple e-commerce endpoints (coupon application)
- Honey backend endpoints (affiliate, install, rewards)
- No evidence of advertising or analytics domains in analyzed chunks

### Policy Compliance
Potential GDPR concerns: lacks explicit consent and data retention policy. May require additional user disclosure for affiliate tracking and install reporting.

## Risks

### Risk: Tracking
**Severity**: Medium
**Justification**: Extension transmits cart/order and user/session data to third-party endpoints for coupon application and affiliate tracking without explicit user consent.
**Evidence**: h1-check.js:2001-6000, h0.js:78000-79999

### Risk: PII Exfiltration
**Severity**: Medium
**Justification**: Session, device, and user identifiers are transmitted to Honey backend and stored locally, potentially without user awareness or retention limits.
**Evidence**: h0.js:84000-85999, h0.js:120000-121999

### Risk: Policy Violation
**Severity**: Low
**Justification**: No explicit user consent or retention policy observed for data collection and transmission. May violate Chrome Web Store and GDPR requirements.
**Evidence**: manifest.json, h0.js:78000-79999

# Final Summary (Nov 8, 2025)

## Completion Status
- All required analysis steps completed.
- All output files present and populated.
- Evidence-based extraction and append-only logs verified.

## Validation Results
- honey_summary.json: PASSED schema validation (AJV, Nov 8, 2025)
- All enum values and required fields present.
- CSVs synchronized with main JSON summary.

## Known Gaps/Unknowns
- Some endpoints use dynamic URL construction (template strings).
- Payload schema for certain message channels inferred, not fully explicit.
- Purpose of some storage keys (e.g., tempCache) unclear from code context.
- No explicit user consent mechanism observed in code
