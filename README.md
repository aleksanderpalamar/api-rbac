# API-RBAC - Role Based Access Control
A API RBAC (Role-Based Access Control) é uma aplicação Node.js que fornece um serviço para gerenciar funções (roles) de usuários e suas permissões associadas. 
Ele usa um banco de dados NoSQL MongoDB para armazenar dados relacionados a usuários, funções e permissões.

## Tecnologias Utilizadas
- Node.js
- Express.js
- MongoDB
- Mongoose
- TypeScript

## Estrutura do Projeto

```
├── src
│   ├── controllers
│   │   ├── controllers.ts
│   ├── models
│   │   ├── models.ts
│   │   ├── user-model.ts
│   ├── routes
│   │   ├── routes.ts
│   ├── services
│   │   ├── service.ts
│   ├── utils
│   │   ├── validation.ts
│   ├── app.ts
├── package.json
├── tsconfig.json
├── docker-compose.yml
├── jest.config.js
├── .gitignore
├── README.md
```

## Como Executar

```bash
# Clone o repositório
git clone https://github.com/aleksanderpalamar/api-rbac.git

# Instale as dependências
npm install

# Execute a aplicação
npm run dev
```

## Endpoints da API
### Funções (Roles)

`POST /roles`: Criar uma nova função.
`GET /roles`: Obter todas as funções.
`GET /roles/:id`: Obter uma função específica pelo ID.
`PUT /roles/:id`: Atualizar uma função específica pelo ID.
`DELETE /roles/:id`: Excluir uma função específica pelo ID.

### Usuários (Users)

`POST /users`: Criar um novo usuário.
`GET /users`: Obter todos os usuários.
`GET /users/:id`: Obter um usuário específico pelo ID.
`PUT /users/:id`: Atualizar um usuário específico pelo ID.
`DELETE /users/:id`: Excluir um usuário específico pelo ID.

## Modelo de Dados

### Funções (Roles)

```ts
interface Role {
  name: string;
  permissions: Permission[];
}
```

### Usuários (Users)

```ts
interface User {
  username: string;
  email: string;
  password: string;
  roles: Role[];
}
```

## Licença

MIT License © <aleksanderpalamar>