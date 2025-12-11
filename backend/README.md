
# Backend - User Document System

## Setup
1. Copy `.env.example` to `.env` and set MONGO_URI and email credentials.
2. `npm install`
3. `npm run dev` (requires nodemon) or `npm start`

APIs:
- POST /api/csv -> upload CSV (field name: file)
- GET /api/users -> list users
- POST /api/docs/create -> create PDF with JSON { title, content }
- POST /api/users/assign-pdf -> assign and email { userIds: [], pdfId }
- POST /api/users/download-zip -> download zip { userIds: [] }
