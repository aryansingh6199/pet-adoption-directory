# Pet Adoption Backend (Refactored)

This refactor adds:
- Strong validation (petName, breed, age, imageUrl)
- Specific error messages and centralized error handler
- Request validation middleware using `express-validator`
- Input sanitization (XSS, NoSQL injection) and security hardening
- CORS restricted to the configured frontend origin
- Consistent formatting with ESLint (2-space indentation)

## Endpoints
- `GET /health` – health check
- CRUD under `/api/pets`

## Setup
1. Copy `.env.example` to `.env` and set values.
2. Install deps: `npm install`
3. Run: `npm run dev`

## Notes
- Only exact `FRONTEND_ORIGIN` is allowed by CORS. In dev, tools without Origin header (Postman) are allowed.
- Mongoose validators and express-validator ensure strict field validation.
