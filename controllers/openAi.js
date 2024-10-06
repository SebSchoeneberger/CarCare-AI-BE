import { openAiResponse } from "../openAi/openAi.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const chatCompletion = asyncHandler(async (req, res, next) => {
    const { prompt  } = req.body;
    
    if (!prompt) throw new ErrorResponse("Please provide all required fields", 400);
    
    const aiResponse = await openAiResponse(prompt);
    
    res.status(200).json({ success: true, data: aiResponse });
    });