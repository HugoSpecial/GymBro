import express from 'express';
import AuthController from '../controllers/authController.js';

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/send-pass-reset-code', AuthController.sendPasswordResetEmail);
router.post('/verify-pass-reset-code', AuthController.verifyResetPasswordOtp);
router.post('/reset-password', AuthController.resetPassword);

export default router;
