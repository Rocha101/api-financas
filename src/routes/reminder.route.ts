import express from "express";
import ReminderController from "../controllers/reminder.controller";
import AuthController from "../controllers/auth.controller";

const router = express.Router();

router.get("/", AuthController.verifyToken, ReminderController.getReminders);
router.get(
  "/:id",
  AuthController.verifyToken,
  ReminderController.getReminderById
);
router.get(
  "/due",
  AuthController.verifyToken,
  ReminderController.getRemindersDue
);
router.post("/", AuthController.verifyToken, ReminderController.createReminder);
router.delete(
  "/:id",
  AuthController.verifyToken,
  ReminderController.deleteReminder
);
router.put(
  "/:id",
  AuthController.verifyToken,
  ReminderController.updateReminder
);

export default router;
