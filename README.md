# Squares

This repository implements the Wizardworks programming task:
- React frontend that dynamically adds colored squares in a roughly square layout.
- .NET 7 backend API that persists squares (position and color) to a JSON file and returns saved state on load.

## How this follows the PDF spec
- Each click on **Lägg till ruta** generates a random color that is guaranteed **not** to equal the previous square's color.
- The frontend computes a square grid and places squares by index so layout is deterministic.
- Backend saves `id`, `index` (position), and `color` for each square into `backend/data/squares.json`.
- Backend performs atomic writes and uses a semaphore to avoid concurrent write corruption.

## Quickstart

### Backend (.NET 7)
```bash
cd backend
dotnet restore
dotnet run
```
API endpoints (default `http://localhost:5000`):
- `GET /api/squares` - returns array of saved squares
- `POST /api/squares` - accepts `{ "color": "#rrggbb" }`, returns saved square `{ id, index, color }`

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Default dev server: `http://localhost:5173`. Frontend uses `VITE_API_URL` from `.env` to point to the backend.
