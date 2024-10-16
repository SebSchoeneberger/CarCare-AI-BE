import express from 'express';
import cors from 'cors';
import "./DB/index.js";
import userRouter from './routes/userRouter.js';
import carRouter from './routes/carRouter.js';
import errorHandler from './middlewares/errorHandler.js';
import chatLogRouter from './routes/chatLogRouter.js';
import serviceHistoryRouter from './routes/serviceHistoryRouter.js';
import openAiRouter from './routes/openAiRouter.js';
import authRouter from './routes/authRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*',
}));

app.use(express.json());

app.use('/users', userRouter);
app.use('/cars', carRouter);
app.use('/chatLogs', chatLogRouter);
app.use('/serviceHistories', serviceHistoryRouter);
app.use('/openAi', openAiRouter);
app.use('/auth', authRouter);

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`CarCare Ai App Backend running at http://localhost:${PORT}`);
});

