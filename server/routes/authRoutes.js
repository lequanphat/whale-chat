import express from 'express';
import authController from '../controller/authController.js';
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/refresh-token', authController.refreshToken);

export default router;
