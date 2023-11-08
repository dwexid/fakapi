import _ from "lodash";

// load service
import {
  getAll,
  getDetail,
  generateFromJson,
  generateFromBody,
} from "../services/fileService.js";

export const docsIndex = async (req, res) => {
  res.render("docs");
};
