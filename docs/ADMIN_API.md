# Admin panel and registration API (contract for the backend team)

The frontend ships with a working admin panel (`/admin`) and registration forms. Without `VITE_API_URL` they run in **demo mode** (browser storage, sample data, demo logins). Set `VITE_API_URL` and the same screens call the endpoints below. The backend itself is not part of this project.

## Roles (hierarchy)
`admin` > `state_head` > `project_head` > `vendor` > `fpo`

| Role | Sees | Can verify / reject |
|---|---|---|
| admin | everything | yes |
| state_head | records of their state | yes |
| project_head | records of their state | view only (change `ROLES` in `src/services/registry.js` if they should decide) |
| vendor, fpo | only their own record and status | no |

The backend must enforce this. The frontend only hides screens.

## Public forms
`POST /api/forms/{formKey}`: JSON when there is no file, `multipart/form-data` when a file is attached (text fields as parts, files as parts with the field name below). Max 5 MB per file, PDF/JPG/PNG. Creates a record with `status = pending`. Every form also sends `lang`, `consent`, `page`.

| formKey | Fields | Files |
|---|---|---|
| `fpo` | fpoName, state, district, cin, kisanCount, odop, name (contact), phone, email | certificate, pan, boardResolution (all required) |
| `vendor` | companyName, gst, turnover, productCategory, supplyState, state, district, name (contact), phone, email, about, productList, pastWork | logo (optional), certificate (required) |
| `projecthead` | name, phone, email, experience, state, projectType (`dairy`, `greenhouse`, `bazar`), message | none |
| `member` | name, phone, email, state, organisation | feeSlip (required) |
| `job` | name, phone, email, position, location, qualification, message | resume (required) |

`state` and `supplyState` are state keys: `rajasthan, gujarat, mp, maharashtra, chhattisgarh, jharkhand, odisha, haryana, punjab, up, uttarakhand, goa, andhra, telangana, tn, karnataka, puducherry, jk`. `productCategory` is one of `grains, produce, spices, dairy, inputs, processed, equipment, feed`.

Other existing forms (contact, register, quote, supplier, sourcing, connect, ...) are unchanged. NGO registrations have no public form yet; the rejection dashboard already has an NGO tab (`kind = ngo`).

## Auth
`POST /api/auth/login` `{ username, password }` returns `{ token, role, name, state?, recordId? }` (`recordId` for vendor/fpo users). Send `Authorization: Bearer <token>` on admin calls.

## Admin
- `GET /api/admin/registrations?kind=&status=&state=&q=` returns `{ items: [Record] }`, already filtered by the caller's role scope.
- `PATCH /api/admin/registrations/{id}` `{ status: "verified"|"rejected"|"pending", reason }`. `reason` is mandatory for `rejected`. Store `decidedAt` and `decidedBy`.
- `GET /api/admin/registrations/{id}/files/{key}` streams the uploaded document (the panel opens it in a new tab, token also accepted as `?token=`).

Record shape: `{ id, kind: fpo|vendor|ngo|projecthead|member|job, status, reason, state, name, slug?, createdAt, decidedAt, decidedBy, data: {district, cin, kisanCount, odop, contact, phone, gst, ...}, files: { certificate: "file name", ... } }`

## Public (only Verified)
- `GET /api/public/vendors` returns `{ items: [Record] }` of **verified** vendors only, with `slug` (SEO friendly, e.g. `/vendor/aravali-bio-inputs`) and optional `logoUrl`.
- Pending and rejected records must never be returned by any public endpoint. Rejected lists exist only in the admin panel.

## Not built here (needs backend)
Real authentication and password storage, file storage and virus scan, email/SMS on verify or reject, audit log.