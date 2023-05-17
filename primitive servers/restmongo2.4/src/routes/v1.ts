import express, { Router } from "express";
import itemsRouter from "./v1/items";
import authRouter from "./v1/auth";

const router: Router = express.Router();

router.use(itemsRouter);
router.use(authRouter);

export default router;
