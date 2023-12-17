import express from 'express';

import userController from '../controller/usersController.js';
const router = express.Router();

router.get('/get-user', userController.getUser);
router.get('/all-users/:id', userController.getAllUsers);
export default router;
