// Criando as rotas da aplicação
import { Router } from 'express';

import StudentsController from './app/controllers/StudentsController';
import UserController from './app/controllers/UserController';
import SessionsController from './app/controllers/SessionsController';

import authMiddleware from './app/middlewares/authAdmin';

const routes = new Router();

routes.post('/sessions', SessionsController.store); // rota para logar
routes.use(authMiddleware);
// Criando rota de criação e atualização de studentes
routes.post('/users', UserController.store);
routes.post('/users', UserController.store);

// Criando rota de criação e atualização de studentes
routes.post('/students', StudentsController.store);
routes.put('/students', StudentsController.update);

export default routes;
