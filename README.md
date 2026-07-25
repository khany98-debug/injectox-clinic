This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Clinic operations

- `/book` is the on-site booking journey.
- `/admin` is the private clinic workspace for diary management, service pricing, review moderation and settings.
- `/api/checkout` creates a hosted Stripe Checkout session for the booking deposit.
- `/api/stripe/webhook` verifies paid sessions and triggers the branded customer and clinic confirmation emails.
- `/api/calendar` generates the calendar attachment used by the success page and confirmation email.
- Add the Stripe, Resend, admin notification email, site URL and admin password values shown in `.env.example` to Vercel before launch.
- Stripe requires `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET` and either server-created Checkout sessions, as implemented here, or future Stripe price IDs if the booking model changes.
- Resend requires `RESEND_API_KEY`, `RESEND_FROM_EMAIL` and `ADMIN_NOTIFICATION_EMAIL` for branded customer confirmations and Fatima’s separate booking notifications.
- Newsletter sign-ups post to `/api/newsletter`. Connect a mailing provider later with `NEWSLETTER_SUBSCRIBE_ENDPOINT` and, where needed, `NEWSLETTER_API_KEY`.
- No database is currently required. Admin dashboard edits are preview/local-state only until a production database and migrations are added.
- `/admin` is gated by `ADMIN_PASSWORD`; without it, the dashboard does not open.
- Dropbox-supplied media is stored in `public/media/dropbox` and `public/images/dropbox` so the site does not depend on third-party image URLs.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
