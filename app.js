const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

// Create a new post
app.post("/compra", async (req, res) => {
  const result = await prisma.compra.create({
    data: {
      ...req.body,
    },
  });
  res.json(result);
});

// Read all compra
app.get("/compra", async (req, res) => {
  const allcompra = await prisma.compra.findMany();
  res.json(allcompra);
});

// Read a specific compra
app.get("/compra/:id", async (req, res) => {
  const compra = await prisma.compra.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.json(compra);
});

// Update a compra
app.put("/compra/:id", async (req, res) => {
  const compra = await prisma.compra.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      ...req.body,
    },
  });
  res.json(compra);
});

// Delete a compra
app.delete("/compra/:id", async (req, res) => {
  const compra = await prisma.compra.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.json(compra);
});

// Start the server
app.listen(3001, () =>
  console.log("REST API server ready at: http://localhost:3001")
);
