import { Router, Request, Response } from "express";
import pool from "../db";

const router = Router();

// POST /reviews
router.post("/", async (req: Request, res: Response) => {
  const { user_id, item_id, rating, comment } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO reviews (user_id, item_id, rating, comment)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [user_id, item_id, rating, comment]
    );
    res.status(201).json(result.rows[0]);
  } catch {
    res.status(500).json({ error: "Failed to add review" });
  }
});

export default router;