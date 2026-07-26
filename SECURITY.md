# Security and launch checklist

## Implemented in the application

- Content Security Policy, HSTS, clickjacking protection, strict referrer policy and restrictive browser permissions.
- Same-origin checks on website form and admin POST routes.
- Server-side price lookup and Stripe webhook signature verification.
- HTTP-only, secure, same-site admin cookie and timing-safe password comparison.
- Input validation, honeypot fields and endpoint rate limits.
- Marketing opt-in before newsletter submission and a click-to-load Google Maps embed.

## Production controls required before launch

- Set a long, unique `ADMIN_PASSWORD`, Stripe/Resend keys and the canonical `NEXT_PUBLIC_SITE_URL` only in the hosting provider’s encrypted environment settings. Never commit them.
- Enable Vercel WAF / Bot Protection and rate limiting for `/api/admin/*`, `/api/checkout`, `/api/newsletter` and `/api/reviews`.
- Replace the local in-memory limiter with a shared provider such as Upstash Redis before relying on it for abuse protection across multiple server instances.
- Enable Stripe webhook event retries and monitor failed events.
- Use a double-opt-in capable email provider and configure `NEWSLETTER_SUBSCRIBE_ENDPOINT` with a HTTPS endpoint.
- Review and complete privacy contact, legal business identity, retention schedule, ICO registration position, treatment terms and cancellation policy with a UK-qualified adviser.
- Run `npm audit --omit=dev` and dependency updates regularly.
