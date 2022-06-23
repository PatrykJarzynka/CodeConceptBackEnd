const Data = require("./schemas/userData");

const addData = ({ email, money, title }) =>
  Data.create({ email, money, title });

const getData = () => Data.find({}).lean();

const updateData = (id, money) =>
  Data.findOneAndUpdate(
    {
      _id: id,
    },
    { $set: money },
    {
      new: true,
      runValidators: true,
      strict: "throw",
    }
  );

module.exports = { addData, getData, updateData };
