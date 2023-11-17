import express from "express";
import TransactionController from "../controllers/transaction.controller";
import AuthController from "../controllers/auth.controller";

const router = express.Router();

router.get(
  "/",
  AuthController.verifyToken,
  TransactionController.getTransactions
);
router.get(
  "/:id",
  AuthController.verifyToken,
  TransactionController.getTransactionById
);
router.post(
  "/",
  AuthController.verifyToken,
  TransactionController.createTransaction
);
router.delete(
  "/:id",
  AuthController.verifyToken,
  TransactionController.deleteTransaction
);
router.put(
  "/:id",
  AuthController.verifyToken,
  TransactionController.updateTransaction
);

export default router;
