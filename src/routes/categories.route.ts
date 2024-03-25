import express from "express";
import CategoryController from "../controllers/categories.controller";
import AuthController from "../controllers/auth.controller";

const router = express.Router();

router.get("/", AuthController.verifyToken, CategoryController.getCategories);
router.get(
  "/:id",
  AuthController.verifyToken,
  CategoryController.getCategoriesById
);
router.post("/", AuthController.verifyToken, CategoryController.createCategory);
router.delete(
  "/:id",
  AuthController.verifyToken,
  CategoryController.deleteCategory
);
router.put(
  "/:id",
  AuthController.verifyToken,
  CategoryController.updateCategory
);

export default router;
