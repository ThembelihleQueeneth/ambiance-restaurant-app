import { Router } from 'express'
import {
    getCart,
    createCart,
    updateCart,
    deleteCart
} from '../controllers/cart.controller'

const router = Router()

router.post('/', createCart)
router.get('/:userId', getCart)
router.put('/:id', updateCart)
router.delete('/:id', deleteCart)

export default router