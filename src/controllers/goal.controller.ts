import { Request, Response } from "express";
import { Category, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createGoal = async (req: Request, res: Response) => {
  try {
    const { name, targetAmount, progress, userId, categories } = req.body;
    const newGoal = await prisma.goal.create({
      data: {
        name,
        targetAmount,
        progress,
        categories: {
          create: categories.map((category: Category) => ({
            name: category,
          })),
        },
        userId: Number(userId),
      },
    });
    res.status(200).json(newGoal);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getGoals = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const goals = await prisma.goal.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        user: true,
        transactions: true,
        categories: true,
      },
    });
    res.status(200).json(goals);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getGoalById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const goal = await prisma.goal.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: true,
        transactions: true,
        categories: true,
      },
    });
    res.status(200).json(goal);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const updateGoal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, targetAmount, progress, categories } = req.body;
    const updatedGoal = await prisma.goal.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        targetAmount,
        progress,
        categories: {
          create: categories.map((category: Category) => ({
            name: category,
          })),
        },
      },
    });
    res.status(200).json(updatedGoal);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const deleteGoal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedGoal = await prisma.goal.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(deletedGoal);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  createGoal,
  getGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
};
