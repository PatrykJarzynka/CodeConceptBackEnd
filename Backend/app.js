const { default: axios } = require("axios");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const apiRouter = require("./routes/repos");
app.use(apiRouter);

app.get("/", async (req, res, next) => {
  const repos = await axios.get(
    "https://api.github.com/orgs/alibaba/repos?per_page=200"
  );

  const reposData = repos.data;
  const reposNames = reposData.map((repo) => repo.name);

  res.json(reposNames);
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
