const Data = require("./schemas/userData");

const addData = ({ email, money, title }) =>
  Data.create({ email, money, title });

module.exports = { addData };
