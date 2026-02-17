import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from './middlewares/logger.js';
import routes from './routes/index.js';
import { errorResponse } from './utils/responseHelper.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to Chill API',
    version: '1.0.0'
  });
});

app.use((req, res) => {
  errorResponse(res, 'Route not found', 404);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  errorResponse(res, 'Internal Server Error', 500);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
