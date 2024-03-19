import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import userRoute from "./routes/user.route";
import authRoute from "./routes/auth.route";
import reportRoute from "./routes/report.route";
import transactionRoute from "./routes/transaction.route";
import budgetRoute from "./routes/budget.route";
import goalRoute from "./routes/goal.route";

export const prisma = new PrismaClient();

const app = express();
const port = 8080;
var cors = require("cors");

async function main() {
  app.use(cors());
  app.use(express.json());

  app.use("/user", userRoute);
  app.use("/auth", authRoute);
  app.use("/report", reportRoute);
  app.use("/transaction", transactionRoute);
  app.use("/budget", budgetRoute);
  app.use("/goal", goalRoute);

  app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
