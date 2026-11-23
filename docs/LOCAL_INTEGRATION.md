# Connected local application

Backend: `/Users/vikasgayri/Downloads/fpc-bazaar-backend`
Frontend: `/Users/vikasgayri/Downloads/FPC-Bazaar-Federation-main`

Start each in a separate terminal:

```sh
cd /Users/vikasgayri/Downloads/fpc-bazaar-backend
python3 scripts/run-local.py
```

```sh
cd /Users/vikasgayri/Downloads/FPC-Bazaar-Federation-main
npm run dev -- --host 127.0.0.1
```

Open http://localhost:5173 and http://localhost:5173/admin. The API runs on localhost:8081, with an isolated persistent MongoDB on 127.0.0.1:27018. Use the admin credentials already in the backend's private `.env`; never copy them into Vite configuration. The real Atlas database is not used by the local runner.

The frontend's `.env.local` sets `VITE_API_URL=http://localhost:8081` and `VITE_DRAFT_MODE=true`. The backend's private `.env` explicitly sets `LOCAL_MAIL_SANDBOX=false`: real emails are sent for new events. For synthetic testing, stop the API and run `LOCAL_MAIL_SANDBOX=true python3 scripts/run-local.py` instead. Do not start a second copy if the ports are busy.

## Connected flows

- Public forms submit JSON or multipart documents to the backend, show validation errors and registration references.
- Registration reviews support status changes, rejection reasons, protected document downloads and one-time account details.
- Dashboard totals use scoped backend statistics.
- Users, enquiries, Excel exports, email queue status/retry and activity log use authenticated backend calls.
- Expired/invalid sessions return to sign-in; a temporary password requires changing before protected pages become available.
- Forgot-password requests use the backend; reset links open its dedicated reset page.
- Newly verified vendors refresh the public directory. Failed directory requests show a retry action on vendor detail pages.
- NGO registration is available in English and Hindi; FPO email is required to match the backend schema.

## Verification

Browser checks passed for contact submission, enquiry status updates, vendor submission with certificate upload, verification and public listing, users/audit/email screens, Excel download, protected document download, first-login password gate and Hindi NGO rendering. The downloaded PDF matched uploaded bytes and the Excel export was a valid XLSX archive. A real contact form email was submitted with live delivery enabled on 22 November 2026; see the handover report for provider delivery status. Backend Maven verification passed 41 tests; frontend production build passed.

Synthetic local accounts were disabled and the synthetic vendor was rejected after testing, retaining history. Atlas's five known demo accounts were disabled separately, retaining the real configured admin.

## Deployment preparation

Create `.env.production` with a real API origin (replace the example domain):

```dotenv
VITE_API_URL=https://api.YOUR-DOMAIN
VITE_DRAFT_MODE=false
```

Run `npm ci` and `npm run build`, then serve `dist/` with an SPA fallback (`try_files $uri $uri/ /index.html`). Vite variables are embedded at build time: rebuild when the API URL changes. **Do not deploy the local build with localhost API URLs.** No API keys or backend secrets belong in Vite variables.

The backend must use matching `FRONTEND_URL`, `CORS_ORIGINS` and HTTPS `PUBLIC_BASE_URL`, with `SEED_DEMO=false`, `MAIL_ENABLED=true` and `MAIL_SANDBOX=false`. Its `deploy/` folder contains API/frontend nginx and systemd/backup templates. Actual deployment still requires the server/SSH details, domains/DNS, TLS and offsite backup configuration.

Public business claims, phone numbers, photographs and static marketplace examples retain their existing verification flags. Draft mode is intentionally on locally. Technical integration does not confirm those business claims; review the existing content configuration before launch.
