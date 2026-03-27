import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import regionsRouter from './routes/regions';
import predictionsRouter from './routes/predictions';
import solutionsRouter from './routes/solutions';
import chatRouter from './routes/chat';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/api/regions', regionsRouter);
app.use('/api/predictions', predictionsRouter);
app.use('/api/solutions', solutionsRouter);
app.use('/api/chat', chatRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
