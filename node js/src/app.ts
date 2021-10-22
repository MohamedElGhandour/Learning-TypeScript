import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import todoRoute from "./routes/todos";

const app = express();

const port = 4000 || process.env.PORT;

app.get("/", (_req, res) => {
  res.send("Hi guys I'm from Node TS");
});

app.use(bodyParser.json());

app.use("/todos", todoRoute);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`serve from http://localhost:${port}`);
});
