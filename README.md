# FPC Bazaar Federation — Frontend

A bilingual (English / Hindi) React frontend for the FPC Bazaar Federation website.

## Current scope
- Frontend only. Backend, database, admin panel and authentication are not included.
- Backend integration is kept separate in `src/services/formService.js`.
- Backend handoff contract for Ankit: `docs/ANKIT_BACKEND_HANDOFF.md`.
- The primary homepage focus is the proposed Gaushala development and rural tourism model.
- Unverified claims remain behind verification flags in `src/config/site.js`.

## Redesign additions
- Product Marketplace (`/marketplace`), Supplier Directory (`/suppliers`), Product Sourcing (`/sourcing`), Business Connect (`/business-connect`) and Events (`/events`), all in English and Hindi.
- Sample listings in `src/data/marketplace.js` (hidden when `VITE_DRAFT_MODE=false`). See `docs/BUSINESS_CONNECT_FORMS.md` for the four new form keys the backend must support.
- New dependencies: `@fontsource/fraunces`, `@fontsource/noto-serif-devanagari`. Run `npm install` after pulling.

## Images (fast loading)
Photos are served as small WebP files sized for each screen, with a blurred preview while they load.
After adding or replacing any photo in `public/images` or `src/assets/gallery`, run:
```bash
npm run images
```
This writes `public/images/opt/` and `src/data/image-manifest.json` (commit both). Originals are never changed.
A photo that was not processed still shows, just without the speed-up.

## Animations
Framer Motion (`src/components/motion/`): hero photo slideshow, horizontal initiatives rail, animated filter grids,
mobile menu drawer, gallery lightbox and admin detail drawer. Scroll reveals and counters are CSS (`Reveal`, `CountUp`).
Everything respects the visitor's "reduce motion" setting.

## Technology
- React + Vite
- Tailwind CSS
- React Router
- i18next / react-i18next
- Axios (frontend API client)

## Run locally
```bash
npm install
cp .env.example .env
npm run dev
```
Open the local URL printed by Vite (normally `http://localhost:5173`).

Production build:
```bash
npm run build
npm run preview
```

## Folder structure
```text
fpc/
├── public/
│   ├── images/                 # Client-approved project photos only
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/             # Reusable UI, header, footer, forms
│   ├── config/                 # Site settings, navigation, form schemas
│   ├── i18n/                   # English and Hindi copy + language hooks
│   ├── lib/                    # SEO and small frontend utilities
│   ├── pages/                  # One page component per route
│   ├── services/               # Frontend API boundary (no backend code)
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── docs/
│   └── ANKIT_BACKEND_HANDOFF.md
├── .env.example
├── .gitignore
├── package.json
└── package-lock.json
```

## Where to edit
| Need | File |
|---|---|
| English website copy | `src/i18n/en.js` |
| Hindi website copy | `src/i18n/hi.js` |
| Phone, email, CIN, verification flags, image slots | `src/config/site.js` |
| Form fields | `src/config/forms.js` |
| Form API connection | `src/services/formService.js` |
| Shared components | `src/components/` |
| Individual pages | `src/pages/` |
| Brand colours | `tailwind.config.js` |
| Approved photos | `public/images/` |

See `docs/CLIENT_CONTENT_CHECKLIST.md` for the claims, contact details, leadership details and legal documents that need client confirmation.\n\n## Images and verification
Do not present placeholder visuals as real project photographs. Add only client-approved photographs and map them to slots in `src/config/site.js`.

The `Verify` component and flags in `src/config/site.js` mark claims requiring client evidence or permission. Keep a flag disabled until the supporting document or written approval is available. In particular, verify government support, FPO network claims, Amul branding/permission, product claims, investment or buyback promises, contact details and leadership photo consent.

## Forms
Without `VITE_API_URL`, forms run in demo mode and store submissions only in the current browser. This is not production form handling. Coordinate endpoint behaviour with Ankit using `docs/ANKIT_BACKEND_HANDOFF.md`.

## Before launch
- Replace all photo placeholders with approved real photographs.
- Confirm official organisation name and contact details.
- Confirm legal classification and registration wording against official documents.
- Review Hindi copy with a fluent Hindi reader.
- Set `VITE_DRAFT_MODE=false` only after all displayed claims have been verified.
- Connect and test the backend endpoints.
