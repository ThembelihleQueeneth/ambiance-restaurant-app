import cors from 'cors'
import express from 'express'
import cartRoutes from './routes/cart.routes'
import itemsRoutes from './routes/items.routes'
import ordersRoutes from './routes/orders.routes'
import usersRoutes from './routes/users.routes'


const app = express()

app.use(cors())
app.use(express.json())

app.use('/items', itemsRoutes)
app.use('/orders', ordersRoutes)
app.use('/users', usersRoutes)
app.use('/cart', cartRoutes)

export default app