import { Request, Response } from 'express'
import * as service from '../services/cart.service'

export const getCart = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId as string
        const data = await service.getCart(userId)
        res.json(data)
    } catch (error: any) {
        res.status(500).json({ error: error.message || error })
    }
}

export const createCart = async (req: Request, res: Response) => {
    try {
        const data = await service.createCart(req.body)
        res.json(data)
    } catch (error: any) {
        console.error("Create Cart Error:", error)
        res.status(500).json({ error: error.message || error })
    }
}

export const updateCart = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const data = await service.updateCart(id, req.body)
        res.json(data)
    } catch (error: any) {
        res.status(500).json({ error: error.message || error })
    }
}

export const deleteCart = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const data = await service.deleteCart(id)
        res.json(data)
    } catch (error: any) {
        res.status(500).json({ error: error.message || error })
    }
}