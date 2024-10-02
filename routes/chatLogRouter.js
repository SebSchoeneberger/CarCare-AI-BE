import { Router } from 'express';
import { getChatLog, getChatLogs, createChatLog, updateChatLog, deleteChatLog  } from '../controllers/chatLog.js';
import validateJoi from '../middlewares/validateJoi.js';
import { chatLogSchema } from '../joi/schemas.js';

const chatLogRouter = Router();

chatLogRouter.route('/').get(getChatLogs).post(validateJoi(chatLogSchema.POST), createChatLog);

chatLogRouter.route('/:id').get(getChatLog).put(validateJoi(chatLogSchema.PUT), updateChatLog).delete(deleteChatLog);

export default chatLogRouter;