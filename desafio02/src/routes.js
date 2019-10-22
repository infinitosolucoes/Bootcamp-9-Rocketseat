// Criando as rotas da aplicação
import { Router } from 'express';

import StudentsController from './app/controllers/StudentsController';
import UserController from './app/controllers/UserController';
import SessionsController from './app/controllers/SessionsController';

const routes = new Router();
// Criando rota de criação de studentes
routes.post('/students', StudentsController.store);
routes.post('/users', UserController.store);

routes.post('/sessions', SessionsController.store); // rota para logar

export default routes;
