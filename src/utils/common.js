const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);

const readData = async () => {
  const epsRaw = await readFileAsync(__basedir + "/endpoints.json");
  return JSON.parse(epsRaw);
};

module.exports = {
  readData,
};
