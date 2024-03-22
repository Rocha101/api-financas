import express from "express";
import TransactionController from "../controllers/transaction.controller";
import AuthController from "../controllers/auth.controller";

const router = express.Router();

router.get(
  "/:userId",
  AuthController.verifyToken,
  TransactionController.getTransactions
);
router.get(
  "/:id",
  AuthController.verifyToken,
  TransactionController.getTransactionById
);
router.get(
  "/total/:userId",
  AuthController.verifyToken,
  TransactionController.getTransactionsTotalByType
);
router.get(
  "/totalbymonth/:userId",
  AuthController.verifyToken,
  TransactionController.getTransactionsByMonth
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
