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

- `/book` redirects visitors to the Injectox Clinic Faces booking page.
- `/admin` is the private clinic workspace for Faces link access, service pricing, review moderation and settings. Faces remains the source of truth for the diary.
- Booking availability, consent, deposits, payment and confirmation are handled by Faces.
- Add the Brevo, admin notification email, site URL, admin password and KV values shown in `.env.example` to Vercel before launch.
- Review notifications use Brevo and are delivered to `ADMIN_NOTIFICATION_EMAIL` (set this to `injectoxclinic@gmail.com`). Booking confirmations remain in Faces.
- Newsletter sign-ups post to `/api/newsletter`. Connect Brevo with `BREVO_API_KEY` and `BREVO_LIST_ID`.
- The admin dashboard stores treatment, pricing, website-copy, clinic settings and review moderation changes in Vercel KV / Upstash Redis. Create a KV store in Vercel Storage, connect it to this project, and confirm `KV_REST_API_URL` and `KV_REST_API_TOKEN` are present in the Production environment. Without these, serverless deployments cannot reliably retain edits or submitted reviews.
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
