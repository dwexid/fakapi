// library read and write file
import { readFile, writeFile, readFileSync, unlink } from "fs";
import { join } from "path";
import { promisify } from "util";
// function helper
import { readData } from "../../utils/common.js";
import { createDataFaker } from "../../utils/fakerHelper.js";

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

const DATA_PATH = `${__basedir}/src/data`;

export const getData = async (req, res) => {
  const route = req.params.ep;
  const eps = await readData();

  const dataFile = eps.filter((el) => el.path === route)[0];
  let fileName;
  if (dataFile) {
    fileName = dataFile.file;
  } else {
    res.header.statusCode = 404;
    return res.status(404).send("404 Not found");
  }

  const data = await readFileAsync(`${DATA_PATH}/${fileName}`);
  res.json({
    message: "Ok",
    data: JSON.parse(data),
  });
};

export const createData = async (req, res) => {
  const url = req.body.path ?? "";

  // get data from uploded file
  const absolutePath = join(__basedir, req.file.path);
  const jsonString = readFileSync(absolutePath, "utf-8");
  const jsonObject = JSON.parse(jsonString);
  unlink(absolutePath, (err) => {
    if (err) {
      a.error("Error deleting the file:", err);
      return res.status(500).send("Error deleting the file");
    }
  });

  // create fake data
  const jsonData = createDataFaker(jsonObject);
  const fileName = `${url}.json`;

  // write endpoint data
  await writeFileAsync(`${DATA_PATH}/${fileName}`, JSON.stringify(jsonData));

  // update file endpoints
  const eps = await readData();
  if (eps.filter((val) => val.path == url).length == 0) {
    eps.push({
      path: url,
      file: fileName,
    });
  }
  await writeFileAsync(`${__basedir}/endpoints.json`, JSON.stringify(eps));

  res.json({ message: "success", data: url });
};
