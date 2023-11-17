import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createBudget = async (req: Request, res: Response) => {
  try {
    const { category, limit, userId } = req.body;
    const newBudget = await prisma.budget.create({
      data: {
        category,
        limit,
        userId, // Ensure userId exists and relates to an existing user
      },
    });
    res.status(200).json(newBudget);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getBudgets = async (req: Request, res: Response) => {
  try {
    const budgets = await prisma.budget.findMany({
      include: {
        user: true,
      },
    });
    res.status(200).json(budgets);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getBudgetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const budget = await prisma.budget.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: true,
      },
    });
    res.status(200).json(budget);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const updateBudget = async (req: Request, res: Response) => {
  try {
    const { id, category, limit } = req.body;
    const updatedBudget = await prisma.budget.update({
      where: {
        id: Number(id),
      },
      data: {
        category,
        limit,
      },
    });
    res.status(200).json(updatedBudget);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const deleteBudget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedBudget = await prisma.budget.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(deletedBudget);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
};
