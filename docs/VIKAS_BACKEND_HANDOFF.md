# Backend integration handoff (frontend contract only)

This repository currently contains the frontend. Backend implementation, database, authentication and admin dashboard are intentionally out of scope and will be handled separately by Ankit.

## Existing form integration point
- Frontend service: `src/services/formService.js`
- Form schemas: `src/config/forms.js`
- Form UI: `src/components/FormEngine.jsx`
- API base URL: `VITE_API_URL` in the frontend `.env` file
- If `VITE_API_URL` is empty, forms run in browser-only demo mode. They do not send data to a server.

## Expected endpoint
`POST {VITE_API_URL}/api/forms/{formKey}`

Supported `formKey` values:
- `contact`
- `register`
- `eauto`
- `amul`
- `investor`
- `product`

The frontend sends the submitted field values plus:
- `lang` — `en` or `hi`
- `consent` — boolean
- `page` — page/path from which the form was submitted

The backend should validate all fields server-side, enforce rate limits, sanitize inputs, apply spam protection, and return a consistent JSON response. Never rely on browser-side validation alone.

## Important coordination
1. Vikas should confirm the final API response and error format before changing `formService.js`.
2. Keep backend secrets and database credentials out of this frontend repository.
3. Do not put admin credentials, API secrets or private keys in `VITE_*` variables; Vite exposes those values to the browser.
4. Use HTTPS in production.
5. Confirm the final organisation contact details and approved content with the client before launch.

## Current limitation
No backend endpoint is included or assumed. The demo form mode stores submissions only in the current browser's local storage and is for UI review, not production use.
