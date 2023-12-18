import express from 'express';
import messagesController from '../controller/messagesController.js';
const router = express.Router();
router.post('/add-message', messagesController.addMessage);
router.post('/get-all-messages', messagesController.getAllMessages);
export default router;
