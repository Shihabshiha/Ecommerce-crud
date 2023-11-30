import express from 'express'
import AppRouter from './routes.mjs';

const router = express.Router()

router.use('/api/v1/', AppRouter)

export default router;