"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importação parcial de jest
const globals_1 = require("@jest/globals");
// Mock para o modelo de função (role)
globals_1.jest.mock('../src/models/models', () => {
    const mockRoleModel = {
        create: globals_1.jest.fn(),
        find: globals_1.jest.fn(),
    };
    const mockPermissionModel = {
        find: globals_1.jest.fn(),
    };
    return {
        __esModule: true,
        RoleModel: mockRoleModel,
        PermissionModel: mockPermissionModel,
    };
});
// Escreva seus testes aqui fora do escopo do mock
describe('Temporary test', () => {
    test('should pass', () => {
        expect(true).toBe(true);
    });
});
