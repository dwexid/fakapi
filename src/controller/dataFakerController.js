// library read and write file
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
// function helper
const { readData } = require("../utils/common.js");
const { createDataFaker } = require("../utils/fakerHelper.js");

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const rootDirectory = path.join(__dirname, '../..');

const getData = async (req, res) => {
    const DATA_PATH = rootDirectory + "/src/data";
    const route = req.params.ep;
    const eps = await readData(rootDirectory);

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
}

const createData = async (req, res) => {
    const DATA_PATH = rootDirectory + "/src/data";
    const url = req.body.path ?? "";

    // get data from uploded file
    const absolutePath = path.join(rootDirectory, req.file.path);
    const jsonString = fs.readFileSync(absolutePath, "utf-8");
    const jsonObject = JSON.parse(jsonString);
    fs.unlink(absolutePath, (err) => {
        if (err) {
            a.error('Error deleting the file:', err);
            return res.status(500).send('Error deleting the file');
        }
    });

    // create fake data
    const jsonData = createDataFaker(jsonObject);
    const fileName = `${url}.json`;

    // write endpoint data
    await writeFileAsync(`${DATA_PATH}/${fileName}`, JSON.stringify(jsonData));

    // update file endpoints
    const eps = await readData(rootDirectory);
    if (eps.filter((val) => val.path == url).length == 0) {
        eps.push({
            path: url,
            file: fileName,
        });
    }
    await writeFileAsync(`${rootDirectory}/endpoints.json`, JSON.stringify(eps));

    res.json({ message: "success", data: url });
}

module.exports = {
    getData,
    createData
}