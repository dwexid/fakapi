const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { faker } = require("@faker-js/faker");

const multer = require("multer");
const upload = multer({ dest: "datas/" });

const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const dayjs = require("dayjs");

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const app = express();
const port = 3000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const BASE_DIR = __dirname;
const DATA_PATH = BASE_DIR + "/data";
// const

app.get("/", (req, res) => {
  res.json({ message: "Here's fake API" });
});

async function readData() {
  const epsRaw = await readFileAsync(BASE_DIR + "/endpoints.json");
  return JSON.parse(epsRaw);
}

app.get("/api/:ep", async (req, res) => {
  const route = req.params.ep;
  const eps = await readData();

  const dataFile = eps.filter((el) => el.path === route)[0];
  let fileName;
  if (dataFile) {
    fileName = dataFile.file;
  } else {
    res.header.statusCode = 404;
    return res.json("404 Not found");
  }

  const data = await readFileAsync(`${DATA_PATH}/${fileName}`);
  res.json({
    message: "Ok",
    data: JSON.parse(data),
  });
});

function fakeIt(key) {
  switch (key) {
    case "int":
      return faker.number.int(100);
    case "string":
      return faker.lorem.sentence();
    case "desc":
      return faker.lorem.sentences();
    case "img":
      return faker.image.urlPicsumPhotos();
    case "name":
      return faker.person.fullName();
    case "phone":
      return faker.phone.number();
    case "date":
      return dayjs().format("YYYY-MM-DD HH:mm:ss");
    case "time":
      return dayjs().format("HH:mm");
    default:
      return "";
  }
}

function createDataFaker(jsonData) {
  const dataLen = jsonData.len;
  const data = jsonData.data;

  let result;
  if (dataLen > 1) {
    result = [];
    for (var i = 0; i < dataLen; i++) {
      let tmp = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const field = key;
          const val = data[key];
          console.log(val);
          if (typeof val === "string") {
            tmp[field] = fakeIt(val);
          } else {
            tmp[field] = createDataFaker(val);
          }
        }
      }
      result.push(tmp);
    }
  } else {
    result = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const field = key;
        const val = data[key];
        if (typeof val === "string") {
          result[field] = fakeIt(val);
        } else {
          result[field] = createDataFaker(val);
        }
      }
    }
  }
  return result;
}

app.post("/api/create", upload.single("faker"), async (req, res) => {
  const len = req.body.len ?? 0;
  const url = req.body.path ?? "";

  const absolutePath = path.join(BASE_DIR, req.file.path);
  const jsonString = fs.readFileSync(absolutePath, "utf-8");
  const jsonObject = JSON.parse(jsonString);

  // let jsonData;
  // if (jsonObject.len > 1) {
  //   jsonData = [];
  //   // array
  //   const data = jsonObject.data;
  //   for (var i = 0; i < len; i++) {
  //     let tmp = {};
  //     for (const key in data) {
  //       if (data.hasOwnProperty(key)) {
  //         const field = key;
  //         const val = data[key];

  //         tmp[field] = fakeIt(val);
  //         // if (typeof variable === 'string') {
  //         //   tmp[field] = fakeIt(val);
  //         // } else {
  //         //   for(key)
  //         // }
  //       }
  //     }
  //     jsonData.push(tmp);
  //   }
  // } else {
  //   jsonData = {};
  //   // object
  //   const data = jsonObject.data;
  //   jsonData = createDataFaker(data);
  // }
  const jsonData = createDataFaker(jsonObject);

  const fileName = `${url}.json`;
  // return res.json(jsonData);

  // write endpoint data
  await writeFileAsync(`${DATA_PATH}/${fileName}`, JSON.stringify(jsonData));

  // update file endpoints
  const eps = await readData();
  eps.push({
    path: url,
    file: fileName,
  });
  await writeFileAsync(`${BASE_DIR}/endpoints.json`, JSON.stringify(eps));

  res.json({ message: "success", data: url });
});

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
