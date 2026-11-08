import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import ideasRoutes from './routes/ideas.routes.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()
app.disable('x-powered-by')
app.use(cors({
  origin(origin, callback) {
    const allowed = process.env.FRONTEND_ORIGIN || 'http://localhost:5173'
    if (!origin || origin === allowed) return callback(null, true)
    callback(Object.assign(new Error(), { status: 403, publicMessage: 'Este origen no está permitido.' }))
  },
  methods: ['GET', 'POST', 'OPTIONS'],
}))
app.use(express.json({ limit: '64kb' }))
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))
app.use('/api/ideas', ideasRoutes)
app.use((_req, res) => res.status(404).json({ error: 'La ruta solicitada no existe.' }))
app.use(errorHandler)
export default app
