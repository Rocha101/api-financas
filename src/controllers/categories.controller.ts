import { Request, Response } from "express";
import { Category, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    console.log(req.body);
    const newCategorie = await prisma.category.create({
      data: {
        name,
      },
    });
    res.status(200).json(newCategorie);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({});
    if (categories.length === 0) {
      res.status(404).json({ error: "No categories found" });
    }
    if (categories.length === 1) {
      res.status(200).json([categories]);
    }
    res.status(200).json(categories);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getCategoriesById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(category);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
      },
    });
    res.status(200).json(updatedCategory);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCategory = await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(deletedCategory);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  createCategory,
  getCategories,
  getCategoriesById,
  updateCategory,
  deleteCategory,
};
