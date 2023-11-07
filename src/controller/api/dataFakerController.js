// load service
import {
  getDetail,
  generateFromJson,
  generateFromBody,
} from "../../services/fileService.js";

export const getData = async (req, res) => {
  const route = req.params.ep;
  let data;
  try {
    data = await getDetail(route);
  } catch (e) {
    res.status(400).json({ message: "Data tidak ditemukan" });
  }

  res.json({
    message: "Ok",
    data: JSON.parse(data),
  });
};

export const createDataFromJson = async (req, res) => {
  let url;
  try {
    url = await generateFromJson(req);
  } catch (e) {
    res.status(400).json({ message: "Gagal generate endpoint" });
  }
  res.json({ message: "success", data: url });
};

export const createData = async (req, res) => {
  let url;
  try {
    url = await generateFromBody(req.body);
  } catch (e) {
    res.status(400).json({ message: "Gagal generate endpoint" });
  }
  res.json({ message: "success", data: url });
};
