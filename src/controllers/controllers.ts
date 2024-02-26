import { Request, Response } from "express";
import { createRole, getAllRoles } from "../services/services";
import { RoleModel } from "../models/models";
import UserModel from "../models/user-model";

async function createRoleController(
  req: Request,
  res: Response
): Promise<void> {
  const { name, permissions } = req.body;
  try {
    const role = await createRole(name, permissions);
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

async function createUserController(
  req: Request,
  res: Response
): Promise<void> {
  const userData = req.body;
  try {
    const newUser = await UserModel.create(userData);
    res
      .status(201)
      .json({ message: "Usuário criado com sucesso!", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar usuário.", error: error });
  }
}

async function getAllRolesController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const roles = await getAllRoles();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

async function getRoleByIdController(
  req: Request,
  res: Response
): Promise<void> {
  const roleId = req.params.id;
  try {
    const role = await RoleModel.findById(roleId).populate("permissions");
    if (!role) {
      res.status(404).json({ message: "Função (role) não encontrada." });
    } else {
      res.status(200).json(role);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar função (role).", error: error });
  }
}

async function updateRoleController(
  req: Request,
  res: Response
): Promise<void> {
  const roleId = req.params.id;
  const updatedRoleData = req.body;
  try {
    const updatedRole = await RoleModel.findByIdAndUpdate(
      roleId,
      updatedRoleData,
      { new: true }
    );
    if (!updatedRole) {
      res.status(404).json({ message: "Função (role) não encontrada." });
    } else {
      res.status(200).json(updatedRole);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar função (role).", error: error });
  }
}

async function getAllUsersController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    // Lógica para buscar todos os usuários no banco de dados
    const users = await UserModel.find();
    res.status(200).json({ message: "Usuários obtidos com sucesso!", users });
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter usuários.", error: error });
  }
}

export {
  createRoleController,
  getAllRolesController,
  getRoleByIdController,
  updateRoleController,
  getAllUsersController,
  createUserController,
};
