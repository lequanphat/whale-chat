import express from 'express';
import authController from '../controller/authController.js';
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/refresh-token', authController.refreshToken);
router.post('/forgot-password', authController.forgotPassword);
router.post('/change-password', authController.changePassword);
router.get('/verify-account/:id/:code', authController.verifyAccount);
router.get('/change-password/:id/:code', authController.verifyChangePassword);

export default router;
