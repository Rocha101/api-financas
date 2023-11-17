import { Request, Response } from "express";
import { PrismaClient, Transaction } from "@prisma/client";

const prisma = new PrismaClient();

const createTransaction = async (req: Request, res: Response) => {
  try {
    const { type, amount, description, userId } = req.body;
    const newTransaction = await prisma.transaction.create({
      data: {
        type,
        amount,
        description,
        userId, // Ensure userId exists and relates to an existing user
      },
    });
    res.status(200).json(newTransaction);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getTransactionsTotalByType = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const total = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        type,
      },
    });
    res.status(200).json(total);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        user: true,
      },
    });
    res.status(200).json(transactions);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getTransactionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: true,
      },
    });
    res.status(200).json(transaction);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const updateTransaction = async (req: Request, res: Response) => {
  try {
    const { id, type, amount, description } = req.body;
    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: Number(id),
      },
      data: {
        type,
        amount,
        description,
      },
    });
    res.status(200).json(updatedTransaction);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTransaction = await prisma.transaction.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(deletedTransaction);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getTransactionsTotalByType,
};
