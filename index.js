import express from 'express';
import cors from 'cors';
import "./DB/index.js";
import userRouter from './routes/userRouter.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({origin: "*" }));
app.use(express.json());

app.use('/users', userRouter);
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

