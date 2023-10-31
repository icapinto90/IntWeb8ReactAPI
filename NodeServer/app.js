const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const fs = require("fs");
const { error } = require("console");
const filePath = "./tasks.json";
const _ = require("lodash/array");

app.use(cors());
app.use(express.json());

app.get("/tasks", (req, res) => {
  res.send(readFile());
});

app.post("/tasks", (req, res) => {
  let data = readFile();

  try {
    if (data.tasks.some((e) => e.name === req.body.name))
      throw error("Nom existant");
  } catch (error) {
    res.send("Erreur: Nom existant");
  }

  data.tasks.push(req.body);
  writeFile(data);
  res.send("done");
});

app.delete("/tasks/:name", (req, res) => {
  let data = readFile();
  data.tasks = data.tasks.filter((e) => e.name !== req.params.name);
  writeFile(data);
  res.send("done");
});

app.post("/tasks/:name/complete", (req, res) => {
  let data = readFile();
  const index = _.findIndex(data.tasks, (e) => e.name === req.params.name);
  try {
    if (index === -1) throw error("Nom non existant");
  } catch (error) {
    res.send("Erreur: Nom non existant");
  }
  data.tasks[index].completed = !data.tasks[index].completed;
  writeFile(data);
  res.send("done");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function readFile() {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeFile(data) {
  fs.writeFileSync(filePath, JSON.stringify(data));
}
