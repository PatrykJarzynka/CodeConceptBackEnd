const express = require("express");
const router = express.Router();
const service = require("../service");
const { default: axios } = require("axios");

router.post("/sendData", async (req, res, next) => {
  const { email, money, title } = req.body;
  try {
    const result = await service.addData({ email, money, title });
    res.status(201).json({ message: "Data saved!", data: result });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  const repos = await axios.get(
    // "https://62b3525fa36f3a973d202c8f.mockapi.io/repositories"
    "https://api.github.com/orgs/alibaba/repos?per_page=200"
  );

  const reposData = repos.data;
  const reposNames = reposData.map((repo) => repo.name);

  const data = await service.getData();
  const reposAndUsers = { data, reposNames }
  
  res.json(reposAndUsers);
})

module.exports = router;
