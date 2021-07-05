import { Router } from 'express';
import topicsRouter from './topic/routes';

const routes = Router();

routes.use('/topics', topicsRouter);

export default routes;
