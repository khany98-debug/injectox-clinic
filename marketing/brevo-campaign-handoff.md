# Injectox Brevo Welcome Email

Use `marketing/brevo-injectox-campaign.html` as the campaign HTML in Brevo.

This is the automated first email for a new newsletter subscriber. Set it up as a Brevo automation triggered when a contact joins the Injectox newsletter list.

Recommended subject lines:

- Welcome to Injectox Clinic
- A little more considered. A lot more you.
- Your Injectox welcome

Recommended preheader:

- Meet the clinic where honest advice and natural results come first.

Import path in Brevo:

1. In Brevo, open Automations and create a workflow for contacts added to the Injectox newsletter list.
2. Add a short delay (for example, one minute) then add a Send an email step.
3. Choose the HTML editor or import custom HTML, then paste the contents of `marketing/brevo-injectox-campaign.html`.
4. Use the subject and preheader above, and make the sender name “Injectox Clinic”.
5. Send a test email to yourself, checking mobile width, buttons and the unsubscribe link before switching the automation live.

If you want stronger compliance, turn on double opt-in in Brevo for the signup source that feeds this list.
