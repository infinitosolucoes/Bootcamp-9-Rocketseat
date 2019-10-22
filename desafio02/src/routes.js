// Criando as rotas da aplicação
import { Router } from 'express';

import StudentsController from './app/controllers/StudentsController';

const routes = new Router();
// Criando rota de criação de studentes
routes.post('/students', StudentsController.store);
export default routes;
