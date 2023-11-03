import { readFile } from "fs";
import { promisify } from "util";
const readFileAsync = promisify(readFile);

export const readData = async () => {
  const epsRaw = await readFileAsync(__basedir + "/endpoints.json");
  return JSON.parse(epsRaw);
};
