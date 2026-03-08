# eCom Stack — The Ecommerce Directory

A curated directory of 200+ ecommerce tools, platforms, and services. Email-gated access with real verification, backed by Google Sheets as a CMS.

## Quick Start

```bash
pnpm install
cp .env.example .env    # Fill in your keys
pnpm dev
```

## Setup

### 1. Supabase (Email Verification)

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **Settings → API** and copy your **Project URL** and **anon/public key**
3. Paste them into `.env`:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
4. Go to **Authentication → Email Templates** and customize the OTP email if you want
5. Under **Authentication → Providers**, make sure Email is enabled with "Confirm email" turned on

That's it. Supabase handles OTP generation, email delivery, and session management out of the box.

### 2. Google Sheets CMS

1. Create a Google Sheet with these exact column headers in row 1:

   | name | description | url | category | subcategory | pricing | tags | featured |
   |------|-------------|-----|----------|-------------|---------|------|----------|

2. Fill in your listings. The `category` column must match one of the category IDs in `src/data/categories.ts` (e.g., `platforms`, `payments`, `shipping`, etc.)
3. `tags` are pipe-separated: `popular|beginner-friendly|enterprise`
4. `featured` should be `TRUE` or `FALSE`
5. Go to **File → Share → Publish to web** → select "Comma-separated values (.csv)" → click Publish
6. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`) and add it to `.env`:
   ```
   VITE_GOOGLE_SHEETS_ID=your-google-sheet-id-here
   ```

Without a Sheet ID, the app falls back to ~50 sample listings built into the code.

### Category IDs

| ID | Category |
|----|----------|
| `platforms` | Ecommerce Platforms |
| `payments` | Payments & Checkout |
| `shipping` | Shipping & Fulfillment |
| `marketing` | Marketing & Growth |
| `analytics` | Analytics & Data |
| `creative` | Creative & Content |
| `crm` | CRM & Customer Support |
| `inventory` | Inventory & Operations |
| `sourcing` | Sourcing & Manufacturing |
| `legal` | Legal & Compliance |
| `agencies` | Agencies & Services |
| `productivity` | Productivity & Tools |

## Deploy

### Vercel (Recommended)

1. Push to GitHub
2. Import in [vercel.com](https://vercel.com)
3. Add your three environment variables
4. Deploy

### Netlify

1. Push to GitHub
2. Import in [netlify.com](https://netlify.com)
3. Build command: `pnpm build`
4. Publish directory: `dist`
5. Add environment variables
6. Deploy

Add a `_redirects` file for SPA routing (already included in `public/`).

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Supabase Auth (OTP email verification)
- Google Sheets as CMS (published CSV)
- React Router v7

## Monetization

The directory collects verified emails and supports featured listings. Revenue options:

- **Sponsored listings** — charge tools/platforms for featured placement
- **Premium tiers** — offer enhanced listings with logos, longer descriptions
- **Newsletter** — monetize the verified email list with relevant offers
- **Affiliate links** — use affiliate URLs for tools that offer programs
