# Analytics Events Backlog

This file lists the analytics events for Parent Flow.

## Implemented Events (Wired with placeholders)

-   `onboarding_complete`: Fired when a user successfully completes the onboarding flow.
    -   Properties: `{ hasPartner: boolean }`
-   `partner_invited`: Fired when a user adds a partner's name during onboarding.
    -   Properties: `{ method: 'onboarding' }`
-   `first48_step_completed`: Fired each time a user checks off an item in the "First 48 hours" card.
    -   Properties: `{ stepId: string }`
-   `shift_created`: Fired when a user assigns a parent to a specific sleep shift.
    -   Properties: `{ day: string, shift: string, assignee: string }`
-   `fairness_viewed`: Fired when the "How we’re sharing care" card is displayed to the user.
-   `fairness_optout`: Fired when a user chooses to hide the fairness card.
-   `plan_printed`: Fired when a user clicks to print a weekly plan.
    -   Properties: `{ source: 'weekly_recap_card' | 'weekly_plan_modal' }`
-   `paywall_viewed`: Fired when the subscription modal is shown.
-   `subscribe_started`: Fired when a user clicks the final confirmation button to subscribe.
    -   Properties: `{ tier: string, billingCycle: string }`
-   `subscribe_completed`: Fired when the subscription process is successfully completed.
    -   Properties: `{ tier: string, billingCycle: string }`
-   `cancel`: Fired when a user closes the subscription modal without subscribing.
    -   Properties: `{ context: 'subscription_modal', reason: 'stay_on_free' | 'background_click' | 'close_button' }`

## Future Events (To be implemented)

These events require features that are not yet built.

-   `partner_joined`: To be fired when an invited partner creates their account and links it.
    -   *Dependency*: Partner invitation and account linking system.
-   `shift_completed`: To be fired when a scheduled shift is marked as "completed" or when the time for it passes.
    -   *Dependency*: Mechanism to track the status of a shift beyond just scheduling.
-   `cancel` (subscription): To be fired when a user cancels their active subscription.
    -   *Dependency*: Subscription management/cancellation UI in settings.
