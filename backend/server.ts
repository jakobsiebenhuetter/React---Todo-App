import express from "express";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World from Server :-)");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
