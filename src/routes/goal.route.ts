import express from "express";
import GoalController from "../controllers/goal.controller";
import AuthController from "../controllers/auth.controller";

const router = express.Router();

router.get("/", AuthController.verifyToken, GoalController.getGoals);
router.get("/:id", AuthController.verifyToken, GoalController.getGoalById);
router.post("/", AuthController.verifyToken, GoalController.createGoal);
router.delete("/:id", AuthController.verifyToken, GoalController.deleteGoal);
router.put("/:id", AuthController.verifyToken, GoalController.updateGoal);

export default router;
