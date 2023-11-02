const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// init function for API
const apiRoutes = require("./src/routes/api.js");
// init express.js, port
const app = express();
const port = 3000;

app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use("/api", apiRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Here's fake API" });
});

app.listen(port, () => {
  console.log(`Fakapi listening at http://localhost:${port}`);
});
