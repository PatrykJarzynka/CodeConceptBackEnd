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
  const reposAndUsers = { data, reposNames };

  res.json(reposAndUsers);
});

router.get("/getData", async (req, res, next) => {
  const data = await service.getData();
  res.json(data);
});

router.patch("/patchData", async (req, res, next) => {
  const id = req.body._id;
  const { money } = req.body;
  try {
    if (money === undefined) {
      res.status(400).json({ message: "missing field money" });
    } else {
      const result = await service.updateData(id, { money });
      if (!result) {
        res.status(404).json({ message: "Not Found" });
      } else {
        res.json({
          message: `data patched to money = ${money}`,
          data: result,
        });
      }
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
