const express = require("express");
const router = express.Router();
const service = require("../service");
const { default: axios } = require("axios");

router.post("/sendData", async (req, res, next) => {    //obsługa posta
  const { email, money, title } = req.body;   // pobranie danych z body
  try {
    const result = await service.addData({ email, money, title });    //dodanie danych do bazy
    res.status(201).json({ message: "Data saved!", data: result });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {     // obsługa pobrania danych
  const repos = await axios.get(
    "https://api.github.com/orgs/alibaba/repos?per_page=200" // link do api, skąd zaciągane są dane
  );

  const reposData = repos.data;       // wyciągnięcie wszystkich danych o repo
  const reposNames = reposData.map((repo) => repo.name);    //wyciągnięcie nazw repozytoriów

  const data = await service.getData();   // wyciągnięcie danych patrona z bazy
  const reposAndUsers = { data, reposNames };

  res.json(reposAndUsers);
});

router.get("/getData", async (req, res, next) => {    // obsługa pobrania danych konkretnego repo
  const data = await service.getData();
  res.json(data);
});

router.patch("/patchData", async (req, res, next) => {    // obsługa aktualizacji danych patrona
  const id = req.body._id;      // wyciągnięcie id patrona z body
  const { money } = req.body;   // wyciągnięcie pieniędzy patrona z body
  try {
    if (money === undefined) { // sprawdzenie czy podana została jakakolwiek kwota
      res.status(400).json({ message: "missing field money" });
    } else {
      const result = await service.updateData(id, { money }); //aktualizacja danych
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
