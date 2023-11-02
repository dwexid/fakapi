const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// init root path
global.__basedir = __dirname;

// init routes
const apiRoutes = require("./routes/api.js");
const appRoutes = require("./routes/web.js");

// init express.js, port
const app = express();
const port = 3000;

// Front end setup
app.set("views", path.join(__dirname, "./app/views"));
app.set("view engine", "pug");
app.use("/public", express.static(path.join(__dirname, "./app/assets")));

// Back end setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.get("/", (_, res) => res.redirect("/app"));
app.use("/api", apiRoutes);
app.use("/app", appRoutes);

app.listen(port, () => {
  console.log(`Fakapi listening at http://localhost:${port}`);
});
