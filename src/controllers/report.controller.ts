import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const generateReport = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "report generated" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  generateReport,
};
