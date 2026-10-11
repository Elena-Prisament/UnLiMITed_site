# UnLiMITed

MERN stack starter with a React/Vite client and an Express/Mongoose API.

## Setup

```bash
npm run install:all
npm install
cp server/.env.example server/.env
npm run dev
```

Open `http://localhost:5173`. The API runs on `http://localhost:5050`.

MongoDB is optional for the initial shell. Add a `MONGO_URI` to `server/.env` to enable the database connection; the `/api/health` endpoint reports its state.
