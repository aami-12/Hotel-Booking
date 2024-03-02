import express from 'express'
import verifyToken from '../middlewares/auth'
import { myBookings } from '../controllers/booking'

const router = express.Router()

router.get('/',verifyToken,myBookings)

export default router