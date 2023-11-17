import authController from "../controllers/auth.controller";
import reportController from "../controllers/report.controller";
import express from "express";

const router = express.Router();

router.get(
  "/",
  authController.verifyToken,
  reportController.generateSalesReport
);

export default router;
