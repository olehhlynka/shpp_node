import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { loginUser, registerUser } from "../db/connection";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      if (req.session.user) {
        return res.status(403).json({ error: "forbidden" });
      }
      const { login, pass } = req.body;
      if (login && pass) {
        const userLogin = await loginUser(login, pass);
        if (userLogin) {
          req.session.user = userLogin;
          return res.send({ ok: true });
        }
      }
      res.send({ ok: false });
    } catch (error) {
      res
        .status(500)
        .json({ error: "internal server error" });
    }
  }

  async register(req: Request, res: Response) {
    try {
      if (req.session.user) {
        return res.status(403).json({ error: "forbidden" });
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ error: "registration error" });
      }
      const { login, pass } = req.body;
      if (login && pass) {
        const userLogin = await registerUser(login, pass);
        if (userLogin) {
          return res.send({ ok: true });
        }
      }
      res.send({ ok: false });
    } catch (error) {
      res
        .status(500)
        .send({ error: "internal server error" });
    }
  }

  logout(req: Request, res: Response) {
    try {
      if (!req.session.user) {
        return res.status(403).send({ error: "forbidden" });
      }
      req.session.destroy(() => {
        console.log(`Session was destroyed`);
      });
      res.send({ ok: true });
    } catch (error) {
      res
        .status(500)
        .send({ error: "internal server error" });
    }
  }
}

export default new AuthController();
