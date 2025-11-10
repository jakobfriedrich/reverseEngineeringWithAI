# Model Evaluation Report

Ground Truth Statistics:
- Network Endpoints: 196
- Messaging Channels: 85
- Storage Keys: 152

## Summary Table

### Network Endpoints

| Model | Precision | Recall | F1 | TP | FP | FN |
|-------|-----------|--------|----|----|----|----|
| GPT-4.1 | 0.9923 | 0.6582 | 0.7914 | 129 | 1 | 67 |
| Claude-Sonnet-4 | 0.9909 | 0.5561 | 0.7124 | 109 | 1 | 87 |
| Gemini-2.5-Pro | 0.9908 | 0.5510 | 0.7082 | 108 | 1 | 88 |

### Messaging Channels

| Model | Precision | Recall | F1 | TP | FP | FN |
|-------|-----------|--------|----|----|----|----|
| GPT-4.1 | 1.0000 | 0.1176 | 0.2105 | 10 | 0 | 75 |
| Claude-Sonnet-4 | 0.9740 | 0.8824 | 0.9259 | 75 | 2 | 10 |
| Gemini-2.5-Pro | 1.0000 | 0.5765 | 0.7313 | 49 | 0 | 36 |

### Storage Keys

| Model | Precision | Recall | F1 | TP | FP | FN |
|-------|-----------|--------|----|----|----|----|
| GPT-4.1 | 0.9865 | 0.4803 | 0.6460 | 73 | 1 | 79 |
| Claude-Sonnet-4 | 1.0000 | 0.3224 | 0.4876 | 49 | 0 | 103 |
| Gemini-2.5-Pro | 0.9659 | 0.5592 | 0.7083 | 85 | 3 | 67 |

## GPT-4.1 - Detailed Analysis

### Network Endpoints
- **Correct**: 129 endpoints
- **Missing**: 67 endpoints
- **Extra**: 1 endpoints

**Missing Endpoints:**
- `GraphQL: ext_getDoubleGoldActivationsByUserId`
- `GraphQL: ext_getProductByIdSecondaryDetails`
- `GraphQL: ext_getUserFollow`
- `GraphQL: ext_updateUserFollow`
- `GraphQL: tips_ext_getInventoryByStoreIdParentId`
- `GraphQL: tips_getProductByIds`
- `GraphQL: tips_getProductsCanonicalByClusterId`
- `GraphQL: tips_getProductsForComparisonShopping`
- `google_places_api`
- `https://cdn-checkout.joinhoney.com/honey-checkout/`
- ... and 57 more

**False Positives (Extra):**
- `https://www.vimeo.com/`

### Messaging Channels
- **Correct**: 10 channels
- **Missing**: 75 channels
- **Extra**: 0 channels

**Missing Channels:**
- `background:started`
- `bg:permissions`
- `button:bg:clicked`
- `button:cs`
- `car_rental:action`
- `circuitBreaker:event`
- `current:product`
- `debug:change`
- `droplist:product:v3`
- `experiments:action`
- ... and 65 more

### Storage Keys
- **Correct**: 73 keys
- **Missing**: 79 keys
- **Extra**: 1 keys

**Missing Keys:**
- `<storeId>:<sessionId>`
- `<storeId>:<tabId>:stoodup`
- `CLIENT-UNIQUE-OBJECT:<storeId>:<sessionId>`
- `TIPS_CONFIGURATION_CACHE`
- `bg-acorns`
- `bg-adb-tabs`
- `bg-double-gold`
- `bg-exchange-rates`
- `bg-honey-pay-now-HoneyPayNow`
- `bg-info-manager`
- ... and 69 more

**False Positives (Extra):**
- `couponStats`

## Claude-Sonnet-4 - Detailed Analysis

### Network Endpoints
- **Correct**: 109 endpoints
- **Missing**: 87 endpoints
- **Extra**: 1 endpoints

**Missing Endpoints:**
- `GraphQL: ext_getAllActiveStoresBoostedCashbackOffers`
- `GraphQL: ext_getAvgGoldEarnedByStoreId`
- `GraphQL: ext_getCouponStatsByProduct`
- `GraphQL: ext_getNnaStoreByStoreId`
- `GraphQL: ext_getNnaUserByUserId`
- `GraphQL: ext_getRoktOffers`
- `GraphQL: ext_getStoreWhitelist`
- `GraphQL: ext_getTopStores`
- `GraphQL: ext_incrementUGCSuccess`
- `GraphQL: ext_insertStoreUGC`
- ... and 77 more

**False Positives (Extra):**
- `https://api.example.com/track`

### Messaging Channels
- **Correct**: 75 channels
- **Missing**: 10 channels
- **Extra**: 2 channels

**Missing Channels:**
- `gxp:ui:actions`
- `honey-checkout`
- `honeyTips:tips`
- `messages:cs`
- `messages:popover`
- `pdp:debug`
- `popover:cs`
- `site_support:sawStoreRequestFinished`
- `site_support:sawStoreRequestStarted`
- `ui:action`

**False Positives (Extra):**
- `pageChange`
- `productVariantClicked`

### Storage Keys
- **Correct**: 49 keys
- **Missing**: 103 keys
- **Extra**: 0 keys

**Missing Keys:**
- `<storeId>:<sessionId>`
- `<storeId>:<tabId>:stoodup`
- `CLIENT-UNIQUE-OBJECT:<storeId>:<sessionId>`
- `TIPS_CONFIGURATION_CACHE`
- `adbBp:activeContexts`
- `adbBp:messageListeners`
- `adbBp:newContextListeners`
- `aeotoken`
- `amazon-optimus`
- `badgeExperiments`
- ... and 93 more

## Gemini-2.5-Pro - Detailed Analysis

### Network Endpoints
- **Correct**: 108 endpoints
- **Missing**: 88 endpoints
- **Extra**: 1 endpoints

**Missing Endpoints:**
- `GraphQL: ext_getAllActiveStoresBoostedCashbackOffers`
- `GraphQL: ext_getAvgGoldEarnedByStoreId`
- `GraphQL: ext_getCouponStatsByProduct`
- `GraphQL: ext_getDoubleGoldActivationsByUserId`
- `GraphQL: ext_getFixedRateActivationByStoreAndUserId`
- `GraphQL: ext_getNnaStoreByStoreId`
- `GraphQL: ext_getNnaUserByUserId`
- `GraphQL: ext_getProductByIdSecondaryDetails`
- `GraphQL: ext_getRoktOffers`
- `GraphQL: ext_getStorePartialsByDomain`
- ... and 78 more

**False Positives (Extra):**
- `https://api.example.com/track`

### Messaging Channels
- **Correct**: 49 channels
- **Missing**: 36 channels
- **Extra**: 0 channels

**Missing Channels:**
- `current:product`
- `features:action`
- `fs-cache:access`
- `gxp:actions`
- `honey-pay-now:action:eligibility`
- `honey-pay-now:action:gql-query`
- `honeyTips:pdpCoupons:honeyProductCoupons:init`
- `lru:access`
- `offscreen:tag`
- `page:detect_google`
- ... and 26 more

### Storage Keys
- **Correct**: 85 keys
- **Missing**: 67 keys
- **Extra**: 3 keys

**Missing Keys:**
- `adbBp:messageListeners`
- `adbBp:newContextListeners`
- `aeotoken`
- `amazon-optimus`
- `badgeExperiments`
- `bg-user-info`
- `checkoutIFrameOriginBranch`
- `checkoutIFrameOriginVersion`
- `chrome.storage.local`
- `chrome.storage.session`
- ... and 57 more

**False Positives (Extra):**
- `N/A`
- `session-scoped storage wrapper`
- `userPoints:{userId}`
