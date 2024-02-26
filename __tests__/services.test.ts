// Importação parcial de jest
import { jest } from '@jest/globals';

// Tipo genérico para os mocks
type Mock<T extends object> = jest.Mocked<T>;

// Mock para o modelo de função (role)
jest.mock('../src/models/models', () => {
  const mockRoleModel = {
    create: jest.fn(),
    find: jest.fn(),
  };
  const mockPermissionModel = {
    find: jest.fn(),
  };

  return {
    __esModule: true,
    RoleModel: mockRoleModel as Mock<typeof mockRoleModel>,
    PermissionModel: mockPermissionModel as Mock<typeof mockPermissionModel>,
  };
});

// Escreva seus testes aqui fora do escopo do mock
describe('Temporary test', () => {
  test('should pass', () => {
    expect(true).toBe(true);
  });
});
