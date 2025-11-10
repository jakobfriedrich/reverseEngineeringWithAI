# Model Evaluation Report

Ground Truth Statistics:
- Network Endpoints: 177
- Messaging Channels: 150
- Storage Keys: 103

## Summary Table

### Network Endpoints

| Model | Precision | Recall | F1 | TP | FP | FN |
|-------|-----------|--------|----|----|----|----|
| GPT-4.1 | 1.0000 | 0.2599 | 0.4126 | 46 | 0 | 131 |
| Claude-Sonnet-4 | 1.0000 | 0.4294 | 0.6008 | 76 | 0 | 101 |
| Gemini-2.5-Pro | 0.9762 | 0.4633 | 0.6284 | 82 | 2 | 95 |

### Messaging Channels

| Model | Precision | Recall | F1 | TP | FP | FN |
|-------|-----------|--------|----|----|----|----|
| GPT-4.1 | 0.8000 | 0.0267 | 0.0516 | 4 | 1 | 146 |
| Claude-Sonnet-4 | 1.0000 | 0.8467 | 0.9170 | 127 | 0 | 23 |
| Gemini-2.5-Pro | 0.9655 | 0.1867 | 0.3128 | 28 | 1 | 122 |

### Storage Keys

| Model | Precision | Recall | F1 | TP | FP | FN |
|-------|-----------|--------|----|----|----|----|
| GPT-4.1 | 0.8889 | 0.0777 | 0.1429 | 8 | 1 | 95 |
| Claude-Sonnet-4 | 0.9885 | 0.8350 | 0.9053 | 86 | 1 | 17 |
| Gemini-2.5-Pro | 1.0000 | 0.1359 | 0.2393 | 14 | 0 | 89 |

## GPT-4.1 - Detailed Analysis

### Network Endpoints
- **Correct**: 46 endpoints
- **Missing**: 131 endpoints
- **Extra**: 0 endpoints

**Missing Endpoints:**
- `(felog)`
- `(femetrics)`
- `/api/revoke-by-refresh-token`
- `/api/userinfo`
- `/crashv2`
- `/gates/get`
- `/logout`
- `/logv2`
- `/oauth2/authorize`
- `/oauth2/exchange`
- ... and 121 more

### Messaging Channels
- **Correct**: 4 channels
- **Missing**: 146 channels
- **Extra**: 1 channels

**Missing Channels:**
- `CODE_SPLITTING_INJECT`
- `CustomEvent`
- `acknowledge`
- `activeTab`
- `add`
- `agents`
- `alerts`
- `alwaysAvailableAssistant`
- `alwaysOnAssistantOnOpenData`
- `applicationHeaders`
- ... and 136 more

**False Positives (Extra):**
- `cs-bg-runtime-<extId>`

### Storage Keys
- **Correct**: 8 keys
- **Missing**: 95 keys
- **Extra**: 1 keys

**Missing Keys:**
- `GR-Auth`
- `GR-Auth-Expiry`
- `GR-Auth-Pending`
- `GR-SID`
- `GR-SID-Expiry`
- `GR-SID-Pending`
- `IndexedDB`
- `accountMigrationNotificationAppearanceTimestamp`
- `activeTab`
- `alwaysOnAssistant`
- ... and 85 more

**False Positives (Extra):**
- `assistantOnboarding_*`

## Claude-Sonnet-4 - Detailed Analysis

### Network Endpoints
- **Correct**: 76 endpoints
- **Missing**: 101 endpoints
- **Extra**: 0 endpoints

**Missing Endpoints:**
- `(felog)`
- `(femetrics)`
- `/crashv2`
- `/gates/get`
- `/logv2`
- `/properties`
- `/signin`
- `/signup`
- `/treatment/get`
- `/treatment/log`
- ... and 91 more

### Messaging Channels
- **Correct**: 127 channels
- **Missing**: 23 channels
- **Extra**: 0 channels

**Missing Channels:**
- `CustomEvent`
- `cardAction/:docId`
- `cs-bg-runtime-*`
- `cs-text-field-to-side-panel-rpc`
- `cs-to-bg-observable-rpc-1587687052565`
- `cs-to-bg-rpc-1587687052565`
- `downloadDebugReportsFromCS`
- `iframe-integration-rpc`
- `message-bus-port`
- `message:to-priv`
- ... and 13 more

### Storage Keys
- **Correct**: 86 keys
- **Missing**: 17 keys
- **Extra**: 1 keys

**Missing Keys:**
- `GR-Auth`
- `GR-Auth-Expiry`
- `GR-Auth-Pending`
- `GR-SID`
- `GR-SID-Expiry`
- `GR-SID-Pending`
- `blocklistConfigMetadata`
- `duration_service_availability_metrics_db_v1`
- `extensionDictionaryEvent`
- `gdocs_peak_collabs_dismissed`
- ... and 7 more

**False Positives (Extra):**
- `runtime_messaging`

## Gemini-2.5-Pro - Detailed Analysis

### Network Endpoints
- **Correct**: 82 endpoints
- **Missing**: 95 endpoints
- **Extra**: 2 endpoints

**Missing Endpoints:**
- `/api/revoke-by-refresh-token`
- `/api/userinfo`
- `/logout`
- `/oauth2/authorize`
- `/plans`
- `/setup-trial`
- `/special-offers`
- `/subscribe`
- `/token`
- `auth.grammarly.com`
- ... and 85 more

**False Positives (Extra):**
- `/account/subscription`
- `https://gates.grammarly.com/gates/get`

### Messaging Channels
- **Correct**: 28 channels
- **Missing**: 122 channels
- **Extra**: 1 channels

**Missing Channels:**
- `acknowledge`
- `activeTab`
- `add`
- `agents`
- `alerts`
- `alwaysAvailableAssistant`
- `alwaysOnAssistantOnOpenData`
- `applicationHeaders`
- `assistant`
- `auth`
- ... and 112 more

**False Positives (Extra):**
- `Internal RPC/messaging framework`

### Storage Keys
- **Correct**: 14 keys
- **Missing**: 89 keys
- **Extra**: 0 keys

**Missing Keys:**
- `IndexedDB`
- `accountMigrationNotificationAppearanceTimestamp`
- `activeTab`
- `alwaysOnAssistant`
- `alwaysOnAssistantOnOpenData`
- `authenticationOptions`
- `autoApplyEnabled`
- `autocorrectEnabled`
- `billingWithNoPaymentNotificationAppearanceTimestamp`
- `blocklistConfigMetadata`
- ... and 79 more
