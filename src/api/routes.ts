import { Router } from 'express';
import topicsRouter from './topic/routes';
import articlesRouter from './article/routes';

const routes = Router();

routes.use('/topics', topicsRouter);
routes.use('/articles', articlesRouter);

export default routes;
