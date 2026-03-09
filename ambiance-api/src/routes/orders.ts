import { Router, Request, Response } from "express";
import pool from "../db";

const router = Router();

// POST /orders/checkout
router.post("/checkout", async (req: Request, res: Response) => {
  const { user_id } = req.body;

  try {
    // Get cart items
    const cartItems = await pool.query("SELECT * FROM cart WHERE user_id = $1", [user_id]);
    if (cartItems.rowCount === 0) return res.status(400).json({ error: "Cart is empty" });

    // Calculate total
    const total = cartItems.rows.reduce(
      (sum, item) => sum + item.quantity * 1, // replace 1 with actual item price if joined
      0
    );

    // Create order
    const order = await pool.query(
      `INSERT INTO orders (user_id, total_price)
       VALUES ($1, $2)
       RETURNING *`,
      [user_id, total]
    );

    // Insert order items
    for (const item of cartItems.rows) {
      await pool.query(
        `INSERT INTO order_items (order_id, item_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [order.rows[0].id, item.item_id, item.quantity, 0] // replace 0 with actual price snapshot
      );
    }

    // Clear cart
    await pool.query("DELETE FROM cart WHERE user_id = $1", [user_id]);

    res.status(201).json({ order: order.rows[0] });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;