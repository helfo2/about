import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './api/routes';
import logger from './logger';
import { initialize } from './persistence/cache';

const api = express();
api.use(cors());
api.use(express.json());
api.use(router);

(async (): Promise<void> => {
  await mongoose.connect('mongodb+srv://root:FKyKPwT5C1TsXOXI@cluster0.mehso.mongodb.net/about?retryWrites=true&w=majority',
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

  await initialize();

  const port = process.env.PORT || 3000;
  api.listen(port, () => {
    logger.info(`Started and succesfully listening on port ${port}`);
  });
})();
