const express = require("express");
// library upload file multipart/formdata
const multer = require("multer");
const upload = multer({ dest: "datas/" });

// call controller API
const { getData, createData } = require("../controller/dataFakerController.js");

// init router & base directory
const router = express.Router();

/* Error handler middleware */
router.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

// routes
router.get('/:ep', getData);
router.post('/create', upload.single("faker"), createData);

// export routes
module.exports = router