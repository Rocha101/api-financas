import { Request, Response } from "express";
import { Prisma, PrismaClient, Transaction } from "@prisma/client";
import { start } from "repl";

const prisma = new PrismaClient();

const createTransaction = async (req: Request, res: Response) => {
  try {
    const { type, amount, description, userId, budgetId, goalId } = req.body;

    const newTransaction = await prisma.transaction.create({
      data: {
        type,
        amount,
        description,
        userId: Number(userId),
        ...(budgetId && {
          budgets: {
            connect: {
              id: Number(budgetId),
            },
          },
        }),
        ...(goalId && {
          goals: {
            connect: {
              id: Number(goalId),
            },
          },
        }),
      },
    });
    res.status(200).json(newTransaction);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getMonthByNumber = (month: number) => {
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  return months[month - 1];
};

const getTransactionsByMonth = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate } = req.query;

    // Check if startDate and endDate are provided
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Both startDate and endDate are required" });
    }

    // Parse startDate and endDate into Date objects
    const parsedStartDate = new Date(startDate as string);
    const parsedEndDate = new Date(endDate as string);

    // Check if startDate and endDate are valid dates
    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    // Fetch transactions within the specified date range
    const transactions = await prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: parsedStartDate,
          lte: parsedEndDate,
        },
        userId: Number(userId),
      },
      include: {
        user: true,
        budgets: true,
        goals: true,
      },
    });

    const transactionsByMonth: number[] = Array(12).fill(0);

    const transactionsWithMonths = transactions.reduce((acc, transaction) => {
      const month = new Date(transaction.createdAt).getMonth();
      acc[month] += transaction.amount;
      return acc;
    }, transactionsByMonth);

    const transactionsByMonthNames = transactionsWithMonths.map(
      (monthTotal, index) => {
        return {
          month: getMonthByNumber(index + 1),
          total: monthTotal,
        };
      }
    );

    res.status(200).json(transactionsByMonthNames);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getTransactionsTotalByType = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { type, startDate, endDate } = req.query;

    // Check if startDate and endDate are provided
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Both startDate and endDate are required" });
    }

    // Parse startDate and endDate into Date objects
    const parsedStartDate = new Date(startDate as string);
    const parsedEndDate = new Date(endDate as string);
    const parsedType = type as Transaction["type"];

    // Check if startDate and endDate are valid dates
    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }
    const total = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        type: parsedType,
        createdAt: {
          gte: parsedStartDate,
          lte: parsedEndDate,
        },
        userId: Number(userId),
      },
    });
    res.status(200).json(total._sum.amount);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getTransactions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { type, startDate, endDate } = req.query;

    const transactions = await prisma.transaction.findMany({
      include: {
        user: true,
        budgets: true,
        goals: true,
      },
      where: {
        userId: Number(userId),
        ...(startDate &&
          endDate && {
            createdAt: {
              gte: new Date(startDate as string),
              lte: new Date(endDate as string),
            },
          }),
        ...(type && {
          type: type as Transaction["type"],
        }),
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
    const { id } = req.params;
    const { type, amount, description } = req.body;
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
  getTransactionsByMonth,
};
