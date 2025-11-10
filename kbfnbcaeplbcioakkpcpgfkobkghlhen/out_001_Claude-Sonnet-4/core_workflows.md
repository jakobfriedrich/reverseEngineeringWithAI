# Grammarly Extension Core Workflows Analysis

## Workflow Clustering Methodology
Based on analysis of 95 endpoints, 131 message channels, and 96 storage keys, clustered by:
- **Message Channel Families**: Communication patterns and data flow
- **Endpoint Families**: Service groupings and API relationships  
- **Storage Cycles**: Data persistence and lifecycle management

---

## WORKFLOW 1: USER AUTHENTICATION & AUTHORIZATION

### Trigger
- User login attempt or token expiration
- OAuth flow initiation from content script

### Core Steps
1. **Authentication Initiation**
   - Message: `bgRpc_api_launchAuthFlow`, `login`, `signIn`, `signUp`
   - Storage: `gr-oauth-key`, `gr-oauth-service-state`, `gr-oauth-state`
   - Evidence: `src/js/Grammarly.js:58001-60000`

2. **OAuth 2.0 Flow Processing**
   - Endpoints: `/oauth2/token`, `/oauth2/authorize`, `/oauth2/exchange`
   - APIs: `auth.grammarly.com`, `tokens.grammarly.com`, `auth.ppgr.io`, `auth.qagr.io`
   - Evidence: `src/js/Grammarly-gDocs.js:102001-104000`

3. **Token Management**
   - Storage: `mise:clientAccessToken`, `authenticationOptions`
   - Messages: `authenticationStarted`, `oauthGetAccessToken`
   - Evidence: `src/js/Grammarly-bg.js:74001-76000`

4. **Multi-Platform Integration**
   - External APIs: `accounts.google.com`, `facebook.com`, `appleid.apple.com`
   - Storage: `cookies` (authentication)
   - Evidence: `src/js/Grammarly.js:54001-56000`

### Data Categories
- Authentication tokens, user credentials, OAuth state
- Cross-device synchronization data

---

## WORKFLOW 2: TEXT PROCESSING & CHECKING

### Trigger
- User text input, document changes, or manual checking request
- Field focus events and content modifications

### Core Steps
1. **Text Capture & Analysis**
   - Messages: `pushTextChanges`, `syncHighlights`, `replace`, `ignore`, `acknowledge`
   - Storage: `cachedRichTextOnServiceWorkerShutdown`, `visibleHighlights`
   - Evidence: `src/js/Grammarly-gDocs.js:22001-24000`

2. **Real-time Grammar Checking**
   - Endpoints: `capi.grammarly.com`, `capiUrl`, `gateway.grammarly.com`
   - Messages: `cs-to-bg-static-capi-rpc`, `cs-to-bg-static-capi-observable-rpc`
   - Evidence: `src/js/Grammarly-bg.js:72001-74000`

3. **AI-Enhanced Processing**
   - External APIs: `chat.openai.com`, `claude.ai`, `gemini.google.com`, `perplexity.ai`
   - Storage: `replacement_analytics`, `user_behavior_tracking`
   - Evidence: `src/js/Grammarly-check.js:8001-10000`

4. **Suggestion Application**
   - Messages: `selectHighlight`, `autocorrectStartSession`, `autocorrectCheck`
   - Storage: `autocorrectEnabled`, `autoApplyEnabled`, `langDetectCache`
   - Evidence: `src/js/Grammarly-gDocs.js:30001-32000`

### Data Categories
- Text content, corrections, user editing patterns
- Language detection and autocorrect preferences

---

## WORKFLOW 3: FEATURE EXPERIMENTATION & CONFIGURATION

### Trigger
- Extension startup, user segment changes, or A/B test assignment
- Configuration updates from remote services

### Core Steps
1. **Experiment Assignment**
   - Endpoints: `treatment.grammarly.com`, `gates.grammarly.com`, `properties.grammarly.com`
   - Messages: `getTreatment`, `logTreatment`, `treatments`
   - Evidence: `src/js/Grammarly-gDocs.js:6001-8000`

2. **Feature Gate Management**
   - Storage: `experimentationGatesTreatments`, `experimentationTreatments`, `gateTreatments`
   - Messages: `experimentClient`, `fetchTreatmentsFail`
   - Evidence: `src/js/Grammarly-bg.js:76001-78000`

3. **Dynamic Configuration**
   - Storage: `propertiesCache`, `dynamicConfig`, `treatment_cache`
   - Endpoints: `config.extension.grammarly.com`
   - Evidence: `src/js/Grammarly-gDocs.js:8001-10000`

4. **Feature Activation**
   - Messages: `alwaysAvailableAssistant`, `touchTypist`, `citationBuilder`
   - Storage: `inviteEligibilityCache`, `clientControlsCacheEntry`
   - Evidence: `src/js/Grammarly.js:60001-62000`

### Data Categories
- Experiment assignments, feature flags, configuration overrides
- Enterprise policy and managed settings

---

## WORKFLOW 4: COMPREHENSIVE TELEMETRY & ANALYTICS

### Trigger
- User interactions, feature usage, errors, or performance events
- Scheduled background reporting

### Core Steps
1. **Event Collection**
   - Messages: 30+ telemetry channels (bgStarted, performanceCard, gdocs, etc.)
   - Storage: `telemetry_data`, `usage_metrics`, `performance_data`
   - Evidence: `src/js/Grammarly.js:62001-64000`

2. **Analytics Processing**
   - Endpoints: `femetrics.grammarly.io`, `gnar.grammarly.com`, `f-log-extension.grammarly.io`
   - Storage: `user_analytics`, `service_availability_metrics`
   - Evidence: `src/js/Grammarly.js:54001-56000`

3. **Error & Crash Reporting**
   - Messages: `unhandledException`, `unhandledRejection`, `debugReports`
   - Storage: `error_reports`, `crash_logs`
   - Evidence: `src/js/Grammarly.js:64001-66000`

4. **User Behavior Tracking**
   - Storage: `extensionInstallSource`, `extensionInstallDate`, `lifetimeAlertStats`
   - Messages: `interactionToNextPaint`, `pageIntegrationLifecycle`
   - Evidence: `src/js/Grammarly-gDocs.js:40001-42000`

### Data Categories
- Usage patterns, performance metrics, error diagnostics
- User engagement and feature adoption data

---

## WORKFLOW 5: SUBSCRIPTION & MONETIZATION

### Trigger
- Free user limit reached, upgrade prompts, or billing events
- Business upsell opportunities

### Core Steps
1. **Upgrade Flow Management**
   - Endpoints: `grammarly.com/plans`, `grammarly.com/upgrade`, `subscription.grammarly.com`
   - Messages: `upgradeHooks`, `openSubscriptionPage`
   - Evidence: `src/js/Grammarly.js:38001-40000`

2. **Business Upsell Campaign**
   - Storage: `businessUphookPopupSeenCount`, `businessUphookPopupLastShownTimestamp`
   - Messages: `authHooks`
   - Evidence: `src/js/Grammarly-gDocs.js:40001-42000`

3. **Billing & Payment Management**
   - Storage: `dunningMessageLastDismissedTimestamp`, `renewalNotificationAppearanceTimestamp`
   - Storage: `billingWithNoPaymentNotificationAppearanceTimestamp`
   - Evidence: `src/js/Grammarly.js:38001-40000`

4. **Promotional Campaigns**
   - Storage: `specialOffer`, `in_product_discount_pro`, `hasInProductDiscountSpecialOffer`
   - External: `iterable.com` (marketing automation)
   - Evidence: `src/js/Grammarly.js:24001-26000`

### Data Categories
- Subscription status, payment information, promotional eligibility
- Marketing campaign engagement data

---

## WORKFLOW 6: CROSS-PLATFORM INTEGRATION

### Trigger
- Platform-specific features, third-party app detection
- Enhanced workflow integrations

### Core Steps
1. **Platform Detection & Integration**
   - External APIs: `docs.google.com`, `coda.io`, `superhuman.com`
   - Messages: `gdocs`, `canvasGdocs`
   - Evidence: `src/js/Grammarly-check.js:8001-10000`

2. **Translation Services**
   - External APIs: `translate.google.com`, `deepl.com`
   - Storage: `g2TranslationLanguages`, `g2MultilingualOnboardingShowsCount`
   - Evidence: `src/js/Grammarly.js:26001-28000`

3. **Human Writing Reports**
   - Messages: `hwrGetEncryptionKey`, `hwrRetrieveReport`, `generateHumanWritingReport`
   - Endpoints: `authorship.grammarly.com`
   - Evidence: `src/js/Grammarly-gDocs.js:32001-34000`

4. **Desktop Integration**
   - Messages: `gOS-bg-d5ccc5edf7e1`, `gOS-fg-d5ccc5edf7e1`
   - Storage: `runtime_messaging`, `service_worker_communication`
   - Evidence: `src/js/Grammarly-bg.js:58001-60000`

### Data Categories
- Platform-specific preferences, integration settings
- Cross-application workflow data

---

## CRITICAL WORKFLOW INTERSECTIONS

### Authentication ↔ Text Processing
- Shared: `user` profile, `extensionSettings`, authentication tokens
- Risk: User content exposed during authentication failures

### Experimentation ↔ All Workflows  
- Shared: Feature flags affect all user interactions
- Risk: A/B testing can modify behavior without user consent

### Telemetry ↔ All Workflows
- Shared: Comprehensive data collection across all features
- Risk: Detailed user behavior profiling and surveillance capabilities

### Subscription ↔ Feature Access
- Shared: Premium feature gating and upgrade prompts
- Risk: Aggressive monetization affecting user experience