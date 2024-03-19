import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    res.status(200).json(newUser);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.user.findMany({
      include: {
        budgets: true,
        transactions: true,
        goals: true,
      },
    });
    res.status(200).json(allUsers);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        budgets: true,
        transactions: true,
        goals: true,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id, username, email } = req.body;
    const updatedUser = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        username,
        email,
      },
    });
    res.status(200).json(updatedUser);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(deletedUser);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const deleteAllUsers = async (req: Request, res: Response) => {
  try {
    const deletedUsers = await prisma.user.deleteMany();
    res.status(200).json(deletedUsers);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  deleteAllUsers,
};
