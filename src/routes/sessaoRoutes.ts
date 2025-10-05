import { Router } from "express";
import * as sessaoController from "../controllers/sessaoController";

const router = Router();

router.get("/", sessaoController.getAll);
router.get("/:id", sessaoController.getById);
router.post("/", sessaoController.create);
router.put("/:id", sessaoController.update);
router.delete("/:id", sessaoController.remove);

export default router;
