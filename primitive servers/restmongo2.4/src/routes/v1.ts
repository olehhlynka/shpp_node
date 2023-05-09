import express, {
  Request,
  Response,
  Router,
} from "express";

const router: Router = express.Router();

interface Todo {
  id: number;
  text: string;
  checked: boolean;
}

const todos: { items: Todo[] } = {
  items: [
    { id: 1, text: "Buy milk", checked: false },
    { id: 2, text: "Take out the trash", checked: true },
    { id: 3, text: "Walk the dog", checked: false },
    { id: 4, text: "Pay bills", checked: true },
    { id: 5, text: "Call mom", checked: false },
  ],
};
let lastId = 5;

router.get("/items", (req: Request, res: Response) => {
  res.send(todos);
});

router.post("/items", (req: Request, res: Response) => {
  const { text } = req.body;
  todos.items.push({
    id: ++lastId,
    text: text,
    checked: false,
  });
  res.send({ id: lastId });
});

router.put("/items", (req: Request, res: Response) => {
  const { id, text, checked } = req.body;
  const todo: Todo | undefined = todos.items.find(
    (el) => el.id === id
  );
  if (todo) {
    todo.text = text;
    todo.checked = checked;
    return res.send({ ok: true });
  }
  res.send({ ok: false });
});

router.delete("/items", (req: Request, res: Response) => {
  const { id } = req.body;
  const index = todos.items.findIndex((el) => el.id === id);
  if (index !== -1) {
    todos.items.splice(index, 1);
    return res.send({ ok: true });
  }
  res.send({ ok: false });
});

export { router };
