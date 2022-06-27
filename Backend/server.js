const app = require('./app')
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT;
const uriDb = process.env.URI_DB;

const connection = mongoose.connect(uriDb, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection   //połączenie z mongoose
  .then(() => {
    console.log("Database connection successful");
    app.listen(port, () => {
      console.log("Server is running!");
    });
  })
  .catch(() => {
    console.log("Connection error!");
    process.exit(1);
  });
