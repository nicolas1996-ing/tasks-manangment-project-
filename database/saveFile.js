// base de datos convencional 

const fs = require("fs");
const file = "./database/data.json";

const saveDb = (data) => {
  fs.writeFileSync(file, JSON.stringify(data)); // save as string
};

const readDb = () => {
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, { encoding: "utf-8" })); // convert string to json 
};

module.exports = {
  saveDb,
  readDb,
};
