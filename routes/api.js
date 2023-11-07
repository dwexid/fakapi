import { Router } from "express";
// library upload file multipart/formdata
import multer from "multer";
const upload = multer({ dest: "../datas/" });

// call controller API
import {
  getData,
  createDataFromJson,
  createData,
} from "../src/controller/api/dataFakerController.js";

// init router & base directory
const router = Router();

/* Error handler middleware */
router.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

// routes
router.get("/:ep", getData);
router.post("/create", upload.single("faker"), createDataFromJson);
router.post("/fire", createData);

// export routes
export default router;
