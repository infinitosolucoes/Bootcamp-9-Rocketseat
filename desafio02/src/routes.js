// Criando as rotas da aplicação
import { Router } from 'express';

import Students from './app/models/Students';

const routes = new Router();
routes.get('/', async (req, res) => {
  const students = await Students.create({
    name: 'Jefferson Lima',
    email: 'jeffersonlima94@hotmail.com',
    password_hash: '12072312',
    age: '25',
    weight: '80',
    height: '1.83',
  });
  return res.json(students);
});
export default routes;
