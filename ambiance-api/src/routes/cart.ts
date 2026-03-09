import { Router, Request, Response } from "express";
import pool from "../db";

const router = Router();

// GET /cart/:userId
router.get("/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM cart WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// POST /cart
router.post("/", async (req: Request, res: Response) => {
  const { user_id, item_id, quantity } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO cart (user_id, item_id, quantity)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [user_id, item_id, quantity || 1]
    );
    res.status(201).json(result.rows[0]);
  } catch {
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

// DELETE /cart/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM cart WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Removed from cart" });
  } catch {
    res.status(500).json({ error: "Failed to remove item" });
  }
});

export default router;