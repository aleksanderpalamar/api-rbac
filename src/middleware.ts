import { Request, Response, NextFunction } from "express";

interface UserAttributes {
  role?: string;
  department?: string;
  position: string;
}

interface ResourceAttributes {
  type: string;
  status: string;
}

interface EnvironmentAttributes {
  timeOfDay: string;
  location: string;
}

declare global {
  namespace Express {
    interface Request {
      userAttributes?: UserAttributes;
      resourceAttributes?: ResourceAttributes;
      environmentAttributes?: EnvironmentAttributes;
    }
  }
}

// Middleware para verificar os atributos do usuário
const checkUserAttributes = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { role, department, position } = req.userAttributes!;

  // Verificar se o usuário tem o papel correto, seu departamento e sua posição corretas.
  if (role === "admin" && department === "ti" && position === "analista") {
    return next();
  }

  return res.status(403).json({ message: "Acesso não autorizado." });
};

// Middleware para verificar os atributos do recurso
const checkResourceAttributes = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { type, status } = req.resourceAttributes!;

  if (type === "documento" && status === "arquivado") {
    if (
      req.userAttributes!.role !== "admin" ||
      req.userAttributes!.department !== "ti" ||
      req.userAttributes!.position !== "gerente"
    ) {
      return res.status(403).json({ message: "Acesso não autorizado." });
    }
  }

  next();
};

// Middleware para verificar os atributos do ambiente
const checkEnvironmentAttributes = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { timeOfDay, location } = req.environmentAttributes!;

  if (
    (timeOfDay >= "08:00" &&
      timeOfDay <= "18:30" &&
      (req.userAttributes!.role === "admin" ||
        req.userAttributes!.position === "gerente") &&
      (location === "filial" || location === "matriz")) ||
    ((timeOfDay < "08:00" || timeOfDay > "18:30") &&
      req.userAttributes!.position === "gerente" &&
      (location === "filial" || location === "matriz"))
  ) {
    // Acesso permitido
    next();
  } else {
    // Acesso negado
    return res.status(403).json({ message: "Acesso não autorizado." });
  }

  next();
};

export {
  checkUserAttributes,
  checkResourceAttributes,
  checkEnvironmentAttributes,
};
