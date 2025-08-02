import express from 'express';
import UserController from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/me", authMiddleware, UserController.getUser);
router.put("/me-update", authMiddleware, UserController.updateUser);
router.delete("/me-delete", authMiddleware, UserController.deleteUserAccount);

export default router;