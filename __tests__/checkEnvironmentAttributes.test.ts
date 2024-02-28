import { Request, Response, NextFunction } from 'express';
import { checkEnvironmentAttributes } from '../src/middleware';

describe('checkEnvironmentAttributes middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    req = {
      environmentAttributes: {
        timeOfDay: "",
        location: "matriz" 
      },
      userAttributes: {
        role: "admin",
        position: "gerente",
        department: "ti"
      }
    };
    res = {
      status: jest.fn().mockReturnValue(res),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should allow access during business hours (08:00 to 18:30) for admin or manager in branch', () => {
    req.environmentAttributes!.timeOfDay = "08:00";
    checkEnvironmentAttributes(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();

    req.environmentAttributes!.timeOfDay = "18:30";
    checkEnvironmentAttributes(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
  });

  it('should allow access outside business hours for manager in branch', () => {
    req.environmentAttributes!.timeOfDay = "18:31";
    checkEnvironmentAttributes(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();

    req.environmentAttributes!.timeOfDay = "07:59";
    checkEnvironmentAttributes(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
  });
});
