import { Router } from "express";
import hljs from "highlight.js";

import json from "highlight.js/lib/languages/json";
hljs.registerLanguage("json", json);

// init router & base directory
const router = Router();

let jsjs = `{"nama": "Halim", "category":{"id": 1}}`;
// routes
router.get("/", (req, res) => {
  res.render("index", {
    nami: JSON.stringify(JSON.parse(jsjs), null, 2),
  });
});

export default router;
