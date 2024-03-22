import { Request, Response } from "express";
import { Budget, Category, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createBudget = async (req: Request, res: Response) => {
  try {
    const { limit, userId, name, categories } = req.body;
    console.log(req.body);
    const newBudget = await prisma.budget.create({
      data: {
        name,
        limit,
        categories: {
          create: categories.map((category: Category) => ({
            name: category,
          })),
        },
        userId: Number(userId),
      },
    });
    res.status(200).json(newBudget);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getBudgets = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const budgets = await prisma.budget.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        user: true,
        categories: true,
        transactions: true,
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
        categories: true,
        transactions: true,
      },
    });
    res.status(200).json(budget);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const updateBudget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { categories, limit, name } = req.body;
    const updatedBudget = await prisma.budget.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        limit,
        categories: {
          connectOrCreate: categories.map((category: Category) => ({
            where: { name: category },
            create: { name: category },
          })),
        },
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
