import express from 'express';
import userRoutes from './userRoutes/user.routes';
import bookRoutes from './bookRoutes/book.routes';
import adminRoutes from './adminRoutes/admin.routes';
import authRoutes from './authRoutes/auth.routes';

const router = express.Router()


router.use('/books', bookRoutes)
router.use('/users', userRoutes)
router.use('/admin', adminRoutes)
router.use('/auth', authRoutes)


export default router