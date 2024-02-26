import { Role } from "../models/models";

interface User {
  username: string;
  email: string;
  password: string;
  roles: Role[];
}

function validateUser(user: User): boolean {
  if (!user.username || !user.email || !user.password || !user.roles) {
    return false;
  }

  if (
    user.roles.some(
      (role) =>
        !role || typeof role !== "object" || !role.name || !role.permissions
    )
  ) {
    return false;
  }

  return true;
}

export { validateUser };
