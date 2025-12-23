# Frontend (React + Vite)

Install:

```bash
cd frontend
npm install
```

Run (dev):

```bash
npm run dev
```

The frontend expects the API at `http://localhost:4000/api` or set `VITE_API_URL`.

Firebase Client setup (for auth):
- Create a Firebase project and enable Email/Password Authentication.
- In Project Settings, copy the Web app config values and set them in `frontend/.env`:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_APP_ID=...
```

The Auth UI is at `/auth`. When signed in the client will send the Firebase ID token to the backend in the `Authorization: Bearer <token>` header, which the backend verifies using Firebase Admin.

Important notes:
- Be sure to create `frontend/.env` (copy `.env.example`) and **restart** the dev server after editing env files.
- If you get 401s when calling `/api/me/*` endpoints, ensure the backend has a Firebase Service Account JSON configured and `FIREBASE_SERVICE_ACCOUNT_PATH` set in `backend/.env` (see `backend/README.md`).
- Use the Admin page `/admin` → "Check Health" to confirm both the backend and Firebase Admin are initialized.
