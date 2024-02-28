import { Request, Response, NextFunction } from 'express';
import { checkUserAttributes } from '../src/middleware';

describe('checkUserAttributes middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    req = {
      userAttributes: {
        role: "user",
        department: "TI",
        position: "analista"
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis() // Implementação mínima para res.json
    };
    next = jest.fn();
  });

  it('should not allow access for user with role "user", department "TI", and position "analista"', () => {
    checkUserAttributes(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Acesso não autorizado." });
  });

  it('should not allow access for user without correct attributes', () => {
    // Simulate a user without correct attributes
    req.userAttributes!.role = "user";
    req.userAttributes!.department = "marketing";
    req.userAttributes!.position = "assistente";
  
    checkUserAttributes(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Acesso não autorizado." });
  });
});

