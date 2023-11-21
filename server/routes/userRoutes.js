import express from 'express'
import usersController from '../controller/usersController.js';
const router = express.Router();
router.post("/register", usersController)

export default router;