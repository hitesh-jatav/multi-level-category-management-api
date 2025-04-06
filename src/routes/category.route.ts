import { Router } from "express";
import {
  createCategory,
  getCategoryTree,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";
import { authenticate } from "../middleware/auth.middleware";
const router = Router();

router.post("/", authenticate, createCategory);
router.get("/", authenticate, getCategoryTree);
router.put("/:id", authenticate, updateCategory);
router.delete("/:id", authenticate, deleteCategory);

export default router;
