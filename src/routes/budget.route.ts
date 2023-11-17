import express from "express";
import BudgetController from "../controllers/budget.controller";
import AuthController from "../controllers/auth.controller";

const router = express.Router();

router.get("/", AuthController.verifyToken, BudgetController.getBudgets);
router.get("/:id", AuthController.verifyToken, BudgetController.getBudgetById);
router.post("/", AuthController.verifyToken, BudgetController.createBudget);
router.delete(
  "/:id",
  AuthController.verifyToken,
  BudgetController.deleteBudget
);
router.put("/:id", AuthController.verifyToken, BudgetController.updateBudget);

export default router;
