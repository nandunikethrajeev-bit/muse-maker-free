import { Router } from "express";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

// Add more routes here (e.g., /users, /muse, etc)

export default router;