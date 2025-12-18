import express from "express";
import { UserController } from "../controllers/userController.js";

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
// router.post("/create", UserController.createUser);
router.put("/:id/update", UserController.updateUser);
router.delete("/:id/delete", UserController.deleteUser);

export default router;
