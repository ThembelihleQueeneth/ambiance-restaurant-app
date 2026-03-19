import { Request, Response } from "express";
import * as service from "../services/users.service";

export const createUser = async (req: Request, res: Response) => {
    try {
        const data = await service.createUser(req.body);
        res.status(201).json(data);
    } catch (err: any) {
        console.error("Create User Error:", err);
        res.status(500).json({ error: err.message || "Failed to create user" });
    }
};

export const getUsers = async (_req: Request, res: Response) => {
    try {
        const data = await service.getUsers();
        res.json(data);
    } catch (err: any) {
        console.error("Get Users Error:", err);
        res.status(500).json({ error: err.message || "Failed to fetch users" });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = await service.getUserById(id as string);
        res.json(data);
    } catch (err: any) {
        console.error("Get User Error:", err);
        res.status(500).json({ error: err.message || "Failed to fetch user" });
    }
};