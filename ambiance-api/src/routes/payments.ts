import { Router, Request, Response } from "express";
import pool from "../db";

const router = Router();

// POST /payments
router.post("/", async (req: Request, res: Response) => {
  const { order_id, amount, method } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO payments (order_id, amount, method)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [order_id, amount, method]
    );
    res.status(201).json(result.rows[0]);
  } catch {
    res.status(500).json({ error: "Failed to record payment" });
  }
});

export default router;