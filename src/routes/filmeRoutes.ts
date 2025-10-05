import { Router } from 'express';
import { filmeController } from '../controllers/filmeController';

const router = Router();

router.get('/filmes', filmeController.getAll);
router.get('/filmes/:id', filmeController.getById);
router.post('/filmes', filmeController.create);
router.put('/filmes/:id', filmeController.update);
router.delete('/filmes/:id', filmeController.delete);

export default router;
