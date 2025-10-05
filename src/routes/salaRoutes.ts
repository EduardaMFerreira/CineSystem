import { Router } from "express";
import * as salaController from "../controllers/salaController";

const router = Router();

router.get("/", salaController.getAll);
router.get("/:id", salaController.getById);
router.post("/", salaController.create);
router.put("/:id", salaController.update);
router.delete("/:id", salaController.remove);

export default router;
