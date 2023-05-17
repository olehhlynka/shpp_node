import express, { Router } from "express";
import { check } from "express-validator";
import authController from "../../controllers/auth";

const router: Router = express.Router();

router.post("/login", authController.login);

router.post("/logout", authController.logout);

router.post(
  "/register",
  [
    check("login", "Username can't be empty")
      .notEmpty()
      .isEmail(),
    check("pass", "Lenght 6-10").isLength({
      min: 6,
      max: 10,
    }),
  ],
  authController.register
);

export default router;
