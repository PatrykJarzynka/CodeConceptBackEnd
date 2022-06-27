const Data = require("./schemas/userData");

const addData = ({ email, money, title }) => //metoda do osbługi dodawania danych
  Data.create({ email, money, title });

const getData = () => Data.find({}).lean(); //metoda do osbługi pobierania danych

const updateData = (id, money) =>   //metoda do osbługi aktualizacji danych
  Data.findOneAndUpdate(
    {
      _id: id,
    },
    { $set: money },
    {
      new: true,  // flaga pozwalajaca zwrócić to co zostało zaktualizowane
      runValidators: true,  // flaga pozwalajaca obsłużyć walidacje
      strict: "throw",  // flaga zabezpieczająca przed dodaniem dodatkowych, niepożądanych danych
    }
  );

module.exports = { addData, getData, updateData };
