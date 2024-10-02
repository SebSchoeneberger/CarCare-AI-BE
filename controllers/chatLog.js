import ChatLog from "../Models/ChatLog.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import { isValidObjectId } from "mongoose";
import User from "../Models/User.js";

export const getChatLogs = asyncHandler(async (req, res, next) => {
  const chatLogs = await ChatLog.find();
  res.status(200).json({ success: true, data: chatLogs });
});

export const getChatLog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const chatLog = await ChatLog.findById(id);
  if (!chatLog) throw new ErrorResponse(`ChatLog with id ${id} not found`, 404);
  res.status(200).json({ success: true, data: chatLog });
});

export const createChatLog = asyncHandler(async (req, res, next) => {
    const { userId, messages } = req.body;
    
    if (!userId || !messages) throw new ErrorResponse("Please provide all required fields", 400);
    
    const chatLog = await ChatLog.create({ userId, messages });
    
    await User.findByIdAndUpdate(
        userId,
        { $push: { chatLogsId: chatLog._id } },
        { new: true }
    );
    
    res.status(201).json({ success: true, data: chatLog });
    });

export const updateChatLog = asyncHandler(async (req, res, next) => {
    const {
        params: { id },
        body: { userId, messages }
    } = req;
    
    if (!isValidObjectId(id)) throw new ErrorResponse(`ChatLog with id ${id} not found`, 404);
    
    const chatLog = await ChatLog.findByIdAndUpdate(id, { userId, messages }, { new: true });
    
    if (!chatLog) throw new ErrorResponse(`ChatLog with id ${id} not found`, 404);
    
    res.status(200).json({ success: true, data: chatLog });
    });

export const deleteChatLog = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    
        if (!isValidObjectId(id)) throw new ErrorResponse(`ChatLog with id ${id} not found`, 404);
    
        const chat = await ChatLog.findByIdAndDelete(id);
        if (!chat) throw new ErrorResponse(`ChatLog with id ${id} not found`, 404);
        
        res.status(200).json({ success: `ChatLog with id of ${id} was deleted`});
    });