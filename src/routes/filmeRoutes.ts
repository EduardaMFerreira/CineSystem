import { Router } from 'express';
import { filmeController } from '../controllers/filmeController';

const router = Router();

router.get('/', filmeController.getAll);
router.get('/:id', filmeController.getById);
router.post('/', filmeController.create);
router.put('/:id', filmeController.update);
router.delete('/:id', filmeController.delete);
export default router;
