import express from "express";
import UserController from "../controllers/user.controller";
import AuthController from "../controllers/auth.controller";

const router = express.Router();

router.get("/", AuthController.verifyToken, UserController.getUsers);
router.get("/:id", AuthController.verifyToken, UserController.getUserById);
router.post("/", AuthController.verifyToken, UserController.createUser);
router.delete("/:id", AuthController.verifyToken, UserController.deleteUser);
router.put("/:id", AuthController.verifyToken, UserController.updateUser);

export default router;
