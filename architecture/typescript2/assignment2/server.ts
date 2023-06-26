import express, {
  Express,
  Request,
  Response,
} from "express";

enum Button {
  PLUS,
  MINUS,
}

let counterPlus = 0;
let counterMinus = 0;

const app: Express = express();

app.use(express.static("public"));
app.use(express.json());

app.post("/", (req: Request, res: Response) => {
  const button: Button = req.body.button;
  switch (button) {
    case Button.PLUS: {
      counterPlus++;
      break;
    }
    case Button.MINUS: {
      counterMinus++;
      break;
    }
    default:
      break;
  }
  console.log(counterPlus);
  res.send({ plus: counterPlus, minus: counterMinus });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
