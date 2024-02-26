import express from "express";
import {
  createRoleController,
  createUserController,
  getAllRolesController,
  getAllUsersController,
  getRoleByIdController,
  updateRoleController,
} from "../controllers/controllers";

const router = express.Router();

router.post("/users", createUserController);

router.get("/users", getAllUsersController);

router.get("/role/:id", getRoleByIdController);

router.put("/role/:id", updateRoleController);

router.post("/roles", createRoleController);

router.get("/roles", getAllRolesController);

export default router;
