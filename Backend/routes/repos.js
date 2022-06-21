const express = require("express");
const router = express.Router();
const service = require("../service");

router.post("/sendData", async (req, res, next) => {
  const { email, money, title } = req.body;
  try {
    const result = await service.addData({ email, money, title });
    res.status(201).json({ message: "Data saved!", data: result });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
