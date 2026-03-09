import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cartRoutes from "./routes/cart";
import itemsRoutes from "./routes/items";
import ordersRouter from "./routes/orders";
import paymentsRouter from "./routes/payments";
import reviewsRouter from "./routes/reviews";

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Ambiance API running 🚀");
});

app.use("/items", itemsRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", ordersRouter);
app.use("/payments", paymentsRouter);
app.use("/reviews", reviewsRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
