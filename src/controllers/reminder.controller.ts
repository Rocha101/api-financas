import { Request, Response } from "express";
import { PrismaClient, Reminder } from "@prisma/client";

const prisma = new PrismaClient();

const checkRemindersDue = async (): Promise<string[]> => {
  try {
    const currentDate = new Date();
    const remindersDue: Reminder[] = await prisma.reminder.findMany({
      where: {
        date: {
          equals: currentDate.toISOString().split("T")[0], // Extract date without time
        },
      },
    });

    if (remindersDue.length > 0) {
      const dueRemindersMessage: string[] = remindersDue.map((reminder) => {
        return `Lembrete '${reminder.title}' vence hoje!`;
      });

      return dueRemindersMessage;
    } else {
      return ["Sem lembretes com vencimento hoje"];
    }
  } catch (error) {
    console.error("Erro conferindo lembretes:", error);
    throw new Error("Erro ao conferir lembretes");
  }
};

const getRemindersDue = async (req: Request, res: Response) => {
  try {
    const remindersDue = checkRemindersDue();

    res.status(200).json(remindersDue);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const createReminder = async (req: Request, res: Response) => {
  try {
    const { title, description, date, userId } = req.body;
    const newReminder = await prisma.reminder.create({
      data: {
        title,
        description,
        date,
        userId, // Ensure userId exists and relates to an existing user
      },
    });
    res.status(200).json(newReminder);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getReminders = async (req: Request, res: Response) => {
  try {
    const reminders = await prisma.reminder.findMany({
      include: {
        user: true,
      },
    });
    res.status(200).json(reminders);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getReminderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reminder = await prisma.reminder.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: true,
      },
    });
    res.status(200).json(reminder);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const updateReminder = async (req: Request, res: Response) => {
  try {
    const { id, title, description, date } = req.body;
    const updatedReminder = await prisma.reminder.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        description,
        date,
      },
    });
    res.status(200).json(updatedReminder);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const deleteReminder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedReminder = await prisma.reminder.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(deletedReminder);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  createReminder,
  getReminders,
  getReminderById,
  updateReminder,
  deleteReminder,
  getRemindersDue,
};
