import { Request, Response, NextFunction } from 'express';
import { checkResourceAttributes } from '../src/middleware';

describe('checkResourceAttributes middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    req = {
      resourceAttributes: {
        type: "documento",
        status: "arquivado"
      },
      userAttributes: {
        role: "admin",
        department: "ti",
        position: "gerente"
      }
    };
    res = {
      status: jest.fn().mockReturnValue(res),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should allow access for admin in TI department and manager position for archived documents', () => {
    req.userAttributes!.role = "admin";
    req.userAttributes!.department = "ti";
    req.userAttributes!.position = "gerente";
    checkResourceAttributes(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
  });

  it('should allow access for non-archived documents', () => {
    // Simulate non-archived document
    req.resourceAttributes!.status = "pendente";
    checkResourceAttributes(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
  });
});
