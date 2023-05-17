import { Request, Response } from "express";
import {
  getItems,
  addItem,
  editItem,
  deleteItem,
} from "../db/connection";
import { Todo } from "../types/types";

class ItemsController {
  async getItems(req: Request, res: Response) {
    try {
      if (!req.session.user) {
        return res.status(403).json({ error: "forbidden" });
      }
      const todos: Todo[] = await getItems(
        req.session.user!
      );
      res.json({ items: todos });
    } catch (error) {
      res
        .status(500)
        .json({ error: "internal server error" });
    }
  }

  async addItem(req: Request, res: Response) {
    try {
      const { text } = req.body;
      if (!req.session.user) {
        return res.status(403).json({ error: "forbidden" });
      }
      if (!text) {
        return res
          .status(400)
          .json({ error: "empty field error" });
      }
      const id = await addItem(text, req.session.user);
      res.json({ id: id });
    } catch (error) {
      res
        .status(500)
        .json({ error: "internal server error" });
    }
  }

  async editItem(req: Request, res: Response) {
    try {
      const { id, text, checked } = req.body;
      if (!(id && text)) {
        return res
          .status(400)
          .json({ error: "empty field error" });
      }
      if (!req.session.user) {
        return res.status(403).json({ error: "forbidden" });
      }
      const result = await editItem(
        req.session.user,
        id,
        text,
        checked
      );
      if (result) {
        return res.json({ ok: true });
      }
      res.json({ ok: false });
    } catch (error) {
      res
        .status(500)
        .json({ error: "internal server error" });
    }
  }

  async deleteItem(req: Request, res: Response) {
    try {
      const { id } = req.body;
      if (!id) {
        return res
          .status(400)
          .json({ error: "empty field error" });
      }
      if (!req.session.user) {
        return res.status(403).json({ error: "forbidden" });
      }
      const result = await deleteItem(id, req.session.user);
      if (result) {
        return res.json({ ok: true });
      }
      res.json({ ok: false });
    } catch (error) {
      res
        .status(500)
        .json({ error: "internal server error" });
    }
  }
}

export default new ItemsController();
