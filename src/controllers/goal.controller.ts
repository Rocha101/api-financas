import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createGoal = async (req: Request, res: Response) => {
  try {
    const { name, targetAmount, progress, userId, deadline } = req.body;
    const newGoal = await prisma.goal.create({
      data: {
        name,
        targetAmount,
        progress,
        userId,
        deadline: new Date(deadline),
      },
    });
    res.status(200).json(newGoal);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getGoals = async (req: Request, res: Response) => {
  try {
    const goals = await prisma.goal.findMany({
      include: {
        user: true,
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
      },
    });
    res.status(200).json(goal);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const updateGoal = async (req: Request, res: Response) => {
  try {
    const { id, name, targetAmount, progress, deadline } = req.body;
    const updatedGoal = await prisma.goal.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        targetAmount,
        progress,
        deadline: new Date(deadline),
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
