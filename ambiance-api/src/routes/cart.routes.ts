import { Router } from 'express'
import {
    getCart,
    createCart,
    updateCart,
    deleteCart
} from '../controllers/cart.controller'

const router = Router()

router.get('/:userId', getCart)
router.post('/', createCart)
router.put('/:id', updateCart)
router.delete('/:id', deleteCart)

export default router