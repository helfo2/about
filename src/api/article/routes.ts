import { Router } from 'express';
import controller from './controller';

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.post('/', controller.create);
router.patch('/:id', controller.patch);
router.delete('/:id', controller._delete);
router.put('/:id/add-like', controller.addLike);
router.put('/:id/publish', controller.publish);

export default router;
