import express from "express";
import path from "path";
const router = express.Router();

router.get("/", (req, res) => {
  const filePath = path.join(process.cwd(), "data", "vartikamaurya350_67fccf86556b5-1.pdf");
  res.download(filePath, "vartikamaurya350_67fccf86556b5-1.pdf");
});

export default router; 