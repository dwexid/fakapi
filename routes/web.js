import { Router } from "express";
import hljs from "highlight.js";

import json from "highlight.js/lib/languages/json";
hljs.registerLanguage("json", json);

// init router & base directory
const router = Router();

// routes
router.get("/", (req, res) => {
  res.render("index", {
    nami: `{"nama": "Halim", "category":{"id": 1}}`,
  });
});

export default router;
