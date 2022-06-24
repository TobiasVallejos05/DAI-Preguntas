import express from "express";
import cors from "cors";
import PreguntasRouter from "./src/controllers/preguntasController.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/preguntas", PreguntasRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});