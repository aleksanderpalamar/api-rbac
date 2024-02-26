import request from 'supertest';
import express from 'express';

import router from '../src/Routes/routes';

const app = express();
app.use(express.json());
app.use('/', router);

describe('Routes', () => {
  const mockCreateUserController = jest.fn();
  const mockGetAllUsersController = jest.fn();
  const mockGetRoleByIdController = jest.fn();
  const mockUpdateRoleController = jest.fn();
  const mockCreateRoleController = jest.fn();
  const mockGetAllRolesController = jest.fn();

  test('POST /users should call createUserController', async () => {
    await request(app).post('/users').send({});
    expect(mockCreateUserController).toHaveBeenCalled();
  });

  test('GET /users should call getAllUsersController', async () => {
    await request(app).get('/users');
    expect(mockGetAllUsersController).toHaveBeenCalled();
  });

  test('GET /role/:id should call getRoleByIdController', async () => {
    await request(app).get('/role/123');
    expect(mockGetRoleByIdController).toHaveBeenCalled();
  });

  test('PUT /role/:id should call updateRoleController', async () => {
    await request(app).put('/role/123').send({});
    expect(mockUpdateRoleController).toHaveBeenCalled();
  });

  test('POST /roles should call createRoleController', async () => {
    await request(app).post('/roles').send({});
    expect(mockCreateRoleController).toHaveBeenCalled();
  });

  test('GET /roles should call getAllRolesController', async () => {
    await request(app).get('/roles');
    expect(mockGetAllRolesController).toHaveBeenCalled();
  });
});
