import { Router, Request, Response } from "express";
import { pool } from "../db";

const router = Router();


  // GET /cart/:userId
  // Fetch all cart items for a user
 
router.get("/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM cart_items WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
});


  // POST /cart
  // Add item to cart (or increment if exists)
 
router.post("/", async (req: Request, res: Response) => {
  const { user_id, item_id, name, price, image_url } = req.body;

  if (!user_id || !item_id || !name || !price || !image_url) {
    return res.status(400).json({
      error: "user_id, item_id, name, price and image_url are required",
    });
  }

  try {
    const existing = await pool.query(
      "SELECT * FROM cart_items WHERE user_id = $1 AND item_id = $2",
      [user_id, item_id]
    );

    if (existing.rowCount && existing.rowCount > 0) {
      const updated = await pool.query(
        `UPDATE cart_items
         SET quantity = quantity + 1
         WHERE user_id = $1 AND item_id = $2
         RETURNING *`,
        [user_id, item_id]
      );

      return res.json(updated.rows[0]);
    }

    const result = await pool.query(
      `INSERT INTO cart_items (user_id, item_id, name, price, image_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [user_id, item_id, name, price, image_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});


  // PUT /cart/:id
  // Update quantity
 
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (quantity < 1) {
    return res.status(400).json({ error: "Quantity must be at least 1" });
  }

  try {
    const result = await pool.query(
      `UPDATE cart_items
       SET quantity = $1
       WHERE id = $2
       RETURNING *`,
      [quantity, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update cart item" });
  }
});


  // DELETE /cart/:id
  // Remove item from cart
 
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM cart_items WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.json({ message: "Cart item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete cart item" });
  }
});

export default router;
