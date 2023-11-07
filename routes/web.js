import { Router } from "express";
// import hljs from "highlight.js";
// import json from "highlight.js/lib/languages/json";
// hljs.registerLanguage("json", json);

// init router & base directory
const router = Router();

// call controller API
import { getEndpoints } from "../src/controller/apiController.js";

// routes
router.get("/", getEndpoints);

export default router;
