# Postpartum Copilot Module

This document outlines the architecture, setup, and integration steps for the Postpartum Copilot feature module.

## 1. Overview

The Postpartum Copilot is a modular feature designed to support new parents by focusing on key areas known to impact maternal mental health and co-parenting harmony. It is built to be "dropped into" an existing React application with minimal, non-breaking changes.

**Core Goals:**
- Protect maternal sleep.
- Activate partner caregiving with concrete actions.
- Promote a fair division of labor.
- Offer light, accessible behavioral activation tasks.
- Provide a safe, clear pathway to crisis support via screening and triage.

**Clinical Safety:** This module provides informational and screening support; it **does not** offer a diagnosis or replace professional medical advice. All user-facing copy is designed to be non-clinical, supportive, and safety-first.

## 2. Environment Variables

To enable and configure the module, add the following variables to your environment file (e.g., `.env.local`).

```bash
# Set to 'true' to enable the Postpartum Copilot module in the app.
# In this playground, this is hardcoded to true in config/featureFlags.ts
POSTPARTUM_MODULE_ENABLED=true

# The region for localizing helpline copy.
REGION=en-ZA

# A URL to a remote JSON file containing an array of local crisis helplines.
# This allows for dynamic updates without a full app release.
HELPLINE_JSON_URL="https://example.com/api/helplines.json"
```

The JSON file at `HELPLINE_JSON_URL` should have the following structure:
```json
[
  {
    "name": "SADAG Mental Health Line",
    "phone": "0112344837",
    "description": "24hr helpline for anxiety & depression."
  },
  {
    "name": "Lifeline South Africa",
    "phone": "0861322322",
    "description": "National crisis support line."
  },
  {
    "name": "WhatsApp Support",
    "whatsapp": "+27871503134",
    "description": "Text-based support."
  }
]
```

## 3. How to Mount the Feature

Follow these steps to integrate the Postpartum Copilot into your existing application.

1.  **Wrap Providers**: In your main `App.tsx` or equivalent root component, conditionally wrap your application with `SafetyProvider` and `PostpartumProvider`.

    ```tsx
    import { POSTPARTUM_MODULE_ENABLED } from './config/featureFlags';
    import { SafetyProvider } from './features/postpartum/providers/SafetyProvider';
    import { PostpartumProvider } from './features/postpartum/providers/PostpartumProvider';

    // ...
    {POSTPARTUM_MODULE_ENABLED ? (
      <SafetyProvider>
        <PostpartumProvider>
          {/* Your App's main content */}
        </PostpartumProvider>
      </SafetyProvider>
    ) : (
      {/* Your App's main content */}
    )}
    ```

2.  **Mount the Safety Banner**: Inside your main layout component, render the `SafetyBanner`. It should be visible across all screens when the feature is enabled.

    ```tsx
    import { SafetyBanner } from './features/postpartum/components/SafetyBanner';

    // ...
    <div className="min-h-screen">
      {POSTPARTUM_MODULE_ENABLED && <SafetyBanner />}
      {/* Rest of your layout */}
    </div>
    ```

3.  **Add Navigation**: Add a new view/route for the module.
    -   **State-based routing**: Add a `'postpartum'` view state and a navigation button.
    -   **File-based routing (Next.js/Expo)**: Create a new file like `app/postpartum.tsx`.

    Render the `PostpartumHub` component as the entry point for this new view.

    ```tsx
    import { PostpartumHub } from './features/postpartum/screens/PostpartumHub';

    // ...
    {view === 'postpartum' && <PostpartumHub />}
    ```

## 4. KPIs to Track

To measure the effectiveness and engagement of this module, track the following key performance indicators:

-   **EPDS Delta**: Average change in EPDS scores from baseline to week 4, 8, and 12 check-ins.
-   **Partner Activation Rate**: Percentage of users who create and complete tasks in the "Partner Actions" section.
-   **Protected-Sleep Nights**: Average number of "Protected Nights" scheduled and logged per week.
-   **Fairness Pulse Median**: The median score from the weekly "Fairness Pulse" check-in (1-5 scale).
-   **D30/D90 Retention**: Percentage of users who enable the module and are still active after 30 and 90 days.
