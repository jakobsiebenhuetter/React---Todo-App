import express from "express";

import dbInit from "./db/init.ts";

const app = express();
const port = Number(process.env.PORT) || 3000;

dbInit();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World from Server :-)");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
