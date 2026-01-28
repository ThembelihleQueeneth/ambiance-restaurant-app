import express from "express";
import cors from "cors";
import itemsRoutes from "./routes/items";
import cartRoutes from "./routes/cart";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Ambiance API running 🚀");
});

app.use("/items", itemsRoutes);
app.use("/cart", cartRoutes);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
