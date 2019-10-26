import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import SchaduleController from './app/controllers/SchaduleController';
import NotificationController from './app/controllers/NotificationController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store); // Rota para criar usuario
routes.post('/sessions', SessionController.store); // Rota para logar

routes.use(authMiddleware);

routes.put('/users', UserController.update); // Rota para alterar dados do user

routes.get('/providers', ProviderController.index);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);

routes.get('/schadule', SchaduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
