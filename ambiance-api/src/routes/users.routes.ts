import { Router } from "express";
import { createUser, getUsers, getUserById } from "../controllers/users.controller";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);

export default router;