const express = require("express");
const cors = require("cors");
const { translate } = require("./models/api");

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
  }),
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/translate", async (req, res) => {
  const textEng = req.body["text"];
  const textPtBr = await translate(textEng);

  res.send({ translated_text: textPtBr });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
