const Data = require("./schemas/userData");

const addData = ({ email, money, title }) =>
  Data.create({ email, money, title });

const getData = () =>
  Data.find({}).lean();

module.exports = { addData, getData };
