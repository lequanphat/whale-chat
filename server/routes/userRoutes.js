import express from 'express'
import {register, login, setAvatarImage, getAllUsers} from '../controller/usersController.js';
const router = express.Router();
router.post("/register", register)
router.post("/login", login)
router.post("/set-avatar/:id", setAvatarImage)
router.get("/all-users/:id", getAllUsers)
export default router;