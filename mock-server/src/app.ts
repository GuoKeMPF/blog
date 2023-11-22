import express from "express";
import audio from "./mock/audio";
import picture from "./mock/picture";
import text from "./mock/text";

const app = express();
const port = 5500;

app.all("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
  next();
});

app.use("/", audio);
app.use("/", picture);
app.use("/", text);

app.use(express.static("./mock"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`localhost:${port}`);
});
