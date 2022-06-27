const express = require("express");
const app = express();
const cors = require("cors"); 

app.use(express.json()); // obsługa danych w formacie json
app.use(
  cors({
    origin: "https://zippy-klepon-9093e7.netlify.app", // link do frontendu
  })
);

const apiRouter = require("./routes/repos"); // podpięcie routerów
app.use(apiRouter);

app.use((req, res) => { //obsluga błędu 404
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {  //obsługa błędu 500
  res.status(500).json({ message: err.message });
});

module.exports = app;
