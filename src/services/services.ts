import { RoleModel, PermissionModel } from "../models/models";

async function createRole(name: string, permissionIds: string[]): Promise<any> {
  try {
    const permissionsExist = await PermissionModel.find({
      _id: { $in: permissionIds },
    });
    if (permissionsExist.length !== permissionIds.length) {
      throw new Error("One or more permissions does not exist");
    }

    const role = new RoleModel({
      name,
      permissions: permissionIds,
    });
    return role;
  } catch (error) {
    throw new Error(`Error creating role: ${error}`);
  }
}

async function getAllRoles(): Promise<any> {
  try {
    const roles = await RoleModel.find().populate(
      "permissions",
      "name description"
    );
    return roles;
  } catch (error) {
    throw new Error(`Error getting all roles: ${error}`);
  }
}

export { createRole, getAllRoles };
