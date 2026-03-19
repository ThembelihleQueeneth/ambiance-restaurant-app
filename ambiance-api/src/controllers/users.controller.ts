import { Request, Response } from "express";
import * as service from "../services/users.service";

export const createUser = async (req: Request, res: Response) => {
    try {
        const data = await service.createUser(req.body);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to create user" });
    }
};