import express, { Router } from "express";
import itemsController from "../../controllers/v1/items";

const router: Router = express.Router();

router.get("/items", itemsController.getItems);

router.post("/items", itemsController.addItem);

router.put("/items", itemsController.editItem);

router.delete("/items", itemsController.deleteItem);

export default router;
