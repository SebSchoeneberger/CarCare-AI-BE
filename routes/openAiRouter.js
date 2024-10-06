import { Router } from "express";
import { chatCompletion } from "../controllers/openAi.js";

const openAiRouter = Router();

openAiRouter.route("/completion").post(chatCompletion);

export default openAiRouter;