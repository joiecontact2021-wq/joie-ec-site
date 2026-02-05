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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Supabase Setup

1. Create a Supabase project and copy the project URL and API keys.
2. Create `.env.local` and add the following:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ADMIN_EMAILS=you@example.com
STRIPE_SECRET_KEY=your_stripe_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CHECKOUT_REQUIRE_SHIPPING=true
RESEND_API_KEY=your_resend_key
RESEND_FROM_EMAIL=your_from_email
ORDER_NOTIFICATION_EMAIL=you@example.com
SLACK_WEBHOOK_URL=your_slack_webhook_url
```

3. Run the SQL in `supabase/schema.sql` using the Supabase SQL editor.
   - This enables RLS, revokes default privileges, and adds a policy for public reads of `is_active` products.
   - This also creates the `stripe_events` table used to avoid double-processing Stripe webhooks.
4. Open the Supabase Security Advisor and confirm there are no errors or warnings.

Important:
- `SUPABASE_SERVICE_ROLE_KEY` must never be exposed to the browser. It is used only in server-side API routes.

## Stripe Setup

1. Add your Stripe secret key in `.env.local` / Vercel environment variables.
2. Create a webhook endpoint in Stripe:
   - URL: `https://your-domain.vercel.app/api/webhooks/stripe`
   - Events: `checkout.session.completed`
3. Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`.
4. (Optional) Set `RESEND_API_KEY`, `ORDER_NOTIFICATION_EMAIL`, and `SLACK_WEBHOOK_URL` to receive order notifications.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
