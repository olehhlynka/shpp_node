import express, {
  Router,
  Request,
  Response,
} from "express";
import authController from "../controllers/auth";
import itemsController from "../controllers/items";

const router: Router = express.Router();

router.post("/router", (req: Request, res: Response) => {
  try {
    const query = req.query.action as string;
    switch (query) {
      case "login":
        authController.login(req, res);
        break;
      case "register":
        authController.register(req, res);
        break;
      case "logout":
        authController.logout(req, res);
        break;
      case "getItems":
        itemsController.getItems(req, res);
        break;
      case "addItem":
        itemsController.addItem(req, res);
        break;
      case "editItem":
        itemsController.editItem(req, res);
        break;
      case "deleteItem":
        itemsController.deleteItem(req, res);
        break;
      default:
        res.status(400).json({ error: "bad request" });
    }
  } catch (error) {
    res.status(400).json({ error: "bad request" });
  }
});

export default router;
