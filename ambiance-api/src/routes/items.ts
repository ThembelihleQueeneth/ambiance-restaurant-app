import { Router, Request, Response } from "express";
import { admin } from "../firebase";
import { supabase } from "../db";

const router = Router();

//  GET /items
router.get("/", async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

//  GET /items/:id
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return res.status(404).json({ error: "Item not found" });
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch item" });
  }
});

//  POST /items
router.post("/", async (req: Request, res: Response) => {
  const { name, price, description, image_url, category } = req.body;

  if (!name || !price || !image_url || !category) {
    return res.status(400).json({
      error: "name, price, image_url and category are required",
    });
  }

  try {
    const { data, error } = await supabase
      .from("items")
      .insert([{ name, price, description, image_url, category }])
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to create item" });
  }
});

//  PUT /items/:id
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, description, image_url, category } = req.body;

  try {
    const { data, error } = await supabase
      .from("items")
      .update({ name, price, description, image_url, category })
      .eq("id", id)
      .select()
      .single();

    if (error) return res.status(404).json({ error: "Item not found" });
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to update item" });
  }
});

//  DELETE /items/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("items")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "Item deleted successfully", deleted: data });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to delete item" });
  }
});

export default router;