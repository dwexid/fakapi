import _ from "lodash";
import { join } from "path";
import { writeFile } from "fs";
import { promisify } from "util";

const writeFileAsync = promisify(writeFile);

// load services
import { readData } from "../utils/common.js";
import {
  getAll,
  getDetail,
  generateFromJson,
  generateFromBody,
  removeFile,
} from "../services/fileService.js";

export const secretDoorIndex = async (req, res) => {
  let data;
  try {
    data = await readData();
  } catch (e) {}

  data.forEach((el) => {
    el.path = el.path.replace(".", "/");
  });

  res.render("secret-door", { result: data });
};

export const secretDoorDelete = async (req, res) => {
  const __basedir = "src/data/";
  let path = req.query.path ?? "";

  try {
    // endpoints data
    const data = await readData();

    // removable item
    path = path.replace("/", ".");
    let fileName = `${path}.json`;

    const absolutePath = join(__basedir, fileName);
    removeFile(absolutePath);

    // update endpoints data
    const updatedData = _.remove(data, function (el) {
      return el.path !== path;
    });

    await writeFileAsync(`endpoints.json`, JSON.stringify(updatedData));
  } catch (e) {
    console.log(e);
  }

  res.redirect("/app/secret-door");
};
