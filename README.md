# Muse Maker Free

A fully functional app with a modern TypeScript frontend, Express backend, and simple deployment workflow.

## Development

```bash
# Start backend
cd server
npm install
npm run dev

# Start frontend (in project root)
npm install
npm run dev
```

## Production (Docker)

```bash
docker build -t muse-maker .
docker run -p 4000:4000 muse-maker
```

## API Endpoints

- `GET /api/health`: Health check

## Deployment

Ready for any container platform (Docker, Railway, Render, etc).

---

## Environment Variables

- `PORT` (optional): server port

## Technologies Used

- Vite
- TypeScript
- React
- Express
- Tailwind CSS

## Contributing

PRs and issues welcome!