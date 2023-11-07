import _ from "lodash";

// load service
import {
  getAll,
  getDetail,
  generateFromJson,
  generateFromBody,
} from "../services/fileService.js";

export const getEndpoints = async (req, res) => {
  const route = req.params.ep;
  let data;
  try {
    data = await getAll();
  } catch (e) {
    // res.status(400).json({ message: "Data tidak ditemukan" });
  }

  // grouping
  let groupCandidates = [];
  data.forEach((el) => {
    const tmp = el.path.split(".");
    groupCandidates.push(tmp[0]);
  });

  let groupData = [];
  _.uniq(groupCandidates).forEach((el) => {
    const tmp = {};
    tmp["name"] = el;
    tmp["endPoints"] = [];
    groupData.push(tmp);
  });

  let result = [];
  data.forEach((el) => {
    const tmp = {};
    tmp["path"] = el.path;
    tmp["data"] = prettify(el.data);
    const segments = el.path.split(".");

    groupData.forEach((elm) => {
      if (elm.name === segments[0]) {
        elm.endPoints.push(tmp);
      }
    });
  });

  // res.json(groupData);
  res.render("index", {
    // endpoints: prettify(data),
    result: groupData,
  });
};

const prettify = (jsonData, extra = false) => {
  if (extra) {
    return JSON.stringify(JSON.parse(jsonData), null, 2);
  }
  return JSON.stringify(jsonData, null, 2);
};
