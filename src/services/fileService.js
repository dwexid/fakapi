// library read and write file
import { readFile, writeFile, readFileSync, unlink } from "fs";
import { join } from "path";
import { promisify } from "util";
// function helper
import { readData } from "../utils/common.js";
import { createDataFaker } from "../utils/fakerHelper.js";

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);
const DATA_PATH = `src/data`;

export const getAll = async () => {
  const eps = await readData();

  let result = [];
  for (var i in eps) {
    let endPointData = {};

    const fileName = `${eps[i].file}`;
    try {
      const endPointRes = await readFileAsync(`${DATA_PATH}/${fileName}`);
      endPointData["path"] = eps[i].path;
      endPointData["data"] = JSON.parse(endPointRes);
      result.push(endPointData);
    } catch (e) {
      console.log("gagal " + DATA_PATH + fileName);
      console.log(e);
    }
  }
  return result;
};

export const getDetail = async (endPoint) => {
  const eps = await readData();

  const dataFile = eps.filter((el) => el.path === endPoint)[0];
  let fileName;
  if (dataFile) {
    fileName = dataFile.file;
  } else {
    return error;
  }

  return await readFileAsync(`${DATA_PATH}/${fileName}`);
};

export const generateFromJson = async (req) => {
  const url = req.body.path ?? "";

  try {
    // get data from uploded file
    const absolutePath = join(globalThis.__basedir, req.file.path);
    const jsonString = readFileSync(absolutePath, "utf-8");
    const jsonObject = JSON.parse(jsonString);
    removeFile(absolutePath);

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
    await writeFileAsync(
      `${globalThis.__basedir}/endpoints.json`,
      JSON.stringify(eps)
    );
  } catch (e) {
    return e;
  }

  return url;
};

export const generateFromBody = async (data) => {
  const url = data.path ?? "";
  const jsonObject = data.response;

  try {
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
    await writeFileAsync(
      `${globalThis.__basedir}/endpoints.json`,
      JSON.stringify(eps)
    );
  } catch (e) {
    return e;
  }

  return url;
};

export const removeFile = (path) => {
  unlink(path, (err) => {
    if (err) {
      // a.error("Error deleting the file:", err);
      return err;
    }
  });
};
