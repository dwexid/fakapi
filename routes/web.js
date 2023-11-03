import { Router } from "express";

// init router & base directory
const router = Router();

// routes
router.get("/", (req, res) => {
  res.render("index");
});

export default router;
