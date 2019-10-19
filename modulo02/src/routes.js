import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store); //Rota para criar usuario
routes.post('/sessions', SessionController.store); //Rota para logar

routes.use(authMiddleware);

routes.put('/users', UserController.update); //Rota para alterar dados do user

export default routes;
