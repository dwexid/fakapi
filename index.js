const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// library upload file multipart/formdata
const multer = require("multer");
const upload = multer({ dest: "datas/" });
// init function for API
const { getData, createData } = require("./src/controller/dataFakerController.js");
// init express.js, port and base directory
const app = express();
const port = 3000;
const BASE_DIR = __dirname;

app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.get("/", (req, res) => {
  res.json({ message: "Here's fake API" });
});
app.get("/api/:ep", async (req, res) => await getData(req, res, BASE_DIR));
app.post("/api/create", upload.single("faker"), async (req, res) => createData(req, res, BASE_DIR));

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Fakapi listening at http://localhost:${port}`);
});
