import express from 'express';
import { getAllMessages, sendMessage } from '../controllers/messageControllers.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();

router.post("/", isAuth, sendMessage);

router.post("/:id", isAuth, getAllMessages);

export default router;
