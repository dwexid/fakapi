const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);

const readData = async(BASE_DIR) => {
  const epsRaw = await readFileAsync(BASE_DIR + "/endpoints.json");
  return JSON.parse(epsRaw);
}

module.exports = {
  readData
};