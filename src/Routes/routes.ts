import express from "express";
import {
  createRoleController,
  createUserController,
  getAllRolesController,
  getAllUsersController,
  getRoleByIdController,
  updateRoleController,
} from "../controllers/controllers";
import {
  checkUserAttributes,
  checkResourceAttributes,
  checkEnvironmentAttributes,
} from "../middleware";

const router = express.Router();

router.post("/users", checkUserAttributes, checkEnvironmentAttributes, createUserController);

router.get("/users", getAllUsersController);

router.get("/role/:id", getRoleByIdController);

router.put("/role/:id", updateRoleController);

router.post("/roles", createRoleController);

router.get("/roles", getAllRolesController);

export default router;
