const express = require("express");

// init router & base directory
const router = express.Router();

// routes
router.get("/", (req, res) => {
  res.render("index");
});

// export routes
module.exports = router;
