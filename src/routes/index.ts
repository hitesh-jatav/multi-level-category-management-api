// src/routes/indexRoutes.ts
import { Router } from "express";
import AuthRoutes from "./auth.route";
import CategoryRoute from "./category.route";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/category", CategoryRoute);

export default router;
