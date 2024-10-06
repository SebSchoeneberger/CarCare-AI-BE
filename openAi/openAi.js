import OpenAI from 'openai';
import dotenv from 'dotenv';
import ErrorResponse from '../utils/ErrorResponse.js';

dotenv.config();

const openai = new OpenAI();

export const openAiResponse = async (prompt) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 100,
    });
    return completion.choices[0].message.content;
} catch (error) {
    console.error("Error with OpenAi API: ", error);
    throw new ErrorResponse("Error with OpenAi API", 500);
};
};
