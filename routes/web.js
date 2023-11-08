import { Router } from "express";
// import hljs from "highlight.js";
// import json from "highlight.js/lib/languages/json";
// hljs.registerLanguage("json", json);

// init router & base directory
const router = Router();

// call controller API
import { getEndpoints } from "../src/controller/apiController.js";
import { quickStartIndex } from "../src/controller/quickStartController.js";
import { docsIndex } from "../src/controller/docsController.js";
import {
  secretDoorIndex,
  secretDoorDelete,
} from "../src/controller/secretDoorController.js";

// routes
router.get("/", (_, res) => res.redirect("/app/api"));
router.get("/quick-start", quickStartIndex);
router.get("/api", getEndpoints);
router.get("/docs", docsIndex);
router.get("/secret-door", secretDoorIndex);
router.get("/secret-door/delete", secretDoorDelete);

export default router;
