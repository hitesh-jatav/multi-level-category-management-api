import express, { Request, Response, Router } from "express";
import { login, register } from "../controllers/auth.controller";

const router: Router = express.Router(); // Create an Express Router instance

router.post("/login", login);
router.post("/register", register);

export default router;
