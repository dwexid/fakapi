import express from "express";
import ViteExpress from "vite-express";

import bodyParser from "body-parser";
import cors from "cors";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

// init global variables
globalThis.__dirname = dirname(__filename);
globalThis.__basedir = __dirname;

// init routes
// import apiRoutes from "./routes/api.js";
import appRoutes from "./routes/web.js";

// init express.js, port
const app = express();
const port = 3333;

console.log(`didididid  ${__dirname}`);

// Front end setup
app.set("views", join(__dirname, "./src/views"));
app.set("view engine", "pug");
app.use("/public", express.static(join(__dirname, "./public")));

// Back end setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.get("/", (_, res) => res.redirect("/app"));
// app.use("/api", apiRoutes);
app.use("/app", appRoutes);

ViteExpress.listen(app, port, () => console.log("Server is listening..."));

// app.listen(port, () => {
//   console.log(`Fakapi listening at http://localhost:${port}`);
// });
